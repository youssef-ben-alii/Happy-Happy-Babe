@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,400&family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;600&display=swap');

:root {
  --red: #c1121f;
  --deep-red: #8b0000;
  --pink: #ff8fab;
  --hot-pink: #ff4d6d;
  --soft-pink: #ffe5ec;
  --blush: #ffc2d4;
  --white: #ffffff;
  --cream: #fff9fb;
  --glass: rgba(255,255,255,0.15);
  --glass-border: rgba(255,255,255,0.25);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Montserrat', sans-serif;
  background: var(--cream);
  color: #3a0a0a;
  overflow-x: hidden;
}

h1, h2, h3 { font-family: 'Playfair Display', serif; }

/* ─── FLOATING HEARTS ─── */
#hearts-container {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.heart-particle {
  position: absolute;
  bottom: -50px;
  animation: floatUp linear infinite;
  opacity: 0;
  user-select: none;
}
@keyframes floatUp {
  0%   { transform: translateY(0) rotate(0deg) scale(0.8); opacity: 0; }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.3; }
  100% { transform: translateY(-110vh) rotate(25deg) scale(1.2); opacity: 0; }
}

/* ─── PAGES ─── */
.page { display: none; min-height: 100vh; position: relative; z-index: 1; }
.page.active { display: block; }

/* ─── HEADER ─── */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: linear-gradient(135deg, #8b0000, #c9184a);
  position: sticky; top: 0; z-index: 100;
  box-shadow: 0 4px 24px rgba(139,0,0,0.35);
  gap: 16px;
}
.header h1 { color: white; font-size: 1.2rem; white-space: nowrap; flex-shrink: 0; }
nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 4px;
}
nav a {
  text-decoration: none;
  color: rgba(255,255,255,0.85);
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: all .3s;
  white-space: nowrap;
}
nav a:hover { background: rgba(255,255,255,0.18); border-color: rgba(255,255,255,0.3); color: white; }
nav a.active { background: rgba(255,255,255,0.22); border-color: rgba(255,255,255,0.4); color: white; }

/* ─── WHEEL PAGE ─── */
.wheel-page {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(160deg, #1a0508 0%, #3d0d1a 40%, #1a0508 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px 80px;
  box-sizing: border-box;
}
.wheel-page-hero {
  text-align: center;
  padding: 70px 20px 40px;
  color: white;
}
.wheel-page-hero h2 {
  font-size: 3rem;
  color: #f5c6d0;
  margin-bottom: 12px;
  letter-spacing: 0.04em;
}
.wheel-page-hero .subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-style: italic;
  color: rgba(245,198,208,0.55);
}
.wheel-ideas-list {
  margin-top: 52px;
  text-align: center;
  color: rgba(245,198,208,0.6);
}
.ideas-label {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0.5;
}
#wheelIdeasList {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  max-width: 600px;
  padding: 0;
}
#wheelIdeasList li {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  padding: 8px 20px;
  font-size: 0.85rem;
  font-family: 'Montserrat', sans-serif;
  color: rgba(245,198,208,0.75);
  letter-spacing: 0.04em;
  transition: background .3s;
}
#wheelIdeasList li:hover { background: rgba(255,255,255,0.14); }

/* ─── QUIZ PAGE ─── */
#quizPage {
  min-height: 100vh;
  display: none;
  background: linear-gradient(160deg, #ff4d6d 0%, #c9184a 40%, #8b0000 100%);
  align-items: center;
  justify-content: center;
}
#quizPage.active { display: flex; }

.quiz-box {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.25);
  max-width: 460px;
  width: 90%;
  padding: 48px 40px;
  border-radius: 28px;
  text-align: center;
  box-shadow: 0 30px 80px rgba(0,0,0,0.25);
  animation: slideUp .6s cubic-bezier(.22,1,.36,1);
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
.quiz-box h1 { color: white; font-size: 2rem; margin-bottom: 16px; }

.quiz-progress {
  display: flex; justify-content: center; gap: 8px; margin-bottom: 28px;
}
.quiz-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: rgba(255,255,255,0.3); transition: background .4s, transform .3s;
}
.quiz-dot.done { background: white; transform: scale(1.2); }

#question {
  color: rgba(255,255,255,0.92);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 28px;
}

