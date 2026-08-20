import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import ReadyPatternsModal from "./ReadyPatternsModal";
import "./TemplateSelector.scss";      

const TemplateSelector = ({setAttributes,title,subtitle,templates = [],isPro,proTemplates,}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectTemplate = (template) => {
    setAttributes({
      ...(template.attributes || {}),
      selectedTemplate: template.id,
      isTemplateSelected: true,
    });
  };

  const handleSkip = () => {
    if (templates.length > 0) {
      const firstTemplate = templates[0];
      setAttributes({
        ...(firstTemplate.attributes || {}),
        selectedTemplate: firstTemplate.id,
        isTemplateSelected: true,
      });
    } else {
      setAttributes({
        isTemplateSelected: true,
      });
    }
  };

  const handleChooseReadyPatterns = () => {
    setIsModalOpen(true);
  };

  const handleImportPattern = (pattern) => {
    setAttributes({
      ...(pattern.attributes || {}),
      selectedTemplate: pattern.id,
      isTemplateSelected: true,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="gbb-template-selector-container">
      <div className="gbb-template-selector-header">
        <h2 className="gbb-template-title">{title}</h2>
        <p className="gbb-template-subtitle">{subtitle}</p>
      </div>

      <div className="gbb-template-grid">
        {templates.map((item) => {
          const SvgIcon = item.SvgComponent || item.icon;

          // Freemius active state check (via prop or global window.gbbData localized object)
          const isProActive = Boolean(isPro) || Boolean(window?.gbbData?.isPro);

          // Check if this specific template requires PRO (either by item property or by proTemplates list)
          const isTemplatePro =
            Boolean(item.isPro) ||
            (Array.isArray(proTemplates) && proTemplates.includes(item.id));
          const isLockedPro = isTemplatePro && !isProActive;

          return (
            <div
              key={item.id}
              className="gbb-template-card"
              onClick={() => {
                // যদি লক করা প্রো টেমপ্লেট হয়, তাহলে সিলেক্ট হতে দেবে না
                if (isLockedPro) {
                  return; // এখানে চাইলে প্রো কেনার লিংকে রিডাইরেক্ট করতে পারেন
                }
                handleSelectTemplate(item);
              }}
            >
              <div className="gbb-template-preview">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name || item.label}
                    className="gbb-template-image"
                  />
                ) : (
                  SvgIcon && <SvgIcon />
                )}

                {/* হোভার ওভারলে লজিক */}
                <div
                  className={`gbb-template-hover-overlay ${isLockedPro ? "is-pro-overlay" : ""}`}
                >
                  {isLockedPro ? (
                    <div className="gbb-pro-buttons">
                      <a
                        href="#"
                        className="gbb-btn-demo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Demo
                      </a>
                      <a
                        href="https://yourwebsite.com/pro"
                        target="_blank"
                        rel="noreferrer"
                        className="gbb-btn-pro"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 17l4-10 6 4 6-4 4 10H2z" />
                          <path d="M2 21h20" />
                        </svg>
                        PRO
                      </a>
                    </div>
                  ) : (
                    <span className="gbb-btn-select-preset">
                      {__("Select", "guten-builder-blocks")}
                    </span>
                  )}
                </div>
              </div>
              <div className="gbb-template-info">
                <span className="gbb-template-name">
                  {item.name || item.label}
                </span>
                <span className="gbb-template-tag">{item.tag}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="gbb-template-actions">
        <button
          type="button"
          className="gbb-btn-ready-patterns"
          onClick={handleChooseReadyPatterns}
        >
          {__("Choose from Ready Templates", "guten-builder-blocks")}
        </button>
        <button type="button" className="gbb-btn-skip" onClick={handleSkip}>
          {__("Skip", "guten-builder-blocks")}
        </button>
      </div>

      <ReadyPatternsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onImportPattern={handleImportPattern}
        isPro={isPro}
        proTemplates={proTemplates}
        templates={templates}
        title={title}
      />
    </div>
  );
};

export default TemplateSelector;
