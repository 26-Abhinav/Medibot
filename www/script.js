

let selectedDept = ""
let selectedDoctor = ""

/* LOGIN */

/* AUTHORIZED EMAILS */

const authorizedUsers = [
    "doctor@hospital.com",
    "admin@hospital.com",
    "patient@hospital.com"
]

let currentLanguage = localStorage.getItem("medibot_lang") || "English";

const translations = {
    "English": {
        "appSubtitle": "Your Healthcare Assistant",
        "emergency": "Emergency",
        "readPrescription": "Read Prescription",
        "analyzeReport": "Analyze Report",
        "typeQuestion": "Ask a question about the document (optional)...",
        "typeMessage": "Type your message...",
        "welcomeTitle": "Welcome back! How can I help you today?",
        "howCanIHelp": "How can I help you today?",
        "bookAppt": "Book Appointment",
        "reschedule": "Reschedule",
        "cancelAppt": "Cancel Appointment",
        "talkRecep": "Talk to Receptionist",
        "viewDocs": "View Doctors",
        "bookAnother": "Book Another",
        "whichDept": "Which department would you like to visit?",
        "deptGeneral": "General Practice",
        "deptCardiology": "Cardiology",
        "deptDermatology": "Dermatology",
        "deptPediatrics": "Pediatrics",
        "deptOrthopedics": "Orthopedics"
    },
    "Hindi": {
        "appSubtitle": "आपका स्वास्थ्य सहायक",
        "emergency": "आपातकालीन",
        "readPrescription": "प्रिस्क्रिप्शन पढ़ें",
        "analyzeReport": "रिपोर्ट का विश्लेषण करें",
        "typeQuestion": "दस्तावेज़ के बारे में एक प्रश्न पूछें (वैकल्पिक)...",
        "typeMessage": "अपना संदेश टाइप करें...",
        "welcomeTitle": "वापसी पर स्वागत है! मैं आज आपकी कैसे मदद कर सकता हूँ?",
        "howCanIHelp": "मैं आज आपकी कैसे मदद कर सकता हूँ?",
        "bookAppt": "अपॉइंटमेंट बुक करें",
        "reschedule": "पुनर्निर्धारित करें",
        "cancelAppt": "अपॉइंटमेंट रद्द करें",
        "talkRecep": "रिसेप्शनिस्ट से बात करें",
        "viewDocs": "डॉक्टर देखें",
        "bookAnother": "एक और बुक करें",
        "whichDept": "आप किस विभाग में जाना चाहेंगे?",
        "deptGeneral": "सामान्य चिकित्सा",
        "deptCardiology": "हृदय रोग",
        "deptDermatology": "त्वचा रोग",
        "deptPediatrics": "बाल रोग",
        "deptOrthopedics": "अस्थि रोग"
    },
    "Marathi": {
        "appSubtitle": "तुमचा आरोग्य सहाय्यक",
        "emergency": "आणीबाणी",
        "readPrescription": "प्रिस्क्रिप्शन वाचा",
        "analyzeReport": "अहवाल तपासा",
        "typeQuestion": "दस्तऐवजाबद्दल प्रश्न विचारा (पर्यायी)...",
        "typeMessage": "तुमचा संदेश टाइप करा...",
        "welcomeTitle": "पुन्हा स्वागत आहे! मी आज तुम्हाला कशी मदत करू शकतो?",
        "howCanIHelp": "मी आज तुम्हाला कशी मदत करू शकतो?",
        "bookAppt": "अपॉइंटमेंट बुक करा",
        "reschedule": "पुन्हा वेळापत्रक",
        "cancelAppt": "अपॉइंटमेंट रद्द करा",
        "talkRecep": "रिसेप्शनिस्टशी बोला",
        "viewDocs": "डॉक्टर पहा",
        "bookAnother": "दुसरा बुक करा",
        "whichDept": "तुम्हाला कोणत्या विभागात जायचे आहे?",
        "deptGeneral": "सामान्य चिकित्सा",
        "deptCardiology": "हृदयरोग",
        "deptDermatology": "त्वचाशास्त्र",
        "deptPediatrics": "बालरोग",
        "deptOrthopedics": "अस्थिरोग"
    },
    "Bengali": {
        "appSubtitle": "আপনার স্বাস্থ্য সহকারী",
        "emergency": "জরুরী",
        "readPrescription": "প্রেসক্রিপশন পড়ুন",
        "analyzeReport": "রিপোর্ট বিশ্লেষণ করুন",
        "typeQuestion": "ডকুমেন্ট সম্পর্কে একটি প্রশ্ন জিজ্ঞাসা করুন (ঐচ্ছিক)...",
        "typeMessage": "আপনার বার্তা টাইপ করুন...",
        "welcomeTitle": "ফিরে স্বাগতম! আমি আজ আপনাকে কীভাবে সাহায্য করতে পারি?",
        "howCanIHelp": "আমি আজ আপনাকে কীভাবে সাহায্য করতে পারি?",
        "bookAppt": "অ্যাপয়েন্টমেন্ট বুক করুন",
        "reschedule": "পুনঃনির্ধারণ",
        "cancelAppt": "অ্যাপয়েন্টমেন্ট বাতিল করুন",
        "talkRecep": "রিসেপশনিস্টের সাথে কথা বলুন",
        "viewDocs": "ডাক্তার দেখুন",
        "bookAnother": "অন্য একটি বুক করুন",
        "whichDept": "আপনি কোন বিভাগে যেতে চান?",
        "deptGeneral": "সাধারণ চিকিৎসা",
        "deptCardiology": "হৃদরোগ",
        "deptDermatology": "চর্মরোগ",
        "deptPediatrics": "শিশু রোগ",
        "deptOrthopedics": "অস্থি রোগ"
    },
    "Tamil": {
        "appSubtitle": "உங்கள் சுகாதார உதவியாளர்",
        "emergency": "அவசரம்",
        "readPrescription": "மருந்துச் சீட்டைப் படிக்கவும்",
        "analyzeReport": "அறிக்கையை பகுப்பாய்வு செய்யவும்",
        "typeQuestion": "ஆவணத்தைப் பற்றி ஒரு கேள்வியைக் கேளுங்கள் (விரும்பினால்)...",
        "typeMessage": "உங்கள் செய்தியை தட்டச்சு செய்க...",
        "welcomeTitle": "மீண்டும் வருக! இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
        "howCanIHelp": "இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
        "bookAppt": "சந்திப்பை பதிவு செய்யவும்",
        "reschedule": "மாற்றி அமை",
        "cancelAppt": "சந்திப்பை ரத்துசெய்",
        "talkRecep": "வரவேற்பாளரிடம் பேசுங்கள்",
        "viewDocs": "மருத்துவர்களைக் காண்க",
        "bookAnother": "மற்றொன்றை பதிவு செய்யவும்",
        "whichDept": "நீங்கள் எந்த துறையை பார்வையிட விரும்புகிறீர்கள்?",
        "deptGeneral": "பொது மருத்துவம்",
        "deptCardiology": "இருதயவியல்",
        "deptDermatology": "தோல் மருத்துவம்",
        "deptPediatrics": "குழந்தை மருத்துவம்",
        "deptOrthopedics": "எலும்பியல்"
    },
    "Telugu": {
        "appSubtitle": "మీ ఆరోగ్య సహాయకుడు",
        "emergency": "అత్యవసర పరిస్థితి",
        "readPrescription": "ప్రిస్క్రిప్షన్ చదవండి",
        "analyzeReport": "నివేదికను విశ్లేషించండి",
        "typeQuestion": "పత్రం గురించి ఒక ప్రశ్న అడగండి (ఐచ్ఛికం)...",
        "typeMessage": "మీ సందేశాన్ని టైప్ చేయండి...",
        "welcomeTitle": "తిరిగి స్వాగతం! ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?",
        "howCanIHelp": "ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?",
        "bookAppt": "అపాయింట్‌మెంట్ బుక్ చేయండి",
        "reschedule": "రీషెడ్యూల్",
        "cancelAppt": "అపాయింట్‌మెంట్‌ను రద్దు చేయండి",
        "talkRecep": "రిసెప్షనిస్ట్‌తో మాట్లాడండి",
        "viewDocs": "వైద్యులను చూడండి",
        "bookAnother": "మరొకటి బుక్ చేయండి",
        "whichDept": "మీరు ఏ విభాగాన్ని సందర్శించాలనుకుంటున్నారు?",
        "deptGeneral": "సాధారణ అభ్యాసం",
        "deptCardiology": "కార్డియాలజీ",
        "deptDermatology": "డెర్మటాలజీ",
        "deptPediatrics": "పీడియాట్రిక్స్",
        "deptOrthopedics": "ఆర్థోపెడిక్స్"
    },
    "Haryanvi": {
        "appSubtitle": "थारा स्वास्थ्य सहायक",
        "emergency": "आपातकालीन",
        "readPrescription": "पर्ची पढ़ो",
        "analyzeReport": "रिपोर्ट चेक करो",
        "typeQuestion": "कागज के बारे म सवाल पूछो (मर्जी है)...",
        "typeMessage": "अपनो मैसेज लिखो...",
        "welcomeTitle": "वापसी पे स्वागत सै! आज मैं थारी के मदद कर सकूँ सूँ?",
        "howCanIHelp": "मैं आज थारी के मदद कर सकूँ सूँ?",
        "bookAppt": "अपॉइंटमेंट बुक करो",
        "reschedule": "बदलाव करो",
        "cancelAppt": "अपॉइंटमेंट रद्द करो",
        "talkRecep": "रिसेप्शनिस्ट ते बात करो",
        "viewDocs": "डॉक्टर देखो",
        "bookAnother": "एक और बुक करो",
        "whichDept": "तन्ने किस विभाग म जाणा सै?",
        "deptGeneral": "सामान्य इलाज",
        "deptCardiology": "दिल का इलाज",
        "deptDermatology": "चमड़ी का इलाज",
        "deptPediatrics": "बाल रोग",
        "deptOrthopedics": "हड्डी रोग"
    },
    "Punjabi": {
        "appSubtitle": "ਤੁਹਾਡਾ ਸਿਹਤ ਸਹਾਇਕ",
        "emergency": "ਐਮਰਜੈਂਸੀ",
        "readPrescription": "ਨੁਸਖ਼ਾ ਪੜ੍ਹੋ",
        "analyzeReport": "ਰਿਪੋਰਟ ਦੀ ਜਾਂਚ ਕਰੋ",
        "typeQuestion": "ਦਸਤਾਵੇਜ਼ ਬਾਰੇ ਕੋਈ ਸਵਾਲ ਪੁੱਛੋ (ਵਿਕਲਪਿਕ)...",
        "typeMessage": "ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ...",
        "welcomeTitle": "ਵਾਪਸੀ 'ਤੇ ਸੁਆਗਤ ਹੈ! ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
        "howCanIHelp": "ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
        "bookAppt": "ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ",
        "reschedule": "ਮੁੜ ਤਹਿ ਕਰੋ",
        "cancelAppt": "ਅਪਾਇੰਟਮੈਂਟ ਰੱਦ ਕਰੋ",
        "talkRecep": "ਰਿਸੈਪਸ਼ਨਿਸਟ ਨਾਲ ਗੱਲ ਕਰੋ",
        "viewDocs": "ਡਾਕਟਰ ਦੇਖੋ",
        "bookAnother": "ਇੱਕ ਹੋਰ ਬੁੱਕ ਕਰੋ",
        "whichDept": "ਤੁਸੀਂ ਕਿਹੜੇ ਵਿਭਾਗ ਵਿੱਚ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
        "deptGeneral": "ਆਮ ਇਲਾਜ",
        "deptCardiology": "ਦਿਲ ਦਾ ਇਲਾਜ",
        "deptDermatology": "ਚਮੜੀ ਦਾ ਇਲਾਜ",
        "deptPediatrics": "ਬੱਚਿਆਂ ਦਾ ਇਲਾਜ",
        "deptOrthopedics": "ਹੱਡੀਆਂ ਦਾ ਇਲਾਜ"
    },
    "Gujarati": {
        "appSubtitle": "તમારો સ્વાસ્થ્ય સહાયક",
        "emergency": "ઇમરજન્સી",
        "readPrescription": "પ્રિસ્ક્રિપ્શન વાંચો",
        "analyzeReport": "રિપોર્ટ તપાસો",
        "typeQuestion": "દસ્તાવેજ વિશે પ્રશ્ન પૂછો (વૈકલ્પિક)...",
        "typeMessage": "તમારો સંદેશ લખો...",
        "welcomeTitle": "પાછા આવવા બદલ સ્વાગત છે! આજે હું તમને કેવી રીતે મદદ કરી શકું?",
        "howCanIHelp": "આજે હું તમને કેવી રીતે મદદ કરી શકું?",
        "bookAppt": "એપોઇન્ટમેન્ટ બુક કરો",
        "reschedule": "ફરીથી શેડ્યૂલ કરો",
        "cancelAppt": "એપોઇન્ટમેન્ટ રદ કરો",
        "talkRecep": "રિસેપ્શનિસ્ટ સાથે વાત કરો",
        "viewDocs": "ડોકટરો જુઓ",
        "bookAnother": "બીજું બુક કરો",
        "whichDept": "તમે કયા વિભાગની મુલાકાત લેવા માંગો છો?",
        "deptGeneral": "સામાન્ય સારવાર",
        "deptCardiology": "કાર્ડિયોલોજી",
        "deptDermatology": "ડર્મેટોલોજી",
        "deptPediatrics": "બાળરોગ",
        "deptOrthopedics": "ઓર્થોપેડિક્સ"
    }
};

