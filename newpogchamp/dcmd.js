/*
 * noirelight extra commands
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "New PogChamp",
	mdesc: "This commands lets me add a new pogchamp data without megadonk debug or turning off the bot (sqlite OMEGALUL)",
	cmdname: "newpogchamp",
	pipeable: 0,
	clearance: 3,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 0,
				channel: 1,
				user: 1
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["newpog"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Lets the operator to add a new record to the PogChamp database.",
	exthelp: "Deprecated command to add a new PogChamp record without having to restart the bog (sqlite oh mega lyl)"
}

