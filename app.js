// NxtWave // BUILD60 — Interactive State & Cyberpunk 2077 / Edgerunners Animations
let currentUser = {
  name: "Rahul",
  college: "AUCE",
  refCode: "NXT-RAHUL-88",
  referrals: 1,
  totalRegs: 418
};

// 1. Breach-Protocol / Cyberpunk Text Scramble Decoder Effect
const CYBER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//⚡[]<>#";

function scrambleText(element, finalString, speed = 18) {
  if (!element) return;
  let iteration = 0;
  clearInterval(element._scrambleTimer);
  element._scrambleTimer = setInterval(() => {
    element.textContent = finalString
      .split("")
      .map((ch, idx) => {
        if (ch === " " || ch === "\n") return ch;
        if (idx < iteration) return finalString[idx];
        return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
      })
      .join("");
    iteration += Math.max(1, finalString.length / 18);
    if (iteration >= finalString.length) {
      element.textContent = finalString;
      clearInterval(element._scrambleTimer);
    }
  }, speed);
}

// 2. Module Tab Switcher
function switchTab(tabId) {
  document.querySelectorAll(".tab-panel").forEach((el) => el.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));

  const targetPanel = document.getElementById(`tab-${tabId}`);
  if (targetPanel) targetPanel.classList.add("active");

  const buttons = document.querySelectorAll(".tab-btn");
  const map = { funnel: 0, referral: 1, whatsapp: 2, evaluator: 3, playbook: 4 };
  if (buttons[map[tabId]]) buttons[map[tabId]].classList.add("active");
}

// 3. Interactive Resume Bullet Previewer
const resumeBullets = {
  "cse-sde": "“Built & deployed an AI Code-Review & PR Bug Triage Agent using Gemini Flash API & Python; automated static edge-case detection across 50+ test snippets with structured JSON output and <1.2s latency.”",
  "cse-analyst": "“Engineered a Natural-Language-to-SQL Analytics Copilot in Python & Colab; enabled zero-SQL querying across 10,000+ e-commerce rows with automated schema validation and chart generation.”",
  "cse-genai": "“Architected a RAG-powered Placement Interview Simulator using Gemini Embeddings & Gradio; implemented anti-hallucination citation guardrails achieving 94% factual grounding on technical PDFs.”",
  "ece-sde": "“Developed an AI IoT Sensor Log Anomaly Triage Tool in Python; parsed noisy UART/CSV telemetry into structured JSON root-cause alerts with automated webhook notifications.”",
  "ece-analyst": "“Built an Automated Hardware Test-Log Summarizer using Python & LLM structured outputs; reduced manual QA defect categorization time by 70% across 500+ sensor logs.”",
  "ece-genai": "“Created a Voice-to-Action Datasheet Assistant for Embedded Engineers using Gemini Multimodal API; extracted pinout specs and register configs from 200-page PDF manuals in <2 seconds.”",
  "mech-sde": "“Transitioned core engineering workflows to software by shipping a Python + LLM Supply-Chain Delay Predictor; deployed a live Gradio web dashboard with automated JSON validation.”",
  "mech-analyst": "“Built an AI Operations & Inventory Insights Bot in Python; automated daily variance reporting from raw Excel/CSV plant logs into executive summary tables.”",
  "mech-genai": "“Designed a Multimodal CAD/Maintenance Ticket Triage Assistant using Python & Gemini Vision; classified equipment fault descriptions into structured priority queues.”"
};

function updateResumePreview() {
  const branch = document.getElementById("branchSelect").value;
  const role = document.getElementById("roleSelect").value;
  const key = `${branch}-${role}`;
  const span = document.getElementById("bulletTextSpan");
  const target = resumeBullets[key] || resumeBullets["cse-sde"];
  if (span) {
    scrambleText(span, target, 14);
  }
}

// 4. Registration Form Handler + Instant Squad Referral Code
function handleRegistration(e) {
  e.preventDefault();
  const nameInput = document.getElementById("regName").value.trim() || "Student";
  const collegeField = document.getElementById("regCollege");
  const collegeInput = normalizeCollegeName(collegeField.value) || "Engineering College";
  collegeField.value = collegeInput;
  const firstWord = nameInput.split(" ")[0].toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6) || "BUILDER";
  const randNum = Math.floor(10 + Math.random() * 89);

  currentUser.name = nameInput;
  currentUser.college = collegeInput;
  currentUser.refCode = `NXT-${firstWord}-${randNum}`;
  currentUser.totalRegs += 1;

  document.getElementById("liveRegCounter").textContent = `${currentUser.totalRegs} / 500`;
  const codeEl = document.getElementById("generatedRefCode");
  document.getElementById("postRegCard").style.display = "block";
  scrambleText(codeEl, currentUser.refCode, 25);

  setForwardTemplate("hostel");
}