function t(key) {
    const langObj = translations[currentLanguage] || translations["English"];
    return langObj[key] || translations["English"][key] || key;
}

function updateLanguage() {
    let langSelect = document.getElementById("langSelect");
    if (langSelect) {
        currentLanguage = langSelect.value;
        localStorage.setItem("medibot_lang", currentLanguage);
        applyTranslations();
    }
}

function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        el.placeholder = t(key);
    });
}

window.onload = async function () {
    // Hide everything initially
    document.getElementById("chatApp").style.display = "none";
    document.getElementById("loginPage").style.display = "none";

    let langSelect = document.getElementById("langSelect");
    if (langSelect) langSelect.value = currentLanguage;
    applyTranslations();

    // For Capacitor (APK), auto-detect the backend server IP
    const isCapacitor = window.Capacitor !== undefined || window.location.protocol === 'capacitor:';
    if (isCapacitor) {
        const candidates = ['10.232.166.58', '192.168.29.75', '192.168.1.1'];
        for (const ip of candidates) {
            try {
                const res = await fetch(`http://${ip}:3000/config`, { signal: AbortSignal.timeout(2000) });
                const data = await res.json();
                BACKEND_BASE = data.backendURL;
                console.log("Auto-detected backend:", BACKEND_BASE);
                break;
            } catch (e) { /* try next */ }
        }
    }

    loadCities();

    setTimeout(() => {
        document.getElementById("splash").style.display = "none"
        document.getElementById("loginPage").style.display = "block"
    }, 2000)
}

