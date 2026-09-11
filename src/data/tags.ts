/**
 * Tag system for preference categorization and risk assessment
 */

export type TagType = 
  | "recommended"
  | "safe"
  | "warning"
  | "not-recommended"
  | "caution"
  | "site-breakage"
  | "inconvenience"
  | "reduce-ram"
  | "reduce-cpu"
  | "increase-network-speed"
  | "reduce-disk-wear"
  | "reduce-media-buffer"
  | "privacy"
  | "security"
  | "tracking"
  | "performance"
  | "telemetry"
  | "experimental"
  | "personal-preference";

export interface Tag {
  id: TagType;
  label: string;
  color: "green" | "yellow" | "red";
  description: string;
}

export const TAGS: Record<TagType, Tag> = {
  "recommended": {
    id: "recommended",
    label: "Recommended",
    color: "green",
    description: "Safe for most users, provides clear benefits"
  },
  "safe": {
    id: "safe",
    label: "Safe",
    color: "green",
    description: "No known issues or side effects"
  },
  "warning": {
    id: "warning",
    label: "Warning",
    color: "yellow",
    description: "May have unintended side effects"
  },
  "not-recommended": {
    id: "not-recommended",
    label: "Not Recommended",
    color: "red",
    description: "Generally not recommended for most users"
  },
  "caution": {
    id: "caution",
    label: "Caution",
    color: "yellow",
    description: "Use with caution, understand the implications"
  },
  "site-breakage": {
    id: "site-breakage",
    label: "Site Breakage",
    color: "red",
    description: "May break some websites"
  },
  "inconvenience": {
    id: "inconvenience",
    label: "Inconvenience",
    color: "yellow",
    description: "May reduce convenience or require more manual steps"
  },
  "reduce-ram": {
    id: "reduce-ram",
    label: "Reduce RAM",
    color: "green",
    description: "Reduces memory usage"
  },
  "reduce-cpu": {
    id: "reduce-cpu",
    label: "Reduce CPU",
    color: "green",
    description: "Reduces CPU usage"
  },
  "increase-network-speed": {
    id: "increase-network-speed",
    label: "Faster Network",
    color: "green",
    description: "Improves network performance"
  },
  "reduce-disk-wear": {
    id: "reduce-disk-wear",
    label: "Reduce Disk Wear",
    color: "green",
    description: "Reduces disk I/O operations"
  },
  "reduce-media-buffer": {
    id: "reduce-media-buffer",
    label: "Reduce Media Buffer",
    color: "yellow",
    description: "Reduces media buffering"
  },
  "privacy": {
    id: "privacy",
    label: "Privacy",
    color: "green",
    description: "Improves privacy"
  },
  "security": {
    id: "security",
    label: "Security",
    color: "green",
    description: "Improves security"
  },
  "tracking": {
    id: "tracking",
    label: "Anti-Tracking",
    color: "green",
    description: "Reduces tracking"
  },
  "performance": {
    id: "performance",
    label: "Performance",
    color: "green",
    description: "Improves performance"
  },
  "telemetry": {
    id: "telemetry",
    label: "Telemetry",
    color: "green",
    description: "Disables telemetry/data collection"
  },
  "experimental": {
    id: "experimental",
    label: "Experimental",
    color: "yellow",
    description: "Experimental feature, may be unstable"
  },
  "personal-preference": {
    id: "personal-preference",
    label: "Personal Preference",
    color: "green",
    description: "Subjective preference that varies by user needs and workflow"
  }
};

/**
 * Tag mappings for preferences
 * Maps preference keys to their relevant tags
 */
