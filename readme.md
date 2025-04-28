🚀 WhatsApp Bulk Message Scheduler

Welcome to the WhatsApp Bulk Message Scheduler, a sleek and powerful Node.js tool designed to schedule and send bulk WhatsApp messages with media attachments to multiple contacts at your chosen time. Built for ease and reliability, this project lives on GitHub at ShaktiNTripathi/Bulk_Whatsapp, with cutting-edge features in the v2 branch.

📑 Table of Contents

✨ Features
🛠 Prerequisites
📥 Installation
🎯 Usage
📂 File Structure
📦 Dependencies
🛡️ Error Handling
🤝 Contributing
📜 License


✨ Features

⏰ Scheduled Messaging: Plan messages for any future date and time.
📨 Bulk Sending: Send messages and media to multiple contacts with customizable counts.
📎 Media Attachments: Share files like APKs, images, or videos effortlessly.
🔒 QR Code Authentication: Secure WhatsApp login with a quick QR scan.
🛑 Graceful Shutdown: Cleanly handles errors and process termination.
📢 Vivid Console Logs: Emoji-rich, color-coded feedback for a delightful experience.
🖥 Intuitive CLI: Simple terminal-based scheduling interface.


🛠 Prerequisites
Get ready to roll with these essentials:

Node.js (v14 or higher) 🟢
WhatsApp account 📱
A media file (e.g., whatsapp 1234.apk) for attachments 📄


📥 Installation

Clone the v2 branch:
git clone -b v2 https://github.com/ShaktiNTripathi/Bulk_Whatsapp.git
cd Bulk_Whatsapp


Install dependencies:
npm install


Set up the media file:

Create a media folder in the project root.
Add your media file (e.g., whatsapp 1234.apk) to the media folder.




🎯 Usage

Launch the app:
node index.js


Authenticate:

A QR code will pop up in your terminal. Scan it with the WhatsApp mobile app to log in. 🔍


Schedule your messages:

Input the date and time in YYYY-MM-DD HH:mm format (e.g., 2025-04-28 14:30).
The app will patiently wait until the scheduled time to send your messages. ⏳


Watch the magic:

Messages and media are sent to contacts listed in the contacts array in index.js.
Each contact gets their specified number of messages, with a 1.5-second pause between sends. 🚀


Wrap-up:

The app gracefully shuts down after completion or if an error occurs. ✅



Pro Tip: Ensure contact numbers in index.js follow the +<country_code><number> format (e.g., +917310213636).

📂 File Structure
Bulk_Whatsapp/
├── 📁 media/                    # Store your media files here
│   └── 📄 whatsapp 1234.apk     # Sample media file
├── 📜 index.js                  # Core application script
├── 📦 package.json              # Project metadata and dependencies
└── 📝 README.md                 # You're reading it!


📦 Dependencies
Powered by these awesome Node.js packages:

whatsapp-web.js: Connects to WhatsApp Web.
qrcode-terminal: Displays QR codes in the terminal.
moment: Simplifies date and time handling.
readline: Built-in Node.js module for CLI input.

Install them with:
npm install whatsapp-web.js qrcode-terminal moment


🛡️ Error Handling
Built to handle hiccups with grace:

🚫 Invalid Date-Time: Rejects incorrect YYYY-MM-DD HH:mm inputs.
⏮ Past Scheduling: Blocks attempts to schedule in the past.
🔐 Auth Failures: Logs WhatsApp login issues clearly.
📩 Send Errors: Continues despite individual message failures, with detailed logs.
⚠️ Unexpected Issues: Catches unhandled exceptions and promise rejections.
🔌 Clean Exit: Ensures the WhatsApp client disconnects properly.


🤝 Contributing
We ❤️ contributions! To add to the v2 branch:

Fork the repository.
Clone the v2 branch:git clone -b v2 https://github.com/ShaktiNTripathi/Bulk_Whatsapp.git


Create a feature branch:git checkout -b feature/your-awesome-feature


Commit your changes:git commit -m 'Add your awesome feature'


Push to your branch:git push origin feature/your-awesome-feature


Open a pull request against the v2 branch.

Keep the code style consistent and add clear comments. 🌟

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

🌈 Let's Connect!
Ready to send messages like a pro? 📲 For bugs, ideas, or feature requests, open an issue on the GitHub Issues page or reach out directly:

WhatsApp or Call: 📞 +917310213636Drop a message on WhatsApp or give a call to discuss the project, share feedback, or get help with setup. Available for quick chats or detailed queries!Note: Please use this number responsibly and avoid spamming.

The v2 branch is packed with the latest features, so dive in and start scheduling! 🚀
Happy Messaging! 🎉
