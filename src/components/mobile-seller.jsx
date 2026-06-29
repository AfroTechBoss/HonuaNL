/* global React, useApp, Icon, MobileTopBar, MobileBottomNav, Avatar,
   SBadge, SStat, SSpark, sMoney, SELLER_CATEGORIES, SELLER_PRACTICES, SELLER_CERTS, MOCK_APPLICATIONS */

const sellScreen = { height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)', position: 'relative' };
const sellScroll = { flex: 1, overflow: 'auto', WebkitOverflowScrolling: 'touch' };

function MBack({ onNav, to = 'marketplace', label = 'Sell on Honua' }) {
  return (
    <MobileTopBar title={
      <button onClick={() => onNav?.(to)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
        <span style={{ transform: 'rotate(180deg)', display: 'inline-flex', color: 'var(--ink)' }}><Icon name="arrow" size={18} /></span>
        <span className="font-display" style={{ fontSize: 19, fontWeight: 600 }}>{label}</span>
      </button>
    } />
  );
}

// Mobile chip multi-select -------------------------------------------
function MChips({ options, value = [], onToggle }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map(o => {
        const on = value.includes(o);
        return (
          <button key={o} onClick={() => onToggle(o)} style={{ padding: '9px 14px', borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: on ? 'var(--green-tint)' : 'var(--surface)', color: on ? 'var(--green)' : 'var(--ink-2)', border: '1px solid ' + (on ? 'transparent' : 'var(--line)') }}>
            {on && <Icon name="check" size={13} stroke={2.6} />}{o}
          </button>
        );
      })}
    </div>
  );
}

function MField({ label, value, onChange, placeholder, prefix, area, type = 'text', hint }) {
  return (
    <label style={{ display: 'block' }}>
      {label && <span className="fld-label">{label}</span>}
      {area ? <textarea className="fld" rows={4} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
        : <div style={{ position: 'relative' }}>
            {prefix && <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-4)', fontSize: 13 }}>{prefix}</span>}
            <input className="fld" type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} style={{ paddingLeft: prefix ? 22 : 13 }} />
          </div>}
      {hint && <span style={{ fontSize: 11.5, color: 'var(--ink-4)', display: 'block', marginTop: 5 }}>{hint}</span>}
    </label>
  );
}

// =====================================================================
// MobileSell — landing + wizard + status
// =====================================================================
window.MobileSell = function MobileSell({ onNav }) {
  const app = useApp();
  const status = app.state?.sellerStatus || 'none';
  const [started, setStarted] = React.useState(false);

  if (status === 'pending')  return <MSellPending onNav={onNav} />;
  if (status === 'approved') return <MSellApproved onNav={onNav} />;
  if (status === 'rejected') return <MSellRejected onNav={onNav} />;
  if (started) return <MApplyWizard onNav={onNav} onExit={() => setStarted(false)} />;
  return <MSellLanding onNav={onNav} onStart={() => setStarted(true)} />;
};

