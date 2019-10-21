
class MoveModel
{
	constructor(move, player, roundNumber, roundId)
	{
		this.move = move;
		this.player = player;
		this.roundNumber = roundNumber;
		this.roundId= roundId;
		this.id= null;
	  
	}
}

module.exports = MoveModel;