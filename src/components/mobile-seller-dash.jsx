/* global React, useApp, Icon, MobileTopBar, Avatar, SBadge, SStat, SSpark, sMoney, MOCK_SELLER, SELLER_CATEGORIES */

const dashScreen = { height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)', position: 'relative' };

// =====================================================================
// MobileSellerDashboard
// =====================================================================
window.MobileSellerDashboard = function MobileSellerDashboard({ onNav }) {
  const app = useApp();
  const approved = app.state?.sellerStatus === 'approved';
  const [tab, setTab] = React.useState('overview');
  const [products, setProducts] = React.useState(MOCK_SELLER.products);
  const [orders, setOrders] = React.useState(MOCK_SELLER.orders);
  const [adding, setAdding] = React.useState(false);

  if (!approved) {
    return (
      <div style={dashScreen}>
        <MobileTopBar title="Seller dashboard" />
        <div style={{ flex: 1, display: 'grid', placeItems: 'center', padding: 28 }}>
          <div style={{ textAlign: 'center', maxWidth: 320 }}>
            <span style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--bg-2)', color: 'var(--ink-3)', display: 'inline-grid', placeItems: 'center' }}><Icon name="lock" size={24} /></span>
            <h2 className="font-display" style={{ fontSize: 21, fontWeight: 600, margin: '14px 0 0' }}>Dashboard locked</h2>
            <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.55, margin: '8px 0 18px' }}>{app.state?.sellerStatus === 'pending' ? 'Your application is in review. We\'ll unlock this once you\'re approved.' : 'You need an approved shop to sell on Honua.'}</p>
            <button className="btn btn-green" onClick={() => onNav?.('sell')} style={{ padding: '11px 20px' }}>{app.state?.sellerStatus === 'pending' ? 'Check status' : 'Apply to sell'}</button>
          </div>
        </div>
      </div>
    );
  }

  const shop = app.state?.sellerShop?.name ? { ...MOCK_SELLER.shop, name: app.state.sellerShop.name } : MOCK_SELLER.shop;
  const advance = (id) => {
    const flow = { processing: 'confirmed', confirmed: 'shipped', shipped: 'delivered' };
    setOrders(l => l.map(o => o.id === id && flow[o.status] ? { ...o, status: flow[o.status] } : o));
    app.toast?.({ msg: 'Order updated', sub: id, kind: 'success', icon: 'cart' });
  };
  const addProduct = (p) => { setProducts(l => [{ ...p, id: 'p' + Date.now(), views: 0, likes: 0, sales: 0 }, ...l]); app.toast?.({ msg: 'Product published', sub: p.title, kind: 'success', icon: 'check' }); setAdding(false); };

  const TABS = [['overview', 'Overview'], ['products', 'Products'], ['orders', 'Orders'], ['analytics', 'Analytics'], ['messages', 'Inbox']];

  return (
    <div style={dashScreen}>
      <MobileTopBar title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <Avatar name={shop.name} size={30} verified />
          <span className="font-display" style={{ fontSize: 17, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 150 }}>{shop.name}</span>
        </div>
      } right={<button onClick={() => setAdding(true)} style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--green)', border: 'none', color: '#fff', display: 'grid', placeItems: 'center' }}><Icon name="plus" size={18} stroke={2.4} /></button>} />

      {/* tab strip */}
      <div style={{ display: 'flex', gap: 4, padding: '0 14px 10px', overflowX: 'auto', background: 'var(--surface)', borderBottom: '1px solid var(--line)' }} className="no-scrollbar">
        {TABS.map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: tab === k ? 600 : 500,
            background: tab === k ? 'var(--ink)' : 'var(--bg-2)', color: tab === k ? '#fff' : 'var(--ink-3)' }}>{l}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto' }} className="no-scrollbar">
        {tab === 'overview' && <MOverview products={products} orders={orders} onTab={setTab} />}
        {tab === 'products' && <MProducts products={products} onRemove={(id) => { setProducts(l => l.filter(p => p.id !== id)); app.toast?.({ msg: 'Product removed', icon: 'trash' }); }} />}
        {tab === 'orders' && <MOrders orders={orders} onAdvance={advance} />}
        {tab === 'analytics' && <MAnalytics products={products} />}
        {tab === 'messages' && <MInbox />}
      </div>

      {adding && <MAddProduct onAdd={addProduct} onClose={() => setAdding(false)} />}
    </div>
  );
};

