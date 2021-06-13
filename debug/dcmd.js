/*
 * noirelight basic administrator commands
 * 
 * AGPL3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Debug command",
	mdesc: "This command lets the operator run a piece of javascript code.",
	cmdname: "debug",
	pipeable: 0,
	clearance: 3,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 0,
				channel: 1,
				user: 1
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["eval", "exec"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Runs a javascript expression and returns its value. If called as exec it just runs the expression and prints out nothing if it was successful.",
	exthelp: "Runs a javascript expression and returns its value. If called as exec it just runs the expression and prints out nothing if it was successful. This commands needs some improvement so it can run more complex expressions. This command has access to the globals of the entire bot, so access is limited to the operator."
}

