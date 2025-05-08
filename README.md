# Password Generator & Manager

A modern, full-stack password generator and management application built with React, Express, and MongoDB. Generate strong passwords, save them securely with encryption, and manage your passwords across devices.

## Features

- **Secure Random Password Generation**: Creates cryptographically strong passwords using JavaScript's Math.random() function
- **Highly Customizable**:
  - Adjust password length from 6 to 100 characters using an interactive slider
  - Toggle inclusion of numbers (0-9)
  - Toggle inclusion of special characters (!@#$%^&*-_+=[]{}~`)
  - Default option includes uppercase and lowercase letters
- **User-Friendly Interface**:
  - Real-time password generation when adjusting options
  - One-click copy to clipboard functionality
  - Visual confirmation when password is copied
  - Responsive design that works on mobile and desktop
- **Modern UI**:
  - Gradient backgrounds and buttons
  - Dark mode interface for reduced eye strain
  - Clear visual feedback for all user interactions
- **Password Management**:
  - Save generated passwords to your account with AES-256 encryption
  - View, edit, and delete saved passwords
  - Search and filter your password collection
  - Tags and categories for better organization
  - Password usage tracking and history

## Installation

### Prerequisites

Before installation, make sure you have the following installed on your system:

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)
- MongoDB (v5.0 or higher)

### MongoDB Setup

1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start the MongoDB service
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   ```
3. Verify MongoDB is running
   ```bash
   mongo --version
   ```

### Application Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/password-generator.git

# Navigate to project directory
cd password-generator

# Install dependencies (includes both frontend and backend)
npm install

# Configure environment variables
cp .env.example .env
```

### Environment Variables

Open the `.env` file and update the following variables:

```
# Required - MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/passwordGenerator

# Required - JWT Secret for authentication
JWT_SECRET=your_secure_random_string

# Required - Encryption key for password security
ENCRYPTION_KEY=your_secure_encryption_key

# Optional - Server port (default: 5000)
PORT=5000

# Optional - JWT expiration time (default: 30d)
JWT_EXPIRES_IN=30d

# Optional - JWT cookie expiration time in days (default: 30)
JWT_COOKIE_EXPIRE=30
```

For production, make sure to:
- Use a secure random string for JWT_SECRET
- Use a strong encryption key for ENCRYPTION_KEY
- Use HTTPS in production environments

### Running the Application

```bash
# Start development servers (frontend & backend concurrently)
npm run dev:full

# OR start them individually
npm run dev     # Frontend only - runs on port 5173 by default
npm run server  # Backend only - runs on port 5000 by default

# Build for production
npm run build
```

## Usage

1. **Register/Login**: Create an account or login to access the password management features
2. **Adjust Password Length**: Use the slider to select your desired password length (between 6-100 characters)
3. **Customize Character Sets**:
   - Check "Include Numbers" to add digits (0-9)
   - Check "Include Special Characters" to add symbols like !@#$%^&*