#options button {
  width: 100%; margin: 8px 0; padding: 14px 20px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 999px;
  color: white; font-weight: 600; font-size: 0.9rem;
  cursor: pointer; transition: all .25s;
  font-family: 'Montserrat', sans-serif;
}
#options button:hover {
  background: rgba(255,255,255,0.3);
  transform: translateX(6px);
  border-color: white;
}
.quiz-wrong { animation: shake .4s ease; }
@keyframes shake {
  0%,100% { transform: translateX(0); }
  25%      { transform: translateX(-12px); }
  75%      { transform: translateX(12px); }
}

/* ─── BANNER ─── */
.banner-image {
  width: 100%; height: 100vh;
  overflow: hidden; position: relative;
}
.banner-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 8s ease;
}
.banner-image:hover .banner-img { transform: scale(1.04); }
.banner-image::after {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.04), rgba(139,0,0,0.18));
}

/* ─── TIMER ─── */
.timer-section {
  padding: 100px 20px;
  background: linear-gradient(135deg, #ff4d6d, #c9184a, #8b0000);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.timer-section::before {
  content: "❤";
  position: absolute;
  font-size: 400px;
  opacity: 0.04;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
.timer-section h2 {
  font-size: 1.6rem;
  font-weight: 400;
  font-style: italic;
  margin-bottom: 48px;
  opacity: 0.9;
}
.timer {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.timer-unit {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 20px;
  padding: 24px 28px;
  min-width: 100px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  transition: transform .3s;
}
.timer-unit:hover { transform: translateY(-6px); }
.timer-number {
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  font-weight: 700;
  display: block;
  line-height: 1;
  margin-bottom: 6px;
}
.timer-label {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.75;
}

/* ─── LOVE LETTERS ─── */
.love-letter {
  padding: 120px 20px;
  text-align: center;
  background: linear-gradient(180deg, #8b0000, #c9184a, #ff758f);
  color: white;
  position: relative;
}
.love-letter h2 {
  font-size: 2.8rem;
  margin-bottom: 16px;
}
.love-letter .subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  opacity: 0.8;
  font-style: italic;
  margin-bottom: 60px;
}
.letter-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.letter-buttons button {
  padding: 20px 36px;
  font-size: 0.95rem;
  font-weight: 600;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 18px;
  cursor: pointer;
  color: white;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  transition: transform .3s, background .3s, box-shadow .3s;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.04em;
}
.letter-buttons button:hover {
  background: rgba(255,255,255,0.28);
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
}

/* ─── MODAL ─── */
.modal {
  position: fixed; inset: 0;
  display: none;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.8);
  z-index: 9999;
  backdrop-filter: blur(4px);
  animation: fadeIn .3s ease;
}
.modal.open { display: flex; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.modal-content {
  width: min(720px, 95vw);
  max-height: 90vh;
  background: linear-gradient(160deg, rgba(139,0,0,0.82), rgba(201,24,74,0.82), rgba(255,77,109,0.82));
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid rgba(255,255,255,0.18);
  color: white;
  padding: 60px 48px 48px;
  border-radius: 28px;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
  animation: modalIn .4s cubic-bezier(.22,1,.36,1);
}

/* Glassy scrollbar */
.modal-content::-webkit-scrollbar { width: 6px; }
.modal-content::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 999px; }
.modal-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.25); border-radius: 999px; }
.modal-content::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.modal-content h3 {
  font-size: 2.2rem;
  margin-bottom: 24px;
  font-style: italic;
}
.modal-content p {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  line-height: 1.9;
  opacity: 0.92;
}
.modal-content img {
  display: block;
  width: 100%;
  max-width: 460px;
  margin: 40px auto 0;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.modal-content img[src=""] { display: none; }
.close {
  position: absolute;
  top: 20px; right: 28px;
  font-size: 36px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity .2s, transform .2s;
  line-height: 1;
}
.close:hover { opacity: 1; transform: rotate(90deg); }

/* ─── MUSEUM GALLERY ─── */
.museum {
  background: #0a0305;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.museum-header {
  text-align: center;
  padding: 60px 20px 40px;
  background: linear-gradient(180deg, #1a0508, #0a0305);
}
.museum-header h2 {
  font-size: 3rem;
  color: #f5c6d0;
  letter-spacing: 0.06em;
  margin-bottom: 10px;
}
.museum-header .subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: rgba(245,198,208,0.55);
  font-style: italic;
}

/* Slideshow stage */
.museum-stage {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0 40px;
}

.museum-track {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 80px;
  position: relative;
}

.museum-slide {
  display: none;
  animation: museumFade .5s ease;
}
.museum-slide.active { display: block; }

@keyframes museumFade {
  from { opacity: 0; transform: scale(0.98); }
  to   { opacity: 1; transform: scale(1); }
}

.museum-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 4px;
  overflow: hidden;
  box-shadow:
    0 0 0 12px #1a0c0e,
    0 0 0 14px #3d1a20,
    0 0 0 16px #1a0c0e,
    0 40px 100px rgba(0,0,0,0.8);
}

