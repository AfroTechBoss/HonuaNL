/* global React */

// ============ Shared utilities ============

window.Logo = function Logo({ size = 28 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        width: size, height: size, borderRadius: 8,
        background: 'var(--green)', display: 'grid', placeItems: 'center',
        color: '#fff', fontFamily: 'Bricolage Grotesque', fontWeight: 700,
        fontSize: size * 0.55, letterSpacing: '-0.05em',
      }}>h</span>
      <span className="font-display" style={{ fontWeight: 600, fontSize: size * 0.6, color: 'var(--ink)' }}>honua</span>
    </span>
  );
};

// Avatar with optional verified-impact ring
window.Avatar = function Avatar({ src, name = 'U', size = 36, verified = false, score }) {
  const initial = (name || 'U').charAt(0).toUpperCase();
  return (
    <span style={{ position: 'relative', width: size, height: size, display: 'inline-block', flexShrink: 0 }}>
      <span style={{
        width: size, height: size, borderRadius: '50%',
        background: src ? `url(${src}) center/cover` : 'var(--green)',
        display: 'grid', placeItems: 'center', color: '#fff',
        fontWeight: 600, fontSize: size * 0.4, fontFamily: 'Geist',
        border: '2px solid var(--surface)',
      }}>{!src && initial}</span>
      {verified && (
        <span style={{
          position: 'absolute', bottom: -2, right: -2,
          width: size * 0.36, height: size * 0.36, borderRadius: '50%',
          background: 'var(--sky)', display: 'grid', placeItems: 'center',
          color: '#fff', fontSize: size * 0.18, border: '2px solid var(--surface)',
        }}>✓</span>
      )}
      {typeof score === 'number' && !verified && (
        <span style={{
          position: 'absolute', bottom: -3, right: -3,
          padding: '1px 5px', borderRadius: 8,
          background: 'var(--green)', color: '#fff', fontSize: 9,
          fontFamily: 'Geist Mono', fontWeight: 600,
          border: '2px solid var(--surface)',
        }}>{score}</span>
      )}
    </span>
  );
};

// Hero placeholder image — striped with monospace label
window.ImagePlaceholder = function ImagePlaceholder({ label = 'photo', height = 240, src, ratio }) {
  const style = {
    width: '100%',
    height: ratio ? 'auto' : height,
    aspectRatio: ratio,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  };
  if (src) {
    return <div style={{...style, background: `url(${src}) center/cover`}} />;
  }
  return (
    <div className="placeholder-stripes" style={style}>
      <div style={{
        position: 'absolute', bottom: 10, left: 10,
        padding: '4px 8px', background: 'var(--surface)',
        border: '1px solid var(--line)', borderRadius: 6,
        fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--ink-3)',
      }}>{label}</div>
    </div>
  );
};

// Sustainability score pill
window.ScorePill = function ScorePill({ score, label = 'impact' }) {
  const color = score >= 80 ? 'var(--green)' : score >= 50 ? 'var(--green-2)' : 'var(--sun)';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 10px 3px 4px', borderRadius: 999,
      background: 'var(--green-tint)', color: 'var(--green)',
      fontSize: 11, fontWeight: 600, fontFamily: 'Geist Mono',
    }}>
      <span style={{
        width: 20, height: 20, borderRadius: '50%',
        background: color, color: '#fff',
        display: 'grid', placeItems: 'center', fontSize: 10,
      }}>{score}</span>
      {label}
    </span>
  );
};

// Verified-impact badge with subtle data
window.VerifiedImpact = function VerifiedImpact({ value, unit }) {
  return (
    <span className="verified-impact">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" fill="currentColor" opacity=".25"/>
        <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      verified · {value} {unit}
    </span>
  );
};

