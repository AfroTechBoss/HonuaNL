/* global React */

// =============== Desktop Home ===============
window.DesktopHome = function DesktopHome({ onNav }) {
  const [tab, setTab] = React.useState('foryou');
  const app = useApp();
  const feed = tab === 'following'
    ? MOCK.posts.filter(p => app.follow?.has(MOCK.users[p.user].handle))
    : tab === 'verified'
      ? MOCK.posts.filter(p => p.verified)
      : MOCK.posts;
  const joinedChallenge = app.challenge?.has('week19');
  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--bg)' }}>
      <DesktopSidebar active="home" onNav={onNav} />
      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
        {/* Feed column */}
        <div style={{
          flex: '1 1 auto', maxWidth: 660, padding: '20px 28px',
          borderRight: '1px solid var(--line)', height: '100%', overflow: 'auto',
        }} className="no-scrollbar">
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 18,
          }}>
            <h1 className="font-display" style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em' }}>Home</h1>
            <div className="pill-nav">
              <button className={tab === 'foryou' ? 'active' : ''} onClick={() => setTab('foryou')}>For you</button>
              <button className={tab === 'following' ? 'active' : ''} onClick={() => setTab('following')}>Following</button>
              <button className={tab === 'verified' ? 'active' : ''} onClick={() => setTab('verified')}>Verified impact</button>
            </div>
          </div>

          {/* Composer prompt */}
          <div onClick={() => app.openModal?.('compose')} style={{
            background: 'var(--surface)', borderRadius: 16,
            border: '1px solid var(--line)', padding: 16, marginBottom: 12,
            display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer',
          }}>
            <Avatar name="Y" size={40} />
            <span style={{ flex: 1, fontSize: 15, color: 'var(--ink-4)', fontFamily: 'Geist' }}>Share an action, idea, or update…</span>
            <span style={{ color: 'var(--ink-3)', display: 'inline-flex' }}><Icon name="image" size={16} /></span>
            <span style={{ color: 'var(--ink-3)', display: 'inline-flex' }}><Icon name="pin" size={16} /></span>
            <button className="btn btn-primary" style={{ padding: '7px 14px' }} onClick={(e) => { e.stopPropagation(); app.openModal?.('compose'); }}>Post</button>
          </div>

          {/* Sticky challenge ribbon */}
          <div onClick={() => onNav?.('tasks')} style={{
            background: 'linear-gradient(90deg, var(--green-tint), var(--surface))',
            border: '1px solid var(--green-3)',
            borderRadius: 16, padding: '14px 16px', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: 'var(--green)',
              display: 'grid', placeItems: 'center', color: '#fff',
            }}>
              <Icon name="flame" size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontFamily: 'Geist Mono', color: 'var(--green)', fontWeight: 600 }}>WEEK 19 CHALLENGE · 4 days left</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>Bike to work — 12.4k joined</div>
            </div>
            <button className={joinedChallenge ? 'btn btn-ghost' : 'btn btn-green'} style={{ padding: '7px 14px' }} onClick={(e) => { e.stopPropagation(); app.challenge.toggle('week19'); app.toast?.(joinedChallenge ? { msg: 'Left the challenge', icon: 'close' } : { msg: 'Joined Bike to work 🔥', sub: 'Log daily to keep your streak.', kind: 'success', icon: 'flame' }); }}>{joinedChallenge ? 'Joined ✓' : 'Join'}</button>
          </div>

          {feed.length > 0 ? feed.map(p => <PostCard key={p.id} post={p} />) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--ink-3)' }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--bg-2)', display: 'grid', placeItems: 'center', margin: '0 auto 14px', color: 'var(--ink-4)' }}><Icon name={tab === 'verified' ? 'leaf' : 'users'} size={26} /></div>
              <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--ink-2)' }}>{tab === 'following' ? 'Nothing here yet' : 'No verified posts yet'}</div>
              <p style={{ fontSize: 14, maxWidth: 320, margin: '6px auto 0', lineHeight: 1.5 }}>{tab === 'following' ? 'Follow people to see their updates in this tab.' : 'Posts with oracle-verified impact will appear here.'}</p>
              {tab === 'following' && <button className="btn btn-green" style={{ marginTop: 16 }} onClick={() => setTab('foryou')}>Discover people →</button>}
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{
          width: 340, padding: 20, height: '100%', overflow: 'auto',
          flexShrink: 0,
        }} className="no-scrollbar">
          {/* Search */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--line)',
            borderRadius: 999, padding: '10px 14px', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Icon name="search" size={16} color="var(--ink-3)" />
            <input placeholder="Search posts, people, projects" style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 13, fontFamily: 'Geist',
            }} />
            <span style={{
              padding: '2px 6px', border: '1px solid var(--line)',
              borderRadius: 4, fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--ink-3)',
            }}>/</span>
          </div>
          <MyImpactCard />
          <TrendingPanel />
          <SuggestedFollows />
          <div style={{ padding: '12px 4px', fontSize: 11, color: 'var(--ink-4)', fontFamily: 'Geist Mono', lineHeight: 1.7 }}>
            ABOUT · HELP · API · PRIVACY · TERMS<br/>
            © 2026 honua coop
          </div>
        </div>
      </main>
    </div>
  );
};

