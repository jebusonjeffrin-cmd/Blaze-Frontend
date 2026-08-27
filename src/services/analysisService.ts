import type { NHAAPayload } from '../types';

// Conformant NHAA Mock Data Source
const NHAA_MOCKS: NHAAPayload[] = [
    {
        success: true,
        filename: "audio_triage_01.wav",
        case_id: "NHAA-9C34F4",
        svi: {
            score: 82.0,
            raw_score: 82.0,
            risk_category: "CRITICAL",
            risk_color: "#dc2626",
            sub_scores: {
                linguistic_threat: 100.0,
                vocal_distress: 68.0,
                acoustic_panic: 69.0,
                multimodal_co_occurrence: 85.0
            },
            safety_overrides: [
                "CRITICAL: Imminent Physical Violence / Weapon Threat -> SVI forced to >= 82"
            ]
        },
        classification: {
            predicted_class: {
                class_id: 2,
                label: "Class 2: Deep Trauma / Structural Fear & Danger",
                short_name: "DEEP_TRAUMA"
            },
            probabilities: [
                { class_id: 0, name: "Class 0: Routine Admin", probability: 0.02 },
                { class_id: 1, name: "Class 1: Low-Level Dispute", probability: 0.18 },
                { class_id: 2, name: "Class 2: Deep Trauma / Structural Fear", probability: 0.80 }
            ]
        },
        detected_signs: [
            {
                source: "Linguistic Semantics (MuRIL)",
                sign: "Immediate Physical Violence (Matches: 'जान से मार')",
                type: "nlp"
            }
        ],
        recommendations: [
            {
                service_domain: "POLICE_AND_LAW_ENFORCEMENT",
                title: "Urgent Police PCR Dispatch & SHO Alert",
                action: "Immediate alert to District Superintendent of Police regarding ongoing physical threat.",
                urgency: "Immediate (< 15 mins)",
                statutory_reference: "SC/ST (PoA) Act 1989 & PCR Rules",
                icon: "🚔",
                badge_color: "#dc2626"
            }
        ],
        admin_executive_brief: "Complainant interaction screened with SVI of 82/100, indicating severe structural fear and immediate violent threats. Dispatched to rapid response forces.",
        transcription: {
            text: "गाँव के दबंगों ने हमारे घर को घेर लिया है... वो जान से मारने की धमकी दे रहे हैं। जल्दी पुलिस भेजिए!",
            language: "hi-IN",
            aligned_words: [
                { word: "गाँव", start_time: 0.2, end_time: 0.5, local_f0_hz: 240, local_rms: 0.04, is_threat_word: false, cross_attention_weight: 0.05 },
                { word: "के", start_time: 0.5, end_time: 0.7, local_f0_hz: 230, local_rms: 0.03, is_threat_word: false, cross_attention_weight: 0.02 },
                { word: "दबंगों", start_time: 0.8, end_time: 1.3, local_f0_hz: 320, local_rms: 0.06, is_threat_word: true, cross_attention_weight: 0.65 },
                { word: "ने", start_time: 1.3, end_time: 1.5, local_f0_hz: 290, local_rms: 0.05, is_threat_word: false, cross_attention_weight: 0.08 },
                { word: "हमारे", start_time: 1.6, end_time: 2.0, local_f0_hz: 350, local_rms: 0.07, is_threat_word: false, cross_attention_weight: 0.12 },
                { word: "घर", start_time: 2.1, end_time: 2.4, local_f0_hz: 583.8, local_rms: 0.08, is_threat_word: false, cross_attention_weight: 0.20 },
                { word: "को", start_time: 2.4, end_time: 2.6, local_f0_hz: 500, local_rms: 0.07, is_threat_word: false, cross_attention_weight: 0.04 }
            ]
        }
    },
    {
        success: true,
        filename: "audio_triage_02.wav",
        case_id: "NHAA-2B19X7",
        svi: {
            score: 64.5,
            raw_score: 64.5,
            risk_category: "HIGH",
            risk_color: "#ea580c",
            sub_scores: {
                linguistic_threat: 50.0,
                vocal_distress: 72.0,
                acoustic_panic: 60.0,
                multimodal_co_occurrence: 66.0
            },
            safety_overrides: []
        },
        classification: {
            predicted_class: {
                class_id: 1,
                label: "Class 1: Intimidation & Rights Denial",
                short_name: "INTIMIDATION"
            },
            probabilities: [
                { class_id: 0, name: "Class 0: Routine Admin", probability: 0.10 },
                { class_id: 1, name: "Class 1: Intimidation & Rights Denial", probability: 0.75 },
                { class_id: 2, name: "Class 2: Deep Trauma / Structural Fear", probability: 0.15 }
            ]
        },
        detected_signs: [
            {
                source: "Vocal Emotion",
                sign: "Elevated vocal jitter and pitch breaking indicating emotional distress.",
                type: "audio_signal"
            }
        ],
        recommendations: [
            {
                service_domain: "LEGAL_AID",
                title: "Assign Dedicated Legal Counsel",
                action: "Connect victim with district legal aid authorities for property dispute intervention.",
                urgency: "High (< 2 hrs)",
                statutory_reference: "SC/ST (PoA) Act Section 4 (Neglect of Duties)",
                icon: "⚖️",
                badge_color: "#ea580c"
            }
        ],
        admin_executive_brief: "Complainant facing significant structural intimidation regarding land access. SVI reflects high vocal distress despite moderate linguistic threats.",
        transcription: {
            text: "सरपंच साब हमें हमारे खेत के रास्ते से निकलने नहीं दे रहे।",
            language: "hi-IN",
            aligned_words: [
                { word: "सरपंच", start_time: 0.5, end_time: 1.0, local_f0_hz: 190, local_rms: 0.05, is_threat_word: false, cross_attention_weight: 0.1 },
                { word: "साब", start_time: 1.1, end_time: 1.4, local_f0_hz: 185, local_rms: 0.04, is_threat_word: false, cross_attention_weight: 0.05 },
                { word: "हमें", start_time: 1.5, end_time: 1.8, local_f0_hz: 210, local_rms: 0.04, is_threat_word: false, cross_attention_weight: 0.05 },
                { word: "रास्ते", start_time: 2.4, end_time: 2.8, local_f0_hz: 250, local_rms: 0.06, is_threat_word: false, cross_attention_weight: 0.15 },
                { word: "नहीं", start_time: 3.5, end_time: 3.9, local_f0_hz: 300, local_rms: 0.07, is_threat_word: true, cross_attention_weight: 0.55 }
            ]
        }
    }
];

class AnalysisService {
    private STORAGE_KEY = 'nhaa_cases_v3';

    constructor() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(NHAA_MOCKS));
        }
    }

    getCases(): NHAAPayload[] {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return NHAA_MOCKS;
    }

    getCaseById(id: string): NHAAPayload | undefined {
        return this.getCases().find(c => c.case_id === id);
    }
}

export const analysisService = new AnalysisService();
