/**
 * KTP (Indonesian ID Card) OCR Parser
 * Extracts information from OCR text recognition result
 */

export interface KTPData {
    fullName: string;
    identityNumber: string;
    phone?: string;
}

/**
 * Parse OCR text from Indonesian KTP
 * KTP format typically contains:
 * - NIK: 16-digit number
 * - Nama: Full name
 * - Phone: Optional, may appear in some KTP formats
 */
export function parseKTPText(ocrText: string): Partial<KTPData> {
    const result: Partial<KTPData> = {};
    const lines = ocrText.split('\n').map(line => line.trim()).filter(Boolean);

    // Find NIK (16 digits)
    const nikPattern = /\b(\d{16})\b/;
    for (const line of lines) {
        const nikMatch = line.match(nikPattern);
        if (nikMatch) {
            result.identityNumber = nikMatch[1];
            break;
        }
    }

    // Find Name (usually after "Nama" label or as second/third line)
    const namePatterns = [
        /(?:Nama|NAMA|Name)\s*:?\s*(.+)/i,
        /^([A-Z\s]{3,50})$/  // All caps name, 3-50 chars
    ];

    for (const line of lines) {
        for (const pattern of namePatterns) {
            const nameMatch = line.match(pattern);
            if (nameMatch && nameMatch[1]) {
                const name = nameMatch[1].trim();
                // Validate: Name should be mostly letters
                if (name.length >= 3 && /^[A-Z\s\.]{3,}$/.test(name)) {
                    result.fullName = name;
                    break;
                }
            }
        }
        if (result.fullName) break;
    }

    // Fallback: If no name found with label, try to find the longest all-caps line
    if (!result.fullName) {
        let longestCapsLine = '';
        for (const line of lines) {
            if (/^[A-Z\s\.]{5,50}$/.test(line) && line.length > longestCapsLine.length) {
                // Skip if it's likely a province/city name (common words)
                if (!/(PROVINSI|KABUPATEN|KOTA|JAKARTA|JAWA|SUMATERA)/i.test(line)) {
                    longestCapsLine = line;
                }
            }
        }
        if (longestCapsLine) {
            result.fullName = longestCapsLine;
        }
    }

    // Find phone number (optional, format: +62 or 08...)
    const phonePattern = /(\+?62\d{9,13}|0\d{9,12})/;
    for (const line of lines) {
        const phoneMatch = line.match(phonePattern);
        if (phoneMatch) {
            let phone = phoneMatch[1];
            // Normalize to international format
            if (phone.startsWith('0')) {
                phone = '+62' + phone.substring(1);
            } else if (!phone.startsWith('+')) {
                phone = '+' + phone;
            }
            result.phone = phone;
            break;
        }
    }

    return result;
}

/**
 * Validate extracted KTP data
 */
export function validateKTPData(data: Partial<KTPData>): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    // Validate NIK
    if (!data.identityNumber) {
        errors.push('NIK tidak ditemukan');
    } else if (data.identityNumber.length !== 16) {
        errors.push('NIK harus 16 digit');
    } else if (!/^\d{16}$/.test(data.identityNumber)) {
        errors.push('NIK harus berupa angka');
    }

    // Validate Name
    if (!data.fullName) {
        errors.push('Nama tidak ditemukan');
    } else if (data.fullName.length < 3) {
        errors.push('Nama terlalu pendek');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}
