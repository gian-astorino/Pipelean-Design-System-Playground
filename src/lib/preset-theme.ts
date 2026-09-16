/** Class applied to <html> to swap the brand ramp for the preset under
 *  evaluation. Defined in globals.css under "2b) PRESET UNDER EVALUATION". */
export const PRESET_CLASS = "theme-preset";

export const PRESET_STORAGE_KEY = "pipelean-preset";

/** Runs before first paint, inlined in layout.tsx: without it the page
 *  renders one frame with the brand ramp before React can re-apply the
 *  stored choice, which reads as a colour flash on every navigation. */
export const PRESET_INIT_SCRIPT = `try{if(localStorage.getItem(${JSON.stringify(
  PRESET_STORAGE_KEY
)})==="1")document.documentElement.classList.add(${JSON.stringify(PRESET_CLASS)})}catch(e){}`;
