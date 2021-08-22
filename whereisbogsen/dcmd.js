/*
 * noirelight2 extra commands
 * AGPL-3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Where is bogsen MEGALUL",
	mdesc: "Posts hobos current Mald King position",
	cmdname: "whereisbogsen",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 3,
				channel: 5,
				user: 5
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["MEGALUL", "pogress", "bogress"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Finds hobos current location in mald king using the data from u/LazyLion2",
	exthelp: "Finds hobos current location in mald king using the data from u/LazyLion2"
}

