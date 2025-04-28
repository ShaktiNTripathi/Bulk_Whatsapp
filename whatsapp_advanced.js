const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const readline = require('readline');
const moment = require('moment'); // npm install moment

// Define numbers and their bulk counts
const contacts = [
    { number: '+917310213636', count: 5 },
    { number: '+918271955286', count: 3 },
    { number: '+919876543211', count: 10 }
];

// Media file path
const mediaPath = './media/whatsapp 1234.apk';

// Initialize readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Initialize WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Display QR code
client.on('qr', (qr) => {
    console.log('📱 Scan the QR code below with WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// On client ready
client.on('ready', () => {
    console.log('✅ WhatsApp client is ready!');

    const now = moment();
    console.log(`📅 Current Date and Time: ${now.format('YYYY-MM-DD HH:mm')}`);

    rl.question('⏰ Enter the Date and Time to schedule sending (format: YYYY-MM-DD HH:mm): ', async (input) => {
        const scheduledTime = moment(input, 'YYYY-MM-DD HH:mm', true);

        if (!scheduledTime.isValid()) {
            console.error('❌ Invalid date-time format. Please follow YYYY-MM-DD HH:mm.');
            await gracefulShutdown(1);
        }

        const diffMs = scheduledTime.diff(moment());

        if (diffMs <= 0) {
            console.error('❌ Scheduled time must be in the future.');
            await gracefulShutdown(1);
        }

        console.log(`✅ Messages scheduled for: ${scheduledTime.format('YYYY-MM-DD HH:mm')}`);
        console.log('🕰 Waiting until scheduled time...');

        setTimeout(() => {
            sendBulkMessages();
        }, diffMs);

        rl.close();
    });
});

// Handle authentication failure
client.on('auth_failure', async (msg) => {
    console.error('❌ Authentication failed:', msg);
    await gracefulShutdown(1);
});

// Handle client error
client.on('error', async (error) => {
    console.error('❌ WhatsApp client error:', error.message);
    await gracefulShutdown(1);
});

// Function to send messages
async function sendBulkMessages() {
    try {
        console.log('🚀 Sending bulk messages...');

        const media = MessageMedia.fromFilePath(mediaPath);
        const message = 'Hello! This is your scheduled bulk message.';

        for (const contact of contacts) {
            const chatId = contact.number.replace('+', '') + '@c.us';

            for (let i = 0; i < contact.count; i++) {
                try {
                    await client.sendMessage(chatId, media);
                    await client.sendMessage(chatId, message);
                    console.log(`✅ (${i + 1}/${contact.count}) Sent to ${contact.number}`);
                    await delay(1500); // Wait between messages
                } catch (error) {
                    console.error(`⚠️ Error sending to ${contact.number} (attempt ${i + 1}):`, error.message);
                }
            }
        }

        console.log('✅ All scheduled bulk messages sent successfully.');
    } catch (error) {
        console.error('❌ Error in sending messages:', error.message);
    } finally {
        await gracefulShutdown(0);
    }
}

// Graceful shutdown function
async function gracefulShutdown(exitCode) {
    try {
        console.log('🔌 Disconnecting WhatsApp client...');
        await client.destroy();
    } catch (err) {
        console.error('⚠️ Error during disconnect:', err.message);
    } finally {
        process.exit(exitCode);
    }
}

// Helper delay function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Handle process events properly
process.on('SIGINT', async () => await gracefulShutdown(0));
process.on('SIGTERM', async () => await gracefulShutdown(0));
process.on('SIGUSR2', async () => await gracefulShutdown(0));
process.on('uncaughtException', async (error) => {
    console.error('❌ Uncaught Exception:', error.message);
    await gracefulShutdown(1);
});
process.on('unhandledRejection', async (error) => {
    console.error('❌ Unhandled Promise Rejection:', error.message);
    await gracefulShutdown(1);
});

// Start WhatsApp Client
client.initialize().catch(async (error) => {
    console.error('❌ Failed to initialize WhatsApp client:', error.message);
    await gracefulShutdown(1);

});
