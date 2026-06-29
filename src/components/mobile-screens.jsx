/* global React */

// =============== Mobile Home ===============
window.MobileHome = function MobileHome({ onNav }) {
  const storyKeys = ['sarah', 'marcus', 'maya', 'okafor', 'greentech', 'can', 'tara'];
  const [story, setStory] = React.useState(null);
  return (
    <div style={{ height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <MobileTopBar
        title={<Logo size={26} />}
        right={<>
          <button style={iconBtn}><Icon name="search" size={20} /></button>
          <button style={iconBtn}><Icon name="bell" size={20} /></button>
        </>}
      />
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px 100px' }} className="no-scrollbar">
        {/* Stories / streaks rail */}
        <div style={{ display: 'flex', gap: 12, overflow: 'auto', paddingBottom: 12 }} className="no-scrollbar">
          <StreakDot you label="Today" onClick={() => onNav?.('compose')} />
          {storyKeys.map((k, i) => {
            const u = MOCK.users[k];
            return <StreakDot key={k} name={u.name} score={u.score} onClick={() => setStory(i)} />;
          })}
        </div>

        {/* Tab pill */}
        <div className="pill-nav" style={{ width: '100%', display: 'flex', marginBottom: 12 }}>
          <button className="active" style={{ flex: 1 }}>For you</button>
          <button style={{ flex: 1 }}>Following</button>
          <button style={{ flex: 1 }}>Local</button>
        </div>

        {/* Challenge ribbon */}
        <div style={{
          background: 'linear-gradient(90deg, var(--green-tint), #fff)',
          border: '1px solid var(--green-3)', borderRadius: 14,
          padding: 12, marginBottom: 12, display: 'flex', gap: 10, alignItems: 'center',
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--green)', color: '#fff', display: 'grid', placeItems: 'center' }}>
            <Icon name="flame" size={18} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, fontFamily: 'Geist Mono', color: 'var(--green)', fontWeight: 600 }}>4 DAYS LEFT</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Bike to work week</div>
          </div>
          <button className="btn btn-green" style={{ padding: '5px 11px', fontSize: 11 }}>Join</button>
        </div>

        {/* Posts */}
        {MOCK.posts.slice(0, 4).map(p => <PostCard key={p.id} post={p} dense />)}
      </div>
      <MobileBottomNav active="home" onNav={onNav} />
      {story !== null && <StoryViewer users={storyKeys} start={story} onClose={() => setStory(null)} />}
    </div>
  );
};

window.StreakDot = function StreakDot({ name, score, you, label, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 64, cursor: 'pointer' }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%', padding: 2,
        background: you ? 'conic-gradient(var(--green) 86%, var(--line-2) 0)' : 'conic-gradient(var(--green-2) ' + (score || 70) + '%, var(--line-2) 0)',
      }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--surface)', padding: 2 }}>
          {you ? (
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--green)', color: '#fff', display: 'grid', placeItems: 'center' }}>
              <Icon name="plus" size={20} stroke={2.5} />
            </div>
          ) : (
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--green-tint)', display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 16, color: 'var(--green)' }}>
              {name.charAt(0)}
            </div>
          )}
        </div>
      </div>
      <div style={{ fontSize: 10, color: 'var(--ink-3)', fontFamily: 'Geist Mono', marginTop: 4, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
        {you ? label : '@' + name.split(' ')[0].toLowerCase()}
      </div>
    </div>
  );
};

const iconBtn = {
  width: 36, height: 36, borderRadius: 10, background: 'var(--surface)',
  border: '1px solid var(--line)', color: 'var(--ink-2)', cursor: 'pointer',
  display: 'grid', placeItems: 'center',
};

