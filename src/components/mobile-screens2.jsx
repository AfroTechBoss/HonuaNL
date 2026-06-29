/* global React */

// =============== Mobile Compose ===============
window.MobileCompose = function MobileCompose({ onNav }) {
  return (
    <div style={{ height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <MobileTopBar
        title={<span style={{ fontSize: 16, fontWeight: 600 }}>New post</span>}
        right={<>
          <button onClick={() => onNav?.('home')} style={{ ...iconBtn, background: 'transparent', border: 'none' }}>
            <Icon name="close" size={20} />
          </button>
        </>}
      />
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }} className="no-scrollbar">
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <Avatar name="You" size={40} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>You</div>
            <div className="chip" style={{ marginTop: 4 }}>
              <Icon name="globe" size={11} /> Public · Anyone can see
            </div>
          </div>
        </div>
        <textarea placeholder="What sustainable thing did you do today?" style={{
          width: '100%', minHeight: 160, border: 'none', outline: 'none', resize: 'none',
          background: 'transparent', fontSize: 18, lineHeight: 1.5, fontFamily: 'Geist',
        }} defaultValue="Just rode 8km to work — that's 1.8 kg of CO₂ avoided. Day 12 of the bike challenge 🚴‍♀️" />

        {/* Attached image */}
        <div style={{ position: 'relative', marginTop: 8 }}>
          <ImagePlaceholder label="attached: bike at office rack" height={200} />
          <button style={{
            position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%',
            background: 'rgba(0,0,0,.6)', color: '#fff', border: 'none', display: 'grid', placeItems: 'center',
          }}><Icon name="close" size={14} stroke={2.5} /></button>
        </div>

        {/* Action linkage */}
        <div style={{
          marginTop: 14, padding: 14, background: 'var(--green-tint)',
          border: '1px solid var(--green-3)', borderRadius: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Icon name="leaf" size={16} color="var(--green)" />
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>Log as a verified action</div>
          </div>
          <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>
            We'll cross-check with your phone's motion data and add the impact to your ledger.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{ background: '#fff', borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 10, fontFamily: 'Geist Mono', color: 'var(--ink-3)' }}>CATEGORY</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>🚲 Transport</div>
            </div>
            <div style={{ background: '#fff', borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 10, fontFamily: 'Geist Mono', color: 'var(--ink-3)' }}>EST. IMPACT</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2, color: 'var(--green)' }}>−1.8 kg · +24 GP</div>
            </div>
          </div>
        </div>

        {/* Tags + location */}
        <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
          <span className="chip"><Icon name="pin" size={11} /> Brooklyn, NY</span>
          <span className="chip">#BikeCommute</span>
          <span className="chip">#BikeChallenge</span>
          <span className="chip" style={{ borderStyle: 'dashed' }}>+ tag</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        background: 'var(--surface)', borderTop: '1px solid var(--line)', padding: 16,
        paddingBottom: 32, display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button style={iconBtn}><Icon name="image" size={18} /></button>
        <button style={iconBtn}><Icon name="pin" size={18} /></button>
        <button style={iconBtn}><Icon name="leaf" size={18} /></button>
        <button style={iconBtn}><Icon name="users" size={18} /></button>
        <button className="btn btn-green" style={{ marginLeft: 'auto', padding: '10px 22px' }}>Post</button>
      </div>
    </div>
  );
};

