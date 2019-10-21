
const matchModel = require("../models/model.match");
let validator = require('fastest-validator');


const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gameofdrones',
  password: 'postgres',
  port: 5432,
});

let matches = {};
let counter = 0;

/* create an instance of the validator */
let matchValidator = new validator();
;
/* match validator shema */
const matchVSchema = {
		player1: { type: "object"},
		player2: { type: "object"},
		winner: { type: "object"},
		rounds: {type: "array" }
	};

/* static match service class */
class MatchService
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

		let match = new matchModel(data.player1, data.player2, data.winner || null, data.rounds || null);
		const result = await pool.query('INSERT INTO match (player1,player2,winner,rounds) VALUES ($1,$2,$3,$4) RETURNING *',[match.player1,match.player2,match.winner,match.rounds])
		.then(res => {
			console.log('match:', res.rows[0]);
			match= res.rows[0];
			matches[matches.length] = match;
			return match;
  		}) .catch(e =>setImmediate(() => {throw e}))
		  return result;
	}
	static async update(id, data)
	{
	   const result = await pool.query('UPDATE match set winner=$1, rounds=$2 where id = $3 RETURNING *', [data.winner,data.rounds,data.id]).then(
		(results) => {
			console.log('updated match:' , results.rows[0]);
			return results.rows[0];
		  }).catch((error)=> {
			if (error) {
				throw error
			  }
		  });
		return result;
	}

}

module.exports = MatchService;