# React starter template for Cosmocloud hackathon
Save time in development set up.
- [Explore Documentation](https://docs.cosmocloud.io/)
- [Build API's using Cosmocloud](https://dashboard.cosmocloud.io)

## Used stack
- **UI** - Tailwindcss / ShadCn
- **Authentication** - AWS Cognito 
- **API client** - Axios 

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Adding Dependencies](#adding-dependencies)
- [Building for Production](#building-for-production)
- [Useful Resources](#useful-resources)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. **Install dependencies**

   ```bash
    npm install
    # or
    yarn install
   ```
3. **Set up environment variables**
   Copy the .env.example file to .env and update it with your environment-specific variables.

   ```bash
   cp .env.example .env
   ```
4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```
   This will start the Vite development server and open your React app in the default browser.

### Project Structure
Your Vite React project is organized into the following structure:
```bash
├── src
│   ├── components       # Reusable UI components
│   ├── lib              # Utility functions and libraries
│   ├── pages            # Page components (e.g., Home, About, etc.)
│   ├── service
│   │   ├── axios        # Axios configuration and HTTP requests
│   │   ├── amplify      # AWS Amplify configuration and utility functions
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point for the application
│   └── index.html       # HTML template for the app
├── .env.example         # Example environment variables
├── vite.config.js       # Vite configuration
├── package.json         # Project metadata and scripts
└── README.md            # Project documentation (this file)
```
