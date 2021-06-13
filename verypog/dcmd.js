/*
 * noirelight extra commands
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "VeryPog",
	mdesc: "Prints an incomplete list of VeryPog variants",
	cmdname: "verypog",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 0,
				channel: 10,
				user: 20
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["verypogging", "verypogs", "verypoglist"]
}

exports.nlt2_cmd_help = {
	shorthelp: "posts an incomplete list of variations of and emotes inspired by the original VeryPog BTTV emote",
	exthelp: "prints of a list of variations of and emotes inspired by the original VeryPog BTTV emote, which features ex-wrestler Ryback Reeves eating a bag of Ruffles chips during one of this 'Chips eating ASMR' videos. This inspired a few variants and other original emotes featuring him."
}

