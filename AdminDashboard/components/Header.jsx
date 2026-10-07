import Navbar from "./Navbar/Navbar";
import "./Header.scss";

export const adminIcon = `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#f6f8faff"><path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h13A1.5 1.5 0 0 1 18 4.5v2A1.5 1.5 0 0 1 16.5 8h-13A1.5 1.5 0 0 1 2 6.5v-2zm0 6A1.5 1.5 0 0 1 3.5 9h5.5A1.5 1.5 0 0 1 10.5 10.5v5a1.5 1.5 0 0 1-1.5 1.5h-5.5A1.5 1.5 0 0 1 2 15.5v-5zm10 0A1.5 1.5 0 0 1 13.5 9h3A1.5 1.5 0 0 1 18 10.5v5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-5z"/></svg>`;


const Header = (props) => {
const{version, media, slug, isPro} = props;
const logoSrc = media?.logo || `data:image/svg+xml;utf8,${encodeURIComponent(adminIcon)}`;


  return (
    <div className="guten-builder-admin-wrap">
      {/* Top Header */}
      <header className="guten-builder-top-header">
        <div className="header-left">
          <div className="brand-logo-icon">
            <img
              src={logoSrc}
              alt="Plugin Logo"
              width="30"
              height="30"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="brand-info">
            <span className="brand-name">{slug}</span>
          </div>
        </div>

        <Navbar {...props} />

        <div className="header-right">
          <span className="plugin-version-badge">v{version}</span>

          {/* <button
            type="button"
            className="btn-header-pro"
            onClick={() => {
              const proBanner = document.querySelector(
                ".guten-builder-pro-banner",
              );
              if (proBanner) {
                proBanner.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {!isPro && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7zm3 16h14" />
              </svg>
            )}
            {isPro ? "Activated" : "Pro Upgrade"}
          </button> */}

        </div>
      </header>
    </div>
  );
};


export default Header;