function normalizeCollegeName(name) {
  const trimmedName = name.trim().replace(/\s+/g, " ");
  if (/^(?:auce\s*\(\s*w\s*\)|aucew|andhra university college of engineering(?:\s*\(women\)|\s+for women|\s+women))$/i.test(trimmedName)) {
    return "AUCE(w)";
  }
  if (/^(?:auce|andhra university college of engineering)$/i.test(trimmedName)) {
    return "AUCE";
  }
  return trimmedName;
}

function getReferralLink() {
  const params = new URLSearchParams({ ref: currentUser.refCode, college: currentUser.college });
  return `https://nxtwave.in/build60?${params}`;
}

// 5. Squad Referral Progress & WhatsApp Forward Templates
function simulateFriendJoin() {
  if (currentUser.referrals < 5) {
    currentUser.referrals += 1;
  } else {
    currentUser.referrals = 1;
  }
  const count = currentUser.referrals;
  document.getElementById("refCountDisplay").textContent = count;
  document.getElementById("refProgressBar").style.width = `${Math.min(100, count * 20)}%`;

  const t2 = document.getElementById("tier2Box");
  const t3 = document.getElementById("tier3Box");

  if (count >= 2) {
    t2.style.borderColor = "#00FF9D";
    t2.style.background = "rgba(0,255,157,0.1)";
    t2.innerHTML = "<strong style='color:#00FF9D;'>✅ 2 Joined (UNLOCKED)</strong><br/>ATS Resume + 30 AI Qs";
  } else {
    t2.style.borderColor = "rgba(0,240,255,0.3)";
    t2.style.background = "rgba(0,240,255,0.05)";
    t2.innerHTML = "<strong>🔒 2 Joined</strong><br/>ATS Resume + 30 AI Qs";
  }

  if (count >= 5) {
    t3.style.borderColor = "#FCEE0A";
    t3.style.background = "rgba(252,238,10,0.12)";
    t3.innerHTML = "<strong style='color:#FCEE0A;'>🏆 5 Joined (UNLOCKED)</strong><br/>Live Resume Audit";
  } else {
    t3.style.borderColor = "rgba(0,240,255,0.3)";
    t3.style.background = "rgba(0,240,255,0.05)";
    t3.innerHTML = "<strong>🔒 5 Joined</strong><br/>Live Resume Audit";
  }
}

function setForwardTemplate(type) {
  const box = document.getElementById("waCopyBox");
  if (!box) return;
  const code = currentUser.refCode;
  const referralLink = getReferralLink();
  const templates = {
    cr: `📢 *Final-Year Placement Update (${currentUser.college})*\n\nNxtWave is running a free 60-minute hands-on sprint this Sunday (7 PM): *"Build Your First AI Project in 60 Minutes"*.\n\nWe'll build & deploy a working AI project in Google Colab that goes straight onto our placement resume + GitHub.\n\n👉 *Register free (class code ${code} unlocks the ATS Resume Prompt Pack):*\n${referralLink}`,
    hostel: `Bro, ditch the generic Titanic CSV projects on your resume 😅\n\nI registered for NxtWave's free 60-min AI Build Sprint this Sunday at 7 PM. We build a real working Gemini API project in Colab + get an ATS resume bullet.\n\nJoin my squad from ${currentUser.college} with my link so we both unlock the Placement AI Interview Q&A PDF:\n${referralLink}`,
    club: `⚡ *Coding Club x NxtWave — 60-Min AI Buildathon*\n\nShip a live AI project to your GitHub before placement shortlists start. Zero local setup (runs in Google Colab).\n\n✅ Free API starter notebook\n✅ Automated code grader at Minute 55\n✅ Verified Proof-of-Build for LinkedIn\n\nRegister with club code *${code}* from ${currentUser.college}:\n${referralLink}`
  };
  box.value = templates[type] || templates.cr;
}

function copyWhatsAppMessage() {
  const box = document.getElementById("waCopyBox");
  box.select();
  navigator.clipboard.writeText(box.value);
  alert("Invite message copied to clipboard!");
}

