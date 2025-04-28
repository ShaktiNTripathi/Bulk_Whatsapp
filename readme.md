```markdown
# WhatsApp Bulk Messaging Scheduler

This is a Node.js application that allows you to schedule and send bulk WhatsApp messages with media to multiple contacts at specific times. It uses the [WhatsApp Web.js](https://github.com/mukulhase/WebWhatsapp-Wrapper) library and integrates with `moment.js` to handle date-time scheduling. 

## Features

- **QR Code Authentication**: Scans the WhatsApp Web QR code for authentication.
- **Bulk Messaging**: Send messages and media to multiple contacts with custom message counts.
- **Scheduling**: Schedule messages for a specific date and time.
- **Media Sending**: Attach media files (e.g., images, videos, APK files) to messages.
- **Graceful Shutdown**: Clean shutdown handling for better resource management and error handling.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- npm (Node Package Manager)

You will also need to install the following npm dependencies:

- `whatsapp-web.js`: For interacting with WhatsApp Web.
- `qrcode-terminal`: For displaying the QR code in the terminal.
- `moment`: For handling date-time scheduling.
- `readline`: For command-line input.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/whatsapp-bulk-message-scheduler.git
   cd whatsapp-bulk-message-scheduler
   ```

2. **Install Dependencies**:
   Run the following command to install the necessary npm packages:
   ```bash
   npm install
   ```

3. **Set Up Media File**:
   Place your media file (e.g., `.apk`, `.jpg`, `.mp4`) in the `./media/` directory. You can change the `mediaPath` variable in the code to specify a different path.

## Configuration

In the `index.js` file, update the following variables to suit your needs:

- **Contacts**: Add or remove contacts along with the number of messages to send to each contact.
  
  ```js
  const contacts = [
      { number: '+917310213636', count: 5 },
      { number: '+918271955286', count: 3 },
      { number: '+919876543211', count: 10 }
  ];
  ```

- **Media File**: Set the correct path to the media file you want to send.
  
  ```js
  const mediaPath = './media/whatsapp 1234.apk';
  ```

## Usage

1. **Start the Application**:
   Run the following command to start the WhatsApp client:
   ```bash
   node index.js
   ```

2. **Scan QR Code**:
   - Once the application starts, it will display a QR code in the terminal. 
   - Open WhatsApp on your phone, go to the "WhatsApp Web" section, and scan the QR code to authenticate.

3. **Schedule Messages**:
   After the authentication, you will be prompted to enter the **Date and Time** for scheduling the messages in the format `YYYY-MM-DD HH:mm`. The application will wait until the specified time and then send the bulk messages to the provided contacts.

4. **Monitoring and Logging**:
   You will see logs in the terminal indicating the current status of the message-sending process, including:
   - Scheduled time confirmation
   - Sending progress for each contact
   - Error handling if any issues occur

5. **Graceful Shutdown**:
   The application will attempt to disconnect gracefully if terminated using `Ctrl+C` or if any unexpected errors occur.

## Example Output

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

## Error Handling

- **Authentication Failure**: If the authentication fails, the application will log the error and exit.
- **Invalid Date-Time Format**: If the entered date-time format is incorrect, the application will notify the user and exit.
- **Sending Failures**: If any errors occur while sending messages (e.g., network issue, wrong contact), the application will log the error and continue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Notes

- **Rate Limiting**: WhatsApp may apply rate limits if you send too many messages in a short period, so be mindful of the number of messages you send.
- **Media File**: Ensure that the media file path is correct, and the file is supported by WhatsApp.
- **Scaling**: If you plan to use this for a larger number of contacts, consider introducing additional features like rate limiting, error retries, and message queues for better scalability.

---

For further questions or contributions, feel free to reach out or submit pull requests.
```

This `README.md` provides an overview of the project, installation instructions, configuration, usage, and error handling. It should guide users through the setup and usage of the application efficiently.
