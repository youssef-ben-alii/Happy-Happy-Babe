/* ═══════════════════════════════════════════
   QUIZ GATE
═══════════════════════════════════════════ */
const quizPage = document.getElementById("quizPage");
const sitePage = document.getElementById("sitePage");

if (localStorage.getItem("quizPassed") === "true" && quizPage) {
  quizPage.classList.remove("active");
  if (sitePage) sitePage.classList.add("active");
}

const quiz = [
  { q: "What is my favorite dessert?",      a: ["Cookie Annou", "Tiramisu", "YOU"],                                     correct: 2 },
  { q: "Our favorite thing together?",       a: ["Movies", "Walking", "Eating"],                                         correct: 2 },
  { q: "For how long will we be together?", a: ["80 years", "81 years (still in negotiations for 82)", "Forever"],       correct: 1 }
];

let quizIndex = 0;
const questionEl = document.getElementById("question");
const optionsEl  = document.getElementById("options");
const progressEl = document.getElementById("quizProgress");

function buildProgressDots() {
  if (!progressEl) return;
  progressEl.innerHTML = "";
  quiz.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "quiz-dot" + (i < quizIndex ? " done" : "");
    progressEl.appendChild(dot);
  });
}

function loadQuiz() {
  if (!questionEl) return;
  buildProgressDots();
  questionEl.textContent = quiz[quizIndex].q;
  optionsEl.innerHTML = "";
  quiz[quizIndex].a.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => checkAnswer(i);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(i) {
  if (i === quiz[quizIndex].correct) {
    quizIndex++;
    quizIndex < quiz.length ? loadQuiz() : enterSite();
  } else {
    const box = document.querySelector(".quiz-box");
    box.classList.add("quiz-wrong");
    box.addEventListener("animationend", () => box.classList.remove("quiz-wrong"), { once: true });
    const btns = optionsEl.querySelectorAll("button");
    btns[i].style.background  = "rgba(255,80,80,0.5)";
    btns[i].style.borderColor = "rgba(255,80,80,0.8)";
    setTimeout(() => { btns[i].style.background = ""; btns[i].style.borderColor = ""; }, 600);
  }
}

function enterSite() {
  localStorage.setItem("quizPassed", "true");
  if (quizPage) quizPage.classList.remove("active");
  if (sitePage) sitePage.classList.add("active");
}

if (questionEl) loadQuiz();


/* ═══════════════════════════════════════════
   TIMER
═══════════════════════════════════════════ */
const startDate = new Date("2024-05-25T00:00:00");
const timerEl   = document.getElementById("timer");

function updateTimer() {
  if (!timerEl) return;
  const now  = new Date();
  let diff   = Math.floor((now - startDate) / 1000);

  const days    = Math.floor(diff / 86400); diff %= 86400;
  const hours   = Math.floor(diff / 3600);  diff %= 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;

  timerEl.innerHTML = `
    <div class="timer-unit"><span class="timer-number">${days}</span><span class="timer-label">Days</span></div>
    <div class="timer-unit"><span class="timer-number">${String(hours).padStart(2,"0")}</span><span class="timer-label">Hours</span></div>
    <div class="timer-unit"><span class="timer-number">${String(minutes).padStart(2,"0")}</span><span class="timer-label">Minutes</span></div>
    <div class="timer-unit"><span class="timer-number">${String(seconds).padStart(2,"0")}</span><span class="timer-label">Seconds</span></div>
  `;
}

setInterval(updateTimer, 1000);
updateTimer();


/* ═══════════════════════════════════════════
   LOVE LETTERS
═══════════════════════════════════════════ */
const letters = [
  { title: "When you are sad",      text: "Dear BabyLove,<br><br> I am so sorry to hear that you are feeling sad. I wish i can give you a lot of kisses, hold you in my arms , baby you , feed you , put something to watch together while you are laying on my chest. Honestly I don’t know what is making you sad right now but, no matter what, i’m sure that you can count on me. I will always be there for you no matter what. ALWAYS.  I know it’s painful, you maybe don’t know what to do but in the end, trust me , it’s going to be okay (it’s okay i’m okay like we always say). Try thinking about something positive , like all the times we ate sushi together , or when you pooped yourself in front of me,... Most importantly, don’t stay alone. I will be there for  you waiting for your call, lebnet zeda kifkif, we will answer you , I will drop everything and run to see you, we will listen to you , confort you, and stay with you until you smile again and no longer think about what happened. I wish you never read this because I don’t want you to be sad , but if you do, call me, don’t think about it twice. <br><br>I love you ",                                                                                                                                                                                   },
  { title: "When you are happy",    text: "Dear BabyToutou, <br><br>I AM SO HAPPY THAT YOU ARE HAPPY!!!! I pray that you always feel this way , always brightening peoples life with that pretty smile, those pretty glowing eyes when you are excited , those freaky giggles and laugh, yes freaky is the word It’s the first thing that came into my mind , cause it’s not a weird smile , Definitely not and I will be so mad if you’re insecure about it belaaks I LOVE IT I’M OBSESSED WITH IT ti belaaks I’m doing werid ass shit that is out of my comfort zone just to hear it so BE CONFIDENT ABOUT IT.I hope you make more happy memories like this, with the people that you love the most , and that care about you <br><br>I love you ",                                                                                                                                                                  },
  { title: "When you are stressed", text: "Dear BabyMahbol, <br><br>We only live once, what you are stressing about will be one day such a minor thing , you won’t even remember it I’m sure, and even knowing that I know you will do your best. Also don’t suffocate yourself with that subject, try to manage your time between resting, thriving and doing what you need to do. You will also find me next to you helping you , supporting you , motivating you. YOU WILL SUCEED, I JUST KNOW IT AND I WILL NEVER DOUBT YOU. And no matter what I will be behind you pushing you forward<br><br> I love you ",                                                                       },
  { title: "When you are hungry",  text:"sorry not sorry", image: "images/hungry.png" },
  { title: "When you are angry",    text: "Dear BabyFartingPrincess, <br><br>Ya rouhi why my baby is angry? Lotf aalik  mon bebe cadum I see you like this right now.Ya rouhi call me don’t stay like this I can’t support seeing you like this. Just tell me and I will bring you chocolate to make you feel better.<br><br> I love you ",                                                                                                                                                                                                          image: "images/angry.jpeg" },
  { title: "When you miss me",      text: "Dear BabyBouBou,<br><br> I miss you too baby, more than anything. You mean the world to me, and I will always be with you , next to you , looking out for you. You are my way of life , my motivation, my happiness , my pretty little baby. I know it’s hard rouhi, and that’s okay because sometimes we are lucky to have someone that we love so much that we are not okay when he is not next to us , and that’s love baby. I love you so much. A part of me wanted to do this website when you need comfort , a “gallery” to look at when you miss us or me. I hope you liked this little gift , you deserve the world<br><br> I love you " },
  { title: "When you want me",      text: "CALL ME 98137090!!!!!",                                                                                                                                                                                                                                                                              image: "images/want.jpg" },
  { title: "My promise to you",     text: "Dear BabyRouhi,<br><br> No matter what happens, I choose you. Always. I promise to be your safe place, your biggest fan, and the person who never stops choosing you. I promise to be by your side in the easiest days, the hardest , the saddest , the happiest . I promise to never give up on us, always try my best to preserve us , and take you in a lot of sushi dates <br><br> I Love you",                                                                                                                             }
];

function openLetter(i) {
  const modal = document.getElementById("letterModal");
  if (!modal) return;
  document.getElementById("letterTitle").textContent = letters[i].title;
  document.getElementById("letterText").innerHTML = letters[i].text;
  const img = document.getElementById("letterImage");
  img.src = letters[i].image || "";
  img.style.display = letters[i].image ? "block" : "none";
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeLetter() {
  const modal = document.getElementById("letterModal");
  if (modal) modal.style.display = "none";
  document.body.style.overflow = "";
}

const modal = document.getElementById("letterModal");
if (modal) modal.addEventListener("click", e => { if (e.target === modal) closeLetter(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLetter(); });


/* ═══════════════════════════════════════════
   FLOATING HEARTS
═══════════════════════════════════════════ */
const heartsContainer = document.getElementById("hearts-container");
const heartEmojis = ["❤", "🩷", "💕", "💗", "💓", "💖", "🌹"];

function spawnHeart() {
  if (!heartsContainer) return;
  const heart = document.createElement("span");
  heart.className = "heart-particle";
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  const size = 0.8 + Math.random() * 1.4;
  const left = Math.random() * 100;
  const dur  = 6 + Math.random() * 8;
  const del  = Math.random() * 3;
  heart.style.cssText = `left:${left}%;font-size:${size}rem;animation-duration:${dur}s;animation-delay:${del}s;`;
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), (dur + del) * 1000);
}

setInterval(spawnHeart, 800);
for (let i = 0; i < 6; i++) spawnHeart();


/* ═══════════════════════════════════════════
   FADE IN ON SCROLL
═══════════════════════════════════════════ */
const fadeEls = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => observer.observe(el));


