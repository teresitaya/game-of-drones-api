
const roundModel = require("../models/model.round");
let validator = require('fastest-validator');


const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gameofdrones',
  password: 'postgres',
  port: 5432,
});

let rounds = {};

/* create an instance of the validator */
let matchValidator = new validator();
;
/* match validator shema */
const roundVSchema = {
		movesCount: { type: "number"},
		roundNumber: { type: "number"},
		matchId: { type: "number"},
		winnerName: {type:"object"}
	};

/* static move service class */
class RoundService
{
	static async create(data)
	{
		var vres = matchValidator.validate(data, roundVSchema);
		
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
		let result = {};
		let round = new roundModel(data.roundNumber, data.movesCount, data.matchId, {});
		result = await pool.query('INSERT INTO round (roundnumber, movescount,matchid,winnername) VALUES ($1,$2,$3,$4) RETURNING *',[round.roundNumber, round.movesCount, round.matchId, round.winnerName])
			.then(res => {
				round = res.rows[0];
				console.log('round:', res.rows[0]);
				round.movesCount = round.movescount;
				round.roundNumber = round.roundnumber;
				const roundToReturn = {
					roundNumber: round.roundnumber,
					movesCount: round.movescount,
					matchId: round.matchid, 
					winnerName: round.winnername,
					id: round.id
				}
				return roundToReturn;
			  });
		 	return result;
	}

	static async retrieve(id)
	{
	   const result = await pool.query('SELECT * FROM round where id = $1 ORDER BY id ASC', [id]).then(
		(results) => {
			console.log('retrieved round:' , results.rows[0]);
			return results.rows[0];
		  }).catch((error)=> {
			if (error) {
				throw error
			  }
		  });
		return result;
	}
	static async update(id, data)
	{
	   const result = await pool.query('UPDATE round set roundnumber =$1 , movescount=$2 ,matchid=$3 ,winnername=$4 where id = $5 RETURNING *', [data.roundNumber, data.movesCount, data.matchId, data.winnerName, data.id]).then(
		(results) => {
			console.log('updated round:' , results.rows[0]);
			return results.rows[0];
		  }).catch((error)=> {
			if (error) {
				throw error
			  }
		  });
		return result;
	}
	


}

module.exports = RoundService;