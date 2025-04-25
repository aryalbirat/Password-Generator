# Password Generator

A modern, feature-rich password generator application built with React and Tailwind CSS that helps users create secure, customizable passwords instantly.


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

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/password-generator.git

# Navigate to project directory
cd password-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. **Adjust Password Length**: Use the slider to select your desired password length (between 6-100 characters)
2. **Customize Character Sets**:
   - Check "Include Numbers" to add digits (0-9)
   - Check "Include Special Characters" to add symbols like !@#$%^&*
3. **Generate Password**: Click "Generate New Password" to create a new random password
4. **Copy to Clipboard**: Click the "Copy" button to copy the password to your clipboard
5. **Visual Feedback**: The button changes to "Copied!" for 2 seconds when successful

## Implementation Details

- **Password Generation Logic**: Uses a character set that's dynamically built based on user preferences
- **State Management**: React's useState hook manages application state
- **Memoization**: useCallback ensures password generation function is only recreated when dependencies change
- **Side Effects**: useEffect hook regenerates passwords when options change
- **DOM Access**: useRef provides direct access to the password input field for selection/copying

## Project Structure

```
password-generator/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── App.jsx       # Main application component
│   ├── main.jsx      # Entry point
│   └── index.css     # Global styles and Tailwind imports
├── package.json
├── vite.config.js
└── README.md
```

## Technologies

- **Frontend Framework**: React 18 with hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling
- **Code Quality**: ESLint for code linting
- **Development**: Hot Module Replacement for instant feedback

## Development

```bash
# Install dependencies
npm install

# Start development server with hot reloading
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Future Enhancements

- Password strength meter
- Save favorite passwords (encrypted)
- Custom character sets
- Password history
- Auto-generate pronounceable passwords
