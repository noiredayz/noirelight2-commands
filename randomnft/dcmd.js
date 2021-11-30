/*
 * noirelight2 extra commands
 * AGPL-3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Random NFT",
	mdesc: "Fetch a random NFT form opensea.io",
	cmdname: "randomnft",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 5,
				channel: 10,
				user: 10
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: null
}

exports.nlt2_cmd_help = {
	shorthelp: "Fetches a random NFT \"artwork\" from opensea.io",
	exthelp: "Fetches a random NFT \"artwork\" from opensea.io"
}

