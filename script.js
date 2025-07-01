const { useState, useEffect } = React;

// Main App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentView, setCurrentView] = useState('categories'); // 'categories', 'ai-planner', 'booking', 'payment'
  const [activeCategory, setActiveCategory] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [user, setUser] = useState(null);

  // Mock database
  const mockUsers = [
    { id: 1, email: 'user@example.com', password: 'password', name: 'John Doe' }
  ];

  // Login function
  const handleLogin = (email, password) => {
    const foundUser = mockUsers.find(user => user.email === email && user.password === password);
    if (foundUser) {
      setUser(foundUser);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  // Register function
  const handleRegister = (name, email, password) => {
    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password
    };
    mockUsers.push(newUser);
    setUser(newUser);
    setIsLoggedIn(true);
    return true;
  };

  // Handle AI Planner submission
  const handlePlanSubmit = (planData) => {
    // Mock AI recommendation
    const recommendation = {
      transport: {
        type: planData.budget > 500 ? 'flight' : 'train',
        details: planData.budget > 500 ? 
          `Flight to ${planData.destination} for ${planData.people} people` : 
          `Train to ${planData.destination} for ${planData.people} people`
      },
      hotel: {
        name: planData.budget > 500 ? 'Luxury Hotel' : 'Budget Hotel',
        details: `${planData.days} nights stay in ${planData.destination}`
      },
      totalCost: planData.budget > 500 ? 
        Math.min(planData.budget, 800) : 
        Math.min(planData.budget, 300)
    };
    
    setBookingDetails(recommendation);
    setCurrentView('booking');
  };

  // Render login/register if not logged in
  if (!isLoggedIn) {
    return (
      <div className="auth-container">
        {showRegister ? (
          <RegisterForm 
            onRegister={handleRegister} 
            onSwitchToLogin={() => setShowRegister(false)} 
          />
        ) : (
          <LoginForm 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setShowRegister(true)} 
          />
        )}
      </div>
    );
  }

  // Render main app when logged in
  return (
    <div className="app">
      <Header 
        user={user} 
        onLogout={() => setIsLoggedIn(false)} 
      />
      
      <div className="container">
        {currentView === 'categories' && (
          <TravelCategories 
            onSelectCategory={setActiveCategory} 
            onShowPlanner={() => setCurrentView('ai-planner')}
          />
        )}
        
        {currentView === 'ai-planner' && (
          <AIPlanner 
            onSubmit={handlePlanSubmit} 
            onBack={() => setCurrentView('categories')}
          />
        )}
        
        {currentView === 'booking' && bookingDetails && (
          <Booking 
            details={bookingDetails} 
            onConfirm={() => setCurrentView('payment')} 
            onBack={() => setCurrentView('categories')}
          />
        )}
        
        {currentView === 'payment' && bookingDetails && (
          <Payment 
            amount={bookingDetails.totalCost} 
            onComplete={() => {
              alert('Booking confirmed!');
              setCurrentView('categories');
              setBookingDetails(null);
            }} 
            onBack={() => setCurrentView('booking')}
          />
        )}
      </div>
    </div>
  );
}

// Auth Components
function LoginForm({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }
    
    const success = onLogin(email, password);
    if (!success) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <p className="text-center mt-3">
        Don't have an account?{' '}
        <a href="#" onClick={onSwitchToRegister}>Register</a>
      </p>
    </div>
  );
}

function RegisterForm({ onRegister, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }
    
    onRegister(name, email, password);
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-secondary">Register</button>
      </form>
      <p className="text-center mt-3">
        Already have an account?{' '}
        <a href="#" onClick={onSwitchToLogin}>Login</a>
      </p>
    </div>
  );
}

// Main App Components
function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">TravelEase</div>
        <div className="nav-links">
          <span>Welcome, {user?.name}</span>
          <a href="#" onClick={onLogout}>Logout</a>
        </div>
      </div>
    </header>
  );
}

