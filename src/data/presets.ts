export interface Preset {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  preferenceOverrides: Record<string, boolean>;
}

// Balanced: Good privacy + usability. Disables telemetry, basic tracking protection, keeps conveniences.
const balancedOverrides: Record<string, boolean> = {
  // Performance - enable core speed tweaks
  "gfx.content.skia-font-cache-size": true,
  "content.notify.interval": true,
  "gfx.canvas.accelerated.cache-size": true,
  "media.cache_readahead_limit": true,
  "media.cache_resume_threshold": true,
  "image.mem.decode_bytes_at_a_time": true,
  "network.buffer.cache.size": true,
  "network.buffer.cache.count": true,
  "network.http.max-connections": true,
  "network.http.max-persistent-connections-per-server": true,
  "network.http.max-urgent-start-excessive-connections-per-host": true,
  "network.http.request.max-start-delay": true,
  "network.dnsCacheExpiration": true,
  // Security - basic protections
  "browser.contentblocking.category": true,
  "privacy.globalprivacycontrol.enabled": true,
  "security.ssl.treat_unsafe_negotiation_as_broken": true,
  "security.tls.enable_0rtt_data": true,
  "dom.security.https_only_mode": true,
  "network.http.referer.XOriginTrimmingPolicy": true,
  "network.IDN_show_punycode": true,
  "pdfjs.enableScripting": true,
  // Telemetry - disable all
  "datareporting.policy.dataSubmissionEnabled": true,
  "datareporting.healthreport.uploadEnabled": true,
  "toolkit.telemetry.unified": true,
  "toolkit.telemetry.enabled": true,
  "toolkit.telemetry.server": true,
  "toolkit.telemetry.archive.enabled": true,
  "toolkit.telemetry.newProfilePing.enabled": true,
  "toolkit.telemetry.shutdownPingSender.enabled": true,
  "toolkit.telemetry.updatePing.enabled": true,
  "toolkit.telemetry.bhrPing.enabled": true,
  "toolkit.telemetry.firstShutdownPing.enabled": true,
  "toolkit.telemetry.coverage.opt-out": true,
  "toolkit.coverage.opt-out": true,
  "toolkit.coverage.endpoint.base": true,
  "browser.newtabpage.activity-stream.feeds.telemetry": true,
  "browser.newtabpage.activity-stream.telemetry": true,
  "datareporting.usage.uploadEnabled": true,
  // Experiments
  "app.shield.optoutstudies.enabled": true,
  "app.normandy.enabled": true,
  "app.normandy.api_url": true,
  "nimbus.rollouts.enabled": true,
  // Crash reports
  "breakpad.reportURL": true,
  "browser.tabs.crashReporting.sendReport": true,
  "browser.crashReports.unsubmittedCheck.enabled": true,
  // UI cleanup
  "browser.shell.checkDefaultBrowser": true,
  "browser.aboutConfig.showWarning": true,
  "browser.startup.homepage_override.mstone": true,
  "browser.aboutwelcome.enabled": true,
  "browser.profiles.enabled": true,
  "toolkit.legacyUserProfileCustomizations.stylesheets": true,
  "browser.compactmode.show": true,
  "browser.privateWindowSeparation.enabled": true,
  // AI
  "browser.ai.control.default": true,
  "browser.ml.enable": true,
  "browser.ml.chat.enabled": true,
  "browser.ml.chat.menu": true,
  "browser.tabs.groups.smart.enabled": true,
  "browser.ml.linkPreview.enabled": true,
  // Fullscreen
  "full-screen-api.transition-duration.enter": true,
  "full-screen-api.transition-duration.leave": true,
  "full-screen-api.warning.timeout": true,
  // URL bar
  "browser.urlbar.trending.featureGate": true,
  "browser.urlbar.suggest.engines": true,
  // New tab
  "browser.newtabpage.activity-stream.default.sites": true,
  "browser.newtabpage.activity-stream.showSponsoredTopSites": true,
  "browser.newtabpage.activity-stream.feeds.section.topstories": true,
  "browser.newtabpage.activity-stream.showSponsored": true,
  "browser.newtabpage.activity-stream.showSponsoredCheckboxes": true,
  // Downloads
  "browser.download.manager.addToRecentDocs": true,
  "browser.download.open_pdf_attachments_inline": true,
  // Tab behavior
  "browser.bookmarks.openInTabClosesMenu": true,
  "findbar.highlightAll": true,
  // Mozilla
  "extensions.getAddons.showPane": true,
  "extensions.htmlaboutaddons.recommendations.enabled": true,
  "browser.discovery.enabled": true,
  "browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons": true,
  "browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features": true,
  "browser.preferences.moreFromMozilla": true,
  "permissions.default.desktop-notification": true,
  "permissions.default.geo": true,
  "geo.provider.network.url": true,
  "browser.search.update": true,
  "permissions.manager.defaultsUrl": true,
  "extensions.getAddons.cache.enabled": true,
  // Search/URL bar
  "browser.urlbar.trimHttps": true,
  "browser.urlbar.untrimOnUserInteraction.featureGate": true,
  "browser.search.separatePrivateDefault.ui.enabled": true,
  "browser.search.suggest.enabled": true,
  "browser.urlbar.quicksuggest.enabled": true,
  "browser.urlbar.groupLabels.enabled": true,
  "browser.formfill.enable": true,
  // Disk avoidance
  "browser.cache.disk.enable": true,
  "browser.privatebrowsing.forceMediaMemoryCache": true,
  "media.memory_cache_max_size": true,
  "browser.sessionstore.interval": true,
  "privacy.history.custom": true,
  // Speculative loading
  "network.http.speculative-parallel-limit": true,
  "network.dns.disablePrefetch": true,
  "network.dns.disablePrefetchFromHTTPS": true,
  "browser.urlbar.speculativeConnect.enabled": true,
  "browser.places.speculativeConnect.enabled": true,
  "network.prefetch-next": true,
  // Passwords
  "signon.formlessCapture.enabled": true,
  "signon.privateBrowsingCapture.enabled": true,
  "network.auth.subresource-http-auth-allow": true,
  "editor.truncate_user_pastes": true,
  // Extensions
  "extensions.enabledScopes": true,
  // Safe browsing
  "browser.safebrowsing.downloads.remote.enabled": true,
  // HTTPS-only
  "dom.security.https_only_mode_error_page_user_suggestions": true,
  // OCSP
  "security.OCSP.enabled": true,
  "privacy.antitracking.isolateContentScriptResources": true,
  "security.csp.reporting.enabled": true,
  // UI tweaks
  "browser.xul.error_pages.expert_bad_cert": true,
  "browser.download.start_downloads_in_tmp_dir": true,
  "browser.uitour.enabled": true,
  "layout.css.prefers-color-scheme.content-override": true,
  // Privacy hardening - basic
  "privacy.query_stripping.enabled": true,
  "privacy.purge_trackers.enabled": true,
  "browser.send_pings": true,
  "dom.event.clipboardevents.enabled": true,
};

