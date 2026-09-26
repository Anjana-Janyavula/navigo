export const translations = {
  en: {
    welcome: "Welcome to Navigo",
    chooseLanguage: "Choose your language",

    english: "English",
    telugu: "తెలుగు",

    easyCampus: "Let's make your campus life easy",

    college:
      "Welcome to Ramachandra College of Engineering",

    getStarted: "Get Started / Login",

    chooseRole: "How are you using Navigo?",

    student: "Student",
    visitor: "Visitor",
    faculty: "Faculty",

    fresher: "Fresher",
    regularStudent: "Regular Student",

    name: "Name",
    phone: "Phone Number",
    branch: "Branch",
    rollNumber: "Roll Number",
    year: "Year",
    facultyId: "Faculty ID",

    continue: "Continue",
    back: "Back",

    welcomeUser: "Welcome to Navigo",

    help: "How can I help you?",

    placeholder: "Where do you want to go?",

    send: "Send",

    map: "Map",
    timetable: "Timetable",

    distance: "Distance",
    estimatedTime: "Estimated time",

    route: "Route",

    continueRoute: "Continue",

    done: "Done",

    reached: "🎉 Yay! Reached!!",

    askAgain:
      "Ask me anything about the campus.",

    thinking: "Navigo is thinking…",

    noDestination:
      "I couldn't find that destination. Try another campus place.",

    invalidPhone:
      "Enter a valid 10-digit phone number.",

    required:
      "Please fill all required fields.",

    apiError:
      "Something went wrong. Local campus navigation is still available.",

    roleContext: "Profile",

    demoNotice:
      "Demo profile — not production authentication",

    day: "Day",
    period: "Period",
    subject: "Subject",
    room: "Room / Lab",

    noRoute:
      "Route could not be calculated.",

    steps: "Steps",

    floor: "Floor",

    campusData: "Demo campus data",

    panelClose: "Close"
  },

  te: {
    welcome: "నావిగోకు స్వాగతం",

    chooseLanguage:
      "మీ భాషను ఎంచుకోండి",

    english: "English",
    telugu: "తెలుగు",

    easyCampus:
      "మీ క్యాంపస్ జీవితాన్ని సులభం చేద్దాం",

    college:
      "రామచంద్ర కాలేజ్ ఆఫ్ ఇంజినీరింగ్‌కు స్వాగతం",

    getStarted:
      "ప్రారంభించండి / లాగిన్",

    chooseRole:
      "మీరు నావిగోను ఎలా ఉపయోగిస్తున్నారు?",

    student: "విద్యార్థి",
    visitor: "సందర్శకుడు",
    faculty: "ఫ్యాకల్టీ",

    fresher: "ఫ్రెషర్",
    regularStudent: "రెగ్యులర్ విద్యార్థి",

    name: "పేరు",
    phone: "ఫోన్ నంబర్",
    branch: "బ్రాంచ్",
    rollNumber: "రోల్ నంబర్",
    year: "సంవత్సరం",
    facultyId: "ఫ్యాకల్టీ ID",

    continue: "కొనసాగించండి",
    back: "వెనక్కి",

    welcomeUser: "నావిగోకు స్వాగతం",

    help:
      "నేను మీకు ఎలా సహాయం చేయగలను?",

    placeholder:
      "మీరు ఎక్కడికి వెళ్లాలనుకుంటున్నారు?",

    send: "పంపు",

    map: "మ్యాప్",
    timetable: "టైమ్‌టేబుల్",

    distance: "దూరం",
    estimatedTime: "అంచనా సమయం",

    route: "మార్గం",

    continueRoute: "కొనసాగించండి",

    done: "పూర్తి",

    reached:
      "🎉 యే! చేరుకున్నాం!!",

    askAgain:
      "క్యాంపస్ గురించి ఏదైనా అడగండి.",

    thinking:
      "నావిగో ఆలోచిస్తోంది…",

    noDestination:
      "ఆ ప్రదేశం కనిపించలేదు. మరో క్యాంపస్ ప్రదేశాన్ని ప్రయత్నించండి.",

    invalidPhone:
      "చెల్లుబాటు అయ్యే 10 అంకెల ఫోన్ నంబర్ ఇవ్వండి.",

    required:
      "అవసరమైన వివరాలన్నీ ఇవ్వండి.",

    apiError:
      "ఏదో తప్పు జరిగింది. స్థానిక క్యాంపస్ నావిగేషన్ అందుబాటులో ఉంది.",

    roleContext: "ప్రొఫైల్",

    demoNotice:
      "డెమో ప్రొఫైల్ — ఇది ప్రొడక్షన్ ఆథెంటికేషన్ కాదు",

    day: "రోజు",
    period: "పీరియడ్",
    subject: "విషయం",
    room: "రూమ్ / ల్యాబ్",

    noRoute:
      "మార్గాన్ని లెక్కించలేకపోయాం.",

    steps: "దశలు",

    floor: "అంతస్తు",

    campusData: "డెమో క్యాంపస్ డేటా",

    panelClose: "మూసివేయి"
  }
};

export const t = (language, key) =>
  translations[language]?.[key] ??
  translations.en[key] ??
  key;