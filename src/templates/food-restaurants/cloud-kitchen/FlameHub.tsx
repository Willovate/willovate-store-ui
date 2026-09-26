export default function FlameHub() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #ff7e5f, #feb47b)', color: '#fff', fontFamily: '"Ubuntu", sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <header style={{ padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🔥</span> Flame Hub
        </div>
        <button style={{ backgroundColor: '#fff', color: '#ff7e5f', border: 'none', padding: '0.75rem 2rem', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>My Orders</button>
      </header>

      <section style={{ flex: 1, padding: '4rem', display: 'flex', alignItems: 'center', gap: '4rem' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '2rem' }}>Hot food.<br/>Faster delivery.</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9 }}>Order from our network of high-speed cloud kitchens optimized for maximum heat retention.</p>
          <div style={{ display: 'flex', gap: '1rem', backgroundColor: '#fff', padding: '0.5rem', borderRadius: '30px', maxWidth: '500px' }}>
            <input type="text" placeholder="Enter delivery address..." style={{ flex: 1, padding: '1rem', border: 'none', borderRadius: '30px', fontSize: '1.1rem', outline: 'none' }} />
            <button style={{ backgroundColor: '#ff7e5f', color: '#fff', border: 'none', padding: '0 2rem', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>Find Food</button>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {/* Live Kitchen Status Widget */}
          <div style={{ backgroundColor: '#fff', color: '#333', padding: '2rem', borderRadius: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#ff7e5f', display: 'flex', justifyContent: 'space-between' }}>
              <span>Live Kitchen Status</span>
              <span style={{ width: '12px', height: '12px', backgroundColor: '#4ade80', borderRadius: '50%', alignSelf: 'center', boxShadow: '0 0 10px #4ade80' }}></span>
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #eee', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>Kitchen #42 (Downtown)</div>
                <div style={{ fontSize: '0.9rem', color: '#888' }}>Avg Prep Time: 12m</div>
              </div>
              <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', alignSelf: 'flex-start' }}>ONLINE</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #eee', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>Kitchen #18 (Westside)</div>
                <div style={{ fontSize: '0.9rem', color: '#888' }}>Avg Prep Time: 15m</div>
              </div>
              <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', alignSelf: 'flex-start' }}>ONLINE</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>Kitchen #07 (Uptown)</div>
                <div style={{ fontSize: '0.9rem', color: '#888' }}>Routine Maintenance</div>
              </div>
              <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', alignSelf: 'flex-start' }}>OFFLINE</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
