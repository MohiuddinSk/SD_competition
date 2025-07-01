# SD_competition
Team members:-
1.Mohiuddin
2.Leander
3.Asma

We will be building a software which will make us victorious in the SD competition


folder structure

/travel-app
│
├── /client                     # Frontend
│   ├── /assets                 # Images, icons
│   ├── /components             # Reusable UI components
│   │   └── CategorySection.tsx # Collapsible UI components
│   ├── /screens                # App screens (Login, Home, Booking)
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── BookingScreen.tsx
│   │   └── AIAssistantScreen.tsx
│   ├── /services               # API calls
│   │   └── api.ts
│   └── App.tsx                 # Entry point
│
├── /server                     # Backend
│   ├── /controllers            # Business logic
│   ├── /routes                 # API routes
│   ├── /models                 # Database models (User, Booking, etc.)
│   ├── /middlewares            # Auth, error handling
│   ├── /ai                     # AI logic for trip recommendations
│   │   └── travelPlanner.ts
│   └── server.ts               # Main server entry
│
├── /database
│   ├── schema.sql              # If using SQL
│   └── seed.js                 # Demo data
│
├── /config
│   └── db.ts                   # DB connection config
│   └── payment.ts             # Payment config
│
├── .env                        # Environment variables
├── package.json
└── README.md
