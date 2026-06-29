/* global React */
const { useState } = React;

// =============== Frame wrappers ===============
function PhoneFrame({ children, dark }) {
  return (
    <div className={'phone ' + (dark ? 'dark' : '')}>
      <div className="phone-inner">
        <StatusBar dark={dark} />
        <div className="phone-notch" />
        {children}
      </div>
    </div>
  );
}

function DesktopFrame({ children, label = 'honua.green' }) {
  return (
    <div className="browser" style={{ width: 1440, height: 900 }}>
      <div className="browser-bar">
        <div className="browser-dot" style={{ background: '#ed6a5e' }} />
        <div className="browser-dot" style={{ background: '#f4bf4f' }} />
        <div className="browser-dot" style={{ background: '#61c454' }} />
        <div className="browser-url">⌂ {label}</div>
        <div style={{ display: 'flex', gap: 6, color: 'var(--ink-3)' }}>
          <Icon name="bookmark" size={14} />
          <Icon name="more" size={14} />
        </div>
      </div>
      <div style={{ height: 856, overflow: 'hidden', background: 'var(--bg)' }}>
        {children}
      </div>
    </div>
  );
}

// =============== Routable wrapper (lets you click around) ===============
function DesktopRouter({ start = 'home' }) {
  const [page, setPage] = useState(start);
  const Map = {
    home: DesktopHome,
    explore: DesktopExplore,
    impact: DesktopImpact,
    map: DesktopMap,
    carbon: DesktopCarbon,
    profile: DesktopProfile,
    post: DesktopPostDetail,
    marketplace: DesktopMarketplace,
    messages: DesktopMessages,
    notifications: DesktopNotifications,
    forum: DesktopForum,
    tasks: DesktopTasks,
    bookmarks: DesktopBookmarks,
    settings: DesktopSettings,
  };
  const Cmp = Map[page] || DesktopHome;
  return <Cmp onNav={setPage} />;
}

function MobileRouter({ start = 'home' }) {
  const [page, setPage] = useState(start);
  const Map = {
    home: MobileHome,
    profile: MobileProfile,
    impact: MobileImpact,
    compose: MobileCompose,
    auth: MobileAuth,
    onboarding: MobileOnboarding,
    notifications: MobileNotifications,
    messages: MobileMessages,
  };
  const Cmp = Map[page] || MobileHome;
  return <Cmp onNav={setPage} />;
}

