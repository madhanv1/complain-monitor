const sendEmail = require('./utils/email');
require('dotenv').config();

const test = async () => {
    console.log('Testing email configuration...');
    console.log(`User: ${process.env.EMAIL_USER}`);
    // console.log(`Pass: ${process.env.EMAIL_PASS}`); // Don't log password

    await sendEmail(
        process.env.EMAIL_USER, // Send to yourself
        'Test Email from Compliance Monitor',
        'If you receive this, the email system is working correctly.'
    );
};

test();
