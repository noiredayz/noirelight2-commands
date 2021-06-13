/*
 * noirelight extra commands
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "FrankerFacez emote search",
	mdesc: "FFZ search using their search API",
	cmdname: "ffzsearch",
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
	aliases: ["ffz"]
}

exports.nlt2_cmd_help = {
	shorthelp: "usage: ffzsearch <optional uploader name:><emotename> <optional index 1-50> Find you an FFZ shared emote. If uploader is specified it looks for one uploaded by that person only",
	exthelp: "usage: ffzsearch <optional uploader name:><emotename> <optional index 1-50> Find you an FFZ shared emote. If uploader is specified it looks for one uploaded by that person only"
}

