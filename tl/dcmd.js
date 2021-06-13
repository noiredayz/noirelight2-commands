/*
 * noirelight extra commands
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "tl",
	mdesc: "Grabs an image from twitchlottos imgur link database and tests it for NFSW using AI",
	cmdname: "tl",
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
	mgreenlist: 1,
	numeric_data: null,
	text_data: null,
	extra_modules: "tl",
	aliases: ["twitchlotto", "twitchlottery"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Rolls an image link from twitchlotto's database, tests it with DeepAI NSFW detector and returns the results+link to the image.",
	exthelp: "Rolls an image link from twitchlotto's database, tests it with DeepAI NSFW detector and returns the results+link to the image. The NSFW detection AI is not prefect and sometimes has false positives or fails to detect NSFW content. Note: this is a lidl version of Supibot's tl command I threw together in a half hour when it was down. It doesn't support tagging or specifying the target channel. Note2: greenlisted command, can only be run in channels where its allowed."
}

