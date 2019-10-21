
const moveModel = require("../models/model.move");
let validator = require('fastest-validator');


const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gameofdrones',
  password: 'postgres',
  port: 5432,
});

let moves = {};
let counter = 0;

/* create an instance of the validator */
let matchValidator = new validator();
;
/* match validator shema */
const matchVSchema = {
		move: { type: "string", min:1},
		player: { type: "string", min:1},
		roundNumber: { type: "number"},
		matchId: { type: "number"},
	};

/* static move service class */
class MoveService
{
	static async create(data)
	{
		var vres = matchValidator.validate(data, matchVSchema);
		
		/* validation failed */
		if(!(vres === true))
		{
			let errors = {}, item;
			for(const index in vres)
			{
				item = vres[index];

				errors[item.field] = item.message;
			}
			
			throw {
			    name: "ValidationError",
			    message: errors
			};
		}
			let move = 	new moveModel(data.move, data.player,data.roundNumber, data.roundId);
			const result = await pool.query('INSERT INTO move (move, player,roundnumber, roundid) VALUES ($1,$2,$3,$4) RETURNING *',[move.move, move.player,move.roundNumber, move.roundId])
			.then(res => {
				console.log('move:', res.rows[0]);
				move= res.rows[0];
				moves[moves.length] = move;
				return move;
			}).catch(e =>setImmediate(() => {console.log(e)}));
		 	return result;
	}

	static retrieve(id)
	{
		pool.query('SELECT * FROM move where id = $1 ORDER BY id ASC', [id], (error, results) => {
			if (error) {
			  throw error
			}
			return results.rows;
		  })
	}


}

module.exports = MoveService;