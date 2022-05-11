/*
 * noirelight basic commands
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "pajbot2 banphrase checker",
	mdesc: "pajaS HE IS WATCHING",
	cmdname: "pajbot2check",
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
	aliases: ["pb2check"]
}

exports.nlt2_cmd_help = {
	shorthelp: "usage: pb2check <channel> <text> Checks if a text is okay with pajbot2 in channels where its enabled (usually height check NaM )",
	exthelp: "usage: pb2check <channel> <text> Checks if a text is okay with pajbot2 in channels where its enabled (usually height check NaM ) Complements the bancheck command."
}
