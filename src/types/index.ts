// Core Types
export interface Station {
    code: string;
    name: string;
    city: string;
}

export interface Train {
    id: string;
    name: string;
    class: 'Executive' | 'Business' | 'Economy';
    operator: string;
    facilities: string[];
}

export interface Schedule {
    id: string;
    train: Train;
    origin: Station;
    destination: Station;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    availability: 'available' | 'limited' | 'sold_out';
    seatsLeft?: number;
    date: string;
}

export interface Seat {
    id: string;
    number: string;
    car: number;
    row: number;
    position: 'window' | 'aisle';
    isAvailable: boolean;
    directionConfidence: number | null; // 0-100 or null
    isForward: boolean | null;
    reportCount: number;
    price: number;
}

export interface Passenger {
    id: string;
    title: 'Mr' | 'Mrs' | 'Ms';
    fullName: string;
    identityType: 'KTP' | 'Passport';
    identityNumber: string;
    phone: string;
    email: string;
    seat?: Seat;
}

export interface TicketTier {
    id: 'basic' | 'flex' | 'premium';
    name: string;
    price: number;
    reschedule: string;
    refund: string;
    description: string;
    features: string[];
}

export interface PaymentMethod {
    id: string;
    name: string;
    icon: string;
    category: 'ewallet' | 'bank' | 'card';
    fee?: number;
}

export interface Voucher {
    id: string;
    code: string;
    title: string;
    description: string;
    discount: number; // percentage or fixed amount
    discountType: 'percentage' | 'fixed';
    minPurchase: number;
    maxDiscount?: number;
    validUntil: string;
    isUsed: boolean;
    category: 'general' | 'route' | 'class';
}

export interface Booking {
    id: string;
    bookingCode: string;
    schedule: Schedule;
    passengers: Passenger[];
    tier: TicketTier;
    subtotal: number;
    tierPrice: number;
    voucherDiscount: number;
    coinDiscount: number;
    total: number;
    paymentMethod: PaymentMethod;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    bookedAt: string;
    qrCode: string;
}

export interface CoinTransaction {
    id: string;
    type: 'earn' | 'spend';
    amount: number;
    description: string;
    date: string;
    relatedBooking?: string;
}

export interface Notification {
    id: string;
    type: 'booking' | 'promo' | 'reminder' | 'system';
    title: string;
    message: string;
    date: string;
    isRead: boolean;
    actionUrl?: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    progress: number;
    target: number;
    isUnlocked: boolean;
    reward: number; // coins
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    membershipLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
    coinBalance: number;
    totalTrips: number;
    joinedAt: string;
}

export interface SavedPassenger {
    id: string;
    title: 'Mr' | 'Mrs' | 'Ms';
    fullName: string;
    identityType: 'KTP' | 'Passport';
    identityNumber: string;
    phone: string;
    email: string;
    relationship: 'Self' | 'Family' | 'Friend';
}

export interface RecentSearch {
    id: string;
    origin: Station;
    destination: Station;
    date: string;
    searchedAt: string;
}

export interface Promo {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    discount: number;
    discountType: 'percentage' | 'fixed';
    code: string;
    validUntil: string;
    terms: string[];
    category: 'all' | 'executive' | 'business' | 'economy';
}