// =============== Mobile Auth / Login ===============
window.MobileAuth = function MobileAuth({ onNav }) {
  return (
    <div style={{ height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Hero illustration */}
      <div style={{
        height: 340, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(180deg, #1f6f3f 0%, #2e9a5b 60%, #c8e6cf 100%)',
      }}>
        <svg viewBox="0 0 400 340" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <circle cx="320" cy="80" r="38" fill="#fff" opacity=".18"/>
          <path d="M0 220 Q100 180 200 200 T400 190 L400 340 0 340Z" fill="rgba(255,255,255,.08)"/>
          <path d="M0 260 Q100 220 200 240 T400 230 L400 340 0 340Z" fill="rgba(255,255,255,.12)"/>
          <path d="M0 290 Q100 260 200 270 T400 260 L400 340 0 340Z" fill="rgba(255,255,255,.18)"/>
        </svg>
        <div style={{ position: 'absolute', top: 64, left: 24 }}>
          <Logo size={32} />
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: 24, right: 24, color: '#fff' }}>
          <h1 className="font-display" style={{ margin: 0, fontSize: 30, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            The social network<br/>for people fixing the planet.
          </h1>
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 32 }}>
        <div>
          <label style={{ fontSize: 11, fontFamily: 'Geist Mono', color: 'var(--ink-3)', letterSpacing: '.05em' }}>EMAIL</label>
          <input defaultValue="sarah@sunhill.coop" style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: 11, fontFamily: 'Geist Mono', color: 'var(--ink-3)', letterSpacing: '.05em' }}>PASSWORD</label>
          <input type="password" defaultValue="••••••••••" style={inputStyle} />
        </div>
        <button onClick={() => onNav?.('home')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px 16px', fontSize: 15, fontWeight: 500, marginTop: 4 }}>
          Sign in
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ink-4)', margin: '14px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          <span style={{ fontSize: 11, fontFamily: 'Geist Mono' }}>OR</span>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>
        <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '11px 16px', fontSize: 14 }}>Continue with Google</button>
        <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '11px 16px', fontSize: 14 }}>Continue with Apple</button>
        <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '11px 16px', fontSize: 14 }}>Continue with Celo wallet</button>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink-3)', marginTop: 'auto' }}>
          New here? <strong onClick={() => onNav?.('onboarding')} style={{ color: 'var(--green)', cursor: 'pointer' }}>Create an account →</strong>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', background: 'var(--surface)', border: '1px solid var(--line)',
  borderRadius: 12, padding: '13px 14px', fontSize: 15, marginTop: 4,
  fontFamily: 'Geist', outline: 'none',
};

// =============== Mobile Onboarding ===============
window.MobileOnboarding = function MobileOnboarding({ onNav }) {
  return (
    <div style={{ height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingTop: 56, paddingLeft: 20, paddingRight: 20, paddingBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={iconBtn}>
          <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}><Icon name="arrow" size={18} /></span>
        </button>
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {[1, 1, 1, 0, 0].map((on, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 999, background: on ? 'var(--green)' : 'var(--line)' }} />
          ))}
        </div>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--ink-3)', fontSize: 13, cursor: 'pointer' }}>Skip</button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 100px' }} className="no-scrollbar">
        <div style={{ fontSize: 11, fontFamily: 'Geist Mono', color: 'var(--green)', letterSpacing: '.05em' }}>STEP 3 OF 5</div>
        <h1 className="font-display" style={{ margin: '4px 0 6px', fontSize: 28, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          What do you care about?
        </h1>
        <p style={{ margin: '0 0 18px', fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.5 }}>
          Pick a few — we'll use these to shape your feed and suggest projects near you.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            ['Solar energy', true],
            ['Composting', true],
            ['Urban gardening', false],
            ['Cycling', true],
            ['Zero waste', true],
            ['Veganism', false],
            ['Ocean cleanup', false],
            ['Policy & advocacy', false],
            ['Repair & DIY', true],
            ['Renewable energy', false],
            ['Biodiversity', false],
            ['Climate science', false],
            ['Slow fashion', false],
            ['Carbon offsets', false],
            ['Community building', true],
          ].map(([t, on]) => (
            <button key={t} style={{
              padding: '10px 14px', borderRadius: 999,
              background: on ? 'var(--green)' : 'var(--surface)',
              color: on ? '#fff' : 'var(--ink-2)',
              border: on ? 'none' : '1px solid var(--line)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              display: 'inline-flex', gap: 6, alignItems: 'center',
            }}>
              {on && <Icon name="check" size={12} stroke={2.5} />} {t}
            </button>
          ))}
        </div>

        <div style={{
          marginTop: 24, padding: 16, background: 'var(--surface)',
          border: '1px solid var(--line)', borderRadius: 14,
        }}>
          <div style={{ fontSize: 11, fontFamily: 'Geist Mono', color: 'var(--ink-3)' }}>NEXT</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>Set your impact goal</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>How much CO₂ do you want to avoid this year?</div>
        </div>
      </div>
      <div style={{ padding: 20, paddingBottom: 32, background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px 16px', fontSize: 15 }}>
          Continue · 5 picked
        </button>
      </div>
    </div>
  );
};

