/*
 * noirelight extra commands
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "setbp",
	mdesc: "Sets/unsets a pajbot1 banphase API URL for a channel",
	cmdname: "setbp",
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
	aliases: ["unsetbp"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: setbp <channel> <base url> or unsetbp <channel> Sets or disable pajbot for a channel",
	exthelp: "Usage: setbp <channel> <base url> or unsetbp <channel> Sets or disable pajbot for a channel"
}

