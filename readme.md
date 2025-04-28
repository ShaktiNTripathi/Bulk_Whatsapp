```markdown
# WhatsApp Bulk Messaging Scheduler 📱

**A Node.js application to schedule and send bulk WhatsApp messages with media to multiple contacts at a specific time.** 

This tool utilizes the power of [WhatsApp Web.js](https://github.com/mukulhase/WebWhatsapp-Wrapper) to send scheduled bulk messages and media attachments, with an easy-to-use interface and a smooth scheduling process.

---

## Features ✨

- **QR Code Authentication**: 📱 Scan the QR code in the terminal for WhatsApp Web login.
- **Bulk Messaging**: 📤 Send bulk messages with customizable counts to multiple contacts.
- **Media Support**: 🎥 Attach media files (images, videos, APK, etc.) to your messages.
- **Scheduling**: 🕰️ Schedule your messages for a specific date and time.
- **Error Handling & Logging**: 📜 Robust error handling with informative logs.
- **Graceful Shutdown**: 🔌 Ensures smooth disconnection when the app is terminated.

---

## Prerequisites ⚙️

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- npm (Node Package Manager)

You'll also need to install the following npm dependencies:

- `whatsapp-web.js`: 📡 To interact with WhatsApp Web.
- `qrcode-terminal`: 🔲 For displaying QR codes in the terminal.
- `moment`: ⏱️ To handle date-time scheduling.
- `readline`: 📝 For command-line input.

---

## Installation 🛠️

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/whatsapp-bulk-message-scheduler.git
   cd whatsapp-bulk-message-scheduler
   ```

2. **Install Dependencies**:
   Run the following command to install all required npm packages:
   ```bash
   npm install
   ```

3. **Set Up Media File**:
   Place your media file (e.g., `.apk`, `.jpg`, `.mp4`) in the `./media/` directory. 
   You can modify the `mediaPath` variable in the code to specify a different path.

---

## Configuration 🔧

In the `index.js` file, configure the following variables:

### 1. **Contacts** 📇
Add or modify the contact details and the number of messages to be sent to each:
```js
const contacts = [
    { number: '+917310213636', count: 5 },
    { number: '+918271955286', count: 3 },
    { number: '+919876543211', count: 10 }
];
```

### 2. **Media File** 🎬
Specify the correct path to your media file:
```js
const mediaPath = './media/whatsapp 1234.apk';
```

---

## Usage 🚀

1. **Start the Application**:
   Run the app with the following command:
   ```bash
   node index.js
   ```

2. **Scan the QR Code**:
   Once the app starts, it will display a QR code in the terminal. Open WhatsApp on your phone, go to the **WhatsApp Web** section, and scan the QR code to authenticate.

3. **Schedule Messages** ⏰:
   After authentication, you'll be prompted to enter a **Date and Time** to schedule the message in the format `YYYY-MM-DD HH:mm`. The app will wait until the specified time and then send the messages.

4. **Monitor Logs** 📜:
   You'll see real-time logs in the terminal, showing:
   - The scheduled time.
   - Sending progress for each contact.
   - Any errors encountered during the process.

---

## Example Output 📊

```
📱 Scan the QR code below with WhatsApp:
<QR code here>
✅ WhatsApp client is ready!
📅 Current Date and Time: 2025-04-28 10:15
⏰ Enter the Date and Time to schedule sending (format: YYYY-MM-DD HH:mm): 2025-04-28 12:00
✅ Messages scheduled for: 2025-04-28 12:00
🕰 Waiting until scheduled time...
🚀 Sending bulk messages...
✅ (1/5) Sent to +917310213636
✅ (2/5) Sent to +917310213636
✅ (3/5) Sent to +917310213636
✅ (4/5) Sent to +917310213636
✅ (5/5) Sent to +917310213636
✅ All scheduled bulk messages sent successfully.
```

---

## Error Handling ⚠️

The application includes robust error handling:

- **Authentication Failure**: ❌ If authentication fails, the app logs the error and exits.
- **Invalid Date-Time**: ⏱️ If the date-time format is invalid, it notifies the user and exits.
- **Sending Errors**: 🚨 Any sending issues will be logged, but the app continues processing.

---

## License 📜

This project is licensed under the [MIT License](LICENSE).

---

## Notes 📝

- **Rate Limiting**: ⏳ WhatsApp may impose rate limits if too many messages are sent in a short period. Be mindful of the frequency.
- **Media File Support**: 📸 Ensure the media file format is supported by WhatsApp.
- **Scalability**: 📈 If you plan to scale up the number of contacts, consider using features like rate limiting, retries, and a message queue for better performance.

---

For **contributions** or any further **questions**, feel free to open an issue or submit a pull request.

---

## Acknowledgments 🙏

- [WhatsApp Web.js](https://github.com/mukulhase/WebWhatsapp-Wrapper) for the core WhatsApp functionality.
- [Moment.js](https://momentjs.com/) for date and time handling.
- [QRCode Terminal](https://github.com/gtanner/qrcode-terminal) for displaying QR codes.

```

---
