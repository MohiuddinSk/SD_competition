# SD_competition
Team members:-
1.Mohiuddin
2.Leander
3.Asma

We will be building a software which will make us victorious in the SD competition


folder structure

/travel-app
├── /client                      # React frontend
│   ├── /components
│   │   ├── CollapsibleCategory.jsx        # Collapsible UI for booking
│   │   ├── ProtectedRoute.jsx             # Redirect unauthenticated users
│   │   └── Navbar.jsx                     # Header with nav links
│   │
│   ├── /pages
│   │   ├── Login.jsx                      # Login form
│   │   ├── Register.jsx                   # Registration form
│   │   ├── Home.jsx                       # Main booking dashboard
│   │   ├── AIAssistant.jsx                # AI-based planner form
│   │   └── BookingConfirmation.jsx        # Booking result screen
│   │
│   ├── /services
│   │   ├── api.js                         # Axios instance with base URL
│   │   ├── authService.js                 # Login/register API calls
│   │   ├── bookingService.js              # Send bookings to backend
│   │   └── aiService.js                   # Call AI planning route
│   │
│   ├── App.jsx                            # Main app routes
│   ├── index.js                           # Entry point
│   └── .env                               # Frontend API base URL
│
├── /server                      # FastAPI backend
│   ├── main.py                            # Main FastAPI app setup
│   ├── /routes
│   │   ├── auth.py                        # /api/auth/login, /register
│   │   ├── booking.py                     # /api/bookings/*
│   │   └── ai.py                          # /api/ai/plan
│   │
│   ├── /models
│   │   ├── user_model.py                  # User schema
│   │   ├── booking_model.py               # Booking schema
│   │   └── ai_input_model.py              # Input validation for AI
│   │
│   ├── /utils
│   │   ├── jwt_helper.py                  # JWT encode/decode functions
│   │   ├── password_helper.py             # Hash/check password
│   │   └── ai_logic.py                    # AI planner rule logic
│   │
│   ├── /database
│   │   └── db.py                          # MongoDB connection
│   │
│   ├── requirements.txt                   # Python dependencies
│   └── .env                               # Secret keys, DB URI
│
├── README.md
└── .gitignore
