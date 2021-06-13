/*
 * noirelight internal commands2
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Chat message postprocessor",
	mdesc: "This internal command post-processes chat messages",
	cmdname: "internal-postprocess-message",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 0,
				channel: 0,
				user: 0
				},
	minternal: 1,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["internal-process-special-message"]
}

exports.nlt2_cmd_help = {
	shorthelp: "This is an internal function which post-processes messages which were not command, to count emotes, reply to some kind of text sequence etc. depending on the implementation.",
	exthelp: "This is an internal function which post-processes messages which were not command, to count emotes, reply to some kind of text sequence etc. depending on the implementation."
}

