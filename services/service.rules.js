
let validator = require('fastest-validator');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gameofdrones',
  password: 'postgres',
  port: 5432,
});

/* create an instance of the validator */
let matchValidator = new validator();
;
/* match validator shema */
const rulesVSchema = {
		firstmove: { type: "string"},
		secondmove: { type: "string"},
		winnermove: {type:"string"}
	};

/* static move service class */
class RoundService
{
	static async retrieveAll()
	{
	   const result = await pool.query('SELECT * FROM rules ORDER BY id ASC').then(
		(results) => {
			console.log('retrieved rules:' , results.rows);
			return results.rows;
		  }).catch((error)=> {
			if (error) {
				throw error
			  }
		  });
		return result;
	}

}

module.exports = RoundService;