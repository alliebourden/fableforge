import * as fs from "fs";

const config = JSON.parse(fs.readFileSync('C:\\Users\\alexa\\fableforge\\backend\\json.env').toString())

export const apiKey = (config.SENDGRID_API_KEY);
console.log(config);