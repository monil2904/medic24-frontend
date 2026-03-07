export interface UserProfile {
    id: string;
    name?: string;
    email: string;
    subscription_plan: string;
    queries_today: number;
}

export interface IndividualResponses {
    medgemma?: string;
    meditron?: string;
    medichat?: string;
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    is_emergency?: boolean;
    confidence?: number;
    models_used?: string[];
    individual_responses?: IndividualResponses;
    base64Image?: string;
}


export interface ChatResponse {
    ensemble_response: string;
    confidence: number;
    models_used: string[];
    processing_time_ms: number;
    disclaimer: string;
    is_emergency: boolean;
    individual_responses?: IndividualResponses;
}

export interface LabTest {
    test: string;
    value: number;
    unit: string;
    range: string;
    flag: 'HIGH' | 'LOW' | 'NORMAL' | 'CRITICAL';
}

export interface LabResponse {
    parsed_results: LabTest[];
    ensemble_interpretation: string;
    summary: string;
    abnormal_count: number;
    total_tests: number;
    confidence: number;
}
