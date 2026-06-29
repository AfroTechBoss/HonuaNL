/* global React, ReactDOM, DesktopHome, DesktopExplore, DesktopImpact, DesktopMap, DesktopCarbon, DesktopProfile, DesktopPostDetail, DesktopMarketplace, DesktopMessages, DesktopNotifications, DesktopForum, DesktopTasks, DesktopBookmarks, DesktopSettings, DesktopAuth, ToastHost, ModalHost, AppCtx */
const { useState, useCallback, useEffect, useRef } = React;

// Route registry: key -> { Cmp, url, title }
const ROUTES = {
  home:          { Cmp: DesktopHome,          url: 'honua.green',                    title: 'Home' },
  explore:       { Cmp: DesktopExplore,       url: 'honua.green/explore',            title: 'Explore' },
  impact:        { Cmp: DesktopImpact,        url: 'honua.green/impact',             title: 'Impact dashboard' },
  map:           { Cmp: DesktopMap,           url: 'honua.green/map',                title: 'Action map' },
  carbon:        { Cmp: DesktopCarbon,        url: 'honua.green/carbon',             title: 'Carbon market' },
  marketplace:   { Cmp: DesktopMarketplace,   url: 'honua.green/shop',               title: 'Marketplace' },
  bookmarks:     { Cmp: DesktopBookmarks,     url: 'honua.green/bookmarks',          title: 'Bookmarks' },
  notifications: { Cmp: DesktopNotifications, url: 'honua.green/activity',           title: 'Notifications' },
  messages:      { Cmp: DesktopMessages,      url: 'honua.green/messages',           title: 'Messages' },
  forum:         { Cmp: DesktopForum,         url: 'honua.green/c/urban-gardeners',  title: 'Communities' },
  tasks:         { Cmp: DesktopTasks,         url: 'honua.green/challenges',         title: 'Challenges' },
  profile:       { Cmp: DesktopProfile,       url: 'honua.green/@sarahgreen',        title: 'Profile' },
  post:          { Cmp: DesktopPostDetail,    url: 'honua.green/p/1287',             title: 'Post' },
  settings:      { Cmp: DesktopSettings,      url: 'honua.green/settings',           title: 'Settings' },
  auth:          { Cmp: DesktopAuth,          url: 'honua.green/login',              title: 'Sign in' },
  sell:          { Cmp: DesktopSell,          url: 'honua.green/sell',               title: 'Sell on Honua' },
  seller:        { Cmp: DesktopSellerDashboard,url: 'honua.green/seller',             title: 'Seller dashboard' },
  admin:         { Cmp: DesktopAdmin,         url: 'honua.green/admin/sellers',      title: 'Admin · sellers' },
};

const LS_KEY = 'honua_desktop_route';
const LS_STATE = 'honua_desktop_state';

const STATE_DEFAULTS = {
  liked: [],
  saved: [],
  following: ['sarahgreen', 'greentech'],
  joinedCommunities: ['Urban gardeners', 'Solar DIY', 'Ocean cleanup crew'],
  joinedChallenges: [1, 2],
  cart: [{ name: 'Refillable shampoo bar', price: '$12' }, { name: 'Solar phone charger', price: '$48' }, { name: 'Bamboo cutlery set', price: '$18' }],
  wishlist: [],
  drafts: [],
  dark: false,
  sellerStatus: 'none',
  sellerShop: null,
};

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS_STATE) || '{}');
    return { ...STATE_DEFAULTS, ...raw };
  } catch { return { ...STATE_DEFAULTS }; }
}

