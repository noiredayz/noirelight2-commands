/*
 * noirelight2 admin commands
 * AGPL-3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Empty message queue",
	mdesc: "Deletes every pending message for the current ",
	cmdname: "dropmsgq",
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
	aliases: ["emptymsgq"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Deletes any pending messages for the current or a given subsystem.",
	exthelp: "Deletes any pending messages for the current or a given subsystem."
}

