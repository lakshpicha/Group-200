// Parul University Smart Campus Event Manager
// Main JavaScript file with real-time chat and data management

// Global variables
let currentUser = null;
let currentChat = null;
let socket = null;
let userData = JSON.parse(localStorage.getItem('puEventManager_userData')) || {};
let eventsData = JSON.parse(localStorage.getItem('puEventManager_events')) || [];
let chatHistory = JSON.parse(localStorage.getItem('puEventManager_chatHistory')) || {};
let paymentHistory = JSON.parse(localStorage.getItem('puEventManager_payments')) || [];
let notificationSettings = JSON.parse(localStorage.getItem('puEventManager_notifications')) || {
    email: true,
    sms: true,
    eventReminders: true
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadSampleData();
    checkLoginStatus();
});

function initializeApp() {
    // Initialize Socket.IO for real-time chat
    socket = io({
        transports: ['websocket', 'polling']
    });

    // Socket event listeners
    socket.on('connect', function() {
        console.log('Connected to chat server');
    });

    socket.on('message', function(data) {
        receiveMessage(data);
    });

    socket.on('typing', function(data) {
        showTypingIndicator(data);
    });

    socket.on('user_status', function(data) {
        updateUserStatus(data);
    });

    // Form event listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
}

function loadSampleData() {
    // Load sample events if none exist
    if (eventsData.length === 0) {
        eventsData = [
            {
                id: 1,
                name: "Parul University Tech Fest 2024",
                description: "Annual technology festival with coding competitions, workshops, and tech talks.",
                date: "2024-03-15",
                time: "09:00",
                venue: "Main Auditorium",
                fee: 500,
                organizer: "Dr. Priya Sharma",
                organizerPhone: "+91-9876543210",
                capacity: 500,
                registered: 234,
                category: "Technology",
                image: "https://via.placeholder.com/300x200?text=Tech+Fest",
                eventHead: {
                    name: "Dr. Priya Sharma",
                    phone: "+91-9876543210",
                    email: "priya.sharma@paruluniversity.ac.in",
                    department: "Computer Science"
                }
            },
            {
                id: 2,
                name: "Cultural Night 2024",
                description: "An evening of music, dance, and cultural performances by students.",
                date: "2024-03-22",
                time: "18:00",
                venue: "Open Air Theatre",
                fee: 200,
                organizer: "Prof. Rahul Patel",
                organizerPhone: "+91-9876543211",
                capacity: 1000,
                registered: 567,
                category: "Cultural",
                image: "https://via.placeholder.com/300x200?text=Cultural+Night",
                eventHead: {
                    name: "Prof. Rahul Patel",
                    phone: "+91-9876543211",
                    email: "rahul.patel@paruluniversity.ac.in",
                    department: "Fine Arts"
                }
            },
            {
                id: 3,
                name: "Sports Championship",
                description: "Inter-college sports championship featuring cricket, football, and athletics.",
                date: "2024-04-05",
                time: "08:00",
                venue: "Sports Complex",
                fee: 100,
                organizer: "Coach Ankit Singh",
                organizerPhone: "+91-9876543212",
                capacity: 300,
                registered: 156,
                category: "Sports",
                image: "https://via.placeholder.com/300x200?text=Sports+Championship",
                eventHead: {
                    name: "Coach Ankit Singh",
                    phone: "+91-9876543212",
                    email: "ankit.singh@paruluniversity.ac.in",
                    department: "Physical Education"
                }
            }
        ];
        saveData();
    }

    // Load sample payment history
    if (paymentHistory.length === 0) {
        paymentHistory = [
            {
                id: 1,
                eventId: 1,
                eventName: "Parul University Tech Fest 2024",
                amount: 500,
                date: "2024-02-15",
                status: "paid",
                transactionId: "TXN123456789",
                paymentMethod: "UPI"
            },
            {
                id: 2,
                eventId: 2,
                eventName: "Cultural Night 2024",
                amount: 200,
                date: "2024-02-20",
                status: "pending",
                transactionId: "TXN123456790",
                paymentMethod: "Credit Card"
            }
        ];
        saveData();
    }
}

