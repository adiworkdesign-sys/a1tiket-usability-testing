import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { paymentMethods } from '@/data/constants';
import { ArrowLeft, Tag, Wallet, CreditCard, Loader2 } from 'lucide-react';

import { formatCurrency, delay, generateBookingCode } from '@/lib/utils';

export default function PaymentPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const {
        selectedSchedule,
        selectedTier,
        passengers,
        selectedPayment,
        setSelectedPayment,
        appliedVoucherCode,
        setAppliedVoucherCode,
        coinsToRedeem,
        setCoinsToRedeem,
    } = useBooking();

    const [voucherInput, setVoucherInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!selectedSchedule) {
        navigate('/home');
        return null;
    }

    // Calculate prices
    const subtotal = selectedSchedule.price * passengers;
    const tierPrice = selectedTier.price * passengers;
    const voucherDiscount = appliedVoucherCode ? 30000 : 0; // Mock 30k discount
    const coinDiscount = Math.min(coinsToRedeem, user?.coinBalance || 0) * 100; // 1 coin = Rp 100
    const paymentFee = selectedPayment?.fee || 0;
    const total = subtotal + tierPrice - voucherDiscount - coinDiscount + paymentFee;

    const handleApplyVoucher = () => {
        if (voucherInput.trim()) {
            setAppliedVoucherCode(voucherInput.toUpperCase());
            setVoucherInput('');
        }
    };

    const handlePayment = async () => {
        if (!selectedPayment) {
            alert('Pilih metode pembayaran');
            return;
        }

        setIsProcessing(true);
        await delay(2000); // Simulate payment processing

        // Generate booking code and navigate to confirmation
        const bookingCode = generateBookingCode();
        navigate(`/confirmation?code=${bookingCode}`);
    };

    return (
        <AppLayout showBottomNav={false}>
            <div className="min-h-screen pb-24">
                {/* Header */}
                <div className="sticky top-16 z-40 bg-background border-b p-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-muted rounded-lg">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="font-bold text-lg">Pembayaran</h1>
                            <p className="text-sm text-muted-foreground">Pilih metode pembayaran</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    {/* Voucher Section */}
                    <Card className="p-4 space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            Kode Promo / Voucher
                        </h3>
                        {appliedVoucherCode ? (
                            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                                <div>
                                    <p className="font-semibold text-green-700 dark:text-green-300">
                                        {appliedVoucherCode}
                                    </p>
                                    <p className="text-sm text-green-600 dark:text-green-400">
                                        Hemat {formatCurrency(voucherDiscount)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setAppliedVoucherCode(null)}
                                    className="text-sm text-red-500 hover:underline"
                                >
                                    Hapus
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Input
                                    value={voucherInput}
                                    onChange={e => setVoucherInput(e.target.value.toUpperCase())}
                                    placeholder="Masukkan kode promo"
                                    className="flex-1"
                                />
                                <Button onClick={handleApplyVoucher} variant="outline">
                                    Pakai
                                </Button>
                            </div>
                        )}
                    </Card>

                    {/* Coin Redemption */}
                    <Card className="p-4 space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Wallet className="w-4 h-4" />
                            Tukar Koin
                        </h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Saldo Koin Anda</p>
                                <p className="font-bold text-xl">🪙 {user?.coinBalance || 0}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">1 Koin = Rp 100</p>
                                <Input
                                    type="number"
                                    value={coinsToRedeem}
                                    onChange={e => setCoinsToRedeem(Math.min(Number(e.target.value), user?.coinBalance || 0))}
                                    className="w-24 text-right"
                                    max={user?.coinBalance || 0}
                                    min={0}
                                />
                            </div>
                        </div>
                        {coinsToRedeem > 0 && (
                            <p className="text-sm text-green-600">
                                Hemat {formatCurrency(coinDiscount)}
                            </p>
                        )}
                    </Card>

                    {/* Payment Methods */}
                    <Card className="p-4 space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Metode Pembayaran
                        </h3>

                        {/* E-Wallet */}
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">E-Wallet</p>
                            <div className="space-y-2">
                                {paymentMethods
                                    .filter(pm => pm.category === 'ewallet')
                                    .map(method => (
                                        <button
                                            key={method.id}
                                            onClick={() => setSelectedPayment(method)}
                                            className={`w-full p-3 rounded-lg border-2 flex items-center justify-between transition ${selectedPayment?.id === method.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{method.icon}</span>
                                                <span className="font-medium">{method.name}</span>
                                            </div>
                                        </button>
                                    ))}
                            </div>
                        </div>

                        {/* Bank Transfer */}
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Transfer Bank</p>
                            <div className="space-y-2">
                                {paymentMethods
                                    .filter(pm => pm.category === 'bank')
                                    .map(method => (
                                        <button
                                            key={method.id}
                                            onClick={() => setSelectedPayment(method)}
                                            className={`w-full p-3 rounded-lg border-2 flex items-center justify-between transition ${selectedPayment?.id === method.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{method.icon}</span>
                                                <span className="font-medium">{method.name}</span>
                                            </div>
                                            {method.fee && (
                                                <span className="text-xs text-muted-foreground">
                                                    +{formatCurrency(method.fee)}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </Card>

                    {/* Price Summary */}
                    <Card className="p-5 space-y-3">
                        <h3 className="font-semibold">Rincian Pembayaran</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Tiket ({passengers} penumpang)</span>
                                <span>{formatCurrency(subtotal)}</span>
                            </div>
                            {tierPrice > 0 && (
                                <div className="flex justify-between">
                                    <span>Paket {selectedTier.name}</span>
                                    <span>{formatCurrency(tierPrice)}</span>
                                </div>
                            )}
                            {voucherDiscount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Diskon Voucher</span>
                                    <span>-{formatCurrency(voucherDiscount)}</span>
                                </div>
                            )}
                            {coinDiscount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Diskon Koin ({coinsToRedeem} koin)</span>
                                    <span>-{formatCurrency(coinDiscount)}</span>
                                </div>
                            )}
                            {paymentFee > 0 && (
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Biaya Admin</span>
                                    <span>+{formatCurrency(paymentFee)}</span>
                                </div>
                            )}
                            <div className="pt-2 border-t flex justify-between font-bold text-lg">
                                <span>Total Bayar</span>
                                <span className="text-primary">{formatCurrency(total)}</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Bottom Action */}
                <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
                    <div className="max-w-lg mx-auto">
                        <Button
                            onClick={handlePayment}
                            disabled={!selectedPayment || isProcessing}
                            className="w-full"
                            size="lg"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                `Bayar ${formatCurrency(total)}`
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
