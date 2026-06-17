import './Header.css'; 

export default function Header() {
  return (
    <header className="header-container">
      {/* Left side: Logo/Name */}
      <div className="logo">
        <a href="#home">Shakthi</a>
      </div>
      
      {/* Middle/Right side: Nav links */}
      <nav>
        <ul className="navbar">
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#skills" className="nav-link">Skills</a></li>
          <li><a href="#projects" className="nav-link">Projects</a></li>
          <li><a href="#education" className="nav-link">Education</a></li>
        </ul>
      </nav>

      {/* Far Right: Contact Button */}
      <div className="header-cta">
        <a href="#contact" className="contact-btn">Contact</a>
      </div>
    </header>
  );
}