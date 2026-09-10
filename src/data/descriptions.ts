/**
 * Curated preference descriptions - clear, user-friendly explanations
 * This maps preference keys to human-readable descriptions
 * Falls back to parsed descriptions if not found here
 */

export const preferenceDescriptions: Record<string, string> = {
  // ============ PERFORMANCE ============
  
  // Font and rendering
  "gfx.content.skia-font-cache-size": "Increases the font cache size to 20MB for faster text rendering on pages with many fonts. Helps with complex typography and reduces font loading delays.",
  "content.notify.interval": "Controls how often Firefox updates the page display while loading. Lower values (100ms) make pages appear faster but use more CPU. Default is 120ms.",
  "gfx.canvas.accelerated.cache-size": "Sets the GPU-accelerated canvas cache to 512MB for better performance on graphics-heavy websites like games and animations.",
  
  // Media
  "media.cache_readahead_limit": "Buffers 60 minutes of video ahead for smoother playback without interruptions. Prevents buffering on YouTube and other video sites.",
  "media.cache_resume_threshold": "Resumes video playback when the buffer drops below 30 minutes. Works with the readahead limit to maintain smooth streaming.",
  "media.memory_cache_max_size": "Sets the maximum memory cache for media to 64MB in private browsing mode. Allows video playback without writing to disk.",
  
  // Images
  "image.mem.decode_bytes_at_a_time": "Doubles the image decode chunk size to 32KB for faster image loading. Images appear on screen more quickly.",
  
  // Networking
  "network.buffer.cache.size": "Increases network buffer to 64KB for faster data transfers. Reduces CPU usage by requiring fewer data transfers between Firefox and your network card.",
  "network.buffer.cache.count": "Doubles the number of network buffers to 48 for better parallel data handling. Helps when loading multiple resources simultaneously.",
  "network.http.max-connections": "Doubles maximum HTTP connections to 1800 for faster parallel page loading. Allows Firefox to download more resources at once.",
  "network.http.max-persistent-connections-per-server": "Increases persistent connections per server to 10 for faster downloads. Keeps more connections open to the same website.",
  "network.http.max-urgent-start-excessive-connections-per-host": "Allows 5 urgent connections per host for priority resources like critical CSS and JavaScript files.",
  "network.http.request.max-start-delay": "Reduces maximum delay before starting HTTP requests to 5 seconds. Pages start loading faster.",
  "network.dnsCacheExpiration": "Keeps DNS entries cached for 1 hour instead of 1 minute. Reduces DNS lookup time for frequently visited sites.",
  
  // ============ SECURITY & PRIVACY ============
  
  // Tracking protection
  "browser.contentblocking.category": "Enables Enhanced Tracking Protection in Strict mode with Total Cookie Protection. Blocks most trackers and isolates cookies by website.",
  "privacy.globalprivacycontrol.enabled": "Sends the Global Privacy Control (GPC) signal to websites, telling them not to sell or share your personal data. Supported by some privacy-focused sites.",
  "browser.download.start_downloads_in_tmp_dir": "Starts downloads in a temporary directory to prevent websites from learning your file system structure through download paths.",
  "browser.uitour.enabled": "Disables the UITour API that allows websites to control Firefox's UI. Prevents malicious sites from manipulating browser interface elements.",
  
  // SSL/TLS
  "security.ssl.treat_unsafe_negotiation_as_broken": "Shows a warning when a website uses insecure SSL/TLS negotiation. Alerts you to potentially compromised connections.",
  "security.tls.enable_0rtt_data": "Disables TLS 1.3 0-RTT to prevent replay attacks. Slightly slower connections but more secure against certain types of attacks.",
  "browser.xul.error_pages.expert_bad_cert": "Shows detailed technical information on certificate error pages instead of simplified warnings. Useful for advanced users diagnosing SSL issues.",
  
  // HTTPS
  "dom.security.https_only_mode": "Forces all connections to use HTTPS. Shows a warning when a site doesn't support HTTPS, protecting you from unencrypted connections.",
  "dom.security.https_only_mode_error_page_user_suggestions": "Offers suggestions to find the HTTPS version of a site when the HTTP version fails. Helps you access secure versions of websites.",
  
  // OCSP
  "security.OCSP.enabled": "Disables OCSP (Online Certificate Status Protocol) checking to prevent leaking which websites you visit to Certificate Authorities. Slightly reduces certificate validation.",
  "privacy.antitracking.isolateContentScriptResources": "Isolates resources loaded by content scripts (extensions) to prevent them from accessing data from other websites.",
  "security.csp.reporting.enabled": "Disables Content Security Policy reporting to prevent websites from learning about blocked content attempts.",
  
  // Disk avoidance
  "browser.cache.disk.enable": "Disables disk cache to prevent sensitive data from being written to your hard drive. All caching happens in RAM only. May increase memory usage.",
  "browser.privatebrowsing.forceMediaMemoryCache": "Forces all media caching to happen in memory during private browsing. Prevents video/audio data from being written to disk.",
  "browser.sessionstore.interval": "Saves your session every 60 seconds instead of every 15 seconds. Reduces disk writes but increases data loss risk if Firefox crashes.",
  "privacy.history.custom": "Shows all history clearing options in the History section of settings, giving you more control over what data is retained.",
  
  // Speculative loading
  "network.http.speculative-parallel-limit": "Disables speculative parallel connections that pre-connect to URLs you might visit. Prevents leaking your browsing intentions to websites.",
  "network.dns.disablePrefetch": "Disables DNS prefetching that resolves links on a page before you click them. Prevents leaking your future browsing to your DNS provider.",
  "network.dns.disablePrefetchFromHTTPS": "Also disables DNS prefetching from HTTPS pages for consistent privacy protection.",
  "browser.urlbar.speculativeConnect.enabled": "Prevents Firefox from pre-connecting to URLs as you type them in the address bar. Stops leaking partial URLs to websites.",
  "browser.places.speculativeConnect.enabled": "Disables speculative connections for bookmarks and history. Prevents pre-connecting to sites in your bookmarks.",
  "network.prefetch-next": "Disables link prefetching that downloads pages linked from the current page. Prevents downloading content you haven't requested.",
  
  // Search/URL bar
  "browser.urlbar.trimHttps": "Hides 'https://' from the URL bar display for cleaner appearance. The full URL is still copied when you select it.",
  "browser.urlbar.untrimOnUserInteraction.featureGate": "Shows the full URL when you click or edit the address bar. Helps you see the complete web address when needed.",
  "browser.search.separatePrivateDefault.ui.enabled": "Enables the option to use a different search engine in Private Windows than in normal browsing.",
  "browser.search.suggest.enabled": "Disables live search suggestions that send your keystrokes to the search engine as you type. Prevents leaking partial searches.",
  "browser.urlbar.quicksuggest.enabled": "Disables Firefox Suggest that shows sponsored and non-sponsored suggestions in the URL bar dropdown.",
  "browser.urlbar.groupLabels.enabled": "Hides the 'Firefox Suggest' label in the URL dropdown for a cleaner interface.",
  "browser.formfill.enable": "Disables search and form history that remembers what you've typed in forms. Prevents data leakage to third parties with access to your device.",
  "network.IDN_show_punycode": "Shows international domain names in Punycode format to prevent homograph attacks where malicious sites mimic legitimate ones.",
  
  // Passwords
  "signon.formlessCapture.enabled": "Prevents the password manager from capturing login fields that aren't in standard form elements. Reduces false positives but may miss some login forms.",
  "signon.privateBrowsingCapture.enabled": "Prevents capturing and saving passwords entered in private browsing mode. Keeps private browsing truly private.",
  "network.auth.subresource-http-auth-allow": "Prevents cross-origin sub-resources from opening HTTP authentication dialogs. Blocks a potential phishing vector.",
  "editor.truncate_user_pastes": "Prevents password truncation when submitting form data. Ensures long passwords are sent completely.",
  
  // Extensions
  "extensions.enabledScopes": "Limits extension installation to profile and application directories only. Prevents extensions from being installed in system-wide locations.",
  
  // Referers
  "network.http.referer.XOriginTrimmingPolicy": "Sends only the scheme, host, and port in the Referer header for cross-origin requests. Maximum privacy - websites can't see which page you came from.",
  
  // PDF
  "pdfjs.enableScripting": "Prevents PDFs from executing JavaScript to block potential exploits. Most PDFs don't need JavaScript anyway.",
  
  // Safe Browsing
  "browser.safebrowsing.downloads.remote.enabled": "Disables remote Safe Browsing checks that send download information to Google. Prevents Google from learning what you download, but reduces malware protection.",
  
  // Permissions
  "permissions.default.desktop-notification": "Blocks desktop notification permission requests by default. Prevents websites from spamming you with notifications.",
  "permissions.default.geo": "Blocks geolocation permission requests by default. Prevents websites from accessing your physical location.",
  "geo.provider.network.url": "Uses BeaconDB instead of Google for geolocation services. More privacy-respecting location provider.",
  
  // Mozilla
  "browser.search.update": "Prevents Firefox from automatically re-adding search engines you've removed. Keeps your search engine list clean.",
  "permissions.manager.defaultsUrl": "Removes special permissions for Mozilla domains. Treats Mozilla websites the same as any other site.",
  "extensions.getAddons.cache.enabled": "Disables metadata caching for installed add-ons. Prevents Firefox from checking for addon updates in the background.",
  
  // ============ TELEMETRY & DATA ============
  
  // Core telemetry
  "datareporting.policy.dataSubmissionEnabled": "Disables all data submission to Mozilla. No telemetry data is sent from your browser.",
  "datareporting.healthreport.uploadEnabled": "Disables Firefox Health Report uploads that send technical and interaction data to Mozilla.",
  "toolkit.telemetry.unified": "Disables the unified telemetry module that collects extended usage data.",
  "toolkit.telemetry.enabled": "Disables the telemetry system entirely. No usage data is collected or stored locally.",
  "toolkit.telemetry.server": "Sets the telemetry server to an empty data URI. Even if telemetry tries to send data, it has nowhere to go.",
  "toolkit.telemetry.archive.enabled": "Disables local archiving of telemetry data. No telemetry data is stored on your device.",
  "toolkit.telemetry.newProfilePing.enabled": "Disables the ping sent when a new profile is created. Mozilla won't know when you create new profiles.",
  "toolkit.telemetry.shutdownPing.enabled": "Disables the ping sent when Firefox shuts down. Mozilla won't track your browsing sessions.",
  "toolkit.telemetry.updatePing.enabled": "Disables the ping sent after Firefox updates. Mozilla won't know when you update.",
  "toolkit.telemetry.bhrPing.enabled": "Disables Background Hang Reporter pings that report when Firefox is slow or unresponsive.",
  "toolkit.telemetry.firstShutdownPing.enabled": "Disables the ping sent on first shutdown of a profile. Mozilla won't track profile lifecycle.",
  
  // Coverage
  "toolkit.telemetry.coverage.opt-out": "Opts out of telemetry coverage pings that measure telemetry system effectiveness.",
  "toolkit.coverage.opt-out": "Opts out of coverage data collection in Firefox 64 and later.",
  "toolkit.coverage.endpoint.base": "Removes the coverage data endpoint URL. Coverage data has nowhere to be sent.",
  
  // Activity Stream
  "browser.newtabpage.activity-stream.feeds.telemetry": "Disables telemetry for Firefox Home (New Tab page). Mozilla won't track what you do on the new tab.",
  "browser.newtabpage.activity-stream.telemetry": "Additional telemetry disable for Activity Stream. Comprehensive New Tab telemetry blocking.",
  "datareporting.usage.uploadEnabled": "Disables daily active users data upload in Firefox 136+. Mozilla won't track your daily usage.",
  
  // Experiments
  "app.shield.optoutstudies.enabled": "Disables Firefox Studies (Shield experiments) that test new features on users. You won't be part of A/B tests.",
  "app.normandy.enabled": "Disables Normandy/Shield telemetry and recipe system that pushes experiments and studies to users.",
  "app.normandy.api_url": "Removes the Normandy API endpoint URL. Even if enabled, there's nowhere to fetch experiments from.",
  "nimbus.rollouts.enabled": "Disables remote feature rollouts via Nimbus in Firefox 148+. Prevents gradual feature releases that bypass your control.",
  
  // Crash reports
  "breakpad.reportURL": "Removes the crash report submission URL. Crash reports can't be sent to Mozilla.",
  "browser.tabs.crashReporting.sendReport": "Disables sending tab crash reports. Mozilla won't receive information about tab crashes.",
  "browser.crashReports.unsubmittedCheck.enabled": "Disables the check for unsubmitted crash reports. Firefox won't prompt you to send old crash data.",
  
  // ============ UI & ANNOYANCES ============
  
  // Mozilla UI
  "extensions.getAddons.showPane": "Hides the recommendations pane in about:addons that uses Google Analytics. Cleaner addon management interface.",
  "extensions.htmlaboutaddons.recommendations.enabled": "Disables recommendations in the Extensions and Themes panes. No more suggested addons.",
  "browser.discovery.enabled": "Disables personalized extension recommendations in about:addons and AMO (addons.mozilla.org).",
  "browser.shell.checkDefaultBrowser": "Stops Firefox from asking to be set as the default browser every time you open it. No more nagging.",
  "browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons": "Disables Contextual Feature Recommender for addons. No more popup suggestions to install addons.",
  "browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features": "Disables Contextual Feature Recommender for features. No more popup suggestions about Firefox features.",
  "browser.preferences.moreFromMozilla": "Hides the 'More from Mozilla' section in Settings. Cleaner preferences interface.",
  "browser.aboutConfig.showWarning": "Skips the warning page when accessing about:config. Faster access for advanced users who know what they're doing.",
  "browser.startup.homepage_override.mstone": "Disables welcome notices and 'What's New' pages after updates. Firefox starts directly to your homepage.",
  "browser.aboutwelcome.enabled": "Disables the intro/welcome screens shown on first run. Firefox starts immediately without onboarding.",
  "browser.profiles.enabled": "Enables the new profile switcher for easy multi-profile management. Quickly switch between different Firefox profiles.",
  
  // Theme
  "toolkit.legacyUserProfileCustomizations.stylesheets": "Enables custom CSS via userChrome.css and userContent.css. Allows deep UI customization.",
  "browser.compactmode.show": "Adds compact density mode back to toolbar customization options. More space for web content.",
  "browser.privateWindowSeparation.enabled": "Prevents private windows from appearing separately in the Windows taskbar. Cleaner taskbar appearance.",
  "layout.css.prefers-color-scheme.content-override": "Controls how websites determine light/dark mode. Set to match system theme for consistency.",
  
  // AI features
  "browser.ai.control.default": "Blocks AI features by default across the browser. Prevents AI from analyzing your browsing.",
  "browser.ml.enable": "Disables machine learning and AI features entirely. No AI processing of your data.",
  "browser.ml.chat.enabled": "Disables the AI chatbot in the sidebar. No AI assistant taking up space.",
  "browser.ml.chat.menu": "Disables AI chat context menu entries. Cleaner right-click menu.",
  "browser.tabs.groups.smart.enabled": "Disables AI-powered tab group suggestions. Tabs won't be automatically organized by AI.",
  "browser.ml.linkPreview.enabled": "Disables AI-generated key points in link previews. See actual page content instead of AI summaries.",
  
  // Fullscreen
  "full-screen-api.transition-duration.enter": "Removes the animation delay when entering fullscreen mode. Instant fullscreen for videos and games.",
  "full-screen-api.transition-duration.leave": "Removes the animation delay when leaving fullscreen mode. Instant exit from fullscreen.",
  "full-screen-api.warning.timeout": "Disables the fullscreen notification popup. No more 'You are now in fullscreen' message.",
  
  // URL bar
  "browser.urlbar.trending.featureGate": "Disables trending search suggestions in the URL bar. No more popular searches cluttering your dropdown.",
  "browser.urlbar.suggest.engines": "Disables search engine suggestions in the URL bar dropdown. Cleaner address bar suggestions.",
  
  // New tab
  "browser.newtabpage.activity-stream.default.sites": "Removes default pinned shortcuts from the New Tab page. Clean new tab without pre-set sites.",
  "browser.newtabpage.activity-stream.showSponsoredTopSites": "Hides sponsored/advertised shortcuts on the New Tab page. No ads in your shortcuts.",
  "browser.newtabpage.activity-stream.feeds.section.topstories": "Disables 'Recommended by Pocket' stories on New Tab. No more clickbait articles.",
  "browser.newtabpage.activity-stream.showSponsored": "Hides sponsored stories on the New Tab page. No sponsored content in your feed.",
  "browser.newtabpage.activity-stream.showSponsoredCheckboxes": "Hides 'Support Firefox' sponsored checkboxes in Firefox 140+. Cleaner New Tab interface.",
  
  // Downloads
  "browser.download.manager.addToRecentDocs": "Prevents downloads from appearing in the system's recent documents list. Keeps your download history private.",
  "browser.download.open_pdf_attachments_inline": "Opens PDF attachments inline in the browser instead of downloading them. Faster PDF viewing.",
  
  // Tab behavior
  "browser.bookmarks.openInTabClosesMenu": "Keeps the bookmarks menu open when opening a bookmark in a new tab. Easier to open multiple bookmarks.",
  "findbar.highlightAll": "Highlights all matches when using the Find bar (Ctrl+F). See all occurrences of your search term at once.",
  
  // ============ PRIVACY HARDENING ============
  
  // Cookies and storage
  "privacy.query_stripping.enabled": "Strips known tracking parameters from URLs automatically. Removes tracking IDs like utm_source, fbclid, etc.",
  "privacy.query_stripping.enabled.pbmode": "Also strips tracking parameters in private browsing mode for consistent privacy.",
  "privacy.query_stripping.strip_on_share.enabled": "Strips tracking parameters when you share URLs. Clean links when copying or sharing.",
  "privacy.purge_trackers.enabled": "Purges tracking cookies and storage daily from known trackers that you haven't interacted with in 45 days.",
  "network.cookie.sameSite.laxByDefault": "Sets cookies to SameSite=Lax by default to prevent CSRF attacks. More secure cookie handling.",
  "network.cookie.sameSite.noneRequiresSecure": "Requires Secure context (HTTPS) for SameSite=None cookies. Prevents insecure cookie usage.",
  "network.cookie.sameSite.schemeful": "Enforces scheme-aware SameSite cookies. HTTP and HTTPS are treated as different sites for cookie purposes.",
  
  // Tracking
  "browser.send_pings": "Disables click tracking via hyperlink auditing (ping attribute). Websites can't track which links you click.",
  "beacon.enabled": "Disables the Beacon API used for background activity tracking. May break some sites but improves privacy.",
  "dom.event.clipboardevents.enabled": "Prevents websites from monitoring clipboard events. Sites can't detect when you copy/paste.",
  
  // DOM
  "dom.disable_window_move_resize": "Prevents scripts from moving and resizing open windows. Stops annoying popup behavior.",
  "dom.disable_beforeunload": "Disables the beforeunload event that shows 'Are you sure you want to leave?' messages. No more exit traps.",
  
  // Partitioning
  "privacy.partition.network_state": "Partitions network APIs and caches by top-level site to prevent cross-site tracking. Each website gets isolated network state.",
  "privacy.partition.serviceWorkers": "Partitions service workers by top-level site. Service workers can't share data between sites.",
  "privacy.partition.always_partition_third_party_non_cookie_storage": "Always partitions third-party non-cookie storage in Firefox 104+. Maximum storage isolation.",
  
  // Push
  "dom.push.enabled": "Disables the Push Notifications API. Websites can't send you push notifications. May break some web apps.",
  
  // Accessibility
  "accessibility.force_disabled": "Disables accessibility services for better performance. Breaks screen readers but improves speed if you don't need them.",
  
  // Middle click
  "middlemouse.contentLoadURL": "Disables middle mouse button loading URLs from clipboard. Prevents accidental navigation.",
  
  // Auto-refresh
  "accessibility.blockautorefresh": "Stops websites from reloading pages automatically. Prevents annoying auto-refresh behavior.",
  "browser.meta_refresh_when_inactive.disabled": "Prevents meta refresh when the tab is inactive. Saves resources on background tabs.",
  
  // Network predictor
  "network.predictor.enabled": "Disables the network predictor that pre-connects to sites you might visit. Prevents speculative connections.",
  "network.predictor.enable-prefetch": "Disables prefetching by the network predictor. No pre-loading of predicted resources.",
  
  // ============ SECURITY HARDENING ============
  
  // Mixed content
  "security.mixed_content.block_active_content": "Blocks active mixed content (scripts, iframes) on HTTPS pages. Prevents insecure content from compromising secure pages.",
  "security.mixed_content.block_display_content": "Blocks display mixed content (images, video) on HTTPS pages. Maximum protection against mixed content.",
  "security.csp.experimentalEnabled": "Enables experimental Content Security Policy features. Stricter content security but may break some sites.",
  "dom.security.sanitizer.enabled": "Enables the HTML Sanitizer API for safer HTML handling. Better protection against XSS attacks.",
  
  // Popups
  "dom.block_multiple_popups": "Blocks multiple popups from the same action. Prevents popup spam.",
  "dom.popup_allowed_events": "Limits events that can trigger popups. Only specific user actions can open popups.",
  "dom.disable_open_during_load": "Prevents popups from opening during page load. Stops automatic popup windows.",
  "privacy.popups.showBrowserMessage": "Shows a message when popups are blocked. Lets you know when Firefox is protecting you.",
  
  // Fingerprinting
  "privacy.trackingprotection.lower_network_priority": "Lower priority for network loads from tracking protection list. Tracking resources load slower.",
  
  // Captive portal
  "network.captive-portal-service.enabled": "Disables captive portal detection. May break public WiFi login pages but prevents unnecessary network checks.",
  "network.connectivity-service.enabled": "Disables network connectivity checks. May break public WiFi detection but prevents background connectivity tests.",
  
  // Region
  "browser.region.update.enabled": "Disables region updates that detect your location. Prevents Firefox from learning your geographic region.",
  
  // Cookies
  "network.cookie.cookieBehavior": "Controls cookie behavior. Value 5 enables Dynamic First-Party Isolation (Total Cookie Protection) for maximum cookie privacy.",
  
  // Web channels
  "webchannel.allowObject.urlWhitelist": "Removes the webchannel whitelist. No special permissions for any websites.",
  
  // Default browser
  "default-browser-agent.enabled": "Disables the default browser agent that continually reports which browser you're using. Prevents background default browser checks.",
  
  // Extension reports
  "extensions.abuseReport.enabled": "Disables the 'report extensions for abuse' feature. No abuse reporting UI.",
  
  // Autoplay
  "media.autoplay.default": "Controls autoplay behavior. Value 1 blocks non-muted media, value 5 blocks all autoplay. Prevents videos from playing automatically.",
  "media.autoplay.blocking_policy": "Sets autoplay blocking policy. Value 2 requires user interaction before autoplay is allowed. Strict autoplay control.",
  
  // Permissions
  "permissions.default.camera": "Blocks camera permission requests by default. Websites can't access your camera without explicit permission.",
  "permissions.default.microphone": "Blocks microphone permission requests by default. Websites can't access your microphone without explicit permission.",
  
  // Safe Browsing
  "browser.safebrowsing.malware.enabled": "Disables Safe Browsing malware checks. Reduces protection but prevents Google from learning what sites you visit. Only disable if you have alternative protection.",
  "browser.safebrowsing.phishing.enabled": "Disables Safe Browsing phishing checks. Reduces protection but prevents Google from learning what sites you visit. Only disable if you have alternative protection.",
  
  // ============ ADDITIONAL PERFORMANCE ============
  
  // Initial paint
  "nglayout.initialpaint.delay": "Controls how long Firefox waits before rendering the page. Lower values show content faster but may increase CPU usage.",
  "content.notify.ontimer": "Controls whether page reflow happens on a timer. When true, pages reflow at intervals instead of continuously.",
  
  // WebRender
  "gfx.webrender.all": "Enables WebRender and additional features for better graphics performance. Uses GPU for rendering.",
  "gfx.webrender.compositor": "Enables WebRender layer compositor for better performance on supported systems.",
  "gfx.canvas.accelerated": "Enables GPU-accelerated Canvas2D for hardware acceleration of canvas elements.",
  
  // JIT
  "javascript.options.baselinejit.threshold": "Controls how many times a function runs before Firefox promotes it to the Baseline JIT compiler. Lower values compile faster.",
  "javascript.options.ion.threshold": "Controls how many times a function runs before Firefox promotes it to the IonMonkey optimizing JIT. Higher values keep more code on faster Baseline JIT.",
  
  // Disk cache
  "browser.cache.disk.smart_size.enabled": "Disables smart sizing to allow manual control of disk cache size.",
  "browser.cache.disk.capacity": "Sets the disk cache size. Larger values use more disk space but reduce network requests.",
  "browser.cache.disk.max_entry_size": "Maximum size of a single object in disk cache. Larger values allow bigger cached files.",
  "browser.cache.disk.preload_chunk_count": "Number of chunks to preload ahead when reading cache. Higher values load large content faster.",
  "browser.cache.jsbc_compression_level": "Compression level for cached JavaScript bytecode. Higher values save disk space but use more CPU.",
  
  // Memory cache
  "browser.cache.memory.capacity": "Sets the memory cache size. Larger values use more RAM but reduce disk access.",
  "browser.cache.memory.max_entry_size": "Maximum size of a single object in memory cache.",
  
  // Media
  "media.cache_size": "Sets the media disk cache size. Larger values buffer more media content.",
  "media.memory_caches_combined_limit_kb": "Combined limit for media memory caches. Controls how much RAM media can use.",
  
  // Images
  "image.cache.size": "Sets the image cache size. Larger values cache more images in memory.",
  
  // DNS
  "network.dnsCacheEntries": "Number of DNS entries to cache. Higher values cache more domains.",
  "network.ssl_tokens_cache_capacity": "SSL token cache capacity for faster reconnects. Higher values speed up TLS handshakes.",
  
  // HTTP
  "network.http.pacing.requests.enabled": "Controls whether Firefox paces HTTP requests. Disabling sends requests as fast as possible.",
  "network.http.pacing.requests.min-parallelism": "Minimum parallel HTTP requests when pacing is enabled.",
  "network.http.pacing.requests.burst": "Maximum burst of HTTP requests when pacing is enabled.",
  "network.websocket.max-connections": "Maximum WebSocket connections. Higher values allow more simultaneous WebSocket connections.",
  
  // Session
  "browser.sessionhistory.max_total_viewers": "Number of Back/Forward cached pages stored in memory. Higher values make back/forward faster but use more RAM.",
  
  // Tabs
  "browser.tabs.unloadOnLowMemory": "Unloads inactive tabs when memory is low. Helps prevent Firefox from running out of memory.",
  "browser.tabs.min_inactive_duration_before_unload": "How long tabs must be inactive before they can be unloaded. Lower values unload tabs sooner.",
  
  // Process
  "dom.ipc.processCount": "Number of content processes for shared web content. Higher values use more RAM but improve performance.",
  "dom.ipc.processCount.webIsolated": "Number of processes per isolated website. Higher values isolate more sites but use more RAM.",
  
  // Features
  "reader.parse-on-load.enabled": "Disables Reader mode parsing on page load. Slightly faster page loads if you don't use Reader mode.",
  "browser.newtab.preload": "Preloads the new tab page for faster opening. Disabling may cause a slight delay when opening new tabs.",
  "browser.sessionstore.restore_on_demand": "Controls whether tabs are restored on demand or all at once. On-demand uses less memory.",
  "browser.sessionstore.restore_tabs_lazily": "Lazily restores tabs to save memory. Tabs load when you switch to them.",
  "extensions.webcompat.enable_shims": "Enables compatibility shims for tracking protection. Helps sites work with strict tracking protection.",

  // ============ ADDITIONAL COMMON PREFS ============

  // Browser behavior
  "browser.startup.homepage": "Sets your homepage URL. Use 'about:home' for default, 'about:blank' for empty, or any URL.",
  "browser.startup.page": "Controls what Firefox shows on startup. 0=blank, 1=homepage, 3=restore previous session.",
  "browser.newtabpage.enabled": "Controls whether the new tab page shows activity stream content or blank page.",
  "browser.tabs.loadBookmarksInTabs": "Controls where bookmarks open. false=current tab, true=new tab.",
  "browser.tabs.tabMinWidth": "Minimum width of tabs in pixels. Lower values allow more tabs to be visible.",
  "browser.tabs.tabMaxWidth": "Maximum width of tabs in pixels. Prevents tabs from becoming too wide.",
  "browser.tabs.tabClipWidth": "Width at which tab close button appears. Lower values show close button sooner.",
  
  // Downloads
  "browser.download.dir": "Default download directory path. Use full system path (e.g., /home/user/Downloads).",
  "browser.download.folderList": "Download location. 0=Desktop, 1=Downloads, 2=Custom (use browser.download.dir).",
  "browser.download.useDownloadDir": "Automatically save files to download folder without asking. false=always ask.",
  "browser.download.manager.showWhenStarting": "Show download manager when download starts.",
  "browser.download.manager.closeWhenDone": "Close download manager when downloads complete.",
  
  // Search
  "browser.search.defaultenginename": "Default search engine name (e.g., 'Google', 'DuckDuckGo', 'Bing').",
  "browser.search.order.1": "First search engine in the search bar dropdown.",
  "browser.search.order.2": "Second search engine in the search bar dropdown.",
  "browser.search.order.3": "Third search engine in the search bar dropdown.",
  
  // Privacy
  "privacy.clearOnShutdown.cache": "Clear cache when Firefox closes.",
  "privacy.clearOnShutdown.cookies": "Clear cookies when Firefox closes.",
  "privacy.clearOnShutdown.downloads": "Clear download history when Firefox closes.",
  "privacy.clearOnShutdown.formdata": "Clear form history when Firefox closes.",
  "privacy.clearOnShutdown.history": "Clear browsing history when Firefox closes.",
  "privacy.clearOnShutdown.sessions": "Clear active sessions when Firefox closes.",
  "privacy.clearOnShutdown.siteSettings": "Clear site preferences when Firefox closes.",
  "privacy.clearOnShutdown.offlineApps": "Clear offline website data when Firefox closes.",
  
  // Network
  "network.proxy.type": "Proxy configuration. 0=direct, 1=manual, 2=PAC, 4=auto-detect, 5=system settings.",
  "network.proxy.http": "HTTP proxy server hostname.",
  "network.proxy.http_port": "HTTP proxy server port number.",
  "network.proxy.ssl": "HTTPS proxy server hostname.",
  "network.proxy.ssl_port": "HTTPS proxy server port number.",
  "network.proxy.no_proxies_on": "Comma-separated list of hosts that bypass the proxy (e.g., 'localhost, 127.0.0.1').",
  "network.proxy.autoconfig_url": "URL to proxy auto-configuration (PAC) file.",
  
  // Security
  "security.tls.version.min": "Minimum TLS version allowed. 1=TLS 1.0, 2=TLS 1.1, 3=TLS 1.2, 4=TLS 1.3.",
  "security.tls.version.max": "Maximum TLS version allowed. 4=TLS 1.3 (recommended).",
  "security.mixed_content.upgrade_display_content": "Automatically upgrade insecure images/video to HTTPS when possible.",
  
  // UI
  "browser.uiCustomization.state": "Stores toolbar customization state. Don't modify manually.",
  "browser.toolbars.bookmarks.visibility": "When to show bookmarks toolbar. 'always', 'newtab', or 'never'.",
  "browser.chrome.site_icons": "Load and display website favicons in tabs and bookmarks.",
  "browser.chrome.favicons": "Enable favicon loading. false=no favicons anywhere.",
  
  // Accessibility
  "accessibility.typeaheadfind": "Enable type-ahead find (start typing to search page).",
  "accessibility.typeaheadfind.timeout": "Milliseconds before type-ahead find times out.",
  
  // Extensions
  "extensions.autoDisableScopes": "Controls which extension scopes are auto-disabled. 0=none, 15=all.",
  
  // Developer tools
  "devtools.chrome.enabled": "Enable developer tools in browser chrome (about:config, etc.).",
  "devtools.debugger.remote-enabled": "Allow remote debugging. Security risk if enabled.",
  "devtools.theme": "Developer tools theme. 'dark' or 'light'.",
  
  // General
  "general.useragent.override": "Custom User-Agent string. Leave empty for default. Use with caution.",
  "general.warnOnAboutConfig": "Show warning when accessing about:config. false=skip warning.",
  "general.smoothScroll": "Enable smooth scrolling. false=jump scrolling.",
  "general.autoScroll": "Enable auto-scrolling with middle mouse button.",
  
  // Fonts
  "font.name.serif.x-western": "Default serif font for Western languages.",
  "font.name.sans-serif.x-western": "Default sans-serif font for Western languages.",
  "font.name.monospace.x-western": "Default monospace font for Western languages.",
  "font.size.variable.x-western": "Default variable font size in pixels.",
  "font.size.fixed.x-western": "Default fixed-width font size in pixels.",
  
  // Printing
  "print.printer_Mozilla_Save_to_PDF.print_to_file": "Print to file instead of printer.",
  "print.save_print_settings": "Save print settings between sessions.",
  
  // Spell checking
  "spellchecker.dictionary": "Default spell check dictionary language code (e.g., 'en-US').",
  
  // Cookies
  "network.cookie.lifetimePolicy": "Cookie lifetime. 0=normal, 2=session only, 3=days (see next pref).",
  "network.cookie.lifetime.days": "Number of days cookies are valid when lifetimePolicy=3.",
  
  // Cache
  "browser.cache.offline.enable": "Enable offline application cache for web apps.",
  "browser.cache.offline.capacity": "Offline cache capacity in KB.",
  
  // History
  "places.history.enabled": "Enable browsing history. false=don't remember visited pages.",
  "places.history.expiration.max_pages": "Maximum number of pages to keep in history.",
  
  // Bookmarks
  "browser.bookmarks.autoExportHTML": "Automatically export bookmarks to HTML file.",
  "browser.bookmarks.file": "Path to bookmarks HTML export file.",
  
  // Session
  "browser.sessionstore.max_tabs_undo": "Number of closed tabs to remember for 'Undo Close Tab'.",
  "browser.sessionstore.max_windows_undo": "Number of closed windows to remember for 'Undo Close Window'.",
  "browser.sessionstore.resume_from_crash": "Offer to restore session after Firefox crashes.",
  
  // Zoom
  "browser.zoom.full": "Zoom entire page (true) or text only (false).",
  "zoom.minPercent": "Minimum zoom level as percentage (e.g., 30 for 30%).",
  "zoom.maxPercent": "Maximum zoom level as percentage (e.g., 500 for 500%).",

  // ============ FIX BROKEN DESCRIPTIONS ============
  
  // UNC paths
  "security.fileuri.strict_origin_policy": "Enforce strict origin policy for file:// URIs. Prevents local files from accessing other local files. Improves security but may break some local development workflows.",
  
  // SOCKS proxy DNS
  "network.proxy.socks_remote_dns": "Route DNS lookups through the SOCKS proxy server. Essential for Tor usage - prevents your local DNS server from knowing your Tor destinations. Keeps DNS queries private.",
  
  // Sanitize on shutdown
  "privacy.sanitize.sanitizeOnShutdown": "Automatically clear browsing data when Firefox closes. Ignores 'Allow' site exceptions - clears everything. Ensures no data persists between sessions.",
  
  // Clear data items
  "privacy.clearOnShutdown_v2.cache": "Clear cache when Firefox closes. Part of sanitize-on-shutdown. Removes temporary files and cached content.",
  "privacy.clearOnShutdown_v2.cookies": "Clear all cookies when Firefox closes. Part of sanitize-on-shutdown. Logs you out of all websites.",
  "privacy.clearOnShutdown_v2.downloads": "Clear download history when Firefox closes. Part of sanitize-on-shutdown. Removes record of downloaded files.",
  "privacy.clearOnShutdown_v2.formdata": "Clear form and search history when Firefox closes. Part of sanitize-on-shutdown. Removes autocomplete data.",
  "privacy.clearOnShutdown_v2.history": "Clear browsing and download history when Firefox closes. Part of sanitize-on-shutdown. Removes visited pages list.",
  "privacy.clearOnShutdown_v2.sessions": "Clear active login sessions when Firefox closes. Part of sanitize-on-shutdown. Logs you out of websites.",
  "privacy.clearOnShutdown_v2.siteSettings": "Clear site-specific settings when Firefox closes. Part of sanitize-on-shutdown. Removes per-site permissions and preferences.",
  "privacy.clearOnShutdown_v2.offlineApps": "Clear offline website data when Firefox closes. Part of sanitize-on-shutdown. Removes service workers and offline storage.",
  
  // Manual clear data
  "privacy.clearData.siteData": "Clear site data manually via Clear Data dialog. Part of manual sanitization. Removes cookies and storage for selected sites.",
  "privacy.clearData.cache": "Clear cache manually via Clear Data dialog. Part of manual sanitization. Removes temporary files and cached content.",
  
  // Additional common prefs
  "browser.tabs.insertAfterCurrent": "New tabs open after the current tab (true) or at the end of the tab bar (false).",
  "browser.tabs.selectOwnerOnClose": "When closing a tab, select the tab that opened it (true) or the previous tab (false).",
  "browser.tabs.warnOnClose": "Show warning when closing multiple tabs (true) or close without warning (false).",
  "browser.tabs.warnOnOpen": "Show warning when opening many tabs at once (true) or open without warning (false).",
  
  "browser.urlbar.autoFill": "Automatically complete URLs as you type in the address bar (true) or wait for you to press Tab (false).",
  "browser.urlbar.matchBuckets": "Control what types of suggestions appear in the URL bar dropdown. Format: 'history:X,bookmark:Y,search:Z'.",
  "browser.urlbar.maxRichResults": "Maximum number of suggestions to show in the URL bar dropdown. Default is 10.",
  
  "browser.urlbar.suggest.bookmark": "Show bookmark suggestions in the URL bar dropdown.",
  "browser.urlbar.suggest.history": "Show history suggestions in the URL bar dropdown.",
  "browser.urlbar.suggest.openpage": "Show open tab suggestions in the URL bar dropdown.",
  "browser.urlbar.suggest.topsites": "Show top sites suggestions in the URL bar dropdown.",
  
  "places.frecency.numVisits": "Number of visits to consider when calculating frecency (frequency + recency) score for URL bar suggestions.",
  "places.frecency.defaultVisitValue": "Default visit weight for frecency calculation. Higher values give more weight to visits.",
  
  "browser.safebrowsing.provider.google.updateURL": "URL for Google Safe Browsing database updates. Leave empty to disable Google Safe Browsing updates.",
  "browser.safebrowsing.provider.google4.updateURL": "URL for Google Safe Browsing v4 database updates. Leave empty to disable v4 updates.",
  
  "privacy.trackingprotection.enabled": "Enable tracking protection globally. Blocks known tracking scripts and resources.",
  "privacy.trackingprotection.pbmode.enabled": "Enable tracking protection in private browsing mode only.",
  
  "browser.contentblocking.reportBreakage.enabled": "Allow users to report when content blocking breaks a website. Helps Mozilla improve blocking lists.",
  "browser.contentblocking.reportBreakage.url": "URL for content blocking breakage reports.",
  
  "network.http.redirection-limit": "Maximum number of HTTP redirects to follow. Prevents infinite redirect loops. Default is 20.",
  "network.http.redirection-limit.cross-origin": "Maximum number of cross-origin HTTP redirects to follow. Stricter limit for security.",
  
  "security.cert_pinning.enforcement_level": "HTTP Public Key Pinning (HPKP) enforcement level. 0=disabled, 1=default, 2=strict for CA certs, 3=strict for all.",
  
  "browser.sessionstore.max_resumed_crashes": "Number of crashes before Firefox stops offering to restore the session. Prevents crash loops.",
  
  "browser.newtabpage.activity-stream.improvesearch.handoffToAwesomebar": "Hand off search queries from the New Tab page to the awesomebar (URL bar) instead of searching directly.",
  
  "browser.newtabpage.activity-stream.feeds.snippets": "Show Mozilla snippets and messages on the New Tab page. Disable for cleaner interface.",
  "browser.newtabpage.activity-stream.feeds.systemtick": "Enable system tick for New Tab page updates. Required for some New Tab features.",
  
  "browser.newtabpage.activity-stream.asrouter.userprefs.cfr": "Enable Contextual Feature Recommender (CFR). Shows feature and extension recommendations.",
  
  "browser.newtabpage.activity-stream.telemetry.ping.endpoint": "Endpoint URL for New Tab page telemetry. Leave empty to disable telemetry.",
  
  "browser.newtabpage.activity-stream.section.highlights.includeBookmarks": "Show recent bookmarks in the Highlights section of the New Tab page.",
  "browser.newtabpage.activity-stream.section.highlights.includeDownloads": "Show recent downloads in the Highlights section of the New Tab page.",
  "browser.newtabpage.activity-stream.section.highlights.includePocket": "Show Pocket recommendations in the Highlights section of the New Tab page.",
  "browser.newtabpage.activity-stream.section.highlights.includeVisited": "Show recently visited pages in the Highlights section of the New Tab page.",
  
  "browser.urlbar.placeholderName": "Custom placeholder text for the URL bar. Leave empty for default 'Search with [engine] or enter address'.",
  
  "browser.search.hiddenOneOffs": "Comma-separated list of search engines to hide from the one-off search buttons in the URL bar dropdown.",
  "browser.search.visibleOneOffs": "Comma-separated list of search engines to show in the one-off search buttons. Overrides hiddenOneOffs.",
  
  "browser.urlbar.oneOffSearchButtons": "Show one-off search buttons in the URL bar dropdown (true) or hide them (false).",
  
  "identity.fxaccounts.enabled": "Enable Firefox Accounts and Sync. Disable to remove Firefox account features entirely.",
  
  "browser.newtabpage.activity-stream.showTopSites": "Show Top Sites section on the New Tab page.",
  "browser.newtabpage.activity-stream.topSitesRows": "Number of rows to show in the Top Sites section. Default is 1.",
  
  "browser.newtabpage.activity-stream.feeds.topsites": "Enable Top Sites feed for the New Tab page. Required for Top Sites to update.",
  
  "browser.newtabpage.activity-stream.disableSnippets": "Disable Mozilla snippets on the New Tab page for cleaner interface.",
  
  "browser.urlbar.update2.engineAliasRefresh": "Allow search engine aliases to be refreshed from remote settings.",
  
  "browser.urlbar.quicksuggest.dataCollection.enabled": "Enable data collection for Firefox Suggest. Sends search queries to Mozilla for improving suggestions.",
  
  "browser.urlbar.suggest.quicksuggest": "Show Firefox Suggest suggestions in the URL bar dropdown.",
  "browser.urlbar.suggest.quicksuggest.sponsored": "Show sponsored Firefox Suggest suggestions in the URL bar dropdown.",
  
  "browser.urlbar.weather.featureGate": "Enable weather suggestions in the URL bar. Shows weather for your location.",
  
  "browser.urlbar.clipboard.featureGate": "Enable clipboard suggestions in the URL bar. Suggests URLs from your clipboard.",
  
  "browser.urlbar.bestMatch.featureGate": "Enable best match suggestions in the URL bar. Shows the most relevant result first.",
  
  "browser.urlbar.addons.featureGate": "Enable add-on suggestions in the URL bar. Suggests relevant extensions.",
  
  "browser.urlbar.mdn.featureGate": "Enable MDN (Mozilla Developer Network) suggestions in the URL bar for developer queries.",
  
  "browser.urlbar.pocket.featureGate": "Enable Pocket suggestions in the URL bar. Shows saved Pocket articles.",
  
  "browser.urlbar.yelp.featureGate": "Enable Yelp suggestions in the URL bar. Shows local business recommendations.",
  
  "browser.urlbar.fakeserp.featureGate": "Enable fake SERP (Search Engine Results Page) detection. Helps identify when a search page is not legitimate.",
};

/**
 * Get a clear description for a preference key
 * Falls back to the parsed description if no curated one exists
 */
export function getDescription(key: string, fallback: string): string {
  return preferenceDescriptions[key] || fallback;
}