// Privacy Focused: Strong privacy. Aggressive tracking protection, strict cookies, partitioning.
const privacyOverrides: Record<string, boolean> = {
  ...balancedOverrides,
  // Additional privacy hardening
  "privacy.query_stripping.enabled.pbmode": true,
  "privacy.query_stripping.strip_on_share.enabled": true,
  "network.cookie.sameSite.laxByDefault": true,
  "network.cookie.sameSite.noneRequiresSecure": true,
  "network.cookie.sameSite.schemeful": true,
  "beacon.enabled": true,
  "dom.disable_window_move_resize": true,
  "dom.disable_beforeunload": true,
  // Disable more telemetry
  "dom.private-attribution.submission.enabled": true,
  "browser.search.serpEventTelemetryCategorization.enabled": true,
  // Stricter referer
  "network.http.referer.XOriginPolicy": true,
  // Partitioning
  "privacy.partition.network_state": true,
  "privacy.partition.serviceWorkers": true,
  "privacy.partition.always_partition_third_party_non_cookie_storage": true,
  // Disable push
  "dom.push.enabled": true,
  // Accessibility
  "accessibility.force_disabled": true,
  // Middle click
  "middlemouse.contentLoadURL": true,
  // Auto-refresh
  "accessibility.blockautorefresh": true,
  "browser.meta_refresh_when_inactive.disabled": true,
  // Network predictor
  "network.predictor.enabled": true,
  "network.predictor.enable-prefetch": true,
};