function MOverview({ products, orders, onTab }) {
  const confirmed = orders.filter(o => ['confirmed', 'shipped', 'delivered'].includes(o.status)).reduce((s, o) => s + o.total, 0);
  const pending = orders.filter(o => o.status === 'processing').reduce((s, o) => s + o.total, 0);
  const open = orders.filter(o => ['processing', 'confirmed'].includes(o.status));
  const low = products.filter(p => p.type === 'physical' && p.stock != null && p.stock <= (p.threshold || 5));
  return (
    <div style={{ padding: 16 }}>
      {low.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, marginBottom: 14, background: window.sTint('var(--clay)', 12) }}>
          <Icon name="flame" size={17} color="var(--clay)" />
          <span style={{ fontSize: 12.5, color: 'var(--ink-2)', flex: 1 }}><strong>{low.length}</strong> product{low.length > 1 ? 's' : ''} low on stock</span>
          <button onClick={() => onTab('products')} style={{ background: 'transparent', border: 'none', color: 'var(--clay)', fontWeight: 600, fontSize: 12.5 }}>Restock</button>
        </div>
      )}
      <div style={{ background: 'var(--ink-solid)', color: '#fff', borderRadius: 18, padding: 20 }}>
        <div style={{ fontSize: 12.5, opacity: .7 }}>Revenue · 30 days</div>
        <div className="font-display tabular" style={{ fontSize: 34, fontWeight: 600, letterSpacing: '-0.03em', marginTop: 2 }}>{sMoney(MOCK_SELLER.revenueSeries.reduce((a, b) => a + b, 0), 0)}</div>
        <div style={{ marginTop: 8, marginLeft: -4 }}><SSpark data={MOCK_SELLER.revenueSeries} color="#fff" w={300} h={56} fill={false} /></div>
        <button className="btn" style={{ background: '#fff', color: 'var(--ink)', width: '100%', justifyContent: 'center', marginTop: 12, fontWeight: 600 }}>Withdraw {sMoney(confirmed * 0.93, 0)}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
        <SStat label="Orders" value={orders.length} icon="cart" trend={9} accent="var(--sky)" />
        <SStat label="Pending" value={sMoney(pending, 0)} icon="clock" accent="var(--sun)" />
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Orders to fulfil</span>
          <button onClick={() => onTab('orders')} style={{ background: 'transparent', border: 'none', color: 'var(--green)', fontWeight: 600, fontSize: 13 }}>All →</button>
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          {open.slice(0, 4).map(o => (
            <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: 12, borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--line)' }}>
              <Avatar name={o.buyer} size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.product.split(' · ')[0]}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-4)', fontFamily: 'Geist Mono' }}>{o.id} · {o.date}</div>
              </div>
              <SBadge status={o.status} size="sm" />
            </div>
          ))}
          {open.length === 0 && <div style={{ padding: 24, textAlign: 'center', color: 'var(--ink-4)', fontSize: 13 }}>All caught up ✨</div>}
        </div>
      </div>
    </div>
  );
}

