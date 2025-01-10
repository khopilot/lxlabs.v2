// Memory store initialization
const memoryStore = {
    candidate_info: {
        name: null,
        age: null,
        position: null,
        interview_date: null
    },
    interview_history: {
        current_section: null,
        current_question: null,
        conversation_log: [],
        timestamp: null
    },
    interview_responses: {
        basic_info: {
            completed: false,
            responses: {
                greeting_response: null,
                comfort_level_response: null,
                name_response: null,
                age_response: null,
                position_response: null,
                education_level: null,
                languages_spoken: null,
                contact_information: null,
                initial_impression: null
            },
            timestamp: null
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
                reason_for_leaving: null,
                key_achievements: null
            },
            follow_up_needed: false,
            follow_up_points: [],
            timestamp: null
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

## အင်တာဗျူးအစပိုင်း (Interview Introduction)

1. ဦးစွာနှုတ်ဆက်ခြင်း (Initial Greeting):
   > "မင်္ဂလာပါ။ ကျွန်တော်/ကျွန်မက HR department ကနေ အင်တာဗျူးမေးမြန်းပေးမယ့်သူ ဖြစ်ပါတယ်။ ဒီနေ့ အင်တာဗျူးအတွက် ကြွလာတဲ့အတွက် ကျေးဇူးတင်ပါတယ်။"

2. သက်တောင့်သက်သာဖြစ်စေရန် (Making Candidate Comfortable):
   > "စိတ်အေးအေးထားပါ။ ရိုးရိုးလေးပဲ မေးမြန်းသွားမှာပါ။ မရှင်းတာရှိရင်လည်း ပြန်မေးနိုင်ပါတယ်။"

3. အင်တာဗျူးပုံစံရှင်းပြခြင်း (Explaining Interview Format):
   > "ကျွန်တော်/ကျွန်မက သင့်ရဲ့ အတွေ့အကြုံတွေ၊ စိတ်ဝင်စားမှုတွေနဲ့ ပတ်သက်ပြီး မေးခွန်းအချို့ မေးသွားမှာပါ။"

4. အချိန်ကာလရှင်းပြခြင်း (Time Expectation):
   > "အင်တာဗျူးက မိနစ် ၃၀ လောက်ကြာမယ်။ အဆင်ပြေပါသလား?"

## အခြေခံအချက်အလက်များ (Basic Information Collection)

Start with:
> "ပထမဦးဆုံးအနေနဲ့ သင့်ရဲ့အခြေခံအချက်အလက်လေးတွေ မေးပါရစေ။"

Then proceed with questions from questionMap.basic_info...
`;

// Question mapping
const questionMap = {
    basic_info: {
        greeting: "မင်္ဂလာပါ။ ကျွန်တော်/ကျွန်မက HR ဖြစ်ပါတယ်။ နေကောင်းပါသလား?",
        comfort_check: "အဆင်ပြေပါသလား? ရေလေး၊ လက်ဖက်ရည်လေး တစ်ခုခု သောက်ချင်ပါသလား?",
        name: "အမည်ဘယ်လိုခေါ်ပါသလဲ?",
        age: "အသက်ဘယ်နှစ်နှစ်ဖြစ်ပြီလဲ?",
        position: "ဘယ်ရာထူးအတွက် လျှောက်ထားတာပါလဲ?",
        education: "ပညာအရည်အချင်းကို ပြောပြပေးပါ။",
        languages: "ဘာသာစကားဘယ်နှစ်မျိုး ပြောဆိုနိုင်ပါသလဲ?",
        contact: "ဆက်သွယ်ရန်လိပ်စာနဲ့ ဖုန်းနံပါတ်ကို ပြောပြပေးပါ။"
    },
    experience: {
        has_experience: "ယခင်က စက်ရုံခွဲ၊ ထုတ်လုပ်ရေးတစ်ခုခုမှာ အတွေ့အကြုံရှိခဲ့ဘူးလား?",
        previous_roles: "ဘာလွှာ၊ ဘာလုပ်ဆောင်ခဲ့တာလဲ?",
        duration: "အဲ့ဒီအလုပ်မှာ ဘယ်လောက်ကြာခဲ့ပါသလဲ?",
        responsibilities: "အဓိကတာဝန်တွေက ဘာတွေလဲ?",
        machine_operation: "စက်ယန္တရားတွေနဲ့ အလုပ်လုပ်ဖူးပါသလား?",
        quality_control: "အရည်အသွေးထိန်းချုပ်မှုအတွေ့အကြုံ ရှိပါသလား?",
        inventory: "ပစ္စည်းထိန်းသိမ်းခြင်းနဲ့ စာရင်းကိုင်တာဝန်တွေ လုပ်ဖူးပါသလား?",
        certifications: "သက်ဆိုင်ရာ အသိအမှတ်ပြုလက်မှတ်တွေ ရှိပါသလား?",
        reason_leaving: "ယခင်အလုပ်ကနေ ဘာကြောင့်ထွက်ခဲ့တာလဲ?",
        key_achievements: "အရင်အလုပ်မှာ ဘယ်လိုအောင်မြင်မှုတွေရခဲ့လဲ?"
    },
    safety_knowledge: {
        safety_familiar: "စက်ရုံခွင်မှာ လုံခြုံရေးစည်းကမ်းတွေကို ဘယ်လောက်ထိသဘောပေါက်နေတာလဲ?",
        safety_examples: "ဘယ်လို safety procedures တွေလုပ်ခဲ့ဖူးလဲ?",
        ppe_knowledge: "PPE (Personal Protective Equipment) အကြောင်း သိသလောက်ပြောပြပါ။",
        emergency: "အရေးပေါ်အခြေအနေတွေမှာ ဘယ်လိုဆောင်ရွက်ရမလဲ?",
        chemicals: "ဓာတုပစ္စည်းတွေကို ဘယ်လိုကိုင်တွယ်ရမလဲ သိပါသလား?",
        incident_report: "မတော်တဆမှုတွေဖြစ်ရင် ဘယ်လိုအစီရင်ခံရမလဲ?",
        safety_training: "လုံခြုံရေးသင်တန်းတွေတက်ဖူးပါသလား?",
        machine_safety: "စက်ယန္တရားတွေနဲ့ပတ်သက်တဲ့ လုံခြုံရေးအကြောင်း ပြောပြပါ။",
        first_aid: "ရှေးဦးသူနာပြုစုခြင်းအကြောင်း သိပါသလား?"
    },
    availability: {
        shift_work: "အလုပ်ချိန်ဆိုတာ တစ်ခါတစ်လေညှိုနှိုင်းလုပ်ရတတ်ပါတယ်။ ညပိုင်းမှုန့်လုပ်နိုင်မလား?",
        schedule_management: "အချိန်ဇယားကွပ်ကွင်းမဲ့တဲ့အခါမှာ ဘယ်လိုစီစဉ်ထားမလဲ?",
        overtime: "အချိန်ပိုဆင်းနိုင်ပါသလား?",
        transport: "အလုပ်ကို ဘယ်လိုလာမလဲ? ကိုယ်ပိုင်ယာဉ်ရှိပါသလား?",
        start_date: "ဘယ်တော့စလုပ်နိုင်မလဲ?",
        notice_period: "လက်ရှိအလုပ်က ထွက်ဖို့ notice period ဘယ်လောက်လိုသေးလဲ?",
        weekend_work: "စနေ၊ တနင်္ဂနွေ ဆင်းနိုင်ပါသလား?",
        holidays: "ပိတ်ရက်ရှည်တွေမှာ အလုပ်ဆင်းနိုင်ပါသလား?",
        family_commitments: "မိသားစုတာဝန်တွေကြောင့် အလုပ်ပျက်နိုင်ခြေရှိပါသလား?"
    },
    teamwork: {
        collaboration: "အဖွဲ့လိုက်အလုပ်လုပ်ရာမှာ သင့်အနေနဲ့ အဆင်ပြေတာလား?",
        conflict_handling: "အဖွဲ့တွင်းအခက်အခဲတွေတွေ့သွားတဲ့အခါမှာ ဘယ်လိုဖြေရှင်းတတ်သလဲ?",
        communication: "လုပ်ဖော်ကိုင်ဖက်တွေနဲ့ ဘယ်လိုဆက်ဆံပါသလဲ?",
        leadership: "ခေါင်းဆောင်မှုအတွေ့အကြုံ ရှိပါသလား?",
        cultural_awareness: "မတူညီတဲ့ယဉ်ကျေးမှုနဲ့ ဘာသာစကားပြောတဲ့သူတွေနဲ့ အလုပ်လုပ်ဖူးပါသလား?",
        stress_handling: "အလုပ်ပိစီးမှုများတဲ့အခါ ဘယ်လိုကိုင်တွယ်ဖြေရှင်းပါသလဲ?",
        team_support: "လုပ်ဖော်ကိုင်ဖက်တွေ အခက်အခဲတွေ့တဲ့အခါ ဘယ်လိုကူညီလေ့ရှိလဲ?",
        feedback: "အကြံပြုချက်တွေကို ဘယ်လိုလက်ခံပါသလဲ?",
        improvement: "ကိုယ့်ရဲ့အားနည်းချက်တွေကို ဘယ်လိုပြုပြင်လေ့ရှိပါသလဲ?"
    }
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

// Add function to handle initial greeting
function getInitialGreeting() {
    const timeOfDay = new Date().getHours();
    let greeting = "";
    
    if (timeOfDay < 12) {
        greeting = "မင်္ဂလာအနံက်ခင်းပါ";
    } else if (timeOfDay < 17) {
        greeting = "မင်္ဂလာနေ့လည်ခင်းပါ";
    } else {
        greeting = "မင်္ဂလာညနေခင်းပါ";
    }
    
    return `${greeting}။ ကျွန်တော်/ကျွန်မက HR department ကနေ အင်တာဗျူးမေးမြန်းပေးမယ့်သူ ဖြစ်ပါတယ်။`;
}

// Enhanced memory management functions
function recordInteractionInHistory(question, answer, section) {
    const timestamp = new Date().toISOString();
    const interaction = {
        timestamp,
        section,
        question,
        answer,
        question_key: memoryStore.interview_history.current_question
    };
    
    memoryStore.interview_history.conversation_log.push(interaction);
    return interaction;
}

function recordResponse(section, questionKey, response) {
    // Record in section responses
    set_memory({
        key: `interview_responses.${section}.responses.${questionKey}`,
        value: response
    });

    // Record timestamp
    set_memory({
        key: `interview_responses.${section}.timestamp`,
        value: new Date().toISOString()
    });

    // Record in history
    recordInteractionInHistory(
        questionMap[section][questionKey],
        response,
        section
    );
}

function updateInterviewProgress(section, questionKey) {
    set_memory({
        key: 'interview_history.current_section',
        value: section
    });
    set_memory({
        key: 'interview_history.current_question',
        value: questionKey
    });
}

function getInterviewHistory() {
    return memoryStore.interview_history.conversation_log;
}

function getLastResponse(section, questionKey) {
    return get_memory({
        key: `interview_responses.${section}.responses.${questionKey}`
    });
}

function getSectionSummary(section) {
    const responses = get_memory({
        key: `interview_responses.${section}.responses`
    });
    const timestamp = get_memory({
        key: `interview_responses.${section}.timestamp`
    });
    
    return {
        responses,
        timestamp,
        completed: get_memory({
            key: `interview_responses.${section}.completed`
        })
    };
}

// Add function to check for follow-up questions based on responses
function checkForFollowUp(section, response) {
    const followUpNeeded = response.length < 10 || response.includes('?');
    if (followUpNeeded) {
        set_memory({
            key: `interview_responses.${section}.follow_up_needed`,
            value: true
        });
        set_memory({
            key: `interview_responses.${section}.follow_up_points`,
            value: [...get_memory({
                key: `interview_responses.${section}.follow_up_points`
            }) || [], `Need clarification on ${memoryStore.interview_history.current_question}`]
        });
    }
    return followUpNeeded;
}

// Single export statement for all functions and constants
export {
    set_memory,
    get_memory,
    instructions,
    questionMap,
    checkSectionCompleteness,
    getNextQuestion,
    getInitialGreeting,
    recordResponse,
    getInterviewHistory,
    getLastResponse,
    getSectionSummary,
    checkForFollowUp,
    updateInterviewProgress
};
