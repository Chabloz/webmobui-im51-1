import { ref, watch } from "vue";
import * as jsonStorage from "../utils/jsonStroage.js";

export function useJsonStorage(key, defaultValue) {
  const data = ref(defaultValue);

  if (localStorage.getItem(key) != null) {
    data.value = jsonStorage.getItem(key, defaultValue);
  } else {
    jsonStorage.setItem(key, data.value);
  }

  watch(data, () => {
    jsonStorage.setItem(key, data.value);
  });

  // return {'data': data};
  return {data};
}