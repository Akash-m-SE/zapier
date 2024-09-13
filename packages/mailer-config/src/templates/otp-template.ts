export function generateOtpTemplate(otp: string) {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Your OTP Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h2 {
            text-align: center;
            color: #333333;
          }
          .otp {
            display: block;
            background-color: #f7f7f7;
            padding: 15px;
            text-align: center;
            font-size: 24px;
            letter-spacing: 3px;
            color: #333333;
            border-radius: 5px;
            border: 1px solid #dddddd;
            margin: 20px auto;
            width: fit-content;
          }
          p {
            color: #555555;
            text-align: center;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #888888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Your OTP Code</h2>
          <p>Use the OTP below to verify your identity. This OTP is valid for 10 minutes.</p>
          <span class="otp">${otp}</span>
          <p>If you did not request this code, please ignore this email.</p>
          <div class="footer">
            &copy; 2024 Zapier Clone. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;
}
