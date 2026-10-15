/** Three short, friendly lines. Deliberately plain: no jargon, no hard sell. */
export function buildPitch(businessName: string): string {
  return [
    `Hi ${businessName} team! I found you on the map and noticed you don't have a website yet.`,
    `I build simple, fast sites for local businesses, so customers can see what you offer and message you in one tap.`,
    `Happy to send a free sample made for ${businessName} - would you like to see it?`,
  ].join("\n");
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}
