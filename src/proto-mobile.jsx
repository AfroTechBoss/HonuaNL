/* global React, ReactDOM, Icon, StatusBar, ToastHost, AppCtx,
   MobileHome, MobileProfile, MobileImpact, MobileCompose, MobileAuth, MobileOnboarding,
   MobileNotifications, MobileMessages, MobileMap, MobileCarbon, MobileMarketplace,
   MobileCommunities, MobileChallenges, MobilePostDetail, MobileSettings */
const { useState, useCallback, useEffect, useRef } = React;

// ---- Phone bezel (desktop / tablet view) ----
function PhoneFrame({ children }) {
  return (
    <div className="phone">
      <div className="phone-inner">
        <StatusBar />
        <div className="phone-notch" />
        {children}
      </div>
    </div>
  );
}

// Screen registry
const SCREENS = {
  auth:          { Cmp: MobileAuth,          label: 'Sign in',       group: 'Entry' },
  onboarding:    { Cmp: MobileOnboarding,    label: 'Onboarding',    group: 'Entry' },
  home:          { Cmp: MobileHome,          label: 'Home feed',     group: 'Core' },
  compose:       { Cmp: MobileCompose,       label: 'Compose',       group: 'Core' },
  impact:        { Cmp: MobileImpact,        label: 'Impact',        group: 'Core' },
  profile:       { Cmp: MobileProfile,       label: 'Profile',       group: 'Core' },
  post:          { Cmp: MobilePostDetail,    label: 'Post detail',   group: 'Core' },
  map:           { Cmp: MobileMap,           label: 'Action map',    group: 'Discover' },
  carbon:        { Cmp: MobileCarbon,        label: 'Carbon market', group: 'Discover' },
  marketplace:   { Cmp: MobileMarketplace,   label: 'Marketplace',   group: 'Discover' },
  forum:         { Cmp: MobileCommunities,   label: 'Communities',   group: 'Discover' },
  tasks:         { Cmp: MobileChallenges,    label: 'Challenges',    group: 'Discover' },
  notifications: { Cmp: MobileNotifications, label: 'Activity',      group: 'More' },
  messages:      { Cmp: MobileMessages,      label: 'Messages',      group: 'More' },
  settings:      { Cmp: MobileSettings,      label: 'Settings',      group: 'More' },
  sell:          { Cmp: MobileSell,          label: 'Sell on Honua', group: 'Selling' },
  seller:        { Cmp: MobileSellerDashboard,label: 'Seller dashboard', group: 'Selling' },
  admin:         { Cmp: MobileAdmin,         label: 'Admin · approvals', group: 'Selling' },
};
const GROUPS = ['Entry', 'Core', 'Discover', 'Selling', 'More'];
const ORDER = Object.keys(SCREENS);

const LS_KEY = 'honua_mobile_screen';
const LS_STATE = 'honua_mobile_state';

const STATE_DEFAULTS = {
  liked: [], saved: [],
  following: ['sarahgreen', 'greentech'],
  joinedCommunities: ['Urban gardeners', 'Solar DIY', 'Ocean cleanup crew'],
  joinedChallenges: [1, 2],
  cart: [{ name: 'Refillable shampoo bar', price: '$12' }, { name: 'Solar phone charger', price: '$48' }],
  sellerStatus: 'none',
  sellerShop: null,
};
function loadState() {
  try { return { ...STATE_DEFAULTS, ...JSON.parse(localStorage.getItem(LS_STATE) || '{}') }; }
  catch { return { ...STATE_DEFAULTS }; }
}