/* ═══════════════════════════════════════════
   MEMORY JAR
═══════════════════════════════════════════ */
const memories = [
  "That time you laughed so hard you started farting non stop",
  "La Maison",
  "Youtube nights with chicken light",
  "When you gave me head scratches fel salla",
  "First time we played dress to impress / 99 nights together",
  "First car ride with suzie ki dorna aala tounes kemla",
  "The first time I told you that the moon is beautiful tonight",
  "Makrouna elli aamletha bazza awel mara jit",
  "Arirbnb ",
  "When we went to the beach together for the first time",
  "First time we played call of duty together",
  "first car ride together with the old mimi",
  "All the sushi dates together",
  "First shower together",
  "Every moment with you is a good memory that I will sherich",
];

let lastMemoryIndex = -1;

function drawMemory() {
  const jar  = document.getElementById("memoryJar");
  const card = document.getElementById("memoryCard");
  const text = document.getElementById("memoryText");
  if (!jar || !card || !text) return;

  jar.style.transform = "rotate(-8deg) scale(0.95)";
  setTimeout(() => { jar.style.transform = ""; }, 300);

  let idx;
  do { idx = Math.floor(Math.random() * memories.length); }
  while (idx === lastMemoryIndex && memories.length > 1);
  lastMemoryIndex = idx;

  card.classList.remove("visible");
  void card.offsetWidth;
  text.textContent = memories[idx];
  card.classList.add("visible");
}


