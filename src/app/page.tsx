import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* 1. Global Header Section */}
      <Header />

      {/* Main Content Area (Keeps space below the fixed header) */}
      <main style={{ marginTop: '90px' }}>
        {/* 2. Hero Section (Hi, I am Shakthi) */}
        <Hero />
        {/* 3. About Section */}
        <About />
        {/* 4. Skills Section */}
        <Skills />
        {/* 5. Projects Section */}
        <Projects />
        {/* 6. Education Section */}
        <Education />
        {/* 7. Contact Section */}
        <Contact />
        {/* 8. Footer Section */}
        <Footer />
      </main>
      
    </div>
  );
}