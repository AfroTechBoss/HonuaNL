/* global React, MOCK, Icon, Avatar, Logo, MobileTopBar, MobileBottomNav, ImagePlaceholder, ScorePill, VerifiedImpact, PostCard, ActionBtn, formatCount, ToggleC, useApp */

// ====================================================================
// Helpers that the desktop bundle defines but the mobile bundle didn't
// load — port them so Impact / Profile / Messages stop crashing.
// ====================================================================
if (!window.Stat) window.Stat = function Stat({ n, l, green, light }) {
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'Bricolage Grotesque', letterSpacing: '-0.02em',
        color: light ? '#fff' : green ? 'var(--green)' : 'var(--ink)' }}>{n}</div>
      <div style={{ fontSize: 11, color: light ? 'rgba(255,255,255,.8)' : 'var(--ink-3)', fontFamily: 'Geist Mono', marginTop: 2 }}>{l.toUpperCase()}</div>
    </div>
  );
};

if (!window.KpiCard) window.KpiCard = function KpiCard({ label, value, unit, delta, color, icon }) {
  return (
    <div style={{ background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--line)', padding: 16, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 14, right: 14, width: 30, height: 30, borderRadius: 9, background: color + '18', color, display: 'grid', placeItems: 'center' }}>
        <Icon name={icon} size={15} stroke={2} />
      </div>
      <div style={{ fontSize: 10, color: 'var(--ink-3)', fontFamily: 'Geist Mono', letterSpacing: '.05em' }}>{label.toUpperCase()}</div>
      <div style={{ fontSize: 28, fontWeight: 600, fontFamily: 'Bricolage Grotesque', letterSpacing: '-0.03em', marginTop: 6 }}>
        {value}<span style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 500 }}> {unit}</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--green)', marginTop: 4, fontFamily: 'Geist Mono' }}>↗ {delta}</div>
    </div>
  );
};

if (!window.BarChart) window.BarChart = function BarChart() {
  const days = 30;
  // deterministic so it doesn't reshuffle every render (perf + stability)
  const data = React.useMemo(() => Array.from({ length: days }).map((_, i) => ({
    t: 3 + Math.sin(i * 0.4) * 2 + ((i * 7) % 5) * 0.4,
    e: 2 + Math.cos(i * 0.3) * 1.5 + ((i * 3) % 4) * 0.35,
    f: 1 + ((i * 5) % 3) * 0.7,
    o: ((i * 2) % 3) * 0.5,
  })), []);
  const max = 12;
  return (
    <svg viewBox={`0 0 ${days * 16} 200`} width="100%" height="160" style={{ display: 'block' }}>
      {[0, 0.5, 1].map(p => (
        <line key={p} x1="0" x2={days * 16} y1={200 - p * 180} y2={200 - p * 180} stroke="var(--line)" strokeWidth="1" strokeDasharray={p === 0 ? '' : '2 4'} />
      ))}
      {data.map((d, i) => {
        const x = i * 16 + 4; const scale = 180 / max; let y = 200;
        return (
          <g key={i}>
            {[['t', 'var(--green)'], ['e', 'var(--green-2)'], ['f', 'var(--sky)'], ['o', 'var(--sun)']].map(([k, c]) => {
              const h = d[k] * scale; y -= h;
              return <rect key={k} x={x} y={y} width="8" height={Math.max(h - 1, 0)} fill={c} rx="1" />;
            })}
          </g>
        );
      })}
    </svg>
  );
};

if (!window.DayLabel) window.DayLabel = function DayLabel({ l }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0', color: 'var(--ink-4)' }}>
      <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      <span style={{ fontSize: 11, fontFamily: 'Geist Mono', letterSpacing: '.05em' }}>{l.toUpperCase()}</span>
      <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
    </div>
  );
};

