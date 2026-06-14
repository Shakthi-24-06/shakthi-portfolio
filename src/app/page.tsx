import Header from '../components/Header';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* 1. Global Header Section */}
      <Header />

      {/* Main Content Area (Keeps space below the fixed header) */}
      <main style={{ marginTop: '90px', padding: '2rem', textAlign: 'center' }}>
        
      </main>
      
    </div>
  );
}