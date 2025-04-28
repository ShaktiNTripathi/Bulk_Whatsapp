const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const readline = require('readline');

// Array of phone numbers (replace with your numbers in international format, e.g., +1234567890)
const phoneNumbers = ['+917310213636', '+918271955286', '+919876543211'];

// Media file path (replace with your media file path, e.g., image, video, or document)
const mediaPath = './media/whatsapp 1234.apk'; // Ensure this file exists in your project directory

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Initialize WhatsApp client with local authentication
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, // Set to false if you want to see the browser
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Display QR code in terminal
client.on('qr', (qr) => {
    console.log('Scan the QR code below with WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// When client is authenticated
client.on('ready', () => {
    console.log('WhatsApp client is ready!');
    promptUser();
});

// Handle authentication failure
client.on('auth_failure', (msg) => {
    console.error('Authentication failed:', msg);
    process.exit(1);
});

// Prompt user to confirm sending messages
function promptUser() {
    rl.question('Type "yes" to send messages to the listed numbers: ' + phoneNumbers.join(', ') + '\n', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            sendMessages();
        } else {
            console.log('Operation cancelled.');
            client.destroy();
            rl.close();
            process.exit(0);
        }
    });
}

// Function to send messages to all numbers
async function sendMessages() {
    try {
        // Load media file
        const media = MessageMedia.fromFilePath(mediaPath);
        const message = 'Hello! This is a bulk message sent via the WhatsApp platform.';

        for (const number of phoneNumbers) {
            try {
                // Format number to WhatsApp ID (remove + and add @c.us)
                const chatId = number.replace('+', '') + '@c.us';
                
                // Send media
                await client.sendMessage(chatId, media);
                // Send text message
                await client.sendMessage(chatId, message);
                
                console.log(`Message sent to ${number}`);
                
                // Add a small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (error) {
                console.error(`Failed to send message to ${number}:`, error.message);
            }
        }
        
        console.log('All messages sent successfully!');
    } catch (error) {
        console.error('Error processing media or sending messages:', error.message);
    } finally {
        client.destroy();
        rl.close();
        process.exit(0);
    }
}

// Handle errors
client.on('error', (error) => {
    console.error('WhatsApp client error:', error.message);
    client.destroy();
    rl.close();
NUMBER
    process.exit(1);
});

// Start the client
client.initialize().catch((error) => {
    console.error('Failed to initialize WhatsApp client:', error.message);
    process.exit(1);
});