function MSellLanding({ onNav, onStart }) {
  const props = [
    ['users', 'A built-in audience', 'Reach people who already shop for impact.'],
    ['leaf', 'Vouched, not gatekept', 'Approved shops get a verified badge from day one.'],
    ['bolt', 'Tools that run themselves', 'Products, orders, payouts and messages in one place.'],
  ];
  return (
    <div style={sellScreen}>
      <MBack onNav={onNav} />
      <div style={sellScroll} className="no-scrollbar">
        <div style={{ padding: '20px 20px 28px', background: 'linear-gradient(170deg, var(--green-tint), transparent 80%)' }}>
          <span className="chip chip-green" style={{ fontFamily: 'Geist Mono', fontSize: 10 }}>HONUA FOR SELLERS</span>
          <h1 className="font-display" style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '14px 0 0' }}>Sell the things that help the planet.</h1>
          <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.55, margin: '12px 0 0' }}>Open a shop on Honua. Apply once — we review every maker by hand.</p>
        </div>
        <div style={{ padding: '4px 20px 20px', display: 'grid', gap: 12 }}>
          {props.map(([ic, t, d]) => (
            <div key={t} style={{ display: 'flex', gap: 14, padding: 16, borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--line)' }}>
              <span style={{ width: 40, height: 40, borderRadius: 11, flexShrink: 0, background: 'var(--green-tint)', color: 'var(--green)', display: 'grid', placeItems: 'center' }}><Icon name={ic} size={19} stroke={2} /></span>
              <div><div style={{ fontSize: 15, fontWeight: 600 }}>{t}</div><div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2, lineHeight: 1.45 }}>{d}</div></div>
            </div>
          ))}
          <div style={{ background: 'var(--bg-2)', borderRadius: 16, padding: 18, marginTop: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Three steps to your storefront</div>
            {['Apply — ~10 minutes', 'We review by hand — ~2 days', 'Approved → your dashboard unlocks'].map((s, i) => (
              <div key={s} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '6px 0' }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--green)', color: '#fff', fontSize: 11, fontWeight: 600, display: 'grid', placeItems: 'center', fontFamily: 'Geist Mono' }}>{i + 1}</span>
                <span style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 20px 28px', borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
        <button className="btn btn-green" onClick={onStart} style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15 }}>Start your application <Icon name="arrow" size={16} stroke={2.2} /></button>
      </div>
    </div>
  );
}

const M_STEPS = ['Shop', 'Catalog', 'Impact', 'Business', 'Payouts', 'Review'];
const M_TITLE = ['About your shop', 'What you sell', 'Your impact story', 'Business & tax', 'Getting paid', 'Review & submit'];

