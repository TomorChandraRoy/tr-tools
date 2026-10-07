import { useState } from 'react';
import './FeatureBanner.scss';

const getYoutubeEmbedUrl = (input) => {
  if (!input) return "";
  let videoId = input;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = input.match(regExp);

  if (match && match[2].length === 11) {
    videoId = match[2];
  }
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
};

const FeatureBanner = ({setActiveTab,adminUrl,featureBanner = {},youtubeVideoId: customVideoId,coverImage:customCoverImage,isVideo: customIsVideo}) => {

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const title = featureBanner.title ;
  const description = featureBanner.description ;
  const primaryBtnText = featureBanner.primaryBtnText ;
  const secondaryBtnText = featureBanner.secondaryBtnText ;
  const videoBtnText = featureBanner.videoBtnText ;
  const videoId = customVideoId || featureBanner.youtubeVideoId ;
  const coverImage = customCoverImage || featureBanner.coverImage;
  const isVideo = customIsVideo !== undefined ? customIsVideo : (featureBanner.isVideo !== undefined ? featureBanner.isVideo : true);

  const handleCreatePage = (postType = 'page') => {
    const newPageUrl = adminUrl
      ? `${adminUrl}post-new.php?post_type=${postType}`
      : `/wp-admin/post-new.php?post_type=${postType}`;
    window.open(newPageUrl, '_blank');
  };

  return (
    <div className="overview-feature-banner">
      {/* Left Content */}
      <div className="banner-content-left">
        <h2 className="banner-title">{title}</h2>
        <p className="banner-description">{description}</p>
        <div className="banner-actions">
          {primaryBtnText && (
            <button
              type="button"
              className="btn-primary"
              onClick={() => handleCreatePage('page')}
            >
              {primaryBtnText}
            </button>
          )}
          {secondaryBtnText && (
            <button
              type="button"
              className="btn-outline"
              onClick={() => setActiveTab && setActiveTab("all-blocks")}
            >
              {secondaryBtnText}
            </button>
          )}
          {isVideo && videoBtnText && (
            <button
              type="button"
              className="btn-outline"
              onClick={() => setIsVideoOpen(true)}
            >
              {videoBtnText}
            </button>
          )}
        </div>
      </div>

      {/* Right Media / Preview */}
      <div className="banner-media-right">
        <div
          className="media-preview-container"
          onClick={isVideo ? () => setIsVideoOpen(true) : undefined}
          title={isVideo ? "Click to play video preview" : undefined}
          style={{ cursor: isVideo ? "pointer" : "default" }}
        >

            <img
              src={coverImage}
              alt="Feature Banner Cover"
              className="feature-banner-cover-img"
              style={{
                width: "100%",
                height: "340px",
                maxHeight: "350px",
                objectFit: "cover",
                display: "block",
                borderRadius: "8px",
              }}
            />


          {/* Central Play Button */}
          {isVideo && (
            <button
              type="button"
              className="video-play-button"
              aria-label="Play video preview"
              onClick={(e) => {
                e.stopPropagation();
                setIsVideoOpen(true);
              }}
            >
              <span className="play-pulse-ring" />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* YouTube Video Modal Overlay */}
      {isVideo && isVideoOpen && (
        <div
          className="gbb-video-modal-backdrop"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="gbb-video-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="video-modal-close-btn"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
            >
              ×
            </button>
            <iframe
              src={getYoutubeEmbedUrl(videoId)}
              title="Guten Builder Video Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureBanner;
