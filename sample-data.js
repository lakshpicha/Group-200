// Sample data for Parul University Smart Campus Event Manager
// This file contains sample data for demonstration purposes

const sampleData = {
    // Sample users
    users: {
        "student1@paruluniversity.ac.in": {
            collegeId: "PU2021001",
            name: "Rajesh Kumar",
            email: "student1@paruluniversity.ac.in",
            phone: "+91-9876543210",
            password: "password123",
            registeredEvents: [1, 2],
            joinDate: "2024-01-15T00:00:00.000Z"
        },
        "student2@paruluniversity.ac.in": {
            collegeId: "PU2021002",
            name: "Priya Sharma",
            email: "student2@paruluniversity.ac.in",
            phone: "+91-9876543211",
            password: "password123",
            registeredEvents: [1, 3],
            joinDate: "2024-01-16T00:00:00.000Z"
        },
        "student3@paruluniversity.ac.in": {
            collegeId: "PU2021003",
            name: "Amit Patel",
            email: "student3@paruluniversity.ac.in",
            phone: "+91-9876543212",
            password: "password123",
            registeredEvents: [2],
            joinDate: "2024-01-17T00:00:00.000Z"
        }
    },

    // Sample events
    events: [
        {
            id: 1,
            name: "Parul University Tech Fest 2024",
            description: "Annual technology festival featuring coding competitions, hackathons, tech talks by industry experts, workshops on emerging technologies, and innovation showcases.",
            date: "2024-03-15",
            time: "09:00",
            venue: "Main Auditorium & Tech Labs",
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
                department: "Computer Science & Engineering"
            },
            requirements: ["Valid College ID", "Basic Programming Knowledge"],
            prizes: ["₹50,000 for 1st Prize", "₹30,000 for 2nd Prize", "₹20,000 for 3rd Prize"],
            sponsors: ["TCS", "Infosys", "Microsoft", "Google"]
        },
        {
            id: 2,
            name: "Cultural Night 2024 - 'Rang-e-Parul'",
            description: "A vibrant evening celebrating diverse cultures through music, dance, drama, and art performances by talented students from various departments.",
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
                department: "Fine Arts & Cultural Studies"
            },
            requirements: ["Student ID", "Costume for participation"],
            performances: ["Classical Dance", "Folk Music", "Drama", "Fashion Show"],
            refreshments: "Complimentary snacks and beverages"
        },
        {
            id: 3,
            name: "Inter-College Sports Championship",
            description: "Annual sports championship featuring cricket, football, basketball, athletics, and various indoor games with teams from different colleges.",
            date: "2024-04-05",
            time: "08:00",
            venue: "Sports Complex & Outdoor Grounds",
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
                department: "Physical Education & Sports"
            },
            sports: ["Cricket", "Football", "Basketball", "Athletics", "Volleyball"],
            prizes: ["Trophies", "Medals", "Certificates"],
            equipment: "All sports equipment provided"
        },
        {
            id: 4,
            name: "Business Plan Competition 2024",
            description: "Entrepreneurship competition where students present innovative business ideas to a panel of industry experts and investors.",
            date: "2024-04-12",
            time: "10:00",
            venue: "Business School Auditorium",
            fee: 300,
            organizer: "Dr. Neha Gupta",
            organizerPhone: "+91-9876543213",
            capacity: 200,
            registered: 89,
            category: "Business",
            image: "https://via.placeholder.com/300x200?text=Business+Plan",
            eventHead: {
                name: "Dr. Neha Gupta",
                phone: "+91-9876543213",
                email: "neha.gupta@paruluniversity.ac.in",
                department: "School of Business"
            },
            requirements: ["Business Plan Document", "Presentation Slides"],
            judges: ["Industry CEOs", "Venture Capitalists", "Successful Entrepreneurs"],
            networking: "Post-event networking session with judges"
        },
        {
            id: 5,
            name: "Science Exhibition & Innovation Fair",
            description: "Showcase of scientific projects, research work, and innovative solutions by students from various science departments.",
            date: "2024-04-20",
            time: "09:30",
            venue: "Science Complex",
            fee: 150,
            organizer: "Dr. Vikram Singh",
            organizerPhone: "+91-9876543214",
            capacity: 400,
            registered: 178,
            category: "Science",
            image: "https://via.placeholder.com/300x200?text=Science+Fair",
            eventHead: {
                name: "Dr. Vikram Singh",
                phone: "+91-9876543214",
                email: "vikram.singh@paruluniversity.ac.in",
                department: "School of Science"
            },
            categories: ["Physics", "Chemistry", "Biology", "Environmental Science"],
            display: "Interactive exhibits and live demonstrations",
            awards: "Best Project Awards in each category"
        }
    ],

    // Sample payment history
    payments: [
        {
            id: 1,
            eventId: 1,
            eventName: "Parul University Tech Fest 2024",
            amount: 500,
            date: "2024-02-15",
            status: "paid",
            transactionId: "TXN123456789",
            paymentMethod: "UPI",
            gatewayResponse: "SUCCESS",
            studentEmail: "student1@paruluniversity.ac.in"
        },
        {
            id: 2,
            eventId: 2,
            eventName: "Cultural Night 2024 - 'Rang-e-Parul'",
            amount: 200,
            date: "2024-02-20",
            status: "paid",
            transactionId: "TXN123456790",
            paymentMethod: "Credit Card",
            gatewayResponse: "SUCCESS",
            studentEmail: "student1@paruluniversity.ac.in"
        },
        {
            id: 3,
            eventId: 1,
            eventName: "Parul University Tech Fest 2024",
            amount: 500,
            date: "2024-02-18",
            status: "pending",
            transactionId: "TXN123456791",
            paymentMethod: "Net Banking",
            gatewayResponse: "PENDING",
            studentEmail: "student2@paruluniversity.ac.in"
        },
        {
            id: 4,
            eventId: 3,
            eventName: "Inter-College Sports Championship",
            amount: 100,
            date: "2024-02-22",
            status: "paid",
            transactionId: "TXN123456792",
            paymentMethod: "UPI",
            gatewayResponse: "SUCCESS",
            studentEmail: "student2@paruluniversity.ac.in"
        },
        {
            id: 5,
            eventId: 2,
            eventName: "Cultural Night 2024 - 'Rang-e-Parul'",
            amount: 200,
            date: "2024-02-25",
            status: "failed",
            transactionId: "TXN123456793",
            paymentMethod: "Credit Card",
            gatewayResponse: "INSUFFICIENT_FUNDS",
            studentEmail: "student3@paruluniversity.ac.in"
        }
    ],

    // Sample chat history
    chatHistory: {
        "system_student1@paruluniversity.ac.in_1708876543": {
            id: "system_student1@paruluniversity.ac.in_1708876543",
            type: "system",
            title: "System Support",
            participants: ["student1@paruluniversity.ac.in", "system@paruluniversity.ac.in"],
            messages: [
                {
                    id: 1,
                    sender: "system@paruluniversity.ac.in",
                    senderName: "System Support",
                    text: "Hello! I'm here to help you with any technical issues or questions about the event management system. How can I assist you today?",
                    timestamp: "2024-02-25T10:00:00.000Z",
                    read: true
                },
                {
                    id: 2,
                    sender: "student1@paruluniversity.ac.in",
                    senderName: "Rajesh Kumar",
                    text: "Hi! I'm having trouble with payment for the Tech Fest. The transaction failed but amount was deducted from my account.",
                    timestamp: "2024-02-25T10:01:00.000Z",
                    read: true
                },
                {
                    id: 3,
                    sender: "system@paruluniversity.ac.in",
                    senderName: "System Support",
                    text: "I understand your concern about the payment issue. Please provide your transaction ID so I can check the status and help resolve this matter quickly.",
                    timestamp: "2024-02-25T10:02:00.000Z",
                    read: true
                }
            ],
            createdAt: "2024-02-25T10:00:00.000Z",
            unreadCount: 0
        },
        "event_1_student2@paruluniversity.ac.in": {
            id: "event_1_student2@paruluniversity.ac.in",
            type: "event",
            eventId: 1,
            title: "Dr. Priya Sharma - Parul University Tech Fest 2024",
            participants: ["student2@paruluniversity.ac.in", "priya.sharma@paruluniversity.ac.in"],
            messages: [
                {
                    id: 1,
                    sender: "priya.sharma@paruluniversity.ac.in",
                    senderName: "Dr. Priya Sharma",
                    text: "Hello Priya! I'm Dr. Priya Sharma, the event head for Parul University Tech Fest 2024. How can I help you with this event?",
                    timestamp: "2024-02-26T14:30:00.000Z",
                    read: true
                },
                {
                    id: 2,
                    sender: "student2@paruluniversity.ac.in",
                    senderName: "Priya Sharma",
                    text: "Hello Dr. Sharma! I wanted to know about the coding competition rules and what programming languages are allowed.",
                    timestamp: "2024-02-26T14:35:00.000Z",
                    read: true
                },
                {
                    id: 3,
                    sender: "priya.sharma@paruluniversity.ac.in",
                    senderName: "Dr. Priya Sharma",
                    text: "Great question! We allow Java, Python, C++, and JavaScript. The competition will have 3 rounds: online qualifying, coding challenge, and final presentation. Do you have any specific questions about the format?",
                    timestamp: "2024-02-26T14:37:00.000Z",
                    read: true
                }
            ],
            createdAt: "2024-02-26T14:30:00.000Z",
            unreadCount: 0
        }
    },

    // Notification settings
    notificationSettings: {
        email: true,
        sms: true,
        eventReminders: true,
        paymentAlerts: true,
        chatNotifications: true
    }
};

// Demo credentials for testing
const demoCredentials = {
    students: [
        {
            collegeId: "PU2021001",
            email: "student1@paruluniversity.ac.in",
            password: "password123",
            name: "Rajesh Kumar"
        },
        {
            collegeId: "PU2021002",
            email: "student2@paruluniversity.ac.in",
            password: "password123",
            name: "Priya Sharma"
        },
        {
            collegeId: "PU2021003",
            email: "student3@paruluniversity.ac.in",
            password: "password123",
            name: "Amit Patel"
        }
    ],
    eventHeads: [
        {
            email: "priya.sharma@paruluniversity.ac.in",
            password: "eventhead123",
            name: "Dr. Priya Sharma",
            department: "Computer Science & Engineering"
        },
        {
            email: "rahul.patel@paruluniversity.ac.in",
            password: "eventhead123",
            name: "Prof. Rahul Patel",
            department: "Fine Arts & Cultural Studies"
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sampleData, demoCredentials };
}

// Make available globally for browser
if (typeof window !== 'undefined') {
    window.sampleData = sampleData;
    window.demoCredentials = demoCredentials;
}

console.log('Sample data loaded successfully!');
console.log('Demo Login Credentials:');
console.log('Students:', demoCredentials.students);
console.log('Event Heads:', demoCredentials.eventHeads);