function checkLoginStatus() {
    const savedUser = localStorage.getItem('puEventManager_currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainContent();
        updateNavigation();
        loadDashboard();
    } else {
        showLogin();
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const collegeId = document.getElementById('collegeId').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation - in real app, this would be server-side
    const user = userData[email];
    if (user && user.password === password && user.collegeId === collegeId) {
        currentUser = user;
        localStorage.setItem('puEventManager_currentUser', JSON.stringify(currentUser));
        showMainContent();
        updateNavigation();
        loadDashboard();
        showNotification('Login successful!', 'success');
    } else {
        showNotification('Invalid credentials. Please try again.', 'error');
    }
}

function handleRegistration(e) {
    e.preventDefault();
    
    const collegeId = document.getElementById('regCollegeId').value;
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }

    if (userData[email]) {
        showNotification('Email already registered!', 'error');
        return;
    }

    // Create new user
    const newUser = {
        collegeId,
        name,
        email,
        phone,
        password,
        registeredEvents: [],
        joinDate: new Date().toISOString()
    };

    userData[email] = newUser;
    saveData();

    showNotification('Registration successful! Please login.', 'success');
    showLogin();
}

function showLogin() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('mainContent').style.display = 'none';
}

function showRegistration() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'block';
    document.getElementById('mainContent').style.display = 'none';
}

function showMainContent() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

function updateNavigation() {
    const navMenu = document.getElementById('navMenu');
    navMenu.innerHTML = `
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="fas fa-user"></i> ${currentUser.name}
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" onclick="showSection('profile')">
                    <i class="fas fa-user"></i> Profile
                </a></li>
                <li><a class="dropdown-item" href="#" onclick="showPaymentHistory()">
                    <i class="fas fa-credit-card"></i> Payment History
                </a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a></li>
            </ul>
        </li>
    `;
}

function showSection(sectionName) {
    // Hide all sections
    const sections = ['dashboard', 'events', 'profile', 'chat'];
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.style.display = 'none';
        }
    });

    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('fade-in');
    }

    // Load section-specific content
    switch(sectionName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'events':
            loadEvents();
            break;
        case 'profile':
            loadProfile();
            break;
        case 'chat':
            loadChatSection();
            break;
    }
}

function loadDashboard() {
    // Update dashboard stats
    document.getElementById('totalEvents').textContent = eventsData.length;
    document.getElementById('myEvents').textContent = currentUser.registeredEvents ? currentUser.registeredEvents.length : 0;
    
    const pendingPayments = paymentHistory.filter(p => 
        p.status === 'pending' && currentUser.registeredEvents && currentUser.registeredEvents.includes(p.eventId)
    ).length;
    document.getElementById('pendingPayments').textContent = pendingPayments;
    
    // Count unread messages
    let unreadCount = 0;
    for (let chatId in chatHistory) {
        const chat = chatHistory[chatId];
        if (chat.participants.includes(currentUser.email)) {
            unreadCount += chat.messages.filter(m => !m.read && m.sender !== currentUser.email).length;
        }
    }
    document.getElementById('unreadMessages').textContent = unreadCount;
}

