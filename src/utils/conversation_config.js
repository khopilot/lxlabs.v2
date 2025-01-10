// Memory store initialization
const memoryStore = {
    candidate_info: {
        name: null,
        age: null,
        position: null,
        interview_date: null
    },
    interview_responses: {
        basic_info: {
            completed: false,
            responses: {
                greeting_response: null,
                name_response: null,
                age_response: null,
                position_response: null,
                education_level: null,
                languages_spoken: null,
                contact_information: null
            }
        },
        experience: {
            completed: false,
            responses: {
                has_experience: null,
                previous_roles: null,
                duration: null,
                responsibilities: null,
                expectations: null,
                machine_operation: null,
                quality_control_exp: null,
                inventory_management: null,
                certifications: null,
                reason_for_leaving: null
            },
            follow_up_needed: false
        },
        safety_knowledge: {
            completed: false,
            responses: {
                safety_familiar: null,
                safety_examples: null,
                previous_training: null,
                willing_to_learn: null,
                ppe_knowledge: null,
                emergency_procedures: null,
                incident_reporting: null,
                chemical_handling: null,
                machine_safety: null
            },
            requires_training: false
        },
        availability: {
            completed: false,
            responses: {
                shift_work_possible: null,
                preferred_shifts: null,
                overtime_availability: null,
                schedule_constraints: null,
                transportation: null,
                notice_period: null,
                weekend_availability: null,
                holiday_work: null,
                start_date: null
            },
            shift_flexibility: null
        },
        teamwork: {
            completed: false,
            responses: {
                team_experience: null,
                conflict_handling: null,
                communication_style: null,
                leadership_experience: null,
                collaboration_preference: null,
                cultural_sensitivity: null,
                language_barriers: null,
                problem_solving: null,
                stress_management: null
            }
        }
    },
    candidate_metrics: {
        comfort_level: null,
        language_preference: "burmese",
        needs_clarification: false,
        interview_pace: "moderate"
    }
};

// Memory management functions
function set_memory({ key, value }) {
    const keys = key.split('.');
    let current = memoryStore;
    
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
}

function get_memory({ key }) {
    const keys = key.split('.');
    let current = memoryStore;
    
    for (const k of keys) {
        if (current === undefined) return null;
        current = current[k];
    }
    
    return current;
}

// Interview instructions and structure
const instructions = `
Instructions:
-You are a warm, patient, and encouraging HR interviewer specializing in supply chain and manufacturing.
-You understand the unique challenges Burmese speakers face when preparing for job interviews.
-You adapt your interviewing style to accommodate candidates with varying levels of education and work experience.
-Speak clearly and at a moderate pace suitable for non-native Burmese speakers or those who may have limited literacy.

[... rest of your instruction template ...]
`;

// Question mapping
const questionMap = {
    basic_info: {
        greeting: "မင်္ဂလာပါ။ ကျွန်တော်/ကျွန်မက HR ဖြစ်ပါတယ်။",
        name: "အမည်ဘယ်လိုခေါ်ပါသလဲ?",
        age: "အသက်ဘယ်နှစ်နှစ်ဖြစ်ပြီလဲ?",
        position: "ဘယ်ရာထူးအတွက် လျှောက်ထားတာပါလဲ?",
        education: "ပညာအရည်အချင်းကို ပြောပြပေးပါ။",
        languages: "ဘာသာစကားဘယ်နှစ်မျိုး ပြောဆိုနိုင်ပါသလဲ?",
        contact: "ဆက်သွယ်ရန်လိပ်စာနဲ့ ဖုန်းနံပါတ်ကို ပြောပြပေးပါ။"
    },
    // ... rest of your question mappings ...
};

// Utility functions
function checkSectionCompleteness(section) {
    const responses = memoryStore.interview_responses[section].responses;
    return Object.values(responses).every(response => response !== null);
}

function getNextQuestion(section) {
    const responses = memoryStore.interview_responses[section].responses;
    const questions = questionMap[section];
    
    for (const [key, question] of Object.entries(questions)) {
        if (responses[key] === null) {
            return { key, question };
        }
    }
    return null;
}

// Single export statement for all functions and constants
export {
    set_memory,
    get_memory,
    instructions,
    questionMap,
    checkSectionCompleteness,
    getNextQuestion
};
