# Whispr: Real-time Communication Platform 💬

Whispr is a modern microfrontend, full-featured real-time chat application designed for seamless communication. It provides robust user authentication, private messaging, and comprehensive group chat functionalities, all built within a high-performance monorepo architecture. Dive into a dynamic chat experience where connecting with friends and groups is intuitive and efficient.

## 🚀 Installation

Getting Whispr up and running on your local machine is straightforward. Follow these steps:

### 1. Clone the Repository

First, grab a copy of the project to your local environment:

```bash
git clone https://github.com/Swag-blips/whispr-micro-frontend.git
```

### 2. Navigate to the Project Directory

Change your current directory to the cloned repository:

```bash
cd whispr-micro-frontend
```

### 3. Install Dependencies

This project uses `pnpm` and `Turborepo` for efficient dependency management. Ensure `pnpm` is installed globally (`npm install -g pnpm`). Then, install the monorepo's dependencies:

```bash
pnpm install
```

### 4. Configure Environment Variables

Before running the application, you'll need to set up your environment variables. Create a `.env.local` file at the root of the `apps/auth` and `apps/host` directories.

**For `apps/auth/.env.local`:**

```
NEXT_PUBLIC_API_URL=YOUR_BACKEND_API_URL # e.g., http://localhost:3005/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

**For `apps/host/.env.local`:**

```
NEXT_PUBLIC_API_URL=YOUR_BACKEND_API_URL # e.g., http://localhost:3005/api
```

Replace `YOUR_BACKEND_API_URL` with the URL of your backend API (if separate) and `YOUR_GOOGLE_CLIENT_ID` with your actual Google OAuth client ID.

## 🏃‍♀️ Usage

Once the dependencies are installed and environment variables are set, you can run the application:

### 1. Start the Development Servers

From the root of the monorepo (`whispr-micro-frontend`), start both the authentication and host applications using Turborepo:

```bash
pnpm run dev
```

This command will concurrently start the `auth` application (typically on `http://localhost:3007/auth`) and the `host` application (typically on `http://localhost:3006`).

### 2. Access the Application

*   **Authentication Portal**: Navigate to `http://localhost:3006/auth` in your web browser to access the signup and login pages.
*   **Main Application**: After successful authentication, you will be redirected to the main chat application, usually at `http://localhost:3006`.

### 3. Interacting with Whispr

*   **Authentication**: Sign up with email/password or use Google OAuth for a seamless login experience. Email verification and OTP-based login enhance security.
*   **Chat with Friends**: Once logged in, you can search for other users and send friend requests. Upon acceptance, you can initiate private one-on-one conversations.
*   **Group Chats**: Create new group chats, invite friends, and manage group details such as the group name and bio. You can also add or remove members as needed.
*   **Sending Messages**: Type your messages in the input field. The system includes typing indicators to show when someone is actively composing a message. Messages also display their status (sent, delivered, seen).
*   **Notifications**: Stay updated with real-time notifications for incoming friend requests and other important updates.

## ✨ Features

*   **Real-time Messaging**: Instantaneous message delivery powered by Socket.io, ensuring a fluid chat experience.
*   **Secure Authentication**: Comprehensive user registration and login flows, including email/password and Google OAuth. OTP verification adds an extra layer of security.
*   **Private Chats**: Engage in one-on-one conversations with your friends.
*   **Group Chat Management**: Create, customize, and manage group conversations, including adding or removing participants dynamically.
*   **Friend Request System**: Send and manage friend requests to connect with other users on the platform.
*   **Typing Indicators**: See when your chat partners are typing a response, enhancing the real-time feel.
*   **Message Delivery Status**: Track the status of your messages (sent, delivered, seen) for better communication awareness.
*   **Unread Message Counts**: Easily identify chats with new messages through dedicated unread counts.
*   **Responsive User Interface**: A modern and intuitive UI designed with Tailwind CSS, ensuring a great experience across devices.
*   **Monorepo Architecture**: Efficiently structured with Turborepo to manage multiple applications (auth, host) and shared packages within a single repository, fostering code reuse and streamlined development.

## 🛠️ Technologies Used

| Category          | Technology   | Description                                           |
| :---------------- | :----------- | :---------------------------------------------------- |
| **Framework**     | Next.js      | React framework for production-grade applications.    |
| **Language**      | TypeScript   | Statically typed superset of JavaScript.              |
| **Styling**       | Tailwind CSS | Utility-first CSS framework for rapid UI development. |
| **Monorepo**      | Turborepo    | High-performance build system for JavaScript/TypeScript monorepos. |
| **Package Manager**| pnpm         | Fast, disk-space efficient package manager.           |
| **State Management**| Zustand     | Small, fast, and scalable state-management solution. |
| **Data Fetching** | SWR          | React Hooks for data fetching with caching and revalidation. |
| **HTTP Client**   | Axios        | Promise-based HTTP client for the browser and Node.js. |
| **Real-time Comm.**| Socket.io    | Bidirectional communication for real-time applications. |
| **UI Components** | Lucide React | A collection of beautiful and customizable SVG icons. |
| **Notifications** | React Hot Toast | Lightweight and customizable toast notifications. |
| **Authentication**| JOSE         | Universal JavaScript implementation for JSON Object Signing and Encryption. |
| **Unique IDs**    | UUID         | For generating RFC compliant UUIDs.                   |

## 👤 Author Info

👋 Hi there! I'm a passionate software developer with a keen eye for building intuitive and scalable applications. My focus is on creating impactful user experiences through clean and efficient code.

Let's connect and build something amazing together!

*   **GitHub**: [@YourGitHubUsername](https://github.com/YourGitHubUsername)
*   **LinkedIn**: [@YourLinkedInProfile](https://www.linkedin.com/in/YourLinkedInProfile)
*   **Twitter**: [@YourTwitterHandle](https://twitter.com/YourTwitterHandle)
*   **Portfolio**: [YourPortfolioWebsite.com](https://www.YourPortfolioWebsite.com)

## 📄 License

This project is proprietary and all rights are reserved.

---
[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)