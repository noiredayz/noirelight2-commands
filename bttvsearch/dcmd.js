/*
 * noirelight extra commands
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "BetterTTV emote search",
	mdesc: "monkaTOS BTTV search using undocumented API",
	cmdname: "bttvsearch",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 5,
				channel: 7,
				user: 10
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["bttv"]
}

exports.nlt2_cmd_help = {
	shorthelp: "usage: bttvsearch <optional uploader name:><emotename> <optional index 1-50> Find you a BTTV shared emote. If uploader is specified it looks for one uploaded by that person only",
	exthelp: "usage: bttvsearch <optional uploader name:><emotename> <optional index 1-50> Find you a BTTV shared emote. If uploader is specified it looks for one uploaded by that person only"
}

