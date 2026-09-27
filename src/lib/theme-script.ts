export const THEME_STORAGE_KEY = "theme";

/**
 * Inlined in <head> (see app/layout.tsx) so a saved theme is applied before
 * the first paint. Light is the default.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t==="dark";var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"}catch(e){}})()`;