let locationsData = {};

// Dynamic backend URL - auto-detected at runtime
let BACKEND_BASE = `http://${window.location.hostname || 'localhost'}:3000`;

// Smart backend URL resolver
function getBackendURL() {
    // If you have a public backend URL (e.g. on Render), paste it here:
    // const PUBLIC_BACKEND_URL = "https://your-medibot-backend.onrender.com";
    const PUBLIC_BACKEND_URL = ""; 

    if (PUBLIC_BACKEND_URL) return PUBLIC_BACKEND_URL;
    
    // Auto-detect if we are on a cloud platform (like Vercel)
    if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
        return window.location.origin; // Use the current domain (Vercel hosts both on the same domain)
    }
    
    return BACKEND_BASE;
}

async function loadCities() {
    try {
        const response = await fetch(`${getBackendURL()}/locations`);
        locationsData = await response.json();

        const stateSelect = document.getElementById("stateSelect");
        if (stateSelect) {
            const states = Object.keys(locationsData).sort();
            stateSelect.innerHTML = `<option value="">Select State</option>` + states.map(s => `<option value="${s}">${s}</option>`).join("");

            // Restore saved state
            const savedState = localStorage.getItem("medibot_state");
            if (savedState && states.includes(savedState)) {
                stateSelect.value = savedState;
                updateState(false); // Populate cities but don't overwrite saved city yet
            }
        }
    } catch (err) {
        console.error("Error loading locations:", err);
    }
}

