/*
 * noirelight2 extra commands
 * agpl 3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Vanish",
	mdesc: "ppPoof",
	cmdname: "vanish",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 1,
				channel: 1,
				user: 1
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: null
}

exports.nlt2_cmd_help = {
	shorthelp: "Get timed out for 1s (deleting your chat lines till that point). Only works in channels where the bot is moderator.",
	exthelp: "Get timed out for 1s (deleting your chat lines till that point). Only works in channels where the bot is moderator."
}

