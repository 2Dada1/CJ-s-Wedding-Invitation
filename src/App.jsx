import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, CalendarDays, Check, ChevronUp, Clock3, Heart, MapPin, Music2, Pause, Play, Sparkles } from "lucide-react";
import config from "./config/weddingConfig";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

function Envelope({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 1450);
  };

  return (
    <motion.main className="intro-screen" exit={{ opacity: 0, transition: { duration: 0.8 } }}>
      <div className="intro-glow" />
      <motion.div className="intro-copy" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <span className="eyebrow light">A SPECIAL INVITATION</span>
        <h1>For the ones<br /><em>we hold dear</em></h1>
        <p>We have something beautiful to celebrate with you.</p>
      </motion.div>
      <motion.button
        className={`envelope ${opening ? "is-opening" : ""}`}
        onClick={open}
        whileHover={!opening ? { y: -7, scale: 1.015 } : {}}
        whileTap={!opening ? { scale: 0.985 } : {}}
        aria-label="Open wedding invitation"
      >
        <span className="envelope-back" />
        <span className="letter">
          <span className="letter-small">THE WEDDING OF</span>
          <span className="letter-names">Ivy Rose <i>&</i><br />Cris Jan</span>
          <span className="letter-date">{config.dateDisplay}</span>
        </span>
        <span className="envelope-front" />
        <span className="envelope-flap" />
        <span className="wax-seal"><Heart size={22} fill="currentColor" strokeWidth={1.2} /></span>
      </motion.button>
      <motion.button className="open-label" onClick={open} animate={{ opacity: [0.55, 1, 0.55] }} transition={{ repeat: Infinity, duration: 2 }}>
        <span>OPEN YOUR INVITATION</span><ArrowDown size={15} />
      </motion.button>
      <span className="intro-foot">WITH LOVE, IVY ROSE & CRIS JAN</span>
    </motion.main>
  );
}

