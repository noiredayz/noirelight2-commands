/*
 * noirelight basic admin command
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Joinchannel for Twitch",
	mdesc: "Lets the operator to add a new channel to noirelight",
	cmdname: "joinchannel",
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
	aliases: ["joinch"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: join channel <twitch channel name> <initial mode> Adds a twitch channel to the records and joins it if the specified initial mode is 1, S or 2",
	shorthelp: "Usage: join channel <twitch channel name> <initial mode> Adds a twitch channel to the records and joins it if the specified initial mode is 1, S or 2. Does not work for non-twitch channels."
}

