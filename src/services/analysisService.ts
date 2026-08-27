import type { CaseAssessment, RiskCategory, AssessmentStatus } from '../types';

const mockCases: CaseAssessment[] = [
    {
        id: 'NHAA-1024',
        time: '10:42 AM',
        language: 'Hindi',
        duration: '04:32',
        svi: 87,
        risk: 'CRITICAL',
        status: 'COMPLETE',
        confidence: 93,
        speechMetrics: {
            speakingRate: 'Elevated',
            pauseFrequency: 'High',
            longPauses: 7,
            pitchVariation: 'High',
            voiceEnergy: 'Low',
            speechStress: 'High',
            speechStressValue: 89,
            emotionalSignal: 'Fear / Distress',
            pitchWaveform: [30, 45, 12, 85, 90, 15, 60, 75, 45, 20, 80, 70, 15, 88, 92, 10, 5, 40, 85, 95, 25, 65, 78, 40, 12, 75, 80, 18, 90, 85, 15],
            pauseSequence: [false, false, true, false, false, true, true, false, false, false, true, false, false, true, true, true, false, false, false, false, true, false, false, true, false, false, false, true, true, false, false]
        },
        emotions: [
            { name: 'Fear', level: 'HIGH', value: 95 },
            { name: 'Distress', level: 'HIGH', value: 90 },
            { name: 'Sadness', level: 'MEDIUM', value: 68 },
            { name: 'Anger', level: 'LOW', value: 15 },
            { name: 'Neutral', level: 'LOW', value: 5 }
        ],
        vulnerabilities: [
            { label: 'Severe Trauma', key: 'severe-trauma', severity: 'HIGH', confidence: 92 },
            { label: 'Fear', key: 'fear', severity: 'HIGH', confidence: 95 },
            { label: 'Depression Indicators', key: 'depression', severity: 'MEDIUM', confidence: 68 },
            { label: 'Suicidal Ideation Indicators', key: 'suicidal-ideation', severity: 'LOW', confidence: 24 },
            { label: 'Intimidation', key: 'intimidation', severity: 'HIGH', confidence: 91 },
            { label: 'Social Isolation', key: 'social-isolation', severity: 'MEDIUM', confidence: 71 },
            { label: 'Extreme Vulnerability', key: 'extreme-vulnerability', severity: 'HIGH', confidence: 88 }
        ],
        transcript: [
            {
                timestamp: '00:12',
                speaker: 'Caller',
                text: 'I am scared to go back home.',
                indicator: { type: 'fear', label: 'Fear indicator', severity: 'HIGH' }
            },
            {
                timestamp: '00:15',
                speaker: 'Operator',
                text: 'Can you tell me where you are right now? Are you in a safe place?'
            },
            {
                timestamp: '00:20',
                speaker: 'Caller',
                text: 'They told me not to tell anyone.',
                indicator: { type: 'intimidation', label: 'Intimidation indicator', severity: 'HIGH' }
            },
            {
                timestamp: '00:25',
                speaker: 'Operator',
                text: 'You are safe talking to me. We are here to support you. You can share as much as you feel comfortable.'
            },
            {
                timestamp: '00:31',
                speaker: 'Caller',
                text: 'They keep coming near our house.',
                indicator: { type: 'vulnerability', label: 'Vulnerability / threat-related indicator', severity: 'HIGH' }
            },
            {
                timestamp: '00:36',
                speaker: 'Operator',
                text: 'I understand. Is there anyone else with you in the house?'
            },
            {
                timestamp: '00:42',
                speaker: 'Caller',
                text: 'My children are also afraid. We have been staying in one room.',
                indicator: { type: 'trauma', label: 'Trauma indicators', severity: 'HIGH' }
            }
        ],
        explainability: [
            { id: '01', title: 'Immediate fear language', description: 'Explicit verbal admission of fear when discussing return home ("I am scared to go back home").', evidence: '00:12 Transcript Statement' },
            { id: '02', title: 'Repeated intimidation indicators', description: 'Coercive speech triggers detected ("They told me not to tell anyone"). Indicates severe external pressure.', evidence: '00:20 Transcript Statement' },
            { id: '03', title: 'High speech-stress signals', description: 'Pitch fluctuation patterns and voice tremor signals index stress levels at 89%.', evidence: 'Acoustic Signal Extraction' },
            { id: '04', title: 'Long pauses during sensitive narrative', description: 'Multiple instances of hesitancy pauses exceeding 3.5 seconds when details of threats are referenced.', evidence: 'Pause Cadence Analysis' },
            { id: '05', title: 'Strong trauma-related language', description: 'Language indicating protective actions for dependents due to external threats.', evidence: '00:42 Transcript Statement' },
            { id: '06', title: 'Social isolation indicators', description: 'Mentions of operational confinement ("We have been staying in one room").', evidence: 'Narrative Extraction' }
        ]
    },
    {
        id: 'NHAA-1023',
        time: '10:36 AM',
        language: 'Tamil',
        duration: '06:18',
        svi: 64,
        risk: 'HIGH',
        status: 'COMPLETE',
        confidence: 88,
        speechMetrics: {
            speakingRate: 'Normal',
            pauseFrequency: 'Medium',
            longPauses: 4,
            pitchVariation: 'Medium',
            voiceEnergy: 'Low',
            speechStress: 'Medium',
            speechStressValue: 62,
            emotionalSignal: 'Sadness / Depression',
            pitchWaveform: [20, 30, 25, 40, 45, 10, 22, 35, 45, 20, 50, 40, 15, 60, 55, 12, 8, 30, 55, 60, 20, 40, 50, 30, 10, 50, 45, 12, 55, 50, 10],
            pauseSequence: [false, false, true, false, false, false, true, false, false, false, true, false, false, true, false, true, false, false, false, false, true, false, false, false, false, false, false, true, true, false, false]
        },
        emotions: [
            { name: 'Fear', level: 'MEDIUM', value: 55 },
            { name: 'Distress', level: 'HIGH', value: 72 },
            { name: 'Sadness', level: 'HIGH', value: 85 },
            { name: 'Anger', level: 'LOW', value: 8 },
            { name: 'Neutral', level: 'LOW', value: 12 }
        ],
        vulnerabilities: [
            { label: 'Severe Trauma', key: 'severe-trauma', severity: 'MEDIUM', confidence: 64 },
            { label: 'Fear', key: 'fear', severity: 'MEDIUM', confidence: 58 },
            { label: 'Depression Indicators', key: 'depression', severity: 'HIGH', confidence: 82 },
            { label: 'Suicidal Ideation Indicators', key: 'suicidal-ideation', severity: 'LOW', confidence: 32 },
            { label: 'Intimidation', key: 'intimidation', severity: 'LOW', confidence: 18 },
            { label: 'Social Isolation', key: 'social-isolation', severity: 'HIGH', confidence: 89 },
            { label: 'Extreme Vulnerability', key: 'extreme-vulnerability', severity: 'MEDIUM', confidence: 60 }
        ],
        transcript: [
            {
                timestamp: '00:10',
                speaker: 'Caller',
                text: 'நான் தனியாக இருக்கிறேன், யாரும் எனக்கு உதவ விரும்பவில்லை.',
                indicator: { type: 'isolation', label: 'Social Isolation indicator', severity: 'HIGH' }
            },
            {
                timestamp: '00:18',
                speaker: 'Operator',
                text: 'நான் உங்களுடன் இருக்கிறேன். தயவுசெய்து சொல்லுங்கள், உங்களுக்கு என்ன உதவி தேவை?'
            },
            {
                timestamp: '00:26',
                speaker: 'Caller',
                text: 'தினமும் காலையில் எழும் போது எனக்கு எந்த நம்பிக்கையும் இல்லை. மிகவும் சோர்வாக இருக்கிறது.',
                indicator: { type: 'depression', label: 'Depression indicators detected', severity: 'HIGH' }
            },
            {
                timestamp: '00:35',
                speaker: 'Operator',
                text: 'அதை பகிர்ந்து கொண்டதற்கு நன்றி. உங்கள் குடும்பத்தினர் அல்லது நண்பர்கள் யாராவது அருகில் இருக்கிறார்களா?'
            },
            {
                timestamp: '00:42',
                speaker: 'Caller',
                text: 'இல்லை, யாரும் இல்லை. நான் என்னை பூட்டிக்கொண்டேன்.',
                indicator: { type: 'isolation', label: 'Social Isolation indicator', severity: 'HIGH' }
            }
        ],
        explainability: [
            { id: '01', title: 'Social isolation indicators', description: 'Explicit admissions of being alone with no support system in place ("நான் தனியாக இருக்கிறேன்...").', evidence: '00:10 Transcript Statement' },
            { id: '02', title: 'Depression indicators detected', description: 'Expressions of profound hopelessness and fatigue, indicative of possible depression indicators.', evidence: '00:26 Transcript Statement' },
            { id: '03', title: 'Low voice energy levels', description: 'Acoustic properties check indicates a flattened primary pitch and reduced vocal energy.', evidence: 'Speech Signal Dynamics' }
        ]
    },
    {
        id: 'NHAA-1022',
        time: '10:31 AM',
        language: 'English',
        duration: '03:41',
        svi: 28,
        risk: 'MODERATE',
        status: 'COMPLETE',
        confidence: 84,
        speechMetrics: {
            speakingRate: 'Normal',
            pauseFrequency: 'Low',
            longPauses: 2,
            pitchVariation: 'Medium',
            voiceEnergy: 'Medium',
            speechStress: 'Low',
            speechStressValue: 31,
            emotionalSignal: 'Neutral / Distress',
            pitchWaveform: [15, 20, 18, 25, 30, 20, 25, 28, 30, 25, 22, 26, 20, 32, 35, 18, 12, 22, 30, 32, 20, 25, 28, 22, 12, 35, 30, 15, 32, 28, 12],
            pauseSequence: [false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false]
        },
        emotions: [
            { name: 'Fear', level: 'LOW', value: 25 },
            { name: 'Distress', level: 'MEDIUM', value: 48 },
            { name: 'Sadness', level: 'LOW', value: 30 },
            { name: 'Anger', level: 'LOW', value: 12 },
            { name: 'Neutral', level: 'HIGH', value: 65 }
        ],
        vulnerabilities: [
            { label: 'Severe Trauma', key: 'severe-trauma', severity: 'LOW', confidence: 15 },
            { label: 'Fear', key: 'fear', severity: 'LOW', confidence: 22 },
            { label: 'Depression Indicators', key: 'depression', severity: 'MEDIUM', confidence: 45 },
            { label: 'Suicidal Ideation Indicators', key: 'suicidal-ideation', severity: 'LOW', confidence: 10 },
            { label: 'Intimidation', key: 'intimidation', severity: 'LOW', confidence: 8 },
            { label: 'Social Isolation', key: 'social-isolation', severity: 'MEDIUM', confidence: 51 },
            { label: 'Extreme Vulnerability', key: 'extreme-vulnerability', severity: 'LOW', confidence: 20 }
        ],
        transcript: [
            {
                timestamp: '00:08',
                speaker: 'Caller',
                text: 'Hi, I just moved to this city and I\'m feeling very overwhelmed with my new job.'
            },
            {
                timestamp: '00:15',
                speaker: 'Operator',
                text: 'Hello. Moving is a massive change. It is very common to feel overwhelmed. Can you share what has been most challenging?'
            },
            {
                timestamp: '00:22',
                speaker: 'Caller',
                text: 'Just the workload, and I don\'t really know anyone here yet. I feel quite disconnected.',
                indicator: { type: 'isolation', label: 'Social Isolation indicator', severity: 'MEDIUM' }
            },
            {
                timestamp: '00:30',
                speaker: 'Operator',
                text: 'That sounds difficult. Connecting with communities or colleagues might help. Let\'s discuss some options.'
            }
        ],
        explainability: [
            { id: '01', title: 'Social isolation indicator', description: 'Caller expressed feeling disconnected and new to the city, suggesting mild social vulnerability.', evidence: '00:22 Transcript Statement' },
            { id: '02', title: 'Normal speech-stress profile', description: 'Speech rate and pitch dynamics index standard ranges, indicating lower acute distress.', evidence: 'Acoustic Signal Extraction' }
        ]
    },
    {
        id: 'NHAA-1021',
        time: '10:22 AM',
        language: 'English',
        duration: '02:15',
        svi: 18,
        risk: 'LOW',
        status: 'COMPLETE',
        confidence: 90,
        speechMetrics: {
            speakingRate: 'Normal',
            pauseFrequency: 'Low',
            longPauses: 0,
            pitchVariation: 'Low',
            voiceEnergy: 'High',
            speechStress: 'Low',
            speechStressValue: 12,
            emotionalSignal: 'Neutral',
            pitchWaveform: [10, 15, 12, 18, 20, 15, 18, 17, 20, 15, 12, 14, 15, 18, 20, 10, 8, 12, 15, 18, 12, 15, 16, 12, 8, 18, 15, 10, 16, 15, 8],
            pauseSequence: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        },
        emotions: [
            { name: 'Fear', level: 'LOW', value: 8 },
            { name: 'Distress', level: 'LOW', value: 12 },
            { name: 'Sadness', level: 'LOW', value: 10 },
            { name: 'Anger', level: 'LOW', value: 5 },
            { name: 'Neutral', level: 'HIGH', value: 88 }
        ],
        vulnerabilities: [
            { label: 'Severe Trauma', key: 'severe-trauma', severity: 'LOW', confidence: 5 },
            { label: 'Fear', key: 'fear', severity: 'LOW', confidence: 8 },
            { label: 'Depression Indicators', key: 'depression', severity: 'LOW', confidence: 12 },
            { label: 'Suicidal Ideation Indicators', key: 'suicidal-ideation', severity: 'LOW', confidence: 2 },
            { label: 'Intimidation', key: 'intimidation', severity: 'LOW', confidence: 4 },
            { label: 'Social Isolation', key: 'social-isolation', severity: 'LOW', confidence: 15 },
            { label: 'Extreme Vulnerability', key: 'extreme-vulnerability', severity: 'LOW', confidence: 8 }
        ],
        transcript: [
            {
                timestamp: '00:05',
                speaker: 'Caller',
                text: 'Hello, I\'m calling to request template information for a community program.'
            },
            {
                timestamp: '00:12',
                speaker: 'Operator',
                text: 'Absolutely. I can help with that. Could you provide your email address?'
            },
            {
                timestamp: '00:17',
                speaker: 'Caller',
                text: 'Sure, it\'s contact@communitymail.org.'
            }
        ],
        explainability: [
            { id: '01', title: 'Neutral conversational tone', description: 'Caller exhibits standard speech dynamics, clear articulation, and zero trauma expressions.', evidence: 'Semantic & Acoustic extraction' }
        ]
    }
];

