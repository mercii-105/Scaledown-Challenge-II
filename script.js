// =========================
// EcoFAQ — Home + Chatbot
// HTML/CSS/JS
// =========================

/* -------------------------
   PAGE NAVIGATION
-------------------------- */
const navHome = document.getElementById("navHome");
const navChat = document.getElementById("navChat");
const navAbout = document.getElementById("navAbout");

const homePage = document.getElementById("homePage");
const chatPage = document.getElementById("chatPage");
const aboutPage = document.getElementById("aboutPage");

const startChatBtn = document.getElementById("startChatBtn");
const backHomeBtn = document.getElementById("backHomeBtn");
const aboutToChatBtn = document.getElementById("aboutToChatBtn");

function showPage(pageName){
  // reset
  [homePage, chatPage, aboutPage].forEach(p => p.classList.remove("active"));
  [navHome, navChat, navAbout].forEach(b => b.classList.remove("active"));

  if(pageName === "home"){
    homePage.classList.add("active");
    navHome.classList.add("active");
  }
  if(pageName === "chat"){
    chatPage.classList.add("active");
    navChat.classList.add("active");
  }
  if(pageName === "about"){
    aboutPage.classList.add("active");
    navAbout.classList.add("active");
  }
}

navHome.addEventListener("click", () => showPage("home"));
navChat.addEventListener("click", () => showPage("chat"));
navAbout.addEventListener("click", () => showPage("about"));

startChatBtn.addEventListener("click", () => {
  showPage("chat");
  setTimeout(() => userInput.focus(), 150);
});
backHomeBtn.addEventListener("click", () => showPage("home"));
aboutToChatBtn.addEventListener("click", () => showPage("chat"));

/* -------------------------
   HOME DASHBOARD DATA
-------------------------- */
const ECO_FACTS = [
  {
    title: "A single plastic bottle can take ~450 years to decompose.",
    extra: "Reducing single-use plastic is one of the easiest ways to cut daily waste."
  },
  {
    title: "LED bulbs use up to 80% less energy than traditional bulbs.",
    extra: "Switching lighting is a simple, high-impact habit."
  },
  {
    title: "Food waste is a major contributor to landfill methane emissions.",
    extra: "Composting reduces methane and improves soil health."
  },
  {
    title: "Fast fashion produces huge water waste and textile pollution.",
    extra: "Buying fewer, better clothes is eco-friendly and budget-friendly."
  },
  {
    title: "A dripping tap can waste thousands of liters of water per year.",
    extra: "Fixing leaks is one of the most underrated climate actions."
  }
];

const ECO_HISTORY = [
  {
    title: "1970: The first Earth Day was celebrated.",
    extra: "Earth Day became one of the biggest environmental movements worldwide."
  },
  {
    title: "1987: The Montreal Protocol was signed.",
    extra: "It helped protect the ozone layer by reducing harmful chemicals."
  },
  {
    title: "1992: The Rio Earth Summit brought global climate issues into focus.",
    extra: "It influenced future climate agreements and sustainability policies."
  },
  {
    title: "2015: The Paris Agreement was adopted.",
    extra: "Countries committed to limiting global warming and reducing emissions."
  },
  {
    title: "2000s: Recycling programs expanded globally.",
    extra: "Waste segregation and recycling became mainstream in many cities."
  }
];

const FEATURED_TOPICS = [
  {
    title: "Recycling: What actually works?",
    text: "Learn what is recyclable, what causes contamination, and how to recycle properly.",
    ask: "Which plastics are NOT recyclable?"
  },
  {
    title: "Water Conservation",
    text: "Simple habits that reduce water use without changing your whole lifestyle.",
    ask: "How can I save water daily?"
  },
  {
    title: "Carbon Footprint",
    text: "Understand emissions and how daily choices affect climate change.",
    ask: "What is a carbon footprint?"
  },
  {
    title: "Home Energy Saving",
    text: "Small changes that reduce electricity bills and emissions.",
    ask: "How can I save electricity at home easily?"
  }
];

