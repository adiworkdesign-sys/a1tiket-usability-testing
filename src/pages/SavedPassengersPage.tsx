import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { User, Trash2, Plus, Edit } from 'lucide-react';
import { useState } from 'react';

interface SavedPassenger {
    id: string;
    name: string;
    idNumber: string;
    phone: string;
    email: string;
}

export default function SavedPassengersPage() {
    // Mock saved passengers
    const [passengers, setPassengers] = useState<SavedPassenger[]>([
        {
            id: '1',
            name: 'JOHN DOE',
            idNumber: '1234567890123456',
            phone: '+6281234567890',
            email: 'john@example.com'
        },
        {
            id: '2',
            name: 'JANE DOE',
            idNumber: '6543210987654321',
            phone: '+6289876543210',
            email: 'jane@example.com'
        }
    ]);

    const handleDelete = (id: string) => {
        if (confirm('Hapus penumpang ini dari daftar tersimpan?')) {
            setPassengers(passengers.filter(p => p.id !== id));
        }
    };

    return (
        <AppLayout showBottomNav={false}>
            <div className="p-5 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Penumpang Tersimpan</h1>
                        <p className="text-sm text-muted-foreground">
                            {passengers.length} penumpang tersimpan
                        </p>
                    </div>
                    <Button size="icon" variant="default">
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>

                {/* Passengers List */}
                <div className="space-y-3">
                    {passengers.map((passenger, index) => (
                        <motion.div
                            key={passenger.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <User className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{passenger.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    KTP: {passenger.idNumber}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(passenger.id)}
                                            >
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Telepon</p>
                                            <p className="font-medium">{passenger.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Email</p>
                                            <p className="font-medium">{passenger.email}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {passengers.length === 0 && (
                    <div className="text-center py-12">
                        <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">Belum Ada Penumpang Tersimpan</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Simpan data penumpang untuk mempercepat pemesanan berikutnya
                        </p>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Penumpang
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
