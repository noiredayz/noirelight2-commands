/*
 * noirelight2 template
 * CC-0 no rights reserved

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "cookie",
	mdesc: "grab a fortune cookie",
	cmdname: "cookie",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 0,
				channel: 5,
				user: 10
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["fortune", "cockie", "neptunewantshercookierightfuckingnow"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Get a fortune cookie :)",
	exthelp: "Get a fortune cookie :)"
}

