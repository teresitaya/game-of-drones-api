
var express = require('express');
var router = express.Router();
var MoveService = require('../services/service.move');
var uid = require('uid-safe');

/* adds a new match to the list */
router.post('/', async (req, res, next) =>
{
	const body = req.body;

	try
	{
		const move = await MoveService.create(body);

		// created the match! 
		return res.status(201).json({ move: move });
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


module.exports = router;