.museum-frame img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}

/* Caption */
.museum-caption {
  text-align: center;
  margin-top: 36px;
  color: rgba(245,198,208,0.7);
}
.museum-caption .pic-number {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.8rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 6px;
}
.museum-caption .pic-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-style: italic;
  color: #f5c6d0;
}

/* Glassy arrow buttons */
.museum-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 54px; height: 54px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: rgba(255,255,255,0.85);
  font-size: 1.3rem;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .3s, transform .3s, border-color .3s;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}
.museum-arrow:hover {
  background: rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.4);
  transform: translateY(-50%) scale(1.1);
}
.museum-arrow.prev { left: 16px; }
.museum-arrow.next { right: 16px; }

/* Dot indicators */
.museum-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0 20px 50px;
  flex-wrap: wrap;
}
.museum-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: rgba(245,198,208,0.2);
  cursor: pointer;
  transition: background .3s, transform .3s;
  border: none;
}
.museum-dot.active {
  background: #f5c6d0;
  transform: scale(1.4);
}
.museum-dot:hover { background: rgba(245,198,208,0.6); }

/* Keyboard hint */
.museum-hint {
  text-align: center;
  padding-bottom: 30px;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: rgba(245,198,208,0.25);
  text-transform: uppercase;
}

/* ─── MEMORY JAR ─── */
.memory-jar-section {
  padding: 100px 20px;
  text-align: center;
  background: linear-gradient(180deg, #fff0f3, #ffe5ec);
  color: #3a0a0a;
}
.memory-jar-section h2 { font-size: 2.6rem; color: var(--deep-red); margin-bottom: 10px; }
.memory-jar-section .subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem; font-style: italic;
  color: #a0445a; margin-bottom: 48px;
}
.jar-wrapper { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.jar {
  position: relative;
  width: 140px; height: 180px;
  background: linear-gradient(160deg, rgba(255,200,210,0.9), rgba(255,140,160,0.7));
  border-radius: 20px 20px 30px 30px;
  border: 2px solid rgba(193,18,31,0.25);
  cursor: pointer;
  box-shadow: inset 0 10px 30px rgba(255,255,255,0.5), 0 20px 50px rgba(193,18,31,0.15);
  transition: transform .3s, box-shadow .3s;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  overflow: hidden;
  backdrop-filter: blur(4px);
}
.jar:hover { transform: scale(1.06) rotate(-2deg); box-shadow: 0 30px 60px rgba(193,18,31,0.25); }
.jar:active { transform: scale(0.96) rotate(2deg); }
.jar-shine {
  position: absolute; top: 10px; left: 18px;
  width: 28px; height: 70px;
  background: rgba(255,255,255,0.45);
  border-radius: 999px; transform: rotate(-15deg);
}
.jar-label {
  font-family: 'Playfair Display', serif;
  font-size: 1rem; font-style: italic;
  color: #8b0000; line-height: 1.3;
  position: relative; z-index: 1;
}
.jar-hearts {
  font-size: 0.75rem; letter-spacing: 2px;
  margin-top: 8px; opacity: 0.6;
  position: relative; z-index: 1;
}
.jar-hint { font-size: 0.75rem; color: #c0607a; letter-spacing: 0.1em; opacity: 0.7; }
.memory-card {
  display: none;
  max-width: 480px; margin: 32px auto 0;
  background: white;
  border-radius: 20px;
  padding: 32px 36px;
  box-shadow: 0 20px 60px rgba(193,18,31,0.12);
  border: 1px solid rgba(193,18,31,0.1);
  animation: popIn .4s cubic-bezier(.22,1,.36,1);
}
.memory-card.visible { display: block; }
@keyframes popIn {
  from { opacity: 0; transform: scale(0.85) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.memory-card p {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem; line-height: 1.8;
  color: #5a1a2a; font-style: italic;
}

/* ─── REASONS I LOVE YOU ─── */
.reasons-section {
  padding: 100px 20px;
  text-align: center;
  background: linear-gradient(180deg, #8b0000, #c9184a);
  color: white;
}
.reasons-section h2 { font-size: 2.6rem; margin-bottom: 10px; }
.reasons-section .subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem; font-style: italic;
  opacity: 0.75; margin-bottom: 52px;
}
.reasons-carousel {
  display: flex; align-items: center;
  justify-content: center; gap: 24px;
  max-width: 700px; margin: 0 auto;
}
.reason-card-wrapper { flex: 1; }
.reason-card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  min-height: 200px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 16px;
  transition: opacity .3s;
}
.reason-number {
  font-family: 'Playfair Display', serif;
  font-size: 1rem; opacity: 0.5;
  letter-spacing: 0.1em;
}
.reason-card p {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem; line-height: 1.7;
  font-style: italic;
}
.reason-arrow {
  width: 50px; height: 50px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(12px);
  color: white; font-size: 1.2rem;
  cursor: pointer; flex-shrink: 0;
  transition: background .3s, transform .3s;
  display: flex; align-items: center; justify-content: center;
}
.reason-arrow:hover { background: rgba(255,255,255,0.25); transform: scale(1.1); }
.reason-counter {
  font-size: 0.78rem; letter-spacing: 0.15em;
  opacity: 0.5; margin-top: 24px;
  text-transform: uppercase;
}

/* ─── TIMELINE ─── */
.timeline-section {
  padding: 100px 20px;
  text-align: center;
  background: linear-gradient(180deg, #fff0f3, #ffe5ec);
}
.timeline-section h2 { font-size: 2.6rem; color: var(--deep-red); margin-bottom: 10px; }
.timeline-section .subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem; font-style: italic;
  color: #a0445a; margin-bottom: 60px;
}
.timeline {
  max-width: 800px; margin: 0 auto;
  position: relative; padding: 20px 0;
}
.timeline::before {
  content: '';
  position: absolute; left: 50%; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, transparent, #ffb3c1, #c9184a, #ffb3c1, transparent);
  transform: translateX(-50%);
}
.tl-item {
  display: flex; margin-bottom: 48px;
  position: relative;
}
.tl-item.left  { justify-content: flex-end; padding-right: calc(50% + 40px); }
.tl-item.right { justify-content: flex-start; padding-left: calc(50% + 40px); }
.tl-dot {
  position: absolute; left: 50%; top: 24px;
  width: 16px; height: 16px; border-radius: 50%;
  background: linear-gradient(135deg, #ff4d6d, #c9184a);
  transform: translateX(-50%);
  box-shadow: 0 0 0 4px #ffe5ec, 0 0 0 6px #ffb3c1;
  z-index: 1;
}
.tl-content {
  background: white;
  border-radius: 18px; padding: 24px 28px;
  box-shadow: 0 10px 30px rgba(193,18,31,0.1);
  border: 1px solid rgba(193,18,31,0.08);
  text-align: left; max-width: 300px;
  transition: transform .3s, box-shadow .3s;
}
.tl-content:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(193,18,31,0.15); }
.tl-date {
  font-size: 0.72rem; letter-spacing: 0.12em;
  text-transform: uppercase; color: #c9184a;
  font-weight: 600; display: block; margin-bottom: 6px;
}
.tl-content h3 { font-size: 1.15rem; color: #3a0a0a; margin-bottom: 8px; }
.tl-content p  { font-size: 0.9rem; color: #7a3a4a; line-height: 1.6; }

@media (max-width: 640px) {
  .timeline::before { left: 20px; }
  .tl-item.left, .tl-item.right {
    justify-content: flex-start;
    padding-left: 52px; padding-right: 0;
  }
  .tl-dot { left: 20px; }
}

/* ─── SCRATCH CARD ─── */
.scratch-section {
  padding: 100px 20px;
  text-align: center;
  background: linear-gradient(180deg, #c9184a, #8b0000);
  color: white;
}
.scratch-section h2 { font-size: 2.6rem; margin-bottom: 10px; }
.scratch-section .subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem; font-style: italic;
  opacity: 0.75; margin-bottom: 48px;
}
.scratch-wrapper { display: flex; flex-direction: column; align-items: center; gap: 24px; }
.scratch-container {
  position: relative;
  width: 340px; height: 200px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);
  cursor: crosshair;
}
#scratchCanvas {
  position: absolute; inset: 0; z-index: 2;
  border-radius: 20px;
  touch-action: none;
}
.scratch-reveal {
  position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(135deg, #fff0f3, #ffc2d4);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}
.scratch-reveal p {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem; line-height: 1.7;
  color: #8b0000; font-style: italic;
  text-align: center;
}
.scratch-reset {
  padding: 12px 28px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 999px;
  color: white; font-size: 0.88rem;
  font-weight: 600; cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  transition: background .3s, transform .3s;
  letter-spacing: 0.05em;
}
.scratch-reset:hover { background: rgba(255,255,255,0.28); transform: scale(1.05); }

/* ─── DATE NIGHT WHEEL ─── */
.wheel-section {
  padding: 100px 20px;
  text-align: center;
  background: linear-gradient(180deg, #1a0508, #3d0d1a, #1a0508);
  color: white;
}
.wheel-section h2 {
  font-size: 2.6rem;
  color: #f5c6d0;
  margin-bottom: 10px;
}
.wheel-section .subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(245,198,208,0.6);
  margin-bottom: 52px;
}
.wheel-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 32px;
}
.wheel-container {
  position: relative;
  width: 440px; height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 20px 60px rgba(201,24,74,0.4));
}
#wheelCanvas {
  border-radius: 50%;
  display: block;
  width: 440px;
  height: 440px;
}
.wheel-center-pin {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 22px; height: 22px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 0 4px rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.4);
  z-index: 3;
  pointer-events: none;
}
.wheel-pointer {
  position: absolute;
  top: -22px; left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  color: white;
  z-index: 4;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
  pointer-events: none;
  line-height: 1;
}
.spin-btn {
  padding: 18px 52px;
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff4d6d, #c9184a);
  color: white;
  cursor: pointer;
  box-shadow: 0 10px 40px rgba(201,24,74,0.5);
  transition: transform .3s, box-shadow .3s;
}
.spin-btn:hover {
  transform: scale(1.06);
  box-shadow: 0 16px 50px rgba(201,24,74,0.65);
}
.spin-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.wheel-result {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#wheelResultText {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-style: italic;
  color: #f5c6d0;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity .5s ease, transform .5s ease;
}
#wheelResultText.show {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 480px) {
  .wheel-container { width: 300px; height: 300px; }
  #wheelCanvas { width: 300px !important; height: 300px !important; }
}