export const PREFERENCE_TAGS: Record<string, TagType[]> = {
  // Performance - Network
  "network.buffer.cache.size": ["performance", "increase-network-speed", "safe"],
  "network.buffer.cache.count": ["performance", "increase-network-speed", "safe"],
  "network.http.max-connections": ["performance", "increase-network-speed", "safe"],
  "network.http.max-persistent-connections-per-server": ["performance", "increase-network-speed", "safe"],
  "network.http.max-urgent-start-excessive-connections-per-host": ["performance", "increase-network-speed", "safe"],
  "network.http.request.max-start-delay": ["performance", "increase-network-speed", "safe"],
  "network.dnsCacheExpiration": ["performance", "increase-network-speed", "safe"],
  
  // Performance - Rendering
  "gfx.content.skia-font-cache-size": ["performance", "safe"],
  "content.notify.interval": ["performance", "safe"],
  "gfx.canvas.accelerated.cache-size": ["performance", "safe"],
  
  // Performance - Media
  "media.cache_readahead_limit": ["performance", "increase-network-speed", "reduce-media-buffer"],
  "media.cache_resume_threshold": ["performance", "increase-network-speed", "reduce-media-buffer"],
  "media.memory_cache_max_size": ["performance", "reduce-ram"],
  
  // Performance - Images
  "image.mem.decode_bytes_at_a_time": ["performance", "safe"],
  
  // Privacy - Tracking Protection
  "browser.contentblocking.category": ["privacy", "tracking", "recommended", "safe"],
  "privacy.globalprivacycontrol.enabled": ["privacy", "tracking", "recommended", "safe"],
  
  // Privacy - Disk Avoidance
  "browser.download.start_downloads_in_tmp_dir": ["privacy", "safe"],
  "browser.cache.disk.enable": ["privacy", "reduce-disk-wear", "warning", "inconvenience"],
  "browser.privatebrowsing.forceMediaMemoryCache": ["privacy", "reduce-disk-wear", "safe"],
  "browser.sessionstore.interval": ["privacy", "reduce-disk-wear", "safe"],
  
  // Privacy - Speculative Loading
  "network.http.speculative-parallel-limit": ["privacy", "tracking", "safe"],
  "network.dns.disablePrefetch": ["privacy", "tracking", "safe"],
  "network.dns.disablePrefetchFromHTTPS": ["privacy", "tracking", "safe"],
  "browser.urlbar.speculativeConnect.enabled": ["privacy", "tracking", "safe"],
  "browser.places.speculativeConnect.enabled": ["privacy", "tracking", "safe"],
  "network.prefetch-next": ["privacy", "tracking", "safe"],
  
  // Privacy - Search/URL Bar
  "browser.urlbar.trimHttps": ["privacy", "safe"],
  "browser.search.suggest.enabled": ["privacy", "tracking", "recommended"],
  "browser.urlbar.quicksuggest.enabled": ["privacy", "tracking", "recommended"],
  "browser.formfill.enable": ["privacy", "tracking", "recommended", "inconvenience"],
  "network.IDN_show_punycode": ["security", "recommended", "safe"],
  
  // Privacy - Passwords
  "signon.formlessCapture.enabled": ["privacy", "safe"],
  "signon.privateBrowsingCapture.enabled": ["privacy", "safe"],
  "network.auth.subresource-http-auth-allow": ["security", "safe"],
  "editor.truncate_user_pastes": ["privacy", "safe"],
  
  // Privacy - Extensions
  "extensions.enabledScopes": ["security", "caution"],
  
  // Privacy - Referers
  "network.http.referer.XOriginTrimmingPolicy": ["privacy", "tracking", "recommended"],
  
  // Privacy - PDF
  "pdfjs.enableScripting": ["security", "recommended", "safe"],
  
  // Privacy - Safe Browsing
  "browser.safebrowsing.downloads.remote.enabled": ["privacy", "tracking", "warning", "inconvenience"],
  
  // Privacy - Permissions
  "permissions.default.desktop-notification": ["privacy", "recommended", "safe"],
  "permissions.default.geo": ["privacy", "recommended", "safe"],
  "geo.provider.network.url": ["privacy", "recommended", "safe"],
  
  // Privacy - Mozilla
  "browser.search.update": ["privacy", "safe"],
  "permissions.manager.defaultsUrl": ["privacy", "safe"],
  "extensions.getAddons.cache.enabled": ["privacy", "safe"],
  
  // Security - SSL/TLS
  "security.ssl.treat_unsafe_negotiation_as_broken": ["security", "recommended", "safe"],
  "security.tls.enable_0rtt_data": ["security", "recommended", "safe"],
  "browser.xul.error_pages.expert_bad_cert": ["security", "safe"],
  
  // Security - HTTPS
  "dom.security.https_only_mode": ["security", "recommended", "safe"],
  "dom.security.https_only_mode_error_page_user_suggestions": ["security", "safe"],
  
  // Security - OCSP
  "security.OCSP.enabled": ["security", "privacy", "warning"],
  "privacy.antitracking.isolateContentScriptResources": ["privacy", "tracking", "safe"],
  "security.csp.reporting.enabled": ["privacy", "safe"],
  
  // Security - Mixed Content
  "security.mixed_content.block_active_content": ["security", "recommended", "site-breakage"],
  "security.mixed_content.block_display_content": ["security", "site-breakage", "caution"],
  "security.csp.experimentalEnabled": ["security", "experimental", "site-breakage"],
  "dom.security.sanitizer.enabled": ["security", "safe"],
  
  // Security - Popups
  "dom.block_multiple_popups": ["security", "recommended", "safe"],
  "dom.popup_allowed_events": ["security", "safe"],
  "dom.disable_open_during_load": ["security", "recommended", "safe"],
  "privacy.popups.showBrowserMessage": ["security", "safe"],
  
  // Security - Fingerprinting
  "privacy.trackingprotection.lower_network_priority": ["privacy", "tracking", "safe"],
  
  // Security - Captive Portal
  "network.captive-portal-service.enabled": ["privacy", "warning", "inconvenience"],
  "network.connectivity-service.enabled": ["privacy", "warning", "inconvenience"],
  
  // Security - Region
  "browser.region.update.enabled": ["privacy", "safe"],
  
  // Security - Cookies
  "network.cookie.cookieBehavior": ["privacy", "tracking", "caution"],
  
  // Security - Web Channels
  "webchannel.allowObject.urlWhitelist": ["security", "safe"],
  
  // Security - Default Browser
  "default-browser-agent.enabled": ["privacy", "telemetry", "safe"],
  
  // Security - Extension Reports
  "extensions.abuseReport.enabled": ["privacy", "safe"],
  
  // Security - Autoplay
  "media.autoplay.default": ["privacy", "safe", "inconvenience"],
  "media.autoplay.blocking_policy": ["privacy", "safe", "inconvenience"],
  
  // Security - Permissions
  "permissions.default.camera": ["privacy", "recommended", "safe"],
  "permissions.default.microphone": ["privacy", "recommended", "safe"],
  
  // Security - Safe Browsing
  "browser.safebrowsing.malware.enabled": ["security", "not-recommended", "warning"],
  "browser.safebrowsing.phishing.enabled": ["security", "not-recommended", "warning"],
  
  // Telemetry - Core
  "datareporting.policy.dataSubmissionEnabled": ["telemetry", "privacy", "recommended", "safe"],
  "datareporting.healthreport.uploadEnabled": ["telemetry", "privacy", "recommended", "safe"],
  "toolkit.telemetry.unified": ["telemetry", "privacy", "recommended", "safe"],
  "toolkit.telemetry.enabled": ["telemetry", "privacy", "recommended", "safe"],
  "toolkit.telemetry.server": ["telemetry", "privacy", "recommended", "safe"],
  "toolkit.telemetry.archive.enabled": ["telemetry", "privacy", "recommended", "safe"],
  "toolkit.telemetry.newProfilePing.enabled": ["telemetry", "privacy", "recommended", "safe"],
  "toolkit.telemetry.shutdownPingSender.enabled": ["telemetry", "privacy", "recommended", "safe"],
  "toolkit.telemetry.updatePing.enabled": ["telemetry", "privacy", "recommended", "safe"],
  "toolkit.telemetry.bhrPing.enabled": ["telemetry", "privacy", "recommended", "safe"],
  "toolkit.telemetry.firstShutdownPing.enabled": ["telemetry", "privacy", "recommended", "safe"],
  
  // Telemetry - Coverage
  "toolkit.telemetry.coverage.opt-out": ["telemetry", "privacy", "recommended", "safe"],
  "toolkit.coverage.opt-out": ["telemetry", "privacy", "recommended", "safe"],
  "toolkit.coverage.endpoint.base": ["telemetry", "privacy", "recommended", "safe"],
  
  // Telemetry - Activity Stream
  "browser.newtabpage.activity-stream.feeds.telemetry": ["telemetry", "privacy", "recommended", "safe"],
  "browser.newtabpage.activity-stream.telemetry": ["telemetry", "privacy", "recommended", "safe"],
  "datareporting.usage.uploadEnabled": ["telemetry", "privacy", "recommended", "safe"],
  
  // Telemetry - Experiments
  "app.shield.optoutstudies.enabled": ["telemetry", "privacy", "recommended", "safe"],
  "app.normandy.enabled": ["telemetry", "privacy", "recommended", "safe"],
  "app.normandy.api_url": ["telemetry", "privacy", "recommended", "safe"],
  "nimbus.rollouts.enabled": ["telemetry", "privacy", "recommended", "safe"],
  
  // Telemetry - Crash Reports
  "breakpad.reportURL": ["telemetry", "privacy", "recommended", "safe"],
  "browser.tabs.crashReporting.sendReport": ["telemetry", "privacy", "recommended", "safe"],
  "browser.crashReports.unsubmittedCheck.enabled": ["telemetry", "privacy", "recommended", "safe"],
  
  // UI - Mozilla
  "extensions.getAddons.showPane": ["privacy", "safe"],
  "extensions.htmlaboutaddons.recommendations.enabled": ["privacy", "safe"],
  "browser.discovery.enabled": ["privacy", "safe"],
  "browser.shell.checkDefaultBrowser": ["safe"],
  "browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons": ["privacy", "safe"],
  "browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features": ["privacy", "safe"],
  "browser.preferences.moreFromMozilla": ["safe"],
  "browser.aboutConfig.showWarning": ["safe"],
  "browser.startup.homepage_override.mstone": ["safe"],
  "browser.aboutwelcome.enabled": ["safe"],
  "browser.profiles.enabled": ["safe"],
  
  // UI - Theme
  "toolkit.legacyUserProfileCustomizations.stylesheets": ["safe"],
  "browser.compactmode.show": ["safe"],
  "browser.privateWindowSeparation.enabled": ["safe"],
  "layout.css.prefers-color-scheme.content-override": ["safe"],
  
  // UI - AI Features
  "browser.ai.control.default": ["privacy", "recommended", "safe"],
  "browser.ml.enable": ["privacy", "reduce-ram", "reduce-cpu", "recommended", "safe"],
  "browser.ml.chat.enabled": ["privacy", "reduce-ram", "safe"],
  "browser.ml.chat.menu": ["privacy", "safe"],
  "browser.tabs.groups.smart.enabled": ["privacy", "reduce-cpu", "safe"],
  "browser.ml.linkPreview.enabled": ["privacy", "reduce-cpu", "safe"],
  
  // UI - Fullscreen
  "full-screen-api.transition-duration.enter": ["performance", "safe"],
  "full-screen-api.transition-duration.leave": ["performance", "safe"],
  "full-screen-api.warning.timeout": ["safe"],
  
  // UI - URL Bar
  "browser.urlbar.trending.featureGate": ["privacy", "safe"],
  "browser.urlbar.suggest.engines": ["safe"],
  
  // UI - New Tab
  "browser.newtabpage.activity-stream.default.sites": ["safe"],
  "browser.newtabpage.activity-stream.showSponsoredTopSites": ["privacy", "safe"],
  "browser.newtabpage.activity-stream.feeds.section.topstories": ["privacy", "safe"],
  "browser.newtabpage.activity-stream.showSponsored": ["privacy", "safe"],
  "browser.newtabpage.activity-stream.showSponsoredCheckboxes": ["privacy", "safe"],
  
  // UI - Downloads
  "browser.download.manager.addToRecentDocs": ["privacy", "safe"],
  "browser.download.open_pdf_attachments_inline": ["safe"],
  
  // UI - Tab Behavior
  "browser.bookmarks.openInTabClosesMenu": ["safe"],
  "findbar.highlightAll": ["safe"],
  
  // Privacy Hardening
  "privacy.query_stripping.enabled": ["privacy", "tracking", "recommended", "safe"],
  "privacy.query_stripping.enabled.pbmode": ["privacy", "tracking", "recommended", "safe"],
  "privacy.query_stripping.strip_on_share.enabled": ["privacy", "tracking", "recommended", "safe"],
  "privacy.purge_trackers.enabled": ["privacy", "tracking", "recommended", "safe"],
  "network.cookie.sameSite.laxByDefault": ["security", "privacy", "recommended", "safe"],
  "network.cookie.sameSite.noneRequiresSecure": ["security", "privacy", "recommended", "safe"],
  "network.cookie.sameSite.schemeful": ["security", "privacy", "recommended", "safe"],
  "browser.send_pings": ["privacy", "tracking", "recommended", "safe"],
  "beacon.enabled": ["privacy", "tracking", "warning", "site-breakage"],
  "dom.event.clipboardevents.enabled": ["privacy", "warning", "site-breakage"],
  "dom.disable_window_move_resize": ["privacy", "safe"],
  "dom.disable_beforeunload": ["privacy", "safe"],
  "privacy.partition.network_state": ["privacy", "tracking", "recommended", "safe"],
  "privacy.partition.serviceWorkers": ["privacy", "tracking", "recommended", "safe"],
  "privacy.partition.always_partition_third_party_non_cookie_storage": ["privacy", "tracking", "recommended", "safe"],
  "dom.push.enabled": ["privacy", "warning", "site-breakage"],
  "accessibility.force_disabled": ["performance", "reduce-ram", "not-recommended", "site-breakage"],
  "middlemouse.contentLoadURL": ["safe"],
  "accessibility.blockautorefresh": ["safe"],
  "browser.meta_refresh_when_inactive.disabled": ["performance", "reduce-cpu", "safe"],
  "network.predictor.enabled": ["privacy", "tracking", "safe"],
  "network.predictor.enable-prefetch": ["privacy", "tracking", "safe"],
  
  // Additional Performance
  "nglayout.initialpaint.delay": ["performance", "safe"],
  "content.notify.ontimer": ["performance", "safe"],
  "gfx.webrender.all": ["performance", "safe"],
  "gfx.webrender.compositor": ["performance", "safe"],
  "gfx.canvas.accelerated": ["performance", "safe"],
  "javascript.options.baselinejit.threshold": ["performance", "caution"],
  "javascript.options.ion.threshold": ["performance", "caution"],
  "browser.cache.disk.smart_size.enabled": ["performance", "safe"],
  "browser.cache.disk.capacity": ["performance", "safe"],
  "browser.cache.disk.max_entry_size": ["performance", "safe"],
  "browser.cache.disk.preload_chunk_count": ["performance", "safe"],
  "browser.cache.jsbc_compression_level": ["performance", "reduce-disk-wear", "safe"],
  "browser.cache.memory.capacity": ["performance", "safe"],
  "browser.cache.memory.max_entry_size": ["performance", "safe"],
  "media.cache_size": ["performance", "safe"],
  "media.memory_caches_combined_limit_kb": ["performance", "safe"],
  "image.cache.size": ["performance", "safe"],
  "network.dnsCacheEntries": ["performance", "increase-network-speed", "safe"],
  "network.ssl_tokens_cache_capacity": ["performance", "increase-network-speed", "safe"],
  "network.http.pacing.requests.enabled": ["performance", "increase-network-speed", "safe"],
  "network.http.pacing.requests.min-parallelism": ["performance", "increase-network-speed", "safe"],
  "network.http.pacing.requests.burst": ["performance", "increase-network-speed", "safe"],
  "network.websocket.max-connections": ["performance", "increase-network-speed", "safe"],
  "browser.sessionhistory.max_total_viewers": ["performance", "safe"],
  "browser.tabs.unloadOnLowMemory": ["performance", "reduce-ram", "recommended", "safe"],
  "browser.tabs.min_inactive_duration_before_unload": ["performance", "reduce-ram", "safe"],
  "dom.ipc.processCount": ["performance", "caution"],
  "dom.ipc.processCount.webIsolated": ["performance", "caution"],
  "reader.parse-on-load.enabled": ["performance", "safe"],
  "browser.newtab.preload": ["performance", "safe"],
  "browser.sessionstore.restore_on_demand": ["performance", "reduce-ram", "safe"],
  "browser.sessionstore.restore_tabs_lazily": ["performance", "reduce-ram", "safe"],
  "extensions.webcompat.enable_shims": ["safe"]
};

/**
 * Get tags for a preference
 */
export function getTagsForPreference(key: string): Tag[] {
  const tagIds = PREFERENCE_TAGS[key] || [];
  return tagIds.map(id => TAGS[id]);
}

/**
 * Get color class for a tag
 */
export function getTagColorClass(color: "green" | "yellow" | "red"): string {
  switch (color) {
    case "green":
      return "bg-[#a6e3a1]/10 text-[#a6e3a1] border-[#a6e3a1]/20";
    case "yellow":
      return "bg-[#f9e2af]/10 text-[#f9e2af] border-[#f9e2af]/20";
    case "red":
      return "bg-[#f38ba8]/10 text-[#f38ba8] border-[#f38ba8]/20";
  }
}
