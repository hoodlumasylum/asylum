(function () {
  var PAGES = {
    index: { title: "Hoodlum Asylum", nav: "home", side: "home" },
    feed: { title: "Community feed", nav: "home", side: "community" },
    explore: { title: "Explore", nav: "explore", side: "" },
    create: { title: "Create", nav: "create", side: "" },
    messages: { title: "Messages", nav: "messages", side: "" },
    notifications: { title: "Notifications", nav: "notifications", side: "" },
    profile: { title: "Profile", nav: "profile", side: "" },
    "mental-health": { title: "Mental Health Support", nav: "", side: "mental-health" },
    podcasts: { title: "Podcast Hub", nav: "", side: "podcasts" },
    creators: { title: "Artists & Creators", nav: "", side: "creators" },
    community: { title: "Community", nav: "", side: "community" },
    music: { title: "Music", nav: "", side: "music" },
    films: { title: "Films & Media", nav: "", side: "films" },
    beauty: { title: "Hair & Beauty", nav: "", side: "beauty" },
    fashion: { title: "Fashion & Brands", nav: "", side: "fashion" },
    sports: { title: "Sports & Fitness", nav: "", side: "sports" },
    gaming: { title: "Gaming", nav: "", side: "gaming" },
    charity: { title: "Charity & Projects", nav: "", side: "charity" },
    events: { title: "Events", nav: "", side: "events" },
    support: { title: "Support & Advice", nav: "", side: "support" }
  };

  var SIDEBAR = [
    ["index.html", "home", "🏠", "Home"],
    ["feed.html", "community", "👥", "Community"],
    ["mental-health.html", "mental-health", "🧠", "Mental Health"],
    ["podcasts.html", "podcasts", "🎙️", "Podcast Hub"],
    ["music.html", "music", "🎵", "Music"],
    ["films.html", "films", "🎬", "Films & Media"],
    ["creators.html", "creators", "🎨", "Artists & Creators"],
    ["beauty.html", "beauty", "💇", "Hair & Beauty"],
    ["fashion.html", "fashion", "👗", "Fashion & Brands"],
    ["sports.html", "sports", "🏃", "Sports & Fitness"],
    ["gaming.html", "gaming", "🎮", "Gaming"],
    ["charity.html", "charity", "🤝", "Charity & Projects"],
    ["events.html", "events", "📅", "Events"],
    ["support.html", "support", "💚", "Support & Advice"]
  ];

  var HUBS = [
    ["mental-health.html", "🧠", "Mental Health Support"],
    ["support.html", "✨", "Spiritual Talks"],
    ["podcasts.html", "🎙️", "Podcast Hub"],
    ["music.html", "🎵", "Music & Audio"],
    ["films.html", "🎬", "Films & Media"],
    ["creators.html", "🎨", "Artists & Creators"],
    ["sports.html", "🏃", "Sports & Fitness"],
    ["gaming.html", "🎮", "Gaming & Esports"],
    ["beauty.html", "💇", "Hair & Beauty"],
    ["fashion.html", "👗", "Fashion & Brands"],
    ["charity.html", "🤝", "Charity & Community"],
    ["events.html", "📅", "Events & Meet Ups"]
  ];

  var PODCAST_SLIDES = [
    { title: "Spiritual Talks" },
    { title: "Mental Health Conversations" },
    { title: "Real Life Stories" },
    { title: "Self Development" },
    { title: "Community Issues" },
    { title: "World & Culture Talks" }
  ];

  var SAMPLE_TRENDING = [
    ["🎵", "Open mic night ideas", "Sample topic · Music"],
    ["🎬", "Short film collaboration", "Sample topic · Films"],
    ["🎙️", "Peer-led podcast themes", "Sample topic · Podcasts"],
    ["🧠", "Check-in circle format", "Sample topic · Mental Health"],
    ["🎨", "Mural workshop plan", "Sample topic · Creators"]
  ];

  var SAMPLE_EVENTS = [
    ["📅", "Community meet-up", "Example event · date TBC"],
    ["🎙️", "Creative showcase & live talk", "Example event · date TBC"],
    ["🏃", "Sunrise walk", "Example event · date TBC"]
  ];

  var SAMPLE_POSTS = [
    { ini: "A", name: "Alex", when: "Sample", text: "Thinking of starting a calm Sunday check-in for anyone who wants company, no pressure to talk." },
    { ini: "J", name: "Jordan", when: "Sample", text: "Working on a new beat this week. If anyone wants to add a verse, drop a comment in this demo feed." },
    { ini: "R", name: "Riley", when: "Sample", text: "Sketching logo ideas for a community mural. Sharing process shots here as sample content only." },
    { ini: "S", name: "Sam", when: "Sample", text: "Reminder from this example post: if you are struggling, the Mental Health page lists free UK helplines." }
  ];

  var SAMPLE_CREATORS = [
    { ini: "M", name: "Morgan", role: "Music · sample profile", blurb: "Example producer working on community anthems and open-mic nights." },
    { ini: "N", name: "Nova", role: "Visual art · sample profile", blurb: "Example illustrator exploring murals and poster design." },
    { ini: "K", name: "Kai", role: "Film · sample profile", blurb: "Example short-film maker documenting local stories." },
    { ini: "L", name: "Lane", role: "Hair & style · sample profile", blurb: "Example stylist sharing lookbooks and workshop ideas." },
    { ini: "P", name: "Parker", role: "Podcasts · sample profile", blurb: "Example host drafting peer-led conversation series." },
    { ini: "T", name: "Tasha", role: "Dance · sample profile", blurb: "Example performer planning community showcases." }
  ];

  var SAMPLE_SHOWS = [
    { ico: "🎙️", name: "Late Night Check-In", blurb: "Sample series: quiet conversations about getting through the week." },
    { ico: "✨", name: "Open Floor Talks", blurb: "Sample series: community stories, creativity and culture." },
    { ico: "🧠", name: "Peer Circles", blurb: "Sample series: peer-led chats. Not clinical advice." },
    { ico: "🎵", name: "Session Notes", blurb: "Sample series: music, makers and work-in-progress tracks." }
  ];

  var page = (document.body && document.body.getAttribute("data-page")) || "index";
  var slide = 0;

  function $(id) { return document.getElementById(id); }

  function toast(msg) {
    var el = $("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove("show"); }, 3200);
  }

  function comingSoon(kind) {
    toast((kind || "This") + " is coming soon. This site is a front-end preview — nothing is sent to a server.");
    return false;
  }

  function localPosts() {
    try { return JSON.parse(localStorage.getItem("ha_posts") || "[]"); }
    catch (e) { return []; }
  }
  function saveLocalPosts(list) {
    try { localStorage.setItem("ha_posts", JSON.stringify(list)); } catch (e) {}
  }

  function renderTop() {
    var meta = PAGES[page] || PAGES.index;
    var nav = [
      ["index.html", "home", "Home"],
      ["explore.html", "explore", "Explore"],
      ["create.html", "create", "Create"],
      ["messages.html", "messages", "Messages"],
      ["notifications.html", "notifications", "Notifications"]
    ];
    var links = nav.map(function (n) {
      return '<a class="nav-btn' + (meta.nav === n[1] ? " is-active" : "") + '" href="' + n[0] + '">' + n[2] + "</a>";
    }).join("");
    $("topnav").innerHTML =
      '<button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">☰</button>' +
      '<a class="brand" href="index.html" title="Hoodlum Asylum home"><img src="img/logo.svg" width="150" height="36" alt="Hoodlum Asylum"></a>' +
      '<nav class="nav-links" id="navlinks" aria-label="Main">' + links + "</nav>" +
      '<form class="search-wrap" id="search-form" role="search" style="flex:1;display:flex;justify-content:flex-end">' +
      '<input class="search-pill" id="q" type="search" placeholder="Search…" aria-label="Search">' +
      "</form>" +
      '<a class="avatar-btn" href="profile.html" title="Profile (demo)">HA</a>';
  }

  function renderSidebar() {
    var meta = PAGES[page] || PAGES.index;
    $("sidebar").innerHTML = SIDEBAR.map(function (s) {
      return '<a class="side-item' + (meta.side === s[1] ? " is-active" : "") + '" href="' + s[0] + '"><span class="side-ico">' + s[2] + "</span>" + s[3] + "</a>";
    }).join("");
  }

  function renderRight() {
    var el = $("rightcol");
    if (!el) return;
    el.innerHTML = rightHTML();
    bindComposer(el);
  }

  function rightHTML() {
    var trends = SAMPLE_TRENDING.map(function (t) {
      return '<div class="trend-item"><div class="thumb" aria-hidden="true">' + t[0] + '</div><div><div class="t">' + t[1] + '</div><div class="s">' + t[2] + "</div></div></div>";
    }).join("");
    var events = SAMPLE_EVENTS.map(function (t) {
      return '<div class="event-item"><div class="thumb" aria-hidden="true">' + t[0] + '</div><div><div class="t">' + t[1] + '</div><div class="s">' + t[2] + "</div></div></div>";
    }).join("");
    return (
      '<div>' +
        "<h3>Create a Post</h3>" +
        '<form id="composer">' +
          '<textarea class="textarea" name="text" maxlength="500" placeholder="Share your thoughts, music, video, project or story…"></textarea>' +
          '<div class="post-actions">' +
            '<span class="chip">Photo</span><span class="chip">Video</span><span class="chip">Audio</span>' +
            '<button class="btn primary" type="submit" style="margin-left:auto">Post</button>' +
          "</div>" +
          '<p class="muted" style="font-size:12px;margin:8px 0 0">Demo posts stay in this browser only.</p>' +
        "</form>" +
      "</div>" +
      "<div><h3>Trending</h3>" + trends + "</div>" +
      "<div><h3>Upcoming Events</h3>" + events + "</div>" +
      '<button class="btn join-btn" type="button" data-soon="Joining">Join the Hoodlum Asylum Community</button>'
    );
  }

  function postCard(p, extra) {
    return (
      '<article class="post">' +
        '<div class="post-meta"><div class="ava" aria-hidden="true">' + p.ini + "</div><div>" +
        '<div class="name">' + p.name + ' <span class="sample">' + (extra || "Example") + "</span></div>" +
        '<div class="when">' + p.when + "</div></div></div>" +
        "<p style=\"margin:0\">" + p.text + "</p>" +
      "</article>"
    );
  }

  function postsHTML() {
    var mine = localPosts().map(function (p) {
      return postCard({ ini: "YO", name: "You (this device)", when: p.when, text: p.text }, "Saved only in this browser");
    }).join("");
    return mine + SAMPLE_POSTS.map(function (p) { return postCard(p, "Sample content"); }).join("");
  }

  function landingHTML() {
    var tiles = HUBS.map(function (h) {
      return '<a class="hub-tile" href="' + h[0] + '"><div class="ico">' + h[1] + '</div><div class="label">' + h[2] + "</div></a>";
    }).join("");
    return (
      '<section class="hero">' +
        '<div class="hero-sign">' +
          '<img src="img/sign.svg" alt="Hoodlum Asylum">' +
          '<p class="tagline">A community for creativity, support and showing up for each other.</p>' +
        "</div>" +
        "<ul class=\"checklist\">" +
          "<li>Mental Health</li><li>Creativity</li><li>Opportunity</li>" +
          "<li>Support</li><li>Community</li><li>A Better World</li>" +
        "</ul>" +
      "</section>" +
      '<section class="hub-grid">' + tiles + "</section>" +
      '<section class="banner" id="carousel">' +
        '<img class="banner-art" src="img/mic.svg" alt="">' +
        "<div>" +
          "<h2>PODCASTS &amp; LIVE TALKS</h2>" +
          '<ul class="checklist" id="slide-list"></ul>' +
          '<a class="btn" href="podcasts.html" style="margin-top:10px">Listen now ▶</a>' +
          '<div class="dots" id="dots"></div>' +
        "</div>" +
      "</section>" +
      '<section class="bottom-strip" aria-label="Our values">' +
        "<div class=\"pill\">Support Each Other</div>" +
        "<div class=\"pill\">Showcase Your Talent</div>" +
        "<div class=\"pill\">Find Opportunities</div>" +
        "<div class=\"pill\">Get Involved</div>" +
        "<div class=\"pill\">Make a Difference</div>" +
      "</section>" +
      '<aside class="card mobile-right"><div id="mobile-right-home"></div></aside>'
    );
  }

  function mentalHTML() {
    return (
      '<div class="page-head"><h1>🧠 Mental Health Support</h1><a class="btn ghost" href="index.html">Home</a></div>' +
      '<div class="disclaimer"><strong>Important:</strong> Hoodlum Asylum is a community preview. It is <strong>not a substitute for professional help</strong>, diagnosis or emergency care. If you or someone else is in immediate danger, call <a href="tel:999">999</a>.</div>' +
      '<section class="card"><h3>UK helplines</h3>' +
        '<div class="helpline"><div><strong>Samaritans</strong><div class="muted">Free, 24/7</div></div><a href="tel:116123">116 123</a></div>' +
        '<div class="helpline"><div><strong>Shout</strong><div class="muted">Crisis text line</div></div><span>Text <strong>SHOUT</strong> to <a href="sms:85258?body=SHOUT">85258</a></span></div>' +
        '<div class="helpline"><div><strong>NHS 111</strong><div class="muted">Option 2 for mental health</div></div><a href="tel:111">111</a></div>' +
        '<div class="helpline"><div><strong>Emergency</strong><div class="muted">If you or someone else is in immediate danger</div></div><a href="tel:999">999</a></div>' +
        '<p class="muted" style="margin:10px 0 0;font-size:12px">Sources: Samaritans, Shout and NHS public pages. Always check the official services for the latest information.</p>' +
      "</section>" +
      '<section class="soon-box"><strong>24/7 community chat — Coming soon.</strong><br>Peer groups and sessions are also coming soon. Hoodlum Asylum does not provide clinical care or trained clinical staff.</section>' +
      "<h3 style=\"margin:8px 0 0\">Community notes <span class=\"sample\">Sample content</span></h3>" +
      postsHTML()
    );
  }

  function podcastsHTML() {
    var shows = SAMPLE_SHOWS.map(function (s) {
      return '<article class="show"><div class="thumb" aria-hidden="true">' + s.ico + "</div><div><h3 style=\"margin:0 0 6px\">" + s.name + ' <span class="sample">Sample content</span></h3><p class="muted" style="margin:0">' + s.blurb + "</p></div>" +
        '<button class="btn coming" type="button" data-soon="Listening">Listen</button></article>';
    }).join("");
    return (
      '<div class="page-head"><h1>🎙️ Podcast Hub</h1></div>' +
      '<p class="muted">Sample programmes only. Live shows and playback are coming soon — nothing streams from this preview.</p>' +
      '<div class="shows">' + shows + "</div>"
    );
  }

  function creatorsHTML() {
    var cards = SAMPLE_CREATORS.map(function (c) {
      return '<article class="creator"><div class="ava" aria-hidden="true">' + c.ini + "</div><h3>" + c.name + ' <span class="sample">Sample</span></h3><div class="muted">' + c.role + "</div><p style=\"margin:8px 0 0\">" + c.blurb + "</p></article>";
    }).join("");
    return (
      '<div class="page-head"><h1>🎨 Artists &amp; Creators</h1></div>' +
      '<p class="muted">Example profiles with generic initials — not real people. This is sample content for the preview layout.</p>' +
      '<div class="creators">' + cards + "</div>"
    );
  }

  function simpleHub(title, blurb) {
    return (
      '<div class="page-head"><h1>' + title + "</h1></div>" +
      '<p class="muted">' + blurb + ' Posts below are <span class="sample">sample content</span>.</p>' +
      postsHTML()
    );
  }

  function exploreHTML() {
    var tiles = HUBS.map(function (h) {
      return '<a class="hub-tile" href="' + h[0] + '"><div class="ico">' + h[1] + '</div><div class="label">' + h[2] + "</div></a>";
    }).join("");
    return '<div class="page-head"><h1>Explore</h1></div><section class="hub-grid">' + tiles + "</section>" +
      "<h3>Latest <span class=\"sample\">Sample content</span></h3>" + postsHTML();
  }

  function createHTML() {
    return (
      '<div class="page-head"><h1>Create</h1></div>' +
      '<section class="card"><h3>Create a Post</h3>' +
      '<form id="composer-page">' +
        '<textarea class="textarea" name="text" maxlength="500" placeholder="Share your thoughts, music, video, project or story…"></textarea>' +
        '<div class="post-actions"><span class="chip">Photo</span><span class="chip">Video</span><span class="chip">Audio</span>' +
        '<button class="btn primary" type="submit" style="margin-left:auto">Post</button></div>' +
        '<p class="muted" style="font-size:12px;margin:8px 0 0">Demo only. Posts stay in this browser and are not sent anywhere.</p>' +
      "</form></section>"
    );
  }

  function comingPage(title, text) {
    return (
      '<div class="page-head"><h1>' + title + "</h1></div>" +
      '<section class="soon-box"><strong>Coming soon.</strong><br>' + text + "</section>"
    );
  }

  function profileHTML() {
    return (
      '<div class="page-head"><h1>Profile</h1></div>' +
      '<section class="card"><div class="ava" style="width:72px;height:72px;font-size:24px">HA</div>' +
      "<h3 style=\"margin:12px 0 4px\">Guest (this device) <span class=\"sample\">Demo</span></h3>" +
      '<p class="muted">Accounts are not live. Nothing here is an official member profile, and no email or personal details are collected.</p>' +
      '<button class="btn" type="button" data-soon="Sign in">Sign in — coming soon</button></section>'
    );
  }

  function renderMain() {
    var main = $("main");
    var html;
    if (page === "index") html = landingHTML();
    else if (page === "feed" || page === "community") html = simpleHub("Community feed", "A preview of how community posts could look.");
    else if (page === "mental-health") html = mentalHTML();
    else if (page === "podcasts") html = podcastsHTML();
    else if (page === "creators") html = creatorsHTML();
    else if (page === "explore") html = exploreHTML();
    else if (page === "create") html = createHTML();
    else if (page === "messages") html = comingPage("Messages", "Private messages are not available in this preview. Nothing you type is sent or stored on a server.");
    else if (page === "notifications") html = comingPage("Notifications", "Notifications are not live yet. This page does not track activity.");
    else if (page === "profile") html = profileHTML();
    else {
      var titles = {
        music: "🎵 Music", films: "🎬 Films & Media", beauty: "💇 Hair & Beauty",
        fashion: "👗 Fashion & Brands", sports: "🏃 Sports & Fitness", gaming: "🎮 Gaming",
        charity: "🤝 Charity & Projects", events: "📅 Events", support: "💚 Support & Advice"
      };
      html = simpleHub(titles[page] || "Hall", "This section is a preview of the " + (titles[page] || "hub") + " area.");
    }
    main.innerHTML = html;
    if (page === "index") {
      setupCarousel();
      var mr = $("mobile-right-home");
      if (mr) { mr.innerHTML = rightHTML(); bindComposer(mr); }
    }
    var pageForm = $("composer-page");
    if (pageForm) bindComposer(pageForm.parentNode);
  }

  function setupCarousel() {
    var list = $("slide-list");
    var dots = $("dots");
    if (!list || !dots) return;
    function paint() {
      list.innerHTML = PODCAST_SLIDES.map(function (s, i) {
        var style = i === slide ? "" : "display:none";
        return '<li' + (i === slide ? ' style="box-shadow:0 0 12px var(--cyan-glow)"' : "") + ">" + s.title + "</li>";
      }).join("");
      dots.innerHTML = PODCAST_SLIDES.map(function (_, i) {
        return '<button type="button" class="dot' + (i === slide ? " on" : "") + '" data-slide="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>';
      }).join("");
    }
    paint();
    dots.addEventListener("click", function (e) {
      var b = e.target.closest("[data-slide]");
      if (!b) return;
      slide = +b.getAttribute("data-slide");
      paint();
    });
    clearInterval(setupCarousel._t);
    setupCarousel._t = setInterval(function () {
      slide = (slide + 1) % PODCAST_SLIDES.length;
      paint();
    }, 4000);
  }

  function bindComposer(root) {
    var form = root.querySelector && root.querySelector("#composer, #composer-page, form");
    if (!form || form._bound) return;
    form._bound = true;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ta = form.querySelector("textarea");
      var text = (ta && ta.value || "").trim();
      if (!text) { toast("Write something first — or leave it. Posts are demo only."); return; }
      var list = localPosts();
      list.unshift({ text: text, when: "Just now · this device only" });
      saveLocalPosts(list.slice(0, 20));
      if (ta) ta.value = "";
      toast("Saved on this device only. Nothing was sent to a server.");
      if (page === "feed" || page === "community" || page === "create") renderMain();
    });
  }

  function bindChrome() {
    var burger = $("hamburger");
    var side = $("sidebar");
    var links = $("navlinks");
    var scrim = $("scrim");
    function close() {
      if (side) side.classList.remove("open");
      if (links) links.classList.remove("open");
      if (scrim) scrim.classList.remove("on");
      if (burger) burger.setAttribute("aria-expanded", "false");
    }
    function open() {
      if (side) side.classList.add("open");
      if (links) links.classList.add("open");
      if (scrim) scrim.classList.add("on");
      if (burger) burger.setAttribute("aria-expanded", "true");
    }
    if (burger) burger.addEventListener("click", function () {
      if (side && side.classList.contains("open")) close(); else open();
    });
    if (scrim) scrim.addEventListener("click", close);
    document.addEventListener("click", function (e) {
      var soon = e.target.closest("[data-soon]");
      if (soon) { e.preventDefault(); comingSoon(soon.getAttribute("data-soon")); }
    });
    var form = $("search-form");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = ($("q") && $("q").value || "").trim();
      if (!q) return;
      toast("Search is a preview only. Try the Explore page for the community sections.");
    });
  }

  function markTabs() {
    var map = { index: "index.html", explore: "explore.html", create: "create.html", messages: "messages.html" };
    var href = map[page] || (page === "feed" ? "index.html" : "");
    document.querySelectorAll(".tabbar a").forEach(function (a) {
      if (href && a.getAttribute("href") === href) a.classList.add("is-active");
    });
  }

  renderTop();
  renderSidebar();
  renderRight();
  renderMain();
  bindChrome();
  markTabs();
})();
