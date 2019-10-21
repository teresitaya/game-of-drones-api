
var express = require('express');
var router = express.Router();
var RulesService = require('../services/service.rules');

/* retrieves a rules by uid */
router.get('/', async (req, res, next) =>
{
	try
	{
		const rules = await RulesService.retrieveAll(req.params.id);

		return res.json({ rules: rules });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;