function pickRandom(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

function renderTodayCard(){
  const todayDate = document.getElementById("todayDate");
  const todayHint = document.getElementById("todayHint");

  const now = new Date();
  const dayName = now.toLocaleDateString(undefined, { weekday: "long" });
  const prettyDate = now.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  todayDate.textContent = `${dayName}, ${prettyDate}`;
  todayHint.textContent = "Explore a daily eco fact, history highlight, and quick actions.";
}

function renderDailyDashboard(){
  // stats
  document.getElementById("faqCount").textContent = FAQS.length;
  document.getElementById("catCount").textContent = new Set(FAQS.map(f => f.category)).size;

  // fact
  const fact = pickRandom(ECO_FACTS);
  document.getElementById("ecoFact").textContent = fact.title;
  document.getElementById("ecoFactExtra").textContent = fact.extra;

  // history
  const hist = pickRandom(ECO_HISTORY);
  document.getElementById("ecoHistory").textContent = hist.title;
  document.getElementById("ecoHistoryExtra").textContent = hist.extra;

  // featured topic
  const feat = pickRandom(FEATURED_TOPICS);
  document.getElementById("featuredTopicTitle").textContent = feat.title;
  document.getElementById("featuredTopicText").textContent = feat.text;

  const featuredBtn = document.getElementById("featuredTopicBtn");
  featuredBtn.onclick = () => {
    showPage("chat");
    handleUserMessage(feat.ask);
  };
}

document.getElementById("refreshDailyBtn").addEventListener("click", renderDailyDashboard);

// home quick ask buttons
document.getElementById("quickAsk1").addEventListener("click", () => {
  showPage("chat");
  activeCategory = "Recycling";
  renderCategories();
  handleUserMessage("How do I recycle plastic bottles correctly?");
});
document.getElementById("quickAsk2").addEventListener("click", () => {
  showPage("chat");
  activeCategory = "Water";
  renderCategories();
  handleUserMessage("How can I save water daily?");
});
document.getElementById("quickAsk3").addEventListener("click", () => {
  showPage("chat");
  activeCategory = "Energy";
  renderCategories();
  handleUserMessage("How can I save electricity at home easily?");
});
document.getElementById("quickAsk4").addEventListener("click", () => {
  showPage("chat");
  activeCategory = "Climate";
  renderCategories();
  handleUserMessage("What causes global warming?");
});

// quick actions buttons
document.querySelectorAll(".actionBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const q = btn.getAttribute("data-q");
    showPage("chat");
    handleUserMessage(q);
  });
});

/* -------------------------
   CHATBOT ELEMENTS
-------------------------- */
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chipsWrap = document.getElementById("chipsWrap");

const categoryList = document.getElementById("categoryList");
const popularList = document.getElementById("popularList");

const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const searchResults = document.getElementById("searchResults");

const clearChatBtn = document.getElementById("clearChatBtn");
const demoBtn = document.getElementById("demoBtn");

const modeQuick = document.getElementById("modeQuick");
const modeDetailed = document.getElementById("modeDetailed");

const statusText = document.getElementById("statusText");

