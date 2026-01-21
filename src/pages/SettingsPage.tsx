import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Moon, Sun, Bell, Globe, Lock, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState('id');

    return (
        <AppLayout showBottomNav={false}>
            <div className="p-5 space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold">Pengaturan</h1>
                    <p className="text-sm text-muted-foreground">
                        Atur preferensi aplikasi Anda
                    </p>
                </div>

                {/* Appearance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card>
                        <CardHeader>
                            <h3 className="font-semibold">Tampilan</h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Dark Mode */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {darkMode ? (
                                        <Moon className="w-5 h-5 text-primary" />
                                    ) : (
                                        <Sun className="w-5 h-5 text-primary" />
                                    )}
                                    <div>
                                        <Label>Mode Gelap</Label>
                                        <p className="text-xs text-muted-foreground">
                                            {darkMode ? 'Aktif' : 'Tidak Aktif'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className={`w-12 h-6 rounded-full transition ${darkMode ? 'bg-primary' : 'bg-muted'
                                        } relative`}
                                >
                                    <span
                                        className={`block w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Language */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-primary" />
                                    <div>
                                        <Label>Bahasa</Label>
                                        <p className="text-xs text-muted-foreground">
                                            {language === 'id' ? 'Indonesia' : 'English'}
                                        </p>
                                    </div>
                                </div>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="px-3 py-1.5 bg-muted rounded-lg border-none outline-none text-sm"
                                >
                                    <option value="id">Indonesia</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardHeader>
                            <h3 className="font-semibold">Notifikasi</h3>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Bell className="w-5 h-5 text-primary" />
                                    <div>
                                        <Label>Push Notification</Label>
                                        <p className="text-xs text-muted-foreground">
                                            {notifications ? 'Aktif' : 'Tidak Aktif'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setNotifications(!notifications)}
                                    className={`w-12 h-6 rounded-full transition ${notifications ? 'bg-primary' : 'bg-muted'
                                        } relative`}
                                >
                                    <span
                                        className={`block w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0.5'
                                            }`}
                                    />
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Security & Privacy */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card>
                        <CardHeader>
                            <h3 className="font-semibold">Keamanan & Privasi</h3>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl transition">
                                <Lock className="w-5 h-5 text-primary" />
                                <div className="text-left">
                                    <p className="font-medium">Ubah Password</p>
                                    <p className="text-xs text-muted-foreground">
                                        Perbarui password akun Anda
                                    </p>
                                </div>
                            </button>

                            <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl transition">
                                <HelpCircle className="w-5 h-5 text-primary" />
                                <div className="text-left">
                                    <p className="font-medium">Kebijakan Privasi</p>
                                    <p className="text-xs text-muted-foreground">
                                        Lihat kebijakan privasi kami
                                    </p>
                                </div>
                            </button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* App Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center text-sm text-muted-foreground"
                >
                    <p>A1 TIKET v1.0.0</p>
                    <p>© 2026 A1 TIKET. All rights reserved.</p>
                </motion.div>
            </div>
        </AppLayout>
    );
}
