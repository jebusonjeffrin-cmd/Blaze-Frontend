export type RiskCategory = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface AlignedWord {
    word: string;
    start_time: number;
    end_time: number;
    local_f0_hz: number;
    local_rms: number;
    is_threat_word: boolean;
    cross_attention_weight: number;
}

export interface Transcription {
    text: string;
    language: string;
    aligned_words: AlignedWord[];
}

export interface Recommendation {
    service_domain: string;
    title: string;
    action: string;
    urgency: string;
    statutory_reference: string;
    icon: string;
    badge_color: string;
}

export interface DetectedSign {
    source: string;
    sign: string;
    type: string;
}

export interface PredictionClass {
    class_id: number;
    label: string;
    short_name: string;
}

export interface Probability {
    class_id: number;
    name: string;
    probability: number;
}

export interface Classification {
    predicted_class: PredictionClass;
    probabilities: Probability[];
}

export interface SviSubScores {
    linguistic_threat: number;
    vocal_distress: number;
    acoustic_panic: number;
    multimodal_co_occurrence: number;
}

export interface SviData {
    score: number;
    raw_score: number;
    risk_category: RiskCategory;
    risk_color: string;
    sub_scores: SviSubScores;
    safety_overrides: string[];
}

export interface NHAAPayload {
    success: boolean;
    filename: string;
    case_id: string;
    svi: SviData;
    classification: Classification;
    detected_signs: DetectedSign[];
    recommendations: Recommendation[];
    admin_executive_brief: string;
    transcription: Transcription;
}

export interface Operator {
    id: string;
    name: string;
    email: string;
    stationId?: string;
    avatarUrl?: string;
}
