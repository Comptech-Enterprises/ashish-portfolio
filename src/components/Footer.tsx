export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__giant" aria-hidden="true">LALWANI</div>
      <div className="wrap footer__row">
        <p>© {new Date().getFullYear()} Ashish Lalwani · Vibgyor Real Estate, Dubai</p>
        <a href="#top" data-magnet>Back to top ↑</a>
      </div>
    </footer>
  );
}