/* -------------------------
   FAQ DATASET
-------------------------- */
const FAQS = [
  {
    id: "recycle-1",
    category: "Recycling",
    question: "How do I recycle plastic bottles correctly?",
    short:
      "Rinse the bottle, remove the cap if required locally, and put it in the recycling bin clean and dry.",
    long:
      "Rinse the bottle to remove food/liquid residue. Many recycling plants prefer bottles to be clean and dry because contamination can ruin batches. Some areas recycle caps separately; others prefer caps on. If unsure, check your local municipal guidelines.",
    keywords: ["plastic", "bottle", "pet", "recycle", "recycling", "caps"],
    sources: [
      { name: "EPA - Recycling Basics", url: "https://www.epa.gov/recycle" }
    ]
  },
  {
    id: "recycle-2",
    category: "Recycling",
    question: "Which plastics are NOT recyclable?",
    short:
      "Black plastic, multi-layer packaging, and many thin plastics (like chip packets) are often not recyclable.",
    long:
      "Many recycling systems struggle with black plastic, mixed-material packaging (plastic + foil), and very thin plastics. These materials are difficult to sort and often have low resale value. If your city has special collection, follow that. Otherwise, reduce use and switch to reusable alternatives.",
    keywords: ["plastic", "not recyclable", "black plastic", "thin plastic", "foil"],
    sources: [
      { name: "UN Environment - Plastic Pollution", url: "https://www.unep.org/" }
    ]
  },
  {
    id: "recycle-3",
    category: "Recycling",
    question: "Can I recycle pizza boxes?",
    short:
      "Only if they’re clean. Greasy pizza boxes usually cannot be recycled.",
    long:
      "Cardboard with oil/food contamination often cannot be recycled because grease weakens the fibers. If the top is clean, you can tear it off and recycle that part. The greasy bottom can go into compost if you have one.",
    keywords: ["pizza", "box", "cardboard", "grease", "recycle"],
    sources: [{ name: "EPA - Composting", url: "https://www.epa.gov/recycle/composting-home" }]
  },

  {
    id: "waste-1",
    category: "Waste",
    question: "How do I start composting at home?",
    short:
      "Collect food scraps + dry leaves/paper, keep it moist, and turn it weekly.",
    long:
      "Start with a bin or pit. Add greens (vegetable peels, fruit scraps) and browns (dry leaves, cardboard). Keep it slightly moist like a wrung sponge. Turn it weekly for airflow. Avoid meat, dairy, and oily food to prevent smell and pests.",
    keywords: ["compost", "home compost", "food waste", "bin", "organic"],
    sources: [{ name: "EPA - Home Composting", url: "https://www.epa.gov/recycle/composting-home" }]
  },
  {
    id: "waste-2",
    category: "Waste",
    question: "What is the 3R rule?",
    short:
      "Reduce, Reuse, Recycle — in that priority order.",
    long:
      "Reduce means buying less and avoiding waste. Reuse means using items multiple times or repurposing them. Recycle is the last step because recycling still consumes energy and isn’t always successful due to contamination.",
    keywords: ["3r", "reduce reuse recycle", "waste", "rule"],
    sources: [{ name: "EPA - Reduce Reuse Recycle", url: "https://www.epa.gov/recycle" }]
  },

  {
    id: "energy-1",
    category: "Energy",
    question: "How can I save electricity at home easily?",
    short:
      "Use LED bulbs, unplug idle chargers, and use fans efficiently before AC.",
    long:
      "LEDs use much less power than traditional bulbs. Phantom power from idle chargers and devices adds up. Use natural light, switch off appliances, and set AC to moderate temperatures (like 24–26°C). Fans + ventilation reduce AC load.",
    keywords: ["electricity", "save", "home", "led", "ac", "power"],
    sources: [{ name: "IEA - Energy Saving", url: "https://www.iea.org/" }]
  },
  {
    id: "energy-2",
    category: "Energy",
    question: "Is solar energy worth it for a home?",
    short:
      "If your area has good sunlight and you stay long-term, solar can reduce bills a lot.",
    long:
      "Solar works best with consistent sunlight, enough roof space, and a long-term plan (5–10 years). Savings depend on your local electricity cost, subsidies, and how much power you use. Even a small solar setup can reduce grid dependence.",
    keywords: ["solar", "home solar", "worth it", "panel", "sunlight"],
    sources: [{ name: "IRENA - Solar", url: "https://www.irena.org/" }]
  },

  {
    id: "water-1",
    category: "Water",
    question: "How can I save water daily?",
    short:
      "Fix leaks, take shorter showers, and reuse water for plants when possible.",
    long:
      "Small leaks waste huge amounts over time. Use a bucket or shorter showers, turn off tap while brushing, and reuse RO wastewater (where safe) for cleaning. Water plants early morning to reduce evaporation.",
    keywords: ["save water", "leaks", "daily", "shower", "tap"],
    sources: [{ name: "WWF - Water Conservation", url: "https://www.worldwildlife.org/" }]
  },
  {
    id: "water-2",
    category: "Water",
    question: "Is rainwater harvesting useful?",
    short:
      "Yes. It reduces groundwater dependence and helps during dry seasons.",
    long:
      "Rainwater harvesting collects roof runoff and stores it for later use or recharges groundwater. It helps in water-stressed areas, reduces flooding risk, and lowers municipal water demand. Maintenance is important to avoid contamination.",
    keywords: ["rainwater", "harvesting", "groundwater", "storage"],
    sources: [{ name: "UN Water", url: "https://www.unwater.org/" }]
  },

  {
    id: "climate-1",
    category: "Climate",
    question: "What is a carbon footprint?",
    short:
      "It’s the total greenhouse gases produced by your activities, measured in CO₂ equivalent.",
    long:
      "A carbon footprint includes emissions from electricity, travel, food, shopping, and services. It’s measured in CO₂e (carbon dioxide equivalent) because different gases warm the planet differently. Lowering it involves reducing energy use, transport emissions, and waste.",
    keywords: ["carbon footprint", "co2", "emissions", "greenhouse"],
    sources: [{ name: "IPCC - Climate Reports", url: "https://www.ipcc.ch/" }]
  },
  {
    id: "climate-2",
    category: "Climate",
    question: "What causes global warming?",
    short:
      "Mainly greenhouse gases from burning fossil fuels, deforestation, and industry.",
    long:
      "Global warming is driven by greenhouse gases like CO₂ and methane trapping heat. Fossil fuel burning (coal, oil, gas) is the biggest contributor, followed by land-use changes like deforestation and agriculture emissions.",
    keywords: ["global warming", "causes", "greenhouse gases", "fossil fuels"],
    sources: [{ name: "NASA Climate", url: "https://climate.nasa.gov/" }]
  },

  {
    id: "life-1",
    category: "Lifestyle",
    question: "What are easy eco-friendly habits for students?",
    short:
      "Carry a bottle, reduce fast fashion, use public transport, and avoid single-use plastics.",
    long:
      "Student-friendly habits include carrying a reusable bottle, using cloth bags, buying fewer clothes (or thrift), using public transport/carpooling, printing less, and eating more plant-based meals when possible. Small habits scale over time.",
    keywords: ["student", "habits", "eco friendly", "college", "plastic"],
    sources: [{ name: "UN Sustainable Living", url: "https://www.un.org/" }]
  },
  {
    id: "life-2",
    category: "Lifestyle",
    question: "Is eating less meat good for the environment?",
    short:
      "Yes. It reduces emissions, land use, and water consumption.",
    long:
      "Livestock farming produces methane, requires large land areas, and consumes water. Even reducing meat a few days a week can reduce your environmental impact. You don’t need to go fully vegetarian for benefits.",
    keywords: ["meat", "vegetarian", "environment", "methane", "food"],
    sources: [{ name: "FAO - Food & Climate", url: "https://www.fao.org/" }]
  },

  {
    id: "transport-1",
    category: "Transport",
    question: "What is the most eco-friendly way to travel short distances?",
    short:
      "Walking, cycling, or public transport are best for short trips.",
    long:
      "Walking and cycling produce nearly zero emissions. For longer short trips, public transport reduces per-person emissions. If you must use a car, carpooling is better than driving alone.",
    keywords: ["travel", "transport", "walking", "cycling", "carpool"],
    sources: [{ name: "IEA - Transport", url: "https://www.iea.org/" }]
  }
];

