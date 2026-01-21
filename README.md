# 🚆 A1 TIKET - Aplikasi Pemesanan Tiket Kereta Api

> **Perjalanan Lebih Pasti** - Platform modern untuk memesan tiket kereta api dengan fitur seat direction preview, coin rewards, dan UI/UX premium.

![A1 TIKET](https://img.shields.io/badge/Status-Phase%201%20Complete-success)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC)

---

## ✨ Features

### 🎯 **Unique Features**
- **Seat Direction Preview** - Lihat arah kursi (hadap depan/belakang) sebelum booking
- **Coin Reward System** - Dapatkan koin setiap perjalanan, tukar dengan diskon
- **Premium UI/UX** - Glassmorphism, smooth animations, modern design
- **Price Lock** - Harga transparan tanpa biaya tersembunyi

### 📱 **Core Features (Phase 1)**
- ✅ Search & Book tiket kereta
- ✅ Multiple train schedules dengan filter
- ✅ Ticket management (upcoming & history)
- ✅ Promo & voucher system
- ✅ User profile & account management
- ✅ Responsive mobile-first design

### 🚀 **Coming Soon (Phase 2+)**
- 🔜 Interactive seat selection map
- 🔜 KTP scanner untuk auto-fill passenger data
- 🔜 Multiple payment methods integration
- 🔜 E-Ticket dengan QR code
- 🔜 Travel analytics & statistics
- 🔜 Achievement badges & gamification

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing

### **Styling**
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful Radix UI components
- **Framer Motion** - Smooth animations
- **Custom CSS** - Glassmorphism & gradients

### **State Management**
- **React Context API** - Global state
- **React Hooks** - Component state

### **Utilities**
- **date-fns** - Date formatting
- **Zod** - Schema validation
- **Lucide React** - Icon library
- **class-variance-authority** - Component variants

---

## 📦 Installation

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn

### Setup

```bash
# Clone repository
git clone https://github.com/your-username/a1tiket-rebuild.git

# Navigate to project
cd a1tiket-rebuild

# Install dependencies
npm install

# Run development server
npm run dev
```

Server akan berjalan di: **http://localhost:5173**

---

## 🚀 Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

---

## 📁 Project Structure

```
a1tiket-rebuild/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Layout components
│   │   ├── common/          # Reusable components
│   │   └── features/        # Feature-specific components
│   ├── contexts/            # React Context providers
│   ├── data/                # Mock data & constants
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilities
│   ├── pages/               # Page components
│   ├── styles/              # Global styles
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Main app
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#667eea → #764ba2)
- **Secondary**: Purple tones
- **Accent**: Warm orange
- **Background**: Adaptive (light/dark)

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: Responsive TailwindCSS system

### Components
All components follow shadcn/ui patterns dengan customization untuk A1 TIKET branding.

---

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Splash Screen | `/` | Welcome screen dengan animasi |
| Home | `/home` | Search form untuk booking tiket |
| Search Results | `/search-results` | List kereta yang tersedia |
| My Tickets | `/tickets` | Manage tiket (upcoming & history) |
| Promos | `/promos` | Promo & voucher terbaru |
| Account | `/account` | User profile & settings |

---

## 🧩 Context Providers

### AuthContext
Manages user authentication & session:
- User profile data
- Login/logout functionality
- Membership level tracking
- Auto-login untuk demo

### BookingContext
Manages booking flow:
- Search parameters (origin, destination, date, passengers)
- Selected schedule & seats
- Passenger details
- Payment & voucher info

---

## 💾 Data Models

### Core Types
```typescript
Station      // Stasiun kereta
Train        // Data kereta
Schedule     // Jadwal perjalanan
Seat         // Data kursi
Passenger    // Data penumpang
```

### Booking Types
```typescript
TicketTier      // Basic, Flex, Premium
PaymentMethod   // E-wallet, Bank, Card
Voucher         // Promo codes
Booking         // Complete booking data
```

### User Types
```typescript
User            // User profile
SavedPassenger  // Saved passenger list
CoinTransaction // Coin history
Notification    // Notifications
Achievement     // Badges & achievements
```

---

## 🎯 Roadmap

### ✅ Phase 1 (Completed)
- Project setup & infrastructure
- Design system implementation
- Core pages (Home, Search, Tickets, Promos, Account)
- Context providers & routing
- Basic booking flow

### 🔜 Phase 2 (In Progress)
- Seat selection dengan visual map
- Passenger details form
- Payment integration
- E-Ticket generation
- Booking confirmation

### 🔮 Phase 3 (Planned)
- Coin dashboard
- Notification center
- Settings & preferences
- Travel analytics
- Achievement system

### 🌟 Phase 4 (Future)
- Onboarding flow
- Authentication (login/register)
- Saved passengers management
- Referral system
- Advanced filters & sorting

---

## 📄 License

This project is for demonstration purposes.

---

## 👥 Credits

**Built with:**
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)

---

## 📞 Contact

Untuk pertanyaan atau feedback, silakan buka issue di repository ini.

---

**Made with ❤️ for better train ticket booking experience**
