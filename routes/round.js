
var express = require('express');
var router = express.Router();
var RoundService = require('../services/service.round');

/* adds a new round to the list */
router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		
		const round = await RoundService.create(body);

		// created the round! 
		return res.status(201).json({ round: round });
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

/* retrieves a round by uid */
router.get('/:id', async (req, res, next) =>
{
	try
	{
		const round = await RoundService.retrieve(req.params.id);

		return res.json({ round: round });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the round by uid */
 router.put('/:id', async (req, res, next) =>
{
	try
	{
		const round = await RoundService.update(req.params.id, req.body);

		return res.json({ round: round });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;