function updateState(resetCity = true) {
    const state = document.getElementById("stateSelect").value;
    localStorage.setItem("medibot_state", state);

    const citySelect = document.getElementById("citySelect");
    if (citySelect) {
        if (state && locationsData[state]) {
            const cities = locationsData[state];
            citySelect.innerHTML = `<option value="">Select City</option>` + cities.map(c => `<option value="${c}">${c}</option>`).join("");
            citySelect.disabled = false;

            if (!resetCity) {
                const savedCity = localStorage.getItem("medibot_city");
                if (savedCity && cities.includes(savedCity)) {
                    citySelect.value = savedCity;
                }
            } else {
                citySelect.value = "";
                localStorage.removeItem("medibot_city");
            }
        } else {
            citySelect.innerHTML = `<option value="">Select City</option>`;
            citySelect.disabled = true;
        }
    }
    console.log("State updated to:", state);
}

function updateCity() {
    const city = document.getElementById("citySelect").value;
    localStorage.setItem("medibot_city", city);
    console.log("City updated to:", city);
}

/* LOGIN */

async function login() {

    let email = document.getElementById("email").value.trim()
    let password = document.getElementById("password").value.trim()

    if (!email || !password) {
        alert("Enter email & password")
        return
    }

    try {

        let userCredential = await window.signInUser(
            window.auth,
            email,
            password
        )

        let user = userCredential.user

        // save current user
        window.currentUser = user

        alert("Login successful ✅")

        document.getElementById("loginPage").style.display = "none"
        document.getElementById("chatApp").style.display = "flex"
        
        if (typeof loadChatHistory !== "undefined") loadChatHistory();

    } catch (error) {
        alert(error.message)
    }

}