function DesktopApp() {
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved && ROUTES[saved] ? saved : 'home';
  });
  const [params, setParams] = useState({});
  const [hist, setHist] = useState([{ key: page, params: {} }]);
  const [idx, setIdx] = useState(0);

  // ---- shared interaction state ----
  const [st, setSt] = useState(loadState);
  useEffect(() => { localStorage.setItem(LS_STATE, JSON.stringify(st)); }, [st]);
  useEffect(() => {
    document.body.classList.toggle('dark', !!st.dark);
  }, [st.dark]);

  // ---- toasts ----
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);
  const dismissToast = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);
  const toast = useCallback((opts) => {
    const id = ++toastId.current;
    setToasts(t => [...t, { id, ...opts }]);
    if (opts.sticky !== true) setTimeout(() => dismissToast(id), opts.duration || 3800);
    return id;
  }, [dismissToast]);

  // ---- modals ----
  const [modal, setModal] = useState(null);
  const openModal = useCallback((type, data) => setModal({ type, data }), []);
  const closeModal = useCallback(() => setModal(null), []);

  // ---- navigation ----
  const go = useCallback((key, p = {}) => {
    if (!ROUTES[key]) return;
    setPage(key);
    setParams(p);
    setHist((h) => {
      const trimmed = h.slice(0, idx + 1);
      trimmed.push({ key, params: p });
      return trimmed;
    });
    setIdx((i) => i + 1);
    // scroll any scroll containers to top happens naturally on remount
  }, [idx]);

  useEffect(() => { localStorage.setItem(LS_KEY, page); }, [page]);

  const back = () => { if (idx > 0) { const n = idx - 1; setIdx(n); setPage(hist[n].key); setParams(hist[n].params || {}); } };
  const fwd = () => { if (idx < hist.length - 1) { const n = idx + 1; setIdx(n); setPage(hist[n].key); setParams(hist[n].params || {}); } };

  // ---- toggle helpers ----
  const mk = (field) => ({
    has: (v) => st[field].includes(v),
    toggle: (v) => setSt(s => ({ ...s, [field]: s[field].includes(v) ? s[field].filter(x => x !== v) : [...s[field], v] })),
    add: (v) => setSt(s => ({ ...s, [field]: s[field].includes(v) ? s[field] : [...s[field], v] })),
    remove: (v) => setSt(s => ({ ...s, [field]: s[field].filter(x => x !== v) })),
  });

  const ctx = {
    nav: go, page, params,
    toast, toasts, dismissToast,
    openModal, closeModal, modal,
    state: st, setState: setSt,
    toggleDark: () => { setSt(s => ({ ...s, dark: !s.dark })); toast({ msg: st.dark ? 'Light mode' : 'Dark mode', icon: 'sparkles' }); },
    like: mk('liked'), save: mk('saved'), follow: mk('following'),
    community: mk('joinedCommunities'), challenge: mk('joinedChallenges'), wishlist: mk('wishlist'),
    cart: st.cart, cartCount: st.cart.length,
    addToCart: (item) => setSt(s => ({ ...s, cart: [...s.cart, item] })),
    removeFromCart: (i) => setSt(s => ({ ...s, cart: s.cart.filter((_, idx2) => idx2 !== i) })),
    drafts: st.drafts,
    addDraft: (d) => setSt(s => ({ ...s, drafts: [...s.drafts, d] })),
  };

  const route = ROUTES[page] || ROUTES.home;
  const Cmp = route.Cmp;
  const url = (page === 'profile' && params.handle) ? `honua.green/@${params.handle}` : route.url;

  return (
    <AppCtx.Provider value={ctx}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#e9e8e2' }}>
        {/* Browser chrome */}
        <div className="proto-chrome">
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            <span className="proto-dot" style={{ background: '#ed6a5e' }} />
            <span className="proto-dot" style={{ background: '#f4bf4f' }} />
            <span className="proto-dot" style={{ background: '#61c454' }} />
          </div>
          <div style={{ display: 'flex', gap: 2, marginLeft: 8 }}>
            <button className="proto-navbtn" onClick={back} disabled={idx === 0} title="Back">
              <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon name="chevron" size={16} /></span>
            </button>
            <button className="proto-navbtn" onClick={fwd} disabled={idx >= hist.length - 1} title="Forward">
              <Icon name="chevron" size={16} />
            </button>
            <button className="proto-navbtn" onClick={() => go(page, params)} title="Reload">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5"/></svg>
            </button>
          </div>
          <div className="proto-url">
            <Icon name="lock" size={11} color="var(--ink-4)" />
            <span style={{ color: 'var(--ink-3)' }}>https://</span>
            <span style={{ color: 'var(--ink)' }}>{url}</span>
          </div>
          <div style={{ display: 'flex', gap: 10, color: 'var(--ink-4)', alignItems: 'center' }}>
            <Icon name="bookmark" size={15} />
            <Icon name="more" size={15} />
          </div>
        </div>

        {/* App viewport */}
        <div style={{ flex: 1, minHeight: 0, background: 'var(--bg)', position: 'relative' }}>
          <Cmp onNav={go} params={params} />
        </div>

        <ToastHost />
        <ModalHost />
      </div>
    </AppCtx.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DesktopApp />);
