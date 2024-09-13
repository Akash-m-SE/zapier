import { Resend } from "resend";
import { generateOtpTemplate } from "../templates/otp-template";
import dotenv from "dotenv";
import { generateNormalEmailTemplate } from "../templates/normal-email-template";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function sendEmail(
  to: string,
  body: string,
  type: "otp" | "normal",
) {
  try {
    const data = await resend.emails.send({
      from: `Akash <onboarding@resend.dev>`,
      to: [to],
      subject: "Zapier Clone",
      html:
        type === "otp"
          ? generateOtpTemplate(body)
          : generateNormalEmailTemplate(body),
    });

    console.log("data from resend email = ", data);
  } catch (error) {
    // return console.error({ error });
    console.log("Error while sending email = ", error);
  }
}
