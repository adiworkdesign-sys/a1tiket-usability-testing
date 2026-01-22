import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Ticket, Clock, CheckCircle, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency, formatDate } from '@/lib/utils';

// Mock data
const mockTickets = [
    {
        id: '1',
        bookingCode: 'A1T-ABC123',
        trainName: 'Argo Parahyangan',
        origin: 'Jakarta (GMR)',
        destination: 'Bandung (BD)',
        date: '2026-01-25',
        time: '08:00',
        seat: '1A',
        status: 'confirmed',
        total: 175000,
    },
    {
        id: '2',
        bookingCode: 'A1T-DEF456',
        trainName: 'Taksaka',
        origin: 'Jakarta (GMR)',
        destination: 'Yogyakarta (YK)',
        date: '2025-12-15',
        time: '12:00',
        seat: '3B',
        status: 'completed',
        total: 200000,
    },
];

export default function MyTicketsPage() {
    const [activeTab, setActiveTab] = useState('upcoming');

    const renderTicketCard = (ticket: typeof mockTickets[0], index: number) => {
        const isUpcoming = ticket.status === 'confirmed';

        return (
            <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
            >
                <Card className={`p-5 space-y-4 ${isUpcoming ? 'border-primary' : ''}`}>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Ticket className="w-5 h-5 text-primary" />
                                <span className="font-mono text-sm font-semibold">{ticket.bookingCode}</span>
                            </div>
                            <h3 className="font-bold text-lg">{ticket.trainName}</h3>
                        </div>
                        <Badge
                            variant={isUpcoming ? 'default' : 'secondary'}
                            className="flex items-center gap-1"
                        >
                            {isUpcoming ? (
                                <>
                                    <CheckCircle className="w-3 h-3" />
                                    Dikonfirmasi
                                </>
                            ) : (
                                <>
                                    <Clock className="w-3 h-3" />
                                    Selesai
                                </>
                            )}
                        </Badge>
                    </div>

                    {/* Route */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Dari</p>
                            <p className="font-semibold">{ticket.origin}</p>
                        </div>
                        <div className="w-px h-8 bg-border" />
                        <div className="flex-1 text-right">
                            <p className="text-sm text-muted-foreground">Ke</p>
                            <p className="font-semibold">{ticket.destination}</p>
                        </div>
                    </div>

                    {/* Date & Seat */}
                    <div className="flex items-center justify-between pt-3 border-t">
                        <div>
                            <p className="text-sm text-muted-foreground">Keberangkatan</p>
                            <p className="font-semibold">{formatDate(ticket.date)} • {ticket.time}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Kursi</p>
                            <p className="font-semibold text-lg">{ticket.seat}</p>
                        </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-3 border-t">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Bayar</p>
                            <p className="font-bold text-xl">{formatCurrency(ticket.total)}</p>
                        </div>
                        {isUpcoming && (
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
                                <QrCode className="w-4 h-4" />
                                E-Ticket
                            </button>
                        )}
                    </div>
                </Card>
            </motion.div>
        );
    };

    return (
        <AppLayout>
            <div className="p-5 space-y-5">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-bold">Tiket Saya</h1>
                    <p className="text-muted-foreground">Kelola semua tiket perjalanan Anda</p>
                </motion.div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upcoming">Akan Datang</TabsTrigger>
                        <TabsTrigger value="completed">Riwayat</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="space-y-4 mt-5">
                        {mockTickets
                            .filter(t => t.status === 'confirmed')
                            .map((ticket, idx) => renderTicketCard(ticket, idx))}
                    </TabsContent>

                    <TabsContent value="completed" className="space-y-4 mt-5">
                        {mockTickets
                            .filter(t => t.status === 'completed')
                            .map((ticket, idx) => renderTicketCard(ticket, idx))}
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