function MobileApp() {
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved && SCREENS[saved] ? saved : 'home';
  });
  const [params, setParams] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  // ---- interaction state (persisted) ----
  const [st, setSt] = useState(loadState);
  useEffect(() => { localStorage.setItem(LS_STATE, JSON.stringify(st)); }, [st]);

  // ---- toasts ----
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);
  const dismissToast = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);
  const toast = useCallback((opts) => {
    const id = ++toastId.current;
    setToasts(t => [...t.slice(-2), { id, ...opts }]);
    if (opts.sticky !== true) setTimeout(() => dismissToast(id), opts.duration || 3200);
    return id;
  }, [dismissToast]);

  // ---- responsive: full-bleed on real phones, bezel on bigger screens ----
  const [fullBleed, setFullBleed] = useState(false);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 680px)');
    const fit = () => {
      setFullBleed(mq.matches);
      if (!mq.matches) {
        const s = Math.min((window.innerWidth - 48) / 414, (window.innerHeight - 48) / 868, 1.15);
        setScale(Math.max(0.45, s));
      }
    };
    fit();
    mq.addEventListener('change', fit);
    window.addEventListener('resize', fit);
    return () => { mq.removeEventListener('change', fit); window.removeEventListener('resize', fit); };
  }, []);

  // ---- navigation ----
  const go = useCallback((key, p = {}) => {
    const target = key === 'explore' ? 'forum' : key; // no dedicated mobile explore → Communities
    if (!SCREENS[target]) return;
    setPage(target);
    setParams(p);
    setMenuOpen(false);
  }, []);
  useEffect(() => { localStorage.setItem(LS_KEY, page); }, [page]);

  // ---- toggle helpers ----
  const mk = (field) => ({
    has: (v) => st[field].includes(v),
    toggle: (v) => setSt(s => ({ ...s, [field]: s[field].includes(v) ? s[field].filter(x => x !== v) : [...s[field], v] })),
  });
  const ctx = {
    nav: go, page, params,
    toast, toasts, dismissToast,
    state: st, setState: setSt,
    like: mk('liked'), save: mk('saved'), follow: mk('following'),
    community: mk('joinedCommunities'), challenge: mk('joinedChallenges'),
    cart: st.cart, cartCount: st.cart.length,
    addToCart: (item) => setSt(s => ({ ...s, cart: [...s.cart, item] })),
    openModal: () => {}, closeModal: () => {},
  };

  const route = SCREENS[page] || SCREENS.home;
  const Cmp = route.Cmp;
  const screen = <Cmp onNav={go} params={params} />;

  return (
    <AppCtx.Provider value={ctx}>
      <div className={'mob-stage' + (fullBleed ? ' fullbleed' : '')}>
        {fullBleed ? (
          <div className="mob-fullbleed">
            <StatusBar />
            <div className="phone-notch" />
            <div key={page} className="mob-screen-fade" style={{ height: '100%' }}>{screen}</div>
          </div>
        ) : (
          <div className="mob-phone-wrap" style={{ transform: `scale(${scale})` }}>
            <PhoneFrame>
              <div key={page} className="mob-screen-fade" style={{ height: '100%' }}>{screen}</div>
            </PhoneFrame>
          </div>
        )}

        {/* Screen jumper */}
        <button className="mob-jump" onClick={() => setMenuOpen(o => !o)} title="Jump to any screen">
          {menuOpen ? <Icon name="close" size={20} /> : <Icon name="compass" size={20} />}
        </button>

        {menuOpen && (
          <>
            <div className="mob-scrim" onClick={() => setMenuOpen(false)} />
            <div className="mob-menu no-scrollbar">
              <div className="mob-menu-head">
                <div className="font-display" style={{ fontSize: 17, fontWeight: 600 }}>Jump to screen</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono', marginTop: 2 }}>{ORDER.length} screens · tap to visit</div>
              </div>
              {GROUPS.map(group => (
                <div key={group} style={{ marginBottom: 6 }}>
                  <div className="mob-menu-group">{group}</div>
                  {ORDER.filter(k => SCREENS[k].group === group).map(k => (
                    <button key={k} className={'mob-menu-item' + (page === k ? ' active' : '')}
                      onClick={() => { setPage(k); setParams({}); setMenuOpen(false); }}>
                      <span>{SCREENS[k].label}</span>
                      {page === k && <Icon name="check" size={15} stroke={2.4} />}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}

        <ToastHost />
      </div>
    </AppCtx.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MobileApp />);
