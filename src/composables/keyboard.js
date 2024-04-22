import Keyboard from "../utils/Keyboard";
import { onUnmounted } from "vue";

export function useKeyboard() {
  const keyboard = new Keyboard({useCode: false});

  onUnmounted(() => {
    keyboard.destroy();
  });

  return { keyboard };
}