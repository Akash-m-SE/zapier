export function generateNormalEmailTemplate(body: string) {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #dddddd;
    }
    .email-header h1 {
      font-size: 24px;
      color: #333333;
    }
    .email-body {
      padding: 20px 0;
      text-align: center;
    }
    .email-body p {
      font-size: 18px;
      line-height: 1.6;
      color: #555555;
    }
    .email-footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #dddddd;
      font-size: 14px;
      color: #777777;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Email Header -->
    <div class="email-header">
      <h1>Message from Zapier Clone</h1>
    </div>

    <!-- Email Body -->
    <div class="email-body">
      <p>
        ${body}
      </p>
    </div>

    <!-- Email Footer -->
    <div class="email-footer">
      <p>&copy; 2024 Zapier Clone. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
}
