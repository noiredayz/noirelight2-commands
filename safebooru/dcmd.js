/*
 * noirelight2 extra commands
 * AGPL-3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Safebooru",
	mdesc: "Safebooru search",
	cmdname: "safebooru",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 0,
				channel: 10,
				user: 10
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["booru", "sfb"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: safebooru <space separate tag list> Finds something on Safebooru (basically a worksafe Gelbooru). Tags must be in the format accepted there like blonde_hair 2girls hakurei_reimu width:1920 etc. 5 tags max.",
	exthelp: "Usage: safebooru <space separate tag list> Finds something on Safebooru (basically a worksafe Gelbooru). Tags must be in the format accepted there like blonde_hair 2girls hakurei_reimu width:1920 etc. 5 tags max."
}

