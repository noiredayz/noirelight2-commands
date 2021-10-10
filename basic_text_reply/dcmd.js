/*
 * noirelight basic commands
 * AGPL3-or-later
 *
*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "basic_text_reply",
	mdesc: "This module combines a bunch of oneliners to one stack using aliases",
	cmdname: "basic_text_reply",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 0,
				channel: 3,
				user: 5
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ['api', 'bot', 'version', 'node', 'channelmode', 'whatisthechannelmode', 'commands', 'nlt1', 'noirelight1', 'nlt2', 'noirelight2', 'trilaud', 'website']
}

exports.nlt2_cmd_help = {
	shorthelp: "this command combines a few oneliners to one command. Please refer to individual aliases for usage.",
	exthelp: "this command combines a few oneliners to one command. Please refer to individual aliases for usage.",
	aliashelp: [["api", "Returns the web address of the API page of the bot."],
				 ["bot", "Returns information about the bot and its operator."],
				 ["version", "Returns version information about the bot."],
				 ["node", "Returns information about the nodejs version the bot is running on."],
				 ["channelmode", "Shows which mode the current channel is in (singleuser or normal)"],
				 ["whatisthechannelmode", "Shows which mode the current channel is in (singleuser or normal)"],
				 ["nlt2", "The rewrite is good Copesen"],
				 ["noirelight2", "The rewrite is good Copesen"],
				 ["nlt1", "TrollDespair"],
				 ["noirelight1", "TrollDespair"],
				 ["trilaud", "TriHard !"],
				 ["help", "Deprecated help command that will show outdated information"],
				 ["commands", "Static and temporarly command list"],
				 ["website", "Returns the web address of the bots website"]]
				 
}

