/* global React, useApp, Icon, MobileTopBar, Avatar, SBadge, SStat, SSpark, sMoney, sTint,
   RoleChip, MOCK_ADMIN, MOCK_APPLICATIONS */

const aScreen = { height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)', position: 'relative' };

// =====================================================================
// MobileAdmin — full admin console (section switcher)
// =====================================================================
window.MobileAdmin = function MobileAdmin({ onNav }) {
  const app = useApp();
  const [section, setSection] = React.useState('overview');
  const [reports, setReports]   = React.useState(MOCK_ADMIN.reports);
  const [products, setProducts] = React.useState(MOCK_ADMIN.products);
  const [users, setUsers]       = React.useState(MOCK_ADMIN.users);
  const [audit, setAudit]       = React.useState(MOCK_ADMIN.audit);
  const log = (action, target, kind) => setAudit(a => [{ id: 'l' + Date.now(), actor: 'You', action, target, time: 'just now', kind }, ...a]);

  const openReports = reports.filter(r => r.status === 'open').length;
  const flaggedProducts = products.filter(p => p.status === 'flagged').length;
  const userPending = app.state?.sellerStatus === 'pending';
  const sellerQueue = MOCK_APPLICATIONS.filter(a => a.status === 'pending').length + (userPending ? 1 : 0);

  const ctx = { reports, setReports, products, setProducts, users, setUsers, audit, log };
  const TABS = [['overview', 'Home'], ['moderation', 'Reports', openReports], ['products', 'Products', flaggedProducts], ['users', 'Users'], ['sellers', 'Sellers', sellerQueue], ['activity', 'Log']];

  return (
    <div style={aScreen}>
      <MobileTopBar title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--ink-solid)', display: 'grid', placeItems: 'center', color: '#fff' }}><Icon name="leaf" size={15} stroke={2.2} /></span>
          <div style={{ lineHeight: 1 }}><span className="font-display" style={{ fontSize: 16, fontWeight: 600 }}>Admin</span></div>
        </div>
      } right={<span style={{ fontSize: 10, color: 'var(--clay)', fontFamily: 'Geist Mono', fontWeight: 600, background: sTint('var(--clay)'), padding: '3px 8px', borderRadius: 6 }}>OWNER</span>} />

      <div style={{ display: 'flex', gap: 4, padding: '0 12px 10px', overflowX: 'auto', background: 'var(--surface)', borderBottom: '1px solid var(--line)' }} className="no-scrollbar">
        {TABS.map(([k, l, n]) => (
          <button key={k} onClick={() => setSection(k)} style={{ flexShrink: 0, padding: '8px 13px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: section === k ? 600 : 500, display: 'flex', alignItems: 'center', gap: 6,
            background: section === k ? 'var(--ink)' : 'var(--bg-2)', color: section === k ? '#fff' : 'var(--ink-3)' }}>
            {l}{n > 0 && <span style={{ background: section === k ? 'rgba(255,255,255,.25)' : 'var(--clay)', color: '#fff', fontSize: 10, fontWeight: 600, fontFamily: 'Geist Mono', minWidth: 16, height: 16, borderRadius: 8, display: 'grid', placeItems: 'center', padding: '0 4px' }}>{n}</span>}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto' }} className="no-scrollbar">
        {section === 'overview'   && <MAdminOverview ctx={ctx} go={setSection} openReports={openReports} flaggedProducts={flaggedProducts} sellerQueue={sellerQueue} />}
        {section === 'moderation' && <MAdminModeration ctx={ctx} />}
        {section === 'products'   && <MAdminProducts ctx={ctx} />}
        {section === 'users'      && <MAdminUsers ctx={ctx} />}
        {section === 'sellers'    && <MAdminSellers ctx={ctx} />}
        {section === 'activity'   && <MAdminActivity ctx={ctx} />}
      </div>
    </div>
  );
};

function MAdminOverview({ ctx, go, openReports, flaggedProducts, sellerQueue }) {
  const s = MOCK_ADMIN.stats;
  const queues = [
    ['Reports to review', openReports, 'flame', 'var(--clay)', 'moderation'],
    ['Flagged products', flaggedProducts, 'bag', 'var(--sun)', 'products'],
    ['Seller applications', sellerQueue, 'leaf', 'var(--green)', 'sellers'],
    ['Suspended accounts', s.suspended, 'lock', 'var(--ink-3)', 'users'],
  ];
  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: 'var(--ink-solid)', color: '#fff', borderRadius: 18, padding: 20 }}>
        <div style={{ fontSize: 12.5, opacity: .7 }}>GMV · 30 days</div>
        <div className="font-display tabular" style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em', marginTop: 2 }}>{sMoney(s.gmv, 0)}</div>
        <div style={{ fontSize: 12, opacity: .65, marginTop: 2 }}>↑ {s.gmvTrend}% · fee revenue ≈ {sMoney(s.gmv * 0.05, 0)}</div>
        <div style={{ marginTop: 10, marginLeft: -4 }}><SSpark data={MOCK_ADMIN.gmvSeries} color="#fff" w={300} h={50} fill={false} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
        <SStat label="Members" value={(s.members / 1000).toFixed(1) + 'k'} icon="users" trend={s.membersTrend} />
        <SStat label="Sellers" value={s.sellers} icon="leaf" trend={s.sellersTrend} accent="var(--green)" />
      </div>
      <div style={{ marginTop: 16, fontSize: 15, fontWeight: 600, marginBottom: 10 }}>Needs attention</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {queues.map(([label, n, icon, color, dest]) => (
          <button key={label} onClick={() => go(dest)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 13, borderRadius: 14, border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
            <span style={{ width: 34, height: 34, borderRadius: 9, display: 'grid', placeItems: 'center', background: sTint(color), color }}><Icon name={icon} size={16} /></span>
            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500 }}>{label}</span>
            <span className="font-display tabular" style={{ fontSize: 18, fontWeight: 600, color: n > 0 ? color : 'var(--ink-4)' }}>{n}</span>
            <Icon name="chevron" size={16} color="var(--ink-4)" />
          </button>
        ))}
      </div>
    </div>
  );
}