if (!window.Msg) window.Msg = function Msg({ from, children, attach }) {
  const me = from === 'me';
  return (
    <div style={{ display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start' }}>
      <div style={{ maxWidth: '76%', background: me ? 'var(--green)' : 'var(--surface)', color: me ? '#fff' : 'var(--ink)',
        border: me ? 'none' : '1px solid var(--line)', padding: '10px 14px',
        borderRadius: me ? '18px 18px 4px 18px' : '18px 18px 18px 4px', fontSize: 14, lineHeight: 1.5 }}>
        {attach && (
          <div style={{ background: me ? 'rgba(255,255,255,.15)' : 'var(--bg-2)', padding: '8px 10px', borderRadius: 8, marginBottom: 8,
            fontSize: 12, fontFamily: 'Geist Mono', display: 'flex', alignItems: 'center', gap: 6 }}>📎 {attach}</div>
        )}
        {children}
      </div>
    </div>
  );
};

// ============ Local mobile-screen utilities ============
const m3IconBtn = {
  width: 36, height: 36, borderRadius: 10, background: 'var(--surface)',
  border: '1px solid var(--line)', color: 'var(--ink-2)', cursor: 'pointer',
  display: 'grid', placeItems: 'center', flexShrink: 0,
};
const m3Scroll = { flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' };
const m3Screen = { height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' };

window.M3Chip = function M3Chip({ active, children, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '7px 13px', borderRadius: 999, whiteSpace: 'nowrap', cursor: 'pointer',
      fontSize: 13, fontWeight: 500, fontFamily: 'Geist',
      background: active ? 'var(--green)' : 'var(--surface)',
      color: active ? '#fff' : 'var(--ink-2)',
      border: active ? 'none' : '1px solid var(--line)',
    }}>{children}</button>
  );
};

// =============== Mobile · Action map ===============
window.MobileMap = function MobileMap({ onNav }) {
  const app = useApp();
  const [cat, setCat] = React.useState('All');
  const projects = [
    { name: 'Prospect Park cleanup', type: 'Cleanup', icon: 'trash', dist: '0.8 mi', when: 'Sat · 9:00 AM', going: 24, color: 'var(--green)' },
    { name: 'Community garden build', type: 'Garden', icon: 'plant', dist: '1.2 mi', when: 'Sun · 10:00 AM', going: 12, color: 'var(--green-2)' },
    { name: 'Fix-it repair café', type: 'Repair', icon: 'settings', dist: '2.1 mi', when: 'Sat · 1:00 PM', going: 8, color: 'var(--sky)' },
    { name: 'Solar co-op meetup', type: 'Energy', icon: 'bolt', dist: '3.0 mi', when: 'Wed · 6:00 PM', going: 41, color: 'var(--sun)' },
  ];
  const cats = ['All', 'Cleanup', 'Garden', 'Repair', 'Energy'];
  const shown = projects.filter(p => cat === 'All' || p.type === cat);
  return (
    <div style={m3Screen}>
      <MobileTopBar title="Action map" right={<button style={m3IconBtn}><Icon name="search" size={18} /></button>} />
      <div style={{ ...m3Scroll, paddingBottom: 100 }} className="no-scrollbar">
        {/* Map canvas */}
        <div style={{ position: 'relative', height: 200, margin: '0 16px 14px', borderRadius: 16, overflow: 'hidden',
          background: 'linear-gradient(135deg,#dfeee4,#cfe6da)', border: '1px solid var(--line)' }}>
          <svg width="100%" height="100%" viewBox="0 0 360 200" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
            <path d="M0 70 H360 M0 130 H360 M120 0 V200 M240 0 V200" stroke="rgba(31,111,63,.12)" strokeWidth="2" />
            <path d="M-20 150 Q120 90 200 140 T380 120" fill="none" stroke="rgba(29,109,196,.25)" strokeWidth="6" />
          </svg>
          {[[70, 60, 'var(--green)'], [200, 120, 'var(--green-2)'], [150, 95, 'var(--sky)'], [285, 60, 'var(--sun)']].map(([x, y, c], i) => (
            <div key={i} style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-100%)',
              width: 26, height: 26, borderRadius: '50% 50% 50% 0', background: c, transform: 'translate(-50%,-100%) rotate(-45deg)',
              display: 'grid', placeItems: 'center', boxShadow: '0 4px 10px -2px rgba(0,0,0,.35)' }}>
              <span style={{ transform: 'rotate(45deg)', color: '#fff' }}><Icon name="pin" size={12} stroke={2.4} /></span>
            </div>
          ))}
          <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'var(--surface)', borderRadius: 8,
            padding: '5px 9px', fontSize: 11, fontFamily: 'Geist Mono', color: 'var(--ink-2)', boxShadow: '0 2px 8px rgba(0,0,0,.1)' }}>
            <Icon name="pin" size={11} color="var(--green)" /> Brooklyn, NY
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, padding: '0 16px 12px', overflowX: 'auto' }} className="no-scrollbar">
          {cats.map(c => <M3Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</M3Chip>)}
        </div>

        <div style={{ padding: '0 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 10 }}>{shown.length} happening near you</div>
          {shown.map(p => (
            <div key={p.name} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 14, marginBottom: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: p.color + '18', color: p.color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Icon name={p.icon} size={18} stroke={2} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono', marginTop: 2 }}>{p.type} · {p.dist} · {p.when}</div>
                <div style={{ fontSize: 11, color: 'var(--green)', marginTop: 3 }}>{p.going} going</div>
              </div>
              <button className="btn btn-green" style={{ padding: '7px 14px', fontSize: 12 }}
                onClick={() => app.toast?.({ msg: 'RSVP confirmed', sub: p.name, kind: 'success', icon: 'check' })}>RSVP</button>
            </div>
          ))}
          <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: 4 }}
            onClick={() => app.toast?.({ msg: 'Start a project', sub: 'Project creation would open here.', icon: 'plus' })}>
            <Icon name="plus" size={16} /> Start a project
          </button>
        </div>
      </div>
      <MobileBottomNav active="" onNav={onNav} />
    </div>
  );
};

