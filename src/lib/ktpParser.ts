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

    // Find Name - Indonesian KTP layout:
    // Line 1: PROVINSI ...
    // Line 2: KABUPATEN/KOTA ...
    // Line 3: NIK : xxxxxxxxxxxxxxxx
    // Line 4: Nama : ACTUAL NAME HERE

    // Strategy 1: Look for "Nama" label (most reliable)
    const namaLabelPattern = /(?:Nama|NAMA|Name)\s*[:.]?\s*(.+)/i;

    for (const line of lines) {
        const namaMatch = line.match(namaLabelPattern);
        if (namaMatch && namaMatch[1]) {
            const name = namaMatch[1].trim();

            // Filter out obvious non-names
            const excludeWords = /^(PROVINSI|KABUPATEN|KOTA|NIK|TEMPAT|LAHIR|JENIS|KELAMIN|ALAMAT|AGAMA|STATUS|PEKERJAAN|KEWARGANEGARAAN|BERLAKU|WNI|SEUMUR|HIDUP)/i;

            if (!excludeWords.test(name) && name.length >= 3 && name.length <= 50) {
                // Valid name found
                result.fullName = name.toUpperCase();
                break;
            }
        }
    }

    // Strategy 2: If no "Nama:" label found, look for line after NIK
    if (!result.fullName && result.identityNumber) {
        let foundNIK = false;
        for (const line of lines) {
            // Skip until we find the NIK line
            if (line.includes(result.identityNumber)) {
                foundNIK = true;
                continue;
            }

            // Next line after NIK might be name
            if (foundNIK) {
                // Check if line looks like a name (all caps, no special chars)
                const cleanLine = line.replace(/^(Nama|NAMA|Name)\s*[:.]?\s*/i, '').trim();

                // Must be all caps letters/spaces, 3-50 chars
                if (/^[A-Z\s.]{3,50}$/.test(cleanLine)) {
                    // Exclude common location words
                    const excludePattern = /(PROVINSI|KABUPATEN|KOTA|JAKARTA|JAWA BARAT|JAWA TENGAH|JAWA TIMUR|SUMATERA|KALIMANTAN|SULAWESI|PAPUA|BALI|PURWAKARTA|BANDUNG|SURABAYA)/i;

                    if (!excludePattern.test(cleanLine)) {
                        result.fullName = cleanLine;
                        break;
                    }
                }
            }
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
