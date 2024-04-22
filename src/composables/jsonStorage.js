import { ref, watch } from "vue";
import * as jsonStorage from "../utils/jsonStroage.js";

export function useJsonStorage(key, defaultValue) {
  const data = ref(defaultValue);

  data.value = jsonStorage.getItem(key, defaultValue);

  watch(data, () => {
    jsonStorage.setItem(key, data.value);
  });

  return {data}; // return {'data': data};
}