/* TYPING */

function typing() {

    let t = document.createElement("div")

    t.className = "typing"

    t.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`

    chat.appendChild(t)

    chat.scrollTop = chat.scrollHeight

    return t

}

function bot(callback) {

    let t = typing()

    setTimeout(() => {

        t.remove()

        callback()   // ❌ no await

    }, 800)

}

/* SEND MESSAGE */

function send() {

    let input = document.getElementById("msg")
    let text = input.value.toLowerCase().trim()

    if (!text) return

    add(text, "user")
    input.value = ""

    /* SYMPTOM CHECK */
    const symptoms = {
        general: ["fever", "cold", "cough", "flu", "headache"],
        cardiology: ["heart", "chest pain"],
        dermatology: ["skin", "rash"],
        orthopedics: ["bone", "joint"],
        pediatrics: ["baby", "child"]
    }

    let found = null

    for (let dept in symptoms) {
        for (let word of symptoms[dept]) {
            if (text.includes(word)) {
                found = dept
                break
            }
        }
    }

    if (text.includes("my appointment") || text.includes("show appointment")) {

        showAppointments()
        return

    }

    /* RESPONSE */
    if (found) {

        bot(() => {

            add(`
Based on your symptoms you may need <b>${found}</b>

<div class="quick">
<button onclick="showDoctors('${found}')">${t('viewDocs')}</button>
</div>
`, "bot")

        })

    } else {

        // 🔥 AI OUTSIDE bot()
        typing()

        getAIResponse(text).then(reply => {

            // remove typing manually
            document.querySelector(".typing")?.remove()

            // --- AI AUTO SUGGESTION ---
            let cleanReply = reply;
            let autoSuggest = null;

            // Look for [SEARCH:...] trigger
            const match = reply.match(/\[SEARCH:(.*?)\]/);
            if (match) {
                autoSuggest = match[1];
                cleanReply = reply.replace(/\[SEARCH:.*?\]/g, "");
            }

            add(cleanReply, "bot")

            if (autoSuggest) {
                console.log("AI suggesting search for:", autoSuggest);
                showDoctors(autoSuggest.toLowerCase());
            }

        })

    }

}

/* DEPARTMENTS */

function showDepartments() {

    add(t('bookAppt'), "user")

    bot(() => {

        add(`
${t('whichDept')}

<div class="quick">

<button onclick="showDoctors('general')">${t('deptGeneral')}</button>
<button onclick="showDoctors('cardiology')">${t('deptCardiology')}</button>
<button onclick="showDoctors('dermatology')">${t('deptDermatology')}</button>
<button onclick="showDoctors('pediatrics')">${t('deptPediatrics')}</button>
<button onclick="showDoctors('orthopedics')">${t('deptOrthopedics')}</button>

</div>
`, "bot")

    })

}



/* SHOW DOCTORS */

async function showDoctors(dept) {
    selectedDept = dept;
    add(dept, "user");

    const t = typing();

    // Map frontend departments to dataset specializations
    const mapping = {
        general: "General Physician",
        cardiology: "Cardiologist",
        dermatology: "Dermatologist",
        pediatrics: "Pediatrician",
        orthopedics: "Orthopedic"
    };

    const spec = mapping[dept] || dept;
    const state = document.getElementById("stateSelect")?.value || "";
    const city = document.getElementById("citySelect")?.value || "";

    try {
        const response = await fetch(`${getBackendURL()}/doctors?specialization=${spec}&state=${state}&city=${city}`);
        const data = await response.json();

        t.remove();

        if (data.length === 0) {
            add(`No doctors found for ${spec} in ${city} 😔`, "bot");
            return;
        }

        let list = `Here are available <b>${spec}s</b> in <b>${city}</b>:<br>`;

        data.forEach(d => {
            list += `
<div class="doctor">
    <div>
        <b>${d.Doctor_Name}</b><br>
        <span style="font-size:12px; color:var(--text-muted)">
            <i class="fa-solid fa-hospital"></i> ${d.Hospital}<br>
            <i class="fa-solid fa-phone"></i> ${d.Contact_Number}
        </span>
    </div>
    <button class="book" onclick="slots('${d.Doctor_Name}')">Book</button>
</div>
`;
        });

        add(list, "bot");

    } catch (err) {
        t.remove();
        console.error(err);
        add("Error fetching doctors 😔", "bot");
    }
}

/* SLOTS */

function slots(doc) {

    selectedDoctor = doc

    add(`Book with ${doc}`, "user")

    bot(() => {

        add(`
Choose a date:

<input type="date" id="date">

Available slots:

<div class="slots">

<button onclick="confirmSlot('9:00 AM')">9:00 AM</button>
<button onclick="confirmSlot('9:30 AM')">9:30 AM</button>
<button onclick="confirmSlot('10:00 AM')">10:00 AM</button>
<button onclick="confirmSlot('11:00 AM')">11:00 AM</button>
<button onclick="confirmSlot('1:00 PM')">1:00 PM</button>
<button onclick="confirmSlot('2:30 PM')">2:30 PM</button>

</div>
`, "bot")

    })

}

/* CONFIRM */

async function confirmSlot(time) {

    let date = document.getElementById("date").value

    if (!date) {
        alert("Please select a date")
        return
    }

    if (!window.currentUser) {
        alert("You must be logged in to book an appointment.");
        return;
    }

    add(time, "user")

    // SAVE TO FIREBASE
    try {

        await window.addDoc(window.collection(window.db, "appointments"), {
            doctor: selectedDoctor,
            date: date,
            time: time,

            // 🔥 USER INFO ADD
            userId: window.currentUser.uid,
            userName: window.currentUser.displayName,

            createdAt: new Date()
        })

    } catch (e) {
        console.error("Error:", e)
    }

    bot(() => {

        add(`
Your appointment has been booked! 🎉

<div class="confirm">

<b>Appointment Confirmed</b><br><br>

Doctor: ${selectedDoctor}<br>
Date: ${date}<br>
Time: ${time}

</div>

<div class="quick">

<button onclick="showDepartments()">${t('bookAnother')}</button>
<button onclick="reception()">${t('talkRecep')}</button>

</div>
`, "bot")

    })

}

/* OTHER ACTIONS */

function cancel() {

    bot(() => {
        add("Your appointment has been cancelled.", "bot")
    })

}

function reschedule() {

    add("Reschedule", "user")

    bot(() => {

        add(`
Would you like to book a new appointment?

<div class="quick">

<button onclick="showDepartments()">${t('bookAppt')}</button>
<button onclick="reception()">${t('talkRecep')}</button>

</div>
`, "bot")

    })

}

function reception() {

    add("Talk to Receptionist", "user")

    bot(() => {
        add(`
You can call our reception at <b>(555) 123-4567</b>.

<div class="quick">

<button onclick="showDepartments()">${t('bookAppt')}</button>

</div>
`, "bot")
    })

}

/* EMERGENCY BUTTON */

document.querySelector(".emergency").onclick = function () {

    add("Emergency", "user")

    bot(() => {
        add(`
⚠️ If this is an emergency please call:

<b>102 / 108</b>

Or visit the nearest hospital immediately.
`, "bot")
    })

}


async function showAppointments() {

    if (!window.currentUser) {
        add("You must be logged in to view your appointments.", "bot");
        return;
    }

    bot(async () => {

        let list = "<b>My Appointments:</b><br><br>"

        try {

            const querySnapshot = await window.getDocs(
                window.collection(window.db, "appointments")
            );

            let found = false;

            querySnapshot.forEach((doc) => {

                let data = doc.data()

                if (data.userId === window.currentUser.uid) {

                    found = true;

                    list += `
<div class="confirm">
Doctor: ${data.doctor}<br>
Date: ${data.date}<br>
Time: ${data.time}
</div><br>
`

                }

            })

            if (!found) {
                list += "No appointments found 😔"
            }

        } catch (e) {
            list = "Error fetching appointments"
        }

        add(list, "bot")

    })

}

async function signup() {

    let name = document.getElementById("name").value.trim()
    let email = document.getElementById("signupEmail").value.trim()
    let password = document.getElementById("signupPassword").value.trim()

    if (!name || !email || !password) {
        alert("Please fill all fields")
        return
    }

    try {

        let userCredential = await window.createUser(
            window.auth, // 🔥 FIX
            email,
            password
        )

        let user = userCredential.user

        window.currentUser = user

        alert("Account created successfully 🎉")

        document.getElementById("loginPage").style.display = "none"
        document.getElementById("chatApp").style.display = "flex"
        
        if (typeof loadChatHistory !== "undefined") loadChatHistory();

    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            alert("Email already registered. Please login instead.");
        } else {
            alert(error.message)
        }

    }

}

function showSignup() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("signupBox").style.display = "block";
}

function showLogin() {
    document.getElementById("signupBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

async function forgotPassword() {

    let email = document.getElementById("email").value.trim()

    if (!email) {
        alert("Please enter your email first")
        return
    }

    try {

        await window.resetPassword(window.auth, email)

        alert("Password reset link sent to your email 📧")

    } catch (error) {

        if (error.code === "auth/user-not-found") {
            alert("No account found with this email")
        } else {
            alert(error.message)
        }

    }

}

async function getAIResponse(message) {
    try {
        const state = document.getElementById("stateSelect")?.value || "";
        const city = document.getElementById("citySelect")?.value || "";

    let res = await fetch(`${getBackendURL()}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message, state, city, language: currentLanguage })
    });

        let data = await res.json();
        return data.reply;

    } catch (error) {
        console.error(error);
        return "AI not working 😔";
    }
}