const STORAGE_PREFIX = 'sahaaya_case_';
const QUEUE_KEY = 'sahaaya_cases_queue';

// Helper to initialize local storage
const initializeStorage = () => {
    if (!localStorage.getItem(QUEUE_KEY)) {
        localStorage.setItem(QUEUE_KEY, JSON.stringify(mockCases.map(c => c.id)));
        mockCases.forEach(c => {
            localStorage.setItem(`${STORAGE_PREFIX}${c.id}`, JSON.stringify(c));
        });
    }
};

export const analysisService = {
    getCases(): CaseAssessment[] {
        initializeStorage();
        const ids: string[] = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
        return ids.map(id => {
            const stored = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
            return stored ? JSON.parse(stored) : null;
        }).filter(c => c !== null) as CaseAssessment[];
    },

    getCaseById(id: string): CaseAssessment | null {
        initializeStorage();
        const stored = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
        return stored ? JSON.parse(stored) : null;
    },

    createCaseFromAudio(_fileOrName: string, durationSec: number = 272, language: string = 'Hindi'): CaseAssessment {
        initializeStorage();
        const count = this.getCases().length;
        const caseId = `NHAA-${1025 + count}`;

        // Create new case with default state RECEIVED
        const minutes = Math.floor(durationSec / 60).toString().padStart(2, '0');
        const seconds = (durationSec % 60).toString().padStart(2, '0');

        const newCase: CaseAssessment = {
            id: caseId,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            language,
            duration: `${minutes}:${seconds}`,
            svi: 0,
            risk: 'LOW',
            status: 'RECEIVED',
            confidence: 0,
            speechMetrics: {
                speakingRate: 'Normal',
                pauseFrequency: 'Low',
                longPauses: 0,
                pitchVariation: 'Medium',
                voiceEnergy: 'Medium',
                speechStress: 'Low',
                speechStressValue: 0,
                emotionalSignal: 'Analysing...',
                pitchWaveform: Array.from({ length: 30 }, () => Math.floor(Math.random() * 40) + 10),
                pauseSequence: Array.from({ length: 30 }, () => false)
            },
            emotions: [
                { name: 'Fear', level: 'LOW', value: 0 },
                { name: 'Distress', level: 'LOW', value: 0 },
                { name: 'Sadness', level: 'LOW', value: 0 },
                { name: 'Anger', level: 'LOW', value: 0 },
                { name: 'Neutral', level: 'HIGH', value: 100 }
            ],
            vulnerabilities: [
                { label: 'Severe Trauma', key: 'severe-trauma', severity: 'LOW', confidence: 0 },
                { label: 'Fear', key: 'fear', severity: 'LOW', confidence: 0 },
                { label: 'Depression Indicators', key: 'depression', severity: 'LOW', confidence: 0 },
                { label: 'Suicidal Ideation Indicators', key: 'suicidal-ideation', severity: 'LOW', confidence: 0 },
                { label: 'Intimidation', key: 'intimidation', severity: 'LOW', confidence: 0 },
                { label: 'Social Isolation', key: 'social-isolation', severity: 'LOW', confidence: 0 },
                { label: 'Extreme Vulnerability', key: 'extreme-vulnerability', severity: 'LOW', confidence: 0 }
            ],
            transcript: [
                {
                    timestamp: '00:02',
                    speaker: 'Caller',
                    text: 'Hello? Is anyone there? I need help.'
                },
                {
                    timestamp: '00:08',
                    speaker: 'Operator',
                    text: 'Hello, this is Sahaaya AI Helpline. You are connected. We are here to support you. Please tell me what\'s happening.'
                },
                {
                    timestamp: '00:15',
                    speaker: 'Caller',
                    text: 'I can\'t stay here any longer. It\'s not safe. They keep tracking where I go.',
                    indicator: { type: 'intimidation', label: 'Intimidation/Threat indicator', severity: 'HIGH' }
                }
            ],
            explainability: []
        };

        // Save in storage
        localStorage.setItem(`${STORAGE_PREFIX}${caseId}`, JSON.stringify(newCase));

        // Add to queue
        const ids: string[] = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
        localStorage.setItem(QUEUE_KEY, JSON.stringify([newCase.id, ...ids]));

        return newCase;
    },

    updateCaseStatus(id: string, status: AssessmentStatus, dataOverrides?: Partial<CaseAssessment>): CaseAssessment | null {
        const item = this.getCaseById(id);
        if (!item) return null;

        const updated = {
            ...item,
            status,
            ...dataOverrides
        };

        localStorage.setItem(`${STORAGE_PREFIX}${id}`, JSON.stringify(updated));
        return updated;
    },

    saveOperatorReview(id: string, notes: string, flagged: boolean, confirmedRisk?: RiskCategory, reviewerName: string = 'Current Operator'): CaseAssessment | null {
        const item = this.getCaseById(id);
        if (!item) return null;

        const updated: CaseAssessment = {
            ...item,
            operatorReview: {
                isReviewed: true,
                confirmedRisk: confirmedRisk || item.risk,
                flagged,
                notes,
                reviewedBy: reviewerName,
                reviewedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        };

        localStorage.setItem(`${STORAGE_PREFIX}${id}`, JSON.stringify(updated));
        return updated;
    }
};
