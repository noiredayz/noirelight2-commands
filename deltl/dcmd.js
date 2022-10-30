/*
 * noirelight2 extra commands
 * agpl3 or later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Delete TwitchLotto entry",
	mdesc: "deletes a tl url",
	cmdname: "deltl",
	pipeable: 0,
	clearance: 3,
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
	shorthelp: "Usage: deltl <url> Deletes every tl record with a given URL. Operator only.",
	exthelp: "Usage: deltl <url> Deletes every tl record with a given URL. Operator only."
}