// =============== Mobile · Carbon market ===============
window.MobileCarbon = function MobileCarbon({ onNav }) {
  const app = useApp();
  const [cat, setCat] = React.useState('All');
  const credits = [
    { name: 'Kakamega reforestation', loc: 'Kenya', type: 'Forestry', price: 18, img: 'rainforest canopy', v: '1.0t' },
    { name: 'Mekong mangroves', loc: 'Vietnam', type: 'Blue carbon', price: 22, img: 'mangrove coastline', v: '1.0t' },
    { name: 'Direct air capture', loc: 'Iceland', type: 'Capture', price: 89, img: 'DAC plant', v: '1.0t' },
    { name: 'Clean cookstoves', loc: 'Malawi', type: 'Cookstoves', price: 12, img: 'efficient cookstove', v: '1.0t' },
  ];
  const cats = ['All', 'Forestry', 'Blue carbon', 'Capture', 'Cookstoves'];
  const shown = credits.filter(c => cat === 'All' || c.type === cat);
  return (
    <div style={m3Screen}>
      <MobileTopBar title="Carbon market" right={<button style={m3IconBtn}><Icon name="coin" size={18} /></button>} />
      <div style={{ ...m3Scroll, padding: '4px 16px 100px' }} className="no-scrollbar">
        {/* Market hero */}
        <div style={{ background: 'linear-gradient(135deg,#0a0d0b,#2a2f2c)', color: '#fff', borderRadius: 16, padding: 18 }}>
          <div style={{ fontSize: 10, fontFamily: 'Geist Mono', opacity: .7, letterSpacing: '.05em' }}>SPOT · 1 IMPACT TOKEN</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 38, fontWeight: 600, fontFamily: 'Bricolage Grotesque', letterSpacing: '-0.03em' }}>$24.10</span>
            <span style={{ fontSize: 13, color: '#5bc98a', fontFamily: 'Geist Mono' }}>↗ 3.2%</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
            {[['24H VOL', '$1.2M'], ['PROJECTS', '146'], ['YOUR OFFSETS', '2.4t']].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: 9, fontFamily: 'Geist Mono', opacity: .65 }}>{l}</div>
                <div style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Bricolage Grotesque', marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, padding: '14px 0', overflowX: 'auto' }} className="no-scrollbar">
          {cats.map(c => <M3Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</M3Chip>)}
        </div>

        {shown.map(c => (
          <div key={c.name} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 12, marginBottom: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 52, height: 52, flexShrink: 0 }}><ImagePlaceholder label="" height={52} src={null} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono', marginTop: 2 }}>{c.loc} · {c.type}</div>
              <div style={{ marginTop: 5 }}><VerifiedImpact value={c.v} unit="CO₂ / credit" /></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 15, fontWeight: 600, fontFamily: 'Bricolage Grotesque' }}>${c.price}</div>
              <button className="btn btn-green" style={{ padding: '5px 12px', fontSize: 12, marginTop: 6 }}
                onClick={() => app.toast?.({ msg: `Bought 1 credit · ${c.name}`, sub: `−$${c.price} · +1.0t verified offset`, kind: 'success', icon: 'leaf' })}>Buy</button>
            </div>
          </div>
        ))}
        <p style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'Geist Mono', lineHeight: 1.6, marginTop: 4 }}>
          Every credit is on-chain verified, third-party audited, and traceable to a real project.
        </p>
      </div>
      <MobileBottomNav active="" onNav={onNav} />
    </div>
  );
};

