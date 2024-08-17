import { google } from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const OAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID as string,
  process.env.GOOGLE_CLIENT_SECRET as string,
  process.env.GOOGLE_REDIRECT_URI as string,
);

OAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_OAUTH_REFRESHTOKEN as string,
});

export async function sendEmail(to: string, body: string) {
  try {
    const accessToken = await OAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL as string,
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        refreshToken: process.env.GOOGLE_OAUTH_REFRESHTOKEN as string,
        accessToken: (accessToken.token as string) || "",
      },
    });

    const mailOptions = (to: string, body: string) => {
      return {
        from: process.env.GMAIL as string,
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
