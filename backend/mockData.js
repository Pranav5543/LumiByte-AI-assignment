// -----------------------
// Mock Answer Datasets
// -----------------------
const mockAnswers = [
  {
    description:
      "Global smartphone market analysis for 2024, including market share, shipment volume, and YoY growth.",
    table: {
      columns: ["Brand", "Market Share", "Shipments (M)", "YoY Growth", "Region"],
      rows: [
        ["Samsung", "21%", "258M", "+5%", "Global"],
        ["Apple", "18%", "221M", "+3%", "Global"],
        ["Xiaomi", "12%", "154M", "+8%", "Asia"],
        ["Oppo", "7%", "96M", "+4%", "Asia"],
        ["Vivo", "6%", "88M", "+2%", "Asia"]
      ]
    }
  },
  {
    description:
      "Overview of renewable energy production in 2024 across major countries.",
    table: {
      columns: ["Country", "Solar (GW)", "Wind (GW)", "Hydro (GW)", "Growth"],
      rows: [
        ["China", "430", "390", "370", "+6%"],
        ["USA", "320", "280", "260", "+4%"],
        ["India", "210", "180", "150", "+9%"],
        ["Germany", "160", "140", "90", "+3%"],
        ["Brazil", "120", "110", "220", "+5%"]
      ]
    }
  },
  {
    description:
      "Financial market performance summary for top global indices in 2024.",
    table: {
      columns: ["Index", "Value", "YoY Change", "Country", "Status"],
      rows: [
        ["S&P 500", "5,245", "+15%", "USA", "Bullish"],
        ["NASDAQ", "16,800", "+18%", "USA", "Bullish"],
        ["NIFTY 50", "22,400", "+12%", "India", "Strong"],
        ["FTSE 100", "7,950", "+4%", "UK", "Stable"],
        ["Nikkei 225", "33,100", "+10%", "Japan", "Growth"]
      ]
    }
  },
  {
    description:
      "Global health report covering leading diseases, recovery rates, and most affected regions.",
    table: {
      columns: ["Disease", "Cases (M)", "Recovery Rate", "Region", "Severity"],
      rows: [
        ["Influenza", "45M", "94%", "Global", "Moderate"],
        ["Dengue", "8.2M", "89%", "Asia", "High"],
        ["Malaria", "241M", "91%", "Africa", "Severe"],
        ["COVID-19", "12M", "96%", "Global", "Low"],
        ["Tuberculosis", "10M", "87%", "Asia", "High"]
      ]
    }
  },
  {
    description:
      "E-commerce growth metrics for 2024, showing order volume, revenue trends, and customer behavior.",
    table: {
      columns: ["Platform", "Users (M)", "Revenue (B)", "Growth", "Top Category"],
      rows: [
        ["Amazon", "310M", "$575B", "+12%", "Electronics"],
        ["Flipkart", "120M", "$32B", "+10%", "Mobiles"],
        ["Alibaba", "260M", "$457B", "+8%", "Fashion"],
        ["Walmart", "190M", "$88B", "+6%", "Grocery"],
        ["Shopify Stores", "100M", "$72B", "+14%", "Beauty"]
      ]
    }
  },
  {
    description:
      "Sports statistics for top football players based on 2024 performance data.",
    table: {
      columns: ["Player", "Goals", "Assists", "Matches", "Club"],
      rows: [
        ["Erling Haaland", "42", "8", "38", "Manchester City"],
        ["Kylian Mbappé", "38", "11", "40", "PSG"],
        ["Harry Kane", "36", "7", "39", "Bayern Munich"],
        ["Vinícius Jr.", "27", "14", "41", "Real Madrid"],
        ["Lionel Messi", "22", "19", "37", "Inter Miami"]
      ]
    }
  },
  {
    description:
      "Global cybersecurity threats report showing top attack types and risk levels.",
    table: {
      columns: ["Threat Type", "Incidents (M)", "Growth", "Region", "Risk Level"],
      rows: [
        ["Phishing", "1.9M", "+14%", "Global", "High"],
        ["Ransomware", "0.7M", "+9%", "Global", "Critical"],
        ["DDoS Attacks", "0.45M", "+6%", "Global", "High"],
        ["Data Breaches", "3.5M", "+11%", "USA", "Severe"],
        ["Malware", "5.1M", "+5%", "Asia", "High"]
      ]
    }
  },
  {
    description:
      "Employment market trends for 2024 showing job sectors, salaries, and demand levels.",
    table: {
      columns: ["Sector", "Avg Salary", "Openings", "Growth", "Demand"],
      rows: [
        ["Software Development", "$95K", "1.2M", "+15%", "Very High"],
        ["Cybersecurity", "$110K", "450K", "+18%", "Critical"],
        ["Data Science", "$120K", "300K", "+14%", "High"],
        ["Healthcare", "$80K", "900K", "+10%", "High"],
        ["Mechanical Engineering", "$75K", "350K", "+6%", "Medium"]
      ]
    }
  },
  {
    description:
      "Agricultural production summary for 2024 highlighting major crops and yield metrics.",
    table: {
      columns: ["Crop", "Production (M tons)", "YoY Change", "Top Producer", "Region"],
      rows: [
        ["Wheat", "780M", "+3%", "China", "Asia"],
        ["Rice", "520M", "+2%", "India", "Asia"],
        ["Corn", "1,220M", "+4%", "USA", "North America"],
        ["Soybean", "390M", "+5%", "Brazil", "South America"],
        ["Potato", "390M", "+1%", "Russia", "Europe"]
      ]
    }
  },
  {
    description:
      "AI technology adoption metrics for businesses in 2024.",
    table: {
      columns: ["Industry", "AI Adoption", "Investment (B)", "Growth", "Usage Area"],
      rows: [
        ["Finance", "72%", "$58B", "+18%", "Fraud Detection"],
        ["Healthcare", "63%", "$41B", "+16%", "Diagnostics"],
        ["Retail", "55%", "$29B", "+14%", "Recommendation Systems"],
        ["Manufacturing", "48%", "$22B", "+10%", "Automation"],
        ["Education", "37%", "$12B", "+8%", "Personalized Learning"]
      ]
    }
  }
];

