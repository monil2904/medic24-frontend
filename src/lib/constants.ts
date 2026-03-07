export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const PLAN_LIMITS = {
    free: { text: 5, image: 0, voice: 0, lab: 0 },
    basic: { text: 50, image: 5, voice: 10, lab: 0 },
    pro: { text: 999, image: 999, voice: 999, lab: 10 },
    medical_pro: { text: 999, image: 999, voice: 999, lab: 999 }
};

export const COLORS = {
    primary: '#0F4C81',
    accent: '#0EA5E9',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
};