/* ═══════════════════════════════════════════
   REASONS I LOVE YOU
═══════════════════════════════════════════ */
const reasons = [
  "The way your eyes light up when you talk about something you love",
  "How funny you are",
  "Your laugh (i love it)",
  "How kind you are",
  "How comfortable I am talking and being me in front of you",
  "How we can always have fun",
  "You are so gorgeous, in the morning, after a nap,without makeup, always",
  "The way you dress",
  "You motivate me to be a better person",
  "Every small act of love you do without even noticing",
  "How you make the whole room feel different when you walk in",
  "How smart you are (not in maths)",
  "How you care about the people that you love",
  "How you take care of yourself",
  "THAT SMILE",
  "The way you smell i'm obsessed with it",
  "How we share the same values",
  "How you try to participate in my hobbies",
  "The quiet moments with you are not awkward (hamdoullah)",
  "Simply because you are you",
];

let reasonIndex = 0;

function updateReasonCard(animate) {
  const card    = document.getElementById("reasonCard");
  const text    = document.getElementById("reasonText");
  const num     = document.getElementById("reasonNum");
  const counter = document.getElementById("reasonCounter");
  if (!card) return;

  if (animate) {
    card.style.opacity   = "0";
    card.style.transform = "scale(0.95)";
    setTimeout(() => {
      text.textContent    = reasons[reasonIndex];
      num.textContent     = "#" + (reasonIndex + 1);
      counter.textContent = (reasonIndex + 1) + " / " + reasons.length;
      card.style.opacity   = "1";
      card.style.transform = "scale(1)";
    }, 200);
  } else {
    if (text)    text.textContent    = reasons[reasonIndex];
    if (num)     num.textContent     = "#" + (reasonIndex + 1);
    if (counter) counter.textContent = (reasonIndex + 1) + " / " + reasons.length;
  }
}

const reasonPrev = document.getElementById("reasonPrev");
const reasonNext = document.getElementById("reasonNext");
if (reasonPrev) reasonPrev.onclick = () => { reasonIndex = (reasonIndex - 1 + reasons.length) % reasons.length; updateReasonCard(true); };
if (reasonNext) reasonNext.onclick = () => { reasonIndex = (reasonIndex + 1) % reasons.length; updateReasonCard(true); };
updateReasonCard(false);


/* ═══════════════════════════════════════════
   SCRATCH CARD
═══════════════════════════════════════════ */
function initScratch() {
  const canvas = document.getElementById("scratchCanvas");
  if (!canvas) return;
  const ctx       = canvas.getContext("2d");
  const container = canvas.parentElement;
  canvas.width    = container.offsetWidth  || 340;
  canvas.height   = container.offsetHeight || 200;

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#c9184a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.font      = "bold 14px Montserrat, sans-serif";
  ctx.textAlign = "center";
  for (let y = 28; y < canvas.height; y += 36) {
    for (let x = 0; x < canvas.width; x += 120) {
      ctx.fillText("✦ scratch me ✦", x + 60, y);
    }
  }

  let isDrawing = false;
  function getPos(e, c) {
    const rect = c.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return [src.clientX - rect.left, src.clientY - rect.top];
  }
  function scratch(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
  }

  canvas.addEventListener("mousedown",  e => { isDrawing = true;  scratch(...getPos(e, canvas)); });
  canvas.addEventListener("mousemove",  e => { if (isDrawing) scratch(...getPos(e, canvas)); });
  canvas.addEventListener("mouseup",    () => { isDrawing = false; });
  canvas.addEventListener("touchstart", e => { e.preventDefault(); isDrawing = true;  scratch(...getPos(e, canvas)); }, { passive: false });
  canvas.addEventListener("touchmove",  e => { e.preventDefault(); if (isDrawing) scratch(...getPos(e, canvas)); },   { passive: false });
  canvas.addEventListener("touchend",   () => { isDrawing = false; });
}

