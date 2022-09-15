const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '172193365005-t627h8nh96tcfq79eqf7pd4fr2v7qo9l.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04iCIA-kLtpM_CgYIARAAGAQSNwF-L9IrIAOUnZEdCLFISuxdpxpFTWK1aqIlJwHSsEY7djSLAGSbUgu4BiG5qxl-r3fsfp7KZHY'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

export async function sendMail(email,token) 
    {
        console.log("email====>", email)
        try {
            const accessToken = await oAuth2Client.getAccessToken()

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'leenupandagre24@gmail.com',
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                }
            })

            const mailOptions = {
                from: 'LeenuPandagre24 <leenupandagre24@gmail.com>',
                to: email,
                subject: 'Sending mail From Gmail Using API',
                text: 'Hello from gmail API',
                html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:3000/${token}">click here</a></h1>`,
            };

            const result = await transport.sendMail(mailOptions)
            console.log("result====>", result)

            //return token;

        } catch (error) {
            return error
        }
    }



// sendMail()
//     .then((result) => console.log('Email sent.... ', result))
//     .catch((error) => console.log(error.message));