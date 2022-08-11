/*
 * noirelight2 extra commands
 * agpl-3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "7TV Search",
	mdesc: "Searched an emote from 7tv.app",
	cmdname: "7tvsearch",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 3,
				channel: 5,
				user: 7
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["7tv", "zyrwootsearch"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: 7tv <-i index from 1 to 100 or random> <emote name or tag> Search for emotes on the third party thing YEAHBUT7TV",
	exthelp: "Usage: 7tv <-i index from 1 to 100 or random> <emote name or tag> Search for emotes on the third party thing YEAHBUT7TV"
}