// =============== Mobile · Marketplace ===============
window.MobileMarketplace = function MobileMarketplace({ onNav }) {
  const app = useApp();
  const [cat, setCat] = React.useState('All');
  const cats = ['All', 'Home', 'Energy', 'Kitchen', 'Outdoors'];
  return (
    <div style={m3Screen}>
      <MobileTopBar title="Shop" right={
        <React.Fragment>
          <button style={m3IconBtn} onClick={() => onNav?.('sell')} title="Sell on Honua">
            <Icon name="bag" size={18} color="var(--green)" />
          </button>
          <button style={{ ...m3IconBtn, position: 'relative' }} onClick={() => app.toast?.({ msg: `Cart · ${app.cartCount} item${app.cartCount === 1 ? '' : 's'}`, sub: 'Checkout would open here.', icon: 'cart' })}>
            <Icon name="cart" size={18} />
            {app.cartCount > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: 'var(--green)', color: '#fff', fontSize: 10, fontFamily: 'Geist Mono', fontWeight: 600, minWidth: 17, height: 17, borderRadius: 9, display: 'grid', placeItems: 'center', padding: '0 4px' }}>{app.cartCount}</span>}
          </button>
        </React.Fragment>
      } />
      <div style={{ ...m3Scroll, padding: '4px 16px 100px' }} className="no-scrollbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '10px 13px', marginBottom: 12 }}>
          <Icon name="search" size={16} color="var(--ink-4)" />
          <span style={{ fontSize: 14, color: 'var(--ink-4)' }}>Search sustainable goods…</span>
        </div>

        {/* Featured drop */}
        <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 14, position: 'relative', background: 'linear-gradient(135deg,#1f6f3f,#2e9a5b)', color: '#fff', padding: 16 }}>
          <div style={{ fontSize: 10, fontFamily: 'Geist Mono', opacity: .85, letterSpacing: '.05em' }}>FEATURED DROP</div>
          <div className="font-display" style={{ fontSize: 20, fontWeight: 600, marginTop: 4, maxWidth: '70%' }}>Plastic-free home, 20% off</div>
          <button className="btn" style={{ background: '#fff', color: 'var(--green)', padding: '7px 14px', fontSize: 12, marginTop: 10 }}>Shop the drop →</button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 14, overflowX: 'auto' }} className="no-scrollbar">
          {cats.map(c => <M3Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</M3Chip>)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {MOCK.products.map(p => (
            <div key={p.name} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <ImagePlaceholder label={p.img} ratio="1/1" />
                <span style={{ position: 'absolute', top: 8, left: 8, background: 'var(--green-tint)', color: 'var(--green)', fontSize: 10, fontWeight: 600, fontFamily: 'Geist Mono', padding: '3px 7px', borderRadius: 999 }}>{p.tag}</span>
              </div>
              <div style={{ padding: 11 }}>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono', marginTop: 2 }}>{p.brand}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, fontFamily: 'Bricolage Grotesque' }}>{p.price}</span>
                  <button style={{ width: 30, height: 30, borderRadius: 9, background: 'var(--ink)', color: '#fff', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
                    onClick={() => { app.addToCart?.({ name: p.name, price: p.price }); app.toast?.({ msg: 'Added to cart', sub: p.name, kind: 'success', icon: 'cart' }); }}>
                    <Icon name="plus" size={16} stroke={2.4} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MobileBottomNav active="" onNav={onNav} />
    </div>
  );
};

// =============== Mobile · Communities ===============
window.MobileCommunities = function MobileCommunities({ onNav }) {
  const app = useApp();
  const joined = ['Urban gardeners', 'Solar DIY', 'Ocean cleanup crew'];
  return (
    <div style={m3Screen}>
      <MobileTopBar title="Communities" right={<button style={m3IconBtn}><Icon name="search" size={18} /></button>} />
      <div style={{ ...m3Scroll, padding: '4px 16px 100px' }} className="no-scrollbar">
        {/* Your communities */}
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 10 }}>Your communities</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4, marginBottom: 16 }} className="no-scrollbar">
          {joined.map(name => (
            <div key={name} style={{ flexShrink: 0, width: 116, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
              <ImagePlaceholder label="" height={64} />
              <div style={{ padding: '8px 10px', fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{name}</div>
            </div>
          ))}
        </div>

        {/* Featured thread */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: 14, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="chip chip-green"><Icon name="award" size={11} /> Pinned tip</span>
            <span style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'Geist Mono' }}>Urban gardeners</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>How we doubled pollinator visits with $20 of native seed</div>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>Maya shares the exact mix and a 4-week timeline. 342 upvotes · 56 replies.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 12, color: 'var(--ink-3)' }}>
            <ActionBtn icon="heart" count={342} onClick={() => {}} />
            <ActionBtn icon="comment" count={56} onClick={() => {}} />
            <ActionBtn icon="bookmark" onClick={() => app.toast?.({ msg: 'Saved to bookmarks', kind: 'success', icon: 'bookmark' })} />
          </div>
        </div>

        {/* Discover */}
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 10 }}>Discover</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {MOCK.communities.map(c => {
            const isJoined = app.community?.has(c.name) || joined.includes(c.name);
            return (
              <div key={c.name} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
                <ImagePlaceholder label={c.cover} height={72} />
                <div style={{ padding: 11 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono', marginTop: 2 }}>{c.members} members</div>
                  <button className={isJoined ? 'btn btn-green' : 'btn btn-ghost'} style={{ width: '100%', justifyContent: 'center', padding: '7px', fontSize: 12, marginTop: 9 }}
                    onClick={() => { app.community?.toggle(c.name); app.toast?.(isJoined ? { msg: `Left ${c.name}`, icon: 'users' } : { msg: `Joined ${c.name}`, kind: 'success', icon: 'users' }); }}>
                    {isJoined ? 'Joined' : 'Join'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <MobileBottomNav active="" onNav={onNav} />
    </div>
  );
};

// =============== Mobile · Challenges ===============
window.MobileChallenges = function MobileChallenges({ onNav }) {
  const app = useApp();
  const tasks = [
    { t: 'Bike or walk to work', gp: 24, done: true },
    { t: 'Bring a reusable cup', gp: 5, done: true },
    { t: 'Meat-free lunch', gp: 12, done: false },
    { t: 'Line-dry laundry', gp: 8, done: false },
  ];
  const progress = { 1: 0.62, 2: 0.4 };
  return (
    <div style={m3Screen}>
      <MobileTopBar title="Challenges" right={<button style={m3IconBtn}><Icon name="flame" size={18} /></button>} />
      <div style={{ ...m3Scroll, padding: '4px 16px 100px' }} className="no-scrollbar">
        {/* GP balance */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--green-tint)', border: '1px solid var(--green-3)', borderRadius: 14, padding: 14, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--green)', color: '#fff', display: 'grid', placeItems: 'center' }}><Icon name="sparkles" size={18} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 600, fontFamily: 'Bricolage Grotesque', color: 'var(--green)' }}>1,240 GP</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono' }}>Level 7 · Composter</div>
          </div>
          <span className="chip" style={{ background: 'var(--surface)' }}>🔥 12-day streak</span>
        </div>

        {/* Today's tasks */}
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 10 }}>Today’s tasks</div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', marginBottom: 18 }}>
          {tasks.map((task, i) => (
            <TaskRow key={task.t} task={task} last={i === tasks.length - 1} onLog={() => app.toast?.({ msg: `Logged · +${task.gp} GP`, sub: task.t, kind: 'success', icon: 'check' })} />
          ))}
        </div>

        {/* Active challenges */}
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 10 }}>Active challenges</div>
        {MOCK.challenges.slice(0, 2).map(c => (
          <div key={c.id} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 14, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono', marginTop: 2 }}>{c.cat} · {c.joined} joined</div>
              </div>
              <span className="chip chip-green">{c.reward}</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
              <div style={{ width: `${(progress[c.id] || 0.3) * 100}%`, height: '100%', background: 'var(--green)', borderRadius: 999 }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono', marginTop: 6 }}>{Math.round((progress[c.id] || 0.3) * 100)}% · {c.days} days left</div>
          </div>
        ))}

        {/* Browse */}
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-3)', margin: '8px 0 10px' }}>Browse catalogue</div>
        {MOCK.challenges.slice(2).map(c => {
          const isJoined = app.challenge?.has(c.id);
          return (
            <div key={c.id} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 14, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--green-tint)', color: 'var(--green)', display: 'grid', placeItems: 'center' }}><Icon name="flame" size={18} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono', marginTop: 2 }}>{c.reward} · {c.joined} joined</div>
              </div>
              <button className={isJoined ? 'btn btn-green' : 'btn btn-ghost'} style={{ padding: '7px 14px', fontSize: 12 }}
                onClick={() => { app.challenge?.toggle(c.id); app.toast?.(isJoined ? { msg: `Left ${c.title}`, icon: 'flame' } : { msg: `Joined ${c.title}`, kind: 'success', icon: 'flame' }); }}>
                {isJoined ? 'Joined' : 'Join'}
              </button>
            </div>
          );
        })}
      </div>
      <MobileBottomNav active="" onNav={onNav} />
    </div>
  );
};

