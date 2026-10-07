import { useState, useRef, useEffect } from "react";

const DesktopIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const TabletIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const MobileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const Devices = ({ device, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ActiveIcon = device === 'mobile' ? MobileIcon : device === 'tablet' ? TabletIcon : DesktopIcon;

  const handleSelect = (newDevice) => {
    onChange(newDevice);
    setIsOpen(false);
  };

  const btnStyle = {
    padding: '4px',
    background: 'transparent',
    border: '1px solid #F62477',
    cursor: 'pointer',
    color: '#F62477',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '2px'
  };

  const optionStyle = {
    ...btnStyle,
    border: 'none',
    borderBottom: '1px solid #F62477',
    borderRadius: '0',
    width: '100%'
  };

  return (
    <div className="tr-devices-dropdown" ref={containerRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={btnStyle}
        title="Responsive Device"
      >
        <ActiveIcon />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          marginTop: '4px',
          background: '#fff',
          border: '1px solid #F62477',
          borderRadius: '2px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          minWidth: '28px'
        }}>
          <button type="button" onClick={() => handleSelect('desktop')} style={optionStyle} title="Desktop">
            <DesktopIcon />
          </button>
          <button type="button" onClick={() => handleSelect('tablet')} style={optionStyle} title="Tablet">
            <TabletIcon />
          </button>
          <button type="button" onClick={() => handleSelect('mobile')} style={{ ...optionStyle, borderBottom: 'none' }} title="Mobile">
            <MobileIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Devices;
