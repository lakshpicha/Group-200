# Parul University - Smart Campus Event Manager

A comprehensive event management system specifically designed for Parul University with real-time chat support, payment tracking, and interactive features.

## 🌟 Features

### 🎓 University Branding
- **Parul University** branding throughout the application
- Custom university color scheme and logo integration
- University-specific terminology and styling

### 🔐 Authentication & Registration
- **College ID** based login system
- Comprehensive registration form with:
  - College ID validation
  - Full name and email
  - **Phone number** for SMS notifications
  - Password confirmation
- Secure user data storage

### 📱 Profile Management
- Complete profile page with personal information
- **Payment History** tracking with:
  - Transaction details
  - Payment status (Paid/Pending/Failed)
  - Transaction IDs and payment methods
- **My Events** section showing registered events
- **Notification Settings** for:
  - Email notifications
  - **SMS notifications**
  - Event reminders

### 💰 Payment System
- Integrated payment tracking
- Real-time payment status updates
- **SMS notifications** for payment confirmations
- Payment history with detailed transaction information
- Multiple payment methods support (UPI, Credit Card, etc.)

### 💬 Real-Time Chat System
- **System Support Chat** for technical assistance
- **Event Head Chat** for direct communication with event organizers
- Real-time messaging with Socket.IO
- Chat history preservation
- Unread message indicators
- Typing indicators
- Online/offline status
- Message timestamps

### 📅 Event Management
- Browse all university events
- Event registration with payment processing
- Event details with organizer information
- Event head contact information
- Event categories (Technology, Cultural, Sports)
- Event capacity tracking

### 🔔 Notification System
- **SMS notifications** for:
  - Event registration confirmations
  - Payment confirmations
  - Event reminders
- Email notifications
- Real-time in-app notifications
- Customizable notification preferences

### 📊 Dashboard
- Overview of all events
- Personal event statistics
- Pending payments tracking
- Unread messages count
- Interactive charts and metrics

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Modern web browser with WebSocket support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/parul-university/smart-campus-event-manager.git
   cd smart-campus-event-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open your browser and navigate to: `http://localhost:3000`

## 📱 How to Use

### For Students

1. **Registration**
   - Click "Register here" on the login page
   - Fill in your College ID, name, email, and phone number
   - Set a secure password
   - Complete registration

2. **Login**
   - Enter your College ID, email, and password
   - Access the dashboard

3. **Browse Events**
   - Navigate to the Events section
   - View event details, dates, and fees
   - Register for events with integrated payment

4. **Chat Support**
   - Access Support Chat for system issues
   - Chat directly with Event Heads for registered events
   - Real-time messaging with instant responses

5. **Profile Management**
   - View and update personal information
   - Check payment history
   - Manage notification preferences
   - View registered events

### For Event Heads

1. **Receive Chat Messages**
   - Get notified when students message you
   - Respond in real-time
   - Manage multiple conversations

2. **Event Management**
   - Update event information
   - Track registrations
   - Communicate with participants

### For System Administrators

1. **Monitor Chat Activity**
   - View active chat rooms
   - Monitor user activity
   - Handle support requests

2. **System Analytics**
   - Access `/api/chat-stats` for chat statistics
   - View `/api/active-users` for current users

## 🛠️ Technical Architecture

### Frontend
- **HTML5** with semantic markup
- **Bootstrap 5** for responsive design
- **Font Awesome** for icons
- **Vanilla JavaScript** for functionality
- **Socket.IO Client** for real-time communication

### Backend
- **Node.js** with Express.js
- **Socket.IO** for real-time chat
- **CORS** enabled for cross-origin requests
- **RESTful API** endpoints

### Data Storage
- **LocalStorage** for client-side data persistence
- **In-memory storage** for chat sessions
- JSON-based data structure

### Real-Time Features
- **WebSocket** connections via Socket.IO
- **Real-time messaging** between users
- **Live status updates** (online/offline)
- **Typing indicators**
- **Auto-responses** for common queries

## 📡 API Endpoints

### Chat Statistics
```
GET /api/chat-stats
```
Returns active chat rooms and user counts.

### Active Users
```
GET /api/active-users
```
Returns list of currently active users.

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

### Socket.IO Events

#### Client to Server
- `join_chat`: Join a chat room
- `send_message`: Send a message
- `leave_chat`: Leave current chat
- `typing_start/typing_stop`: Typing indicators
- `system_support_request`: Request system support

#### Server to Client
- `message`: Receive new message
- `user_joined/user_left`: User status updates
- `typing`: Typing indicators
- `user_status`: Online/offline status

## 📱 Mobile Responsiveness

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen orientations

## 🔒 Security Features

- Input validation and sanitization
- XSS protection
- CORS configuration
- Secure WebSocket connections
- Data encryption for sensitive information

## 🎨 Customization

### Styling
- Custom CSS variables for university colors
- Bootstrap utility classes
- Font Awesome icons
- Responsive design patterns

### Branding
- University logo integration
- Custom color scheme
- Parul University specific terminology
- Professional UI/UX design

## 🐛 Troubleshooting

### Common Issues

1. **Chat not connecting**
   - Check if the server is running
   - Verify WebSocket support in browser
   - Check network connectivity

2. **SMS notifications not working**
   - Verify phone number format
   - Check notification settings
   - Ensure SMS service is configured

3. **Payment issues**
   - Check payment gateway configuration
   - Verify transaction IDs
   - Contact finance department

## 📞 Support

For technical support or questions:
- Use the in-app System Support Chat
- Email: support@paruluniversity.ac.in
- Phone: +91-XX-XXXX-XXXX

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- Parul University Development Team
- Socket.IO community
- Bootstrap team
- Font Awesome contributors

---

**© 2024 Parul University. All rights reserved.**

*Made with ❤️ for the Parul University community*