4. **Generate Password**: Click "Generate New Password" to create a new random password
5. **Copy to Clipboard**: Click the "Copy" button to copy the password to your clipboard
6. **Visual Feedback**: The button changes to "Copied!" for 2 seconds when successful
7. **Save Password**: Click "Save Password" to store it in your account with a title and optional metadata
8. **Manage Passwords**: View your saved passwords, reveal them when needed, and organize with tags

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/forgotpassword` - Request password reset
- `PUT /api/auth/resetpassword/:resettoken` - Reset password

### Passwords
- `GET /api/passwords` - Get all user passwords
- `POST /api/passwords` - Create a new password
- `GET /api/passwords/:id` - Get a specific password (with decryption)
- `PUT /api/passwords/:id` - Update a password
- `DELETE /api/passwords/:id` - Delete a password

## Project Structure

```
password-generator/
├── src/                      # Frontend source files
│   ├── components/           # React components
│   │   ├── PasswordGenerator.jsx   # Main password generation component
│   │   ├── PasswordList.jsx        # List of saved passwords
│   │   ├── PasswordItem.jsx        # Individual password display component
│   │   └── Authentication/         # Auth components
│   │       ├── Login.jsx           # Login form
│   │       └── Register.jsx        # Registration form
│   ├── services/             # API service connectors
│   │   ├── api.js            # Axios configuration and password services
│   │   └── auth.js           # Authentication service methods
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles and Tailwind imports
├── backend/                  # Express.js backend
│   ├── controllers/          # API controllers
│   │   ├── authController.js       # User authentication logic
│   │   └── passwordController.js   # Password CRUD operations
│   ├── models/               # Mongoose data models
│   │   ├── User.js                 # User model with JWT & password methods
│   │   └── Password.js             # Password model with encryption
│   ├── routes/               # API routes
│   │   ├── auth.js                 # Authentication routes
│   │   └── passwords.js            # Password management routes
│   ├── middleware/           # Express middleware
│   │   └── auth.js                 # Authentication & protection middleware
│   ├── config/               # Configuration
│   │   └── db.js                   # MongoDB connection setup
│   ├── utils/                # Utility functions
│   │   ├── envConfig.js            # Environment variables handler
│   │   └── encryption.js           # Encryption utilities
│   └── server.js             # Express server entry point
├── .env.example              # Example environment variables
├── package.json              # Project dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # Project documentation
```

## Implementation Details

- **Authentication System**: JWT-based authentication with secure password hashing using bcrypt
- **Password Generation Logic**: Uses a character set that's dynamically built based on user preferences
- **State Management**: React's useState hook manages application state
- **Memoization**: useCallback ensures password generation function is only recreated when dependencies change
- **Side Effects**: useEffect hook regenerates passwords when options change
- **DOM Access**: useRef provides direct access to the password input field for selection/copying
- **Backend Security**: 
  - CORS configured properly with credentials
  - HTTP-only cookies for enhanced security
  - Password hashing and token-based authentication
  - AES-256 encryption for storing passwords

## Technologies

- **Frontend Framework**: React 18 with hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling
- **Backend**: Express.js for RESTful API
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Encryption**: AES-256 for password security using CryptoJS
- **API Communication**: Axios for HTTP requests
- **Code Quality**: ESLint for code linting
- **Development**: Hot Module Replacement for instant feedback

## Development

```bash
# Install dependencies
npm install

# Start frontend development server with hot reloading
npm run dev

# Start backend development server
npm run server

# Run both frontend and backend concurrently
npm run dev:full

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Future Enhancements

- Password strength meter
- Two-factor authentication
- Password sharing functionality
- Password expiration reminders
- Cross-device synchronization
- Browser extension integration
- Password generation statistics

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify MongoDB is running
   - Check your MONGO_URI in .env file
   - Ensure network connectivity to the database

2. **JWT/Authentication Issues**
   - Verify JWT_SECRET is set in .env
   - Clear browser cookies and localStorage
   - Check token expiration time
   - Ensure the token is being properly included in API requests

3. **Password Encryption Issues**
   - Ensure ENCRYPTION_KEY is properly set
   - Don't change the encryption key after passwords are saved
   - If key must be changed, create a migration script

4. **Browser Compatibility Issues**
   - Clipboard API may require HTTPS in some browsers
   - Ensure you're using a modern browser that supports all required features
   - Try disabling browser extensions that might interfere with the application

### Debugging

When troubleshooting:
- **Frontend issues**: Check the browser console (F12 or Ctrl+Shift+J)
- **Backend issues**: Check terminal output where the server is running
- **Network issues**: Use the Network tab in browser DevTools to inspect API requests
- **Database issues**: Use MongoDB Compass or similar tools to inspect database content

### Getting Help

If you encounter issues:
- Check the console logs for errors
- Verify environment variables are correctly set
- Make sure all dependencies are installed
- Open an issue on the GitHub repository with detailed steps to reproduce

## License

MIT

## Author

Birat Aryal
