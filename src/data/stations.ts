import { Station } from '@/types';

export const stations: Station[] = [
    { code: 'GMR', name: 'Gambir', city: 'Jakarta' },
    { code: 'PSE', name: 'Pasar Senen', city: 'Jakarta' },
    { code: 'JNG', name: 'Jatinegara', city: 'Jakarta' },
    { code: 'BD', name: 'Bandung', city: 'Bandung' },
    { code: 'CN', name: 'Cirebon', city: 'Cirebon' },
    { code: 'SGU', name: 'Semarang Tawang', city: 'Semarang' },
    { code: 'YK', name: 'Yogyakarta', city: 'Yogyakarta' },
    { code: 'SLO', name: 'Solo Balapan', city: 'Solo' },
    { code: 'SBI', name: 'Surabaya Pasar Turi', city: 'Surabaya' },
    { code: 'ML', name: 'Malang', city: 'Malang' },
    { code: 'PWK', name: 'Purwokerto', city: 'Purwokerto' },
    { code: 'KT', name: 'Kutoarjo', city: 'Kutoarjo' },
];

export const getStationByCode = (code: string): Station | undefined => {
    return stations.find(s => s.code === code);
};

export const getStationsByCity = (city: string): Station[] => {
    return stations.filter(s => s.city.toLowerCase().includes(city.toLowerCase()));
};
