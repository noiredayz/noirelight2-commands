/*
 * noirelight2 extra commands
 * agpl3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "whois",
	mdesc: "twitch user info",
	cmdname: "whois",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 10,
				channel: 15,
				user: 15
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: null
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: whois <username> Returns basic info about a Twitch user (name, ID, displayname etc). Works on existing users only.",
	exthelp: "Usage: whois <username> Returns basic info about a Twitch user (name, ID, displayname etc). Works on existing users only."
}

