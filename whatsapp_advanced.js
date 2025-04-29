const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const crypto = require('crypto');

// Settings
let settings = {
    maxRetries: 3,
    throttleRate: 30,
    minDelay: 500,
    maxDelay: 2000,
    batchSize: 5,
    dryRun: false,
    logFile: './logs/campaign-log.txt',
    timezone: 'Asia/Kolkata',
};

// Define contacts with behavior tracking
let contacts = [
    { number: '+919532324942', name: 'Rahul', preferences: { language: 'en', media: true }, priority: 1 },
    { number: '+918271955287', name: 'Priya', preferences: { language: 'hi', media: false }, priority: 2 },
    { number: '+919876543211', name: 'Amit', preferences: { language: 'en', media: true }, priority: 1 },
];

// Media and message templates
const mediaPaths = ['./media/sample.jpeg', './media/sample.jpeg'];
const jokes = [
    'Why don’t skeletons fight each other? They don’t have the guts.',
    'What do you call fake spaghetti? An impasta!',
    'Why couldn’t the bicycle stand up by itself? It was two-tired.'
];

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
client.on('ready', async () => {
    console.log('✅ WhatsApp client is ready!');
    sendBulkMessages();
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

// Send bulk messages
async function sendBulkMessages() {
    try {
        console.log('🚀 Sending bulk messages...');

        // Sort contacts by priority
        const sortedContacts = contacts.sort((a, b) => a.priority - b.priority);

        for (let i = 0; i < sortedContacts.length; i++) {
            const contact = sortedContacts[i];
            await processContact(contact);
            await randomDelay(settings.minDelay, settings.maxDelay);
        }

        console.log('✅ Campaign completed.');
        await gracefulShutdown(0);
    } catch (error) {
        console.error('❌ Error in campaign:', error.message);
        await gracefulShutdown(1);
    }
}

// Process individual contact with advanced features
async function processContact(contact) {
    const chatId = contact.number.replace('+', '') + '@c.us';
    const personalizedMessage = generatePersonalizedMessage(contact);

    if (settings.dryRun) {
        console.log(`🧪 Dry run: Would send to ${contact.name}`);
        return;
    }

    try {
        // Send dynamic location (latitude and longitude)
        await sendLocation(chatId);

        // Send a random joke
        await sendRandomJoke(chatId);

        // Send media files from local folder
        if (contact.preferences.media) {
            await sendRandomMedia(chatId);
        }

        // Send personalized message
        await client.sendMessage(chatId, personalizedMessage);
        console.log(`✅ Sent to ${contact.name} (${chatId})`);
    } catch (error) {
        console.error(`❌ Error sending message to ${contact.name}:`, error.message);
    }
}

// Generate personalized message
function generatePersonalizedMessage(contact) {
    return `Hello ${contact.name}, here’s your message for today! Current time: ${moment().format('YYYY-MM-DD HH:mm:ss')}`;
}

// Send Geo-location (Latitude and Longitude)
async function sendLocation(chatId) {
    const latitude = 28.7041;
    const longitude = 77.1025;
    const locationMessage = `Here is your current location:\nLatitude: ${latitude}\nLongitude: ${longitude}`;
    await client.sendMessage(chatId, locationMessage);
}

// Send random joke
async function sendRandomJoke(chatId) {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    await client.sendMessage(chatId, joke);
}

// Send random media file
async function sendRandomMedia(chatId) {
    const mediaFile = mediaPaths[Math.floor(Math.random() * mediaPaths.length)];
    const media = MessageMedia.fromFilePath(mediaFile);
    await client.sendMessage(chatId, media);
}

// Send message with formatting (bold, italic, monospace)
async function sendFormattedMessage(chatId) {
    const formattedMessage = '*Bold Message*\n_Italic Message_\n`Monospace Message`';
    await client.sendMessage(chatId, formattedMessage);
}

// Retry on failure
async function retrySendMessage(chatId, message, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            await client.sendMessage(chatId, message);
            console.log('✅ Message sent successfully');
            return;
        } catch (error) {
            console.error(`❌ Error sending message (Attempt ${i + 1}):`, error.message);
        }
    }
}

// Delay helper
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Random delay
async function randomDelay(min, max) {
    const randomMs = Math.floor(Math.random() * (max - min + 1)) + min;
    await delay(randomMs);
}

// Graceful shutdown
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

// Handle process events
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