function MAdminModeration({ ctx }) {
  const { reports, setReports, products, setProducts, users, setUsers, log } = ctx;
  const app = useApp();
  const [sel, setSel] = React.useState(null);
  const open = reports.filter(r => r.status === 'open');
  const r = reports.find(x => x.id === sel);
  const sev = { high: 'var(--clay)', medium: 'var(--sun)', low: 'var(--ink-3)' };

  const resolve = (id, outcome) => {
    const rr = reports.find(x => x.id === id);
    setReports(rs => rs.map(x => x.id === id ? { ...x, status: outcome === 'dismiss' ? 'dismissed' : 'resolved' } : x));
    if (outcome === 'remove') { setProducts(ps => ps.map(p => p.handle === rr.author ? { ...p, status: 'removed' } : p)); log('removed reported content', rr.target, 'trash'); app.toast?.({ msg: 'Content removed', icon: 'trash' }); }
    else if (outcome === 'suspend') { setUsers(us => us.map(u => u.handle === rr.author ? { ...u, status: 'suspended' } : u)); log('suspended account', '@' + rr.author, 'lock'); app.toast?.({ msg: 'Account suspended', sub: '@' + rr.author, icon: 'lock' }); }
    else { log(outcome === 'dismiss' ? 'dismissed a report' : 'resolved a report', rr.target, outcome === 'dismiss' ? 'close' : 'check'); app.toast?.({ msg: outcome === 'dismiss' ? 'Dismissed' : 'Resolved', kind: outcome === 'dismiss' ? undefined : 'success', icon: outcome === 'dismiss' ? 'close' : 'check' }); }
    setSel(null);
  };

  return (
    <div style={{ padding: 16, display: 'grid', gap: 10 }}>
      {open.map(rep => (
        <button key={rep.id} onClick={() => setSel(rep.id)} style={{ display: 'flex', gap: 12, textAlign: 'left', padding: 14, borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--line)', cursor: 'pointer' }}>
          <span style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, background: sev[rep.severity], flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
              <span className="chip" style={{ fontSize: 10, fontFamily: 'Geist Mono', padding: '1px 6px' }}>{rep.type}</span>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: sev[rep.severity], fontFamily: 'Geist Mono' }}>{rep.reason}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rep.target}</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-4)', fontFamily: 'Geist Mono', marginTop: 4 }}>@{rep.author} · {rep.reporters} reports · {rep.time}</div>
          </div>
        </button>
      ))}
      {open.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-4)', fontSize: 14 }}><Icon name="check" size={26} /><div style={{ marginTop: 8 }}>Queue is clear ✨</div></div>}

      {r && (
        <React.Fragment>
          <div onClick={() => setSel(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(10,13,11,.4)', zIndex: 60 }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 61, background: 'var(--surface)', borderRadius: '22px 22px 0 0', maxHeight: '88%', overflow: 'auto', padding: '8px 20px 26px' }} className="no-scrollbar">
            <div style={{ width: 38, height: 4, borderRadius: 2, background: 'var(--line-2)', margin: '8px auto 16px' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: sev[r.severity], fontFamily: 'Geist Mono' }}>{r.reason} · {r.severity}</span>
            <div style={{ fontSize: 16, fontWeight: 600, margin: '6px 0 8px' }}>{r.target}</div>
            <p style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.55, margin: 0, padding: 13, background: 'var(--bg-2)', borderRadius: 12 }}>{r.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}><Avatar name={r.authorName} size={32} /><div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 600 }}>{r.authorName}</div><div style={{ fontSize: 11.5, color: 'var(--ink-4)', fontFamily: 'Geist Mono' }}>@{r.author}</div></div><span style={{ fontSize: 12, color: 'var(--clay)', fontWeight: 600, fontFamily: 'Geist Mono' }}>{r.reporters} reports</span></div>
            <div style={{ display: 'grid', gap: 8, marginTop: 18 }}>
              <button className="btn btn-ghost" onClick={() => resolve(r.id, 'remove')} style={{ justifyContent: 'center', color: 'var(--clay)', borderColor: 'color-mix(in srgb, var(--clay) 30%, transparent)', padding: '12px' }}><Icon name="trash" size={15} /> Remove content</button>
              <button className="btn btn-ghost" onClick={() => resolve(r.id, 'suspend')} style={{ justifyContent: 'center', padding: '12px' }}><Icon name="lock" size={15} /> Suspend @{r.author}</button>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-green" onClick={() => resolve(r.id, 'resolve')} style={{ flex: 1, justifyContent: 'center', padding: '12px' }}><Icon name="check" size={15} /> Resolve</button>
                <button className="btn btn-ghost" onClick={() => resolve(r.id, 'dismiss')} style={{ flex: 1, justifyContent: 'center', padding: '12px' }}>Dismiss</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

