


# ShareFree

ShareFree is a file-sharing application designed to simplify the process of sharing files securely and efficiently. It supports various file formats, integrates email-based sharing, and includes automated file cleanup to optimize storage usage.

## Features

### 📂 File Sharing
- Share files up to **100MB** in size.
- Compatible with over **50 file formats**.

### 📧 Email Sharing
- Send files directly via email using **NodeMailer**.
- Instant notifications to recipients with a download link.

### ⏳ Automated Cleanup
- Files are automatically deleted after **24 hours**.
- Reduces storage costs by up to **30%**.

### 🔒 Secure Transfers
- Ensures secure file transfer and storage.
- Protects user data and file integrity.

### 🖥️ User-Friendly Interface
- Simple and intuitive design using **EJS templates**.
- Seamless experience for users across devices.

## Installation

### Prerequisites
- **Node.js** (v14+)
- **npm** or **yarn**
- **MongoDB** (for backend database storage)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/avnishkt/sharefree.git
   cd sharefree
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Usage
1. Navigate to the homepage.
2. Upload a file you want to share.
3. Share the generated link or send the file directly via email.
4. Files will expire and be deleted automatically after 24 hours.

## Technologies Used

### Frontend:
- **EJS** (Embedded JavaScript Templates)
- **HTML, CSS**

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB**
- **NodeMailer**

### Deployment:
- **Docker** (Optional)
- **Cloud Services** (e.g., AWS, Heroku, or Vercel)

## Contributing
We welcome contributions! Follow these steps to get started:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Added a new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries or issues, please contact:

**Avnish Tiwari**  
[GitHub](https://github.com/avnishkt)  
https://github.com/user-attachments/assets/f2c29560-6374-48d4-89de-089b6271b44f

![Screenshot 2025-01-24 005405](https://github.com/user-attachments/assets/cd62b960-1452-4cf7-8078-a41e1031d532)
![Screenshot 2025-01-24 005336](https://github.com/user-attachments/assets/23ec9d65-bca8-404c-893f-7137b21f3de7)
![Screenshot 2025-01-24 005314](https://github.com/user-attachments/assets/f02c6d83-a018-4229-9329-7b42f796faf6)
![Screenshot 2025-01-24 005301](https://github.com/user-attachments/assets/450b8d14-71c1-4073-8198-cd873d9b03ef)