function loadEvents() {
    const container = document.getElementById('eventsContainer');
    container.innerHTML = '';

    eventsData.forEach(event => {
        const isRegistered = currentUser.registeredEvents && currentUser.registeredEvents.includes(event.id);
        const eventCard = `
            <div class="col-md-4 mb-4">
                <div class="card event-card h-100">
                    <img src="${event.image}" class="card-img-top" alt="${event.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.description}</p>
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="badge bg-primary">${event.category}</span>
                                <span class="fw-bold">₹${event.fee}</span>
                            </div>
                            <div class="text-muted small">
                                <i class="fas fa-calendar"></i> ${event.date} at ${event.time}<br>
                                <i class="fas fa-map-marker-alt"></i> ${event.venue}<br>
                                <i class="fas fa-users"></i> ${event.registered}/${event.capacity} registered
                            </div>
                            <div class="mt-3">
                                <button class="btn btn-sm btn-outline-primary me-2" onclick="viewEventDetails(${event.id})">
                                    View Details
                                </button>
                                ${isRegistered ? 
                                    '<span class="badge bg-success">Registered</span>' : 
                                    `<button class="btn btn-sm btn-primary" onclick="registerForEvent(${event.id})">Register</button>`
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += eventCard;
    });
}

function loadProfile() {
    // Update profile information
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileCollegeId').textContent = `College ID: ${currentUser.collegeId}`;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profilePhone').textContent = currentUser.phone;

    // Load my events
    loadMyEvents();
    loadPaymentHistory();
    loadNotificationSettings();
}

function loadMyEvents() {
    const container = document.getElementById('myEventsContainer');
    if (!currentUser.registeredEvents || currentUser.registeredEvents.length === 0) {
        container.innerHTML = '<p class="text-muted">You have not registered for any events yet.</p>';
        return;
    }

    const myEvents = eventsData.filter(event => currentUser.registeredEvents.includes(event.id));
    container.innerHTML = myEvents.map(event => `
        <div class="card mb-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${event.image}" class="img-fluid rounded" alt="${event.name}">
                    </div>
                    <div class="col-md-9">
                        <h5>${event.name}</h5>
                        <p class="text-muted">${event.description}</p>
                        <div class="row">
                            <div class="col-md-6">
                                <small><i class="fas fa-calendar"></i> ${event.date} at ${event.time}</small><br>
                                <small><i class="fas fa-map-marker-alt"></i> ${event.venue}</small>
                            </div>
                            <div class="col-md-6">
                                <small><i class="fas fa-rupee-sign"></i> ₹${event.fee}</small><br>
                                <small><i class="fas fa-user"></i> ${event.organizer}</small>
                            </div>
                        </div>
                        <div class="mt-2">
                            <button class="btn btn-sm btn-outline-primary me-2" onclick="viewEventDetails(${event.id})">
                                View Details
                            </button>
                            <button class="btn btn-sm btn-outline-success" onclick="chatWithEventHead(${event.id})">
                                <i class="fas fa-comments"></i> Chat with Event Head
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function loadPaymentHistory() {
    const container = document.getElementById('paymentHistoryContainer');
    const userPayments = paymentHistory.filter(payment => 
        currentUser.registeredEvents && currentUser.registeredEvents.includes(payment.eventId)
    );

    if (userPayments.length === 0) {
        container.innerHTML = '<p class="text-muted">No payment history found.</p>';
        return;
    }

    container.innerHTML = userPayments.map(payment => `
        <div class="payment-item ${payment.status}">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h6>${payment.eventName}</h6>
                    <p class="text-muted mb-1">Transaction ID: ${payment.transactionId}</p>
                    <small class="text-muted">
                        ${payment.date} • ${payment.paymentMethod}
                    </small>
                </div>
                <div class="text-end">
                    <h6>₹${payment.amount}</h6>
                    <span class="status-badge ${payment.status}">${payment.status.toUpperCase()}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function loadNotificationSettings() {
    document.getElementById('emailNotifications').checked = notificationSettings.email;
    document.getElementById('smsNotifications').checked = notificationSettings.sms;
    document.getElementById('eventReminders').checked = notificationSettings.eventReminders;
}

// Chat functionality
function loadChatSection() {
    loadRecentChats();
}

function loadRecentChats() {
    const container = document.getElementById('recentChats');
    const userChats = [];

    for (let chatId in chatHistory) {
        const chat = chatHistory[chatId];
        if (chat.participants.includes(currentUser.email)) {
            userChats.push({
                id: chatId,
                ...chat,
                lastMessage: chat.messages[chat.messages.length - 1] || {}
            });
        }
    }

    if (userChats.length === 0) {
        container.innerHTML = '<p class="text-muted small">No recent chats</p>';
        return;
    }

    container.innerHTML = userChats.map(chat => `
        <div class="chat-list-item" onclick="openChat('${chat.id}')">
            <div class="d-flex justify-content-between">
                <strong>${chat.title}</strong>
                ${chat.unreadCount > 0 ? `<span class="unread-count">${chat.unreadCount}</span>` : ''}
            </div>
            <small class="text-muted">${chat.lastMessage.text || 'No messages yet'}</small>
        </div>
    `).join('');
}

function startChat(type) {
    if (type === 'system') {
        startSystemSupportChat();
    } else if (type === 'event') {
        showEventHeadSelection();
    }
}

function startSystemSupportChat() {
    const chatId = `system_${currentUser.email}_${Date.now()}`;
    const chat = {
        id: chatId,
        type: 'system',
        title: 'System Support',
        participants: [currentUser.email, 'system@paruluniversity.ac.in'],
        messages: [{
            id: 1,
            sender: 'system@paruluniversity.ac.in',
            senderName: 'System Support',
            text: 'Hello! I\'m here to help you with any technical issues or questions about the event management system. How can I assist you today?',
            timestamp: new Date().toISOString(),
            read: false
        }],
        createdAt: new Date().toISOString(),
        unreadCount: 1
    };

    chatHistory[chatId] = chat;
    saveData();
    openChat(chatId);
    loadRecentChats();
}

function showEventHeadSelection() {
    const modal = new bootstrap.Modal(document.getElementById('eventHeadModal'));
    const container = document.getElementById('eventHeadsList');

    // Get events user is registered for
    const userEvents = eventsData.filter(event => 
        currentUser.registeredEvents && currentUser.registeredEvents.includes(event.id)
    );

    if (userEvents.length === 0) {
        container.innerHTML = '<p class="text-muted">You need to register for events to chat with event heads.</p>';
    } else {
        container.innerHTML = userEvents.map(event => `
            <button class="btn btn-outline-primary w-100 mb-2" onclick="startEventHeadChat(${event.id})">
                <div class="text-start">
                    <strong>${event.eventHead.name}</strong><br>
                    <small>${event.name}</small><br>
                    <small class="text-muted">${event.eventHead.department}</small>
                </div>
            </button>
        `).join('');
    }

    modal.show();
}

function startEventHeadChat(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    const chatId = `event_${eventId}_${currentUser.email}`;
    
    // Check if chat already exists
    if (!chatHistory[chatId]) {
        const chat = {
            id: chatId,
            type: 'event',
            eventId: eventId,
            title: `${event.eventHead.name} - ${event.name}`,
            participants: [currentUser.email, event.eventHead.email],
            messages: [{
                id: 1,
                sender: event.eventHead.email,
                senderName: event.eventHead.name,
                text: `Hello ${currentUser.name}! I'm ${event.eventHead.name}, the event head for ${event.name}. How can I help you with this event?`,
                timestamp: new Date().toISOString(),
                read: false
            }],
            createdAt: new Date().toISOString(),
            unreadCount: 1
        };

        chatHistory[chatId] = chat;
        saveData();
    }

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('eventHeadModal'));
    modal.hide();

    openChat(chatId);
    loadRecentChats();
}