function MAdminProducts({ ctx }) {
  const { products, setProducts, log } = ctx;
  const app = useApp();
  const [filter, setFilter] = React.useState('all');
  const act = (id, status, verb, kind) => {
    const p = products.find(x => x.id === id);
    setProducts(ps => ps.map(x => x.id === id ? { ...x, status, flags: status === 'live' ? 0 : x.flags } : x));
    log(verb, p?.title || '', kind); app.toast?.({ msg: verb.charAt(0).toUpperCase() + verb.slice(1), sub: p?.title, kind: status === 'live' ? 'success' : undefined, icon: kind });
  };
  const rows = products.filter(p => filter === 'all' || p.status === filter);
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto' }} className="no-scrollbar">
        {[['all', 'All'], ['live', 'Live'], ['flagged', 'Flagged'], ['removed', 'Removed']].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} className={'chip' + (filter === k ? ' chip-green' : '')} style={{ cursor: 'pointer', flexShrink: 0 }}>{l}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {rows.map(p => (
          <div key={p.id} style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--line)', alignItems: 'center' }}>
            <div style={{ width: 46, height: 46, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}><ImagePlaceholder label="" height={46} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 4 }}>
                <span className="tabular" style={{ fontSize: 12.5, fontWeight: 600 }}>{sMoney(p.price, 0)}</span>
                <SBadge status={p.status} size="sm" />
                {p.flags > 0 && <span style={{ fontSize: 11, color: 'var(--clay)', fontFamily: 'Geist Mono', fontWeight: 600 }}>{p.flags} flags</span>}
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'Geist Mono', marginTop: 3 }}>@{p.handle}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {p.status === 'flagged' && <button onClick={() => act(p.id, 'removed', 'removed a flagged product', 'trash')} style={{ width: 32, height: 32, borderRadius: 9, border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--clay)', display: 'grid', placeItems: 'center' }}><Icon name="trash" size={14} /></button>}
              {p.status === 'flagged' && <button onClick={() => act(p.id, 'live', 'cleared flags on', 'check')} style={{ width: 32, height: 32, borderRadius: 9, border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--green)', display: 'grid', placeItems: 'center' }}><Icon name="check" size={14} /></button>}
              {p.status === 'live' && <button onClick={() => act(p.id, 'flagged', 'flagged a product', 'flame')} style={{ width: 32, height: 32, borderRadius: 9, border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--sun)', display: 'grid', placeItems: 'center' }}><Icon name="flame" size={14} /></button>}
              {p.status === 'removed' && <button onClick={() => act(p.id, 'live', 'restored a product', 'check')} style={{ width: 32, height: 32, borderRadius: 9, border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--green)', display: 'grid', placeItems: 'center' }}><Icon name="repost" size={14} /></button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MAdminUsers({ ctx }) {
  const { users, setUsers, log } = ctx;
  const app = useApp();
  const [filter, setFilter] = React.useState('all');
  const setStatus = (id, status, verb, kind) => {
    const u = users.find(x => x.id === id);
    setUsers(us => us.map(x => x.id === id ? { ...x, status } : x));
    log(verb, '@' + (u?.handle || ''), kind); app.toast?.({ msg: verb.charAt(0).toUpperCase() + verb.slice(1), sub: '@' + u?.handle, kind: status === 'active' ? 'success' : undefined, icon: kind });
  };
  const rows = users.filter(u => filter === 'all' || u.status === filter);
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto' }} className="no-scrollbar">
        {[['all', 'All'], ['active', 'Active'], ['suspended', 'Suspended'], ['banned', 'Banned']].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} className={'chip' + (filter === k ? ' chip-green' : '')} style={{ cursor: 'pointer', flexShrink: 0 }}>{l}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {rows.map(u => (
          <div key={u.id} style={{ padding: 13, borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <Avatar name={u.name} size={38} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-4)', fontFamily: 'Geist Mono' }}>@{u.handle} · {u.impact} impact</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}><RoleChip role={u.role} /><SBadge status={u.status} size="sm" /></div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {u.status === 'active' && <button className="btn btn-ghost" onClick={() => setStatus(u.id, 'suspended', 'suspended account', 'lock')} style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: 12.5 }}>Suspend</button>}
              {u.status !== 'active' && <button className="btn btn-green" onClick={() => setStatus(u.id, 'active', 'reinstated account', 'check')} style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: 12.5 }}>Reinstate</button>}
              {u.status !== 'banned' && <button className="btn btn-ghost" onClick={() => setStatus(u.id, 'banned', 'banned account', 'logout')} style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: 12.5, color: 'var(--clay)' }}>Ban</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MAdminSellers({ ctx }) {
  const app = useApp();
  const { users, log } = ctx;
  const [tab, setTab] = React.useState('applications');
  const [queue, setQueue] = React.useState(MOCK_APPLICATIONS);
  const [open, setOpen] = React.useState(null);
  const userPending = app.state?.sellerStatus === 'pending';
  const userApp = userPending ? { id: 'me', shop: app.state?.sellerShop?.name || 'Your shop', applicant: 'You', handle: 'you', categories: ['Your categories'], type: 'Physical goods', country: '—', submitted: 'just now', impact: app.state?.sellerShop?.tagline || 'Your impact story appears here.', practices: ['As submitted'], certs: [], isUser: true } : null;
  const all = userApp ? [userApp, ...queue] : queue;
  const sel = all.find(a => a.id === open);
  const activeSellers = users.filter(u => u.role === 'Seller');

  const decide = (a, decision) => {
    if (a.id === 'me') app.setState?.(s => ({ ...s, sellerStatus: decision === 'approve' ? 'approved' : 'rejected' }));
    else setQueue(q => q.filter(x => x.id !== a.id));
    log(decision === 'approve' ? 'approved seller application' : 'declined seller application', a.shop, decision === 'approve' ? 'check' : 'close');
    app.toast?.(decision === 'approve' ? { msg: 'Seller approved', sub: a.shop, kind: 'success', icon: 'check' } : { msg: 'Application declined', sub: a.shop, icon: 'close' });
    setOpen(null);
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button onClick={() => setTab('applications')} className={'chip' + (tab === 'applications' ? ' chip-green' : '')} style={{ cursor: 'pointer' }}>Applications · {all.length}</button>
        <button onClick={() => setTab('active')} className={'chip' + (tab === 'active' ? ' chip-green' : '')} style={{ cursor: 'pointer' }}>Active · {activeSellers.length}</button>
      </div>

      {tab === 'applications' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          {all.map(a => (
            <button key={a.id} onClick={() => setOpen(a.id)} style={{ display: 'flex', gap: 12, textAlign: 'left', padding: 14, borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--line)', cursor: 'pointer', alignItems: 'center' }}>
              <Avatar name={a.shop} size={42} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 14.5, fontWeight: 600 }}>{a.shop}</span>{a.new && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--clay)' }} />}</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{a.applicant} · {a.country}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'Geist Mono', marginTop: 2 }}>{a.submitted}{a.isUser ? ' · yours' : ''}</div>
              </div>
              <SBadge status="pending" size="sm" />
            </button>
          ))}
          {all.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-4)', fontSize: 14 }}>Queue is clear 🎉</div>}
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 10 }}>
          {activeSellers.map(sl => (
            <div key={sl.id} style={{ padding: 14, borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <Avatar name={sl.name} size={40} verified />
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sl.name}</div><div style={{ fontSize: 11.5, color: 'var(--ink-4)', fontFamily: 'Geist Mono' }}>@{sl.handle} · {sl.city}</div></div>
                <SBadge status={sl.status} size="sm" />
              </div>
            </div>
          ))}
        </div>
      )}

      {sel && (
        <React.Fragment>
          <div onClick={() => setOpen(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(10,13,11,.4)', zIndex: 60 }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 61, background: 'var(--surface)', borderRadius: '22px 22px 0 0', maxHeight: '88%', overflow: 'auto', padding: '8px 20px 28px' }} className="no-scrollbar">
            <div style={{ width: 38, height: 4, borderRadius: 2, background: 'var(--line-2)', margin: '8px auto 16px' }} />
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Avatar name={sel.shop} size={50} />
              <div style={{ flex: 1 }}><div className="font-display" style={{ fontSize: 20, fontWeight: 600 }}>{sel.shop}</div><div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{sel.applicant} · {sel.country}</div></div>
              <SBadge status="pending" size="sm" />
            </div>
            <div style={{ marginTop: 18 }}><span className="fld-label">Sells</span><div style={{ fontSize: 14, color: 'var(--ink-2)' }}>{sel.categories.join(', ')} · {sel.type}</div></div>
            <div style={{ marginTop: 14 }}><span className="fld-label">Sustainability story</span><p style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.55, margin: 0, padding: 13, background: 'var(--bg-2)', borderRadius: 12 }}>{sel.impact}</p></div>
            <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>{sel.practices.map(p => <span key={p} className="chip chip-green" style={{ fontSize: 11 }}>{p}</span>)}{sel.certs.map(c => <span key={c} className="chip chip-sky" style={{ fontSize: 11 }}>{c}</span>)}</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <button className="btn btn-green" onClick={() => decide(sel, 'approve')} style={{ flex: 1, justifyContent: 'center', padding: '13px' }}><Icon name="check" size={16} stroke={2.4} /> Approve</button>
              <button className="btn btn-ghost" onClick={() => decide(sel, 'reject')} style={{ padding: '13px 18px', color: 'var(--clay)', borderColor: 'color-mix(in srgb, var(--clay) 30%, transparent)' }}>Decline</button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

function MAdminActivity({ ctx }) {
  return (
    <div style={{ padding: 16, display: 'grid', gap: 2 }}>
      {ctx.audit.map(a => (
        <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--line)', marginBottom: 6 }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: 'grid', placeItems: 'center', background: 'var(--bg-2)', color: 'var(--ink-3)' }}><Icon name={a.kind} size={15} /></span>
          <span style={{ flex: 1, fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.4 }}><strong style={{ color: 'var(--ink)' }}>{a.actor}</strong> {a.action} <strong style={{ color: 'var(--ink)' }}>{a.target}</strong></span>
          <span style={{ fontSize: 10.5, color: 'var(--ink-4)', fontFamily: 'Geist Mono', whiteSpace: 'nowrap' }}>{a.time}</span>
        </div>
      ))}
    </div>
  );
}
