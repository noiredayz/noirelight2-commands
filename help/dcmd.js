/*
 * noirelight basic commands
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "help",
	mdesc: "Displays help about a command or topic",
	cmdname: "help",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 0,
				channel: 5,
				user: 5
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: null
}

exports.nlt2_cmd_help = {
	shorthelp: `Usage: help <command name> Gives you help about a command. See ${nlt.c.cmd_prefix}commands for list of commands`,
	exthelp: "Usage: help <command name> Gives you help about a command. See ${nlt.c.cmd_prefix}commands for list of commands"
}