window.TaskRow = function TaskRow({ task, last, onLog }) {
  const [done, setDone] = React.useState(task.done);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderBottom: last ? 'none' : '1px solid var(--line)' }}>
      <button onClick={() => { if (!done) { setDone(true); onLog?.(); } else setDone(false); }} style={{
        width: 24, height: 24, borderRadius: 7, flexShrink: 0, cursor: 'pointer',
        border: done ? 'none' : '2px solid var(--line-2)', background: done ? 'var(--green)' : 'transparent',
        color: '#fff', display: 'grid', placeItems: 'center' }}>
        {done && <Icon name="check" size={14} stroke={3} />}
      </button>
      <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: done ? 'var(--ink-4)' : 'var(--ink)', textDecoration: done ? 'line-through' : 'none' }}>{task.t}</div>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--green)', fontFamily: 'Geist Mono' }}>+{task.gp} GP</span>
    </div>
  );
};

// =============== Mobile · Post detail ===============
window.MobilePostDetail = function MobilePostDetail({ onNav, params }) {
  const app = useApp();
  const post = MOCK.posts.find(p => p.id === (params && params.id)) || MOCK.posts[0];
  const user = MOCK.users[post.user];
  const liked = app.like?.has(post.id);
  const saved = app.save?.has(post.id);
  const [tree, setTree] = React.useState(window.makeCommentSeed);
  const [reply, setReply] = React.useState('');
  const send = () => { if (!reply.trim()) return; setTree(t => [{ id: Date.now(), user: 'you', text: reply.trim(), time: 'now', likes: 0, replies: [] }, ...t]); setReply(''); app.toast?.({ msg: 'Comment posted', kind: 'success', icon: 'comment' }); };
  return (
    <div style={m3Screen}>
      <div style={{ paddingTop: 56, padding: '56px 16px 12px', background: 'var(--surface)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{ ...m3IconBtn, background: 'transparent', border: 'none' }} onClick={() => onNav?.('home')}>
          <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon name="arrow" size={18} /></span>
        </button>
        <span style={{ fontSize: 16, fontWeight: 600 }}>Post</span>
      </div>
      <div style={{ ...m3Scroll }} className="no-scrollbar">
        <div style={{ padding: 16 }}>
          {/* author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <Avatar name={user.name} size={46} verified={user.verified} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>{user.name}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'Geist Mono' }}>@{user.handle} · {post.location}</div>
            </div>
            <ScorePill score={post.score} label="" />
          </div>

          <p style={{ margin: '0 0 14px', fontSize: 17, lineHeight: 1.55, color: 'var(--ink)', textWrap: 'pretty' }}>{post.content}</p>

          {post.image && <ImagePlaceholder label={post.image} height={240} />}

          {post.tags && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '12px 0' }}>
              {post.tags.map(t => <span key={t} style={{ color: 'var(--sky)', fontSize: 14, fontWeight: 500 }}>#{t}</span>)}
            </div>
          )}

          {/* verified-impact breakdown */}
          <div style={{ background: 'var(--green-tint)', border: '1px solid var(--green-3)', borderRadius: 14, padding: 14, margin: '14px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Icon name="leaf" size={16} color="var(--green)" />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>Verified impact</span>
              <span style={{ marginLeft: 'auto' }}><VerifiedImpact value={post.verified ? post.verified.value : '1.4t'} unit="CO₂" /></span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[['CO₂', '−1.4t'], ['Energy', '−2.1MWh'], ['Saved', '$3,000']].map(([l, v]) => (
                <div key={l} style={{ background: 'var(--surface)', borderRadius: 10, padding: 10 }}>
                  <div style={{ fontSize: 10, fontFamily: 'Geist Mono', color: 'var(--ink-3)' }}>{l.toUpperCase()}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, fontFamily: 'Bricolage Grotesque', marginTop: 2, color: 'var(--green)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* engagement */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '12px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
            <ActionBtn icon="heart" count={post.likes + (liked ? 1 : 0)} active={liked} activeColor="var(--clay)" onClick={() => app.like?.toggle(post.id)} />
            <ActionBtn icon="comment" count={post.comments} onClick={() => {}} />
            <ActionBtn icon="repost" count={post.reposts} onClick={() => app.toast?.({ msg: 'Reposted', icon: 'repost' })} />
            <span style={{ marginLeft: 'auto', display: 'flex', gap: 18 }}>
              <ActionBtn icon="bookmark" active={saved} onClick={() => { app.save?.toggle(post.id); app.toast?.(saved ? { msg: 'Removed from bookmarks', icon: 'bookmark' } : { msg: 'Saved to bookmarks', kind: 'success', icon: 'bookmark' }); }} />
              <ActionBtn icon="share" onClick={() => app.toast?.({ msg: 'Link copied', icon: 'share' })} />
            </span>
          </div>

          {/* comments */}
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-3)', margin: '16px 0 4px' }}>{post.comments} comments · tap a reply to expand</div>
          <CommentThread tree={tree} setTree={setTree} dense />
        </div>
      </div>

      {/* composer */}
      <div style={{ padding: 12, paddingBottom: 28, background: 'var(--surface)', borderTop: '1px solid var(--line)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <Avatar name="You" size={32} />
        <input value={reply} onChange={e => setReply(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Add a reply…" style={{
          flex: 1, background: 'var(--bg-2)', border: 'none', outline: 'none', padding: '10px 14px', borderRadius: 999, fontSize: 14, fontFamily: 'Geist' }} />
        <button className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 12 }} onClick={send}>Reply</button>
      </div>
    </div>
  );
};

// =============== Mobile · Settings ===============
window.MobileSettings = function MobileSettings({ onNav }) {
  const app = useApp();
  const [dark, setDark] = React.useState(() => document.body.classList.contains('dark'));
  const setMode = (v) => { setDark(v); document.body.classList.toggle('dark', v); app.toast?.({ msg: v ? 'Dark mode' : 'Light mode', icon: 'sparkles' }); };
  const support = [
    ['Help center', 'comment', 'Help Center.html'],
    ['Contact support', 'msg', 'Contact Support.html'],
    ['Community guidelines', 'users', 'Community Guidelines.html'],
    ['Report a problem', 'bolt', 'Report a Problem.html'],
    ['Terms & privacy', 'lock', 'Terms & Privacy.html'],
  ];
  const Row = ({ icon, label, right, onClick, danger }) => (
    <button onClick={onClick} className="row-hover" style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '13px 14px', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
      <Icon name={icon} size={17} color={danger ? 'var(--clay)' : 'var(--ink-3)'} />
      <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: danger ? 'var(--clay)' : 'var(--ink-2)' }}>{label}</span>
      {right || <Icon name="chevron" size={15} color="var(--ink-4)" />}
    </button>
  );
  const Group = ({ title, children }) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 11, fontFamily: 'Geist Mono', color: 'var(--ink-4)', letterSpacing: '.06em', padding: '0 4px 8px' }}>{title.toUpperCase()}</div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>{children}</div>
    </div>
  );
  return (
    <div style={m3Screen}>
      <MobileTopBar title="Settings" right={<button style={{ ...m3IconBtn, background: 'transparent', border: 'none' }} onClick={() => onNav?.('profile')}><Icon name="close" size={18} /></button>} />
      <div style={{ ...m3Scroll, padding: '4px 16px 100px' }} className="no-scrollbar">
        {/* profile row */}
        <div onClick={() => onNav?.('profile')} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 14, marginBottom: 18, cursor: 'pointer' }}>
          <Avatar name="Sarah Green" size={48} verified />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Sarah Green</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'Geist Mono' }}>@sarahgreen · 92 impact</div>
          </div>
          <Icon name="chevron" size={16} color="var(--ink-4)" />
        </div>

        <Group title="Account">
          <Row icon="user" label="Profile" onClick={() => onNav?.('profile')} />
          <div style={{ height: 1, background: 'var(--line)' }} />
          <Row icon="lock" label="Privacy" onClick={() => app.toast?.({ msg: 'Privacy', sub: 'Visibility & data controls.', icon: 'lock' })} />
          <div style={{ height: 1, background: 'var(--line)' }} />
          <Row icon="bell" label="Notifications" onClick={() => app.toast?.({ msg: 'Notification settings', icon: 'bell' })} />
        </Group>

        <Group title="Preferences">
          <Row icon="sparkles" label="Dark mode" right={<ToggleC on={dark} onChange={setMode} />} onClick={() => setMode(!dark)} />
          <div style={{ height: 1, background: 'var(--line)' }} />
          <Row icon="leaf" label="Impact tracking" onClick={() => app.toast?.({ msg: 'Impact tracking', sub: 'Connect data sources.', icon: 'leaf' })} />
        </Group>

        <Group title="Help & support">
          {support.map(([label, icon, file], i) => (
            <React.Fragment key={label}>
              {i > 0 && <div style={{ height: 1, background: 'var(--line)' }} />}
              <Row icon={icon} label={label} right={<Icon name="arrow" size={15} color="var(--ink-4)" />}
                onClick={() => window.open('../support/' + encodeURIComponent(file), '_blank')} />
            </React.Fragment>
          ))}
        </Group>

        <Group title="Session">
          <Row icon="logout" label="Log out" danger onClick={() => { app.toast?.({ msg: 'Logged out', sub: 'Signed out — back to sign in.', icon: 'logout' }); onNav?.('auth'); }} right={<span />} />
        </Group>

        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--ink-4)', fontFamily: 'Geist Mono', marginTop: 8 }}>honua · v2.0 · © 2026 honua coop</div>
      </div>
    </div>
  );
};
