import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { createWorker } from 'tesseract.js';
import { Button } from '@/components/ui/button';
import { Camera, Loader2, X, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseKTPText, validateKTPData, type KTPData } from '@/lib/ktpParser';

interface KTPScannerProps {
    onScanComplete: (data: Partial<KTPData>) => void;
    onClose: () => void;
}

type ScanStatus = 'idle' | 'capturing' | 'processing' | 'success' | 'error';

export function KTPScanner({ onScanComplete, onClose }: KTPScannerProps) {
    const webcamRef = useRef<Webcam>(null);
    const [status, setStatus] = useState<ScanStatus>('idle');
    const [progress, setProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [cameraError, setCameraError] = useState(false);

    const handleCapture = useCallback(async () => {
        if (!webcamRef.current) return;

        try {
            setStatus('capturing');
            setProgress(0);

            // Capture image from webcam
            const imageSrc = webcamRef.current.getScreenshot();
            if (!imageSrc) {
                throw new Error('Gagal mengambil foto');
            }

            setStatus('processing');
            setProgress(10);

            // Initialize Tesseract worker
            const worker = await createWorker('ind', 1, {
                logger: (m) => {
                    // Update progress based on Tesseract progress
                    if (m.status === 'recognizing text') {
                        setProgress(20 + (m.progress * 70));
                    }
                }
            });

            setProgress(95);

            // Perform OCR
            const { data: { text } } = await worker.recognize(imageSrc);

            // Terminate worker
            await worker.terminate();

            setProgress(100);

            // Parse KTP data from OCR text
            const ktpData = parseKTPText(text);
            const validation = validateKTPData(ktpData);

            if (!validation.isValid) {
                setStatus('error');
                setErrorMessage(
                    'Data KTP tidak lengkap:\n' + validation.errors.join(', ') +
                    '\n\nSilakan coba lagi atau isi manual.'
                );
                return;
            }

            // Success!
            setStatus('success');
            setTimeout(() => {
                onScanComplete(ktpData);
            }, 800);

        } catch (error) {
            console.error('KTP scan error:', error);
            setStatus('error');
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : 'Gagal memproses gambar. Silakan coba lagi.'
            );
        }
    }, [onScanComplete]);

    const handleUserMediaError = useCallback(() => {
        setCameraError(true);
        setErrorMessage('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera.');
    }, []);

    if (cameraError) {
        return (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-background rounded-2xl p-6 max-w-sm w-full"
                >
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="font-bold text-xl">Kamera Tidak Tersedia</h3>
                        <p className="text-muted-foreground text-sm">
                            {errorMessage}
                        </p>
                        <Button onClick={onClose} className="w-full">
                            Tutup
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Header */}
            <div className="bg-background/95 backdrop-blur p-4 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-lg">Scan KTP</h3>
                    <p className="text-sm text-muted-foreground">
                        Posisikan KTP dalam frame
                    </p>
                </div>
                <button
                    onClick={onClose}
                    disabled={status === 'processing'}
                    className="p-2 hover:bg-muted rounded-lg disabled:opacity-50"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Camera Preview */}
            <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden" style={{ minHeight: 'calc(100vh - 180px)' }}>
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                        facingMode: 'environment', // Use back camera on mobile
                        width: 1280,
                        height: 720
                    }}
                    onUserMediaError={handleUserMediaError}
                    className="w-full h-full object-cover"
                />

                {/* Overlay Frame Guide */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-[85%] max-w-md aspect-[1.6/1]">
                        {/* Corner guides */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />

                        {/* Center guide */}
                        <div className="absolute inset-0 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center">
                            <div className="bg-black/70 px-4 py-2 rounded-lg">
                                <p className="text-white text-sm font-medium">
                                    Posisikan KTP di sini
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Processing Overlay */}
                <AnimatePresence>
                    {status === 'processing' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center"
                        >
                            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                            <p className="text-white font-medium mb-2">Memproses gambar...</p>
                            <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <p className="text-white/60 text-sm mt-2">{Math.round(progress)}%</p>
                        </motion.div>
                    )}

                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center"
                        >
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="w-12 h-12 text-white" />
                            </div>
                            <p className="text-white font-bold text-xl">Berhasil!</p>
                            <p className="text-white/80 text-sm">Data KTP terdeteksi</p>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-black/90 flex items-center justify-center p-6"
                        >
                            <div className="bg-background rounded-2xl p-6 max-w-sm w-full text-center">
                                <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                                    <AlertCircle className="w-8 h-8 text-red-500" />
                                </div>
                                <h4 className="font-bold text-lg mb-2">Gagal Memproses</h4>
                                <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line">
                                    {errorMessage}
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => {
                                            setStatus('idle');
                                            setErrorMessage('');
                                        }}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Coba Lagi
                                    </Button>
                                    <Button onClick={onClose} className="flex-1">
                                        Tutup
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Actions - Fixed for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t z-50" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
                <div className="p-4">
                    <div className="max-w-md mx-auto flex gap-3">
                        <Button
                            onClick={onClose}
                            variant="outline"
                            className="flex-1"
                            disabled={status === 'processing'}
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={handleCapture}
                            className="flex-1"
                            disabled={status === 'processing' || status === 'success'}
                        >
                            {status === 'processing' ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <Camera className="w-4 h-4 mr-2" />
                                    Ambil Foto
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Helper Text */}
                    <p className="text-xs text-center text-muted-foreground mt-3">
                        💡 Tips: Pastikan pencahayaan cukup dan KTP terlihat jelas
                    </p>
                </div>
            </div>
        </div>
    );
}
