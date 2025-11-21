import { useState, useEffect } from "react";
import "./styles/globals.css";
import { SpotifyPlayer } from "./components/SpotifyPlayer";
import {
  profileConfig,
  socialMediaConfig,
  aboutLinks,
  projectLinks,
  contactLinks,
  translations,
  shareConfig,
} from "./config";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const [language, setLanguage] = useState<"id" | "en">("id");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Add viewport meta tag for mobile responsiveness
    let viewportMeta = document.querySelector(
      'meta[name="viewport"]',
    );
    if (!viewportMeta) {
      viewportMeta = document.createElement("meta");
      viewportMeta.name = "viewport";
      viewportMeta.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      document.head.appendChild(viewportMeta);
    }

    // Add Google Fonts - Ubuntu Mono
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap";
    document.head.appendChild(fontLink);

    // Add Font Awesome
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
    document.head.appendChild(link);

    // Scroll animations
    const handleScroll = () => {
      // Animate on scroll
      const elements = document.querySelectorAll(
        ".animate-on-scroll",
      );
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Ubah dari 0.85 ke 1.5 agar konten muncul lebih awal (bahkan sebelum masuk viewport)
        if (rect.top < windowHeight * 1.05) {
          element.classList.add("is-visible");
        }
      });

      // Show/hide back to top button
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const copyToClipboard = (
    text: string,
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Fallback method for environments where Clipboard API is blocked
    const fallbackCopy = (text: string) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        textArea.remove();
        return true;
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
        textArea.remove();
        return false;
      }
    };

    // Try modern Clipboard API first, fallback to execCommand
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setToastMessage(
            language === "id"
              ? "Link berhasil disalin!"
              : "Link copied!",
          );
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        })
        .catch(() => {
          // If Clipboard API fails, use fallback
          if (fallbackCopy(text)) {
            setToastMessage(
              language === "id"
                ? "Link berhasil disalin!"
                : "Link copied!",
            );
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
          }
        });
    } else {
      // Use fallback directly if Clipboard API not available
      if (fallbackCopy(text)) {
        setToastMessage(
          language === "id"
            ? "Link berhasil disalin!"
            : "Link copied!",
        );
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    }
  };

  const shareUrl = window.location.href;
  const shareText = shareConfig.shareText;

  const t = translations[language];

  return (
    <>
      <style>{`
        ${
          isLoading
            ? ""
            : `
          .loading-screen {
            opacity: 0;
            visibility: hidden;
          }
        `
        }
        
        body {
          ${
            isLightMode
              ? `
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          `
              : `
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          `
          }
        }
        
        .link-item.primary { background: #ef4444; color: #fff; }
        .link-item.secondary { background: #10b981; }
        .link-item.tertiary { background: #3b82f6; color: #fff; }
        .link-item.social { background: #8b5cf6; color: #fff; }
        .link-item.contact { background: #ec4899; color: #fff; }
        .link-item.orange { background: #f97316; color: #fff; }
        .link-item.cyan { background: #06b6d4; color: #fff; }
        .link-item.dark { background: #333; color: #fff; }
      `}</style>

      {/* Loading Screen */}
      <div className="loading-screen">
        <img
          src={profileConfig.profileImage}
          alt="Logo"
          className="loading-logo"
        />
        <div className="loading-text">{profileConfig.name}</div>
        <div className="loading-spinner"></div>
        <div className="loading-tagline">{t.loadingText}</div>
      </div>

      {/* Language Toggle */}
      <div
        className="lang-toggle"
        onClick={() =>
          setLanguage(language === "id" ? "en" : "id")
        }
        role="button"
        tabIndex={0}
      >
        {language === "id" ? "ID" : "EN"}
      </div>

      {/* Theme Toggle */}
      <div
        className={`theme-toggle ${isLightMode ? "active" : ""}`}
        onClick={() => setIsLightMode(!isLightMode)}
        role="button"
        tabIndex={0}
      >
        <div className="theme-toggle-circle">
          {isLightMode ? "☀️" : "🌙"}
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "20px auto",
          padding: "0 10px",
        }}
      >
        <div className="container">
          <div className="decorative-box box-1"></div>
          <div className="decorative-box box-2"></div>

          {/* Marquee */}
          <div className="marquee-container">
            <div className="marquee-text">
              {t.marquee} • {t.marquee} •
            </div>
          </div>

          {/* Header/Profile */}
          <div className="header">
            <a
              href={profileConfig.profileUrl}
              className="profile-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={profileConfig.profileImage}
                alt={profileConfig.fullName}
                className="profile-img"
              />
            </a>
            <div className="logo">{profileConfig.name}</div>
            <div className="tagline">{t.greeting}</div>

            {/* Social Icons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              {socialMediaConfig.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50px",
                    height: "50px",
                    background: social.bgColor,
                    border: "4px solid #000",
                    boxShadow: `4px 4px 0 ${social.shadowColor}`,
                    fontSize: "24px",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                    color: social.textColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translate(2px, 2px)";
                    e.currentTarget.style.boxShadow = `2px 2px 0 ${social.shadowColor}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translate(0, 0)";
                    e.currentTarget.style.boxShadow = `4px 4px 0 ${social.shadowColor}`;
                  }}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="section-title animate-on-scroll">
            <i className="fas fa-user"></i> {t.about}
          </div>
          {aboutLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`link-item ${link.color} animate-on-scroll`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                animationDelay: `${0.1 + index * 0.1}s`,
              }}
            >
              <div className="icon">
                <i className={link.icon}></i>
              </div>
              <div className="link-content">
                <span className="link-title">{link.title}</span>
                <span className="link-url">{link.url}</span>
              </div>
              <div
                className="copy-btn"
                onClick={(e) => copyToClipboard(link.href, e)}
                role="button"
                tabIndex={0}
              >
                <i className="fa-regular fa-copy"></i>
              </div>
            </a>
          ))}

          {/* Projects Section */}
          <div
            className="section-title animate-on-scroll"
            style={{ animationDelay: "0.4s" }}
          >
            <i className="fas fa-code"></i> {t.projects}
          </div>
          {projectLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`link-item ${link.color} animate-on-scroll`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                animationDelay: `${0.5 + index * 0.1}s`,
              }}
            >
              <div className="icon">
                <i className={link.icon}></i>
              </div>
              <div className="link-content">
                <span className="link-title">{link.title}</span>
                <span className="link-url">{link.url}</span>
              </div>
              <div
                className="copy-btn"
                onClick={(e) => copyToClipboard(link.href, e)}
                role="button"
                tabIndex={0}
              >
                <i className="fa-regular fa-copy"></i>
              </div>
            </a>
          ))}

          {/* Contact Section */}
          <div
            className="section-title animate-on-scroll"
            style={{ animationDelay: "1.2s" }}
          >
            <i className="fas fa-envelope"></i> {t.contact}
          </div>
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`link-item ${link.color} animate-on-scroll`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                animationDelay: `${1.3 + index * 0.1}s`,
              }}
            >
              <div className="icon">
                <i className={link.icon}></i>
              </div>
              <div className="link-content">
                <span className="link-title">{link.title}</span>
                <span className="link-url">{link.url}</span>
              </div>
              <div
                className="copy-btn"
                onClick={(e) => copyToClipboard(link.href, e)}
                role="button"
                tabIndex={0}
              >
                <i className="fa-regular fa-copy"></i>
              </div>
            </a>
          ))}

          {/* Spotify Section */}
          <h3
            className="section-title animate-on-scroll"
            style={{ animationDelay: "1.6s" }}
          >
            {t.musicSection}
          </h3>
          <div
            className="animate-on-scroll"
            style={{ animationDelay: "1.7s" }}
          >
            <SpotifyPlayer />
          </div>

          {/* Footer */}
          <div className="footer">{t.footer}</div>
        </div>
      </div>

      {/* QR Button */}
      <div
        className="qr-btn"
        onClick={() => setShowQRModal(true)}
        role="button"
        tabIndex={0}
      >
        <i className="fa-solid fa-qrcode"></i>
      </div>

      {/* Share Button */}
      <div
        className="share-btn"
        onClick={() => setShowShareModal(true)}
        role="button"
        tabIndex={0}
      >
        <i className="fa-solid fa-share-from-square"></i>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <div
          className="back-to-top show"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          role="button"
          tabIndex={0}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="share-modal show"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="share-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="share-header">{t.shareTitle}</div>
            <div className="share-subtitle">
              {t.shareSubtitle}
            </div>
            <div className="share-buttons">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText + " - " + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-item whatsapp"
              >
                <div className="share-icon">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <div className="share-label">WhatsApp</div>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-item facebook"
              >
                <div className="share-icon">
                  <i className="fa-brands fa-facebook"></i>
                </div>
                <div className="share-label">Facebook</div>
              </a>
              <a
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-item twitter"
              >
                <div className="share-icon">
                  <i className="fa-brands fa-x-twitter"></i>
                </div>
                <div className="share-label">Twitter</div>
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-item telegram"
              >
                <div className="share-icon">
                  <i className="fa-brands fa-telegram"></i>
                </div>
                <div className="share-label">Telegram</div>
              </a>
            </div>
            <button
              className="close-modal"
              onClick={() => setShowShareModal(false)}
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {showQRModal && (
        <div
          className="share-modal show"
          onClick={() => setShowQRModal(false)}
        >
          <div
            className="share-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="share-header">{t.qrTitle}</div>
            <div className="share-subtitle">{t.qrSubtitle}</div>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(shareUrl)}`}
              alt="QR Code"
              className="qr-image"
            />
            <a
              href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(shareUrl)}`}
              download="qr-code.png"
              className="close-modal download-btn"
              style={{
                color: "#fff",
                textDecoration: "none",
                display: "block",
                textAlign: "center",
              }}
            >
              {t.download}
            </a>
            <button
              className="close-modal"
              onClick={() => setShowQRModal(false)}
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="toast show">{toastMessage}</div>
      )}
    </>
  );
}