function MProducts({ products, onRemove }) {
  return (
    <div style={{ padding: 16, display: 'grid', gap: 10 }}>
      {products.map(p => {
        const low = p.type === 'physical' && p.stock != null && p.stock <= (p.threshold || 5);
        return (
          <div key={p.id} style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--line)', alignItems: 'center' }}>
            <div style={{ width: 50, height: 50, borderRadius: 11, overflow: 'hidden', flexShrink: 0 }}><ImagePlaceholder label="" height={50} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <span className="tabular" style={{ fontSize: 13, fontWeight: 600 }}>{sMoney(p.price, 0)}</span>
                <SBadge status={low ? 'low-stock' : p.status} size="sm" />
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'Geist Mono', marginTop: 4 }}>{p.type === 'physical' ? p.stock + ' in stock' : p.type} · {p.sales} sold</div>
            </div>
            <button onClick={() => onRemove(p.id)} style={{ width: 32, height: 32, borderRadius: 9, border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--clay)', display: 'grid', placeItems: 'center' }}><Icon name="trash" size={14} /></button>
          </div>
        );
      })}
    </div>
  );
}

function MOrders({ orders, onAdvance }) {
  const nextLabel = { processing: 'Confirm', confirmed: 'Ship', shipped: 'Delivered' };
  return (
    <div style={{ padding: 16, display: 'grid', gap: 10 }}>
      {orders.map(o => (
        <div key={o.id} style={{ padding: 14, borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar name={o.buyer} size={32} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.product.split(' · ')[0]}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-4)', fontFamily: 'Geist Mono' }}>{o.id} · {o.buyer} · ×{o.qty}</div>
            </div>
            <span className="tabular" style={{ fontSize: 14, fontWeight: 600 }}>{sMoney(o.total, 0)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <SBadge status={o.status} size="sm" />
            {nextLabel[o.status] && <button className="btn btn-ghost" onClick={() => onAdvance(o.id)} style={{ padding: '6px 13px', fontSize: 12 }}>{nextLabel[o.status]}</button>}
          </div>
        </div>
      ))}
    </div>
  );
}

function MAnalytics({ products }) {
  const totalViews = products.reduce((s, p) => s + p.views, 0);
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <SStat label="Views · 30d" value={totalViews.toLocaleString()} icon="leaf" trend={14} />
        <SStat label="Conversion" value="3.4%" icon="bolt" trend={1.2} accent="var(--sun)" />
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: 18, marginTop: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Views · 30 days</span>
        <div style={{ marginTop: 12 }}><SSpark data={MOCK_SELLER.viewsSeries} color="var(--sky)" w={300} h={80} /></div>
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: 18, marginTop: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Top products</span>
        <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
          {[...products].sort((a, b) => b.views - a.views).slice(0, 5).map(p => {
            const pct = Math.round((p.views / totalViews) * 100);
            return (
              <div key={p.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>{p.title.split(' · ')[0]}</span><span className="tabular" style={{ color: 'var(--ink-4)', fontFamily: 'Geist Mono' }}>{p.views.toLocaleString()}</span></div>
                <div style={{ height: 7, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}><div style={{ width: pct + '%', height: '100%', background: 'var(--green)', borderRadius: 999 }} /></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MInbox() {
  const [sel, setSel] = React.useState(null);
  const [draft, setDraft] = React.useState('');
  const [extra, setExtra] = React.useState({});
  const t = MOCK_SELLER.threads.find(x => x.handle === sel);
  if (t) {
    const msgs = [...t.msgs, ...(extra[sel] || []).map(m => ['me', m])];
    const send = () => { if (!draft.trim()) return; setExtra(e => ({ ...e, [sel]: [...(e[sel] || []), draft] })); setDraft(''); };
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: '1px solid var(--line)', background: 'var(--surface)' }}>
          <button onClick={() => setSel(null)} style={{ background: 'transparent', border: 'none', color: 'var(--ink)' }}><span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon name="arrow" size={18} /></span></button>
          <Avatar name={t.name} size={32} /><span style={{ fontSize: 14.5, fontWeight: 600 }}>{t.name}</span>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }} className="no-scrollbar">
          {msgs.map(([who, text], i) => <div key={i} style={{ alignSelf: who === 'me' ? 'flex-end' : 'flex-start', maxWidth: '76%', padding: '9px 13px', borderRadius: 14, background: who === 'me' ? 'var(--green)' : 'var(--bg-2)', color: who === 'me' ? '#fff' : 'var(--ink)', fontSize: 13.5, lineHeight: 1.45 }}>{text}</div>)}
        </div>
        <div style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
          <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Reply…" style={{ flex: 1, border: '1px solid var(--line)', borderRadius: 999, padding: '10px 16px', fontSize: 13.5, outline: 'none', background: 'var(--bg-2)' }} />
          <button className="btn btn-green" onClick={send} style={{ padding: '10px 16px' }}>Send</button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ padding: 16, display: 'grid', gap: 8 }}>
      {MOCK_SELLER.threads.map(th => (
        <button key={th.handle} onClick={() => setSel(th.handle)} style={{ display: 'flex', gap: 12, textAlign: 'left', padding: 12, borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--line)', cursor: 'pointer', alignItems: 'center' }}>
          <span style={{ position: 'relative' }}><Avatar name={th.name} size={40} />{th.online && <span style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: 'var(--green)', border: '2px solid var(--surface)' }} />}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 14, fontWeight: 600 }}>{th.name}</span><span style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'Geist Mono' }}>{th.time}</span></div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{th.last}</div>
          </div>
          {th.unread > 0 && <span style={{ background: 'var(--green)', color: '#fff', fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 10, fontFamily: 'Geist Mono' }}>{th.unread}</span>}
        </button>
      ))}
    </div>
  );
}