// Tiny inline icons (lucide-style)
window.Icon = function Icon({ name, size = 18, stroke = 1.75, color = 'currentColor' }) {
  const paths = {
    home: <path d="M3 11l9-8 9 8M5 10v10h14V10"/>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6z"/></>,
    bag: <><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8a3 3 0 016 0"/></>,
    bookmark: <path d="M6 3h12v18l-6-4-6 4V3z"/>,
    bell: <><path d="M6 8a6 6 0 1112 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 21a2 2 0 004 0"/></>,
    msg: <path d="M3 5h18v12H7l-4 4V5z"/>,
    users: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5M15 19c0-2 2-3.5 4-3.5"/></>,
    check: <path d="M4 12l5 5L20 6"/>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 00-.1-1.3l2-1.6-2-3.4-2.4.9a7 7 0 00-2.3-1.3L13.5 3h-3l-.7 2.3a7 7 0 00-2.3 1.3l-2.4-.9-2 3.4 2 1.6A7 7 0 005 12c0 .4 0 .9.1 1.3l-2 1.6 2 3.4 2.4-.9a7 7 0 002.3 1.3l.7 2.3h3l.7-2.3a7 7 0 002.3-1.3l2.4.9 2-3.4-2-1.6c.1-.4.1-.9.1-1.3z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></>,
    heart: <path d="M12 21s-7-5-9-10a5 5 0 019-3 5 5 0 019 3c-2 5-9 10-9 10z"/>,
    comment: <path d="M3 5h18v12H7l-4 4V5z"/>,
    repost: <><path d="M17 2l4 4-4 4"/><path d="M21 6H7a4 4 0 00-4 4v2"/><path d="M7 22l-4-4 4-4"/><path d="M3 18h14a4 4 0 004-4v-2"/></>,
    share: <><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 11l8-4M8 13l8 4"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    map: <><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"/><path d="M9 3v15M15 6v15"/></>,
    leaf: <><path d="M21 3c0 9-7 14-12 14-2 0-4-1-5-2 0-9 6-14 12-14 2 0 4 1 5 2z"/><path d="M4 21c2-7 5-10 12-12"/></>,
    flame: <path d="M12 3s4 3 4 8a4 4 0 01-8 0c0-2 2-3 2-5 0 4 4 3 4 8a4 4 0 11-8 0c0-5 6-11 6-11z"/>,
    sparkles: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/></>,
    bolt: <path d="M13 2L4 14h7l-2 8 9-12h-7l2-8z"/>,
    arrow: <><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>,
    plant: <><path d="M12 22V10"/><path d="M12 10c0-4-3-7-7-7 0 4 3 7 7 7z"/><path d="M12 10c0-4 3-7 7-7 0 4-3 7-7 7z"/></>,
    droplet: <path d="M12 3s7 7 7 12a7 7 0 01-14 0c0-5 7-12 7-12z"/>,
    co2: null,
    chevron: <path d="M9 6l6 6-6 6"/>,
    close: <path d="M6 6l12 12M6 18L18 6"/>,
    more: <><circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/></>,
    pin: <><circle cx="12" cy="10" r="3"/><path d="M12 22s7-8 7-13a7 7 0 10-14 0c0 5 7 13 7 13z"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></>,
    award: <><circle cx="12" cy="9" r="6"/><path d="M8 14l-2 7 6-3 6 3-2-7"/></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></>,
    pencil: <><path d="M4 20h4l11-11-4-4L4 16v4z"/><path d="M14 5l4 4"/></>,
    gift: <><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18M12 9v12M12 9S10 3 7.5 4.5 12 9 12 9zM12 9s2-6 4.5-4.5S12 9 12 9z"/></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></>,
    wifiOff: <><path d="M2 8a16 16 0 0120 0M5 12a10 10 0 0114 0M8.5 15.5a5 5 0 017 0M12 19h.01M2 2l20 20"/></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></>,
    edit: <><path d="M11 4H4v16h16v-7"/><path d="M18.5 2.5a2.1 2.1 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    star: <path d="M12 3l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 18l-5.8 3 1.1-6.5L2.5 9.9 9 9z"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    minus: <path d="M5 12h14"/>,
    cart: <><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.5 13h11l2-9H6"/></>,
    coin: <><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5a2.5 2 0 015 0c0 1.5-2.5 1.5-2.5 2.5s2.5 1 2.5 2.5a2.5 2 0 01-5 0"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || paths.home}
    </svg>
  );
};

