import { createContext, useContext, useState, ReactNode } from 'react';
import { Station, Schedule, Seat, Passenger, TicketTier, PaymentMethod } from '@/types';
import { ticketTiers, paymentMethods } from '@/data/constants';

interface BookingContextType {
    // Search params
    origin: Station | null;
    destination: Station | null;
    date: string;
    passengers: number;
    setOrigin: (station: Station | null) => void;
    setDestination: (station: Station | null) => void;
    setDate: (date: string) => void;
    setPassengers: (count: number) => void;

    // Selected schedule & seats
    selectedSchedule: Schedule | null;
    selectedSeats: Seat[];
    setSelectedSchedule: (schedule: Schedule | null) => void;
    addSeat: (seat: Seat) => void;
    removeSeat: (seatId: string) => void;
    clearSeats: () => void;

    // Passenger details
    passengerDetails: Passenger[];
    setPassengerDetails: (passengers: Passenger[]) => void;

    // Ticket tier
    selectedTier: TicketTier;
    setSelectedTier: (tier: TicketTier) => void;

    // Payment
    selectedPayment: PaymentMethod | null;
    setSelectedPayment: (method: PaymentMethod | null) => void;

    // Voucher & coins
    appliedVoucherCode: string | null;
    coinsToRedeem: number;
    setAppliedVoucherCode: (code: string | null) => void;
    setCoinsToRedeem: (coins: number) => void;

    // Reset
    resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
    const [origin, setOrigin] = useState<Station | null>(null);
    const [destination, setDestination] = useState<Station | null>(null);
    const [date, setDate] = useState<string>('');
    const [passengers, setPassengers] = useState<number>(1);

    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const [passengerDetails, setPassengerDetails] = useState<Passenger[]>([]);
    const [selectedTier, setSelectedTier] = useState<TicketTier>(ticketTiers[0]);
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
    const [appliedVoucherCode, setAppliedVoucherCode] = useState<string | null>(null);
    const [coinsToRedeem, setCoinsToRedeem] = useState<number>(0);

    const addSeat = (seat: Seat) => {
        if (selectedSeats.length < passengers) {
            setSelectedSeats(prev => [...prev, seat]);
        }
    };

    const removeSeat = (seatId: string) => {
        setSelectedSeats(prev => prev.filter(s => s.id !== seatId));
    };

    const clearSeats = () => {
        setSelectedSeats([]);
    };

    const resetBooking = () => {
        setOrigin(null);
        setDestination(null);
        setDate('');
        setPassengers(1);
        setSelectedSchedule(null);
        setSelectedSeats([]);
        setPassengerDetails([]);
        setSelectedTier(ticketTiers[0]);
        setSelectedPayment(null);
        setAppliedVoucherCode(null);
        setCoinsToRedeem(0);
    };

    return (
        <BookingContext.Provider
            value={{
                origin,
                destination,
                date,
                passengers,
                setOrigin,
                setDestination,
                setDate,
                setPassengers,
                selectedSchedule,
                selectedSeats,
                setSelectedSchedule,
                addSeat,
                removeSeat,
                clearSeats,
                passengerDetails,
                setPassengerDetails,
                selectedTier,
                setSelectedTier,
                selectedPayment,
                setSelectedPayment,
                appliedVoucherCode,
                coinsToRedeem,
                setAppliedVoucherCode,
                setCoinsToRedeem,
                resetBooking,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
