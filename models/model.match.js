
class MatchModel
{
	constructor(player1, player2, winner, rounds)
	{
		this.player1 = player1;
		this.player2 = player2;
		this.winner = winner;
		this.rounds = rounds;
		this.id = null;
	}
}

module.exports = MatchModel;