function MApplyWizard({ onNav, onExit }) {
  const app = useApp();
  const [step, setStep] = React.useState(0);
  const [f, setF] = React.useState({ name: '', handle: '', tagline: '', location: '', categories: [], types: ['Physical goods'], practices: [], certs: [], impact: '', legalName: '', country: '', taxId: '', payout: '', schedule: 'Weekly', agreeSeller: false, agreeImpact: false });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const tog = (k, v) => setF(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }));
  const handle = f.handle || f.name.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const canNext = () => [f.name && f.tagline, f.categories.length, f.impact.length > 10 && f.practices.length, f.legalName && f.country, !!f.payout, f.agreeSeller && f.agreeImpact][step];
  const submit = () => {
    app.setState?.(s => ({ ...s, sellerStatus: 'pending', sellerShop: { name: f.name, handle, tagline: f.tagline } }));
    app.toast?.({ msg: 'Application submitted', sub: 'Review within 2 business days.', kind: 'success', icon: 'check' });
  };

  return (
    <div style={sellScreen}>
      <MobileTopBar title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => step === 0 ? onExit() : setStep(s => s - 1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--ink)' }}><span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon name="arrow" size={18} /></span></button>
          <span className="font-display" style={{ fontSize: 17, fontWeight: 600 }}>Application</span>
        </div>
      } right={<span style={{ fontSize: 12, color: 'var(--ink-4)', fontFamily: 'Geist Mono' }}>{step + 1}/6</span>} />
      {/* progress dots */}
      <div style={{ display: 'flex', gap: 5, padding: '0 20px 12px', background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}>
        {M_STEPS.map((s, i) => <span key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? 'var(--green)' : 'var(--line-2)' }} />)}
      </div>

      <div style={sellScroll} className="no-scrollbar">
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 11, fontFamily: 'Geist Mono', color: 'var(--green)', letterSpacing: '.05em' }}>{M_STEPS[step].toUpperCase()}</div>
          <h2 className="font-display" style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', margin: '5px 0 18px' }}>{M_TITLE[step]}</h2>

          {step === 0 && <div style={{ display: 'grid', gap: 16 }}>
            <MField label="Shop name" value={f.name} onChange={v => set('name', v)} placeholder="e.g. The Fix-it Collective" />
            <MField label="Handle" value={handle} onChange={v => set('handle', v.replace(/[^a-z0-9]/gi, '').toLowerCase())} prefix="shop/" hint="Your storefront URL." />
            <MField label="Tagline" value={f.tagline} onChange={v => set('tagline', v)} placeholder="What you make and why." />
            <MField label="Location" value={f.location} onChange={v => set('location', v)} placeholder="City, Country" />
          </div>}

          {step === 1 && <div style={{ display: 'grid', gap: 22 }}>
            <div><span className="fld-label">What do you sell?</span><MChips options={SELLER_CATEGORIES} value={f.categories} onToggle={v => tog('categories', v)} /></div>
            <div><span className="fld-label">Type of offering</span><MChips options={['Physical goods', 'Digital products', 'Services']} value={f.types} onToggle={v => tog('types', v)} /></div>
          </div>}

          {step === 2 && <div style={{ display: 'grid', gap: 22 }}>
            <MField label="Your sustainability story" area value={f.impact} onChange={v => set('impact', v)} placeholder="Why are your goods better for the planet?" hint="This is the heart of your impact label." />
            <div><span className="fld-label">Practices</span><MChips options={SELLER_PRACTICES} value={f.practices} onToggle={v => tog('practices', v)} /></div>
            <div><span className="fld-label">Certifications · optional</span><MChips options={SELLER_CERTS} value={f.certs} onToggle={v => tog('certs', v)} /></div>
          </div>}

          {step === 3 && <div style={{ display: 'grid', gap: 16 }}>
            <MField label="Legal / registered name" value={f.legalName} onChange={v => set('legalName', v)} placeholder="Business or full legal name" />
            <MField label="Country" value={f.country} onChange={v => set('country', v)} placeholder="Country of registration" />
            <MField label="Tax ID / VAT" value={f.taxId} onChange={v => set('taxId', v)} placeholder="VAT or tax number" />
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: 13, borderRadius: 12, background: 'var(--sky-tint)' }}>
              <Icon name="lock" size={15} color="var(--sky)" /><span style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.45 }}>Used only for verification & payouts. Never shown publicly.</span>
            </div>
          </div>}

          {step === 4 && <div style={{ display: 'grid', gap: 12 }}>
            <button onClick={() => set('payout', 'stripe')} className="opt-row" style={{ borderColor: f.payout === 'stripe' ? 'var(--green)' : 'var(--line)', background: f.payout === 'stripe' ? 'var(--green-tint)' : 'var(--surface)' }}>
              <span style={{ width: 38, height: 38, borderRadius: 10, background: '#635bff', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, flexShrink: 0 }}>S</span>
              <span style={{ flex: 1 }}><span style={{ fontSize: 14, fontWeight: 600 }}>Connect with Stripe</span><span style={{ display: 'block', fontSize: 12, color: 'var(--ink-3)' }}>Recommended · fastest payouts</span></span>
            </button>
            <button onClick={() => set('payout', 'bank')} className="opt-row" style={{ borderColor: f.payout === 'bank' ? 'var(--green)' : 'var(--line)', background: f.payout === 'bank' ? 'var(--green-tint)' : 'var(--surface)' }}>
              <span style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--bg-2)', color: 'var(--ink-2)', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name="globe" size={18} /></span>
              <span style={{ flex: 1 }}><span style={{ fontSize: 14, fontWeight: 600 }}>Bank transfer</span><span style={{ display: 'block', fontSize: 12, color: 'var(--ink-3)' }}>2–5 business days</span></span>
            </button>
            <div style={{ marginTop: 6 }}><span className="fld-label">Payout schedule</span>
              <div style={{ display: 'flex', gap: 8 }}>{['Daily', 'Weekly', 'Monthly'].map(s => <button key={s} onClick={() => set('schedule', s)} className={'chip' + (f.schedule === s ? ' chip-green' : '')} style={{ cursor: 'pointer' }}>{s}</button>)}</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.45, marginTop: 4 }}>Honua takes a <strong style={{ color: 'var(--ink-2)' }}>5%</strong> sale fee. Withdrawals add <strong style={{ color: 'var(--ink-2)' }}>2%</strong>. No monthly costs.</div>
          </div>}

          {step === 5 && <div style={{ display: 'grid', gap: 14 }}>
            {[['Shop', `${f.name || '—'} · @${handle || '—'}`, 0], ['Catalog', f.categories.join(', ') || '—', 1], ['Impact', (f.practices.join(', ') || '—'), 2], ['Business', `${f.legalName || '—'} · ${f.country || '—'}`, 3], ['Payout', f.payout === 'stripe' ? 'Stripe' : f.payout === 'bank' ? 'Bank transfer' : '—', 4]].map(([t, v, s]) => (
              <div key={t} style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--surface)', padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{t}</span>
                  <button onClick={() => setStep(s)} style={{ background: 'transparent', border: 'none', color: 'var(--green)', fontWeight: 600, fontSize: 12.5, cursor: 'pointer' }}>Edit</button>
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 3 }}>{v}</div>
              </div>
            ))}
            <MCheck checked={f.agreeSeller} onToggle={() => set('agreeSeller', !f.agreeSeller)} title="I agree to the Honua Seller Policy" />
            <MCheck checked={f.agreeImpact} onToggle={() => set('agreeImpact', !f.agreeImpact)} title="I'll keep my impact claims honest" />
          </div>}
        </div>
      </div>

      <div style={{ padding: '12px 20px 28px', borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
        {step < 5
          ? <button className="btn btn-green" disabled={!canNext()} onClick={() => setStep(s => s + 1)} style={{ width: '100%', justifyContent: 'center', padding: '14px', opacity: canNext() ? 1 : .45 }}>Continue</button>
          : <button className="btn btn-green" disabled={!canNext()} onClick={submit} style={{ width: '100%', justifyContent: 'center', padding: '14px', opacity: canNext() ? 1 : .45 }}>Submit application</button>}
      </div>
    </div>
  );
}

