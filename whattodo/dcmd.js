/*
 * noirelight2 extra commands
 * agpl3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Random activity",
	mdesc: "Pick a random activity from a dank api",
	cmdname: "whattodo",
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
	aliases: ["randomactivity", "watdo"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Borend and don't know what to kill time with? This command will pick a random activity from a donk api for you.",
	exthelp: "Borend and don't know what to kill time with? This command will pick a random activity from a donk api for you."
}

