import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Bell, Ticket, Gift, TrendingUp } from 'lucide-react';

interface Notification {
    id: string;
    type: 'booking' | 'promo' | 'system';
    title: string;
    message: string;
    time: string;
    read: boolean;
}

export default function NotificationsPage() {
    const notifications: Notification[] = [
        {
            id: '1',
            type: 'booking',
            title: 'Tiket Berhasil Dipesan!',
            message: 'Tiket kereta Argo Parahyangan Jakarta-Bandung sudah berhasil dipesan.',
            time: '2 jam lalu',
            read: false
        },
        {
            id: '2',
            type: 'promo',
            title: 'Promo Spesial Weekend!',
            message: 'Dapatkan diskon 20% untuk perjalanan akhir pekan. Gunakan kode WEEKEND20.',
            time: '5 jam lalu',
            read: false
        },
        {
            id: '3',
            type: 'system',
            title: 'Raih 50 Koin!',
            message: 'Laporkan arah kursi keretamu dan dapatkan hingga 50 koin gratis.',
            time: '1 hari lalu',
            read: true
        }
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'booking':
                return <Ticket className="w-5 h-5 text-primary" />;
            case 'promo':
                return <Gift className="w-5 h-5 text-green-500" />;
            case 'system':
                return <TrendingUp className="w-5 h-5 text-orange-500" />;
            default:
                return <Bell className="w-5 h-5" />;
        }
    };

    return (
        <AppLayout showBottomNav={false}>
            <div className="p-5 space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold">Notifikasi</h1>
                    <p className="text-sm text-muted-foreground">
                        {notifications.filter(n => !n.read).length} notifikasi belum dibaca
                    </p>
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                    {notifications.map((notification, index) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className={`${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}>
                                <CardHeader>
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg ${notification.type === 'booking' ? 'bg-primary/10' :
                                            notification.type === 'promo' ? 'bg-green-500/10' :
                                                'bg-orange-500/10'
                                            }`}>
                                            {getIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-semibold">{notification.title}</h3>
                                                {!notification.read && (
                                                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5"></span>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                {notification.time}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {notifications.length === 0 && (
                    <div className="text-center py-12">
                        <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">Belum Ada Notifikasi</h3>
                        <p className="text-sm text-muted-foreground">
                            Notifikasi akan muncul di sini
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
