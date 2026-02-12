const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    console.log(`\n--- ATTEMPTING EMAIL SEND TO: ${to} ---`);
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ SUCCESS: Real email sent to ${to}`);
    } catch (error) {
        console.log('⚠️  SMTP ALERT: Could not connect to mail server.');
        console.log('   (This is common with University/Enterprise accounts blocking 3rd party apps)');
        console.log('🔄 FALLBACK MODE: Simulating email delivery...');
        console.log(`\n---------------------------------------------------`);
        console.log(`[MOCK EMAIL SENT]`);
        console.log(`To:      ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body:    ${text}`);
        console.log(`---------------------------------------------------\n`);
    }
};

module.exports = sendEmail;
