export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key, defaultValue = null) {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.warn("Value in localStorage is not valid JSON, falling back to default value");
    data = defaultValue;
  }
  return data;
}