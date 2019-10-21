
var express = require('express');
var router = express.Router();
var MatchService = require('../services/service.match');
var uid = require('uid-safe');

/* adds a new match to the list */
router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const match = await MatchService.create(body);

		// created the match! 
		return res.status(201).json({ match: match });
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

/* updates the match by uid */
 router.put('/:id', async (req, res, next) =>
{
	try
	{
		const match = await MatchService.update(req.params.id, req.body);

		return res.json({ match: match });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;