function TravelCategories({ onSelectCategory, onShowPlanner }) {
  const categories = [
    { id: 'flights', name: 'Flights', icon: 'fa-plane' },
    { id: 'trains', name: 'Trains', icon: 'fa-train' },
    { id: 'buses', name: 'Buses', icon: 'fa-bus' },
    { id: 'cabs', name: 'Cabs', icon: 'fa-taxi' },
    { id: 'hotels', name: 'Hotels', icon: 'fa-hotel' }
  ];

  return (
    <div>
      <h1>Travel Categories</h1>
      
      <div className="categories-container">
        {categories.map(category => (
          <div key={category.id} className="category-card" onClick={() => onSelectCategory(category.id)}>
            <div className="category-header">
              <h3>{category.name}</h3>
              <i className={`fas ${category.icon}`}></i>
            </div>
            <div className="category-content">
              <p>Book {category.name.toLowerCase()} for your next trip</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="ai-planner">
        <h2>Need help planning your trip?</h2>
        <p>Let our AI assistant create a perfect travel plan for you based on your preferences.</p>
        <button className="btn btn-secondary" onClick={onShowPlanner}>
          Get AI Travel Plan
        </button>
      </div>
    </div>
  );
}

function AIPlanner({ onSubmit, onBack }) {
  const [destination, setDestination] = useState('');
  const [people, setPeople] = useState(1);
  const [budget, setBudget] = useState(500);
  const [days, setDays] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ destination, people, budget, days });
  };

  return (
    <div className="ai-planner">
      <h2>AI Travel Planner</h2>
      <p>Answer a few questions and we'll create the perfect travel plan for you</p>
      
      <form className="planner-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Destination</label>
          <input 
            type="text" 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Number of People</label>
          <input 
            type="number" 
            min="1" 
            value={people} 
            onChange={(e) => setPeople(parseInt(e.target.value))} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Budget (in $)</label>
          <input 
            type="number" 
            min="100" 
            value={budget} 
            onChange={(e) => setBudget(parseInt(e.target.value))} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Number of Days</label>
          <input 
            type="number" 
            min="1" 
            value={days} 
            onChange={(e) => setDays(parseInt(e.target.value))} 
            required 
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" className="btn" onClick={onBack}>Back</button>
          <button type="submit" className="btn btn-secondary">Generate Plan</button>
        </div>
      </form>
    </div>
  );
}

function Booking({ details, onConfirm, onBack }) {
  return (
    <div className="booking-container">
      <h2>Your Travel Plan</h2>
      
      <div className="booking-summary">
        <h3>Transport</h3>
        <p>{details.transport.details}</p>
        
        <h3>Accommodation</h3>
        <p>{details.hotel.details}</p>
        
        <h3>Total Cost</h3>
        <p>${details.totalCost}</p>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button className="btn" onClick={onBack}>Back</button>
        <button className="btn btn-secondary" onClick={onConfirm}>Confirm Booking</button>
      </div>
    </div>
  );
}

function Payment({ amount, onComplete, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState(null);

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <p>Total Amount: ${amount}</p>
      
      <h3>Select Payment Method</h3>
      <div className="payment-methods">
        <div 
          className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('card')}
        >
          <i className="fas fa-credit-card"></i>
          <p>Credit/Debit Card</p>
        </div>
        
        <div 
          className={`payment-method ${paymentMethod === 'paypal' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('paypal')}
        >
          <i className="fab fa-paypal"></i>
          <p>PayPal</p>
        </div>
        
        <div 
          className={`payment-method ${paymentMethod === 'upi' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('upi')}
        >
          <i className="fas fa-mobile-alt"></i>
          <p>UPI</p>
        </div>
      </div>
      
      {paymentMethod && (
        <div style={{ marginTop: '20px' }}>
          <h3>Enter {paymentMethod === 'card' ? 'Card' : paymentMethod === 'paypal' ? 'PayPal' : 'UPI'} Details</h3>
          <div className="form-group">
            <input 
              type="text" 
              placeholder={paymentMethod === 'card' ? 'Card Number' : paymentMethod === 'paypal' ? 'PayPal Email' : 'UPI ID'} 
            />
          </div>
          {paymentMethod === 'card' && (
            <>
              <div className="form-group">
                <input type="text" placeholder="Expiry Date" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="CVV" />
              </div>
            </>
          )}
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button className="btn" onClick={onBack}>Back</button>
        <button 
          className="btn btn-secondary" 
          onClick={onComplete}
          disabled={!paymentMethod}
        >
          Complete Payment
        </button>
      </div>
    </div>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));