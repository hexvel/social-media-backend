export const activationLinkTemplate = (activationLink: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Activate account</title>
</head>
<body style="margin: 0; padding: 0; background-color: #1a1a1a; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #252525; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #ffffff; text-align: center; margin-bottom: 30px;">Activate account</h1>


            <p style="color: #e0e0e0; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                Thank you for registration! Please click the button below to activate your account:
            </p>


            <div style="text-align: center; margin-bottom: 25px;">
                <a href="${process.env.BACKEND_URL}/users.activate/${activationLink}"
                   style="display: inline-block;
                          background-color: #4CAF50;
                          color: white;
                          padding: 15px 30px;
                          text-decoration: none;
                          border-radius: 5px;
                          font-weight: bold;
                          transition: background-color 0.3s;">
                    Activate account
                </a>
            </div>


            <p style="color: #b0b0b0; font-size: 14px; text-align: center; margin-top: 30px;">
                If the button does not work, copy and paste the following link into your browser:<br>
                <span style="color: #4CAF50;">${process.env.BACKEND_URL}/users.activate/${activationLink}</span>
            </p>


        </div>

        <div style="text-align: center; margin-top: 20px; color: #808080; font-size: 12px;">
            © 2025 All rights reserved
        </div>
    </div>

</body>
</html>
`;
