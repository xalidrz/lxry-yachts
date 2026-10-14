import { useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useI18n } from "@/i18n";
import { isSoundOn, setSoundOn, subscribeSound } from "@/lib/sound";

/** Footer switch for the click sounds. The choice is remembered. */
export function SoundToggle() {
  const { t } = useI18n();
  const on = useSyncExternalStore(subscribeSound, isSoundOn, () => true);
  const Icon = on ? Volume2 : VolumeX;
  return (
    <button
      type="button"
      data-no-sound
      onClick={() => setSoundOn(!on)}
      aria-pressed={on}
      aria-label={`${on ? t.footer.sound.on : t.footer.sound.off}. ${t.footer.sound.toggle}`}
      className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-brand"
    >
      <Icon className="size-4" aria-hidden />
      {on ? t.footer.sound.on : t.footer.sound.off}
    </button>
  );
}
