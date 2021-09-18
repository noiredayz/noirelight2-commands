/*
 * noirelight2 extra commands
 * AGPL-3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Random coom",
	mdesc: "OH GOD IM COOMING AAAAAAHHHH",
	cmdname: "randomcoom",
	pipeable: 1,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 5,
				channel: 10,
				user: 10
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["rc", "booba", "boobatv"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Grabs and random interestring channel from booba.tv and checks why its so interesting.",
	exthelp: "Grabs and random interestring channel from booba.tv and checks why its so interesting."
}

