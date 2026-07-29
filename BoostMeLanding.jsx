import { useEffect, useRef, useState } from "react";

const BRAND = {
  magenta: "#E0128B",
  orange: "#F68920",
  cream: "#FFF8F0",
  charcoal: "#2B2118",
};

const CAPPUCCINO_IMG = "https://res.cloudinary.com/jrag9ksp/image/upload/v1785356755/coffee_boost_me_kut0q4.webp";

const LOGO_WHITE_IMG = "https://res.cloudinary.com/jrag9ksp/image/upload/v1785356847/white_logo_cpm31h.png";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const ICONS = {
  ai: (
    <svg viewBox="0 0 48 48" width="34" height="34" fill="none">
      <circle cx="24" cy="24" r="20" stroke={BRAND.magenta} strokeWidth="2.5" />
      <path d="M24 14v8l6 4" stroke={BRAND.magenta} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="2.5" fill={BRAND.magenta} />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 48 48" width="34" height="34" fill="none">
      <path d="M6 24c4-8 12-13 18-13s14 5 18 13c-4 8-12 13-18 13S10 32 6 24Z" stroke={BRAND.orange} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="6" stroke={BRAND.orange} strokeWidth="2.5" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 48 48" width="34" height="34" fill="none">
      <path d="M9 10c5-2 11-2 15 1v27c-4-3-10-3-15-1V10Z" stroke={BRAND.magenta} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M39 10c-5-2-11-2-15 1v27c4-3 10-3 15-1V10Z" stroke={BRAND.magenta} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  whisk: (
    <svg viewBox="0 0 48 48" width="20" height="20" fill="none">
      <path d="M14 34 32 16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="17" cy="31" rx="9" ry="5" transform="rotate(-45 17 31)" stroke="#fff" strokeWidth="2.2" />
      <circle cx="34" cy="14" r="3" fill="#fff" />
    </svg>
  ),
};

const SERVICES = [
  {
    icon: ICONS.ai,
    name: "בוסט AI",
    tagline: "כלי אחד. בעיה אחת פחות.",
    body:
      "יש לך תהליך שגוזל שעות וכלי AI שיכול לעשות אותו בדקות. אנחנו מזהים את הכלי הנכון, מטמיעים אותו אצלך, ומוודאים שהוא באמת עובד, לא רק בהדגמה.",
    time: "משך הבנייה: 3-5 ימי עבודה מאישור הצעת המחיר",
    accent: BRAND.magenta,
    badge: "הכי פופולרי",
  },
  {
    icon: ICONS.eye,
    name: "בוסט פרספקטיבה",
    tagline: "עין חיצונית, בלי הבלבול.",
    body:
      "קרובים מדי לבעיה כדי לראות אותה. אנחנו נכנסים, מאבחנים מה באמת תקוע, ויוצאים עם פתרון קונקרטי, לא דוח של 40 עמודים שאף אחד לא יקרא.",
    time: "משך הבנייה: פגישת זום אחת, וסיכום תוך 2 ימי עבודה מאישור הצעת המחיר",
    accent: BRAND.orange,
    badge: null,
  },
  {
    icon: ICONS.book,
    name: "הדרכה וסדנה, או שיעור פרטי",
    tagline: "מבינים AI בלי לפחד ממנו.",
    body:
      "מפגש ממוקד בזום: לצוות, לבעל עסק, או אישי אחד-על-אחד. מה זה בעצם AI, איך משתמשים בו נכון, ואיפה הוא יכול לחסוך לך זמן כבר מחר בבוקר.",
    time: "מותאם לפי היקף, מועד בתיאום לאחר אישור הצעת מחיר",
    accent: BRAND.charcoal,
    badge: null,
  },
];

