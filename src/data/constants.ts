import { TicketTier, PaymentMethod, Promo } from '@/types';

export const ticketTiers: TicketTier[] = [
    {
        id: 'basic',
        name: 'Basic',
        price: 0,
        reschedule: 'Biaya Rp 25.000',
        refund: 'Tidak dapat refund',
        description: 'Tiket standar dengan perlindungan dasar',
        features: [
            'Kursi terjamin',
            'Ubah jadwal dengan biaya',
            'Tidak ada refund',
        ],
    },
    {
        id: 'flex',
        name: 'Flex',
        price: 20000,
        reschedule: 'Gratis (1x)',
        refund: 'Refund 50%',
        description: 'Lebih fleksibel untuk perjalanan Anda',
        features: [
            'Kursi terjamin',
            'Ubah jadwal gratis 1x',
            'Refund 50% jika batal',
            'Priority customer service',
        ],
    },
    {
        id: 'premium',
        name: 'Premium',
        price: 40000,
        reschedule: 'Gratis (unlimited)',
        refund: 'Refund 80%',
        description: 'Perlindungan maksimum dan fleksibilitas penuh',
        features: [
            'Kursi terjamin',
            'Ubah jadwal kapan saja',
            'Refund 80% jika batal',
            'Priority check-in',
            '24/7 customer support',
            'Travel insurance',
        ],
    },
];

export const paymentMethods: PaymentMethod[] = [
    { id: 'gopay', name: 'GoPay', icon: '💚', category: 'ewallet' },
    { id: 'ovo', name: 'OVO', icon: '💜', category: 'ewallet' },
    { id: 'shopeepay', name: 'ShopeePay', icon: '🧡', category: 'ewallet' },
    { id: 'dana', name: 'DANA', icon: '💙', category: 'ewallet' },
    { id: 'linkaja', name: 'LinkAja', icon: '❤️', category: 'ewallet' },
    { id: 'bca', name: 'BCA Virtual Account', icon: '🏦', category: 'bank', fee: 4000 },
    { id: 'mandiri', name: 'Mandiri Virtual Account', icon: '🏦', category: 'bank', fee: 4000 },
    { id: 'bni', name: 'BNI Virtual Account', icon: '🏦', category: 'bank', fee: 4000 },
    { id: 'bri', name: 'BRI Virtual Account', icon: '🏦', category: 'bank', fee: 4000 },
    { id: 'visa', name: 'Visa/Mastercard', icon: '💳', category: 'card', fee: 5000 },
];

export const promos: Promo[] = [
    {
        id: 'promo-1',
        title: 'Diskon 30% Argo Parahyangan',
        description: 'Dapatkan diskon 30% untuk perjalanan Jakarta-Bandung dengan Argo Parahyangan',
        imageUrl: '/promo-1.jpg',
        discount: 30,
        discountType: 'percentage',
        code: 'ARGO30',
        validUntil: '2026-02-28',
        terms: [
            'Berlaku untuk kelas Executive',
            'Maksimal diskon Rp 100.000',
            'Pembelian minimal Rp 200.000',
            'Tidak dapat digabung dengan promo lain',
        ],
        category: 'executive',
    },
    {
        id: 'promo-2',
        title: 'Cashback 50rb Pakai GoPay',
        description: 'Bayar dengan GoPay dan dapatkan cashback Rp 50.000',
        imageUrl: '/promo-2.jpg',
        discount: 50000,
        discountType: 'fixed',
        code: 'GOPAY50K',
        validUntil: '2026-02-15',
        terms: [
            'Minimal transaksi Rp 300.000',
            'Cashback masuk dalam 3 hari kerja',
            'Berlaku untuk semua rute',
            'Maksimal 1x per user',
        ],
        category: 'all',
    },
    {
        id: 'promo-3',
        title: 'Hemat 25% Kelas Bisnis',
        description: 'Nikmati perjalanan nyaman dengan diskon 25% untuk kelas Business',
        imageUrl: '/promo-3.jpg',
        discount: 25,
        discountType: 'percentage',
        code: 'BISNIS25',
        validUntil: '2026-03-31',
        terms: [
            'Berlaku untuk kelas Business',
            'Maksimal diskon Rp 75.000',
            'Berlaku untuk weekday',
        ],
        category: 'business',
    },
    {
        id: 'promo-4',
        title: 'First Timer: Potongan 100rb',
        description: 'Pengguna baru dapat potongan langsung Rp 100.000',
        imageUrl: '/promo-4.jpg',
        discount: 100000,
        discountType: 'fixed',
        code: 'FIRST100K',
        validUntil: '2026-12-31',
        terms: [
            'Hanya untuk pengguna baru',
            'Minimal pembelian Rp 250.000',
            'Berlaku untuk semua rute',
        ],
        category: 'all',
    },
];

// Export alias for compatibility
export const promoCampaigns = promos;

