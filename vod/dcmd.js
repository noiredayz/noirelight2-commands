/*
 * noirelight2 extra commands
 * agpl3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Twitch VOD",
	mdesc: "get the latest vod of a twitch streamer",
	cmdname: "vod",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 10,
				channel: 15,
				user: 15
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["latestvod"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: vod <username> - Returns the latest vod of a twitch streamer",
	exthelp: "Usage: vod <username> - Returns the latest vod of a twitch streamer"
}

