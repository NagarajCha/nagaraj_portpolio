const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

function loadEnvFile(file) {
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');
    content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const idx = trimmed.indexOf('=');
        if (idx === -1) return;
        const key = trimmed.slice(0, idx);
        let val = trimmed.slice(idx + 1);
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
    });
}

const envPath = path.resolve(process.cwd(), '.env.local');
loadEnvFile(envPath);

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
// If the App Password was copied with spaces, remove them for use.
const SMTP_PASS_CLEAN = SMTP_PASS ? SMTP_PASS.replace(/\s+/g, '') : SMTP_PASS;
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
const SEND_EMAIL_TO = process.env.SEND_EMAIL_TO || process.env.SMTP_USER;

if (!SMTP_HOST || !SMTP_USER || (!SMTP_PASS_CLEAN && !(OAUTH_CLIENT_ID && OAUTH_CLIENT_SECRET && OAUTH_REFRESH_TOKEN))) {
    console.error('Missing SMTP configuration. Provide SMTP_PASS or OAuth2 credentials in .env.local');
    console.error('Required: SMTP_HOST, SMTP_USER, and either SMTP_PASS or OAUTH_CLIENT_ID/OAUTH_CLIENT_SECRET/OAUTH_REFRESH_TOKEN');
    process.exit(1);
}

(async () => {
    let auth;
    if (OAUTH_CLIENT_ID && OAUTH_CLIENT_SECRET && OAUTH_REFRESH_TOKEN) {
        console.log('Using OAuth2 authentication (OAUTH_CLIENT_ID present)');
        auth = {
            type: 'OAuth2',
            user: SMTP_USER,
            clientId: OAUTH_CLIENT_ID,
            clientSecret: OAUTH_CLIENT_SECRET,
            refreshToken: OAUTH_REFRESH_TOKEN,
        };
    } else {
        console.log('Using basic authentication (SMTP_PASS)');
        auth = {
            user: SMTP_USER,
            pass: SMTP_PASS_CLEAN,
        };
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth,
    });

    try {
        console.log('Verifying SMTP connection...');
        await transporter.verify();
        console.log('SMTP connection verified successfully.');

        // Optionally send a test message. Uncomment to actually send.
        // await transporter.sendMail({
        //   from: `"SMTP Test" <${SMTP_USER}>`,
        //   to: SEND_EMAIL_TO,
        //   subject: 'Test message from local SMTP test',
        //   text: 'This is a test message sent from scripts/test-smtp.js',
        // });
        // console.log('Test email sent.');
    } catch (err) {
        console.error('SMTP verify failed. Error details:');
        console.error(err && err.message ? err.message : err);
        if (err && err.response) console.error('Server response:', err.response);
        process.exit(2);
    }
})();