async function add(msg, type, saveToDb = true) {

    let chat = document.getElementById("chat")  // 🔥 IMPORTANT

    let div = document.createElement("div")

    div.className = type === "user" ? "user-msg" : "bot-msg"

    if (type === "user") {
        div.textContent = msg; // Prevent XSS by escaping HTML
    } else {
        div.innerHTML = msg;
    }

    chat.appendChild(div)

    chat.scrollTop = chat.scrollHeight

    if (saveToDb && window.currentUser && window.db) {
        try {
            await window.addDoc(window.collection(window.db, "chats"), {
                userId: window.currentUser.uid,
                message: msg,
                type: type,
                timestamp: new Date()
            });
        } catch (e) {
            console.error("Error saving message to history:", e);
        }
    }

}

async function loadChatHistory() {
    let chat = document.getElementById("chat");
    chat.innerHTML = ""; // Clear existing messages
    
    if (!window.currentUser || !window.db) return;

    try {
        const q = window.query(
            window.collection(window.db, "chats"),
            window.where("userId", "==", window.currentUser.uid)
        );

        const querySnapshot = await window.getDocs(q);
        
        if (querySnapshot.empty) {
            // Add default welcome messages if no history
            add(`Hi there! 👋 I'm MediChat, your healthcare scheduling assistant.`, "bot", false);
            add(`${t('howCanIHelp')}
                <div class="quick">
                  <button onclick="showDepartments()">${t('bookAppt')}</button>
                  <button onclick="reschedule()">${t('reschedule')}</button>
                  <button onclick="cancel()">${t('cancelAppt')}</button>
                  <button onclick="reception()">${t('talkRecep')}</button>
                </div>`, "bot", false);
        } else {
            let messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });
            
            // Sort client-side to avoid Firestore composite index requirement
            messages.sort((a, b) => {
                let timeA = a.timestamp ? (a.timestamp.toDate ? a.timestamp.toDate().getTime() : new Date(a.timestamp).getTime()) : 0;
                let timeB = b.timestamp ? (b.timestamp.toDate ? b.timestamp.toDate().getTime() : new Date(b.timestamp).getTime()) : 0;
                return timeA - timeB;
            });

            messages.forEach((data) => {
                add(data.message, data.type, false);
            });

            // Always provide the quick actions at the end of history for the new session
            add(`${t('welcomeTitle')}
                <div class="quick">
                  <button onclick="showDepartments()">${t('bookAppt')}</button>
                  <button onclick="reschedule()">${t('reschedule')}</button>
                  <button onclick="cancel()">${t('cancelAppt')}</button>
                  <button onclick="reception()">${t('talkRecep')}</button>
                </div>`, "bot", false);
        }
    } catch (e) {
        console.error("Error loading chat history:", e);
        add(`Hi there! 👋 I'm MediChat. (History could not be loaded)`, "bot", false);
        add(`How can I help you today?
            <div class="quick">
              <button onclick="showDepartments()">Book Appointment</button>
              <button onclick="reschedule()">Reschedule</button>
              <button onclick="cancel()">Cancel Appointment</button>
              <button onclick="reception()">Talk to Receptionist</button>
            </div>`, "bot", false);
    }
}

