/*
 * noirelight2 extra commands
 * AGPL-3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Weather",
	mdesc: "Gets the weather using openweathermap",
	cmdname: "weather",
	pipeable: 0,
	accepts_pipe: 1,
	ebot: 1,
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
	shorthelp: "Usage: weather <location> Grabs the current weather for a given location from openweathermap.org",
	exthelp: "Usage: weather <location> Grabs the current weather for a given location from openweathermap.org"
}

