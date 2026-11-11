/* Demo data only. No backend, no real payments. */
window.HA = {
  halls: [
    { id: "music", name: "Music & Audio", glyph: "♫", line: "Beats, bars, stems and live sessions" },
    { id: "mind", name: "Mental Health", glyph: "♥", line: "Peer support. Listening, not diagnosing" },
    { id: "creators", name: "Artists & Creators", glyph: "✎", line: "Art, design, video and craft" },
    { id: "gaming", name: "Gaming", glyph: "◈", line: "Co-op nights, clips and friendly clashes" },
    { id: "podcast", name: "Podcasts & Talks", glyph: "◉", line: "Real stories, spiritual talks, culture" },
    { id: "film", name: "Film & Media", glyph: "▶", line: "Shorts, edits and screenings" },
    { id: "spirit", name: "Spirit & Ancestry", glyph: "☥", line: "Maat, history, reflection" },
    { id: "fitness", name: "Sport & Fitness", glyph: "▲", line: "Walks, training, challenges" },
    { id: "style", name: "Fashion & Hair", glyph: "✂", line: "Fits, cuts, brands you built" },
    { id: "community", name: "Community & Charity", glyph: "⚖", line: "Projects that put good back" },
    { id: "events", name: "Gatherings", glyph: "☼", line: "Meet ups and live nights" },
    { id: "support", name: "Support & Advice", glyph: "✚", line: "Helplines and real help", href: "#/house-of-life" }
  ],
  members: {
    code: { name: "Code", handle: "@code", tint: "#d4a843" },
    nefa: { name: "Nefa R.", handle: "@nefabeats", tint: "#2bb6b0" },
    kay: { name: "Kay O.", handle: "@kaycreates", tint: "#3d6fd1" },
    sol: { name: "Sol T.", handle: "@solstories", tint: "#c46a3a" },
    max: { name: "Max D.", handle: "@maxplays", tint: "#8d5bd1" }
  },
  posts: {
    music: [
      { by: "nefa", t: "New beat up in the Arena queue. 140 BPM, heavy drums. Who's got bars?", w: "2h" },
      { by: "code", t: "Open stems for the Feather & Flame collab are in the Concept Lab.", w: "6h" }
    ],
    mind: [
      { by: "sol", t: "Rough week, but tonight's check-in circle helped. You're not on your own.", w: "1h" },
      { by: "code", t: "Reminder: this hall is for listening, not diagnosing. Helplines are on the Wellbeing page.", w: "4h" }
    ],
    creators: [{ by: "kay", t: "Sketching a gold-leaf feather piece. Drop your process shots below.", w: "3h" }],
    gaming: [{ by: "max", t: "Co-op night Friday. Bring a mate, bring patience. Respect over rage.", w: "5h" }],
    podcast: [{ by: "sol", t: "Episode idea: what Maat means on a council estate in 2026.", w: "1d" }],
    film: [{ by: "kay", t: "Short film night next month. Upload your cut to enter.", w: "8h" }],
    spirit: [{ by: "code", t: "Maat every day and night. Truth, balance, justice. Share what keeps you balanced.", w: "2h" }],
    fitness: [{ by: "max", t: "Sunrise walk challenge: 7 days, 7 photos of the sky.", w: "9h" }],
    style: [{ by: "kay", t: "Purple and gold fit check. Hoodlum colours.", w: "1d" }],
    community: [{ by: "sol", t: "Food bank drop-off list is pinned. Every tin counts.", w: "7h" }],
    events: [{ by: "code", t: "First Hoodlum Asylum gathering: open mic + live podcast. Date soon.", w: "12h" }]
  },
  hosts: [
    { id: "ama", name: "Ama", role: "Music & sound", voice: "Warm London voice", tint: "#2bb6b0" },
    { id: "ren", name: "Ren", role: "Inventions & tech", voice: "Calm Midlands voice", tint: "#3d6fd1" },
    { id: "iset", name: "Iset", role: "Art & design", voice: "Bright Northern voice", tint: "#d4a843" },
    { id: "bek", name: "Bek", role: "Community projects", voice: "Steady Bristol voice", tint: "#c46a3a" }
  ],
  concepts: [
    { id: "feather-flame", title: "Feather & Flame", type: "Music", host: "ama", blurb: "An open collab track pack: drums, chants and pads for members to remix stories of struggle, balance and coming back stronger." },
    { id: "sunpack", title: "Sun-Disc Daypack", type: "Invention", host: "ren", blurb: "A backpack with a fold-out solar strip to keep a phone alive on long days out and night shifts." },
    { id: "wall-of-truth", title: "Wall of Truth Mural", type: "Art", host: "iset", blurb: "A community mural kit: gold feathers painted by everyone who shares one honest thing they've overcome." },
    { id: "calm-booth", title: "Calm Booth", type: "Invention", host: "ren", blurb: "A pop-up recording booth so peer groups can record mental health podcasts in libraries and youth centres." },
    { id: "scales-cards", title: "Scales Daily Cards", type: "Community", host: "bek", blurb: "A deck of daily prompts: one truth, one kindness, one thing to let go. Balance the scales each day." }
  ],
  battles: [
    { id: "bars", type: "Bars", a: "Nefa R.", b: "Lyric Ra", status: "Live demo" },
    { id: "beats", type: "Beat-Making", a: "Max D.", b: "Drum Oasis", status: "Open" },
    { id: "art", type: "Speed Art", a: "Kay O.", b: "Ink Nile", status: "Upcoming" },
    { id: "hair", type: "Cut vs Cut", a: "Fade House", b: "Sharp Lines", status: "Upcoming" },
    { id: "fits", type: "Fit Clash", a: "Gold Thread", b: "Reworked", status: "Upcoming" },
    { id: "game", type: "Gaming", a: "Max D.", b: "PadQueen", status: "Open" },
    { id: "dance", type: "Dance", a: "Move Temple", b: "Pulse Crew", status: "Upcoming" },
    { id: "debate", type: "Debate", a: "Sol T.", b: "Kay O.", status: "Open" }
  ],
  trending: [
    { t: "Feather & Flame stems", s: "Music · Concept Lab", g: "♫", c: "#2bb6b0", h: "#/lab" },
    { t: "Bars: Nefa R. vs Lyric Ra", s: "VS Arena · live demo", g: "⚔", c: "#c46a3a", h: "#/arena/bars" },
    { t: "Check-in circle stories", s: "Mental Health hall", g: "♥", c: "#3d6fd1", h: "#/hall/mind" },
    { t: "What Maat means today", s: "Podcasts & Talks", g: "◉", c: "#d4a843", h: "#/hall/podcast" },
    { t: "Wall of Truth mural", s: "Artists & Creators", g: "✎", c: "#8d5bd1", h: "#/hall/creators" }
  ],
  events: [
    { d: "FRI", t: "Co-op Games Night", s: "Gaming hall · online" },
    { d: "SAT", t: "Open Mic & Live Podcast", s: "Gatherings · venue TBC" },
    { d: "SUN", t: "Sunrise Walk Challenge", s: "Sport & Fitness" }
  ],
  slides: [
    { k: "Podcasts & Live Talks", h: "Real stories, said out loud", items: ["Spirit & ancestry talks", "Mental health conversations", "Life stories from the ends", "Culture, history and Maat"], go: "#/hall/podcast", cta: "Listen in" },
    { k: "VS Arena", h: "Talent, not beef", items: ["Bars and beat battles", "Speed art and fit clashes", "Fair votes, kind chat", "Demo gifts for creators"], go: "#/arena", cta: "Enter the Arena" },
    { k: "Concept Lab", h: "Ideas worth building", items: ["AI hosts, clearly labelled", "Music, art and inventions", "Back the ideas you love", "Owned by Hoodlum Asylum Concept Lab"], go: "#/lab", cta: "See the ideas" }
  ],
  gifts: [
    { n: "Feather", c: 5, e: "🪶" },
    { n: "Ankh", c: 20, e: "☥" },
    { n: "Golden Scales", c: 50, e: "⚖️" }
  ]
};
