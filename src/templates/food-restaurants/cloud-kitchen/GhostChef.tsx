export default function GhostChef() {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#000000', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', minHeight: '100vh' }}>
      
      <header style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-1px' }}>GHOST CHEF.</div>
        <div style={{ fontWeight: 700 }}>CLOUD KITCHEN FACILITY #04</div>
      </header>

      <section style={{ display: 'flex', minHeight: '80vh' }}>
        <div style={{ flex: 1, padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1, margin: '0 0 2rem 0', textTransform: 'uppercase' }}>Track Your Order.</h1>
          
          <div style={{ backgroundColor: '#f4f4f4', padding: '2rem', borderRadius: '12px', border: '2px solid #000' }}>
            <h3 style={{ fontSize: '1.2rem', margin: '0 0 1.5rem 0' }}>ORDER #8992-B</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#000' }}></div>
                <div style={{ fontWeight: 'bold' }}>Order Received (12:42 PM)</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#000' }}></div>
                <div style={{ fontWeight: 'bold' }}>Preparing (12:45 PM)</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.3 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #000' }}></div>
                <div style={{ fontWeight: 'bold' }}>Ready for Pickup / Driver Arriving</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.3 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #000' }}></div>
                <div style={{ fontWeight: 'bold' }}>Delivered</div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ flex: 1, backgroundColor: '#000', color: '#fff', padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem' }}>ENTER ADDRESS. GET FOOD.</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="text" placeholder="Enter Delivery Address..." style={{ flex: 1, padding: '1.5rem', fontSize: '1.2rem', border: 'none', borderRadius: '8px' }} />
            <button style={{ backgroundColor: '#fff', color: '#000', border: 'none', padding: '1.5rem 2rem', fontSize: '1.2rem', fontWeight: 900, borderRadius: '8px', cursor: 'pointer' }}>GO</button>
          </div>
        </div>
      </section>

    </div>
  );
}
