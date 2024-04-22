export default class Keyboard {

  constructor({
    repeat = false,
    caseSensitive = false,
    domEl = window,
    useCode = true,
    preventDefault = true
  } = {}) {
    this.repeat = repeat;
    this.caseSensitive = caseSensitive;
    this.domEl = domEl;
    this.useCode = useCode;
    this.preventDefault = preventDefault;

    this.keysCurrentlyPressed = new Set();
    this.listeners = new Map();

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this.domEl.addEventListener('keydown', this._onKeyDown);
    this.domEl.addEventListener('keyup', this._onKeyUp);
  }

  destroy() {
    this.remove();
  }

  remove() {
    this.domEl.removeEventListener('keydown', this._onKeyDown);
    this.domEl.removeEventListener('keyup', this._onKeyUp);
  }

  on(event, callback) {
    return this.addListener(event, callback);
  }

  once(event, callback) {
    const callbackOnce = data => {
      this.removeListener(event, callbackOnce);
      callback(data);
      console.log('once');
    }
    this.addListener(event, callbackOnce);
    return () => this.removeListener(event, callbackOnce);
  }

  addListener(event, callback) {
    let callbackSet = this.listeners.get(event);
    // If it is the first callback for this event, we create a set storage
    if (!callbackSet) {
      callbackSet = new Set();
      this.listeners.set(event, callbackSet);
    }
    callbackSet.add(callback);
    // Return a removeListener function for conveniance
    return () => this.removeListener(event, callback);
  }

  off(event, callback) {
    this.removeListener(event, callback);
  }

  removeListener(event, callback) {
    const callbackSet = this.listeners.get(event);
    if (!callbackSet) return false;
    callbackSet.delete(callback);
  }

  onKey(key, callback, downOrUp = 'down') {
    if (!this.caseSensitive) key = key.toUpperCase();
    return this.on(`keyboard:${key}:${downOrUp}`, callback);
  }

  onceKey(key, callback, downOrUp = 'down') {
    if (!this.caseSensitive) key = key.toUpperCase();
    return this.once(`keyboard:${key}:${downOrUp}`, callback);
  }

  onKeys(keys, callback, downOrUp = 'down', once = false) {
    if (!this.caseSensitive) keys = keys.map(key => key.toUpperCase());
    const callbackHandler = keyPressed => {
      if (!keys.includes(keyPressed)) return;
      if (!keys.every(key => this.isKeyDown(key))) return;
      callback(keyPressed);
      if (once) this.off(`keyboard:${downOrUp}`, callbackHandler);
    };
    return this.on(`keyboard:${downOrUp}`, callbackHandler);
  }

  onceKeys(keys, callback, downOrUp = 'down') {
    return this.onKeys(keys, callback, downOrUp, true);
  }

  _onKeyDown(event) {
    if (this.preventDefault) event.preventDefault();
    if (!this.repeat && event.repeat) return;
    let keyPressed = this.useCode ? event.code : event.key;
    if (!this.caseSensitive) keyPressed = keyPressed.toUpperCase();
    this.keysCurrentlyPressed.add(keyPressed);

    this.emit('keyboard:down', keyPressed);
    this.emit(`keyboard:${keyPressed}:down`, keyPressed);
  }

  _onKeyUp(event) {
    if (this.preventDefault) event.preventDefault();
    let keyReleased = (this.useCode) ? event.code : event.key;
    if (!this.caseSensitive) keyReleased = keyReleased.toUpperCase();
    this.emit('keyboard:up', keyReleased);
    this.emit(`keyboard:${keyReleased}:up`, keyReleased);
    this.keysCurrentlyPressed.delete(keyReleased);
  }

  isKeyDown(key) {
    if (!this.caseSensitive) key = key.toUpperCase();
    return this.keysCurrentlyPressed.has(key);
  }

  areKeysDown(keys) {
    if (!Array.isArray(keys)) keys = [...arguments];
    return keys.every(key => this.isKeyDown(key));
  }

  emit(event, data = {}) {
    const callbackSet = this.listeners.get(event);
    if (!callbackSet) return;
    // we need to copy the set to avoid concurrency issues
    // because callback might add or remove listeners
    const toCalls = [...callbackSet];
    for (const callback of toCalls) {
      callback(data);
    }
  }

}