// =============== Main canvas ===============
function App() {
  return (
    <DesignCanvas title="Honua · redesign · May 2026" defaultScale={0.65}>
      <DCSection id="overview" title="01 · Overview">
        <DCArtboard id="intro" label="Intro" width={1100} height={620}>
          <IntroArtboard />
        </DCArtboard>
        <DCArtboard id="system" label="Design system" width={1100} height={620}>
          <DesignSystemArtboard />
        </DCArtboard>
      </DCSection>

      <DCSection id="auth" title="02 · Sign-in & onboarding">
        <DCArtboard id="auth-mobile" label="Sign in · mobile" width={430} height={920}>
          <PhoneFrame><MobileAuth onNav={() => {}} /></PhoneFrame>
        </DCArtboard>
        <DCArtboard id="onboarding-mobile" label="Onboarding · mobile" width={430} height={920}>
          <PhoneFrame><MobileOnboarding onNav={() => {}} /></PhoneFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="feed" title="03 · Home feed">
        <DCArtboard id="home-desktop" label="Home · desktop · click around" width={1480} height={960}>
          <DesktopFrame label="honua.green"><DesktopRouter start="home" /></DesktopFrame>
        </DCArtboard>
        <DCArtboard id="home-mobile" label="Home · mobile" width={430} height={920}>
          <PhoneFrame><MobileHome onNav={() => {}} /></PhoneFrame>
        </DCArtboard>
        <DCArtboard id="compose-mobile" label="Compose · mobile" width={430} height={920}>
          <PhoneFrame><MobileCompose onNav={() => {}} /></PhoneFrame>
        </DCArtboard>
        <DCArtboard id="post-detail" label="Post detail · desktop" width={1480} height={960}>
          <DesktopFrame label="honua.green/p/1287"><DesktopPostDetail onNav={() => {}} /></DesktopFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="explore" title="04 · Explore">
        <DCArtboard id="explore-desktop" label="Explore · desktop" width={1480} height={960}>
          <DesktopFrame label="honua.green/explore"><DesktopExplore onNav={() => {}} /></DesktopFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="new-impact" title="05 · NEW · Personal impact dashboard">
        <DCArtboard id="impact-desktop" label="Impact dashboard · desktop" width={1480} height={960}>
          <DesktopFrame label="honua.green/impact"><DesktopImpact onNav={() => {}} /></DesktopFrame>
        </DCArtboard>
        <DCArtboard id="impact-mobile" label="Impact · mobile" width={430} height={920}>
          <PhoneFrame><MobileImpact onNav={() => {}} /></PhoneFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="new-map" title="06 · NEW · Local action map">
        <DCArtboard id="map-desktop" label="Action map · desktop" width={1480} height={960}>
          <DesktopFrame label="honua.green/map"><DesktopMap onNav={() => {}} /></DesktopFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="new-carbon" title="07 · NEW · Carbon credit marketplace">
        <DCArtboard id="carbon-desktop" label="Carbon market · desktop" width={1480} height={960}>
          <DesktopFrame label="honua.green/carbon"><DesktopCarbon onNav={() => {}} /></DesktopFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="profile" title="08 · Profile">
        <DCArtboard id="profile-desktop" label="Profile · desktop" width={1480} height={960}>
          <DesktopFrame label="honua.green/@sarahgreen"><DesktopProfile onNav={() => {}} /></DesktopFrame>
        </DCArtboard>
        <DCArtboard id="profile-mobile" label="Profile · mobile" width={430} height={920}>
          <PhoneFrame><MobileProfile onNav={() => {}} /></PhoneFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="marketplace" title="09 · Marketplace">
        <DCArtboard id="marketplace-desktop" label="Marketplace · desktop" width={1480} height={960}>
          <DesktopFrame label="honua.green/shop"><DesktopMarketplace onNav={() => {}} /></DesktopFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="messages" title="10 · Messages">
        <DCArtboard id="messages-desktop" label="Messages · desktop" width={1480} height={960}>
          <DesktopFrame label="honua.green/messages"><DesktopMessages onNav={() => {}} /></DesktopFrame>
        </DCArtboard>
        <DCArtboard id="messages-mobile" label="Chat · mobile" width={430} height={920}>
          <PhoneFrame><MobileMessages onNav={() => {}} /></PhoneFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="notif" title="11 · Notifications">
        <DCArtboard id="notif-desktop" label="Notifications · desktop" width={1480} height={960}>
          <DesktopFrame label="honua.green/activity"><DesktopNotifications onNav={() => {}} /></DesktopFrame>
        </DCArtboard>
        <DCArtboard id="notif-mobile" label="Notifications · mobile" width={430} height={920}>
          <PhoneFrame><MobileNotifications onNav={() => {}} /></PhoneFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="forum" title="12 · Communities & forum">
        <DCArtboard id="forum-desktop" label="Community · desktop" width={1480} height={960}>
          <DesktopFrame label="honua.green/c/urban-gardeners"><DesktopForum onNav={() => {}} /></DesktopFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="tasks" title="13 · Challenges">
        <DCArtboard id="tasks-desktop" label="Challenges · desktop" width={1480} height={960}>
          <DesktopFrame label="honua.green/challenges"><DesktopTasks onNav={() => {}} /></DesktopFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="bookmarks" title="14 · Bookmarks">
        <DCArtboard id="bookmarks-desktop" label="Bookmarks · desktop" width={1480} height={960}>
          <DesktopFrame label="honua.green/bookmarks"><DesktopBookmarks onNav={() => {}} /></DesktopFrame>
        </DCArtboard>
      </DCSection>

      <DCSection id="settings" title="15 · Settings">
        <DCArtboard id="settings-desktop" label="Settings · desktop" width={1480} height={960}>
          <DesktopFrame label="honua.green/settings"><DesktopSettings onNav={() => {}} /></DesktopFrame>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

// =============== Intro artboard ===============
function IntroArtboard() {
  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--bg)',
      padding: 56, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
      alignItems: 'center', overflow: 'hidden', position: 'relative',
    }}>
      <div>
        <div style={{ marginBottom: 24 }}><Logo size={36} /></div>
        <div style={{ fontSize: 12, fontFamily: 'Geist Mono', color: 'var(--green)', letterSpacing: '.1em', marginBottom: 10 }}>HONUA · REDESIGN · MAY 2026</div>
        <h1 className="font-display" style={{
          margin: 0, fontSize: 56, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05,
        }}>The social network<br/>for people fixing<br/>the planet.</h1>
        <p style={{ margin: '20px 0 0', fontSize: 17, color: 'var(--ink-3)', lineHeight: 1.55, maxWidth: 460, textWrap: 'pretty' }}>
          A mass-market redesign of Honua. Familiar feed-and-follow social mechanics, with a sustainability soul baked into every post, every profile, every interaction. Click any artboard to explore.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 28, flexWrap: 'wrap' }}>
          <span className="chip chip-green">15 sections</span>
          <span className="chip chip-green">25+ screens</span>
          <span className="chip chip-sky">3 new features</span>
          <span className="chip">Desktop · mobile · side-by-side</span>
        </div>
      </div>
      <div style={{
        position: 'relative', height: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
      }}>
        <div style={{
          background: 'var(--green)', color: '#fff', borderRadius: 16, padding: 24,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'Geist Mono', opacity: .85, letterSpacing: '.05em' }}>NEW</div>
            <h3 className="font-display" style={{ margin: '6px 0', fontSize: 22, fontWeight: 600 }}>Impact dashboard</h3>
            <p style={{ margin: 0, fontSize: 13, opacity: .85, lineHeight: 1.4 }}>Your CO₂ ledger, trees funded, streaks — finally visible.</p>
          </div>
          <Icon name="leaf" size={36} />
        </div>
        <div style={{
          background: 'var(--sky)', color: '#fff', borderRadius: 16, padding: 24,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'Geist Mono', opacity: .85, letterSpacing: '.05em' }}>NEW</div>
            <h3 className="font-display" style={{ margin: '6px 0', fontSize: 22, fontWeight: 600 }}>Local action map</h3>
            <p style={{ margin: 0, fontSize: 13, opacity: .85, lineHeight: 1.4 }}>Find a cleanup, garden, or repair café this weekend.</p>
          </div>
          <Icon name="map" size={36} />
        </div>
        <div style={{
          background: 'var(--ink)', color: '#fff', borderRadius: 16, padding: 24,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'Geist Mono', opacity: .85, letterSpacing: '.05em' }}>NEW</div>
            <h3 className="font-display" style={{ margin: '6px 0', fontSize: 22, fontWeight: 600 }}>Carbon market</h3>
            <p style={{ margin: 0, fontSize: 13, opacity: .85, lineHeight: 1.4 }}>On-chain verified credits, traceable to a real project.</p>
          </div>
          <Icon name="globe" size={36} />
        </div>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: 24,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'Geist Mono', color: 'var(--ink-3)', letterSpacing: '.05em' }}>EVERY POST</div>
            <h3 className="font-display" style={{ margin: '6px 0', fontSize: 22, fontWeight: 600 }}>Sustainability score</h3>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.4 }}>Posts and people carry an impact score. Verified actions earn a blue check.</p>
          </div>
          <ScorePill score={92} label="impact" />
        </div>
      </div>
    </div>
  );
}