function shareOnWhatsApp() {
  const text = encodeURIComponent(
    `I'm shipping a placement-ready AI project in 60 mins with NxtWave this Sunday from ${currentUser.college}. Join my squad so we unlock the ATS Resume Prompt Pack: ${getReferralLink()}`
  );
  window.open(`https://wa.me/?text=${text}`, "_blank");
}

// 6. WhatsApp Bot Flow
const waStages = {
  1: [
    { role: "bot", time: "19:01", text: "🎉 *Seat Locked, Rahul!* Welcome to *NxtWave // BUILD60* (Sunday, 7:00 PM IST)." },
    { role: "bot", time: "19:01", text: "🎟 *Squad Code:* `NXT-RAHUL-88`\n\nInvite *2 lab partners* with your link. As soon as 2 join, I'll unlock the *2026 ATS AI Resume & 30 Placement Prompts PDF* right here!" },
    { role: "user", time: "19:04", text: "Just shared in my hostel group—2 friends joined!" },
    { role: "bot", time: "19:04", text: "🔓 *Squad Milestone Unlocked (2/2)!*\nDownload your *ATS AI Resume Guide + 30 Interview Prompts*: 📄 `nxtwave.in/assets/ai-placement-pack.pdf`" }
  ],
  2: [
    { role: "bot", time: "SAT 19:00", text: "⚡ *T-24h Pre-Flight Check*\n\nNo Python or GPU setup needed tomorrow. Open this 1-click Google Colab starter notebook and reply *READY* (takes 10 seconds):\n🔗 `colab.research.google.com/nxtwave-starter`" },
    { role: "user", time: "SAT 19:02", text: "READY" },
    { role: "bot", time: "SAT 19:02", text: "✅ *Sandbox Verified!* Your free API token is reserved for tomorrow's 7 PM sprint." }
  ],
  3: [
    { role: "bot", time: "SUN 18:45", text: "🚨 *Live in 15 Minutes!*\n\n🔥 *19 students from AUCE* are already inside the build lobby.\n\nJoin on your laptop now:\n👉 `live.nxtwave.in/build60-room`" },
    { role: "user", time: "SUN 18:48", text: "In the lobby!" }
  ],
  4: [
    { role: "bot", time: "SUN 19:52", text: "⏱ *Minute 52: Submit Your Build*\n\nPaste your Google Colab or GitHub link below to run the *Automated Rubric Grader* and mint your Proof-of-Build." },
    { role: "user", time: "SUN 19:54", text: "https://colab.research.google.com/drive/1nxtwave-build60-rag-demo" },
    { role: "bot", time: "SUN 19:54", text: "🏆 *Audit Complete — Score: 92/100 (VERIFIED)*\n\n• Schema Safety: 24/25\n• Guardrails: 23/25\n• Placement Fit: 24/25\n\n🎓 *Proof-of-Build Card:* `nxtwave.in/cert/NXT-60-9482`" }
  ]
};

function triggerWaStage(stageNum) {
  const feed = document.getElementById("waChatFeed");
  if (!feed) return;
  feed.innerHTML = "";
  const msgs = waStages[stageNum] || waStages[1];
  msgs.forEach((m, idx) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = `wa-bubble ${m.role}`;
      div.innerHTML = `${m.text.replace(/\n/g, "<br/>").replace(/\*([^*]+)\*/g, "<strong>$1</strong>")}<span class="wa-time">${m.time}</span>`;
      feed.appendChild(div);
      feed.scrollTop = feed.scrollHeight;
    }, idx * 200);
  });
}

// 7. Automated AI Project Evaluator
function loadSampleProject(type) {
  if (type === "strong") {
    document.getElementById("evalTitle").value = "Smart Placement Resume-to-JD Gap Analyzer (Python + Gemini Flash)";
    document.getElementById("evalRepo").value = "https://colab.research.google.com/drive/1nxtwave-build60-rag-demo";
    document.getElementById("evalPrompt").value =
      'You are a strict technical recruiter evaluating a final-year CSE resume against a target SDE Job Description.\nInput: {{resume_text}} and {{jd_text}}.\nOutput strictly valid JSON with keys: "match_score" (0-100), "missing_keywords" (array), "rewritten_project_bullets" (array of 3 STAR-formatted bullets with quantified impact). Reject hallucinated skills not present in resume_text.';
  } else {
    document.getElementById("evalTitle").value = "General Chatbot Wrapper";
    document.getElementById("evalRepo").value = "https://colab.research.google.com/drive/sample-untested";
    document.getElementById("evalPrompt").value = "Help the user answer questions nicely about any topic.";
  }
  runProjectEvaluator();
}

