import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { promos } from '@/data/constants';
import { Promo } from '@/types';
import { motion } from 'framer-motion';
import { Ticket, Clock, Tag, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function PromosPage() {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <AppLayout>
            <div className="p-5 space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-bold">Promo & Voucher</h1>
                    <p className="text-muted-foreground">Hemat lebih banyak dengan promo terbaik</p>
                </motion.div>

                {/* Active Promos */}
                <div className="space-y-4">
                    {promos.map((promo: Promo, index: number) => (
                        <motion.div
                            key={promo.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                        >
                            <Card className="overflow-hidden border-2 border-primary/20">
                                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Ticket className="w-5 h-5 text-primary" />
                                                <h3 className="font-bold text-lg">{promo.title}</h3>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                {promo.description}
                                            </p>

                                            {/* Discount Badge */}
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary rounded-full">
                                                <Tag className="w-4 h-4 text-primary-foreground" />
                                                <span className="text-sm font-bold text-primary-foreground">
                                                    {promo.discountType === 'percentage'
                                                        ? `Diskon ${promo.discount}%`
                                                        : `Potongan Rp ${promo.discount.toLocaleString('id-ID')}`
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-4">
                                    {/* Promo Code */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex-1 p-3 bg-muted rounded-xl border-2 border-dashed font-mono text-center text-lg font-bold">
                                            {promo.code}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => copyCode(promo.code)}
                                        >
                                            {copiedCode === promo.code ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-2 text-sm">
                                        {/* Validity */}
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Clock className="w-4 h-4" />
                                            <span>
                                                Berlaku s/d {new Date(promo.validUntil).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        {/* Terms */}
                                        {promo.terms && promo.terms.length > 0 && (
                                            <div className="mt-3 pt-3 border-t">
                                                <p className="font-semibold mb-1">Syarat & Ketentuan:</p>
                                                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                                                    {promo.terms.map((term, idx) => (
                                                        <li key={idx}>{term}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 bg-muted/50 rounded-xl"
                >
                    <h3 className="font-semibold mb-2">📋 Cara Menggunakan Promo</h3>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>Salin kode promo dengan klik tombol copy</li>
                        <li>Lanjutkan pemesanan tiket seperti biasa</li>
                        <li>Masukkan kode promo di halaman pembayaran</li>
                        <li>Diskon akan otomatis teraplikasi!</li>
                    </ol>
                </motion.div>
            </div>
        </AppLayout>
    );
}
