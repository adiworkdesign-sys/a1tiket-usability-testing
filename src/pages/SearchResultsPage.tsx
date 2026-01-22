import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useBooking } from '@/contexts/BookingContext';
import { useNavigate } from 'react-router-dom';
import { trains } from '@/data/trains';
import { Schedule } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchResultsPage() {
    const navigate = useNavigate();
    const { origin, destination, date, passengers, setSelectedSchedule } = useBooking();

    // Generate mock schedules
    const mockSchedules: Schedule[] = trains.slice(0, 5).map((train, idx) => ({
        id: `sch-${idx + 1}`,
        train,
        origin: origin!,
        destination: destination!,
        departureTime: `${6 + idx * 2}:${idx % 2 === 0 ? '00' : '30'}`,
        arrivalTime: `${9 + idx * 2}:${idx % 2 === 0 ? '15' : '45'}`,
        duration: `${3 + idx}j ${15 + idx * 5}m`,
        price: 150000 + idx * 25000,
        availability: idx === 1 ? 'limited' : idx === 4 ? 'sold_out' : 'available',
        seatsLeft: idx === 1 ? 5 : undefined,
        date: date,
    }));

    const handleSelectTrain = (schedule: Schedule) => {
        setSelectedSchedule(schedule);
        navigate('/seat-selection');
    };

    return (
        <AppLayout>
            <div className="p-5 space-y-5">
                {/* Header Info */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                >
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{origin?.city}</span>
                        <ArrowRight className="w-4 h-4" />
                        <span>{destination?.city}</span>
                    </div>
                    <h1 className="text-2xl font-bold">
                        {formatDate(date)} • {passengers} Penumpang
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Ditemukan {mockSchedules.filter(s => s.availability !== 'sold_out').length} kereta tersedia
                    </p>
                </motion.div>

                {/* Train List */}
                <div className="space-y-4">
                    {mockSchedules.map((schedule, idx) => (
                        <motion.div
                            key={schedule.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="p-5 space-y-4">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg">{schedule.train.name}</h3>
                                        <p className="text-sm text-muted-foreground">{schedule.train.class}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-xl">{formatCurrency(schedule.price)}</p>
                                        <p className="text-xs text-muted-foreground">per orang</p>
                                    </div>
                                </div>

                                {/* Time Info */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold">{schedule.departureTime}</p>
                                        <p className="text-sm text-muted-foreground">{schedule.origin.code}</p>
                                    </div>
                                    <div className="flex-1 mx-4 text-center">
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm">{schedule.duration}</span>
                                        </div>
                                        <div className="h-px bg-border my-2" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold">{schedule.arrivalTime}</p>
                                        <p className="text-sm text-muted-foreground">{schedule.destination.code}</p>
                                    </div>
                                </div>

                                {/* Availability Badge */}
                                {schedule.availability === 'limited' && (
                                    <div className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs font-medium rounded-full">
                                        ⚠️ Hanya {schedule.seatsLeft} kursi tersisa
                                    </div>
                                )}

                                {schedule.availability === 'sold_out' && (
                                    <div className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs font-medium rounded-full">
                                        ❌ Habis Terjual
                                    </div>
                                )}

                                {/* Action Button */}
                                <Button
                                    onClick={() => handleSelectTrain(schedule)}
                                    disabled={schedule.availability === 'sold_out'}
                                    className="w-full"
                                >
                                    {schedule.availability === 'sold_out' ? 'Tidak Tersedia' : 'Pilih Kursi'}
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
