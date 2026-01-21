import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';

// Pages
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import PassengerDetailsPage from './pages/PassengerDetailsPage';
import TicketTierPage from './pages/TicketTierPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ETicketPage from './pages/ETicketPage';
import MyTicketsPage from './pages/MyTicketsPage';
import PromosPage from './pages/PromosPage';
import AccountPage from './pages/AccountPage';
import SavedPassengersPage from './pages/SavedPassengersPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';

// Styles
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/seat-selection" element={<SeatSelectionPage />} />
            <Route path="/passenger-details" element={<PassengerDetailsPage />} />
            <Route path="/ticket-tier" element={<TicketTierPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/e-ticket" element={<ETicketPage />} />
            <Route path="/tickets" element={<MyTicketsPage />} />
            <Route path="/promos" element={<PromosPage />} />
            <Route path="/account" element={<AccountPage />} />

            {/* Utility Pages */}
            <Route path="/saved-passengers" element={<SavedPassengersPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<div className="p-8 text-center">Help Page (Coming Soon)</div>} />
            <Route path="/coins" element={<div className="p-8 text-center">Coins Dashboard (Coming Soon)</div>} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
