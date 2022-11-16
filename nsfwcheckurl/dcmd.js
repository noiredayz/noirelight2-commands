/*
 * noirelight2 extra commands
 * agpl 3 or later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "NSFW check an image by URL",
	mdesc: "NSFW check an image by URL using AI",
	cmdname: "nsfwcheckurl",
	pipeable: 1,
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
	aliases: ["checkimage", "nsfwcheck"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: nsfwcheck <url to an image> Performs a deepai NSFW check on an URL",
	exthelp: "Usage: nsfwcheck <url to an image> Performs a deepai NSFW check on an URL"
}

