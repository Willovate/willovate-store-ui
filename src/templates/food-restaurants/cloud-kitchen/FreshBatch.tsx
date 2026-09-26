export default function FreshBatch() {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0f766e', fontFamily: '"Nunito Sans", sans-serif', minHeight: '100vh' }}>
      
      <header style={{ padding: '1.5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccfbf1' }}>
        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0d9488' }}>Fresh Batch.</div>
        <nav style={{ display: 'flex', gap: '2rem', fontWeight: 600 }}>
          <a href="#plans" style={{ color: '#0f766e', textDecoration: 'none' }}>Meal Plans</a>
          <a href="#menu" style={{ color: '#0f766e', textDecoration: 'none' }}>This Week's Menu</a>
          <a href="#login" style={{ color: '#0d9488', textDecoration: 'none', border: '2px solid #0d9488', padding: '0.5rem 1rem', borderRadius: '20px' }}>Log In</a>
        </nav>
      </header>

      <section style={{ backgroundColor: '#f0fdfa', padding: '8rem 4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', color: '#115e59' }}>Healthy Meals, Delivered Weekly.</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem auto', color: '#134e4a' }}>Chef-prepared, nutritionist-approved meal prep delivered straight to your door in eco-friendly packaging.</p>
        <button style={{ backgroundColor: '#0d9488', color: '#fff', border: 'none', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 700, borderRadius: '30px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(13, 148, 136, 0.2)' }}>Choose Your Plan</button>
      </section>

      <section id="plans" style={{ padding: '6rem 4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '4rem', color: '#115e59' }}>Subscription Plans</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { name: 'Light', meals: '5 Meals/Week', price: '$55' },
            { name: 'Standard', meals: '10 Meals/Week', price: '$99' },
            { name: 'Athlete', meals: '15 Meals/Week', price: '$135' }
          ].map((plan, i) => (
            <div key={i} style={{ flex: 1, minWidth: '250px', maxWidth: '350px', backgroundColor: '#fff', border: '2px solid #ccfbf1', padding: '3rem 2rem', borderRadius: '24px', boxShadow: '0 10px 25px rgba(204, 251, 241, 0.5)' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0d9488', margin: '0 0 1rem 0' }}>{plan.name}</h3>
              <p style={{ fontSize: '1.2rem', color: '#0f766e', marginBottom: '2rem' }}>{plan.meals}</p>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#115e59', marginBottom: '2rem' }}>{plan.price}</div>
              <button style={{ backgroundColor: '#ccfbf1', color: '#0d9488', border: 'none', padding: '1rem', width: '100%', fontSize: '1.1rem', fontWeight: 700, borderRadius: '12px', cursor: 'pointer' }}>Select Plan</button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
