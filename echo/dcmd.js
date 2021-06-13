/*
 * noirelight basic administrator commands
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "echo and eecho commands",
	mdesc: "Commands to say something",
	cmdname: "echo",
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
	aliases: ["say", "eecho", "esay", "extecho", "extsay"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: say <text> or <esay> <platform>-<channel> <text> Makes the bot say some text in the current channel. Use esay/extsay with a specified platform-channel to say the text in an other channel (must be in single or normal mode)",
	exthelp: "say, echo: Makes the bot say something in the current channel. eecho, esay, extecho, extsay: says something in antoher channel (which must be in single-user or normal mode), in this case the first parameters must be in <platform>-<channel> format like twitch-ninja. Operator only."
}
