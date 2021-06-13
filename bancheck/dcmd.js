/*
 * noirelight basic commands
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "pajbot banphrase checker",
	mdesc: "This command lets you query pajbot banphrase APIs in known channels.",
	cmdname: "bancheck",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 3,
				channel: 10,
				user: 15
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["bpcheck"]
}

exports.nlt2_cmd_help = {
	shorthelp: "usage: bancheck <channel> <text> Queries the specified channels pajbot (if any) banphrase api and returns information if the specified text would trigger a ban/timeout there.",
	exthelp: "Usage: bancheck <channel> <text> Queries the specified channels pajbot (if any) banphrase api and returns information if the specified text would trigger a ban/timeout there. Target channel must have an enabled, working and known pajbot1 for the query. This command cannot query pajbot2, the automoderator, or other bots like Nightbot or StreamElements."
}