// =============== Story / status viewer ===============
const STORY_CONTENT = {
  sarah:     { img: 'sunrise over new solar panels', caption: 'First sun on the 20 new panels ☀️ co-op is officially off coal.', bg: 'linear-gradient(160deg,#1f6f3f,#2e9a5b)' },
  marcus:    { img: 'compost bin turned over', caption: 'Week 3, zero-waste. The compost is finally cooking 🔥', bg: 'linear-gradient(160deg,#6b4f2a,#9c7a3c)' },
  maya:      { img: 'balcony tomatoes ripening', caption: 'Two more pollinators today. Tiny balcony, big week 🐝', bg: 'linear-gradient(160deg,#2e7d32,#7cb342)' },
  okafor:    { img: 'wind data on a laptop', caption: 'New blade design hit 40% efficiency in testing. Paper Monday.', bg: 'linear-gradient(160deg,#13315c,#2a6fae)' },
  greentech: { img: 'turbine blade in workshop', caption: 'Prototype #7 is on the truck. Field trial starts Thursday.', bg: 'linear-gradient(160deg,#0d3b66,#1d6dc4)' },
  can:       { img: 'crowd at a climate march', caption: '47 cities confirmed for Friday. Find yours on the map.', bg: 'linear-gradient(160deg,#3a1c71,#6d3bbf)' },
  tara:      { img: 'mending a jacket by hand', caption: 'Repaired instead of replaced. 5th item this month 🪡', bg: 'linear-gradient(160deg,#7a3b2e,#c4623a)' },
};

window.StoryViewer = function StoryViewer({ users, start = 0, onClose }) {
  const [idx, setIdx] = React.useState(start);
  const [prog, setProg] = React.useState(0);
  const DURATION = 4500;
  const next = React.useCallback(() => { setIdx(i => { if (i >= users.length - 1) { onClose?.(); return i; } setProg(0); return i + 1; }); }, [users.length, onClose]);
  const prev = () => setIdx(i => { setProg(0); return Math.max(0, i - 1); });

  React.useEffect(() => {
    setProg(0);
    const t0 = Date.now();
    const id = setInterval(() => {
      const p = (Date.now() - t0) / DURATION;
      if (p >= 1) { clearInterval(id); next(); } else setProg(p);
    }, 50);
    return () => clearInterval(id);
  }, [idx, next]);

  const key = users[idx];
  const u = MOCK.users[key] || { name: key, handle: key };
  const c = STORY_CONTENT[key] || { img: 'status', caption: '', bg: 'linear-gradient(160deg,#1f6f3f,#2e9a5b)' };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 80, background: '#0a0d0b', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'mobScreenFade .2s ease' }}>
      {/* progress bars */}
      <div style={{ display: 'flex', gap: 4, padding: '54px 14px 8px', position: 'relative', zIndex: 3 }}>
        {users.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 999, background: 'rgba(255,255,255,.3)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 999, background: '#fff', width: i < idx ? '100%' : i === idx ? `${prog * 100}%` : '0%' }} />
          </div>
        ))}
      </div>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 14px', position: 'relative', zIndex: 3 }}>
        <Avatar name={u.name} size={34} verified={u.verified} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#fff', fontSize: 13.5, fontWeight: 600 }}>{u.name}</div>
          <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 11, fontFamily: 'Geist Mono' }}>@{u.handle} · {2 + idx}h</div>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: 6 }}><Icon name="close" size={22} /></button>
      </div>

      {/* media */}
      <div style={{ flex: 1, position: 'relative', margin: '8px 0 0' }}>
        <div style={{ position: 'absolute', inset: 0, background: c.bg }} />
        <div className="placeholder-stripes" style={{ position: 'absolute', inset: 0, opacity: .12 }} />
        <div style={{ position: 'absolute', top: '42%', left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,.55)', fontFamily: 'Geist Mono', fontSize: 12 }}>{c.img}</div>
        {/* tap zones */}
        <div onClick={prev} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '32%', cursor: 'pointer', zIndex: 2 }} />
        <div onClick={next} style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '68%', cursor: 'pointer', zIndex: 2 }} />
        {/* caption + actions */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '40px 18px 18px', background: 'linear-gradient(transparent, rgba(0,0,0,.6))', zIndex: 3 }}>
          <p style={{ color: '#fff', fontSize: 16, lineHeight: 1.45, margin: '0 0 14px', fontWeight: 500, textWrap: 'pretty' }}>{c.caption}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, pointerEvents: 'auto' }}>
            <input placeholder={`Reply to ${u.name.split(' ')[0]}…`} onClick={e => e.stopPropagation()} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.5)', color: '#fff', borderRadius: 999, padding: '10px 16px', fontSize: 14, outline: 'none', fontFamily: 'Geist' }} />
            <button onClick={(e) => { e.stopPropagation(); }} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><Icon name="heart" size={24} /></button>
            <button onClick={(e) => { e.stopPropagation(); }} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><Icon name="share" size={22} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============== Mobile Profile ===============