function MCheck({ checked, onToggle, title }) {
  return (
    <button onClick={onToggle} className="opt-row">
      <span style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, border: '1.5px solid ' + (checked ? 'var(--green)' : 'var(--line-2)'), background: checked ? 'var(--green)' : 'transparent', color: '#fff', display: 'grid', placeItems: 'center' }}>{checked && <Icon name="check" size={13} stroke={3} />}</span>
      <span style={{ fontSize: 13.5, fontWeight: 500 }}>{title}</span>
    </button>
  );
}

// ---- Mobile status screens ----
function MStatusWrap({ onNav, children }) {
  return <div style={sellScreen}><MBack onNav={onNav} /><div style={{ ...sellScroll, display: 'grid', placeItems: 'center', padding: 24 }} className="no-scrollbar"><div style={{ width: '100%', maxWidth: 380, textAlign: 'center' }}>{children}</div></div></div>;
}

function MSellPending({ onNav }) {
  const app = useApp();
  const shop = app.state?.sellerShop?.name || 'Your shop';
  return (
    <MStatusWrap onNav={onNav}>
      <span style={{ width: 60, height: 60, borderRadius: 18, background: window.sTint('var(--sun)', 18), color: 'var(--sun)', display: 'inline-grid', placeItems: 'center' }}><Icon name="clock" size={28} stroke={2} /></span>
      <h1 className="font-display" style={{ fontSize: 26, fontWeight: 600, margin: '16px 0 0', letterSpacing: '-0.02em' }}>In review</h1>
      <p style={{ fontSize: 14.5, color: 'var(--ink-3)', lineHeight: 1.55, margin: '10px 0 0' }}>Thanks for applying with <strong style={{ color: 'var(--ink-2)' }}>{shop}</strong>. We review every maker by hand — usually within 2 business days.</p>
      <div style={{ marginTop: 22, textAlign: 'left', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: 18 }}>
        {[['Submitted', 'done'], ['In review', 'active'], ['Decision', 'todo']].map(([t, st], i) => (
          <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '7px 0' }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, display: 'grid', placeItems: 'center', background: st === 'done' ? 'var(--green)' : st === 'active' ? 'var(--sun)' : 'var(--bg-2)', color: st === 'todo' ? 'var(--ink-4)' : '#fff', border: st === 'todo' ? '1px solid var(--line)' : 'none' }}>{st === 'done' ? <Icon name="check" size={13} stroke={2.6} /> : i + 1}</span>
            <span style={{ fontSize: 14, fontWeight: st === 'active' ? 600 : 500, color: st === 'todo' ? 'var(--ink-4)' : 'var(--ink)' }}>{t}</span>
            {st === 'active' && <SBadge status="in-review" size="sm" />}
          </div>
        ))}
      </div>
      <button className="btn btn-ghost" onClick={() => onNav?.('admin')} style={{ width: '100%', justifyContent: 'center', marginTop: 16, color: 'var(--green)', borderColor: 'var(--green-3)' }}>Open admin review →</button>
      <p style={{ fontSize: 11, color: 'var(--ink-4)', marginTop: 12, fontFamily: 'Geist Mono' }}>Demo: approve from the admin queue to unlock the dashboard.</p>
    </MStatusWrap>
  );
}