// =============== Sidebar (desktop) ===============
window.DesktopSidebar = function DesktopSidebar({ active, onNav }) {
  const app = useApp();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const items = [
    ['Home', 'home', 'home'],
    ['Explore', 'compass', 'explore'],
    ['Impact', 'leaf', 'impact'],
    ['Action map', 'map', 'map'],
    ['Carbon market', 'globe', 'carbon'],
    ['Marketplace', 'bag', 'marketplace'],
    ['Bookmarks', 'bookmark', 'bookmarks'],
    ['Notifications', 'bell', 'notifications', 4],
    ['Messages', 'msg', 'messages', 2],
    ['Communities', 'users', 'forum'],
    ['Challenges', 'flame', 'tasks'],
    ['Profile', 'user', 'profile'],
    ['Settings', 'settings', 'settings'],
  ];
  return (
    <aside style={{
      width: 248, flexShrink: 0,
      borderRight: '1px solid var(--line)',
      background: 'var(--surface)',
      display: 'flex', flexDirection: 'column',
      height: '100%',
    }}>
      <div style={{ padding: '20px 20px 12px' }}>
        <Logo />
      </div>
      <nav style={{ padding: '8px 12px', flex: 1, overflow: 'auto' }} className="no-scrollbar">
        {items.map(([label, icon, key, badge]) => {
          const isActive = active === key;
          return (
            <button key={key} onClick={() => onNav?.(key)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              width: '100%', padding: '10px 12px', border: 'none',
              background: isActive ? 'var(--green-tint)' : 'transparent',
              color: isActive ? 'var(--green)' : 'var(--ink-2)',
              borderRadius: 10, cursor: 'pointer',
              fontWeight: isActive ? 600 : 500, fontSize: 14,
              fontFamily: 'Geist',
              marginBottom: 2,
            }}>
              <Icon name={icon} size={18} stroke={isActive ? 2 : 1.75} />
              <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
              {badge && (
                <span style={{
                  background: 'var(--ink-solid)', color: '#fff',
                  fontSize: 10, padding: '2px 6px', borderRadius: 10,
                  fontFamily: 'Geist Mono', fontWeight: 600,
                }}>{badge}</span>
              )}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: 12, borderTop: '1px solid var(--line)', position: 'relative' }}>
        <button className="btn btn-green" onClick={() => app.openModal?.('compose')} style={{ width: '100%', justifyContent: 'center', padding: '11px 16px', fontSize: 14 }}>
          <Icon name="plus" size={16} stroke={2.2} /> New post
        </button>
        <div onClick={() => onNav?.('profile')} className="row-hover" style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, padding: '8px 6px', borderRadius: 10, cursor: 'pointer' }}>
          <Avatar name="Y" size={36} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>You</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono' }}>@you · 86 impact</div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); setMenuOpen(o => !o); }} style={{ background: menuOpen ? 'var(--bg-2)' : 'transparent', border: 'none', borderRadius: 8, padding: 5, cursor: 'pointer', color: 'var(--ink-3)' }}>
            <Icon name="more" size={16} />
          </button>
        </div>
        {menuOpen && (
          <>
            <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
            <div className="menu-pop" style={{
              position: 'absolute', bottom: 64, left: 12, right: 12, zIndex: 41,
              background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12,
              boxShadow: '0 20px 50px -16px rgba(0,0,0,.3)', padding: 6, overflow: 'hidden',
            }}>
              {[
                ['View profile', 'user', () => onNav?.('profile')],
                ['Sell on Honua', 'bag', () => onNav?.('sell')],
                ['Seller dashboard', 'leaf', () => onNav?.('seller')],
                ['Admin · approvals', 'check', () => onNav?.('admin')],
                ['Settings', 'settings', () => onNav?.('settings')],
                ['Switch appearance', 'sparkles', () => app.toggleDark?.()],
                ['Help & support', 'comment', () => window.open('../support/' + encodeURIComponent('Help Center.html'), '_blank')],
                ['Log out', 'logout', () => { app.toast?.({ msg: 'Logged out', sub: 'Signed out — back to sign in.', icon: 'logout' }); onNav?.('auth'); }],
              ].map(([l, ic, fn]) => (
                <button key={l} onClick={() => { setMenuOpen(false); fn(); }} style={{
                  display: 'flex', alignItems: 'center', gap: 11, width: '100%', padding: '9px 10px',
                  border: 'none', background: 'transparent', borderRadius: 8, cursor: 'pointer',
                  fontSize: 13, fontWeight: 500, color: l === 'Log out' ? 'var(--clay)' : 'var(--ink-2)', fontFamily: 'Geist',
                }} className="row-hover">
                  <Icon name={ic} size={16} /> {l}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

// =============== Mobile bottom nav ===============
window.MobileBottomNav = function MobileBottomNav({ active, onNav }) {
  const items = [
    ['home', 'home'],
    ['compass', 'explore'],
    ['plus', 'compose'],
    ['leaf', 'impact'],
    ['user', 'profile'],
  ];
  return (
    <nav style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'var(--surface)',
      borderTop: '1px solid var(--line)',
      padding: '10px 20px 24px',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      zIndex: 30,
    }}>
      {items.map(([icon, key]) => {
        const isActive = active === key;
        const isCompose = key === 'compose';
        if (isCompose) {
          return (
            <button key={key} onClick={() => onNav?.(key)} style={{
              width: 44, height: 44, borderRadius: 14,
              background: 'var(--green)', border: 'none',
              display: 'grid', placeItems: 'center', color: '#fff',
            }}>
              <Icon name="plus" size={22} stroke={2.4} />
            </button>
          );
        }
        return (
          <button key={key} onClick={() => onNav?.(key)} style={{
            background: 'transparent', border: 'none', padding: 8,
            color: isActive ? 'var(--ink)' : 'var(--ink-4)',
            display: 'grid', placeItems: 'center',
          }}>
            <Icon name={icon} size={22} stroke={isActive ? 2.2 : 1.75} />
          </button>
        );
      })}
    </nav>
  );
};

// =============== Mobile top bar ===============
window.MobileTopBar = function MobileTopBar({ title, right, transparent }) {
  return (
    <div style={{
      paddingTop: 56, paddingLeft: 20, paddingRight: 20, paddingBottom: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: transparent ? 'transparent' : 'var(--surface)',
      borderBottom: transparent ? 'none' : '1px solid var(--line)',
      position: 'relative', zIndex: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {typeof title === 'string' ? (
          <span className="font-display" style={{ fontSize: 22, fontWeight: 600 }}>{title}</span>
        ) : title}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>{right}</div>
    </div>
  );
};

// ====================================================================
// App context — navigation w/ params, toasts, modals, interaction state
// ====================================================================
window.AppCtx = React.createContext(null);
window.useApp = function useApp() { return React.useContext(window.AppCtx) || {}; };

// Reusable modal shell ------------------------------------------------
window.Modal = function Modal({ onClose, children, width = 520 }) {
  React.useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  return (
    <div onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }} className="modal-backdrop-in" style={{
      position: 'fixed', inset: 0, zIndex: 8000, background: 'rgba(10,13,11,.5)',
      backdropFilter: 'blur(3px)', display: 'grid', placeItems: 'center', padding: 24,
    }}>
      <div className="modal-card-in no-scrollbar" style={{
        width: '100%', maxWidth: width, maxHeight: '88vh', overflow: 'auto',
        background: 'var(--surface)', borderRadius: 20, border: '1px solid var(--line)',
        boxShadow: '0 40px 100px -20px rgba(0,0,0,.45)', position: 'relative',
      }}>
        {children}
      </div>
    </div>
  );
};

window.ModalHead = function ModalHead({ icon, iconColor = 'var(--green)', title, sub, onClose }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '22px 24px 0' }}>
      {icon && (
        <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0,
          background: iconColor + '18', color: iconColor, display: 'grid', placeItems: 'center' }}>
          <Icon name={icon} size={20} stroke={2} />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2 className="font-display" style={{ margin: 0, fontSize: 21, fontWeight: 600, letterSpacing: '-0.02em' }}>{title}</h2>
        {sub && <p style={{ margin: '4px 0 0', fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.5 }}>{sub}</p>}
      </div>
      <button onClick={onClose} style={{ background: 'var(--bg-2)', border: 'none', borderRadius: 9, width: 32, height: 32,
        display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--ink-3)', flexShrink: 0 }}>
        <Icon name="close" size={16} />
      </button>
    </div>
  );
};

// Toast host ----------------------------------------------------------
window.ToastHost = function ToastHost() {
  const { toasts = [], dismissToast } = useApp();
  return (
    <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      zIndex: 9000, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', pointerEvents: 'none' }}>
      {toasts.map(t => (
        <div key={t.id} className="toast-in" style={{
          pointerEvents: 'auto',
          background: t.kind === 'error' ? 'var(--surface)' : 'var(--ink-solid)',
          color: t.kind === 'error' ? 'var(--ink)' : '#fff',
          border: t.kind === 'error' ? '1px solid var(--line)' : 'none',
          borderRadius: 14, padding: '12px 14px', minWidth: 300, maxWidth: 440,
          boxShadow: '0 18px 50px -12px rgba(0,0,0,.4)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, display: 'grid', placeItems: 'center',
            background: t.kind === 'error' ? 'var(--clay)' : t.kind === 'success' ? 'var(--green)' : 'rgba(255,255,255,.16)', color: '#fff' }}>
            <Icon name={t.icon || (t.kind === 'error' ? 'wifiOff' : 'check')} size={16} stroke={2.2} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600 }}>{t.msg}</div>
            {t.sub && <div style={{ fontSize: 12, opacity: t.kind === 'error' ? .65 : .78, marginTop: 1 }}>{t.sub}</div>}
          </div>
          {t.action && (
            <button onClick={() => { t.action.onClick?.(); dismissToast(t.id); }} style={{ background: 'transparent', border: 'none',
              color: t.kind === 'error' ? 'var(--green)' : '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>{t.action.label}</button>
          )}
          <button onClick={() => dismissToast(t.id)} style={{ background: 'transparent', border: 'none', color: 'inherit', opacity: .45, cursor: 'pointer', padding: 2 }}>
            <Icon name="close" size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

// Modal host — delegates to ModalContent (defined in desktop-rest.jsx)
window.ModalHost = function ModalHost() {
  const { modal, closeModal } = useApp();
  if (!modal || !window.ModalContent) return null;
  const MC = window.ModalContent;
  return <MC type={modal.type} data={modal.data || {}} close={closeModal} />;
};

// Small controlled toggle (interactive)
window.ToggleC = function ToggleC({ on, onChange }) {
  return (
    <span onClick={() => onChange?.(!on)} style={{
      width: 34, height: 20, borderRadius: 999, padding: 2,
      background: on ? 'var(--green)' : 'var(--line-2)',
      display: 'inline-flex', alignItems: 'center', cursor: 'pointer',
      justifyContent: on ? 'flex-end' : 'flex-start', transition: 'background .15s', flexShrink: 0,
    }}>
      <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.2)' }} />
    </span>
  );
};

// =============== iOS status bar ===============
window.StatusBar = function StatusBar({ dark }) {
  return (
    <div className="phone-status" style={{ color: dark ? '#fff' : 'var(--ink)' }}>
      <span>9:41</span>
      <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
        <svg width="16" height="10" viewBox="0 0 16 10"><path d="M2 8h2V6H2v2zm4 0h2V4H6v4zm4 0h2V2h-2v6zm4 0h2V0h-2v8z" fill="currentColor"/></svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M1 5a8 8 0 0112 0M3.5 7a4.5 4.5 0 017 0M6 9a1 1 0 012 0"/></svg>
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1"><rect x="1" y="1" width="18" height="8" rx="2"/><rect x="2.5" y="2.5" width="13" height="5" rx="1" fill="currentColor"/></svg>
      </span>
    </div>
  );
};