// =============== Desktop Explore ===============
window.DesktopExplore = function DesktopExplore({ onNav }) {
  const [tab, setTab] = React.useState('trending');
  const app = useApp();
  const openArticle = (a) => app.openModal?.('article', a);
  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--bg)' }}>
      <DesktopSidebar active="explore" onNav={onNav} />
      <main style={{ flex: 1, padding: '20px 28px', overflow: 'auto', height: '100%' }} className="no-scrollbar">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h1 className="font-display" style={{ margin: 0, fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em' }}>Explore</h1>
            <p style={{ margin: '4px 0 0', color: 'var(--ink-3)', fontSize: 14 }}>What the community is building, planting, and fighting for right now.</p>
          </div>
          <div className="pill-nav">
            {['Trending', 'Nearby', 'Projects', 'People', 'Tags'].map(t => (
              <button key={t} className={tab === t.toLowerCase() ? 'active' : ''} onClick={() => setTab(t.toLowerCase())}>{t}</button>
            ))}
          </div>
        </div>

        {/* Hero: editorial featured story */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18, marginBottom: 24,
        }}>
          <div style={{
            background: 'var(--surface)', borderRadius: 20,
            overflow: 'hidden', border: '1px solid var(--line)',
            display: 'grid', gridTemplateRows: '260px 1fr', cursor: 'pointer',
          }} className="post-card" onClick={() => openArticle({ tag: 'Energy', title: 'How a Nairobi co-op put 4,200 homes on solar in 18 months', author: 'Dr. Adaeze Okafor', img: 'hero · solar farm at dawn' })}>
            <ImagePlaceholder label="hero · solar farm at dawn" height={260} />
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <span className="chip chip-green">Editor's pick</span>
                <span className="chip">Energy</span>
                <span className="chip">12 min read</span>
              </div>
              <h2 className="font-display" style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>How a Nairobi co-op put 4,200 homes on solar in 18 months</h2>
              <p style={{ margin: 0, color: 'var(--ink-3)', fontSize: 14, lineHeight: 1.6 }}>A community-funded model that beat the utility on price, ran on local labor, and is now being replicated in three more cities.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
                <Avatar name="Dr. Okafor" size={32} />
                <div style={{ fontSize: 13 }}>
                  <span style={{ fontWeight: 600 }}>Dr. Adaeze Okafor</span>
                  <span style={{ color: 'var(--ink-3)' }}> · May 19</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { tag: 'Policy', t: 'EU Carbon Border Adjustment — what it means for steel', a: 'Climate Action Net.', img: 'steel mill' },
              { tag: 'Energy', t: 'Heat pumps overtook gas boilers in 9 European markets', a: 'GreenTech', img: 'heat pump unit' },
              { tag: 'Ocean', t: 'Inside the 2026 North Sea kelp restoration trial', a: 'Sea Forests', img: 'kelp underwater' },
            ].map((s, i) => (
              <div key={i} className="row-hover" onClick={() => openArticle({ tag: s.tag, title: s.t, author: s.a, img: s.img })} style={{
                background: 'var(--surface)', borderRadius: 14,
                border: '1px solid var(--line)', padding: 14,
                display: 'grid', gridTemplateColumns: '92px 1fr', gap: 14, cursor: 'pointer',
              }}>
                <ImagePlaceholder label={s.img} height={84} />
                <div>
                  <span className="chip chip-green" style={{ marginBottom: 6 }}>{s.tag}</span>
                  <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.35, marginTop: 6 }}>{s.t}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4, fontFamily: 'Geist Mono' }}>by {s.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories strip */}
        <h2 className="font-display" style={{ fontSize: 20, fontWeight: 600, margin: '0 0 12px' }}>Browse by category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginBottom: 24 }}>
          {[
            ['Energy', 'leaf', '#1f6f3f'],
            ['Water', 'droplet', '#1d6dc4'],
            ['Food', 'plant', '#2e9a5b'],
            ['Waste', 'repost', '#c4623a'],
            ['Transport', 'bolt', '#e6b450'],
            ['Policy', 'globe', '#5c635e'],
          ].map(([label, icon, col]) => (
            <div key={label} onClick={() => app.openModal?.('list', { title: label + ' on Honua', icon, sub: 'Recent posts and projects in this category', items: MOCK.posts.slice(0, 4).map(p => ({ icon, title: p.content.slice(0, 48) + '…', sub: '@' + MOCK.users[p.user].handle + ' · ' + p.time })) })} style={{
              background: 'var(--surface)', borderRadius: 14, padding: 16,
              border: '1px solid var(--line)', cursor: 'pointer',
            }} className="post-card">
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: col + '18',
                color: col, display: 'grid', placeItems: 'center', marginBottom: 10,
              }}>
                <Icon name={icon} size={18} stroke={2} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono', marginTop: 2 }}>
                {Math.floor(Math.random() * 9 + 2)}.{Math.floor(Math.random() * 9)}k posts
              </div>
            </div>
          ))}
        </div>

        {/* Communities grid */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Communities you might love</h2>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--green)', fontWeight: 500, cursor: 'pointer', fontSize: 13 }} onClick={() => onNav?.('forum')}>See all →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
          {MOCK.communities.slice(0, 3).map(c => {
            const joined = app.community?.has(c.name);
            return (
            <div key={c.name} onClick={() => onNav?.('forum')} className="post-card" style={{
              background: 'var(--surface)', borderRadius: 16,
              border: '1px solid var(--line)', overflow: 'hidden', cursor: 'pointer',
            }}>
              <ImagePlaceholder label={c.cover} height={120} />
              <div style={{ padding: 14 }}>
                <span className="chip">{c.cat}</span>
                <h3 style={{ margin: '8px 0 4px', fontSize: 16, fontWeight: 600 }}>{c.name}</h3>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'Geist Mono' }}>{c.members} members</div>
                <button className={joined ? 'btn btn-green' : 'btn btn-ghost'} onClick={(e) => { e.stopPropagation(); app.community.toggle(c.name); app.toast?.(joined ? { msg: `Left ${c.name}`, icon: 'users' } : { msg: `Joined ${c.name}`, kind: 'success', icon: 'users' }); }} style={{ marginTop: 10, padding: '6px 12px', fontSize: 12 }}>{joined ? 'Joined ✓' : 'Join community'}</button>
              </div>
            </div>
            );
          })}
        </div>

        {/* Project map preview */}
        <div style={{
          background: 'var(--surface)', borderRadius: 20,
          border: '1px solid var(--line)', overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1.2fr 1fr',
        }}>
          <MapPreview />
          <div style={{ padding: 24 }}>
            <span className="chip chip-sky">Action map</span>
            <h2 className="font-display" style={{ margin: '10px 0 6px', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>147 verified projects near you</h2>
            <p style={{ margin: 0, color: 'var(--ink-3)', fontSize: 14, lineHeight: 1.6 }}>Beach cleanups, community gardens, repair cafés, energy co-ops — find something to do this weekend.</p>
            <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={() => onNav?.('map')}>Open map <Icon name="arrow" size={14} /></button>
          </div>
        </div>
      </main>
    </div>
  );
};

