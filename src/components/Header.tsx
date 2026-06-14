import styles from "./Header.css";

export default function Header() {
  return (
    <header>
      <ul className={styles.navbar}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#experience">Education</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </header>
  );
}