// filler
const EXTRA_FAQS = [
  ["Recycling","Can glass be recycled?","Yes, glass is widely recyclable if clean.","Glass can be recycled many times without losing quality. Rinse bottles/jars and remove food residue. Some areas separate by color."],
  ["Recycling","Should I wash recyclables?","Yes, a quick rinse helps prevent contamination.","Recycling systems often reject contaminated items. A quick rinse and letting items dry improves recycling success."],
  ["Waste","What is e-waste and how to dispose it?","E-waste is old electronics; dispose via collection centers.","E-waste includes phones, chargers, batteries, laptops. Many cities have e-waste drives. Avoid dumping because heavy metals can pollute soil/water."],
  ["Energy","Do LEDs really save energy?","Yes, LEDs use much less power and last longer.","LED bulbs use less electricity and have longer lifespans, reducing both power use and replacement waste."],
  ["Water","Is RO water waste reusable?","Yes, for cleaning, mopping, and plants (if suitable).","RO systems produce wastewater. You can reuse it for cleaning or flushing. For plants, check if water is too salty depending on your area."],
  ["Climate","What is climate change?","Long-term change in temperature and weather patterns.","Climate change includes warming, sea level rise, extreme weather, and shifting rainfall patterns. Human emissions are the major driver today."],
  ["Lifestyle","What is fast fashion and why is it bad?","Cheap clothing produced quickly; it causes huge waste and pollution.","Fast fashion uses water, dyes, and cheap labor. Clothes are often discarded quickly. Reuse, thrift, and buy fewer better items."],
  ["Transport","Is EV always better than petrol?","Usually yes, especially over time, but depends on electricity source.","EVs reduce tailpipe emissions. If electricity comes from renewables, the benefit is larger. Manufacturing emissions exist but often offset over lifetime."]
];

