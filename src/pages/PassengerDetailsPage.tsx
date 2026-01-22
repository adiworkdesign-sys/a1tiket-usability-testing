import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useBooking } from '@/contexts/BookingContext';
import { Passenger } from '@/types';
import { ArrowLeft, Camera, User, CreditCard, Mail, Phone } from 'lucide-react';
import { KTPScanner } from '@/components/KTPScanner';
import type { KTPData } from '@/lib/ktpParser';

export default function PassengerDetailsPage() {
    const navigate = useNavigate();
    const { selectedSeats, passengers, passengerDetails, setPassengerDetails } = useBooking();
    const [currentPassenger, setCurrentPassenger] = useState(0);
    const [showKTPScanner, setShowKTPScanner] = useState(false);

    const [formData, setFormData] = useState<Partial<Passenger>>(
        passengerDetails[currentPassenger] || {
            title: 'Mr',
            fullName: '',
            identityType: 'KTP',
            identityNumber: '',
            phone: '',
            email: '',
        }
    );

    if (selectedSeats.length === 0) {
        navigate('/home');
        return null;
    }

    const handleInputChange = (field: keyof Passenger, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSavePassenger = () => {
        if (!formData.fullName || !formData.identityNumber || !formData.phone || !formData.email) {
            alert('Mohon lengkapi semua data');
            return;
        }

        const newPassenger: Passenger = {
            id: `passenger-${currentPassenger + 1}`,
            title: formData.title as 'Mr' | 'Mrs' | 'Ms',
            fullName: formData.fullName,
            identityType: formData.identityType as 'KTP' | 'Passport',
            identityNumber: formData.identityNumber,
            phone: formData.phone,
            email: formData.email,
            seat: selectedSeats[currentPassenger],
        };

        const updatedPassengers = [...passengerDetails];
        updatedPassengers[currentPassenger] = newPassenger;
        setPassengerDetails(updatedPassengers);

        // Move to next passenger or continue
        if (currentPassenger < passengers - 1) {
            setCurrentPassenger(currentPassenger + 1);
            setFormData(updatedPassengers[currentPassenger + 1] || {
                title: 'Mr',
                fullName: '',
                identityType: 'KTP',
                identityNumber: '',
                phone: '',
                email: '',
            });
        } else {
            navigate('/ticket-tier');
        }
    };

    const handleKTPScanComplete = (data: Partial<KTPData>) => {
        // Fill form with scanned data
        setFormData({
            ...formData,
            fullName: data.fullName || formData.fullName || '',
            identityNumber: data.identityNumber || formData.identityNumber || '',
            phone: data.phone || formData.phone || '',
        });
        setShowKTPScanner(false);
    };

    return (
        <AppLayout showBottomNav={false}>
            <div className="min-h-screen">
                {/* Header */}
                <div className="sticky top-16 z-40 bg-background border-b p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-muted rounded-lg">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="font-bold text-lg">Data Penumpang</h1>
                            <p className="text-sm text-muted-foreground">
                                Penumpang {currentPassenger + 1} dari {passengers}
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${((currentPassenger + 1) / passengers) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    {/* Seat Info */}
                    <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Kursi</p>
                                <p className="font-bold text-2xl">{selectedSeats[currentPassenger]?.number}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Gerbong</p>
                                <p className="font-bold text-xl">{selectedSeats[currentPassenger]?.car}</p>
                            </div>
                        </div>
                    </Card>

                    {/* KTP Scanner Button */}
                    <Button
                        onClick={() => setShowKTPScanner(true)}
                        variant="outline"
                        className="w-full"
                    >
                        <Camera className="w-4 h-4 mr-2" />
                        Scan KTP Otomatis
                    </Button>

                    {/* Form */}
                    <Card className="p-5 space-y-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label>Titel</Label>
                            <div className="flex gap-2">
                                {['Mr', 'Mrs', 'Ms'].map(title => (
                                    <button
                                        key={title}
                                        onClick={() => handleInputChange('title', title)}
                                        className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition ${formData.title === title
                                            ? 'border-primary bg-primary/10'
                                            : 'border-border hover:border-primary/50'
                                            }`}
                                    >
                                        {title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Nama Lengkap *</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="fullName"
                                    value={formData.fullName || ''}
                                    onChange={e => handleInputChange('fullName', e.target.value)}
                                    placeholder="Sesuai KTP"
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Identity Type */}
                        <div className="space-y-2">
                            <Label>Tipe Identitas</Label>
                            <div className="flex gap-2">
                                {['KTP', 'Passport'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => handleInputChange('identityType', type)}
                                        className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition ${formData.identityType === type
                                            ? 'border-primary bg-primary/10'
                                            : 'border-border hover:border-primary/50'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Identity Number */}
                        <div className="space-y-2">
                            <Label htmlFor="identityNumber">Nomor {formData.identityType} *</Label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="identityNumber"
                                    value={formData.identityNumber || ''}
                                    onChange={e => handleInputChange('identityNumber', e.target.value)}
                                    placeholder="16 digit"
                                    className="pl-10"
                                    maxLength={16}
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Nomor Telepon *</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="phone"
                                    value={formData.phone || ''}
                                    onChange={e => handleInputChange('phone', e.target.value)}
                                    placeholder="+62812xxxxxxxx"
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={e => handleInputChange('email', e.target.value)}
                                    placeholder="email@example.com"
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Action Button */}
                    <Button onClick={handleSavePassenger} className="w-full" size="lg">
                        {currentPassenger < passengers - 1 ? 'Penumpang Berikutnya' : 'Lanjutkan'}
                    </Button>
                </div>

                {/* KTP Scanner Modal */}
                {showKTPScanner && (
                    <KTPScanner
                        onScanComplete={handleKTPScanComplete}
                        onClose={() => setShowKTPScanner(false)}
                    />
                )}
            </div>
        </AppLayout>
    );
}