// =============== Design system artboard ===============
function DesignSystemArtboard() {
  return (
    <div style={{ padding: 40, height: '100%', overflow: 'auto', background: 'var(--bg)' }} className="no-scrollbar">
      <h2 className="font-display" style={{ margin: 0, fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>Design system</h2>
      <p style={{ margin: '4px 0 24px', color: 'var(--ink-3)' }}>The vocabulary every screen is built from.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <div>
          <SectionLabel n="01" t="Type" />
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 22, marginBottom: 20 }}>
            <div className="font-display" style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}>Bricolage Grotesque</div>
            <div style={{ fontSize: 11, fontFamily: 'Geist Mono', color: 'var(--ink-3)', marginTop: 6 }}>DISPLAY · HEADLINES · 28–64 PX</div>
            <div style={{ height: 1, background: 'var(--line)', margin: '18px 0' }} />
            <div style={{ fontFamily: 'Geist', fontSize: 22, fontWeight: 500 }}>Geist · Regular · Medium · Semibold</div>
            <div style={{ fontSize: 11, fontFamily: 'Geist Mono', color: 'var(--ink-3)', marginTop: 6 }}>BODY · UI · 12–18 PX</div>
            <div style={{ height: 1, background: 'var(--line)', margin: '18px 0' }} />
            <div style={{ fontFamily: 'Geist Mono', fontSize: 16 }}>Geist Mono · 12.4k · −1.8 kg CO₂ · 92 impact</div>
            <div style={{ fontSize: 11, fontFamily: 'Geist Mono', color: 'var(--ink-3)', marginTop: 6 }}>DATA · LABELS · TAGS</div>
          </div>

          <SectionLabel n="02" t="Color" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 20 }}>
            {[
              ['#1f6f3f', 'Green'],
              ['#2e9a5b', 'Mid'],
              ['#c8e6cf', 'Tint'],
              ['#1d6dc4', 'Sky'],
              ['#e6b450', 'Sun'],
              ['#c4623a', 'Clay'],
              ['#0a0d0b', 'Ink'],
              ['#5c635e', 'Ink-3'],
              ['#e8e7e1', 'Line'],
              ['#f4f3ee', 'Bg-2'],
              ['#fafaf7', 'Bg'],
              ['#ffffff', 'Surface'],
            ].map(([c, n]) => (
              <div key={c} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ background: c, height: 50 }} />
                <div style={{ padding: '6px 8px' }}>
                  <div style={{ fontSize: 11, fontWeight: 600 }}>{n}</div>
                  <div style={{ fontSize: 9, fontFamily: 'Geist Mono', color: 'var(--ink-3)' }}>{c}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel n="03" t="Components" />
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 18, marginBottom: 16, display: 'grid', gap: 14 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-green">Green</button>
              <button className="btn btn-ghost">Ghost</button>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span className="chip">Chip</span>
              <span className="chip chip-green">Green</span>
              <span className="chip chip-sky">Sky</span>
              <VerifiedImpact value="1.4t" unit="CO₂" />
              <ScorePill score={92} label="impact" />
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Avatar name="Sarah" size={44} verified />
              <Avatar name="M" size={44} score={86} />
              <Avatar name="Maya" size={44} />
              <Toggle on />
              <Toggle on={false} />
            </div>
          </div>

          <SectionLabel n="04" t="Voice" />
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 18, fontSize: 13, lineHeight: 1.6, color: 'var(--ink-2)' }}>
            <p style={{ margin: '0 0 10px' }}><strong>Specific over vague.</strong> "20 panels, −80% footprint" beats "made my home greener".</p>
            <p style={{ margin: '0 0 10px' }}><strong>Numbers in mono.</strong> Data feels native, not decorative.</p>
            <p style={{ margin: 0 }}><strong>Action verbs, present tense.</strong> "Compost food scraps", not "Try composting".</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ n, t }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '0 0 10px' }}>
      <span style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--green)' }}>{n}</span>
      <span style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.05em' }}>—</span>
      <h3 className="font-display" style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{t}</h3>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