EXTRA_FAQS.forEach((x, idx) => {
  FAQS.push({
    id: "extra-" + idx,
    category: x[0],
    question: x[1],
    short: x[2],
    long: x[3],
    keywords: x[1].toLowerCase().split(" "),
    sources: [{ name: "General Sustainability Knowledge", url: "https://www.un.org/" }]
  });
});

/* -------------------------
   CHATBOT STATE
-------------------------- */
let answerMode = "quick"; // quick | detailed
let activeCategory = "All";

/* -------------------------
   CHATBOT HELPERS
-------------------------- */
function escapeHtml(str){
  return str.replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

function setStatus(text){
  statusText.textContent = text;
}

function scrollToBottom(){
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addMessage(role, html){
  const msg = document.createElement("div");
  msg.className = `msg ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role === "bot" ? "🌿" : "🧑";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = html;

  if(role === "bot"){
    msg.appendChild(avatar);
    msg.appendChild(bubble);
  } else {
    msg.appendChild(bubble);
  }

  chatBody.appendChild(msg);
  scrollToBottom();
}

function showTyping(){
  const msg = document.createElement("div");
  msg.className = "msg bot";
  msg.id = "typingMsg";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = "🌿";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;

  msg.appendChild(avatar);
  msg.appendChild(bubble);
  chatBody.appendChild(msg);
  scrollToBottom();
}

function hideTyping(){
  const t = document.getElementById("typingMsg");
  if(t) t.remove();
}

function normalize(text){
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(text){
  const n = normalize(text);
  if(!n) return [];
  return n.split(" ").filter(Boolean);
}

function scoreFaq(faq, tokens){
  let score = 0;
  const q = normalize(faq.question);
  const kw = (faq.keywords || []).map(k => normalize(k));

  tokens.forEach(t => {
    if(kw.includes(t)) score += 3;
    if(q.includes(t)) score += 2;
  });

  if(activeCategory !== "All" && faq.category === activeCategory) score += 2;

  return score;
}

function findBestMatches(query, limit = 3){
  const tokens = tokenize(query);
  const scored = FAQS
    .map(f => ({ f, score: scoreFaq(f, tokens) }))
    .sort((a,b) => b.score - a.score);

  const best = scored.filter(x => x.score > 0).slice(0, limit);
  return { best, tokens };
}

function getAnswerText(faq){
  return answerMode === "quick" ? faq.short : faq.long;
}

function renderSources(faq){
  if(!faq.sources || faq.sources.length === 0) return "";
  const links = faq.sources
    .map(s => `<a href="${s.url}" target="_blank">${escapeHtml(s.name)}</a>`)
    .join(" • ");
  return `<div class="sources"><b>Sources:</b> ${links}</div>`;
}

function renderMeta(faq, confidence){
  return `
    <div class="metaLine">
      <span class="badge">Category: ${escapeHtml(faq.category)}</span>
      <span class="badge">Confidence: ${confidence}%</span>
      <span class="badge">Mode: ${answerMode === "quick" ? "Quick" : "Detailed"}</span>
    </div>
  `;
}

function setChips(chips){
  chipsWrap.innerHTML = "";
  chips.forEach(text => {
    const chip = document.createElement("button");
    chip.className = "chipBtn";
    chip.textContent = text;
    chip.onclick = () => handleUserMessage(text);
    chipsWrap.appendChild(chip);
  });
}

function relatedQuestions(faq, limit = 3){
  const same = FAQS.filter(x => x.category === faq.category && x.id !== faq.id);
  const picks = same.sort(() => Math.random() - 0.5).slice(0, limit);
  return picks.map(p => p.question);
}

/* -------------------------
   BOT RESPONSE
-------------------------- */
async function botRespond(userText){
  setStatus("Thinking...");
  showTyping();

  await new Promise(r => setTimeout(r, 650));

  const { best } = findBestMatches(userText, 3);

  hideTyping();

  if(best.length === 0){
    setStatus("Ready");
    addMessage("bot", `
      <b>Hmm… I’m not fully sure about that.</b><br/>
      Try asking with simpler keywords like: <i>plastic</i>, <i>compost</i>, <i>solar</i>, <i>carbon footprint</i>.<br/><br/>
      <div class="actions">
        <button class="smallBtn" onclick="handleUserMessage('What is a carbon footprint?')">Try: carbon footprint</button>
        <button class="smallBtn" onclick="handleUserMessage('How do I start composting at home?')">Try: composting</button>
        <button class="smallBtn" onclick="handleUserMessage('How can I save water daily?')">Try: save water</button>
      </div>
    `);
    setChips(["What is climate change?", "How to recycle plastic bottles?", "How to save electricity?"]);
    return;
  }

  const top = best[0].f;
  const topScore = best[0].score;

  let confidence = Math.min(95, 40 + topScore * 10);
  if(confidence < 55) confidence = 55;

  const answer = escapeHtml(getAnswerText(top));

  addMessage("bot", `
    <b>${escapeHtml(top.question)}</b><br/>
    ${answer}
    ${renderMeta(top, confidence)}
    ${renderSources(top)}
    <div class="actions">
      <button class="smallBtn" onclick="handleUserMessage('Give me more details about ${escapeHtml(top.question)}')">Ask for more</button>
      <button class="smallBtn" onclick="handleUserMessage('Give me tips related to ${escapeHtml(top.category)}')">More in ${escapeHtml(top.category)}</button>
      <button class="smallBtn" onclick="rateAnswer(true)">👍 Helpful</button>
      <button class="smallBtn" onclick="rateAnswer(false)">👎 Not helpful</button>
    </div>
  `);

  const rel = relatedQuestions(top, 3);
  setChips(rel);

  setStatus("Ready");
}

function rateAnswer(isGood){
  addMessage("bot", isGood
    ? "Love that 💚 Noted. Want another question?"
    : "Oof 😭 Okay. Try rephrasing it or pick a related question below."
  );
}

/* -------------------------
   USER MESSAGE HANDLER
-------------------------- */
function handleUserMessage(text){
  const clean = text.trim();
  if(!clean) return;

  // If not on chat page, jump there
  if(!chatPage.classList.contains("active")){
    showPage("chat");
  }

  addMessage("user", escapeHtml(clean));
  userInput.value = "";

  botRespond(clean);
}

/* -------------------------
   UI RENDER
-------------------------- */
function renderCategories(){
  const cats = ["All", ...new Set(FAQS.map(f => f.category))];

  categoryList.innerHTML = "";
  cats.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "pill" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat;
    btn.onclick = () => {
      activeCategory = cat;
      renderCategories();
      addMessage("bot", `Okay! Category set to <b>${escapeHtml(cat)}</b>. Ask your question 👇`);
      setChips(getPopularQuestions(cat));
    };
    categoryList.appendChild(btn);
  });
}

function getPopularQuestions(cat = "All"){
  const pool = cat === "All" ? FAQS : FAQS.filter(f => f.category === cat);
  const picks = pool.sort(() => Math.random() - 0.5).slice(0, 6);
  return picks.map(p => p.question);
}

function renderPopular(){
  popularList.innerHTML = "";
  const picks = getPopularQuestions("All").slice(0, 6);
  picks.forEach(q => {
    const btn = document.createElement("button");
    btn.className = "pill";
    btn.textContent = q.length > 26 ? q.slice(0, 26) + "..." : q;
    btn.onclick = () => handleUserMessage(q);
    popularList.appendChild(btn);
  });
}

/* -------------------------
   SEARCH
-------------------------- */
function renderSearchResults(query){
  const q = query.trim();
  searchResults.innerHTML = "";

  if(!q){
    return;
  }

  const { best } = findBestMatches(q, 6);

  if(best.length === 0){
    searchResults.innerHTML = `<div class="hint">No close matches. Try simpler keywords.</div>`;
    return;
  }

  best.forEach(x => {
    const faq = x.f;
    const item = document.createElement("div");
    item.className = "resultItem";
    item.innerHTML = `
      <div class="q"><b>${escapeHtml(faq.question)}</b></div>
      <div class="meta">
        <span>Category: ${escapeHtml(faq.category)}</span>
        <span>Score: ${x.score}</span>
      </div>
    `;
    item.onclick = () => handleUserMessage(faq.question);
    searchResults.appendChild(item);
  });
}

/* -------------------------
   INIT
-------------------------- */
function updateModeButtons(){
  if(answerMode === "quick"){
    modeQuick.classList.add("active");
    modeDetailed.classList.remove("active");
  } else {
    modeDetailed.classList.add("active");
    modeQuick.classList.remove("active");
  }
}

function bootChat(){
  // saved mode
  const savedMode = localStorage.getItem("ecoMode");
  if(savedMode) answerMode = savedMode;
  updateModeButtons();

  renderCategories();
  renderPopular();

  addMessage("bot", `
    <b>Hi! I’m EcoFAQ 🌿</b><br/>
    Ask me anything about recycling, water saving, energy, climate, and eco-friendly habits.<br/><br/>
    <span style="color:rgba(0,0,0,0.55)">
      Use the sidebar to search or choose a category.
    </span>
  `);

  setChips([
    "How do I start composting at home?",
    "What is a carbon footprint?",
    "How can I save electricity at home?"
  ]);
}

function bootHome(){
  renderTodayCard();
  renderDailyDashboard();
}

/* -------------------------
   EVENTS
-------------------------- */
sendBtn.addEventListener("click", () => handleUserMessage(userInput.value));
userInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter") handleUserMessage(userInput.value);
});

clearChatBtn.addEventListener("click", () => {
  chatBody.innerHTML = "";
  addMessage("bot", "Chat cleared 🧼 Ask a fresh question!");
  setChips(getPopularQuestions(activeCategory).slice(0,3));
});

demoBtn.addEventListener("click", async () => {
  const demoQs = [
    "How do I recycle plastic bottles correctly?",
    "Which plastics are NOT recyclable?",
    "How do I start composting at home?",
    "What is climate change?"
  ];

  for(const q of demoQs){
    handleUserMessage(q);
    await new Promise(r => setTimeout(r, 850));
  }
});

modeQuick.addEventListener("click", () => {
  answerMode = "quick";
  localStorage.setItem("ecoMode", answerMode);
  updateModeButtons();
  addMessage("bot", "Switched to <b>Quick</b> mode. I’ll keep answers compressed ⚡");
});

modeDetailed.addEventListener("click", () => {
  answerMode = "detailed";
  localStorage.setItem("ecoMode", answerMode);
  updateModeButtons();
  addMessage("bot", "Switched to <b>Detailed</b> mode. I’ll explain more 📚");
});

searchInput.addEventListener("input", (e) => {
  renderSearchResults(e.target.value);
});

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchResults.innerHTML = "";
  searchInput.focus();
});

// Expose for inline buttons
window.handleUserMessage = handleUserMessage;
window.rateAnswer = rateAnswer;

// Boot everything
bootHome();
bootChat();
