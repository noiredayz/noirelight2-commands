/*
 * noirelight extra commands
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "PogChamp",
	mdesc: "Archive of twitch's new pogchamp emotes",
	cmdname: "pogchamp",
	pipeable: 0,
	clearance: 0,
	errmsg: "not very pog",
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
	aliases: ["pog", "PogChamp", "Pog", "PagChomp"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: pogchamp <optional date in YYYY-MM-DD> Returns the last pogchamp from the records or info about the one on given date. Valid dates: 2021-01-06, 2021-01-08 - 02-12",
	shorthelp: "Usage: pogchamp <optional date in YYYY-MM-DD> Returns the last pogchamp from the records or info about the one on a given date. Valid dates: 2021-01-06, 2021-01-08 - 02-12. Returned information contains who/what was on the emote, Twitch and Twitter handles of the streamer or author, a few words about them and a 3x link to the emote"
}