window.MobileProfile = function MobileProfile({ onNav }) {
  return (
    <div style={{ height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 0 100px' }} className="no-scrollbar">
      <div style={{
        height: 130, background: 'linear-gradient(135deg, #1f6f3f, #2e9a5b)',
        paddingTop: 56, position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 56, left: 16, right: 16,
          display: 'flex', justifyContent: 'space-between',
        }}>
          <button style={{ ...iconBtn, background: 'rgba(255,255,255,.2)', border: 'none', color: '#fff' }}>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}><Icon name="arrow" size={18} /></span>
          </button>
          <button style={{ ...iconBtn, background: 'rgba(255,255,255,.2)', border: 'none', color: '#fff' }}>
            <Icon name="more" size={18} />
          </button>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ marginTop: -42, display: 'flex', alignItems: 'flex-end', gap: 12, position: 'relative', zIndex: 2 }}>
          <div style={{
            width: 84, height: 84, borderRadius: 22, background: 'var(--green)',
            border: '4px solid var(--bg)', color: '#fff',
            display: 'grid', placeItems: 'center', fontSize: 34, fontFamily: 'Bricolage Grotesque', fontWeight: 600,
          }}>S</div>
          <div style={{ flex: 1, display: 'flex', gap: 6, paddingBottom: 6 }}>
            <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }}><Icon name="msg" size={12} /></button>
            <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '6px 12px', fontSize: 12 }}>Following</button>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <h1 className="font-display" style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Sarah Green</h1>
            <span style={{ background: 'var(--sky)', color: '#fff', width: 16, height: 16, borderRadius: '50%', display: 'inline-grid', placeItems: 'center', fontSize: 10 }}>✓</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'Geist Mono' }}>@sarahgreen · Portland, OR</div>
          <p style={{ margin: '10px 0 12px', fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)' }}>
            Community solar organizer in Cascadia. Co-host of Sunhill podcast. She/her.
          </p>
          <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--ink-3)' }}>
            <span><strong style={{ color: 'var(--ink)' }}>48.6k</strong> followers</span>
            <span><strong style={{ color: 'var(--ink)' }}>412</strong> following</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <ScorePill score={92} label="" /> impact
            </span>
          </div>
        </div>

        {/* Impact card */}
        <div style={{
          background: 'linear-gradient(135deg, #1f6f3f, #2e9a5b)', color: '#fff',
          borderRadius: 14, padding: 14, marginTop: 14,
        }}>
          <div style={{ fontSize: 10, fontFamily: 'Geist Mono', opacity: .85, letterSpacing: '.05em' }}>VERIFIED · LIFETIME</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 8 }}>
            <Stat n="2.8t" l="CO₂" light />
            <Stat n="180" l="Trees" light />
            <Stat n="42k" l="L H₂O" light />
            <Stat n="14" l="Projects" light />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid var(--line)', marginTop: 18, display: 'flex' }}>
          {['Posts', 'Replies', 'Impact', 'Media'].map((t, i) => (
            <button key={t} style={{
              flex: 1, background: 'transparent', border: 'none', padding: '10px 0',
              fontWeight: i === 0 ? 600 : 500, fontSize: 13,
              color: i === 0 ? 'var(--ink)' : 'var(--ink-3)',
              position: 'relative', cursor: 'pointer',
            }}>
              {t}
              {i === 0 && <div style={{
                position: 'absolute', bottom: -1, left: '25%', right: '25%', height: 2,
                background: 'var(--green)', borderRadius: 2,
              }} />}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          {MOCK.posts.slice(0, 2).map(p => <PostCard key={p.id} post={p} dense />)}
        </div>
      </div>
      </div>
      <MobileBottomNav active="profile" onNav={onNav} />
    </div>
  );
};

// =============== Mobile Impact ===============
window.MobileImpact = function MobileImpact({ onNav }) {
  return (
    <div style={{ height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <MobileTopBar title="Your impact" right={<button style={iconBtn}><Icon name="settings" size={18} /></button>} />
      <div style={{ flex: 1, overflow: 'auto', padding: '4px 16px 100px' }} className="no-scrollbar">
        <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono', letterSpacing: '.05em', marginBottom: 4 }}>MAY 2026</div>
        <h2 className="font-display" style={{ margin: 0, fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          You avoided <span style={{ color: 'var(--green)' }}>164 kg</span> of CO₂ this month.
        </h2>

        {/* Streak card */}
        <div style={{
          background: 'linear-gradient(135deg, #1f6f3f, #2e9a5b)', color: '#fff',
          borderRadius: 16, padding: 18, marginTop: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: 'Geist Mono', opacity: .85 }}>CURRENT STREAK</div>
              <div style={{ fontSize: 44, fontWeight: 600, fontFamily: 'Bricolage Grotesque', lineHeight: 1, letterSpacing: '-0.03em' }}>
                12<span style={{ fontSize: 18, opacity: .7 }}> days</span>
              </div>
            </div>
            <span style={{ fontSize: 36 }}>🔥</span>
          </div>
          <div style={{ display: 'flex', gap: 3, marginTop: 14 }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} style={{ flex: 1, height: 28, borderRadius: 3, background: i < 12 ? '#fff' : 'rgba(255,255,255,.25)' }} />
            ))}
          </div>
          <div style={{ fontSize: 11, marginTop: 10, opacity: .9 }}>18 more days for 2× multiplier</div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
          <KpiCard label="CO₂ avoided" value="164" unit="kg" delta="+12%" color="var(--green)" icon="leaf" />
          <KpiCard label="Water saved" value="3.8k" unit="L" delta="+220 L" color="var(--sky)" icon="droplet" />
          <KpiCard label="Trees funded" value="42" unit="" delta="+8" color="var(--green-2)" icon="plant" />
          <KpiCard label="Energy cut" value="284" unit="kWh" delta="−18%" color="var(--sun)" icon="bolt" />
        </div>

        {/* Mini chart */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 16, marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>30-day ledger</span>
            <span style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'Geist Mono' }}>30d ⌄</span>
          </div>
          <BarChart />
        </div>

        {/* Actions list */}
        <h3 className="font-display" style={{ margin: '20px 0 10px', fontSize: 18, fontWeight: 600 }}>Recent actions</h3>
        {[
          ['leaf', 'Biked to work', 'Today', '+24', '−1.8 kg'],
          ['plant', 'Composted week', 'Yesterday', '+18', '−2.1 kg'],
          ['bolt', 'Renewable plan', 'May 18', '+200', '−42 kg'],
        ].map(([icon, t, w, gp, c], i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--line)',
            borderRadius: 12, padding: 12, marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--green-tint)', color: 'var(--green)', display: 'grid', placeItems: 'center' }}>
              <Icon name={icon} size={16} stroke={2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{t}</div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', fontFamily: 'Geist Mono' }}>{w}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--green)', fontFamily: 'Geist Mono' }}>+{gp} GP</div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', fontFamily: 'Geist Mono' }}>{c} CO₂</div>
            </div>
          </div>
        ))}
      </div>
      <MobileBottomNav active="impact" onNav={onNav} />
    </div>
  );
};
