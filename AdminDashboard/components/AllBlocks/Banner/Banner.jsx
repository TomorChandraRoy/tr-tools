import { getBlockBannerConfig } from "./BannerData";
import "./Banner.scss";


const Banner = ({ block }) => {
    const config = getBlockBannerConfig(block);
  return (
    <div className="block-card-banner">
      <div className="banner-bg-effects">
        <div className="speed-line sl-1"></div>
        <div className="speed-line sl-2"></div>
        <div className="speed-line sl-3"></div>
      </div>
      <div className="banner-content-left">
        <div className="banner-brand-logo">
          {config.icon}
          <span className="brand-text">{block.title || config.title}</span>
        </div>
        <div className="banner-heading-group">
          <h3 className="banner-title">{config.title}</h3>
          <p className="banner-tag">{config.tag}</p>
        </div>
      </div>
      <div className="banner-content-right">
        <div className="banner-preview-box">
          {config.imageUrl ? (
            <img
              src={config.imageUrl}
              alt={config.title}
              className="banner-preview-img"
            />
          ) : (
            config.preview
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner
