export const navCategories = [
  {
    key: "getting-started",
    label: "Getting Started",
    items: [
      { key: "intro", label: "Introduction" },
      { key: "requirement", label: "Requirement" },
      { key: "installation", label: "Installation" },
      // { key: "purchase", label: "Purchase Process" },
      // { key: "license", label: "License Activation" },
    ],
  },
  {
    key: "how-to-use",
    label: "How To Use",
    items: [
      { key: "before-after", label: "Before/After Slider" },
      { key: "accordion", label: "FAQ Accordion" },
      { key: "audio-player", label: "Audio Player" },
      { key: "pricing-table", label: "Pricing Table" },
      { key: "button", label: "Action Button" },
      { key: "newsletter-card", label: "Newsletter Card" },
      { key: "divider", label: "Divider" },
      { key: "marquee", label: "Marquee Slider" },
      { key: "scroll-story", label: "Scroll Story" },
      { key: "table-of-contents", label: "Table of Contents" },
      { key: "qr-code", label: "QR Code Generator" },
    ],
  },
  {
    key: "faqs",
    label: "FAQs",
    items: [{ key: "faqs", label: "Frequently Asked Questions" }],
  },
];

export const docsContentData = {
  // Getting Started
  intro: {
    category: "Getting Started",
    title: "Introduction",
    breadcrumb: ["Docs", "Getting Started", "Introduction"],
    summary:
      "Welcome to XpoBlocks! Transform your standard WordPress editor into a modern, motion-ready block builder suite.",
    details:
      "XpoBlock is designed for performance, flexibility, and ease of use. It offers 11+ lightweight blocks including interactive Before/After image comparison, FAQ accordions, custom audio waveform players, dynamic pricing tables, and marquee sliders.",
    // features: [
    //   "11+ Core Gutenberg Blocks with zero bloat",
    //   "Modular asset loading (loads CSS/JS only when block is active)",
    //   "Fully responsive and mobile optimized out of the box",
    //   "SEO friendly HTML5 structure and schema markup",
    // ],
    usageSteps: [
      "Install and activate the XpoBlocks plugin.",
      "Navigate to WP Admin > XpoBlocks to view and toggle available blocks.",
      "Open any page or post in Gutenberg editor to start adding blocks.",
    ],
  },
  requirement: {
    category: "Getting Started",
    title: "Requirement",
    breadcrumb: ["Docs", "Getting Started", "Requirement"],
    summary:
      "Minimum system and WordPress environment requirements for optimal performance.",
    details:
      "Ensure your web hosting environment meets the following specifications to get the best experience with XpoBlock.",
    features: [
      "WordPress Version: 5.9 or higher (WordPress 6.0+ recommended)",
      "PHP Version: 7.4 or higher (PHP 8.1+ recommended)",
      "MySQL Version: 5.6+ or MariaDB 10.1+",
      "Gutenberg Block Editor enabled",
    ],
    usageSteps: [
      "Check your WordPress version under Dashboard > Updates.",
      "Verify PHP version under Tools > Site Health > Info.",
      "Ensure modern browser compatibility (Chrome, Firefox, Edge, Safari).",
    ],
  },
  installation: {
    category: "Getting Started",
    title: "Installation",
    breadcrumb: ["Docs", "Getting Started", "Installation"],
    summary:
      "Like any other WordPress plugin, you can easily install and activate XpoBlocks directly from the WordPress Plugin Directory.",
    details:
      "Go to your WordPress Dashboard and navigate to Plugins > Add New. In the search bar, type 'XpoBlocks', then click the Install Now button when the plugin appears in the results.",
    features: [
      "One-click installation via WordPress Plugin Directory",
      "Manual ZIP upload support via WP Admin",
      "Automatic updates support",
      "Zero database pollution on uninstall",
    ],
    usageSteps: [
      "Go to your WordPress Dashboard and click Plugins > Add New.",
      "In the search box, type 'XpoBlocks' and press enter.",
      "Click 'Install Now' on the XpoBlocks plugin card.",
      "Click 'Activate' once the installation finishes.",
    ],
  },
  // purchase: {
  //   category: "Getting Started",
  //   title: "Purchase Process",
  //   breadcrumb: ["Docs", "Getting Started", "Purchase Process"],
  //   summary:
  //     "How to purchase and upgrade to XpoBlock PRO for premium blocks and priority support.",
  //   details:
  //     "Upgrading to XpoBlock PRO unlocks 35+ advanced blocks, motion profiles, parallax effects, and 24/7 dedicated support.",
  //   features: [
  //     "Single Site, 5-Site, and Unlimited Site License tiers",
  //     "Instant license key generation upon purchase",
  //     "14-Day Money-Back Guarantee",
  //     "Automatic 1-click update notifications in WP Admin",
  //   ],
  //   usageSteps: [
  //     "Visit xpoblock.com/pro and choose your preferred pricing tier.",
  //     "Complete the checkout process with PayPal or Credit Card.",
  //     "Download the XpoBlock PRO ZIP file from your confirmation email.",
  //     "Upload the ZIP file under Plugins > Add New > Upload Plugin.",
  //   ],
  // },

  // license: {
  //   category: "Getting Started",
  //   title: "License Activation",
  //   breadcrumb: ["Docs", "Getting Started", "License Activation"],
  //   summary:
  //     "Activate your license key to enable automatic updates and premium features.",
  //   details:
  //     "After installing XpoBlock PRO, enter your valid license key to receive lifetime plugin updates and premium templates.",
  //   features: [
  //     "Seamless 1-click key validation",
  //     "Deactivate & re-activate license on new staging domains",
  //     "Real-time license status monitoring",
  //   ],
  //   usageSteps: [
  //     "Go to XpoBlock > License in your WP Dashboard.",
  //     "Paste your license key into the designated input box.",
  //     "Click 'Activate License' and enjoy all PRO features.",
  //   ],
  // },



// How To Use (Block Guides)
  "before-after": {
    category: "How To Use",
    title: "Before/After Slider",
    breadcrumb: ["Docs", "How To Use", "Before/After Slider"],
    summary:
      "Interactive image comparison block allowing users to drag a split handle to compare two images side-by-side.",
    details:
      "Perfect for showcasing renovation projects, photo editing results, design makeovers, and dental/medical transformations.",
    features: [
      "Dual Image Upload (Before image & After image support)",
      "Customizable slider handle color, glow intensity, and initial position",
      "Custom text labels for Before and After badges",
    ],
    usageSteps: [
      "Add the 'Before/After Slider' block into your Gutenberg canvas.",
      "In the Block Settings sidebar, select your 'Before' and 'After' media images.",
      "Pick your preferred slider handle style.",
      "Save and publish your post to test the live touch/mouse drag comparison.",
    ],
  },
  accordion: {
    category: "How To Use",
    title: "FAQ Accordion",
    breadcrumb: ["Docs", "How To Use", "FAQ Accordion"],
    summary:
      "Organize collapsible text panels for frequently asked questions, product specs, or structured documentation.",
    details:
      "Improves page readability and SEO with structured Schema.org FAQ markup for Google rich snippets.",
    features: [
      "Unlimited accordion item repeater",
      "Single-item open or multi-item expand modes",
      "Custom expandable icons (+ / -, chevron, arrow)",
      "Rich text editing inside accordion bodies",
    ],
    usageSteps: [
      "Insert the 'FAQ Accordion' block onto your page.",
      "Click 'Add Accordion Item' to create new question/answer rows.",
      "Customize question typography, active background color, and icon placement in settings.",
      "Preview collapsible smooth animations on desktop and mobile viewports.",
    ],
  },
  "audio-player": {
    category: "How To Use",
    title: "Audio Player",
    breadcrumb: ["Docs", "How To Use", "Audio Player"],
    summary:
      "Futuristic neon audio player block featuring dynamic equalizer wave animations, playback speed controls, and volume adjustments.",
    details:
      "Ideal for podcasters, musicians, voiceover artists, and audio course creators.",
    features: [
      "Direct MP3 file upload or external audio stream URL",
      "Dynamic audio spectrum equalizer visualizer",
      "1.0x - 2.0x playback speed toggles",
      "Custom cover image and artist subtitle display",
    ],
    usageSteps: [
      "Add the 'Audio Player' block to your layout.",
      "Upload an MP3 file via the WordPress Media Library or insert an audio URL.",
      "Set track title, artist name, and album artwork.",
      "Choose player theme colors in the sidebar inspector.",
    ],
  },
  "pricing-table": {
    category: "How To Use",
    title: "Pricing Table",
    breadcrumb: ["Docs", "How To Use", "Pricing Table"],
    summary:
      "Display responsive pricing tiers with highlighted featured plans, feature checklists, and action buttons.",
    details:
      "Designed for SaaS products, service agencies, memberships, and digital downloads.",
    features: [
      "Multi-column plan comparison cards",
      "Highlighted 'Popular' or 'Best Value' plan ribbons",
      "Monthly / Annual price toggle switch support",
      "Custom checkmark list items and CTA buttons",
    ],
    usageSteps: [
      "Insert the 'Pricing Table' block into your page.",
      "Configure plan names (Basic, Pro, Agency) and pricing values.",
      "Enable the 'Featured' toggle on your primary plan to highlight it with a neon border.",
      "Set button link URLs for direct checkout redirection.",
    ],
  },
  button: {
    category: "How To Use",
    title: "Action Button",
    breadcrumb: ["Docs", "How To Use", "Action Button"],
    summary:
      "High-converting call-to-action button with hover glow effects, icon pickers, and smooth click animations.",
    details:
      "Drive user actions with eye-catching button designs, customizable gradients, and smooth hover physics.",
    features: [
      "Gradient backgrounds and neon glow shadows",
      "Integrated dashicon & SVG icon alignment",
      "Hover scale and lift animations",
      "Target window options (_self or _blank)",
    ],
    usageSteps: [
      "Add the 'Action Button' block to any content section.",
      "Type your button text and enter the target URL.",
      "Select icon position (Left or Right) and adjust border radius.",
      "Customize background gradients and hover state effects.",
    ],
  },
  "newsletter-card": {
    category: "How To Use",
    title: "Newsletter Card",
    breadcrumb: ["Docs", "How To Use", "Newsletter Card"],
    summary:
      "Capture lead emails with modern newsletter subscription cards featuring gradient accents, input validation, and custom CTA buttons.",
    details:
      "Designed to boost email list signups, offer lead magnets, and collect subscriber emails seamlessly in Gutenberg layouts.",
    features: [
      "Custom title, subtitle, and subscriber input fields",
      "Customizable button text, colors, and success notifications",
      "Responsive card layouts with background styling and border radius controls",
      "Integration-ready form submission",
    ],
    usageSteps: [
      "Insert the 'Newsletter Card' block onto your page.",
      "Customize title, description, and input placeholder text in settings.",
      "Style the subscription button, card background, and typography.",
      "Publish your page to collect subscriber emails.",
    ],
  },
  divider: {
    category: "How To Use",
    title: "Divider",
    breadcrumb: ["Docs", "How To Use", "Divider"],
    summary:
      "Add a customizable dividing line with text or icon presets to separate content and improve layout hierarchy.",
    details:
      "Break up long content sections with styled divider lines, custom thickness, color pickers, and centered icons or text labels.",
    features: [
      "Preset templates (Text Divider, Icon Divider, Simple Line)",
      "Customizable width, height/thickness, and line colors",
      "Typography control for center text and SVG icon size pickers",
      "Responsive spacing and viewport width controls",
    ],
    usageSteps: [
      "Add the 'Divider' block between your content sections.",
      "Select your preferred template preset (Text or Icon).",
      "Adjust width, thickness, and line color in the inspector sidebar.",
      "Publish page to display styled dividing lines.",
    ],
  },

  marquee: {
    category: "How To Use",
    title: "Marquee Slider",
    breadcrumb: ["Docs", "How To Use", "Marquee Slider"],
    summary:
      "Continuous smooth scrolling text and image ticker for announcements, brand logos, and trending tags.",
    details:
      "Add high-energy visual movement to your site headers, client logo bars, or promotion tickers.",
    features: [
      "Infinite seamless ticker loop animation",
      "Adjustable scroll speed and direction (Left / Right)",
      "Pause-on-hover interaction support",
      "Custom text badges, icons, or sponsor logos",
    ],
    usageSteps: [
      "Add the 'Marquee Slider' block to your page header or body.",
      "Add text items, tags, or logos to the ticker track.",
      "Adjust scroll speed (e.g. 20s per loop) in the inspector controls.",
      "Enable 'Pause on Hover' to let users inspect scrolling content.",
    ],
  },
  "scroll-story": {
    category: "How To Use",
    title: "Scroll Story",
    breadcrumb: ["Docs", "How To Use", "Scroll Story"],
    summary:
      "Engaging scroll-driven timeline story block that highlights steps or history as the user scrolls down.",
    details:
      "Great for company timelines, product roadmaps, step-by-step tutorials, and event schedules.",
    features: [
      "Scroll-triggered active step indicators",
      "Progress line fill as user scrolls down",
      "Step images, icons, and timestamp badges",
      "Smooth entry animations",
    ],
    usageSteps: [
      "Insert the 'Scroll Story' block on your page.",
      "Add story milestone steps with dates, titles, and descriptions.",
      "Upload milestone images or select custom step icons.",
      "Publish and test the scroll trigger active indicators.",
    ],
  },
  "table-of-contents": {
    category: "How To Use",
    title: "Table of Contents",
    breadcrumb: ["Docs", "How To Use", "Table of Contents"],
    summary:
      "Automatically parses post headings (H1-H6) to build a collapsible, smooth-scrolling Table of Contents.",
    details:
      "Enhances blog post navigation, user experience, and Google search jump links.",
    features: [
      "Automatic heading detection (H2, H3, H4)",
      "Smooth scroll offset alignment for fixed headers",
      "Collapsible box toggle (Expand / Collapse)",
      "SEO friendly schema markup",
    ],
    usageSteps: [
      "Place the 'Table of Contents' block at the top of your long-form article.",
      "Select which heading tags to include (e.g. H2 and H3).",
      "Customize container background, active indicator color, and typography.",
      "The block will automatically discover and link all headings on the page.",
    ],
  },
  "qr-code": {
    category: "How To Use",
    title: "QR Code Generator",
    breadcrumb: ["Docs", "How To Use", "QR Code Generator"],
    summary:
      "Generates customizable vector QR codes for websites, text, phone numbers, and emails with logo overlay and instant image download support.",
    details:
      "Perfect for menus, event tickets, Wi-Fi passwords, contact vCards, and mobile app download links.",
    features: [
      "URL, text, email, and phone QR code generator",
      "Custom foreground, background, and button colors",
      "Center logo overlay with white background badge option",
      "High-resolution PNG image download button on frontend",
    ],
    usageSteps: [
      "Add the 'QR Code Generator' block to your page layout.",
      "Enter your desired target URL or text in the Inspector sidebar.",
      "Customize colors, dimensions, and optionally upload a center logo.",
      "Save page and test frontend QR code scanning or PNG download.",
    ],
  },

  // FAQs
  faqs: {
    category: "FAQs",
    title: "Frequently Asked Questions",
    breadcrumb: ["Docs", "FAQs", "General Questions"],
    summary:
      "Common questions and answers regarding XpoBlock compatibility and usage.",
    details:
      "Find quick answers to common questions about theme compatibility, site speed, and updates.",
    features: [
      "Does it work with any WordPress theme? Yes, 100% compatible with Block Themes and Classic Themes.",
      "Will it slow down my website? No, scripts and styles load conditionally on-demand (~12KB).",
      "Can I use it alongside Gutenberg plugins? Yes, it operates seamlessly without conflicts.",
      "Is it compatible with Elementor or WooCommerce? Yes, works inside WordPress block areas.",
    ],
    usageSteps: [
      "If you experience any issues, verify your WordPress and PHP versions.",
      "Deactivate conflicting cache plugins if block styles are not updating.",
      "Contact support if you need further technical assistance.",
    ],
  },
};


