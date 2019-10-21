
class RoundModel
{
	constructor(roundNumber, movesCount, matchId, winnerName)
	{
		this.roundNumber = roundNumber;
		this.movesCount = movesCount;
		this.matchId = matchId;
		this.winnerName = winnerName;
	}
}

module.exports = RoundModel;