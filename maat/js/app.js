(function () {
  "use strict";
  const D = window.HA;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const KEY = "ha_demo_v1";
  const S = Object.assign({ bal: 120, backed: [], posts: [], votes: {}, chat: [] },
    JSON.parse(localStorage.getItem(KEY) || "{}"));
  const save = () => { localStorage.setItem(KEY, JSON.stringify(S)); $("#bal").textContent = S.bal; };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toast.i); toast.i = setTimeout(() => t.classList.remove("on"), 2400); }

  const avatar = (name, tint, size = 40) =>
    `<span class="av" style="--t:${tint};width:${size}px;height:${size}px;font-size:${Math.round(size * .42)}px">${esc(name[0])}</span>`;

  const scales = (tilt = 0) => `
  <svg class="scales" viewBox="0 0 320 240" role="img" aria-label="The scales of Maat: a heart balanced against a feather">
    <defs><linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7dc8a"/><stop offset="1" stop-color="#a87a26"/></linearGradient></defs>
    <path d="M160 40 V214 M120 222 H200 M136 214 H184" stroke="url(#gold)" stroke-width="7" stroke-linecap="round"/>
    <circle cx="160" cy="34" r="9" fill="url(#gold)"/>
    <g class="beam" style="--tilt:${tilt}deg">
      <path d="M50 52 H270" stroke="url(#gold)" stroke-width="6" stroke-linecap="round"/>
      <g class="pan pan-l"><path d="M50 52 L28 120 M50 52 L72 120" stroke="#c9a14a" stroke-width="2"/>
        <path d="M18 120 H82 Q78 138 50 138 Q22 138 18 120 Z" fill="url(#gold)"/>
        <path d="M50 116 C40 104 30 96 38 88 C44 82 50 88 50 92 C50 88 56 82 62 88 C70 96 60 104 50 116 Z" fill="#c0392b"/></g>
      <g class="pan pan-r"><path d="M270 52 L248 120 M270 52 L292 120" stroke="#c9a14a" stroke-width="2"/>
        <path d="M238 120 H302 Q298 138 270 138 Q242 138 238 120 Z" fill="url(#gold)"/>
        <path d="M270 116 C262 104 262 84 272 72 C278 86 278 104 270 116 Z" fill="#fff2c4" stroke="#a6782a"/><path d="M270 116 L272 74" stroke="#6b4a12"/></g>
    </g>
  </svg>`;

  const title = (kicker, h, sub = "") => `
    <header class="sec-head"><span class="kicker">${kicker}</span><h1>${h}</h1>${sub ? `<p>${sub}</p>` : ""}</header>`;

  const hallTile = (h) => `
    <a class="cart" href="${h.href || "#/hall/" + h.id}"><span class="cart-glyph">${h.glyph}</span>
      <span class="cart-name">${h.name}</span><span class="cart-line">${h.line}</span></a>`;

  function viewHome() {
    const sl = D.slides[slideI % D.slides.length];
    return `
    <section class="sign-hero">
      <div class="sign">
        <span class="chain l"></span><span class="chain r"></span>
        <div class="board">
          <img src="img/feather.svg" alt="" class="board-feather" aria-hidden="true">
          <span class="kicker">A community built on Maat</span>
          <h1 class="mega">HOODLUM<br>ASYLUM</h1>
          <p class="lede">Real people. Real talent. Real balance.</p>
        </div>
      </div>
      <ul class="checklist">
        ${["Mental health first", "Creativity & talent", "Opportunity", "Truth & support", "Community", "Balance in all things"].map((x) => `<li>${x}</li>`).join("")}
      </ul>
    </section>
    <div class="tiles">${D.halls.map((h) => `
      <a class="tile" href="${h.href || "#/hall/" + h.id}"><span class="t-ico">${h.glyph}</span><span>${h.name}</span></a>`).join("")}</div>
    <section class="carousel" aria-roledescription="carousel">
      <div class="car-art" aria-hidden="true">${scales(0)}</div>
      <div class="car-txt">
        <span class="kicker">${sl.k}</span><h2>${sl.h}</h2>
        <ul class="checklist small-list">${sl.items.map((x) => `<li>${x}</li>`).join("")}</ul>
        <a class="btn gold" href="${sl.go}">${sl.cta} ▶</a>
        <div class="dots">${D.slides.map((_, i) => `<button class="dot ${i === slideI % D.slides.length ? "on" : ""}" data-slide="${i}" aria-label="Slide ${i + 1}"></button>`).join("")}</div>
      </div>
    </section>
    <section class="tri">
      <a class="feature arena-f" href="#/arena"><span class="kicker">VS Arena</span><h3>Talent, not beef</h3><p>Bars, beats, art, cuts, fits and games.</p></a>
      <a class="feature lab-f" href="#/lab"><span class="kicker">Concept Lab</span><h3>Ideas worth building</h3><p>AI hosts, clearly labelled.</p></a>
      <a class="feature care-f" href="#/maat"><span class="kicker">Maat</span><h3>The feather & the heart</h3><p>Why our community runs on balance.</p></a>
    </section>`;
  }

  function sidebar() {
    $("#sidebar").innerHTML = `<a class="sb" href="#/" data-r="home"><i>△</i>Home</a>` +
      D.halls.map((h) => `<a class="sb" href="${h.href || "#/hall/" + h.id}" data-r="${h.href ? "house-of-life" : "hall-" + h.id}"><i>${h.glyph}</i>${h.name}</a>`).join("") +
      `<div class="side-sep"></div>
      <a class="sb" href="#/arena" data-r="arena"><i>⚔</i>VS Arena</a>
      <a class="sb" href="#/lab" data-r="lab"><i>✦</i>Concept Lab</a>
      <a class="sb" href="#/treasury" data-r="treasury"><i>◎</i>C-Notes</a>
      <a class="sb" href="#/maat" data-r="maat"><i>⚖</i>Maat</a>`;
  }

  function rightcol() {
    $("#rightcol").innerHTML = `
      <div class="rc-card"><h3>Create a post</h3>
        <textarea id="rc-text" maxlength="400" placeholder="Share something true…"></textarea>
        <div class="row between"><select id="rc-hall" aria-label="Hall">${D.halls.filter((h) => !h.href).map((h) => `<option value="${h.id}">${h.name}</option>`).join("")}</select><button class="btn gold sm" id="rc-post">Post</button></div></div>
      <div class="rc-card"><h3>Trending</h3>${D.trending.map((t) => `
        <a class="trend" href="${t.h}"><span class="thumb" style="--c:${t.c}">${t.g}</span><span><b>${t.t}</b><small>${t.s}</small></span></a>`).join("")}</div>
      <div class="rc-card"><h3>Upcoming events</h3>${D.events.map((e) => `
        <div class="ev"><span class="ev-d">${e.d}</span><span><b>${e.t}</b><small>${e.s}</small></span></div>`).join("")}</div>
      <button class="join" id="join">☥ JOIN THE ASYLUM</button>`;
    $("#rc-post").onclick = () => { const t = $("#rc-text").value.trim(); if (!t) return toast("Write something first"); const h = $("#rc-hall").value; S.posts.unshift({ by: "code", t, w: "now", hall: h }); save(); toast("Posted (demo)"); location.hash = "#/hall/" + h; render(); };
    $("#join").onclick = () => toast("Sign-ups open soon. This is a preview.");
  }

  function viewSearch(q) {
    q = decodeURIComponent(q || "").toLowerCase();
    const hit = (x) => x.toLowerCase().includes(q);
    const halls = D.halls.filter((h) => hit(h.name + " " + h.line));
    const bs = D.battles.filter((b) => hit(b.type + " " + b.a + " " + b.b));
    const cs = D.concepts.filter((c) => hit(c.title + " " + c.blurb));
    const res = [...halls.map((h) => `<a class="trend" href="${h.href || "#/hall/" + h.id}"><span class="thumb">${h.glyph}</span><span><b>${h.name}</b><small>Hall</small></span></a>`),
      ...bs.map((b) => `<a class="trend" href="#/arena/${b.id}"><span class="thumb">⚔</span><span><b>${esc(b.a)} vs ${esc(b.b)}</b><small>${b.type}</small></span></a>`),
      ...cs.map((c) => `<a class="trend" href="#/lab"><span class="thumb">✦</span><span><b>${esc(c.title)}</b><small>Concept Lab</small></span></a>`)];
    return `${title("Search", `“${esc(q)}”`, `${res.length} result${res.length === 1 ? "" : "s"}`)}<div class="panel">${res.join("") || '<p class="muted">Nothing yet. Try "music" or "art".</p>'}</div>`;
  }

  function viewMaat() {
    return `
    ${title("Ma'at", "Maat: the feather at the heart of it", "Truth, balance, justice and harmony. The idea this whole community is built on.")}
    <section class="split">
      <article class="panel stone prose">
        <h2>Who is Maat?</h2>
        <p>In ancient Egypt, <b>maat</b> was both an idea and a goddess. The idea meant the right order of things: truth, fairness, balance and harmony, in the universe and between people. The goddess Maat was shown as a woman wearing a single ostrich feather.</p>
        <p>Its opposite was <b>isfet</b>: chaos, lies and injustice. Kings were expected to uphold maat, and ordinary people were taught to live by it. The wisdom text known as the <i>Instruction of Ptahhotep</i> teaches that maat is great and lasting.</p>
      </article>
      <div class="panel scales-wrap">${scales(0)}<p class="cap">Heart (ib) on one side, the feather of Maat on the other.</p></div>
    </section>

    <section class="panel prose lapis">
      <h2>The Weighing of the Heart</h2>
      <p>In the <i>Book of the Dead</i> (best known from Spell 125, New Kingdom, from about 1550 BCE), a person who has died enters the Hall of the Two Truths. Their heart is placed on a scale against Maat's feather. Anubis tends the scales and Thoth, the god of writing, records the result. The person declares the wrongs they did <i>not</i> do, in front of 42 judges.</p>
      <p>A heart in balance with the feather means a life lived in truth, and the way on is open. A heart heavy with wrongdoing is eaten by Ammit, a beast that is part crocodile, part lion and part hippo.</p>
    </section>

    <section>
      <div class="row-head"><h2>Heart, ba and ka</h2></div>
      <p class="muted narrow">The Egyptians thought a person was made of several parts. Their writings about these parts are among the earliest surviving attempts to describe the mind, the self and consciousness.</p>
      <div class="souls">
        <div class="soul"><div class="soul-ico">♥</div><h3>Ib · the heart</h3><p>The seat of thought, feeling, memory, will and conscience. Egyptians believed you thought with your heart, which is why it was the heart, not the brain, that was weighed.</p></div>
        <div class="soul"><div class="soul-ico">🕊</div><h3>Ba · the personality</h3><p>Often translated as "soul". Shown as a bird with a human head, the ba was what made you <i>you</i>, and could move between the tomb and the world of the living.</p></div>
        <div class="soul"><div class="soul-ico">☥</div><h3>Ka · the life force</h3><p>The vital spark given at birth, a kind of spiritual double. It stayed with the body after death and was cared for with offerings of food and drink.</p></div>
      </div>
      <p class="muted narrow small">Other parts included the <b>ren</b> (your name), the <b>shut</b> (your shadow) and the <b>akh</b> (the transformed spirit, the reunion of ka and ba after death).</p>
    </section>

    <section class="panel stone prose">
      <h2>Among the earliest writings on the inner self</h2>
      <p>The <b>Pyramid Texts</b>, carved inside royal pyramids from about 2400 BCE, are among the oldest religious writings known anywhere, and they already talk about the ba and ka.</p>
      <p>A few centuries later, a Middle Kingdom poem known as <i>The Dialogue of a Man and His Ba</i> shows a man arguing with his own soul through a dark time in his life. It is often described as among the earliest known writings to explore a person's inner voice, the kind of conversation many of us still have with ourselves today.</p>
      <p class="muted small">History note: dates are approximate and scholars translate these words in different ways. This page is an introduction, not a final word.</p>
      <a class="btn gold" href="#/house-of-life">Having that inner conversation yourself? Wellbeing →</a>
    </section>`;
  }

  function viewHalls() {
    return `${title("The Halls", "Find your hall", "Every hall runs on Maat: be honest, be fair, be kind.")}
      <div class="carts">${D.halls.map(hallTile).join("")}</div>`;
  }

  function postHtml(p) {
    const m = D.members[p.by] || D.members.code;
    return `<article class="post">${avatar(m.name, m.tint)}<div><div class="post-h"><b>${esc(m.name)}</b> <span class="muted">${m.handle} · ${p.w}</span></div><p>${esc(p.t)}</p>
      <div class="post-a"><button data-gift-post>🪶 Feather</button><button data-noop>Reply</button></div></div></article>`;
  }

  function viewHall(id) {
    const h = D.halls.find((x) => x.id === id);
    if (!h) return viewHalls();
    const mine = S.posts.filter((p) => p.hall === id);
    const all = [...mine, ...(D.posts[id] || [])];
    const care = id === "mind" ? `<div class="notice">Peer support only. If you're struggling right now, see <a href="#/house-of-life">Wellbeing</a> for Samaritans (116 123), Shout (text 85258) and NHS 111.</div>` : "";
    return `${title(`Hall · ${h.glyph}`, h.name, h.line)}${care}
      <div class="panel composer"><textarea id="post-text" maxlength="400" placeholder="Share something true with the ${esc(h.name)} hall…"></textarea>
        <div class="row"><span class="muted small">Demo: saved in this browser only</span><button class="btn gold" id="post-btn" data-hall="${id}">Post</button></div></div>
      <div class="feed">${all.map(postHtml).join("")}</div>`;
  }

  function votesFor(id) { return S.votes[id] || { a: 0, b: 0 }; }

  function viewArena() {
    return `${title("VS Arena", "Talent, not beef", "Skill against skill. Vote for the best performance, not the loudest mouth.")}
      <div class="rules"><span>⚖ Respect your opponent</span><span>✋ No disses about family, race, faith or looks</span><span>🗳 One fair vote each round</span></div>
      <div class="battles">${D.battles.map((b) => `
        <a class="battle" href="#/arena/${b.id}">
          <span class="tag ${b.status === "Live demo" ? "live" : ""}">${b.status}</span>
          <span class="b-type">${b.type}</span>
          <span class="b-vs">${avatar(b.a, "#d4a843", 46)}<i>VS</i>${avatar(b.b, "#2bb6b0", 46)}</span>
          <span class="b-names">${esc(b.a)} · ${esc(b.b)}</span>
        </a>`).join("")}</div>`;
  }

  function viewBattle(id) {
    const b = D.battles.find((x) => x.id === id);
    if (!b) return viewArena();
    const v = votesFor(id), tot = v.a + v.b || 1, pa = Math.round((v.a / tot) * 100);
    return `${title(`VS Arena · ${b.type}`, `${esc(b.a)} <span class="gold">vs</span> ${esc(b.b)}`, "Demo room. Votes, chat and gifts stay in your browser.")}
      <div class="stage">
        <div class="side"><div class="screen">${avatar(b.a, "#d4a843", 90)}<span>${esc(b.a)}</span></div><button class="btn gold" data-vote="${id}:a">Vote ${esc(b.a)}</button></div>
        <div class="mid"><div class="timer" id="timer">03:00</div>${scales(Math.max(-14, Math.min(14, (v.b - v.a) * 2)))}<div class="meter"><span style="width:${v.a + v.b ? pa : 50}%"></span></div><div class="small muted">${v.a} – ${v.b} votes</div></div>
        <div class="side"><div class="screen teal">${avatar(b.b, "#2bb6b0", 90)}<span>${esc(b.b)}</span></div><button class="btn teal" data-vote="${id}:b">Vote ${esc(b.b)}</button></div>
      </div>
      <div class="split">
        <div class="panel"><h3>Send a demo gift</h3><p class="muted small">Balance: <b class="gold" id="bal2">${S.bal}</b> C-Notes (demo)</p>
          <div class="row">${D.gifts.map((g) => `<button class="gift" data-gift="${g.c}" data-e="${g.e}">${g.e} ${g.n} · ${g.c}</button>`).join("")}</div></div>
        <div class="panel"><h3>Room chat</h3><div class="chat" id="chat">${(S.chat.filter((c) => c.r === id).slice(-12).map((c) => `<p><b>You:</b> ${esc(c.t)}</p>`).join("")) || '<p class="muted">Keep it about the talent.</p>'}</div>
          <div class="row"><input id="chat-in" maxlength="140" placeholder="Say something kind…" aria-label="Chat message"><button class="btn gold" id="chat-send" data-room="${id}">Send</button></div></div>
      </div>
      <a class="btn ghost" href="#/arena">← All battles</a>`;
  }

  function viewLab() {
    return `${title("Concept Lab", "Ideas worth building", "Concepts presented by AI hosts. Every host is AI-generated and labelled. Ideas are owned by Hoodlum Asylum Concept Lab.")}
      <div class="notice">🤖 <b>Honesty note:</b> the hosts below are AI presenters, not real inventors or real people. All concepts belong to <b>Hoodlum Asylum Concept Lab</b>. Backing here is a demo with no money involved.</div>
      <div class="concepts">${D.concepts.map((c) => {
        const h = D.hosts.find((x) => x.id === c.host);
        const backed = S.backed.includes(c.id);
        return `<article class="concept">
          <div class="c-top"><span class="tag">${c.type}</span><span class="ai">AI host</span></div>
          <h3>${esc(c.title)}</h3><p>${esc(c.blurb)}</p>
          <div class="host">${avatar(h.name, h.tint, 38)}<div><b>${h.name}</b> <span class="ai">AI</span><div class="muted small">${h.role} · ${h.voice}</div></div></div>
          <div class="owner">Owned by Hoodlum Asylum Concept Lab</div>
          <button class="btn ${backed ? "ghost" : "gold"}" data-back="${c.id}" ${backed ? "disabled" : ""}>${backed ? "Backed ✓ (demo)" : "Back this idea"}</button>
        </article>`;
      }).join("")}</div>`;
  }

  function viewTreasury() {
    return `${title("The Treasury", "C-Notes", "Gift creators in battles and halls. This preview uses demo C-Notes only.")}
      <div class="split">
        <div class="panel vault"><span class="coin big"></span><div><div class="muted small">Demo balance</div><div class="huge" id="bal3">${S.bal}</div><div class="muted small">C-Notes</div></div></div>
        <div class="panel"><h3>Demo actions</h3>
          <div class="row"><button class="btn gold" id="topup">+50 demo C-Notes</button><button class="btn ghost" id="reset">Reset demo</button></div>
          <p class="muted small">Everything here is demo C-Notes. No real money is taken or paid out.</p></div>
      </div>
      <div class="notice"><b>Coming soon: real-money gifting.</b> Buying C-Notes and creator payouts are not live yet. When they launch, they will be <b>18+ only</b> and <b>ID-checked</b> through a regulated payment provider. Until then, every gift on this site is demo only.</div>
      <div>
      </div>
      <div class="panel"><h3>Gifts</h3><div class="row">${D.gifts.map((g) => `<span class="gift static">${g.e} ${g.n} · ${g.c}</span>`).join("")}</div></div>`;
  }

  function viewCare() {
    return `${title("House of Life", "Wellbeing", "The Egyptians had a 'House of Life' for learning and healing. Ours is for looking after your mind.")}
      <div class="notice warn"><b>In danger right now?</b> Call <a href="tel:999">999</a> or go to A&amp;E.</div>
      <div class="helplines">
        <a class="help" href="tel:116123"><span class="h-n">116 123</span><b>Samaritans</b><span>Free, 24/7, any time you need to talk.</span></a>
        <a class="help" href="sms:85258"><span class="h-n">85258</span><b>Shout</b><span>Text SHOUT to 85258. Free, 24/7 text support.</span></a>
        <a class="help" href="tel:111"><span class="h-n">111</span><b>NHS 111</b><span>Urgent help that isn't an emergency. Choose the mental health option.</span></a>
      </div>
      <div class="split">
        <div class="panel prose"><h3>What this place is</h3><p>Hoodlum Asylum is peer support: people listening to people. We're not doctors or therapists, and nothing here is medical advice.</p><p>If something you're taking or going through is worrying you, your GP or pharmacist is a good next step.</p></div>
        <div class="panel prose"><h3>Balance the scales today</h3><ul class="ticks"><li>One true thing you can say out loud</li><li>One kind thing for someone else</li><li>One thing to put down for tonight</li><li>Water, food, some daylight, some sleep</li></ul></div>
      </div>`;
  }

  const routes = { "": viewHome, home: viewHome, maat: viewMaat, halls: viewHalls, hall: viewHall, arena: (a) => (a ? viewBattle(a) : viewArena()), lab: viewLab, search: viewSearch, treasury: viewTreasury, "house-of-life": viewCare };
  let timer;
  function render() {
    const [r, a] = location.hash.replace(/^#\/?/, "").split("/");
    const fn = routes[r] || viewHome;
    $("#view").innerHTML = fn(a);
    const nav = r === "hall" ? "halls" : (r || "home");
    const side = r === "hall" ? "hall-" + a : (r || "home");
    $$(".sb").forEach((x) => x.classList.toggle("on", x.dataset.r === side));
    closeMenu();
    $$("[data-r]").forEach((x) => x.classList.toggle("on", x.dataset.r === nav));
    bind();
    clearInterval(timer);
    if (r === "arena" && a) { let s = 180; timer = setInterval(() => { s = Math.max(0, s - 1); const t = $("#timer"); if (t) t.textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; }, 1000); }
    window.scrollTo(0, 0);
    save();
  }

  function float(e, x, y) { const n = document.createElement("div"); n.className = "float"; n.textContent = e; n.style.left = x + "px"; n.style.top = y + "px"; document.body.appendChild(n); setTimeout(() => n.remove(), 1300); }

  function bind() {
    const pb = $("#post-btn");
    if (pb) pb.onclick = () => { const t = $("#post-text").value.trim(); if (!t) return toast("Write something first"); S.posts.unshift({ by: "code", t, w: "now", hall: pb.dataset.hall }); save(); toast("Posted (demo)"); render(); };
    $$("[data-vote]").forEach((b) => b.onclick = () => { const [id, s] = b.dataset.vote.split(":"); S.votes[id] = votesFor(id); S.votes[id][s]++; save(); toast("Vote counted (demo)"); render(); });
    $$("[data-gift]").forEach((b) => b.onclick = (ev) => { const c = +b.dataset.gift; if (S.bal < c) return toast("Not enough demo C-Notes"); S.bal -= c; save(); const b2 = $("#bal2"); if (b2) b2.textContent = S.bal; float(b.dataset.e, ev.clientX, ev.clientY); toast(`Sent ${c} demo C-Notes`); });
    $$("[data-gift-post]").forEach((b) => b.onclick = (ev) => { if (S.bal < 5) return toast("Not enough demo C-Notes"); S.bal -= 5; save(); float("🪶", ev.clientX, ev.clientY); toast("Sent a feather (5 demo C-Notes)"); });
    $$("[data-noop]").forEach((b) => b.onclick = () => toast("Replies come in a later build"));
    $$("[data-back]").forEach((b) => b.onclick = () => { S.backed.push(b.dataset.back); save(); toast("Backed (demo, no money)"); render(); });
    const cs = $("#chat-send");
    if (cs) { const go = () => { const i = $("#chat-in"), t = i.value.trim(); if (!t) return; S.chat.push({ r: cs.dataset.room, t }); S.chat = S.chat.slice(-60); save(); render(); }; cs.onclick = go; $("#chat-in").onkeydown = (e) => { if (e.key === "Enter") go(); }; }
    const tu = $("#topup"); if (tu) tu.onclick = () => { S.bal += 50; save(); render(); toast("+50 demo C-Notes"); };
    const rs = $("#reset"); if (rs) rs.onclick = () => { localStorage.removeItem(KEY); location.reload(); };
  }

  let slideI = 0;
  function swapSlide() { const c = $(".carousel"); if (!c) return; const t = document.createElement("div"); t.innerHTML = viewHome(); c.replaceWith(t.querySelector(".carousel")); }
  setInterval(() => { if ((location.hash.replace(/^#\/?/, "") || "home") === "home" && !document.hidden) { slideI++; swapSlide(); } }, 6000);
  document.addEventListener("click", (e) => { const d = e.target.closest("[data-slide]"); if (d) { slideI = +d.dataset.slide; swapSlide(); } });
  const openMenu = () => { document.body.classList.add("menu"); $("#burger").setAttribute("aria-expanded", "true"); };
  function closeMenu() { document.body.classList.remove("menu"); $("#burger").setAttribute("aria-expanded", "false"); }
  $("#burger").onclick = () => document.body.classList.contains("menu") ? closeMenu() : openMenu();
  $("#scrim").onclick = closeMenu;
  $("#search").onsubmit = (e) => { e.preventDefault(); const q = $("#q").value.trim(); if (q) location.hash = "#/search/" + encodeURIComponent(q); };
  sidebar();
  rightcol();
  window.addEventListener("hashchange", render);
  render();
})();
