exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise (async (resolve, reject) => {

let cmdline, incmd;

switch(target_context){
	case "twitch":
		cmdline = fullmsg.messageText.substr(1);	//full message excluding the prefix
		incmd 	= cmdline.split(" ");				//same but split
		break;
	//placeholder for other contexts that may require extra handling Okayeg
	default:
		return;
		//cmdline = fullmsg.substr(1);
		//incmd	= cmdline.split(" ");
		break;
}

const owmBaseURI = "https://api.openweathermap.org/data/2.5/weather?q=";

if(!nlt.c.openweather_key || String(nlt.c.openweather_key).length!=32){
	reject("missing or invalid API key to run this command.");
	return;
}
if(incmd.length===1){
	resolve(`usage: ${nlt.c.cmd_prefix}weather <city> or <city, country code> or <city, state code, country code>`);
	return;
}

const wloc = cmdline.substr(nlt.util.locateCharInStr(cmdline, " ")+1);
const https_options ={
	headers: {
		'User-Agent': nlt.c.userAgent
	},
	url: owmBaseURI+encodeURI(wloc)+"&appid="+nlt.c.openweather_key+"&units=metric&lang=en",
	method: "GET",
	timeout: 2000,
	retry: 1,
	throwHttpErrors: false
};

const {statusCode, body} = await nlt.got.get(https_options);

if(statusCode===404) {
	resolve(`location "${wloc}" not found`);
	return;
}
if(statusCode!=200) {
	resolve(`http ${statusCode} while trying to query openweathermap monkaS`);
	return;
}

const ww = JSON.parse(body);

let retval = `current weather of ${ww.name}: ${ww.weather[0].description}, ${ww.main.temp}°C (feels like ${ww.main.feels_like}°C), pressure: ${ww.main.pressure}mbar, humidity: ${ww.main.humidity}%, wind: ${(ww.wind.speed*3.6).toFixed(1)} km/h (${mdtostr(ww.wind.deg)}), ${cwg(ww.wind.gust)}cloudy: ${ww.clouds.all}%`;
if(ww.rain) retval += `, rain(last h): ${ww.rain["1h"]}mm`;
if(ww.snow) retval += `, snow(last h}: ${ww.snow["1h"]}mm`;
resolve(retval);


})

}

function cwg(wg){
	if(wg)
		return `wind gusts: up to `+(wg*3.6).toFixed(1)+` km/h, `;
	else return "";	
}

//TODO: easy to use precipitation data is present in the xml reply woodface
//TODO: maybe grab that too LuL and use it here.
function prectostr(inval){
	if(!inval) return "no precipitation expected";
	if(inval.mode==="no") return "no precipitation expected";
	return `precipitation: ${inval.value}mm ${inval.mode}`;
}

//convert "meterological degrees" to a string
//data from http://snowfence.umn.edu/Components/winddirectionanddegrees.htm
function mdtostr(mdeg){
	if(!mdeg) return "~";
	const step = 22.5;
	const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
	
	if((mdeg>=348.75 && mdeg<360) || (mdeg>=0 && mdeg<11.25)) return "N";
	return dirs[Math.floor(mdeg/step)];
}
