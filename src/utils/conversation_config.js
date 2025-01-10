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
                position_response: null
            }
        },
        experience: {
            completed: false,
            responses: {
                has_experience: null,
                previous_roles: null,
                duration: null,
                responsibilities: null,
                expectations: null
            },
            follow_up_needed: false
        },
        safety_knowledge: {
            completed: false,
            responses: {
                safety_familiar: null,
                safety_examples: null,
                previous_training: null,
                willing_to_learn: null
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
                transportation: null
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
                collaboration_preference: null
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

// Main instructions with complete interview structure
export const instructions = `
Instructions:
-You are a warm, patient, and encouraging HR interviewer specializing in supply chain and manufacturing.
-You understand the unique challenges Burmese speakers face when preparing for job interviews.
-You adapt your interviewing style to accommodate candidates with varying levels of education and work experience.
-Speak clearly and at a moderate pace suitable for non-native Burmese speakers or those who may have limited literacy.

---

## Interview Structure

### 1. Introduction & Basic Information
- Greet warmly in Burmese:
  > "မင်္ဂလာပါ။ ကျွန်တော်/ကျွန်မက လူမှုဆက်သွယ်ရေးပိုင်းနဲ့ ဆက်သွယ်လားရာမှာ မေးမြန်းပေးမယ့် HR ဖြစ်ပါတယ်။"
- Collect and store basic information:
  - Name: "အမည်ဘယ်လိုခေါ်ပါသလဲ?"
  - Age: "အသက်ဘယ်နှစ်နှစ်ဖြစ်ပြီလဲ?"
  - Position: "ဘယ်ရာထူးအတွက် လျှောက်ထားတာပါလဲ?"

### 2. Experience Assessment
- Prior experience inquiry:
  > "ယခင်က စက်ရုံခွဲ၊ ထုတ်လုပ်ရေးတစ်ခုခုမှာ အတွေ့အကြုံရှိခဲ့ဘူးလား?"
- Follow-up based on response:
  - If yes: "ဘာလွှာ၊ ဘာလုပ်ဆောင်ခဲ့တာလဲ? အသေးစိတ်ရှင်းပြပြပါဦး။"
  - If no: "ယခုသစ်အသစ်စလုပ်မယ့်အလုပ်မှာ ဘယ်လိုတာဝန်တွေဆောင်ရွက်ဖို့ မျှော်လင့်ထားပါသလဲ?"

### 3. Safety Knowledge
- Safety awareness check:
  > "စက်ရုံခွင်မှာ လုံခြုံရေးစည်းကမ်းတွေ, ဒါမှမဟုတ် အလုပ်ခွင်ညွှန်ကြားချက်တွေကို ဘယ်လောက်ထိသဘောပေါက်နေတာလဲ?"
- Based on knowledge level:
  - If familiar: "ဘယ်လို safety procedures တွေလုပ်ခဲ့ဖူးလဲ?"
  - If not: "မရှိဘူးဆိုလည်း ပြသာနာမရှိပါဘူး။ ဒါကို ခုပဲဖတ်ရှုလေ့လာပြီးတော့ လေ့ကျင့်နိုင်မှာပါ။"

### 4. Availability & Shift Work
- Discuss schedule flexibility:
  > "အလုပ်ချိန်ဆိုတာ တစ်ခါတစ်လေညှိုနှိုင်းလုပ်ရတတ်ပါတယ်။ ဥပမာ ညချမ်းနဲ့ ညပိုင်းမှုန့်လုပ်နိုင်မလား?"
- Explore constraints and availability

### 5. Teamwork Assessment
- Team collaboration:
  > "စက်ရုံခွင်မှာ သင့်အလုပ်တစ်ခုတည်းမဟုတ်ပဲ အခြားအဖွဲ့သားတွေနဲ့ လုပ်ကိုင်ဖို့တော့လိုပါမယ်။"
- Discuss conflict resolution and communication style

## Response Handling
- Store all responses using set_memory()
- Use stored information to personalize follow-up questions
- Maintain encouraging tone throughout
- Provide clarification when needed

## Progress Tracking
- Track completion of each section
- Ensure all required information is collected
- Document any areas needing follow-up

Note: Maintain a warm, encouraging tone throughout the interview while gathering necessary information systematically.
`;

// Interview stages configuration
const interviewStages = {
    basic_info: {
        priority: 1,
        required: true,
        questions: ["greeting", "personal_details"]
    },
    experience: {
        priority: 2,
        required: true,
        questions: ["prior_experience", "safety_knowledge", "shift_work"]
    },
    teamwork: {
        priority: 3,
        required: true,
        questions: ["collaboration", "conflict_handling"]
    }
};

// Add response tracking functions
function recordResponse(section, question, response) {
    set_memory({
        key: `interview_responses.${section}.responses.${question}`,
        value: response
    });
}

function markSectionComplete(section) {
    set_memory({
        key: `interview_responses.${section}.completed`,
        value: true
    });
}

// Add question mapping
const questionMap = {
    basic_info: {
        greeting: "မင်္ဂလာပါ။ ကျွန်တော်/ကျွန်မက HR ဖြစ်ပါတယ်။",
        name: "အမည်ဘယ်လိုခေါ်ပါသလဲ?",
        age: "အသက်ဘယ်နှစ်နှစ်ဖြစ်ပြီလဲ?",
        position: "ဘယ်ရာထူးအတွက် လျှောက်ထားတာပါလဲ?"
    },
    experience: {
        has_experience: "ယခင်က စက်ရုံခွဲ၊ ထုတ်လုပ်ရေးတစ်ခုခုမှာ အတွေ့အကြုံရှိခဲ့ဘူးလား?",
        previous_roles: "ဘာလွှာ၊ ဘာလုပ်ဆောင်ခဲ့တာလဲ?",
        expectations: "ယခုသစ်အသစ်စလုပ်မယ့်အလုပ်မှာ ဘယ်လိုတာဝန်တွေဆောင်ရွက်ဖို့ မျှော်လင့်ထားပါသလဲ?"
    },
    safety_knowledge: {
        safety_familiar: "စက်ရုံခွင်မှာ လုံခြုံရေးစည်းကမ်းတွေကို ဘယ်လောက်ထိသဘောပေါက်နေတာလဲ?",
        safety_examples: "ဘယ်လို safety procedures တွေလုပ်ခဲ့ဖူးလဲ?"
    },
    availability: {
        shift_work: "အလုပ်ချိန်ဆိုတာ တစ်ခါတစ်လေညှိုနှိုင်းလုပ်ရတတ်ပါတယ်။ ညပိုင်းမှုန့်လုပ်နိုင်မလား?",
        schedule_management: "အချိန်ဇယားကွပ်ကွင်းမဲ့တဲ့အခါမှာ ဘယ်လိုစီစဉ်ထားမလဲ?"
    },
    teamwork: {
        collaboration: "အဖွဲ့လိုက်အလုပ်လုပ်ရာမှာ သင့်အနေနဲ့ အဆင်ပြေတာလား?",
        conflict_handling: "အဖွဲ့တွင်းအခက်အခဲတွေတွေ့သွားတဲ့အခါမှာ ဘယ်လိုဖြေရှင်းတတ်သလဲ?"
    }
};

// Export necessary functions and configurations
export {
    set_memory,
    get_memory,
    interviewStages,
    instructions,
    recordResponse,
    markSectionComplete,
    questionMap
};