function resetScratch() { initScratch(); }
if (document.getElementById("scratchCanvas")) initScratch();


/* ═══════════════════════════════════════════
   DATE NIGHT SPINNING WHEEL
═══════════════════════════════════════════ */
const dateIdeas = [
  "Movie marathon at home",
  "Cook together",
  "Midnight walk",
  "Spa night",
  "Board games",
  "Dance in the kitchen",
  "Picnic under the stars",
  "Binge a new series",
  "Make a scrapbook",
  "Drive with no plan",
];

const wheelColors = [
  "#8b0000","#c9184a","#6b0010","#ff4d6d",
  "#a01030","#e8305a","#5a000e","#d4204a",
  "#b01840","#ff6b82"
];

let wheelAngle = 0;
let isSpinning = false;

function drawWheel(angle) {
  // Always look up the element fresh — works correctly on wheel.html
  const canvas = document.getElementById("wheelCanvas");
  if (!canvas) return;

  const ctx    = canvas.getContext("2d");
  const cx     = canvas.width  / 2;
  const cy     = canvas.height / 2;
  const radius = cx - 4;
  const slices = dateIdeas.length;
  const arc    = (2 * Math.PI) / slices;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dateIdeas.forEach((label, i) => {
    const start = angle + i * arc;
    const end   = start + arc;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end);
    ctx.closePath();
    ctx.fillStyle   = wheelColors[i % wheelColors.length];
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    // Draw text along the slice at a fixed readable angle
    const midAngle = start + arc / 2;
    const textR    = radius * 0.65;
    const tx       = cx + Math.cos(midAngle) * textR;
    const ty       = cy + Math.sin(midAngle) * textR;
    const fontSize = canvas.width < 350 ? 11 : 12;

    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(midAngle + Math.PI / 2);
    ctx.textAlign   = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle   = "rgba(255,255,255,0.95)";
    ctx.font        = `600 ${fontSize}px Montserrat, sans-serif`;
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur  = 3;

    const words = label.split(" ");
    const lineH = fontSize + 3;
    if (words.length <= 2) {
      const lines = words.length === 1 ? [label] : [words[0], words[1]];
      const offset = (lines.length - 1) * lineH / 2;
      lines.forEach((line, li) => ctx.fillText(line, 0, li * lineH - offset));
    } else {
      const mid = Math.ceil(words.length / 2);
      const lines = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
      ctx.fillText(lines[0], 0, -lineH / 2);
      ctx.fillText(lines[1], 0,  lineH / 2);
    }

    ctx.restore();
  });

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth   = 3;
  ctx.stroke();
}

function spinWheel() {
  const canvas = document.getElementById("wheelCanvas");
  if (isSpinning || !canvas) return;
  isSpinning = true;

  const btn        = document.getElementById("spinBtn");
  const resultText = document.getElementById("wheelResultText");
  if (btn) btn.disabled = true;
  if (resultText) { resultText.classList.remove("show"); resultText.textContent = ""; }

  const extraSpins  = 5 + Math.floor(Math.random() * 5);
  const targetAngle = wheelAngle + extraSpins * 2 * Math.PI + Math.random() * 2 * Math.PI;
  const duration    = 4000 + Math.random() * 1500;
  const startAngle  = wheelAngle;
  const startTime   = performance.now();

  function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

  function animate(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    wheelAngle     = startAngle + (targetAngle - startAngle) * easeOut(progress);
    drawWheel(wheelAngle);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      wheelAngle = targetAngle;
      isSpinning = false;
      if (btn) btn.disabled = false;

      const arc    = (2 * Math.PI) / dateIdeas.length;
      const norm   = ((-Math.PI / 2 - wheelAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const idx    = Math.floor(norm / arc) % dateIdeas.length;

      if (resultText) {
        resultText.textContent = "✦ " + dateIdeas[idx] + " ✦";
        setTimeout(() => resultText.classList.add("show"), 50);
      }
    }
  }

  requestAnimationFrame(animate);
}

// Draw wheel on DOM ready (list is built by wheel.html inline script)
window.addEventListener("DOMContentLoaded", () => {
  drawWheel(wheelAngle);
});
