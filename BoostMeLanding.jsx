import { useEffect, useRef, useState } from "react";

const BRAND = {
  magenta: "#E0128B",
  orange: "#F68920",
  cream: "#FFF8F0",
  charcoal: "#2B2118",
};

const CAPPUCCINO_IMG = "https://res.cloudinary.com/jrag9ksp/image/upload/v1785356755/coffee_boost_me_kut0q4.webp";

const LOGO_WHITE_IMG = "data:image/png;base64,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";

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
      "יש לך תהליך שגוזל שעות וכלי AI שיכול לעשות אותו בדקות. אני מזהה את הכלי הנכון, מטמיעה אותו אצלך, ומוודאת שהוא באמת עובד - לא רק בהדגמה.",
    time: "זמן הכנה: 3-5 ימי עבודה",
    accent: BRAND.magenta,
    badge: "הכי פופולרי",
  },
  {
    icon: ICONS.eye,
    name: "בוסט פרספקטיבה",
    tagline: "עין חיצונית, בלי הבלבול.",
    body:
      "קרובים מדי לבעיה כדי לראות אותה. אני נכנסת, מאבחנת מה באמת תקוע, ויוצאת עם פתרון קונקרטי - לא דוח של 40 עמודים שאף אחד לא יקרא.",
    time: "זמן הכנה: פגישת זום אחת + סיכום תוך 2 ימי עבודה",
    accent: BRAND.orange,
    badge: null,
  },
  {
    icon: ICONS.book,
    name: "הדרכה וסדנה",
    tagline: "מבינים AI בלי לפחד ממנו.",
    body:
      "סדנה ממוקדת בזום לצוות או לבעל עסק - מה זה בעצם AI, איך משתמשים בו נכון, ואיפה הוא יכול לחסוך לך זמן כבר מחר בבוקר.",
    time: "זמן הכנה: מותאם - סדנה בודדת או סדרה",
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
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 24px 60px",
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
            לא מערכת הוליסטית. לא אסטרטגיה מולטי-ערוצית. בעיה אחת אצלך, פתרון אחד שעובד - תוך ימים, לא חודשים.
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
            דברו איתי בוואטסאפ
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
              שלושה בוסטים. לא תפריט ענק.
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
            ספרו לי מה תקוע - ותוך 2 ימי עבודה תדעו בדיוק איזה בוסט מתאים לכם.
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