window.loadChatHistory = loadChatHistory;

window.add = add;
window.showDepartments = showDepartments;
window.showDoctors = showDoctors;
window.slots = slots;
window.confirmSlot = confirmSlot;
window.reschedule = reschedule;
window.cancel = cancel;
window.reception = reception;
window.send = send;
window.showAppointments = showAppointments;


async function analyzeReport(directFile = null, docType = "report") {

    let file = directFile;

    if (!file) {
        const fileInput = document.getElementById("reportFile");
        file = fileInput.files[0];
    }

    if (!file) {
        alert("Please upload a file");
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        alert("File is too large! Maximum allowed is 10MB.");
        return;
    }

    let queryInput = document.getElementById("reportQuery");
    let queryText = queryInput ? queryInput.value.trim() : "";

    if (queryText) {
        add(`📄 Uploading document...\n\nQuestion: ${queryText}`, "user");
    } else {
        if (docType === "prescription") {
            add("💊 Reading prescription...", "user");
        } else {
            add("📄 Uploading medical report...", "user");
        }
    }
    let chat = document.getElementById("chat");
    let progressDiv = document.createElement("div");
    progressDiv.className = "bot-msg";
    progressDiv.style.padding = "10px"; // reduce padding to make it smaller
    progressDiv.innerHTML = `
    <div class="progress-box" style="margin-top:0;">
      <span class="progress-text prog-text">Uploading... 0%</span>
      <span class="time-left prog-time">Estimating...</span>
      <div class="progress-container" style="margin:5px 0 0 0; height:8px;">
        <div class="progress-bar prog-bar"></div>
      </div>
    </div>
  `;
    chat.appendChild(progressDiv);
    chat.scrollTop = chat.scrollHeight;

    const formData = new FormData();
    formData.append("documentType", docType);
    formData.append("language", currentLanguage);
    if (queryText) {
        formData.append("query", queryText);
        if (queryInput) queryInput.value = ""; // clear text input
    }
    formData.append("file", file);

    let fileInput = document.getElementById("reportFile");
    if (fileInput) {
        fileInput.value = ""; // clear file picker
        // Reset label text
        const label = document.querySelector(".file-label");
        if (label) {
            label.innerHTML = `<i class="fa-solid fa-file-arrow-up"></i> Select Report`;
            label.style.borderColor = "";
            label.style.color = "";
        }
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${getBackendURL()}/analyze`, true);

    let startTime = Date.now();
    let t = null;

    let progBar = progressDiv.querySelector(".prog-bar");
    let progText = progressDiv.querySelector(".prog-text");
    let progTime = progressDiv.querySelector(".prog-time");

    xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
            let percent = Math.round((e.loaded / e.total) * 100);
            progBar.style.width = percent + "%";
            progText.textContent = "Uploading... " + percent + "%";

            let elapsed = (Date.now() - startTime) / 1000;
            if (elapsed > 0) {
                let speed = e.loaded / elapsed;
                let remaining = (e.total - e.loaded) / speed;
                if (remaining > 0 && remaining < Infinity) {
                    progTime.textContent = Math.round(remaining) + "s left";
                }
            }
        }
    };

    xhr.upload.onload = function () {
        progText.textContent = "Upload Complete!";
        progTime.textContent = "Medibot is thinking...";
        // Trigger AI typing animation while waiting for server response
        t = typing();
    };

    xhr.onload = function () {
        if (t) t.remove();
        progressDiv.remove(); // REMOVE the progress box once AI replies!
        if (xhr.status === 200) {
            try {
                let data = JSON.parse(xhr.responseText);
                add(data.reply, "bot");
            } catch (err) {
                console.error(err);
                add("Error parsing AI response 😔", "bot");
            }
        } else {
            add("Server error during upload 😔", "bot");
        }
    };

    xhr.onerror = function () {
        if (t) t.remove();
        progressDiv.remove();
        add("Network error 😔", "bot");
    };

    xhr.send(formData);
}

function handleCameraUpload() {
    const cameraInput = document.getElementById("cameraFile");
    if (cameraInput.files && cameraInput.files[0]) {
        // Directly analyze the captured photo
        analyzeReport(cameraInput.files[0]);
        // Reset the input so the same file can be captured again if needed
        cameraInput.value = "";
    }
}

window.handleCameraUpload = handleCameraUpload;

// Update file label when a report is selected
document.addEventListener("change", function (e) {
    if (e.target && e.target.id === "reportFile") {
        const file = e.target.files[0];
        const label = document.querySelector(".file-label");
        if (file && label) {
            label.innerHTML = `<i class="fa-solid fa-file-circle-check"></i> ${file.name}`;
            label.style.borderColor = "var(--primary)";
            label.style.color = "var(--primary)";
        }
    }
});