/* ─── FADE IN ON SCROLL ─── */
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity .7s ease, transform .7s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─── FOOTER ─── */
footer {
  text-align: center;
  padding: 40px;
  color: rgba(100,20,30,0.5);
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}

/* ─── RESPONSIVE ─── */
@media (max-width: 600px) {
  /* ── Header ── */
  .header {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 16px;
    gap: 8px;
  }
  .header h1 { font-size: 1rem; }

  /* Nav: scrollable single row on mobile */
  nav {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    gap: 6px;
    width: 100%;
    padding-bottom: 4px;
    justify-content: flex-start;
  }
  nav::-webkit-scrollbar { display: none; }
  nav a {
    font-size: 0.65rem;
    padding: 5px 10px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* ── Timer ── */
  .timer { gap: 8px; }
  .timer-unit { padding: 12px 14px; min-width: 64px; }
  .timer-number { font-size: 1.6rem; }
  .timer-label { font-size: 0.6rem; }

  /* ── Letters ── */
  .love-letter { padding: 60px 16px; }
  .love-letter h2 { font-size: 2rem; }
  .letter-buttons { gap: 12px; }
  .letter-buttons button { padding: 14px 20px; font-size: 0.82rem; }
  .modal-content { padding: 48px 20px 32px; border-radius: 16px; }
  .modal-content h3 { font-size: 1.6rem; }
  .modal-content p { font-size: 1.05rem; }

  /* ── Memory jar ── */
  .memory-jar-section { padding: 60px 16px; }

  /* ── Reasons ── */
  .reasons-section { padding: 60px 16px; }
  .reasons-carousel { gap: 12px; }
  .reason-card { padding: 32px 24px; }
  .reason-card p { font-size: 1.2rem; }

  /* ── Scratch ── */
  .scratch-section { padding: 60px 16px; }
  .scratch-container { width: 290px; height: 170px; }

  /* ── Wheel ── */
  .wheel-container { width: 300px; height: 300px; }
  #wheelCanvas { width: 300px !important; height: 300px !important; }
  .wheel-page-hero h2 { font-size: 2rem; }

  /* ── Gallery museum ── */
  .museum-arrow { width: 40px; height: 40px; font-size: 1rem; }
  .museum-arrow.prev { left: 4px; }
  .museum-arrow.next { right: 4px; }
  .museum-track { padding: 0 50px; }
  .museum-header h2 { font-size: 2rem; }

  /* ── Quiz ── */
  .quiz-box { padding: 32px 20px; width: 92%; }
  .quiz-box h1 { font-size: 1.6rem; }

  /* ── General ── */
  .timer-section { padding: 60px 16px; }
  .banner-image { height: 60vh; }
}
