/*
 * nlt2 extra commands
 * AGPL-3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Raid registration",
	mdesc: "register yourself for huwobot raid pings",
	cmdname: "raidreg",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 0,
				channel: 3,
				user: 15
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["raidunreg"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: raidreg: register yourself for the bing, raidunreg to remove your registration",
	exthelp: "Usage: raidreg: register yourself for the bing, raidunreg to remove your registration"
}

