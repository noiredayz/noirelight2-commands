/*
 * noirelight extra commands
 * AGPL-3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "wiby",
	mdesc: "Grabs a webpage from wiby.me search engine",
	cmdname: "wiby",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 3,
				channel: 10,
				user: 10
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: false, 
	text_data: false, 
	extra_modules: null,
	aliases: ["wibyme"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: wiby <optional -i [index from 0-11 or \"random\"]> <search term(s)> Grabs you an old-school website from https://wiby.me a search engine for the classic web",
	exthelp: "Usage: wiby <optional -i [index from 0-11 or \"random\"]> <search term(s)> Grabs you an old-school website from https://wiby.me a search engine for the classic web. wiby.me uses a curate and user-submitted list of simple websites that look like they are straight from the 90s or early 2000s. Usually simple html, often with classic glittering gifs etc. none of the few megabytes huge javascript abominations we have to deal with today DansGame"
}


