(function(){
  const data = window.HA;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  function account(handle){
    return data.accounts.find(a => a.handle === handle) || {name: handle, avatar:"", handle, url:"#"};
  }
  function fmtDur(s){
    s = Number(s)||0;
    const m = Math.floor(s/60), r = s%60;
    return m + ":" + String(r).padStart(2,"0");
  }
  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  }
  function card(item, opts){
    opts = opts || {};
    const acc = item.handle ? account(item.handle) : null;
    const wide = opts.wide ? " wide" : "";
    const music = item.audio ? " music-card" : "";
    const dur = item.duration ? `<span class="play">${fmtDur(item.duration)}</span>` : (item.kind==="video" || item.embed ? `<span class="play">Play</span>` : "");
    const who = acc ? `<div class="who"><img src="${acc.avatar}" alt="">@${acc.handle}</div>` : (item.author ? `<div class="who">${escapeHtml(item.author)}</div>` : "");
    const audio = item.audio ? `<audio controls preload="none" src="${item.audio}"></audio>` : "";
    return `<article class="card${wide}${music}"><a class="thumb" href="${item.url}" target="_blank" rel="noopener noreferrer"><img class="cover" src="${item.image}" alt="" loading="lazy">${dur}</a><div class="meta">${who}<h3>${escapeHtml(item.title || "Untitled")}</h3>${audio}</div></article>`;
  }
  function fill(sel, html){ const el=$(sel); if(el) el.innerHTML = html; }
  function renderGallery(filter){
    const list = filter && filter !== "all" ? data.tiktok.filter(p => p.handle===filter) : data.tiktok;
    fill("#image-grid", list.map(p => card(p)).join(""));
  }
  function renderTiktok(filter){
    const list = filter && filter !== "all" ? data.tiktok.filter(p => p.handle===filter) : data.tiktok;
    fill("#tiktok-grid", list.map(p => card(p)).join(""));
  }
  function bindAudio(){
    $$("audio").forEach(a => a.addEventListener("play", () => { $$("audio").forEach(o => { if(o!==a) o.pause(); }); }));
  }
  function renderFeed(){
    fill("#feed-grid", data.tiktok.map(p => card(p)).concat(data.music.map(p => card(p,{wide:true}))).concat(data.youtube.map(p => card({...p, kind:"video"},{wide:true}))).join(""));
    bindAudio();
  }
  function renderMusic(){
    fill("#music-grid", data.music.map(p => card(p,{wide:true})).join(""));
    bindAudio();
  }
  function renderYouTube(){
    fill("#youtube-grid", data.youtube.map(p => card({...p, kind:"video"},{wide:true})).join(""));
  }
  function renderFaces(target, key){
    const el = $(target);
    if(!el) return;
    el.innerHTML = `<button class="face on" data-handle="all" type="button"><img src="${data.site.avatar}" alt=""><span>All</span></button>` +
      data.accounts.map(a => `<button class="face" data-handle="${a.handle}" type="button"><img src="${a.avatar}" alt=""><span>@${a.handle}</span></button>`).join("");
    el.addEventListener("click", e => {
      const b = e.target.closest("[data-handle]");
      if(!b) return;
      $$(".face", el).forEach(x => x.classList.toggle("on", x===b));
      const h = b.dataset.handle;
      if(key==="images") renderGallery(h);
      if(key==="tiktok") renderTiktok(h);
    });
  }

  const sections = ["home","feed","images","tiktok","music","youtube","shop"];
  function show(id){
    const tab = sections.includes(id) ? id : "home";
    const shown = tab === "home" ? "feed" : tab;
    $$(".section").forEach(s => s.classList.toggle("on", s.id === shown));
    const home = $("#home-block");
    if(home) home.hidden = !(tab==="home" || tab==="feed");
    $$("[data-tab]").forEach(a => a.classList.toggle("on", a.dataset.tab===tab || (tab==="home" && a.dataset.tab==="feed" && a.classList.contains("tab-feed"))));
    if(tab==="home") window.scrollTo({top:0, behavior: reduced ? "auto" : "smooth"});
    history.replaceState(null, "", "#"+tab);
  }
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-tab]");
    if(!a) return;
    e.preventDefault();
    show(a.dataset.tab);
  });

  const sp = $("#stats-posts"), st = $("#stats-tiktok"), sa = $("#stats-accounts");
  if(sp) sp.textContent = String(data.tiktok.length + data.music.length + data.youtube.length);
  if(st) st.textContent = String(data.tiktok.length);
  if(sa) sa.textContent = String(data.accounts.length);

  renderFaces("#image-faces", "images");
  renderFaces("#tiktok-faces", "tiktok");
  renderFeed(); renderGallery("all"); renderTiktok("all"); renderMusic(); renderYouTube();
  show((location.hash||"#home").replace("#","") || "home");
  window.addEventListener("hashchange", () => show((location.hash||"#home").replace("#","")));

  const canvas = $("#dust");
  if(canvas && !reduced){
    const ctx = canvas.getContext("2d");
    let w,h,dots;
    function resize(){
      w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight;
      dots=Array.from({length: Math.min(70, Math.floor(w*h/18000))}, () => ({
        x:Math.random()*w, y:Math.random()*h, r:Math.random()*1.4+.2, s:Math.random()*.35+.05, a:Math.random()*.45+.1
      }));
    }
    resize();
    window.addEventListener("resize", resize);
    (function tick(){
      ctx.clearRect(0,0,w,h);
      for(const d of dots){
        d.y -= d.s; if(d.y<0) d.y=h;
        ctx.beginPath(); ctx.fillStyle = "rgba(243,211,146,"+d.a+")"; ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fill();
      }
      requestAnimationFrame(tick);
    })();
  }
  if("serviceWorker" in navigator){ navigator.serviceWorker.register("sw.js").catch(()=>{}); }
})();
