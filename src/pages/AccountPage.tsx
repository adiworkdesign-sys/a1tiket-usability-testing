import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, LogOut, Pencil, Save, X, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AccountPage() {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });

    const handleSave = () => {
        // In real app: API call to update profile
        console.log('Saving profile:', formData);
        setIsEditing(false);
    };

    const menuItems = [
        { icon: User, label: 'Penumpang Tersimpan', path: '/saved-passengers', available: true },
        { icon: Phone, label: 'Pengaturan', path: '/settings', available: true },
        { icon: Mail, label: 'Bantuan', path: '/help', available: true },
    ];

    return (
        <AppLayout>
            <div className="p-5 space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-bold">Akun Saya</h1>
                    <p className="text-muted-foreground">Kelola profil dan pengaturan Anda</p>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Profil</h2>
                                {!isEditing ? (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Pencil className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={handleSave}
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            Simpan
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Name */}
                            <div>
                                <Label>Nama Lengkap</Label>
                                {isEditing ? (
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="mt-1"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 mt-1 p-3 bg-muted rounded-xl">
                                        <User className="w-4 h-4 text-muted-foreground" />
                                        <span className="font-medium">{formData.name}</span>
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <Label>Email</Label>
                                {isEditing ? (
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="mt-1"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 mt-1 p-3 bg-muted rounded-xl">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <span className="font-medium">{formData.email}</span>
                                    </div>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <Label>Nomor Telepon</Label>
                                {isEditing ? (
                                    <Input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="mt-1"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 mt-1 p-3 bg-muted rounded-xl">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <span className="font-medium">{formData.phone}</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Menu Items */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                >
                    {menuItems.map((item, index) => (
                        <motion.a
                            key={item.label}
                            href={item.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            className="block p-4 bg-card border rounded-xl hover:bg-accent transition flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <item.icon className="w-5 h-5 text-primary" />
                                </div>
                                <span className="font-medium">{item.label}</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Logout Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={logout}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Keluar
                    </Button>
                </motion.div>
            </div>
        </AppLayout>
    );
}
