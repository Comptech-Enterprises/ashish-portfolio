export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="wrap">
        <div className="footer__grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer__brand">
            <h3>Ashish Lalwani</h3>
            <p className="footer__brand-sub">
              Senior Advisor · Vibgyor Real Estate
            </p>
            <p className="footer__brand-desc">
              Guiding homebuyers, high-net-worth families, and international
              investors with over 23 years of dedicated real estate advisory
              across Dubai&apos;s most coveted micro-markets.
            </p>
            <div className="footer__ctas">
              <a
                href="https://wa.me/971545821600"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__cta-btn footer__cta-btn--gold"
                aria-label="Chat on WhatsApp"
              >
                <span>WhatsApp Advisor</span>
              </a>
              <a
                href="tel:+97145518469"
                className="footer__cta-btn footer__cta-btn--outline"
                aria-label="Call Head Office"
              >
                <span>+971 4 551 8469</span>
              </a>
            </div>
          </div>

          {/* Col 2: Direct Contact */}
          <div className="footer__col">
            <h4>Contact Details</h4>
            <div className="footer__contact-list">
              <div className="footer__contact-item">
                <span className="footer__contact-label">Head Office Phone</span>
                <a href="tel:+97145518469" className="footer__contact-val">
                  +971 4 551 8469
                </a>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-label">Mobile &amp; WhatsApp</span>
                <a href="tel:+971545821600" className="footer__contact-val">
                  +971 54 582 1600
                </a>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-label">Email Inquiries</span>
                <a
                  href="mailto:info@vibgyorrealestate.com"
                  className="footer__contact-val"
                >
                  info@vibgyorrealestate.com
                </a>
                <a
                  href="mailto:ashish@vibgyorrealestate.com"
                  className="footer__contact-val"
                  style={{ fontSize: "0.85rem", opacity: 0.8 }}
                >
                  ashish@vibgyorrealestate.com
                </a>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-label">Working Hours</span>
                <p className="footer__contact-val" style={{ margin: 0 }}>
                  Mon – Sat: 9:00 AM – 6:00 PM
                </p>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", margin: 0 }}>
                  Sunday by appointment
                </p>
              </div>
            </div>
          </div>

          {/* Col 3: Office Locations */}
          <div className="footer__col">
            <h4>Dubai Offices</h4>
            <div className="footer__branches">
              <div className="footer__branch">
                <b>Head Office · Motor City</b>
                <p>Office No. 2104, Control Tower, Motor City, Dubai, United Arab Emirates</p>
              </div>
              <div className="footer__branch">
                <b>Barsha Heights Branch</b>
                <p>Office No. 1308, Grosvenor Business Tower, Barsha Heights, Dubai, UAE</p>
                <a href="tel:+97144572104" style={{ fontSize: "0.78rem", color: "var(--gold)" }}>
                  Tel: +971 4 457 2104
                </a>
              </div>
              <div className="footer__branch">
                <b>Arjan Branch</b>
                <p>The V Building, Shop No. 01, Arjan, Dubai, UAE</p>
                <a href="tel:+97143993776" style={{ fontSize: "0.78rem", color: "var(--gold)" }}>
                  Tel: +971 4 399 3776
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Navigation & Communities */}
          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul className="footer__nav-list">
              <li><a href="#about">About Ashish</a></li>
              <li><a href="#services">Advisory Services</a></li>
              <li><a href="#areas">Prime Communities</a></li>
              <li><a href="#properties">Property Search</a></li>
              <li><a href="#process">Buying Process</a></li>
              <li><a href="#community">Market Walkthroughs</a></li>
              <li><a href="#contact">Direct Contact</a></li>
            </ul>
            <div style={{ marginTop: "24px" }}>
              <span className="footer__contact-label" style={{ display: "block", marginBottom: "8px" }}>
                Prime Micro-Markets
              </span>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                Downtown Dubai · Palm Jumeirah · Dubai Marina · Business Bay · Dubai Hills · JVC
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer__bottom">
          <p>
            © {currentYear} Ashish Lalwani · In Association with Vibgyor Real Estate LLC. All rights reserved.
          </p>
          <p style={{ fontSize: "0.76rem" }}>
            Licensed by Dubai Real Estate Regulatory Agency (RERA).
          </p>
          <a href="#top" data-magnet aria-label="Scroll back to top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