function MSellApproved({ onNav }) {
  const app = useApp();
  const shop = app.state?.sellerShop?.name || 'Your shop';
  return (
    <MStatusWrap onNav={onNav}>
      <span style={{ width: 60, height: 60, borderRadius: 18, background: 'var(--green-tint)', color: 'var(--green)', display: 'inline-grid', placeItems: 'center' }}><Icon name="check" size={30} stroke={2.6} /></span>
      <h1 className="font-display" style={{ fontSize: 28, fontWeight: 600, margin: '16px 0 0', letterSpacing: '-0.02em' }}>You're approved 🎉</h1>
      <p style={{ fontSize: 14.5, color: 'var(--ink-3)', lineHeight: 1.55, margin: '10px 0 0' }}><strong style={{ color: 'var(--ink-2)' }}>{shop}</strong> is now a verified Honua shop. Add your first product and you're live.</p>
      <button className="btn btn-green" onClick={() => onNav?.('seller')} style={{ width: '100%', justifyContent: 'center', marginTop: 22, padding: '14px' }}>Go to your dashboard <Icon name="arrow" size={16} stroke={2.2} /></button>
    </MStatusWrap>
  );
}

function MSellRejected({ onNav }) {
  const app = useApp();
  return (
    <MStatusWrap onNav={onNav}>
      <span style={{ width: 60, height: 60, borderRadius: 18, background: window.sTint('var(--clay)', 16), color: 'var(--clay)', display: 'inline-grid', placeItems: 'center' }}><Icon name="close" size={28} stroke={2.4} /></span>
      <h1 className="font-display" style={{ fontSize: 24, fontWeight: 600, margin: '16px 0 0', letterSpacing: '-0.02em' }}>Not approved yet</h1>
      <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.55, margin: '10px 0 0' }}>A reviewer left notes on what to strengthen. You can revise and re-apply anytime.</p>
      <button className="btn btn-green" onClick={() => app.setState?.(s => ({ ...s, sellerStatus: 'none' }))} style={{ width: '100%', justifyContent: 'center', marginTop: 20, padding: '13px' }}>Revise & re-apply</button>
    </MStatusWrap>
  );
}

// (MobileAdmin lives in components/mobile-admin.jsx — the full admin console)
