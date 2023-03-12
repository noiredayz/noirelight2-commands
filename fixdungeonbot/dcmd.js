/*
 * noirelight2 extra commands
 * agpl3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "fixdungeonbot",
	mdesc: "Try to fix DeepDankDungeonBot",
	cmdname: "fixdungeonbot",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 120,
				channel: 120,
				user: 120
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["fdb"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Runs a server side check to restart DeepDankDungeonBot",
	exthelp: "Runs a server side check to restart DeepDankDungeonBot. Only permitted users may run this command."
}