window.MapPreview = function MapPreview({ height = 320 }) {
  // Decorative map placeholder — toned earthy
  return (
    <div style={{
      height, position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #e6f0fa 0%, #ecf5ee 60%, #f4f3ee 100%)',
    }}>
      <svg viewBox="0 0 600 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0v40" fill="none" stroke="rgba(0,0,0,.04)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="600" height="400" fill="url(#grid)"/>
        {/* Land masses */}
        <path d="M50 200 Q150 100 280 140 T520 180 Q540 280 400 320 T100 300 Z" fill="#ecf5ee" stroke="#c8e6cf" strokeWidth="1"/>
        <path d="M380 60 Q450 50 510 90 T560 200 Q500 220 440 180 T380 60 Z" fill="#ecf5ee" stroke="#c8e6cf" strokeWidth="1"/>
        {/* Roads */}
        <path d="M0 220 Q200 180 400 230 T600 200" fill="none" stroke="#fff" strokeWidth="3" opacity=".7"/>
        <path d="M120 0 Q140 150 200 250 T280 400" fill="none" stroke="#fff" strokeWidth="2" opacity=".5"/>
        {/* Markers */}
        {[
          [180, 180, '#1f6f3f'],
          [240, 230, '#1d6dc4'],
          [340, 160, '#e6b450'],
          [420, 220, '#c4623a'],
          [290, 290, '#1f6f3f'],
          [150, 280, '#2e9a5b'],
          [460, 280, '#1d6dc4'],
        ].map(([cx, cy, c], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="14" fill={c} opacity=".18"/>
            <circle cx={cx} cy={cy} r="6" fill={c} stroke="#fff" strokeWidth="2"/>
          </g>
        ))}
      </svg>
    </div>
  );
};