export default function BoostMeLanding() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div dir="rtl" style={{ fontFamily: "'Rubik', sans-serif", background: BRAND.cream, color: BRAND.charcoal }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
        .grain::before {
          content: "";
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px);
          background-size: 3px 3px;
          opacity: 0.5;
          pointer-events: none;
        }
        .card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(43,33,24,0.12); }
        .whatsapp-btn:hover { transform: scale(1.04); }
      `}</style>

      {/* HERO */}
      <section
        className="grain"
        style={{
          position: "relative",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "60px 24px",
          background: `linear-gradient(135deg, ${BRAND.magenta}, ${BRAND.orange})`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <img
            src={LOGO_WHITE_IMG}
            alt="Boost Me"
            style={{ width: 210, height: "auto", margin: "0 auto 28px", display: "block" }}
          />
          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 6vw, 4.4rem)",
              color: "#fff",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            כאב אחד.<br />פתרון אחד.<br />בוסט אחד.
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              maxWidth: 520,
              margin: "26px auto 0",
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            בלי מערכת הוליסטית. בלי אסטרטגיה מולטי-ערוצית. רק בעיה אחת, ופתרון אחד שעובד, תוך ימים, לא חודשים.
          </p>
          <a
            href="#"
            className="whatsapp-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "#25D366",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              padding: "13px 26px",
              borderRadius: 999,
              textDecoration: "none",
              margin: "32px auto 0",
              boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
              transition: "transform 0.25s ease",
            }}
          >
            <svg viewBox="0 0 32 32" width="19" height="19" fill="#fff">
              <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.42.687 4.68 1.878 6.6L3 29l7.086-2.34a12.44 12.44 0 0 0 5.915 1.5h.006c6.905 0 12.5-5.596 12.5-12.5S22.906 3 16.001 3zm0 22.7h-.005a10.2 10.2 0 0 1-5.2-1.424l-.373-.222-3.86 1.276 1.293-3.76-.243-.386a10.18 10.18 0 0 1-1.563-5.484c0-5.634 4.585-10.22 10.221-10.22 2.73 0 5.294 1.064 7.225 2.997a10.15 10.15 0 0 1 2.994 7.228c0 5.635-4.585 10.221-10.221 10.221l.001-.001zm5.598-7.653c-.307-.153-1.815-.896-2.096-.998-.281-.102-.486-.153-.69.153-.204.307-.792.998-.972 1.203-.179.204-.358.23-.665.077-.307-.154-1.296-.478-2.469-1.523-.913-.814-1.529-1.82-1.708-2.127-.179-.307-.019-.473.135-.626.138-.138.307-.358.46-.537.154-.18.205-.307.307-.512.102-.204.051-.383-.026-.537-.077-.153-.69-1.664-.945-2.28-.249-.6-.502-.518-.69-.527l-.588-.01c-.204 0-.537.077-.818.383s-1.075 1.05-1.075 2.562 1.1 2.973 1.253 3.178c.153.204 2.166 3.306 5.248 4.635.733.316 1.305.505 1.751.647.735.234 1.404.2 1.933.121.59-.088 1.815-.742 2.071-1.459.256-.716.256-1.331.179-1.459-.076-.128-.281-.204-.588-.358z"/>
            </svg>
            דברו איתנו בוואטסאפ
          </a>
          <div
            style={{
              width: 26,
              height: 42,
              borderRadius: 14,
              border: "2px solid rgba(255,255,255,0.6)",
              display: "flex",
              justifyContent: "center",
              paddingTop: 8,
              margin: "36px auto 0",
            }}
          >
            <div
              style={{
                width: 4,
                height: 8,
                borderRadius: 2,
                background: "#fff",
                animation: "scrollDot 1.6s ease-in-out infinite",
              }}
            />
          </div>
          <style>{`@keyframes scrollDot { 0%,100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(10px); opacity: 0.4; } }`}</style>
        </div>
      </section>

      {/* MENU / SERVICES */}
      <section style={{ position: "relative", padding: "100px 24px 150px", maxWidth: 1080, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ color: BRAND.magenta, fontWeight: 600, fontSize: 14, letterSpacing: "0.08em", marginBottom: 10 }}>
              התפריט
            </div>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", margin: 0 }}>
              שלושה בוסטים. בוחרים אחד (או יותר).
            </h2>
            <p style={{ color: "#6b5f52", fontSize: 17, maxWidth: 480, margin: "14px auto 0" }}>
              כל בוסט נבנה לכאב ספציפי אחד. בוחרים את זה שמתאים, ומתחילים.
            </p>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.12}>
              <div
                className="card"
                style={{
                  position: "relative",
                  background: "#fff",
                  borderRadius: 20,
                  padding: "32px 26px",
                  height: "100%",
                  border: "1px solid rgba(43,33,24,0.06)",
                  borderTop: `4px solid ${s.accent}`,
                  transition: "transform 0.35s ease, box-shadow 0.35s ease",
                }}
              >
                {s.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: -13,
                      insetInlineStart: 26,
                      background: s.accent,
                      color: "#fff",
                      fontSize: 12.5,
                      fontWeight: 700,
                      padding: "5px 14px",
                      borderRadius: 999,
                      boxShadow: "0 4px 10px rgba(43,33,24,0.18)",
                    }}
                  >
                    {s.badge}
                  </div>
                )}
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 14,
                    background: "#FBEFE4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  {s.icon}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 21, margin: "0 0 4px" }}>{s.name}</h3>
                <div style={{ color: s.accent, fontWeight: 600, fontSize: 14.5, marginBottom: 14 }}>
                  {s.tagline}
                </div>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#4a4038", margin: "0 0 18px" }}>{s.body}</p>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "#8a7c6c",
                    borderTop: "1px dashed #e5dccf",
                    paddingTop: 14,
                  }}
                >
                  {s.time}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MORE SERVICES */}
      <section style={{ position: "relative", padding: "0 24px 130px", maxWidth: 820, margin: "0 auto" }}>
        <Reveal>
          <div
            style={{
              textAlign: "center",
              marginBottom: 22,
              border: "1px solid #e5dccf",
              borderRadius: 14,
              padding: "16px 22px",
            }}
          >
            <p style={{ color: "#a89a89", fontSize: 14.5, margin: 0 }}>
              ויש עוד ביד: אוטומציה, עמודי נחיתה, שאלונים אינטראקטיביים, ואסטרטגיית SEO / AEO / GEO.
            </p>
          </div>
        </Reveal>

        <img
          src={CAPPUCCINO_IMG}
          alt="קפוצ'ינו עם ציור הבוט של Boost Me"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 45%)",
            width: 190,
            height: "auto",
            zIndex: 2,
          }}
        />
      </section>

      {/* CTA */}
      <section
        style={{
          position: "relative",
          background: `linear-gradient(135deg, ${BRAND.orange}, ${BRAND.magenta})`,
          padding: "90px 24px",
          textAlign: "center",
        }}
      >
        <Reveal>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", margin: "0 0 16px" }}>
            מוכנים לבוסט ראשון?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.92)", fontSize: 17, maxWidth: 440, margin: "0 auto 18px" }}>
            ספרו לנו מה תקוע, ותוך 2 ימי עבודה תדעו בדיוק איזה בוסט מתאים לכם.
          </p>
          <a
            href="#"
            className="whatsapp-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#25D366",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              padding: "16px 30px",
              borderRadius: 999,
              textDecoration: "none",
              transition: "transform 0.25s ease",
              boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
            }}
          >
            <span
              style={{
                width: 26,
                height: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg viewBox="0 0 32 32" width="22" height="22" fill="#fff">
                <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.42.687 4.68 1.878 6.6L3 29l7.086-2.34a12.44 12.44 0 0 0 5.915 1.5h.006c6.905 0 12.5-5.596 12.5-12.5S22.906 3 16.001 3zm0 22.7h-.005a10.2 10.2 0 0 1-5.2-1.424l-.373-.222-3.86 1.276 1.293-3.76-.243-.386a10.18 10.18 0 0 1-1.563-5.484c0-5.634 4.585-10.22 10.221-10.22 2.73 0 5.294 1.064 7.225 2.997a10.15 10.15 0 0 1 2.994 7.228c0 5.635-4.585 10.221-10.221 10.221l.001-.001zm5.598-7.653c-.307-.153-1.815-.896-2.096-.998-.281-.102-.486-.153-.69.153-.204.307-.792.998-.972 1.203-.179.204-.358.23-.665.077-.307-.154-1.296-.478-2.469-1.523-.913-.814-1.529-1.82-1.708-2.127-.179-.307-.019-.473.135-.626.138-.138.307-.358.46-.537.154-.18.205-.307.307-.512.102-.204.051-.383-.026-.537-.077-.153-.69-1.664-.945-2.28-.249-.6-.502-.518-.69-.527l-.588-.01c-.204 0-.537.077-.818.383s-1.075 1.05-1.075 2.562 1.1 2.973 1.253 3.178c.153.204 2.166 3.306 5.248 4.635.733.316 1.305.505 1.751.647.735.234 1.404.2 1.933.121.59-.088 1.815-.742 2.071-1.459.256-.716.256-1.331.179-1.459-.076-.128-.281-.204-.588-.358z"/>
              </svg>
            </span>
            בואו נדבר בוואטסאפ
          </a>
        </Reveal>
      </section>

      <footer style={{ textAlign: "center", padding: "26px", color: "#a89a89", fontSize: 13 }}>
        Boost Me · GEMS Digital Projects
      </footer>
    </div>
  );
}
