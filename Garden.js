/* ═══════════════════════════════════════════
   GARDEN WALLPAPER
   Fills the page with hand-drawn SVG roses,
   lilies and blossoms. Each one lifts on hover
   (or tap) and reveals its own message on click.

   Optimised for mobile / GitHub Pages:
   - single event-delegated click/touch listener
     (not one listener per flower)
   - content-visibility:auto so off-screen flowers
     aren't painted until scrolled into view
   - no default drop-shadow / will-change on idle
     flowers — only the one being touched gets it
═══════════════════════════════════════════ */
(function () {

  /* ── colour pairs: pink / white / red / burgundy ── */
  var PALETTE = [
    { fill: "#ffb3c1", dark: "#c9184a" },
    { fill: "#ffe5ec", dark: "#ff8fab" },
    { fill: "#ffffff", dark: "#ffb3c1" },
    { fill: "#ff8fab", dark: "#8b0000" },
    { fill: "#ff4d6d", dark: "#8b0000" },
    { fill: "#c1121f", dark: "#6b0010" },
    { fill: "#8b0000", dark: "#3d0d1a" },
    { fill: "#fff0f3", dark: "#e8305a" }
  ];

  /* ── one of these gets attached to every flower ──
     add as many as you like, they'll cycle through
     in a shuffled order so repeats aren't next to
     each other */
  var MESSAGES = ["I can relate every love song to you",
  "honestly just how at ease I feel when i'm with you , how I can relax , be myself , joke with you , feel like i'm blessed , lucky like I just won a jackpot (I did)",
  "I am lucky to be able to miss",
  "just knowing that I can trust you",
  "your smile is so precious to me",
  "your laugh is a sound from heaven",
  "your eyes are the only gold i'm keeping to myself (keep the rest)",
  "your hair smells so good",
  "your funny",
  "your funny asf",
  "you have good hygiene i like it",
  "you skin is sometimes salty , tastes good",
  "I get excited when I see you",
  "I enjoy going out with you",
  "love our night car rides",
  "love eating with you",
  "every date is so special with you",
  "The 25th is now a sacred date",
  "you suck at roblox",
  "our game nights",
  "our movie nights",
  "obsessing over series together",
  "just being always in a call with you",
  "being able to tell you good morning my bbay and goodnight my pretty princess every day",
  "every time i check my phone i get excited by the idea that it's you",
  "our mutual respect",
  "how you are so good with my family",
  "how you asked my dad if he needed something bech thezhelou li torkia",
  "how you understand me",
  "how autistic you are",
  "how obsessed you make me",
  "you make me work harder",
  "you motivate me",
  "you always push me to be better",
  "however far away , I will always love and miss you",
  "you are my moon , my lampadair",
  "how I can see you everywhere through places , habits , musics",
  "time flies with you",
  "our wash and go dates",
  "our walks with chicos",
  "how i discover new musics with you",
  "I can never be disgusted by anything from you (peepee poopoo)",
  "how you help me when i need you",
  "our study dates",
  "when you go to baristas lac 1 cause its your comfort place",
  "how you help me process my feelings",
  "I can grow with you",
  "seeing a future with you",
  "cookie annou nights",
  "how we argue about buying you terrea",
  "how I teach you how to park",
  "how I ragebait you",
  "how you ragebait me",
  "we are always honest with each other",
  "beach dates with you",
  "when i find strawberry milk I always buy it for you",
  "I can never eat milka oreo alone",
  "I always give you the last bite/sip",
  "sometimes i just feel that you are a little girl around me",
  "how you help me do grocery shopping",
  "how unique you are",
  "how you give me nicknames",
  "aandek joie de vivre",
  "how goofy you are sometimes",
  "your dark humor",
  "snack shopping before the cinema",
  "when you are my passenger princess",
  "I get more excited for your birthday than you",
  "beach dates without swimming , just laying on the sand talking",
  "how kind you are with baboucha",
  "your basically an old baby",
  "your face card never declines",
  "I know I will always choose you no matter what , I will never give up on you , even on hard times , I can be dumb , but I love you",
  "I love you so much",
  "your all I need",
  "you helped me overcome my traumas (don't you dare create more bitch )",
  "you helped me accept myself fand my body",
  "you made me be at ease when I talk in English , you helped me by pushing me practicing with you , I can now write you a book in English about us , create a website with a 100 notes that narrate why I love you",
  "I yearn for you",
  "That look.",
  "when you bite your nail and smile",
  "you made me understand the value of life",
  "you are my bestfriend",
  "you give good advices",
  "I can tell you sahaaa",
  "our goofy voicelines",
  "when I hold your thigh when you drive or I drive",
  "when you put your head on my chest or shoulder",
  "when I brush your hair",
  "when I dry your hair",
  "When you hug me",
  "How I feel deeply loved",
  "When you wait for my slow ass in the car each time (I try my best I swear, I will try harder)",
  "fuck that smile is everything",
  "the tiktoks that we make together",
  "when your eyes just unfocus I love it",
  "how unserious we are",
  "how close I am with your family",
  "how every second I pray that I can be with you forever",
  "your pretty little hands"
  ];

  /* ── flower shapes (viewBox 0 0 100 100) ── */
  function roseSVG(fill, dark) {
    var petals = "";
    var outer = 8, inner = 6;
    for (var i = 0; i < outer; i++) {
      var a = i * (360 / outer);
      petals += '<ellipse cx="50" cy="27" rx="13" ry="21" fill="' + fill + '" opacity="0.92" transform="rotate(' + a + ' 50 50)"/>';
    }
    for (var j = 0; j < inner; j++) {
      var b = j * (360 / inner) + 15;
      petals += '<ellipse cx="50" cy="34" rx="9" ry="14" fill="' + dark + '" opacity="0.75" transform="rotate(' + b + ' 50 50)"/>';
    }
    petals += '<circle cx="50" cy="50" r="6.5" fill="' + dark + '"/>';
    return svgWrap(petals);
  }

  function lilySVG(fill, dark) {
    var petals = "";
    var count = 6;
    for (var i = 0; i < count; i++) {
      var a = i * (360 / count);
      petals += '<path d="M50,50 C45,34 43,14 50,4 C57,14 55,34 50,50 Z" fill="' + fill + '" opacity="0.94" transform="rotate(' + a + ' 50 50)"/>';
    }
    var stamens = "";
    for (var s = 0; s < 5; s++) {
      var sa = s * 72 + 20;
      stamens += '<line x1="50" y1="50" x2="50" y2="28" stroke="' + dark + '" stroke-width="1.6" transform="rotate(' + sa + ' 50 50)"/>';
      stamens += '<circle cx="50" cy="28" r="2.1" fill="' + dark + '" transform="rotate(' + sa + ' 50 50)"/>';
    }
    return svgWrap(petals + stamens);
  }

  function blossomSVG(fill, dark) {
    var petals = "";
    var count = 5;
    for (var i = 0; i < count; i++) {
      var a = i * (360 / count);
      petals += '<ellipse cx="50" cy="25" rx="15" ry="19" fill="' + fill + '" opacity="0.92" transform="rotate(' + a + ' 50 50)"/>';
    }
    petals += '<circle cx="50" cy="50" r="9" fill="' + dark + '"/>';
    return svgWrap(petals);
  }

  function svgWrap(inner) {
    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' + inner + "</svg>";
  }

  var GENERATORS = [roseSVG, roseSVG, lilySVG, lilySVG, blossomSVG];

  function rand(min, max) { return Math.random() * (max - min) + min; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  /* Fisher–Yates shuffle, used to build a non-repeating message order */
  function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  var msgOrder = [];
  var msgCursor = 0;
  function nextMessageIndex() {
    if (msgCursor >= msgOrder.length) {
      msgOrder = shuffled(MESSAGES.map(function (_, i) { return i; }));
      msgCursor = 0;
    }
    return msgOrder[msgCursor++];
  }

  function buildCell(col, row) {
    var color = pick(PALETTE);
    var gen = pick(GENERATORS);
    var rot = rand(-28, 28).toFixed(1);
    var scale = rand(0.78, 1.24).toFixed(2);
    var z = Math.floor(rand(1, 6));
    var msgIdx = nextMessageIndex();
    var svg = gen(color.fill, color.dark);

    /* ── organic jitter ──
       Random per-cell nudge plus an every-other-row/column
       stagger so flowers don't line up into visible grid rows
       and columns — reads as a scattered flower field instead
       of a wallpaper tile. */
    var tx = rand(-16, 16);
    var ty = rand(-16, 16);
    if (row % 2 === 1) tx += 16;   // stagger odd rows sideways
    if (col % 2 === 1) ty += 10;   // and odd columns vertically
    tx = tx.toFixed(1);
    ty = ty.toFixed(1);

    return '<div class="flower-cell" data-msg="' + msgIdx + '" ' +
      'style="--rot:' + rot + 'deg;--scale:' + scale + ';--tx:' + tx + '%;--ty:' + ty + '%;z-index:' + z + ';">' +
      svg + "</div>";
  }

  /* ── message popup ── */
  function ensureModal() {
    var modal = document.getElementById("gardenMsgModal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "gardenMsgModal";
    modal.className = "garden-modal";
    modal.innerHTML =
      '<div class="garden-modal-content">' +
        '<span class="garden-modal-close" id="gardenMsgClose">&times;</span>' +
        '<div class="garden-modal-flower">&#10084;</div>' +
        '<p id="gardenMsgText"></p>' +
      '</div>';
    document.body.appendChild(modal);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
    document.getElementById("gardenMsgClose").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
    return modal;
  }

  function openModal(text) {
    var modal = ensureModal();
    document.getElementById("gardenMsgText").textContent = text;
    modal.classList.add("open");
  }

  function closeModal() {
    var modal = document.getElementById("gardenMsgModal");
    if (modal) modal.classList.remove("open");
  }

  /* ── build & fill the wall ──
     Cells are grouped into horizontal "bands" of several rows.
     content-visibility:auto lives on the BAND, not the individual
     flower — that's what was clipping every flower into a hard
     square before (content-visibility forces paint containment,
     which clips overflow to the element's own box). Banding keeps
     the off-screen-skip performance win while letting each flower
     overflow its cell freely for a natural, non-square look. */
  var ROWS_PER_BAND = 8;

  function fillWall() {
    var wall = document.getElementById("flowerWall");
    if (!wall) return;

    var mobile = window.innerWidth <= 600;
    var cellSize = mobile ? 88 : 90;
    var columns = Math.max(4, Math.ceil(window.innerWidth / cellSize));
    var desiredHeight = Math.max(window.innerHeight * (mobile ? 1.6 : 2.4), 1500);
    var totalRows = Math.ceil(desiredHeight / cellSize) + 1;

    wall.style.setProperty("--cell-size", cellSize + "px");
    wall.innerHTML = "";

    var frag = document.createDocumentFragment();
    var rowsBuilt = 0;

    while (rowsBuilt < totalRows) {
      var bandRows = Math.min(ROWS_PER_BAND, totalRows - rowsBuilt);
      var band = document.createElement("div");
      band.className = "flower-band";
      band.style.setProperty("--cols", columns);
      band.style.height = (bandRows * cellSize) + "px";

      var parts = [];
      for (var r = 0; r < bandRows; r++) {
        var row = rowsBuilt + r;
        for (var c = 0; c < columns; c++) {
          parts.push(buildCell(c, row));
        }
      }
      band.innerHTML = parts.join("");
      frag.appendChild(band);
      rowsBuilt += bandRows;
    }

    wall.appendChild(frag);
  }

  /* ── single delegated listener handles every flower ── */
  function wireEvents() {
    var wall = document.getElementById("flowerWall");
    if (!wall) return;

    wall.addEventListener("click", function (e) {
      var cell = e.target.closest(".flower-cell");
      if (!cell) return;
      var idx = cell.getAttribute("data-msg");
      if (idx === null) return;
      openModal(MESSAGES[idx]);
    });

    /* touch devices: brief lift feedback on tap, in addition to the click above */
    if ("ontouchstart" in window) {
      wall.addEventListener("touchstart", function (e) {
        var cell = e.target.closest(".flower-cell");
        if (!cell) return;
        var prev = wall.querySelector(".flower-cell.touched");
        if (prev && prev !== cell) prev.classList.remove("touched");
        cell.classList.add("touched");
        setTimeout(function () { cell.classList.remove("touched"); }, 500);
      }, { passive: true });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    fillWall();
    wireEvents();
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fillWall, 350);
  });

})();
