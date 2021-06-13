/*
 * noirelight basic commands
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "session",
	mdesc: "Displays the current session ID (unix timestamp of the starttime of the current session)",
	cmdname: "session",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 0,
				channel: 30,
				user: 60
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["sessionid", "currentsession", "sid", "csid"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Returns the current session ID (which is basically a UNIX timestamp when the bot was started.",
	exthelp: "Returns the current session ID (which is basically a UNIX timestamp when the bot was started."
}