function runProjectEvaluator() {
  const title = document.getElementById("evalTitle").value.trim() || "Untitled AI Project";
  const prompt = document.getElementById("evalPrompt").value.trim();
  const repo = document.getElementById("evalRepo").value.trim();

  const hasJson = /json|schema|keys|array|dict/i.test(prompt);
  const hasGuardrail = /reject|strictly|hallucinat|constraint|only|fallback|valid/i.test(prompt);
  const hasVariables = /\{\{.*?\}\}|input:|context:/i.test(prompt) || prompt.length > 140;
  const hasValidRepo = /colab\.research|github\.com/i.test(repo);

  const sSchema = hasJson ? 24 : 13;
  const sGuard = hasGuardrail ? 23 : 11;
  const sRel = hasVariables ? 24 : 15;
  const sDep = hasValidRepo ? 21 : 14;
  const total = sSchema + sGuard + sRel + sDep;

  document.getElementById("scoreSchema").textContent = `${sSchema} / 25`;
  document.getElementById("barSchema").style.width = `${(sSchema / 25) * 100}%`;

  document.getElementById("scoreGuard").textContent = `${sGuard} / 25`;
  document.getElementById("barGuard").style.width = `${(sGuard / 25) * 100}%`;

  document.getElementById("scoreRelevance").textContent = `${sRel} / 25`;
  document.getElementById("barRelevance").style.width = `${(sRel / 25) * 100}%`;

  document.getElementById("scoreDeploy").textContent = `${sDep} / 25`;
  document.getElementById("barDeploy").style.width = `${(sDep / 25) * 100}%`;

  const badge = document.getElementById("evalBadge");
  const feedback = document.getElementById("evalFeedbackBox");
  document.getElementById("certProjectTitle").textContent = title;

  if (total >= 80) {
    badge.style.color = "#00FF9D";
    scrambleText(badge, `SCORE: ${total} / 100 (VERIFIED)`, 18);
    feedback.innerHTML =
      "<strong style='color:#FCEE0A;'>💡 DIAGNOSTIC:</strong> Strong schema enforcement (`JSON` output keys) and explicit anti-hallucination constraints. Ready for GitHub push & placement resume inclusion.";
  } else {
    badge.style.color = "#FF0055";
    scrambleText(badge, `SCORE: ${total} / 100 (REVISION NEEDED)`, 18);
    feedback.innerHTML =
      "<strong style='color:#FF0055;'>⚠️ ACTIONABLE FIXES:</strong> Add (1) explicit input variables (`{{user_input}}`), (2) a strict JSON output schema, and (3) a guardrail instruction for out-of-scope inputs.";
  }
}

// 8. Cyberpunk 2077 / Edgerunners Animated Horizon Grid & Neon Particles Canvas
function initCyberCanvas() {
  const canvas = document.getElementById("cyberCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const nodes = Array.from({ length: 38 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.65,
    vy: (Math.random() - 0.5) * 0.65,
    r: Math.random() * 2 + 1,
    color: Math.random() > 0.3 ? "#00F0FF" : "#FCEE0A"
  }));

  let gridOffset = 0;

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Subtle perspective cyber-grid at the bottom 35% of screen
    const horizon = h * 0.68;
    ctx.strokeStyle = "rgba(0, 240, 255, 0.07)";
    ctx.lineWidth = 1;

    gridOffset = (gridOffset + 0.35) % 28;
    for (let y = horizon + gridOffset; y < h; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    for (let x = -w * 0.5; x < w * 1.5; x += 90) {
      ctx.beginPath();
      ctx.moveTo(w * 0.5 + (x - w * 0.5) * 0.2, horizon);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Floating data nodes & neural links
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      ctx.fillStyle = n.color;
      ctx.globalAlpha = 0.55;
      ctx.fillRect(n.x, n.y, n.r * 1.6, n.r * 1.6);

      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dx = n.x - m.x;
        const dy = n.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.strokeStyle = "#00F0FF";
          ctx.globalAlpha = (1 - dist / 130) * 0.14;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

window.addEventListener("DOMContentLoaded", () => {
  initCyberCanvas();
  setForwardTemplate("cr");
  triggerWaStage(1);
});