function openChat(chatId) {
    currentChat = chatHistory[chatId];
    if (!currentChat) return;

    // Show chat container
    document.getElementById('chatContainer').style.display = 'block';
    document.getElementById('chatWelcome').style.display = 'none';

    // Update chat title
    document.getElementById('chatTitle').textContent = currentChat.title;

    // Load messages
    loadChatMessages();

    // Mark messages as read
    currentChat.messages.forEach(msg => {
        if (msg.sender !== currentUser.email) {
            msg.read = true;
        }
    });
    currentChat.unreadCount = 0;
    saveData();

    // Join chat room for real-time updates
    if (socket) {
        socket.emit('join_chat', {
            chatId: chatId,
            user: currentUser
        });
    }

    // Update dashboard unread count
    loadDashboard();
}

function loadChatMessages() {
    const container = document.getElementById('chatMessages');
    container.innerHTML = '';

    currentChat.messages.forEach(message => {
        const messageElement = createMessageElement(message);
        container.appendChild(messageElement);
    });

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function createMessageElement(message) {
    const div = document.createElement('div');
    const isOwnMessage = message.sender === currentUser.email;
    
    div.className = `chat-message ${isOwnMessage ? 'sent' : 'received'}`;
    div.innerHTML = `
        <div class="message-bubble ${isOwnMessage ? 'sent' : 'received'}">
            ${message.text}
            <div class="message-info">
                ${isOwnMessage ? 'You' : message.senderName} • ${formatTime(message.timestamp)}
            </div>
        </div>
    `;

    return div;
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    
    if (!text || !currentChat) return;

    const message = {
        id: currentChat.messages.length + 1,
        sender: currentUser.email,
        senderName: currentUser.name,
        text: text,
        timestamp: new Date().toISOString(),
        read: true
    };

    // Add to local chat
    currentChat.messages.push(message);
    saveData();

    // Clear input
    input.value = '';

    // Add to UI
    const container = document.getElementById('chatMessages');
    const messageElement = createMessageElement(message);
    container.appendChild(messageElement);
    container.scrollTop = container.scrollHeight;

    // Send via socket
    if (socket) {
        socket.emit('send_message', {
            chatId: currentChat.id,
            message: message
        });
    }

    // Simulate response for demo purposes
    setTimeout(() => {
        simulateResponse();
    }, 1000 + Math.random() * 2000);
}

function simulateResponse() {
    if (!currentChat) return;

    let responseText = '';
    const responses = {
        system: [
            "I understand your concern. Let me help you with that.",
            "That's a great question! Here's what you need to know...",
            "I can definitely assist you with this issue.",
            "Thank you for reaching out. Let me provide you with the information.",
            "I'm here to help resolve any technical difficulties you might be experiencing."
        ],
        event: [
            "Thanks for your question about the event!",
            "I'm glad you're interested in participating.",
            "Let me provide you with more details about this.",
            "That's an excellent point. Here's what I can tell you...",
            "I appreciate your enthusiasm for the event!"
        ]
    };

    const responseList = responses[currentChat.type] || responses.system;
    responseText = responseList[Math.floor(Math.random() * responseList.length)];

    const senderInfo = currentChat.type === 'system' 
        ? { email: 'system@paruluniversity.ac.in', name: 'System Support' }
        : eventsData.find(e => e.id === currentChat.eventId)?.eventHead;

    const response = {
        id: currentChat.messages.length + 1,
        sender: senderInfo.email,
        senderName: senderInfo.name,
        text: responseText,
        timestamp: new Date().toISOString(),
        read: false
    };

    currentChat.messages.push(response);
    currentChat.unreadCount = (currentChat.unreadCount || 0) + 1;
    saveData();

    // Add to UI if chat is currently open
    if (document.getElementById('chatContainer').style.display !== 'none') {
        const container = document.getElementById('chatMessages');
        const messageElement = createMessageElement(response);
        container.appendChild(messageElement);
        container.scrollTop = container.scrollHeight;

        // Mark as read immediately
        response.read = true;
        currentChat.unreadCount = Math.max(0, currentChat.unreadCount - 1);
        saveData();
    }

    loadDashboard();
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function endChat() {
    currentChat = null;
    document.getElementById('chatContainer').style.display = 'none';
    document.getElementById('chatWelcome').style.display = 'block';

    if (socket) {
        socket.emit('leave_chat');
    }
}

// Event management functions
function viewEventDetails(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    document.getElementById('eventModalTitle').textContent = event.name;
    document.getElementById('eventModalBody').innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${event.image}" class="img-fluid rounded mb-3" alt="${event.name}">
            </div>
            <div class="col-md-6">
                <h5>Event Details</h5>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Time:</strong> ${event.time}</p>
                <p><strong>Venue:</strong> ${event.venue}</p>
                <p><strong>Fee:</strong> ₹${event.fee}</p>
                <p><strong>Organizer:</strong> ${event.organizer}</p>
                <p><strong>Phone:</strong> ${event.organizerPhone}</p>
                <p><strong>Capacity:</strong> ${event.capacity}</p>
                <p><strong>Registered:</strong> ${event.registered}</p>
            </div>
        </div>
        <div class="mt-3">
            <h5>Description</h5>
            <p>${event.description}</p>
        </div>
        <div class="mt-3">
            <h5>Event Head</h5>
            <div class="card">
                <div class="card-body">
                    <p><strong>Name:</strong> ${event.eventHead.name}</p>
                    <p><strong>Department:</strong> ${event.eventHead.department}</p>
                    <p><strong>Email:</strong> ${event.eventHead.email}</p>
                    <p><strong>Phone:</strong> ${event.eventHead.phone}</p>
                </div>
            </div>
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('eventModal'));
    modal.show();
}

function registerForEvent(eventId) {
    if (!eventId) {
        // Called from modal
        eventId = getCurrentModalEventId();
    }

    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    if (!currentUser.registeredEvents) {
        currentUser.registeredEvents = [];
    }

    if (currentUser.registeredEvents.includes(eventId)) {
        showNotification('You are already registered for this event!', 'warning');
        return;
    }

    // Register user
    currentUser.registeredEvents.push(eventId);
    event.registered++;

    // Add payment record
    const payment = {
        id: paymentHistory.length + 1,
        eventId: eventId,
        eventName: event.name,
        amount: event.fee,
        date: new Date().toISOString().split('T')[0],
        status: 'paid',
        transactionId: `TXN${Date.now()}`,
        paymentMethod: 'UPI'
    };
    paymentHistory.push(payment);

    // Update localStorage
    localStorage.setItem('puEventManager_currentUser', JSON.stringify(currentUser));
    userData[currentUser.email] = currentUser;
    saveData();

    showNotification('Successfully registered for the event!', 'success');
    loadEvents();
    loadDashboard();

    // Send SMS notification if enabled
    if (notificationSettings.sms) {
        sendSMSNotification(`Registration confirmed for ${event.name} on ${event.date}. Payment of ₹${event.fee} processed. Transaction ID: ${payment.transactionId}`);
    }

    // Close modal if open
    const modal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
    if (modal) {
        modal.hide();
    }
}

function chatWithEventHead(eventId) {
    startEventHeadChat(eventId);
    showSection('chat');
}

// Utility functions
function saveData() {
    localStorage.setItem('puEventManager_userData', JSON.stringify(userData));
    localStorage.setItem('puEventManager_events', JSON.stringify(eventsData));
    localStorage.setItem('puEventManager_chatHistory', JSON.stringify(chatHistory));
    localStorage.setItem('puEventManager_payments', JSON.stringify(paymentHistory));
    localStorage.setItem('puEventManager_notifications', JSON.stringify(notificationSettings));
}

function showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function sendSMSNotification(message) {
    // Simulate SMS sending
    console.log(`SMS sent to ${currentUser.phone}: ${message}`);
    
    // In a real application, this would make an API call to SMS service
    // For demo purposes, we'll show a notification
    setTimeout(() => {
        showNotification('SMS notification sent to your registered phone number', 'info');
    }, 1000);
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

function saveNotificationSettings() {
    notificationSettings.email = document.getElementById('emailNotifications').checked;
    notificationSettings.sms = document.getElementById('smsNotifications').checked;
    notificationSettings.eventReminders = document.getElementById('eventReminders').checked;
    
    saveData();
    showNotification('Notification settings saved successfully!', 'success');
}

function showPaymentHistory() {
    showSection('profile');
    // Switch to payments tab
    const paymentsTab = document.getElementById('payments-tab');
    const tab = new bootstrap.Tab(paymentsTab);
    tab.show();
}

function logout() {
    localStorage.removeItem('puEventManager_currentUser');
    currentUser = null;
    currentChat = null;
    
    if (socket) {
        socket.disconnect();
    }
    
    showLogin();
    showNotification('Logged out successfully!', 'success');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Show dashboard by default when logged in
    if (currentUser) {
        showSection('dashboard');
    }
});