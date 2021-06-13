/*
 * noirelight basic commands
 * 
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "executes a batch file",
	mdesc: "prints each line of a file to the current chat",
	cmdname: "batch",
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
	aliases: ["bat", "runbatch"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: batch <filename> prints the content of a text file line-by-line to the current chat. Operator only.",
	exthep: "Usage: batch <filename> prints the content of a text file line-by-line to the current chat. Files must be in a special directory in the bots pwd. Empty lines and lines starting with # are ignored. Only the operator can us this command and printing is subject to the message queue delay."
}

