import { Train } from '@/types';

export const trains: Train[] = [
    {
        id: 'argo-parahyangan',
        name: 'Argo Parahyangan',
        class: 'Executive',
        operator: 'PT KAI',
        facilities: ['AC', 'Reclining Seat', 'WiFi', 'Reading Light', 'Power Outlet'],
    },
    {
        id: 'argo-lawu',
        name: 'Argo Lawu',
        class: 'Executive',
        operator: 'PT KAI',
        facilities: ['AC', 'Reclining Seat', 'Entertainment', 'Reading Light', 'Power Outlet'],
    },
    {
        id: 'argo-wilis',
        name: 'Argo Wilis',
        class: 'Executive',
        operator: 'PT KAI',
        facilities: ['AC', 'Reclining Seat', 'WiFi', 'Meal', 'Power Outlet'],
    },
    {
        id: 'taksaka',
        name: 'Taksaka',
        class: 'Executive',
        operator: 'PT KAI',
        facilities: ['AC', 'Premium Seat', 'WiFi', 'Meal', 'Reading Light'],
    },
    {
        id: 'bima',
        name: 'Bima',
        class: 'Executive',
        operator: 'PT KAI',
        facilities: ['AC', 'Sleeper', 'WiFi', 'Meal', 'Power Outlet'],
    },
    {
        id: 'gajayana',
        name: 'Gajayana',
        class: 'Executive',
        operator: 'PT KAI',
        facilities: ['AC', 'Reclining Seat', 'Entertainment', 'Meal'],
    },
    {
        id: 'turangga',
        name: 'Turangga',
        class: 'Business',
        operator: 'PT KAI',
        facilities: ['AC', 'Comfortable Seat', 'Reading Light'],
    },
    {
        id: 'lodaya',
        name: 'Lodaya',
        class: 'Business',
        operator: 'PT KAI',
        facilities: ['AC', 'Comfortable Seat', 'Power Outlet'],
    },
    {
        id: 'mutiara-selatan',
        name: 'Mutiara Selatan',
        class: 'Business',
        operator: 'PT KAI',
        facilities: ['AC', 'Comfortable Seat', 'Entertainment'],
    },
    {
        id: 'serayu',
        name: 'Serayu',
        class: 'Economy',
        operator: 'PT KAI',
        facilities: ['Fan', 'Standard Seat'],
    },
    {
        id: 'bengawan',
        name: 'Bengawan',
        class: 'Economy',
        operator: 'PT KAI',
        facilities: ['Fan', 'Standard Seat'],
    },
];

export const getTrainById = (id: string): Train | undefined => {
    return trains.find(t => t.id === id);
};

export const getTrainsByClass = (trainClass: Train['class']): Train[] => {
    return trains.filter(t => t.class === trainClass);
};
