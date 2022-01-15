/*
 * noirelight2 extra commands

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Escape from Tarkov server status",
	mdesc: "Retrieves server status from EFT status page",
	cmdname: "tarkov",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	nlt2_unified_compatible: false,
	cooldowns: {
				global: 5,
				channel: 10,
				user: 30
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["tarkovstatus", "eft", "eftstatus"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Retrieves server status from EFT status page",
	exthelp: "Retrieves server status from EFT status page"
}

