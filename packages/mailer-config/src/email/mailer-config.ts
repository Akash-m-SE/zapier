import { google } from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const GMAIL = process.env.GMAIL as string;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI as string;
const GOOGLE_OAUTH_ACCESSTOKEN = process.env.GOOGLE_OAUTH_ACCESSTOKEN as string;
const GOOGLE_OAUTH_REFRESHTOKEN = process.env
  .GOOGLE_OAUTH_REFRESHTOKEN as string;

const OAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
);

OAuth2Client.setCredentials({
  refresh_token: GOOGLE_OAUTH_REFRESHTOKEN,
});

export async function sendEmail(to: string, body: string) {
  try {
    const accessToken = await OAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_OAUTH_REFRESHTOKEN,
        accessToken: (accessToken.token as string) || "",
      },
    });

    const mailOptions = (to: string, body: string) => {
      return {
        from: GMAIL,
        to: to,
        subject: "Hello from Zapier + Nodemailer",
        text: `${body} This is just a test from zapier clone + nodemailer`,
      };
    };

    await transport.sendMail(mailOptions(to, body));
  } catch (error) {
    console.log("Error sending email : ", error);
  }
}