// =============== Mobile Notifications ===============
window.MobileNotifications = function MobileNotifications({ onNav }) {
  const items = [
    { type: 'verified', what: 'Your "renewable plan" action was verified · +200 GP', t: '14m', new: true },
    { type: 'like', who: 'sarah', what: 'liked your post', t: '32m', new: true },
    { type: 'follow', who: 'okafor', what: 'started following you', t: '1h', new: true },
    { type: 'milestone', what: '12-day streak unlocked 🔥', t: '2h', new: true },
    { type: 'comment', who: 'marcus', what: 'replied: "Saturday works"', t: '3h' },
    { type: 'project', what: 'Prospect Park cleanup · Saturday 9am', t: '5h' },
    { type: 'community', who: 'maya', what: 'invited you to Urban gardeners', t: '1d' },
  ];
  return (
    <div style={{ height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <MobileTopBar
        title="Notifications"
        right={<button style={{ ...iconBtn, background: 'transparent', border: 'none' }}><Icon name="settings" size={18} /></button>}
      />
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px 100px' }} className="no-scrollbar">
        <div className="pill-nav" style={{ display: 'flex', marginBottom: 12 }}>
          <button className="active" style={{ flex: 1 }}>All</button>
          <button style={{ flex: 1 }}>Mentions</button>
          <button style={{ flex: 1 }}>Impact</button>
        </div>
        <div style={{ background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--line)', overflow: 'hidden' }}>
          {items.map((n, i) => {
            const icon = { like: 'heart', verified: 'leaf', follow: 'user', milestone: 'flame', comment: 'comment', project: 'pin', community: 'users' }[n.type];
            const col = { like: 'var(--clay)', verified: 'var(--green)', follow: 'var(--sky)', milestone: 'var(--sun)', comment: 'var(--ink)', project: 'var(--green-2)', community: 'var(--sky)' }[n.type];
            const u = n.who && MOCK.users[n.who];
            return (
              <div key={i} style={{
                display: 'flex', gap: 12, padding: 14,
                borderBottom: i === items.length - 1 ? 'none' : '1px solid var(--line)',
                background: n.new ? 'var(--green-tint)' : 'transparent',
              }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: col + '20', color: col, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon name={icon} size={16} stroke={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, lineHeight: 1.4 }}>
                    {u && <strong>{u.name} </strong>}
                    {n.what}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--ink-3)', fontFamily: 'Geist Mono', marginTop: 4 }}>{n.t}</div>
                </div>
                {n.new && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', marginTop: 8 }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// =============== Mobile Messages ===============
window.MobileMessages = function MobileMessages({ onNav }) {
  return (
    <div style={{ height: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingTop: 56, paddingLeft: 16, paddingRight: 16, paddingBottom: 8, background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <button style={iconBtn}>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}><Icon name="arrow" size={18} /></span>
          </button>
          <Avatar name="Sarah Green" size={40} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              Sarah Green
              <span style={{ background: 'var(--sky)', color: '#fff', width: 12, height: 12, borderRadius: '50%', display: 'inline-grid', placeItems: 'center', fontSize: 8 }}>✓</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'Geist Mono' }}>● active now</div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }} className="no-scrollbar">
        <DayLabel l="Today · 9:42" />
        <Msg from="them">Hey! Saw your zero-waste post.</Msg>
        <Msg from="them">Trying something similar at the co-op. Vendor recs?</Msg>
        <Msg from="me">Of course! Mostly local.</Msg>
        <Msg from="me">Sending the list now.</Msg>
        <Msg from="them" attach="Sunhill_wiring_v3.pdf · 2.4 MB">Amazing — please send.</Msg>
        <Msg from="me">Attached above 👆</Msg>
      </div>
      <div style={{ padding: 12, paddingBottom: 28, background: 'var(--surface)', borderTop: '1px solid var(--line)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <button style={{ ...iconBtn, background: 'var(--bg-2)', border: 'none' }}>
          <Icon name="plus" size={18} />
        </button>
        <input placeholder="Message…" style={{
          flex: 1, background: 'var(--bg-2)', border: 'none', outline: 'none',
          padding: '10px 14px', borderRadius: 999, fontSize: 14, fontFamily: 'Geist',
        }} />
        <button className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 12 }}>Send</button>
      </div>
    </div>
  );
};
