import { useState } from "react";
import {
  Link,
  NavLink
} from "react-router-dom";
import {
  Menu,
  X,
  Sprout,
  Globe,
  ChevronDown
} from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
    setLanguageOpen(false);
  }

  function selectLanguage(language) {
    console.log("Selected language:", language);
    setLanguageOpen(false);
  }

  return (
    <header className="site-header">

      <div className="header-inner">

        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
        >
          <span className="brand-mark">
            <Sprout
              size={22}
              strokeWidth={2.5}
            />
          </span>

          <span className="brand-name">
            <span className="brand-vyapaar">
              Vyapaar
            </span>

            <span className="brand-mandi">
              Mandi
            </span>
          </span>
        </Link>

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}
        </button>

        <nav
          className={`header-nav ${
            menuOpen ? "open" : ""
          }`}
        >

          {/* Home */}
          <NavLink
            to="/"
            onClick={closeMenu}
          >
            Home
          </NavLink>

          {/* About Us */}
          <NavLink
            to="/about"
            onClick={closeMenu}
          >
            About Us
          </NavLink>

          {/* FAQ */}
          <NavLink
            to="/faq"
            onClick={closeMenu}
          >
            FAQ
          </NavLink>

          <div className="language-selector">

            <button
              type="button"
              className="language-button"
              onClick={() =>
                setLanguageOpen(!languageOpen)
              }
              aria-expanded={languageOpen}
            >
              <Globe size={17} />

              <span>Language</span>

              <ChevronDown
                size={16}
                className={
                  languageOpen
                    ? "chevron-open"
                    : ""
                }
              />
            </button>

            {languageOpen && (
              <div className="language-dropdown">

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("English")
                  }
                >
                  English
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("Hindi")
                  }
                >
                  हिन्दी
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("Bengali")
                  }
                >
                  বাংলা
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("Telugu")
                  }
                >
                  తెలుగు
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("Marathi")
                  }
                >
                  मराठी
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("Tamil")
                  }
                >
                  தமிழ்
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("Gujarati")
                  }
                >
                  ગુજરાતી
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("Kannada")
                  }
                >
                  ಕನ್ನಡ
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("Malayalam")
                  }
                >
                  മലയാളം
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("Punjabi")
                  }
                >
                  ਪੰਜਾਬੀ
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("Odia")
                  }
                >
                  ଓଡ଼ିଆ
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("Assamese")
                  }
                >
                  অসমীয়া
                </button>

                <button
                  type="button"
                  onClick={() =>
                    selectLanguage("Urdu")
                  }
                >
                  اردو
                </button>

              </div>
            )}

          </div>

        </nav>

      </div>

    </header>
  );
}

export default Header;