// -----------------------
// Sessions (5 demo sessions)
// -----------------------
let sessions = [
  {
    sessionId: "session_demo_101",
    title: "Climate Overview 2024",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    messages: [
      { type: "user", question: "Show me global climate metrics.", timestamp: new Date().toISOString(), feedback: null },
      { type: "bot", answer: mockAnswers[0], timestamp: new Date().toISOString(), feedback: null }
    ]
  },
  {
    sessionId: "session_demo_102",
    title: "World Demographics Summary",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    messages: [
      { type: "user", question: "Show me world population metrics.", timestamp: new Date().toISOString(), feedback: null },
      { type: "bot", answer: mockAnswers[1], timestamp: new Date().toISOString(), feedback: null }
    ]
  },
  {
    sessionId: "session_demo_103",
    title: "Education Score Comparison",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    messages: [
      { type: "user", question: "Show me global education rankings.", timestamp: new Date().toISOString(), feedback: null },
      { type: "bot", answer: mockAnswers[2], timestamp: new Date().toISOString(), feedback: null }
    ]
  },
  {
    sessionId: "session_demo_104",
    title: "EV Market Overview",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    messages: [
      { type: "user", question: "Show me electric vehicle stats.", timestamp: new Date().toISOString(), feedback: null },
      { type: "bot", answer: mockAnswers[3], timestamp: new Date().toISOString(), feedback: null }
    ]
  },
  {
    sessionId: "session_demo_105",
    title: "Tourism Trends 2024",
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    messages: [
      { type: "user", question: "Show me global tourism data.", timestamp: new Date().toISOString(), feedback: null },
      { type: "bot", answer: mockAnswers[4], timestamp: new Date().toISOString(), feedback: null }
    ]
  }
];

// Generate random fallback answer
function getRandomAnswer() {
  return mockAnswers[Math.floor(Math.random() * mockAnswers.length)];
}

// Generate session ID
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Export ALL necessary values
export { mockAnswers, sessions, getRandomAnswer, generateSessionId };
