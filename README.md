# Random Chat - Anonymous Video Chat Application

A real-time video chat application that connects random strangers for anonymous conversations. Built with modern web technologies for a smooth and engaging user experience.

## 🎯 Features

- **Anonymous Chat**: Connect with random strangers without any sign-up or identity verification
- **Real-time Video Communication**: Powered by Zego Cloud's UI Kit Prebuilt
- **Text Chat**: Text messaging alongside video calls
- **Smart Matching**: Automatic pairing system that matches users seeking to chat
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Dynamic UI States**: Smooth transitions between idle, waiting, and chatting states
- **Next User**: Skip current partner and connect with another random user
- **Partner Disconnect Detection**: Automatically handles when a partner leaves the chat

## 📚 Tech Stack

### Frontend
- **Next.js 16.1** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Motion (Framer Motion)** - Animation library
- **Lucide React** - Icon library
- **Socket.IO Client** - Real-time communication
- **Zego Cloud UI Kit** - Video call infrastructure

### Backend
- **Node.js** - JavaScript runtime
- **Socket.IO** - WebSocket communication
- **UUID** - Unique identifier generation
- **Nodemon** - Development server with hot reload
- **dotenv** - Environment variable management

## 📁 Folder Structure

```
random_chat/
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home page with chat flow logic
│   │   ├── layout.tsx        # Root layout wrapper
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── Navbar.tsx        # Navigation bar (hidden during chat)
│   │   ├── Footer.tsx        # Footer component (hidden during chat)
│   │   └── VideoRoom.tsx     # Video call component using Zego
│   └── ...
├── eslint.config.mjs
├── next.config.ts
├── tsconfig.json
├── tailwind.config.js
├── package.json
└── README.md

socket/
├── index.js                  # Socket.IO server with chat logic
├── package.json
└── .env                      # Environment variables (not included)
```

## 🔄 Application Flow

### Page States

1. **Idle State**
   - User sees welcome screen with "Start Anonymous Chat" button
   - Navbar and Footer are visible
   - User can initiate a chat by clicking the button

2. **Waiting State**
   - Animated loader with "Waiting for a match..." message
   - Server queues the user in the waiting list
   - Navbar and Footer remain visible
   - Waiting for another user to join

3. **Chatting State**
   - Full-screen video call interface
   - Header with "Random Chat | Connected" status
   - "Next" button to skip current user
   - VideoRoom component displaying the video call
   - Navbar and Footer are hidden
   - Text chat available in the video interface

## 🔌 Socket Events

### Client Events
- **`start`** - User initiates a chat connection
- **`next`** - User wants to skip current partner and find another

### Server Events
- **`matched`** - Server sends matched room ID to both users
- **`waiting`** - Server confirms user is in waiting queue
- **`partnerLeft`** - Server notifies when chat partner disconnects

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chat
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd random_chat
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../socket
   npm install
   ```

4. **Environment Variables**
   
   Create `.env.local` in `random_chat/`:
   ```
   NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
   NEXT_PUBLIC_ZEGO_APP_ID=your_zego_app_id
   NEXT_PUBLIC_ZEGO_SERVER_SECRET=your_zego_server_secret
   ```

   Create `.env` in `socket/`:
   ```
   PORT=5000
   ```

### Running the Application

1. **Start Socket.IO Server**
   ```bash
   cd socket
   npm run dev
   ```

2. **Start Next.js Development Server** (in another terminal)
   ```bash
   cd random_chat
   npm run dev
   ```

3. **Open the application**
   - Navigate to `http://localhost:3000` in your browser
   - Open multiple tabs/windows to test the chat functionality

## 📱 Responsive Design

The application is fully responsive:
- **Mobile** (< 640px): Optimized touch interface, compact headers
- **Tablet** (640px - 1024px): Balanced layout
- **Desktop** (> 1024px): Full-featured UI with all elements visible

## 🛠️ Key Components

### Navbar.tsx
- Navigation bar visible during idle and waiting states
- Hides during active chat

### Footer.tsx
- Copyright and app info footer
- Hides during active chat to maximize video area

### VideoRoom.tsx
- Wrapper for Zego Cloud video call interface
- Handles token generation and room setup
- Manages video call configuration (1-on-1 mode, text chat enabled)

### page.tsx (Main Logic)
- Manages application state (idle/waiting/chatting)
- Handles socket connections and events
- Implements smooth animations between states
- Generates unique user IDs and room IDs

## 🎨 UI/UX Features

- **Smooth Animations**: Framer Motion powers all transitions
- **Glassmorphism Design**: Modern blur effects and transparency
- **Gradient Backgrounds**: Purple and blue gradients for visual appeal
- **Loading States**: Animated loader during matchmaking
- **Icon Integration**: Lucide icons for intuitive actions

## 📝 Build Commands

### Frontend
```bash
npm run dev

```

### Backend
```bash
npm run dev
```


## 👨‍💼 Author

Vishal Prajapati

---

**Enjoy anonymous conversations responsibly!** 🎉