// Performance: Maximum speed. Aggressive caching, networking, rendering, JIT tuning.
const performanceOverrides: Record<string, boolean> = {
  ...balancedOverrides,
  // Extra performance tweaks
  "nglayout.initialpaint.delay": true,
  "content.notify.ontimer": true,
  "gfx.webrender.all": true,
  "gfx.webrender.compositor": true,
  "gfx.canvas.accelerated": true,
  "javascript.options.baselinejit.threshold": true,
  "javascript.options.ion.threshold": true,
  "browser.cache.disk.smart_size.enabled": true,
  "browser.cache.disk.capacity": true,
  "browser.cache.disk.max_entry_size": true,
  "browser.cache.disk.preload_chunk_count": true,
  "browser.cache.jsbc_compression_level": true,
  "browser.cache.memory.capacity": true,
  "browser.cache.memory.max_entry_size": true,
  "media.cache_size": true,
  "media.memory_caches_combined_limit_kb": true,
  "image.cache.size": true,
  "network.dnsCacheEntries": true,
  "network.ssl_tokens_cache_capacity": true,
  "network.http.pacing.requests.enabled": true,
  "network.http.pacing.requests.min-parallelism": true,
  "network.http.pacing.requests.burst": true,
  "network.websocket.max-connections": true,
  "browser.sessionhistory.max_total_viewers": true,
  "browser.tabs.unloadOnLowMemory": true,
  "browser.tabs.min_inactive_duration_before_unload": true,
  "dom.ipc.processCount": true,
  "dom.ipc.processCount.webIsolated": true,
  // Disable features that slow things down
  "reader.parse-on-load.enabled": true,
  "browser.newtab.preload": true,
  "browser.sessionstore.restore_on_demand": true,
  "browser.sessionstore.restore_tabs_lazily": true,
  "extensions.webcompat.enable_shims": true,
};

// Hardened: Maximum security. Accept breakage. Everything locked down.
const hardenedOverrides: Record<string, boolean> = {
  ...privacyOverrides,
  // Mixed content
  "security.mixed_content.block_active_content": true,
  "security.mixed_content.block_display_content": true,
  "security.csp.experimentalEnabled": true,
  "dom.security.sanitizer.enabled": true,
  "dom.block_multiple_popups": true,
  "dom.popup_allowed_events": true,
  "dom.disable_open_during_load": true,
  "privacy.popups.showBrowserMessage": true,
  // Fingerprinting resistance
  "privacy.trackingprotection.lower_network_priority": true,
  // Disable captive portal
  "network.captive-portal-service.enabled": true,
  "network.connectivity-service.enabled": true,
  // Disable region
  "browser.region.update.enabled": true,
  // Strict cookie behavior
  "network.cookie.cookieBehavior": true,
  // Disable web channels
  "webchannel.allowObject.urlWhitelist": true,
  // Disable default browser agent
  "default-browser-agent.enabled": true,
  // Disable extension abuse reports
  "extensions.abuseReport.enabled": true,
  // Disable autoplay
  "media.autoplay.default": true,
  "media.autoplay.blocking_policy": true,
  // Disable camera/mic
  "permissions.default.camera": true,
  "permissions.default.microphone": true,
  // Disable safe browsing local
  "browser.safebrowsing.malware.enabled": true,
  "browser.safebrowsing.phishing.enabled": true,
};

export const presets: Preset[] = [
  {
    id: "balanced",
    name: "Balanced",
    description: "Best for daily use. Good privacy without breaking sites. Disables all telemetry, enables basic tracking protection, removes UI clutter.",
    icon: "⚖️",
    color: "blue",
    preferenceOverrides: balancedOverrides,
  },
  {
    id: "privacy",
    name: "Privacy Focused",
    description: "Strong privacy for privacy-conscious users. Aggressive tracking protection, strict cookies, disables safe browsing remote checks, query stripping, network partitioning.",
    icon: "🛡️",
    color: "mauve",
    preferenceOverrides: privacyOverrides,
  },
  {
    id: "performance",
    name: "Performance",
    description: "Maximum browsing speed. Aggressive caching, networking optimizations, rendering tweaks, JIT tuning, tab unloading, process isolation controls.",
    icon: "⚡",
    color: "peach",
    preferenceOverrides: performanceOverrides,
  },
  {
    id: "hardened",
    name: "Hardened",
    description: "Maximum security & privacy. Accepts site breakage. Disables autoplay, strict CSP, blocks mixed content, disables all remote checks, fingerprinting resistance.",
    icon: "🔒",
    color: "red",
    preferenceOverrides: hardenedOverrides,
  },
];