function Countdown() {
  const target = useMemo(() => new Date(config.dateISO).getTime(), []);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const diff = Math.max(0, target - now);
  const units = [
    ["DAYS", Math.floor(diff / 86400000)],
    ["HOURS", Math.floor((diff / 3600000) % 24)],
    ["MINUTES", Math.floor((diff / 60000) % 60)],
    ["SECONDS", Math.floor((diff / 1000) % 60)]
  ];
  return <div className="countdown">{units.map(([label, value]) => <div className="count-item" key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>;
}

function SectionHeading({ kicker, title, subtitle }) {
  return <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
    <span className="eyebrow">{kicker}</span><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}
    <span className="heading-flourish">✧</span>
  </motion.div>;
}

function App() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const music = config.musicFile ? new Audio(config.musicFile) : null;

  const toggleMusic = () => {
    if (!config.musicFile) {
      alert("Add your music file path in src/config/weddingConfig.js first.");
      return;
    }
    if (!window.__weddingAudio) {
      window.__weddingAudio = new Audio(config.musicFile);
      window.__weddingAudio.loop = true;
    }
    if (musicOn) window.__weddingAudio.pause();
    else window.__weddingAudio.play().catch(() => alert("Please tap play again to start the music."));
    setMusicOn(!musicOn);
  };

  const saveDate = () => {
    const start = new Date(config.dateISO);
    const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
    const fmt = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${config.bride} & ${config.groom} — Wedding`)}&dates=${fmt(start)}/${fmt(end)}&details=${encodeURIComponent(config.invitationMessage)}&location=${encodeURIComponent(config.venue + ", " + config.venueAddress)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return <AnimatePresence mode="wait">
    {!opened ? <Envelope key="envelope" onOpen={() => setOpened(true)} /> :
      <motion.div className="site" key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
        <nav className="nav">
          <a href="#home" className="nav-mark">I <span>&</span> C</a>
          <div className="nav-links"><a href="#details">THE DETAILS</a><a href="#story">OUR STORY</a><a href="#gallery">GALLERY</a></div>
          <button className="music-button" onClick={toggleMusic} aria-label="Toggle music">{musicOn ? <Pause size={16}/> : <Music2 size={16}/>}<span>{musicOn ? "PAUSE" : "MUSIC"}</span></button>
        </nav>

        <header className="hero" id="home">
          <div className="hero-wash" />
          <div className="hero-content">
            <motion.span className="eyebrow light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}>TOGETHER WITH OUR FAMILIES</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: 1 }}>
              {config.bride}<span className="ampersand">&</span>{config.groom}
            </motion.h1>
            <motion.div className="hero-rule" initial={{ width: 0 }} animate={{ width: 90 }} transition={{ delay: .9, duration: .8 }} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>REQUEST THE HONOR OF YOUR PRESENCE</motion.p>
            <motion.div className="hero-date" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }}>
              <span>{config.dayDisplay}</span><b>{config.dateDisplay}</b>
            </motion.div>
            <a href="#details" className="scroll-cue">SCROLL TO EXPLORE <ArrowDown size={14}/></a>
          </div>
          <div className="hero-corner top-left">✧</div><div className="hero-corner bottom-right">✧</div>
        </header>

        <section className="welcome section-pad">
          <SectionHeading kicker="A NOTE FROM OUR HEARTS" title="A day made more beautiful with you" />
          <motion.p className="welcome-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>{config.invitationMessage}</motion.p>
          <motion.div className="couple-monogram" initial={{ scale: .8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}><span>I</span><i>&</i><span>C</span></motion.div>
          <p className="script-line">{config.tagline}</p>
        </section>

        {config.showCountdown && <section className="count-section">
          <span className="eyebrow light">COUNTING DOWN TO FOREVER</span><h2>Until we say “I do”</h2><Countdown />
        </section>}

        <section className="details section-pad" id="details">
          <SectionHeading kicker="JOIN US IN CELEBRATION" title="The Wedding Day" subtitle="One day, one promise, a lifetime of love." />
          <div className="details-grid">
            <motion.article className="detail-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="detail-icon"><CalendarDays /></div><span className="eyebrow">WHEN</span><h3>{config.dayDisplay}</h3><p>{config.dateDisplay}</p><div className="detail-line"/><Clock3 size={16}/><p>{config.ceremonyTime}</p><button className="text-link" onClick={saveDate}>ADD TO CALENDAR <span>↗</span></button>
            </motion.article>
            <motion.article className="detail-card featured-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }} transition={{ delay: .12 }}>
              <div className="detail-icon"><MapPin /></div><span className="eyebrow">WHERE</span><h3>{config.venue}</h3><p>{config.venueAddress}</p><div className="detail-line"/><p className="venue-note">We can't wait to celebrate with you.</p><a className="text-link" href={config.mapsUrl} target="_blank" rel="noreferrer">GET DIRECTIONS <span>↗</span></a>
            </motion.article>
          </div>
        </section>

        {config.showStory && <section className="story section-pad" id="story">
          <SectionHeading kicker="OUR JOURNEY" title="A little story, a big forever" subtitle="Every love story is special. This one is ours." />
          <div className="story-panel">
            <div className="story-orbit"><span>♥</span><i>EST. FOREVER</i></div>
            <div className="story-text"><span className="eyebrow">AND SO, OUR NEXT CHAPTER BEGINS</span><h3>From this moment<br/><em>to all the moments</em><br>still to come.</h3><p>We are grateful for every step that brought us here. Now, we look forward to making new memories with the people who mean the most to us.</p></div>
          </div>
        </section>}

        {config.showGallery && <section className="gallery section-pad" id="gallery">
          <SectionHeading kicker="MOMENTS TO TREASURE" title="Our memories" subtitle="A few little glimpses of our journey together." />
          <div className="gallery-grid">
            {config.gallery.map((item, index) => <div className={`gallery-tile tile-${index + 1}`} key={index}>
              {item.src ? <img src={item.src} alt={item.alt}/> : <div className="photo-placeholder"><Sparkles/><span>YOUR PHOTO HERE</span><small>Add an image in weddingConfig.js</small></div>}
            </div>)}
          </div>
        </section>}

        {config.showDressCode && <section className="dress section-pad"><SectionHeading kicker="DRESS CODE" title="A touch of violet" subtitle="Celebrate with us in your favorite formal attire."/><div className="swatches"><i/><i/><i/><i/><i/></div></section>}

        <section className="closing">
          <div className="closing-inner"><span className="eyebrow light">THE NEXT CHAPTER STARTS HERE</span><h2>We can't wait<br/><em>to celebrate with you.</em></h2><div className="closing-heart">♥</div><p>{config.bride} & {config.groom}</p><span className="closing-date">{config.dateDisplay}</span></div>
        </section>
        <footer><span>MADE WITH LOVE</span><b>I <i>&</i> C</b><span>{config.hashtag}</span></footer>
        <AnimatePresence>{showTop && <motion.button className="back-top" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ChevronUp/></motion.button>}</AnimatePresence>
      </motion.div>}
  </AnimatePresence>;
}

export default App;