function MAddProduct({ onAdd, onClose }) {
  const [f, setF] = React.useState({ title: '', price: '', category: SELLER_CATEGORIES[0], type: 'physical', status: 'active', stock: 0, threshold: 5, tag: 'Plastic-free', img: '' });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const valid = f.title && f.price > 0;
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(10,13,11,.4)', zIndex: 60 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 61, background: 'var(--surface)', borderRadius: '22px 22px 0 0', maxHeight: '90%', overflow: 'auto', padding: '8px 20px 24px' }} className="no-scrollbar">
        <div style={{ width: 38, height: 4, borderRadius: 2, background: 'var(--line-2)', margin: '8px auto 14px' }} />
        <h2 className="font-display" style={{ fontSize: 20, fontWeight: 600, margin: '0 0 16px' }}>Add a product</h2>
        <div style={{ display: 'grid', gap: 14 }}>
          <MDField label="Product title" value={f.title} onChange={v => set('title', v)} placeholder="What are you selling?" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <MDField label="Price" prefix="$" type="number" value={f.price} onChange={v => set('price', parseFloat(v) || 0)} placeholder="0.00" />
            <label><span className="fld-label">Type</span><select className="fld" value={f.type} onChange={e => set('type', e.target.value)}><option value="physical">Physical</option><option value="digital">Digital</option><option value="service">Service</option></select></label>
          </div>
          <label><span className="fld-label">Category</span><select className="fld" value={f.category} onChange={e => set('category', e.target.value)}>{SELLER_CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></label>
          {f.type === 'physical' && <MDField label="Stock quantity" type="number" value={f.stock} onChange={v => set('stock', parseInt(v) || 0)} />}
        </div>
        <button className="btn btn-green" disabled={!valid} onClick={() => onAdd(f)} style={{ width: '100%', justifyContent: 'center', marginTop: 18, padding: '14px', opacity: valid ? 1 : .5 }}>Publish product</button>
      </div>
    </>
  );
}

function MDField({ label, value, onChange, placeholder, prefix, type = 'text' }) {
  return (
    <label style={{ display: 'block' }}>
      {label && <span className="fld-label">{label}</span>}
      <div style={{ position: 'relative' }}>
        {prefix && <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-4)', fontSize: 13 }}>{prefix}</span>}
        <input className="fld" type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} style={{ paddingLeft: prefix ? 22 : 13 }} />
      </div>
    </label>
  );
}
