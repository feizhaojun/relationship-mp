"use strict";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const LINEFEED = "\n";
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  if (isFunction(app._component.onError)) {
    return createErrorHandler2(app);
  }
});
const E = function() {
};
E.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg$1(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg$1(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue$1(hooks, data, params) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$1(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue$1(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res) {
  return invokeCallback(id, extend(res || {}, { errMsg: name + ":ok" }));
}
function invokeFail(id, name, errMsg, errRes) {
  return invokeCallback(id, extend({ errMsg: name + ":fail" + (errMsg ? " " + errMsg : "") }, errRes));
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function normalizeErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i = 0; i < onPushMessageCallbacks.length; i++) {
      const callback = onPushMessageCallbacks[i];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__EBD21D9",
    appName: "乐哥亲戚计算器",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.99",
    uniRuntimeVersion: "3.99",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__EBD21D9",
      appName: "乐哥亲戚计算器",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn(target, key)) {
        return target[key];
      }
      if (hasOwn(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  const newWx = {};
  for (const key in wx) {
    if (isWxKey(key)) {
      newWx[key] = wx[key];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
function warn$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$1(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$2(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var _a;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  [
    "sp"
    /* LifecycleHooks.SERVER_PREFETCH */
  ]: "serverPrefetch hook",
  [
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  ]: "beforeCreate hook",
  [
    "c"
    /* LifecycleHooks.CREATED */
  ]: "created hook",
  [
    "bm"
    /* LifecycleHooks.BEFORE_MOUNT */
  ]: "beforeMount hook",
  [
    "m"
    /* LifecycleHooks.MOUNTED */
  ]: "mounted hook",
  [
    "bu"
    /* LifecycleHooks.BEFORE_UPDATE */
  ]: "beforeUpdate hook",
  [
    "u"
    /* LifecycleHooks.UPDATED */
  ]: "updated",
  [
    "bum"
    /* LifecycleHooks.BEFORE_UNMOUNT */
  ]: "beforeUnmount hook",
  [
    "um"
    /* LifecycleHooks.UNMOUNTED */
  ]: "unmounted hook",
  [
    "a"
    /* LifecycleHooks.ACTIVATED */
  ]: "activated hook",
  [
    "da"
    /* LifecycleHooks.DEACTIVATED */
  ]: "deactivated hook",
  [
    "ec"
    /* LifecycleHooks.ERROR_CAPTURED */
  ]: "errorCaptured hook",
  [
    "rtc"
    /* LifecycleHooks.RENDER_TRACKED */
  ]: "renderTracked hook",
  [
    "rtg"
    /* LifecycleHooks.RENDER_TRIGGERED */
  ]: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff2 = getId(a) - getId(b);
  if (diff2 === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a2, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    // eslint-disable-next-line no-restricted-globals
    window.HTMLElement && // also exclude jsdom
    // eslint-disable-next-line no-restricted-globals
    !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1("component:emit", component.appContext.app, component, event, params);
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn(`injection "${String(key)}" not found.`);
    }
  } else {
    warn(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s2) => {
    warn(`Invalid watch source: `, s2, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(
          s2,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook$1 = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook$1(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook$1(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook$1(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook$1(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook$1(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook$1(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook$1(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook$1(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook$1(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn("Do not use built-in directive ids as custom directive id: " + name);
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component2,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component2[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i) => i.__$el || (i.__$el = {}),
    $data: (i) => i.data,
    $props: (i) => shallowReadonly(i.props),
    $attrs: (i) => shallowReadonly(i.attrs),
    $slots: (i) => shallowReadonly(i.slots),
    $refs: (i) => shallowReadonly(i.refs),
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i) => instanceWatch.bind(i)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(
      options.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject(data)) {
      warn(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(
        created,
        instance,
        "c"
        /* LifecycleHooks.CREATED */
      );
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      warn(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
const Comment = Symbol("Comment");
const Static = Symbol("Static");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
        /* should not happen */
      );
    } else {
      warn(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn(`expose() should be passed a plain object, received ${exposedType}.`);
        }
      }
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version = "3.2.47";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
        /* ErrorCodes.SCHEDULER */
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i = 0; i < len; i++) {
        copy[i] = clone(src[i], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options, instance, publicThis);
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat($scope.selectAllComponents(".r-i-f") || [])
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    const refs = doSetByRefs($templateRefs);
    if (refs.length && instance.proxy && instance.proxy.$scope) {
      instance.proxy.$scope.setData({ r1: 1 }, () => {
        doSetByRefs(refs);
      });
    }
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r, f }, refValue, setupState) {
  if (isFunction(r)) {
    r(refValue, {});
  } else {
    const _isString = isString(r);
    const _isRef = isRef(r);
    if (_isString || _isRef) {
      if (f) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r.value)) {
          r.value = [];
        }
        const existing = r.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn(setupState, r)) {
          setupState[r] = refValue;
        }
      } else if (isRef(r)) {
        r.value = refValue;
      } else {
        warnRef(r);
      }
    } else {
      warnRef(r);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } }, inheritAttrs } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
    } else {
      fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter((key) => key !== "class" && key !== "style");
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u) {
        queuePostRenderEffect(u);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    () => queueJob(instance.update),
    instance.scope
    // track it in component's effect scope
  );
  const update = instance.update = effect.run.bind(effect);
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options) {
    return mountComponent(createVNode(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set(target, key, val) {
  return target[key] = val;
}
function $callMethod(method, ...args) {
  const fn = this[method];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method} not found`);
  return null;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
    globalProperties.$callMethod = $callMethod;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn(event.detail, "checked") && !hasOwn(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
function setRef(ref2, id, opts = {}) {
  const { $templateRefs } = getCurrentInstance();
  $templateRefs.push({ i: id, r: ref2, k: opts.k, f: opts.f });
}
const o = (value, key) => vOn(value, key);
const s = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const n = (value) => normalizeClass(value);
const t = (val) => toDisplayString(val);
const p = (props) => renderProps(props);
const sr = (ref2, id, opts) => setRef(ref2, id, opts);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  const { onError } = internalInstance;
  if (onError) {
    internalInstance.appContext.config.errorHandler = (err) => {
      instance.$callHook(ON_ERROR, err);
    };
  }
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v) {
      locale.value = v;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse) {
    parse(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse && parse(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var relationship_minExports = {};
var relationship_min = {
  get exports() {
    return relationship_minExports;
  },
  set exports(v) {
    relationship_minExports = v;
  }
};
/*!
 * relationship.js v1.2.4
 * Chinese kinship library
 * https://passer-by.com/relationship/
 *
 * Copyright (c) 2016-present, HaoLe Zheng
 *
 * Released under the MIT License
 * https://github.com/mumuy/relationship
 *
 * Created on: 2023-10-27
 */
(function(module2, exports2) {
  !function(s2, f) {
    module2.exports = f();
  }(commonjsGlobal, function() {
    function s2(s3, f2) {
      (null == f2 || f2 > s3.length) && (f2 = s3.length);
      for (var x2 = 0, d2 = new Array(f2); x2 < f2; x2++)
        d2[x2] = s3[x2];
      return d2;
    }
    function f(f2, x2) {
      if (f2) {
        if ("string" == typeof f2)
          return s2(f2, x2);
        var d2 = Object.prototype.toString.call(f2).slice(8, -1);
        return "Object" === d2 && f2.constructor && (d2 = f2.constructor.name), "Map" === d2 || "Set" === d2 ? Array.from(f2) : "Arguments" === d2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(d2) ? s2(f2, x2) : void 0;
      }
    }
    function x(x2) {
      return function(f2) {
        if (Array.isArray(f2))
          return s2(f2);
      }(x2) || function(s3) {
        if ("undefined" != typeof Symbol && null != s3[Symbol.iterator] || null != s3["@@iterator"])
          return Array.from(s3);
      }(x2) || f(x2) || function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }
    var d = [{ exp: /^(\S+?)(应该|得)?(称呼|叫|喊)(\S+?)(什么|啥)？?$/, opt: function(s3) {
      return { text: s3[4], target: s3[1] };
    } }, { exp: /^(\S+?)(应该|得)?(如何|怎么)(称呼|叫|喊)(\S+?)？?$/, opt: function(s3) {
      return { text: s3[5], target: s3[1] };
    } }, { exp: /^(\S+?)是(\S+?)的(谁|什么|什么亲戚|啥亲戚|什么人)？?$/, opt: function(s3) {
      return { text: s3[1], target: s3[2], type: s3[1].indexOf("的") > -1 ? "default" : "chain" };
    } }, { exp: /^(\S+?)(应该|得)?管(\S+?)叫(什么|啥)？?$/, opt: function(s3) {
      return { text: s3[3], target: s3[1] };
    } }, { exp: /^(\S+?)(和|与)(\S+?)(之间)?是(什么|啥)关系？?$/, opt: function(s3) {
      return { text: s3[1], target: s3[3], type: "pair" };
    } }, { exp: /^(\S+?)对于(\S+?)是(什么|啥)关系？?$/, opt: function(s3) {
      return { text: s3[1], target: s3[2], type: "chain" };
    } }, { exp: /^(\S+?)(指的)?是(什么|啥)(意思|关系|亲戚关系|辈分|人)？?$/, opt: function(s3) {
      return { text: s3[1], type: "chain" };
    } }, { exp: /^(\S+?)(应该|得)?(称呼|叫|喊)(什么|啥)？?$/, opt: function(s3) {
      return { text: s3[1] };
    } }, { exp: /^(\S+?)(应该|得)?(如何|怎么)(称呼|叫|喊)？?$/, opt: function(s3) {
      return { text: s3[1] };
    } }, { exp: /^(\S+?)是(谁|什么|什么亲戚|啥亲戚|什么人|什么辈分|啥辈分)？?$/, opt: function(s3) {
      return { text: s3[1], type: s3[1].indexOf("的") > -1 ? "default" : "chain" };
    } }];
    function m(s3, f2) {
      var x2 = "undefined" != typeof Symbol && s3[Symbol.iterator] || s3["@@iterator"];
      if (!x2) {
        if (Array.isArray(s3) || (x2 = function(s4, f3) {
          if (!s4)
            return;
          if ("string" == typeof s4)
            return b(s4, f3);
          var x3 = Object.prototype.toString.call(s4).slice(8, -1);
          "Object" === x3 && s4.constructor && (x3 = s4.constructor.name);
          if ("Map" === x3 || "Set" === x3)
            return Array.from(s4);
          if ("Arguments" === x3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(x3))
            return b(s4, f3);
        }(s3)) || f2 && s3 && "number" == typeof s3.length) {
          x2 && (s3 = x2);
          var d2 = 0, m2 = function() {
          };
          return { s: m2, n: function() {
            return d2 >= s3.length ? { done: true } : { done: false, value: s3[d2++] };
          }, e: function(s4) {
            throw s4;
          }, f: m2 };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o3, r2 = true, e3 = false;
      return { s: function() {
        x2 = x2.call(s3);
      }, n: function() {
        var s4 = x2.next();
        return r2 = s4.done, s4;
      }, e: function(s4) {
        e3 = true, o3 = s4;
      }, f: function() {
        try {
          r2 || null == x2.return || x2.return();
        } finally {
          if (e3)
            throw o3;
        }
      } };
    }
    function b(s3, f2) {
      (null == f2 || f2 > s3.length) && (f2 = s3.length);
      for (var x2 = 0, d2 = new Array(f2); x2 < f2; x2++)
        d2[x2] = s3[x2];
      return d2;
    }
    var o2 = [{ exp: /^(.+)&o([^#]+)&l/g, str: "$1$2" }, { exp: /^(.+)&l([^#]+)&o/g, str: "$1$2" }, { exp: /^(.+)?,o([sb](&\d+)?)([^#]+)&l/g, str: "$1,x$2$4" }, { exp: /^(.+)?,l([sb](&\d+)?)([^#]+)&o/g, str: "$1,x$2$4" }, { exp: /(,o[sb](&\d+)?)+(,o[sb])(&\d+)?/, str: "$3$4" }, { exp: /(,l[sb](&\d+)?)+(,l[sb])(&\d+)?/, str: "$3$4" }, { exp: /^(.*,[fh1])(,[olx][sb](&\d+)?)+,[olx]b(.*)$/, str: "$1,xb$4#$1$4" }, { exp: /^(.*,[mw0])(,[olx][sb](&\d+)?)+,[olx]s(.*)$/, str: "$1,xs$4#$1$4" }, { exp: /(,[fh1])(,[olx][sb](&\d+)?)+,[olx]s/g, str: "$1,xs" }, { exp: /(,[mw0])(,[olx][sb](&\d+)?)+,[olx]b/g, str: "$1,xb" }, { exp: /^,[olx][sb](&\d+)?,[olx]b(.+)?$/, str: ",xb$2#$2" }, { exp: /^,[olx][sb](&\d+)?,[olx]s(.+)?$/, str: ",xs$2#$2" }, { exp: /^,x([sb])$/, str: ",o$1#,l$1" }, { exp: /m,h/g, str: "f" }, { exp: /f,w/g, str: "m" }, { exp: /,[xol][sb](&\d+)?(,[mf])/g, str: "$2" }, { exp: /,[mf],d(&\d+)/, str: ",xs$1" }, { exp: /,[mf],d&([ol])/, str: ",$1s" }, { exp: /,[mf],s(&\d+)/, str: ",xb$1" }, { exp: /,[mf],s&([ol])/, str: ",$1b" }, { exp: /^(.*,[fh1]|[xol]b(&\d+)?),[mf],s(.*)$/, str: "$1,xb$3#$1$3" }, { exp: /^(.*,[mw0]|[xol]s(&\d+)?),[mf],d(.*)$/, str: "$1,xs$3#$1$3" }, { exp: /(,[mw0]|[xol]s(&\d+)?),[mf],s/, str: "$1,xb" }, { exp: /(,[fh1]|[xol]b(&\d+)?),[mf],d/, str: "$1,xs" }, { exp: /^,[mf],s(.+)?$/, str: ",xb$1#,1$1" }, { exp: /^,[mf],d(.+)?$/, str: ",xs$1#,0$1" }, { exp: /,[ds](&[ol\d]+)?,[olx]b(&\d+)/g, str: ",s$2" }, { exp: /,[ds](&[ol\d]+)?,[olx]s(&\d+)/g, str: ",d$2" }, { exp: /,[ds]&o,ob/g, str: ",s&o" }, { exp: /,[ds]&o,os/g, str: ",d&o" }, { exp: /,[ds]&l,lb/g, str: ",s&l" }, { exp: /,[ds]&l,ls/g, str: ",d&l" }, { exp: /,[ds](&[ol\d]+)?,[olx]s(&\d+)?/g, str: ",d$2" }, { exp: /,[ds](&[ol\d]+)?,[olx]b(&\d+)?/g, str: ",s$2" }, { exp: /(,[mwd0]|,[olx]s)(&[ol\d]+)?,[ds](&[ol\d]+)?,m/g, str: "$1" }, { exp: /(,[mwd0]|,[olx]s)(&[ol\d]+)?,[ds](&[ol\d]+)?,f/g, str: "$1,h" }, { exp: /(,[fhs1]|,[olx]b)(&[ol\d]+)?,[ds](&[ol\d]+)?,f/g, str: "$1" }, { exp: /(,[fhs1]|,[olx]b)(&[ol\d]+)?,[ds](&[ol\d]+)?,m/g, str: "$1,w" }, { exp: /^,[ds],m(.+)?$/, str: ",w$1#$1" }, { exp: /^,[ds],f(.+)?$/, str: ",h$1#$1" }, { exp: /,[wh](,[ds])/g, str: "$1" }, { exp: /,w,h|,h,w/g, str: "" }, { exp: /(.+)?\[([^\|]+?)\|([^\[\]]*\|[^\[\]]*)\](.+)?/g, str: "$1$2$4#$1[$3]$4" }, { exp: /(.+)?\[([^\[\]\|]+?)\|([^\[\]\|]+?)?\](.+)?/g, str: "$1$2$4#$1$3$4" }], r = [{ exp: /^从表/, arr: ["从父姑表", "从父舅表", "从父姨表", "从母姑表", "从母舅表", "从母叔表"] }, { exp: /^表表/, arr: ["姑表叔表", "姑表姑表", "姑表舅表", "姑表姨表", "舅表叔表", "舅表姑表", "舅表舅表", "舅表姨表"] }, { exp: /^([夫妻内外]?)表/, arr: ["$1姑表", "$1舅表"] }, { exp: /^([姑舅])表(?=[^伯叔])/, arr: ["$1表伯", "$1表叔"] }, { exp: /^姻/, arr: ["姑姻", "姨姻", "姊妹姻", "女姻"] }, { exp: /^眷/, arr: ["叔眷", "舅眷", "兄弟眷", "男眷"] }, { exp: /^亲家/, arr: ["姊妹姻", "兄弟眷"] }, { exp: /^([堂表姨]?)([曾高天烈太远鼻]?)(祖?)([伯叔姑舅姨])/, arr: ["$1$4$2$3"] }, { exp: /^([曾高天烈太远鼻]?)祖?王姑/, arr: ["姑$1祖母"] }, { exp: /^([曾玄元来晜仍云耳])([侄甥])/, arr: ["$2$1"] }, { exp: /^外表([伯叔姑舅姨])/, arr: ["姑表$1外", "舅表$1外"] }, { exp: /([堂表姨]?)外甥/, arr: ["$1甥"] }, { exp: /^([舅叔])([曾玄外]*)孙/, arr: ["$1侄$2孙"] }, { exp: /^([姨姑])([曾玄外]*)孙/, arr: ["$1甥$2孙"] }, { exp: /([孙甥侄])$/, arr: ["$1男", "$1女"] }, { exp: /([姑舅姨叔])([孙外]*)([男女])$/, arr: ["$1表侄$2$3", "$1表甥$2$3"] }, { exp: /(.+)父母$/, arr: ["$1父", "$1母"] }, { exp: /(.+)公婆$/, arr: ["$1公", "$1婆"] }, { exp: /祖$/, arr: ["祖父"] }, { exp: /(新妇|媳)$/, arr: ["媳妇"] }, { exp: /嫂$/, arr: ["兄妇"] }, { exp: /女儿$/, arr: ["女"] }], e2 = { "晜": "兄", "哥": "兄", "姐": "姊", "侄": "姪", "婿": "壻", "嬷": "嫲", "祖父": "王父", "祖母": "王母", "孙女婿": "孙婿", "甥女婿": "甥婿", "侄女婿": "侄婿", "孙媳妇": "孙妇", "甥媳妇": "甥妇", "侄媳妇": "侄妇", "弟媳妇": "弟妇" };
    function h(s3, x2) {
      return function(s4) {
        if (Array.isArray(s4))
          return s4;
      }(s3) || function(s4, f2) {
        var x3 = null == s4 ? null : "undefined" != typeof Symbol && s4[Symbol.iterator] || s4["@@iterator"];
        if (null != x3) {
          var d2, m2, b2, o3, r2 = [], e3 = true, h2 = false;
          try {
            if (b2 = (x3 = x3.call(s4)).next, 0 === f2) {
              if (Object(x3) !== x3)
                return;
              e3 = false;
            } else
              for (; !(e3 = (d2 = b2.call(x3)).done) && (r2.push(d2.value), r2.length !== f2); e3 = true)
                ;
          } catch (s5) {
            h2 = true, m2 = s5;
          } finally {
            try {
              if (!e3 && null != x3.return && (o3 = x3.return(), Object(o3) !== o3))
                return;
            } finally {
              if (h2)
                throw m2;
            }
          }
          return r2;
        }
      }(s3, x2) || f(s3, x2) || function() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }
    var l = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    var t2 = { "f#s": ["父子"], "m#s": ["母子"], "f#d": ["父女"], "m#d": ["母女"], "h#w": ["夫妻"], "ob#lb": ["兄弟"], "ob#ls": ["兄妹"], "os#ls": ["姐妹"], "os#lb": ["姐弟"], "w,f#d,h": ["翁婿"], "w,m#d,h": ["母婿"], "h,f#s,w": ["翁媳"], "h,m#s,w": ["婆媳"], "f,[f|m]#s,[s|d]": ["祖孙"], "m,f#d,[s|d]": ["公孙"], "m,m#d,[s|d]": ["婆孙"], "f,[ob|ob,w]#[lb|h,lb],[s|d]": ["伯侄"], "f,lb#ob,[s|d]": ["叔侄"], "f,lb,w#h,ob,[s|d]": ["婶侄"], "f,[xs|xs,h]#[xb|w,xb],[s|d]": ["姑侄"], "m,[xb|xb,w]#[xs|h,xs],[s|d]": ["舅甥"], "m,[xs|xs,h]#[xs|w,xs],[s|d]": ["姨甥"], "f,xb,s&o#f,xb,s&l": ["堂兄弟"], "f,xb,s&o#f,xb,d&l": ["堂兄妹"], "f,xb,d&o#f,xb,s&l": ["堂姐弟"], "f,xb,d&o#f,xb,d&l": ["堂姐妹"], "f,xs,s&o#m,xb,s&l": ["表兄弟"], "m,xb,s&o#f,xs,s&l": ["表兄弟"], "f,xs,s&o#m,xb,d&l": ["表兄妹"], "m,xb,s&o#f,xs,d&l": ["表兄妹"], "f,xs,d&o#m,xb,d&l": ["表姐妹"], "m,xb,d&o#f,xs,d&l": ["表姐妹"], "f,xs,d&o#m,xb,s&l": ["表姐弟"], "m,xb,d&o#f,xs,s&l": ["表姐弟"], "m,xs,s&o#m,xs,s&l": ["姨兄弟"], "m,xs,s&o#m,xs,d&l": ["姨兄妹"], "m,xs,d&o#m,xs,s&l": ["姨姐弟"], "m,xs,d&o#m,xs,d&l": ["姨姐妹"], "h,ob,w#h,lb,w": ["妯娌"], "w,os,h#w,ls,h": ["连襟"], "w,os#ls,h": ["襟姐弟"], "w,ls#os,h": ["襟兄妹"], "xs,h#w,xb": ["郎舅"], "xs,h#w,xs": ["郎姨"], "lb,w#h,ob": ["伯媳"], "ob,w#h,lb": ["叔嫂"], "xb,w#h,xs": ["姑嫂"], "d,h,[f|m]#s,w,[f|m]": ["儿女亲家"] }, w = { "{G2}": { "f,f,xb": ["从祖"], "m,f,xb": ["外从祖"] }, "{G1}": { "f,xb": ["堂", "同堂", "亲堂", "从父", "叔伯", "堂房", "从"], "f,xs": ["姑表", "姑家"], "m,xb": ["舅表", "舅家"], "m,xs": ["姨", "从母", "两姨", "姨表", "从"], "f,f,xb,s": ["从堂", "再从父", "远堂", "堂叔伯", "叔伯叔伯", "再从"], "f,f,xb,d": ["堂姑表", "从父姑表"], "f,f,xs,s": ["姑表叔表"], "f,f,xs,d": ["姑表姑表"], "f,m,xb,s": ["舅表叔表"], "f,m,xb,d": ["舅表姑表"], "f,m,xs,s": ["从母叔表"], "f,m,xs,d": ["从母姑表"], "m,f,xb,s": ["堂舅表", "从父舅表"], "m,f,xb,d": ["堂姨表", "从父姨表"], "m,f,xs,s": ["姑表舅表"], "m,f,xs,d": ["姑表姨表"], "m,m,xb,s": ["舅表舅表"], "m,m,xb,d": ["舅表姨表"], "m,m,xs,s": ["从母舅表"], "m,m,xs,d": ["再从母", "姨姨", "再从"], "f,f,f,xb,s,s": ["三从父", "再从堂", "远堂", "族", "三从"], "m,m,m,xs,d,d": ["三从母", "三从"], "f,f,f,f,xb,s,s,s": ["四从父", "三从堂", "远堂", "族", "四从"], "m,m,m,m,xs,d,d,d": ["四从母", "四从"], "[f|m],[f|m],[f|m],[f,xs|m,xb],[s|d],[s|d],[s|d]": ["重表"], "[f|m],[f|m],[f,xs|m,xb],[s|d],[s|d]": ["重表"] }, "{G1M}": { "f,ob": ["伯"], "f,lb": ["叔", "仲", "季"], "m,xb": ["舅"], "f,f,xb,s": ["堂", "从父", "叔伯", "从"], "f,f,xb,s&o": ["堂伯", "从父伯", "叔伯伯", "从伯"], "f,f,xb,s&l": ["堂叔", "从父叔", "叔伯叔", "从叔"], "f,f,f,xb,s,s": ["从堂"], "f,f,f,xb,s,s&o": ["从堂伯"], "f,f,f,xb,s,s&l": ["从堂叔"], "f,f,f,f,xb,s,s,s": ["族"], "f,f,xs,s&o": ["姑表伯"], "f,f,xs,s&l": ["姑表叔"], "f,m,xb,s&o": ["舅表伯"], "f,m,xb,s&l": ["舅表叔"], "f,m,xs,s&o": ["姨伯", "从母伯", "从伯"], "f,m,xs,s&l": ["姨叔", "从母叔", "从叔"], "m,f,xb,s": ["堂舅", "从父舅", "叔伯舅"], "m,f,xs,s": ["姑表舅"], "m,m,xb,s": ["舅表舅"], "m,m,xs,s": ["姨舅", "从母舅"], "f,[f|m],[f|m],[f,xs|m,xb],[s|d],[s|d],s&o": ["重表伯"], "f,[f|m],[f|m],[f,xs|m,xb],[s|d],[s|d],s&l": ["重表叔"], "f,[f|m],[f,xs|m,xb],[s|d],s&o": ["重表伯"], "f,[f|m],[f,xs|m,xb],[s|d],s&l": ["重表叔"], "m,[f|m],[f|m],[f,xs|m,xb],[s|d],[s|d],s": ["重表舅"], "m,[f|m],[f,xs|m,xb],[s|d],s": ["重表舅"] }, "{G1W}": { "f,xs": ["姑"], "m,xs": ["姨", "姏", "茙", "荻"], "f,f,xb,d": ["堂姑", "从父姑"], "f,f,f,xb,s,d": ["从堂姑"], "f,f,xs,d": ["姑表姑"], "f,m,xb,d": ["舅表姑"], "f,m,xs,d": ["姨姑", "从母姑"], "m,f,xb,d": ["堂姨", "从父姨", "叔伯姨"], "m,f,xs,d": ["姑表姨"], "m,m,xb,d": ["舅表姨"], "m,m,xs,d": ["姨姨", "从母姨"], "f,[f|m],[f|m],[f,xs|m,xb],[s|d],[s|d],d": ["重表姑"], "f,[f|m],[f,xs|m,xb],[s|d],d": ["重表姑"], "m,[f|m],[f|m],[f,xs|m,xb],[s|d],[s|d],d": ["重表姨"], "m,[f|m],[f,xs|m,xb],[s|d],d": ["重表姨"] }, "{G0}": { xb: ["侄"], "1,xb": ["从"], "1,f,xb,s": ["再从"], "1,f,f,xb,s,s": ["三从"], "h,xb": ["叔侄", "叔伯"], "w,xb": ["舅侄"], xs: ["甥", "外甥"], "0,xs": ["从"], "0,m,xs,d": ["再从"], "0,m,m,xs,d,d": ["三从"], "h,xs": ["姑甥"], "w,xs": ["姨甥", "襟侄"] }, "{M2W}": { "f,f,xb,w": ["叔祖眷"], "m,f,xb,w": ["叔外祖眷"], "f,m,xb,w": ["舅祖眷"], "m,m,xb,w": ["舅外祖眷"] }, "{M2M}": { "f,f,xs,h": ["姑祖姻"], "m,f,xs,h": ["姑外祖姻"], "f,m,xs,h": ["姨祖姻"], "m,m,xs,h": ["姨外祖姻"] }, "{M1W}": { "f,xb,w": ["叔眷"], "f,f,xb,s,w": ["从父叔眷"], "f,f,xs,s,w": ["姑表叔眷"], "f,m,xb,s,w": ["舅表叔眷"], "f,m,xs,s,w": ["从母叔眷"], "m,xb,w": ["舅眷"], "m,f,xb,s,w": ["从父舅眷"], "m,f,xs,s,w": ["姑表舅眷"], "m,m,xb,s,w": ["舅表舅眷"], "m,m,xs,s,w": ["从母舅眷"] }, "{M1M}": { "f,xs,h": ["姑姻"], "f,f,xb,d,h": ["从父姑姻"], "f,f,xs,d,h": ["姑表姑姻"], "f,m,xb,d,h": ["舅表姑姻"], "f,m,xs,d,h": ["从母姑姻"], "m,xs,h": ["姨姻"], "m,f,xb,d,h": ["从父姨姻"], "m,f,xs,d,h": ["姑表姨姻"], "m,m,xb,d,h": ["舅表姨姻"], "m,m,xs,d,h": ["从母姨姻"] }, "{M0}": { "xb,w": ["兄弟眷"], "xs,h": ["姊妹姻"], "w,xb,w": ["舅兄弟眷", "内兄弟眷"], "w,xs,h": ["姨姊妹姻", "内姊妹姻"], "h,xb,w": ["叔兄弟眷", "外兄弟眷"], "h,xs,h": ["姑姊妹姻", "外姊妹姻"], "f,xb,s,w": ["从父兄弟眷"], "f,xb,d,h": ["从父姊妹姻"], "f,xs,s,w": ["姑表兄弟眷"], "f,xs,d,h": ["姑表姊妹姻"], "m,xb,s,w": ["舅表兄弟眷"], "m,xb,d,h": ["舅表姊妹姻"], "m,xs,s,w": ["从母兄弟眷"], "m,xs,d,h": ["从母姊妹姻"] }, "{M-1}": { "s,w": ["男眷", "息眷"], "d,h": ["女姻", "息姻"], "xb,s,w": ["侄眷"], "xb,d,h": ["侄姻"], "xs,s,w": ["甥眷"], "xs,d,h": ["甥姻"], "h,xb,s,w": ["叔侄眷"], "h,xb,d,h": ["叔侄姻"], "h,xs,s,w": ["姑甥眷"], "h,xs,d,h": ["姑甥姻"], "w,xb,s,w": ["舅侄眷"], "w,xb,d,h": ["舅侄姻"], "w,xs,s,w": ["姨甥眷"], "w,xs,d,h": ["姨甥姻"], "f,xb,s,s,w": ["堂侄眷"], "f,xb,s,d,h": ["堂侄姻"], "f,xb,d,s,w": ["堂甥眷"], "f,xb,d,d,h": ["堂甥姻"], "f,xs,s,s,w": ["姑表侄眷"], "f,xs,s,d,h": ["姑表侄姻"], "f,xs,d,s,w": ["姑表甥眷"], "f,xs,d,d,h": ["姑表甥姻"], "m,xb,s,s,w": ["舅表侄眷"], "m,xb,s,d,h": ["舅表侄姻"], "m,xb,d,s,w": ["舅表甥眷"], "m,xb,d,d,h": ["舅表甥姻"], "m,xs,s,s,w": ["姨侄眷"], "m,xs,s,d,h": ["姨侄姻"], "m,xs,d,s,w": ["姨甥眷"], "m,xs,d,d,h": ["姨甥姻"] }, "{M-2}": { "s,s,w": ["孙眷"], "s,d,h": ["孙姻"], "d,s,w": ["外孙眷"], "d,d,h": ["外孙姻"], "xb,s,s,w": ["侄孙眷"], "xb,s,d,h": ["侄孙姻"], "xb,d,s,w": ["侄外孙眷"], "xb,d,d,h": ["侄外孙姻"], "xs,s,s,w": ["甥孙眷"], "xs,s,d,h": ["甥孙姻"], "xs,d,s,w": ["甥外孙眷"], "xs,d,d,h": ["甥外孙姻"], "h,xb,s,s,w": ["叔侄孙眷", "叔伯孙眷", "叔孙眷"], "h,xb,s,d,h": ["叔侄孙姻", "叔伯孙姻", "叔孙姻"], "h,xb,d,s,w": ["叔侄外孙眷", "叔伯外孙眷", "叔外孙眷"], "h,xb,d,d,h": ["叔侄外孙姻", "叔伯外孙姻", "叔外孙姻"], "h,xs,s,s,w": ["姑甥孙眷", "姑孙眷"], "h,xs,s,d,h": ["姑甥孙姻", "姑孙姻"], "h,xs,d,s,w": ["姑甥外孙眷", "姑外孙眷"], "h,xs,d,d,h": ["姑甥外孙姻", "姑外孙姻"], "w,xb,s,s,w": ["舅侄孙眷", "舅孙眷"], "w,xb,s,d,h": ["舅侄孙姻", "舅孙姻"], "w,xb,d,s,w": ["舅侄外孙眷", "舅外孙眷"], "w,xb,d,d,h": ["舅侄外孙姻", "舅外孙姻"], "w,xs,s,s,w": ["姨甥孙眷", "姨孙眷"], "w,xs,s,d,h": ["姨甥孙姻", "姨孙姻"], "w,xs,d,s,w": ["姨甥外孙眷", "姨外孙眷"], "w,xs,d,d,h": ["姨甥外孙姻", "姨外孙姻"] } }, M = { "": ["自己", "我", "俺", "吾", "本人", "在下"], "f,f,f,f,f,f,f,f,f,f,f,f": ["先祖父", "先太爷", "十二世祖"], "f,f,f,f,f,f,f,f,f,f,f,m": ["先祖母", "先太奶"], "f,f,f,f,f,f,f,f,f,f,f": ["始祖父", "始太爷", "十一世祖"], "f,f,f,f,f,f,f,f,f,f,m": ["始祖母", "始太奶"], "f,f,f,f,f,f,f,f,f,f": ["开祖父", "开太爷", "十世祖"], "f,f,f,f,f,f,f,f,f,m": ["开祖母", "开太奶"], "f,f,f,f,f,f,f,f,f": ["鼻祖父", "鼻太爷", "九世祖"], "f,f,f,f,f,f,f,f,m": ["鼻祖母", "鼻太奶"], "f,f,f,f,f,f,f,f": ["远祖父", "远太爷", "八世祖"], "f,f,f,f,f,f,f,m": ["远祖母", "远太奶"], "f,f,f,f,f,f,f": ["太祖父", "太太爷", "七世祖"], "f,f,f,f,f,f,m": ["太祖母", "太太奶"], "f,f,f,f,f,f": ["烈祖父", "烈太爷", "六世祖"], "f,f,f,f,f,m": ["烈祖母", "烈太奶"], "f,f,f,f,f": ["天祖父", "天太爷", "五世祖"], "f,f,f,f,m": ["天祖母", "天太奶"], "f,f,f,f": ["高祖父", "外曾外曾外毑父", "曾曾祖父", "祖太公", "祖太爷", "高太爷", "祖太翁", "祖太爷爷", "四世祖"], "f,f,f,m": ["高祖母", "外曾外曾外毑母", "曾曾祖母", "祖太婆", "祖太奶", "高太奶", "祖太姆", "祖太奶奶"], "f,f,m,f": ["高外祖父", "外曾外曾毑父"], "f,f,m,m": ["高外祖母", "外曾外曾毑母"], "f,m,f,f": ["曾外曾祖父", "外高外毑父"], "f,m,f,m": ["曾外曾祖母", "外高外毑母"], "f,m,m,f": ["曾外曾外祖父", "外高毑父"], "f,m,m,m": ["曾外曾外祖母", "外高毑母"], "m,f,f,f": ["外高祖父", "曾外曾外毑父"], "m,f,f,m": ["外高祖母", "曾外曾外毑母"], "m,f,m,f": ["外高外祖父", "曾外曾祖毑父"], "m,f,m,m": ["外高外祖母", "曾外曾祖毑母"], "m,m,f,f": ["外曾外曾祖父", "高外毑父"], "m,m,f,m": ["外曾外曾祖母", "高外毑母"], "m,m,m,f": ["外曾外曾外祖父", "高毑父"], "m,m,m,m": ["外曾外曾外祖母", "高毑母"], "f,f,f": ["曾祖父", "曾祖", "外曾外毑父", "太公", "太爷", "老太爷", "太翁", "太爷爷", "曾爷爷", "公太", "佬嗲", "祖爷", "三世祖"], "f,f,m": ["曾祖母", "外曾外毑母", "太婆", "太奶", "老太奶", "太嬷", "太姆", "太奶奶", "曾奶奶", "婆太", "老娭毑"], "f,m,f": ["曾外祖父", "曾外祖", "外曾毑父", "太外公", "太外爷", "太外翁", "太外爷爷"], "f,m,m": ["曾外祖母", "外曾毑母", "太外婆", "太外奶", "太外嬷", "太外姆", "太外奶奶"], "m,f,f": ["外曾祖父", "外曾祖", "曾外毑父", "外太公", "外太爷", "外太翁", "外太爷爷"], "m,f,m": ["外曾祖母", "曾外毑母", "外太婆", "外太奶", "外太嬷", "外太姆", "外太奶奶"], "m,m,f": ["外曾外祖父", "外曾外祖", "曾毑父", "外太外公", "外太外爷", "外太外翁", "外太外爷爷", "外太姥爷"], "m,m,m": ["外曾外祖母", "曾毑母", "外太外婆", "外太外奶", "外太外嬷", "外太外姆", "外太外奶奶", "外太姥姥"], "f,f": ["爷爷", "祖父", "奶爷", "奶爹", "阿爷", "阿公", "亚爷", "亚公", "依爷", "嗲嗲", "大父", "爷", "爷儿", "爷老", "爷老子", "爷老倌", "二世祖"], "f,m": ["奶奶", "祖母", "阿奶", "奶娘", "阿姆", "阿婆", "亚嬷", "亚婆", "依奶", "阿嬷", "大母", "奶", "嫲嫲", "婻婻", "娭毑", "嗯奶", "娘姆", "媪婆", "亲婆"], "m,f": ["外公", "外祖父", "姥爷", "阿公", "外爷", "客公", "毑父", "毑公", "姥公", "舅家爷", "嘎公", "嘎爹", , "嘎嘎爹", "嘎爷爷", "尕公", "毑爹", "毑爷", "外大父", "姥爹", "魏公", "魏爷"], "m,m": ["外婆", "外祖母", "姥姥", "阿婆", "外奶", "客婆", "毑母", "毑婆", "姥婆", "舅家婆", "嘎嘎", "嘎婆", "嘎嘎婆", "嘎奶奶", "尕婆", "毑娘", "毑毑", "外大母", "姥娘", "魏婆", "魏奶", "阿嬷", "外嬷", "嫲嫲", "好婆", "嫏嫏", "嫏娘"], "f,f,ob": ["伯公", "伯祖", "伯翁", "大爷爷", "大嗲", "大爷", "大公", "大阿爷"], "f,f,ob,w": ["伯婆", "姆婆", "大奶奶", "伯娭毑"], "f,f,lb": ["叔公", "叔祖", "叔翁", "小爷爷", "晚公", "幺爷", "细嗲"], "f,f,lb,w": ["叔婆", "婶婆", "小奶奶", "叔娭毑", "晚婆", "幺奶"], "f,f,xb": ["伯叔祖父", "从祖父", "几爷爷", "几大爷", "几嗲", "几爷", "几公"], "f,f,xb,w": ["伯叔祖母", "从祖母", "几奶奶", "几大娘", "几奶", "几婆"], "f,f,xs": ["姑奶奶", "祖姑", "姑奶", "恩婆", "姑娭毑"], "f,f,xs,h": ["姑爷爷", "祖姑丈", "恩爹", "姑丈公", "丈公"], "f,m,xb": ["舅爷爷", "舅祖", "舅爹", "太舅父"], "f,m,xb,w": ["舅奶奶", "妗婆", "舅婆", "妗奶", "太舅母"], "f,m,xs": ["姨奶奶", "姨奶", "姨娭毑"], "f,m,xs,h": ["姨爷爷", "姨公公", "姨爹", "姨丈公", "丈公"], "m,f,ob": ["伯外公", "外伯祖", "伯外祖", "大外公", "大姥爷", "大外爷"], "m,f,ob,w": ["伯外婆", "外姆婆", "大外婆", "大姥姥", "大姥奶"], "m,f,lb": ["叔外公", "外叔祖", "叔外祖", "小外公", "小姥爷", "小外爷"], "m,f,lb,w": ["叔外婆", "外婶婆", "小外婆", "小姥姥", "婶姥姥", "小姥奶"], "m,f,xb": ["堂外祖父", "几外公", "几姥爷", "几外爷"], "m,f,xb,w": ["堂外祖母", "几外婆", "几姥姥", "几姥奶", "几外奶", "几姥"], "m,f,xs": ["姑外婆", "姑婆", "恩婆"], "m,f,xs,h": ["姑外公", "姑公", "恩爹", "外姑丈公", "外丈公"], "m,m,xb": ["舅外公", "舅公", "舅爹"], "m,m,xb,w": ["舅外婆", "舅婆", "妗姥姥", "妗姥娘", "妗姥", "外妗婆"], "m,m,xs": ["姨外婆", "姨婆"], "m,m,xs,h": ["姨外公", "姨公", "外姨丈公", "外丈公"], f: ["爸爸", "父亲", "老父亲", "老爸", "阿爸", "阿父", "阿爹", "老窦", "爹地", "依爹", "老爹", "老汉", "老爷子", "老子", "牙老子", "爸", "父", "爹", "老汉儿", "牙老倌", "爸比", "爹爹", "爹啲", "一世祖"], "f,ob": ["伯父", "伯伯", "伯爸", "伯爷", "依伯", "世父", "大爹", "大爸", "大爸爸", "伯儿", "大伯", "大爷", "大大", "阿伯", "几伯", "伯"], "f,ob,w": ["伯母", "伯妈", "伯娘", "依姆", "世母", "大娘", "大妈", "大妈妈", "伯妇", "大嬷", "大姆妈", "伯姐", "姆"], "f,lb": ["叔叔", "叔父", "叔爸", "叔爹", "阿叔", "叔儿", "仲父", "季父", "叔仔", "依叔", "小叔", "小爹", "小爸", "几叔", "叔"], "f,lb,w": ["婶婶", "婶母", "婶妈", "婶娘", "阿婶", "婶儿", "仲母", "季母", "叔妇", "依婶", "小婶", "小娘", "小妈", "几婶", "婶", "婶子", "家婶", "叔母", "叔妈", "叔娘", "婶爹", "嬢嬢"], "f,xb,s&o": ["堂哥", "堂老兄"], "f,xb,s&o,w": ["堂嫂", "堂兄嫂"], "f,xb,s&l": ["堂弟", "堂老弟"], "f,xb,s&l,w": ["堂弟媳", "堂弟妇", "堂弟妹"], "f,xb,s,s": ["堂侄", "再从子"], "f,xb,s,s,w": ["堂侄媳妇"], "f,xb,s,s,s": ["堂侄孙", "再从孙"], "f,xb,s,s,s,s": ["堂曾孙", "再曾孙"], "f,xb,s,s,s,s,s": ["堂玄孙", "再玄孙"], "f,xb,s,d": ["堂侄女"], "f,xb,s,d,h": ["堂侄女婿"], "f,xb,d&o": ["堂姐", "堂大姐"], "f,xb,d&o,h": ["堂姐夫"], "f,xb,d&l": ["堂妹", "堂细妹"], "f,xb,d&l,h": ["堂妹夫"], "f,xb,d,s": ["堂外甥"], "f,xb,d,s,w": ["堂外甥媳妇"], "f,xb,d,d": ["堂外甥女"], "f,xb,d,d,h": ["堂外甥女婿"], "f,os": ["大姑", "姑姊", "姑嬷"], "f,os,h": ["大姑丈", "大姑夫", "恩伯"], "f,ls": ["小姑", "姑姐", "姑妹", "姑仔", "尕娘", "幺姑姐", "老姑"], "f,ls,h": ["小姑丈", "小姑夫", "恩叔"], "f,xs": ["姑妈", "姑母", "姑姑", "恩妈", "几姑", "姑", "阿姑", "嬢嬢", "娘娘"], "f,xs,h": ["姑丈", "姑父", "姑爸", "恩爸", "姑伯", "姑爹", "姑夫", "姑婿", "姑郎", "亘"], "f,f,xb,s&o": ["堂伯"], "f,f,xb,s&o,w": ["堂伯母"], "f,f,xb,s&l": ["堂叔"], "f,f,xb,s&l,w": ["堂婶"], "f,f,xb,s": ["堂伯叔父", "堂叔伯", "从父"], "f,f,xb,s,w": ["堂伯叔母", "从母"], "f,f,xb,s,s&o": ["从堂兄"], "f,f,xb,s,s&l": ["从堂弟"], "f,f,xb,s,s,s": ["从堂侄", "三从子"], "f,f,xb,s,s,s,s": ["从堂侄孙", "三从孙"], "f,f,xb,s,s,s,s,s": ["从堂侄曾孙", "三曾孙"], "f,f,xb,s,s,s,s,s,s": ["从堂侄玄孙", "三玄孙"], "f,f,xb,d": ["堂姑"], "f,f,xb,d,h": ["堂姑丈"], "f,f,f,xb": ["伯叔曾祖父"], "f,f,f,xb,w": ["伯叔曾祖母"], "f,f,f,xb,s": ["堂伯叔祖父"], "f,f,f,xb,s,w": ["堂伯叔祖母"], "f,f,f,xb,s,s&o": ["从伯父"], "f,f,f,xb,s,s&o,w": ["从伯母"], "f,f,f,xb,s,s&l": ["从叔父"], "f,f,f,xb,s,s&l,w": ["从叔母"], "f,f,f,xb,s,s": ["从伯叔父", "再从父"], "f,f,f,xb,s,s,w": ["从伯叔母", "再从母"], "f,f,f,xb,s,s,s&o": ["族兄"], "f,f,f,xb,s,s,s&l": ["族弟"], "f,f,f,xb,s,s,s,s": ["族侄", "四从子", "族子"], "f,f,f,xb,s,s,s,s,s": ["族侄孙", "四从孙", "族孙"], "f,f,f,xb,s,s,s,s,s,s": ["族侄曾孙", "四曾孙", "族曾孙"], "f,f,f,xb,s,s,s,s,s,s,s": ["族侄玄孙", "四玄孙", "族玄孙"], "f,f,f,f,xb": ["伯叔高祖父"], "f,f,f,f,xb,w": ["伯叔高祖母"], "f,f,f,f,xb,s": ["堂伯叔曾祖父"], "f,f,f,f,xb,s,w": ["堂伯叔曾祖母"], "f,f,f,f,xb,s,s": ["从伯叔祖父"], "f,f,f,f,xb,s,s,w": ["从伯叔祖母"], "f,f,f,f,xb,s,s,s&o": ["族伯父"], "f,f,f,f,xb,s,s,s&o,w": ["族伯母"], "f,f,f,f,xb,s,s,s&l": ["族叔父"], "f,f,f,f,xb,s,s,s&l,w": ["族叔母"], "f,f,f,f,xb,s,s,s": ["族伯叔父", "三从父", "族父"], "f,f,f,f,xb,s,s,s,w": ["族伯叔母", "三从母", "族母"], m: ["妈妈", "母亲", "老母亲", "老妈", "阿妈", "阿母", "阿娘", "老母", "妈咪", "依妈", "老娘", "老乸", "老妈子", "妈子", "娘老子", "妈", "母", "娘", "阿毑", "姆嬷", "姆妈", "娘亲"], "m,ob": ["大舅", "大舅舅", "舅伯", "元舅"], "m,ob,w": ["大舅妈", "大妗", "舅嫲"], "m,lb": ["小舅", "小舅舅", "舅仔", "舅父仔", "尕阿舅", "老舅"], "m,lb,w": ["小舅妈", "小妗", "细妗"], "m,xb": ["舅舅", "舅爸", "舅父", "舅爹", "娘舅", "母舅", "阿舅", "妗公", "舅台", "几舅", "舅"], "m,xb,w": ["舅妈", "舅母", "舅娘", "娘妗", "舅妻", "舅姆", "舅姆妈", "舅媳妇", "舅妇", "舅姥", "老妗", "妗子", "妗妗", "妗妈", "妗娘", "妗母", "阿妗", "妗门", "妗婆仔", "妗儿妈", "妗", "嬢嬢"], "m,os": ["大姨", "大姨夫", "姨嬷"], "m,os,h": ["大姨丈", "姨伯"], "m,ls": ["小姨", "姨仔", "老姨"], "m,ls,h": ["小姨丈", "小姨夫", "老姨夫", "姨叔"], "m,xs": ["姨妈", "姨母", "姨姨", "姨娘", "阿姨", "几姨", "姨", "从母", "嬢嬢"], "m,xs,h": ["姨丈", "姨父", "姨爸", "姨爹", "姨夫", "姨婿", "姨郎", "尹"], "m,f,xb,s": ["堂舅"], "m,f,xb,s,w": ["堂舅妈"], "m,f,xb,d": ["堂姨"], "m,f,xb,d,h": ["堂姨丈"], "h,f,f,f": ["曾祖公父", "曾祖公", "太公翁"], "h,f,f,m": ["曾祖婆母", "曾祖婆", "太奶亲"], "h,f,m,f": ["曾外祖公父", "曾外祖公"], "h,f,m,m": ["曾外祖婆母", "曾外祖婆"], "h,m,f,f": ["外曾祖公父", "外曾祖公"], "h,m,f,m": ["外曾祖婆母", "外曾祖婆"], "h,m,m,f": ["外曾外祖公父", "外曾外祖公"], "h,m,m,m": ["外曾外祖婆母", "外曾外祖婆"], "h,f,f,f,ob": ["伯曾祖公父", "伯曾祖公", "太伯翁"], "h,f,f,f,ob,w": ["伯曾祖婆母", "伯曾祖婆", "太姆婆"], "h,f,f,f,lb": ["叔曾祖公父", "叔曾祖公", "太叔翁"], "h,f,f,f,lb,w": ["叔曾祖婆母", "叔曾祖婆", "太婶婆"], "h,f,f,f,xs": ["姑曾祖婆母", "姑曾祖婆"], "h,f,f,f,xs,h": ["姑曾祖公父", "姑曾祖婆"], "h,f,f": ["祖公父", "祖公", "祖公公", "祖翁", "奶公父"], "h,f,m": ["祖婆母", "祖婆", "祖婆婆", "奶婆母"], "h,m,f": ["外祖公父", "毑公父", "外祖公", "外祖公公", "姥公父", "姥公"], "h,m,m": ["外祖婆母", "毑婆母", "外祖婆", "外祖婆婆", "姥婆母", "姥婆"], "h,f": ["公公", "公父", "家公", "家官", "家翁", "家爷", "翁亲", "老官", "大官", "老公公", "老人公", "大人公", "公爹", "老公爹", "婆父", "婆爹", "君舅"], "h,m": ["婆婆", "婆母", "家婆", "家娘", "姑亲", "大家", "老婆婆", "老人婆", "大人婆", "婆妈", "婆母娘", "婆子妈", "君姑"], "h,f,ob": ["伯公父", "伯公", "伯翁", "伯公公", "伯祖", "婆婆伯"], "h,f,ob,w": ["伯婆母", "伯婆", "姆婆", "伯婆婆", "伯姆", "婆婆伯姆"], "h,f,lb": ["叔公父", "叔公", "叔翁", "叔公公", "叔祖", "婆婆叔"], "h,f,lb,w": ["叔婆母", "叔婆", "婶婆", "婶婆婆", "婶亲", "婆婆婶子"], "h,f,xs": ["姑婆母", "姑婆", "姑婆婆", "婆婆姑"], "h,f,xs,h": ["姑公父", "姑公", "姑公公", "婆婆姑夫"], "h,m,xb": ["舅公父", "舅公", "舅公公"], "h,m,xb,w": ["舅婆母", "舅婆", "妗婆婆", "舅婆婆"], "h,m,xs": ["姨婆母", "姨婆", "姨婆婆"], "h,m,xs,h": ["姨公父", "姨公", "姨公公"], h: ["老公", "丈夫", "先生", "夫", "男人", "新郎", "爱爷", "夫亲", "夫君", "官人", "汉子", "老头子", "郎君", "相公", "夫婿", "良人", "老公仔", "爱人", "老伴", "那口子", "配偶", "伴侣", "伉俪", "卿卿"], "h,ob": ["大伯子", "大伯儿", "大伯兄", "伯子", "伯仔", "伯兄", "阿伯", "大伯爷", "伯爷子", "婿伯"], "h,ob,w": ["大婶子", "大婶儿", "大叔兄妇", "伯兄妇", "伯嫂", "伯妇", "伯姆", "姒妇", "姒姆", "大伯嫂", "姆姆", "大姆", "大伯妇", "大伯娘", "姐妇", "阿姆"], "h,lb": ["小叔子", "小叔儿", "小叔弟", "叔子", "叔仔", "叔弟", "阿叔", "叔郎", "小郎"], "h,lb,w": ["小婶子", "小婶儿", "小叔弟妇", "叔弟妇", "叔嫂", "叔妇", "叔姆", "娣妇", "娣姆", "小叔妇", "婶婶", "小婶", "小婶婶"], "h,xb,s": ["叔侄"], "h,xb,d": ["叔侄女"], "h,os": ["大姑子", "大姑姐", "大姑儿", "大姑娘", "姑姊", "婆姐", "婆婆姐", "大娘姑"], "h,os,h": ["大姑夫", "大姑姐夫", "大亘子", "婆姐夫", "婆婆姐夫"], "h,ls": ["小姑子", "小姑妹", "小姑儿", "小姑娘", "姑妹", "婆妹", "婆婆妹"], "h,ls,h": ["小姑夫", "小姑妹夫", "小亘子", "婆妹夫", "婆婆妹夫"], "h,xs": ["姑子", "夫姑"], "h,xs,h": ["姑夫", "姑郎"], "h,xs,s": ["姑甥"], "h,xs,d": ["姑甥女"], "w,f,f,f": ["曾祖岳父", "曾祖丈人", "太爷丈人", "祖爷丈人"], "w,f,f,m": ["曾祖岳母", "曾祖丈母", "曾祖丈母娘", "祖奶丈母娘", "太奶丈母娘"], "w,f,m,f": ["曾外祖岳父", "曾外祖丈人", "祖姥爷丈人", "太姥爷丈"], "w,f,m,m": ["曾外祖岳母", "曾外祖丈母", "曾外祖丈母娘", "祖姥丈母娘", "太姥丈母娘"], "w,m,f,f": ["外曾祖岳父", "外曾祖丈人", "祖奶爷丈人", "太奶爷丈人", "祖姥爷丈人", "太姥爷丈人"], "w,m,f,m": ["外曾祖岳母", "外曾祖丈母", "太奶丈母娘", "祖姥丈母娘", "太姥丈母娘"], "w,m,m,f": ["外曾外祖岳父", "外曾外祖丈人", "祖姥爷丈人", "太姥爷丈人"], "w,m,m,m": ["外曾外祖岳母", "外曾外祖丈母", "外曾外祖丈母娘", "祖姥丈母娘", "太姥丈母娘"], "w,f,f": ["祖岳父", "太岳父", "奶岳父", "祖丈人", "爷丈人", "奶爷丈人", "奶丈爷", "奶丈人", "老丈爷"], "w,f,m": ["祖岳母", "太岳母", "奶岳母", "祖丈母", "祖丈母娘", "奶丈母娘", "奶丈姥", "奶丈母", "老丈姥"], "w,f,ob": ["伯岳父"], "w,f,ob,w": ["伯岳母"], "w,f,lb": ["叔岳父"], "w,f,lb,w": ["叔岳母"], "w,f,f,xb,s&o": ["姻伯丈"], "w,f,f,xb,s&o,w": ["姻姆"], "w,f,f,xb,s&l": ["姻叔丈"], "w,f,f,xb,s&l,w": ["姻婶"], "w,m,f": ["外祖岳父", "毑岳父", "外祖丈人爹", "外祖丈人", "外太岳父", "姥岳父", "姥丈爷", "姥丈人", "姥丈人爹", "老丈爷", "姥爷丈人"], "w,m,m": ["外祖岳母", "毑岳母", "外祖丈母娘", "外祖丈母", "外太岳母", "姥岳母", "姥丈姥", "姥丈母", "姥丈母娘", "老丈娘"], "w,f": ["岳父", "丈人", "老丈人", "外父", "泰山", "外舅", "老亲爷", "丈人爹", "老干爷", "丈人公", "丈母爷", "丈爷", "丈爷爹", "丈父", "岳老子", "老丈杆子", "岳丈", "岳翁", "妻公", "妇翁", "冰翁"], "w,m": ["岳母", "丈母", "老丈母", "外母", "泰水", "外姑", "老亲娘", "丈人娘", "老干娘", "丈人婆", "丈母娘", "丈姥", "丈姥娘", "丈姆", "岳母娘", "丈母婆", "丈姆婆", "丈姆娘"], w: ["老婆", "妻子", "媳妇", "媳妇儿", "媳妇子", "太太", "妻", "女人", "新娘", "爱姥", "妻亲", "娘子", "新娘子", "夫人", "婆娘", "老太婆", "内人", "内子", "内助", "贤内助", "爱妻", "发妻", "婆姨", "婆子", "老婆子", "老婆儿", "老婆仔", "堂客", "爱人", "老伴", "那口子", "配偶", "伴侣", "伉俪", "卿卿"], "w,ob": ["大舅子", "大舅哥", "大舅佬", "大阿舅", "丈人兄", "舅哥"], "w,ob,w": ["大舅妇", "大妗子", "大妗儿", "大舅姆", "大舅兄嫂", "大舅嫂", "大舅姐", "大舅媳妇", "丈人嫂"], "w,lb": ["小舅子", "小舅弟", "小舅佬", "小阿舅", "丈人弟", "舅弟"], "w,lb,w": ["小舅妇", "小妗子", "小妗儿", "小舅姆", "小舅弟妇", "小舅嫂", "舅弟媳", "小舅妹", "小舅媳妇"], "w,xb": ["舅子", "舅佬", "妻舅", "老婆舅", "阿舅", "亲家舅", "舅老倌"], "w,xb,w": ["舅嫂", "舅妇", "舅姆", "妻妗", "妗仔", "妗子", "妗儿"], "w,xb,s": ["舅侄"], "w,xb,d": ["舅侄女"], "w,os": ["大姨子", "大姨姐", "大姨儿", "姨姐"], "w,os,h": ["大姨夫", "大姨姐夫", "姨姐夫", "襟兄", "大尹子"], "w,ls": ["小姨子", "小姨妹", "小茙儿", "姨妹", "姨仔", "姨妹子"], "w,ls,h": ["小姨夫", "小姨妹夫", "姨妹夫", "小茙夫", "襟弟", "小尹子"], "w,xs": ["姨子", "妻姨"], "w,xs,h": ["连襟", "姨夫", "连桥", "两桥", "两乔", "姨夫爷", "老襟", "一担挑", "老挑", "挑担", "担儿挑", "连襟儿", "襟兄弟", "友婿", "妻尹", "娅"], "w,xs,s": ["姨甥"], "w,xs,d": ["姨甥女"], ob: ["哥哥", "哥", "胞兄", "亲哥", "兄亲", "老哥", "依哥", "阿哥", "兄台", "大佬", "家兄", "兄长", "元兄", "长兄", "几哥"], "ob,w": ["嫂子", "嫂", "嫂嫂", "阿嫂", "家嫂", "兄姊", "兄嫂", "兄妇", "兄妻", "几嫂"], "ob,s": ["侄子", "兄子"], "ob,d": ["侄女", "兄女"], lb: ["弟弟", "弟", "胞弟", "亲弟", "弟亲", "老弟", "依弟", "阿弟", "弟子", "细佬", "小弟", "几弟"], "lb,w": ["弟妹", "弟媳", "弟媳妇", "弟媳妇子", "弟新妇", "老弟嫂"], "lb,s": ["侄子", "弟子"], "lb,d": ["侄女", "弟女"], "xb,s": ["侄子", "侄男", "嫡侄", "侄儿", "侄儿子", "侄", "侄仔", "阿侄", "老侄"], "xb,s,w": ["侄媳妇", "侄媳", "侄嫂", "侄妇"], "xb,d": ["侄女", "侄囡", "侄女儿", "侄闺女"], "xb,d,h": ["侄女婿", "侄婿", "侄郎"], os: ["姐姐", "姐", "胞姐", "亲姐", "姊亲", "老姐", "依姐", "阿姐", "姊台", "家姐", "长姐", "姊仔", "几姐"], "os,h": ["姐夫", "姐丈", "姐婿", "姐郎", "姊兄", "姐夫哥", "胞姐夫"], ls: ["妹妹", "妹", "胞妹", "亲妹", "妹亲", "老妹", "依妹", "阿妹", "妹子", "小妹", "妹儿", "几妹"], "ls,h": ["妹夫", "妹丈", "妹婿", "妹郎", "妹弟", "妹夫子", "胞妹夫"], "xs,s": ["外甥", "甥子", "甥男", "甥儿", "甥儿子", "甥", "甥仔"], "xs,s,w": ["甥媳妇", "甥媳", "甥嫂", "甥妇", "甥儿息妇儿"], "xs,s,s": ["甥孙", "远甥", "弥甥"], "xs,s,d": ["甥孙女", "远甥女", "弥甥女"], "xs,d": ["外甥女", "甥女", "甥囡", "甥女儿", "甥闺女"], "xs,d,h": ["甥女婿", "甥婿", "甥郎", "甥儿息婿儿"], s: ["儿子", "男儿", "息男", "闺男", "囝囝", "囝男", "囝儿", "小子", "娃子", "男亲", "伢子", "长子", "次子", "幼子", "儿", "仔", "囝", "子", "阿仔", "仔仔", "后生", "公子", "少爷", "一世孙"], "s,w": ["儿媳", "儿媳妇", "息妇儿", "儿媳妇儿", "新妇", "新妇囝", "心抱", "息妇", "儿妇", "子妇", "小妇", "少奶奶", "少夫人"], "s,w,f": ["亲家公"], "s,w,f,f&o": ["姻伯"], "s,w,f,f&l": ["姻叔"], "s,w,m": ["亲家母"], "s,w,xb": ["姻侄", "世侄"], "s,w,xb,w": ["姻侄媳"], "s,w,xb,s": ["姻侄孙"], "s,w,xb,d": ["姻侄孙女"], "s,w,xs": ["姻侄女"], "s,w,xs,h": ["姻侄婿"], "s,w,xs,s": ["姻侄外孙"], "s,w,xs,d": ["姻侄外孙女"], "s,s": ["孙子", "孙男", "孙男儿", "孙儿", "长孙", "孙仔", "孙囝", "孙娃子", "孙伢子", "二世孙"], "s,s,w": ["孙媳妇", "孙媳", "孙妇", "孙息妇", "孙新妇"], "s,s,s": ["曾孙", "曾孙男", "重孙", "重孙子", "息仔", "三世孙"], "s,s,s,w": ["曾孙妇", "重孙媳妇"], "s,s,s,s": ["玄孙", "元孙", "膀孙", "四世孙"], "s,s,s,s,w": ["玄孙媳妇"], "s,s,s,s,s": ["来孙", "五世孙"], "s,s,s,s,s,w": ["来孙媳妇"], "s,s,s,s,s,s": ["晜孙", "六世孙"], "s,s,s,s,s,s,w": ["晜孙媳妇"], "s,s,s,s,s,s,s": ["仍孙", "礽孙", "七世孙"], "s,s,s,s,s,s,s,w": ["仍孙媳妇"], "s,s,s,s,s,s,s,s": ["云孙", "八世孙"], "s,s,s,s,s,s,s,s,w": ["云孙媳妇"], "s,s,s,s,s,s,s,s,s": ["耳孙", "远孙", "九世孙"], "s,s,s,s,s,s,s,s,s,w": ["耳孙媳妇"], "s,s,s,s,s,s,s,s,s,s": ["弥孙", "十世孙"], "s,s,s,s,s,s,s,s,s,s,w": ["弥孙媳妇"], "s,s,s,s,s,s,s,s,s,s,s": ["胎孙", "十一世孙"], "s,s,s,s,s,s,s,s,s,s,s,w": ["胎孙媳妇"], "s,s,s,s,s,s,s,s,s,s,s,s": ["承孙", "十二世孙"], "s,s,s,s,s,s,s,s,s,s,s,s,w": ["承孙媳妇"], "s,s,s,s,s,s,s,s,s,s,s,d": ["承孙女"], "s,s,s,s,s,s,s,s,s,s,s,d,h": ["承孙女婿"], "s,s,s,s,s,s,s,s,s,s,d": ["胎孙女"], "s,s,s,s,s,s,s,s,s,s,d,h": ["胎孙女婿"], "s,s,s,s,s,s,s,s,s,s,d,s": ["承外孙"], "s,s,s,s,s,s,s,s,s,s,d,s,w": ["承外孙媳妇"], "s,s,s,s,s,s,s,s,s,s,d,d": ["承外孙女"], "s,s,s,s,s,s,s,s,s,s,d,d,h": ["承外孙女婿"], "s,s,s,s,s,s,s,s,s,d": ["弥孙女"], "s,s,s,s,s,s,s,s,s,d,h": ["弥孙女婿"], "s,s,s,s,s,s,s,s,s,d,s": ["胎外孙"], "s,s,s,s,s,s,s,s,s,d,s,w": ["胎外孙媳妇"], "s,s,s,s,s,s,s,s,s,d,d": ["胎外孙女"], "s,s,s,s,s,s,s,s,s,d,d,h": ["胎外孙女婿"], "s,s,s,s,s,s,s,s,d": ["耳孙女"], "s,s,s,s,s,s,s,s,d,h": ["耳孙女婿"], "s,s,s,s,s,s,s,s,d,s": ["弥外孙"], "s,s,s,s,s,s,s,s,d,s,w": ["弥外孙媳妇"], "s,s,s,s,s,s,s,s,d,d": ["弥外孙女"], "s,s,s,s,s,s,s,s,d,d,h": ["弥外孙女婿"], "s,s,s,s,s,s,s,d": ["云孙女"], "s,s,s,s,s,s,s,d,h": ["云孙女婿"], "s,s,s,s,s,s,s,d,s": ["耳外孙"], "s,s,s,s,s,s,s,d,s,w": ["耳外孙媳妇"], "s,s,s,s,s,s,s,d,d": ["耳外孙女"], "s,s,s,s,s,s,s,d,d,h": ["耳外孙女婿"], "s,s,s,s,s,s,d": ["仍孙女", "礽孙女"], "s,s,s,s,s,s,d,h": ["仍孙女婿"], "s,s,s,s,s,s,d,s": ["云外孙"], "s,s,s,s,s,s,d,s,w": ["云外孙媳妇"], "s,s,s,s,s,s,d,d": ["云外孙女"], "s,s,s,s,s,s,d,d,h": ["云外孙女婿"], "s,s,s,s,s,d": ["晜孙女"], "s,s,s,s,s,d,h": ["晜孙女婿"], "s,s,s,s,s,d,s": ["仍外孙"], "s,s,s,s,s,d,s,w": ["仍外孙媳妇"], "s,s,s,s,s,d,d": ["仍外孙女"], "s,s,s,s,s,d,d,h": ["仍外孙女婿"], "s,s,s,s,d": ["来孙女"], "s,s,s,s,d,h": ["来孙女婿"], "s,s,s,s,d,s": ["晜外孙"], "s,s,s,s,d,s,w": ["晜外孙媳妇"], "s,s,s,s,d,d": ["晜外孙女"], "s,s,s,s,d,d,h": ["晜外孙女婿"], "s,s,s,d": ["玄孙女", "元孙女", "膀孙女"], "s,s,s,d,h": ["玄孙女婿"], "s,s,s,d,s": ["来外孙"], "s,s,s,d,s,w": ["来外孙媳妇"], "s,s,s,d,d": ["来外孙女"], "s,s,s,d,d,h": ["来外孙女婿"], "s,s,d": ["曾孙女", "重孙女", "息女"], "s,s,d,h": ["曾孙女婿"], "s,s,d,s": ["玄外孙"], "s,s,d,s,w": ["玄外孙媳妇"], "s,s,d,d": ["玄外孙女"], "s,s,d,d,h": ["玄外孙女婿"], "s,d": ["孙女", "孙女儿", "孙囡", "孙囡儿", "女孙", "孙女子"], "s,d,h": ["孙女婿", "孙婿", "孙郎", "孙息婿"], "s,d,s": ["曾外孙", "外息仔"], "s,d,s,w": ["曾外孙媳妇"], "s,d,s,s": ["曾外曾孙"], "s,d,s,s,w": ["曾外曾孙媳妇"], "s,d,s,d": ["曾外曾孙女"], "s,d,s,d,h": ["曾外曾孙女婿"], "s,d,d": ["曾外孙女", "外息女"], "s,d,d,h": ["曾外孙女婿"], "s,d,d,s": ["曾外曾外孙"], "s,d,d,s,w": ["曾外曾外孙媳妇"], "s,d,d,d": ["曾外曾外孙女"], "s,d,d,d,h": ["曾外曾外孙女婿"], d: ["女儿", "千金", "小姐", "掌上明珠", "息女", "闺女", "囡囡", "囡女", "囡儿", "乖囡", "囡嗯", "丫头", "姑娘", "妮子", "女亲", "长女", "次女", "幼女", "女", "阿女", "女女"], "d,h": ["女婿", "姑爷", "姑爷儿", "女婿子", "女婿儿", "儿婿", "子婿", "息婿", "小婿", "快婿", "郎婿", "郎婿子", "息婿儿", "囝婿", "囡婿", "东床", "半子", "甥馆", "女夫"], "d,h,f": ["亲家公"], "d,h,f,f&o": ["姻伯"], "d,h,f,f&l": ["姻叔"], "d,h,m": ["亲家母"], "d,h,xb": ["姻侄", "世侄"], "d,h,xb,w": ["姻侄媳"], "d,h,xb,s": ["姻侄孙"], "d,h,xb,d": ["姻侄孙女"], "d,h,xs": ["姻侄女"], "d,h,xs,h": ["姻侄婿"], "d,h,xs,s": ["姻侄外孙"], "d,h,xs,d": ["姻侄外孙女"], "d,s": ["外孙", "外孙子", "外孙儿"], "d,s,w": ["外孙媳妇", "外孙妇", "外孙新妇"], "d,s,s": ["外曾孙", "重外孙", "外息仔"], "d,s,s,w": ["外曾孙媳妇", "外曾孙妇"], "d,s,s,s": ["外玄孙", "外元孙", "外膀孙"], "d,s,s,s,w": ["外玄孙媳妇"], "d,s,s,d": ["外玄孙女", "外元孙女", "外膀孙女"], "d,s,s,d,h": ["外玄孙女婿"], "d,s,d": ["外曾孙女", "重外孙女", "外息女"], "d,s,d,h": ["外曾孙女婿", "重外孙女婿"], "d,s,d,s": ["外玄外孙"], "d,s,d,s,w": ["外玄外孙媳妇"], "d,s,d,d": ["外玄外孙女"], "d,s,d,d,h": ["外玄外孙女婿"], "d,d": ["外孙女", "外孙囡", "外孙女儿"], "d,d,h": ["外孙女婿", "外孙婿", "外孙郎"], "d,d,s": ["外曾外孙", "外息仔"], "d,d,s,w": ["外曾外孙媳妇"], "d,d,s,s": ["外曾外曾孙"], "d,d,s,s,w": ["外曾外曾孙媳妇"], "d,d,s,d": ["外曾外曾孙女"], "d,d,s,d,h": ["外曾外曾孙女婿"], "d,d,d": ["外曾外孙女", "外息女"], "d,d,d,h": ["外曾外孙女婿"], "d,d,d,s": ["外曾外曾外孙"], "d,d,d,s,w": ["外曾外曾外孙媳妇"], "d,d,d,d": ["外曾外曾外孙女"], "d,d,d,d,h": ["外曾外曾外孙女婿"], "1,xb,w,xb": ["叔眷兄弟"], "1,xb,w,xb,s": ["叔眷舅男"], "1,xb,w,xb,d": ["叔眷舅女"], "1,xb,w,xs": ["叔眷姊妹"], "1,xb,w,xs,s": ["叔眷姨男"], "1,xb,w,xs,d": ["叔眷姨女"], "1,xb,s": ["从男", "从子"], "1,xb,s,s": ["从孙"], "1,xb,s,s,s": ["从曾孙"], "1,xb,s,s,s,s": ["从玄孙"], "1,xb,s,w": ["从妇"], "1,xb,d": ["从女", "从子"], "1,xb,d,h": ["从婿"], "1,xs,h,xb": ["姑姻兄弟"], "1,xs,h,xb,s": ["姑姻叔男"], "1,xs,h,xb,d": ["姑姻叔女"], "1,xs,h,xs": ["姑姻姊妹"], "1,xs,h,xs,s": ["姑姻姑男"], "1,xs,h,xs,d": ["姑姻姑女"], "1,xs,s,s": ["离孙男", "离孙子"], "1,xs,s,d": ["离孙女"], "0,xb,w,xb": ["舅眷兄弟"], "0,xb,w,xb,s": ["舅眷舅男"], "0,xb,w,xb,d": ["舅眷舅女"], "0,xb,w,xs": ["舅眷姊妹"], "0,xb,w,xs,s": ["舅眷姨男"], "0,xb,w,xs,d": ["舅眷姨女"], "0,xs,h,xb": ["姨姻兄弟"], "0,xs,h,xb,s": ["姨姻叔男"], "0,xs,h,xb,d": ["姨姻叔女"], "0,xs,h,xs": ["姨姻姊妹"], "0,xs,h,xs,s": ["姨姻姑男"], "0,xs,h,xs,d": ["姨姻姑女"], "0,xb,s": ["娘家侄子", "娘家侄"], "0,xb,s,s": ["归孙男", "归孙子"], "0,xb,s,d": ["归孙女"], "0,xb,d": ["娘家侄女"], "0,xs,s": ["姨甥", "姨甥男", "从男", "从子"], "0,xs,s,w": ["从妇"], "0,xs,d": ["姨甥女", "从女", "从子"], "0,xs,d,h": ["从婿"], "0,xs,s,s": ["姨甥孙", "姨孙", "姨甥孙男", "姨孙男"], "0,xs,s,d": ["姨甥孙女", "姨孙女"], "0,xs,d,s": ["姨甥外孙", "姨外孙", "姨甥外孙男", "姨外孙男"], "0,xs,d,d": ["姨甥外孙女", "姨外孙女"] }, n2 = Object.assign({}, { "[f,f|f,m|m,f],[f,m],f": ["老太奶爷", "祖太奶爷"], "[f,f|f,m|m,f],[f,m],m": ["老太奶奶", "祖太奶奶"], "[f,m|m,f|m,m],[f,m],f": ["老太姥爷", "祖太姥爷"], "[f,m|m,f|m,m],[f,m],m": ["老太姥姥", "祖太姥姥"], "[f|m],[f|m],f": ["太老爷"], "[f|m],[f|m],f,ob": ["伯太老爷"], "[f|m],[f|m],f,ob,w": ["伯太老姥"], "[f|m],[f|m],f,lb": ["叔太老爷"], "[f|m],[f|m],f,lb,w": ["叔太老姥"], "[f|m],[f|m],f,xs": ["姑太老姥"], "[f|m],[f|m],f,xs,h": ["姑太老爷"], "[f|m],[f|m],m": ["太老姥"], "[f|m],[f|m],m,xb": ["舅太老爷"], "[f|m],[f|m],m,xb,w": ["舅太老姥"], "[f|m],[f|m],m,xs": ["姨太老姥"], "[f|m],[f|m],m,xs,h": ["姨太老爷"], "[f,f|f,m|m,f],f": ["太奶爷", "祖奶爷", "祖爷爷"], "[f,f|f,m|m,f],f,ob": ["伯太奶爷", "太伯奶爷"], "[f,f|f,m|m,f],f,ob,w": ["伯太奶奶", "太伯奶奶"], "[f,f|f,m|m,f],f,lb": ["叔太奶爷", "太叔奶爷"], "[f,f|f,m|m,f],f,lb,w": ["叔太奶奶", "太叔奶奶"], "[f,f|f,m|m,f],f,xs": ["姑太奶奶", "太姑奶奶"], "[f,f|f,m|m,f],f,xs,h": ["姑太奶爷", "太姑奶爷"], "[f,f|f,m|m,f],m": ["太奶奶", "祖奶奶"], "[f,f|f,m|m,f],m,xb": ["舅太奶爷", "太舅奶爷"], "[f,f|f,m|m,f],m,xb,w": ["舅太奶奶", "太舅奶奶"], "[f,f|f,m|m,f],m,xs": ["姨太奶奶", "太姨奶奶"], "[f,f|f,m|m,f],m,xs,h": ["姨太奶爷", "太姨奶爷"], "[f,m|m,f|m,m],f": ["太姥爷", "祖姥爷", "太毑爷"], "[f,m|m,f|m,m],f,ob": ["伯太姥爷", "伯叔姥爷"], "[f,m|m,f|m,m],f,ob,w": ["伯太姥姥", "太伯姥姥"], "[f,m|m,f|m,m],f,lb": ["叔太姥爷", "太叔姥爷"], "[f,m|m,f|m,m],f,lb,w": ["叔太姥姥", "太叔姥姥"], "[f,m|m,f|m,m],f,xs": ["姑太姥姥", "太姑姥姥"], "[f,m|m,f|m,m],f,xs,h": ["姑太姥爷", "太姑姥爷"], "[f,m|m,f|m,m],m": ["太姥姥", "祖姥姥", "太毑毑", "太姥"], "[f,m|m,f|m,m],m,xb": ["舅太姥爷", "太舅姥爷"], "[f,m|m,f|m,m],m,xb,w": ["舅太姥姥", "太舅姥姥"], "[f,m|m,f|m,m],m,xs": ["姨太姥姥", "太姨姥姥"], "[f,m|m,f|m,m],m,xs,h": ["姨太姥爷", "太姨姥爷"], "[f|m],[f|m],[f|m]": ["曾祖辈", "祖祖", "老太", "阿太"], "[f|m],[f|m]": ["祖辈"], "[f|m],f": ["老爷"], "[f|m],f,ob": ["伯老爷"], "[f|m],f,ob,w": ["伯老姥"], "[f|m],f,lb": ["叔老爷"], "[f|m],f,lb,w": ["叔老姥"], "[f|m],f,xs": ["姑老姥"], "[f|m],f,xs,h": ["姑老爷"], "[f|m],m": ["老姥"], "[f|m],m,xb": ["舅老爷"], "[f|m],m,xb,w": ["舅老姥"], "[f|m],m,xs": ["姨老姥"], "[f|m],m,xs,h": ["姨老爷"], "f,f,[f|m]": ["曾祖父母"], "f,f,[f,xs|m,xb],s": ["舅姑爷爷", "舅姑爷"], "f,[f|m]": ["祖父母", "爷爷奶奶"], "f,[ob|ob,w]": ["伯父母"], "f,[lb|lb,w]": ["叔父母"], "f,xb,[s|d]": ["堂兄弟姐妹", "堂姐妹兄弟", "从父兄弟姐妹"], "f,[xs|xs,h]": ["姑父母"], "f,xs,[s|d]": ["姑表兄弟姐妹"], "m,[f|m],f": ["老外公", "老外爷", "老姥爷"], "m,[f|m],m,": ["老外婆", "老外奶", "老姥姥", "老姥娘", "老嫏娘"], "m,[f|m]": ["外祖父母", "外公外婆", "姥姥姥爷"], "m,f,[f,xs|m,xb],s": ["舅姑姥爷"], "m,[xb|xb,w]": ["舅父母"], "m,xb,[s|d]": ["舅表兄弟姐妹"], "m,[xs|xs,h]": ["姨父母"], "m,xs,[s|d]": ["姨兄弟姐妹", "姨姐妹兄弟", "从母兄弟姐妹"], "[f|m]": ["父母", "爹娘", "爹妈", "爸妈", "爸爸妈妈", "父母亲", "双亲", "二亲", "两亲", "二老", "高堂"], "[f|m],[f,xs|m,xb],s": ["舅姑爸", "姑舅爸"], "[f|m],[f,xs|m,xb],s&o,w": ["舅姑姆", "姑舅姆"], "[f|m],[f,xs|m,xb],s&l,w": ["舅姑婶", "姑舅婶"], "[f|m],[f,xs|m,xb],d": ["姑舅娘娘"], "[f|m],m,xs,s": ["两姨爸"], "[f|m],m,xs,s&o,w": ["两姨姆"], "[f|m],m,xs,s&l,w": ["两姨婶"], "[f|m],m,xs,d": ["两姨娘娘"], "w,[f|m]": ["岳父母", "岳父岳母", "丈人丈母", "舅姑"], "w,f,[ob|ob,w]": ["伯岳父母"], "w,f,[lb|lb,w]": ["叔岳父母"], "w,f,[xs|xs,h]": ["姑岳父母"], "w,m,[xb|xb,w]": ["舅岳父母"], "w,m,[xs|xs,h]": ["姨岳父母"], "w,[f,xs|m,xb],d": ["姑舅姨子"], "w,[f,xs|m,xb],d,h": ["姑舅连襟", "姑舅连桥"], "h,[f|m]": ["公婆", "翁姑", "姑翁", "姑舅", "大家官", "公公婆婆", "姑章", "姑嫜"], "h,f,[ob|ob,w]": ["伯公婆"], "h,f,[lb|lb,w]": ["叔公婆"], "h,f,[xs|xs,h]": ["姑公婆"], "h,m,[xb|xb,w]": ["舅公婆"], "h,m,[xs|xs,h]": ["姨公婆"], "[ob|lb]": ["兄弟", "晜弟", "亲兄弟", "同胞兄弟"], "[ob|lb],w": ["兄弟媳妇", "兄弟妇"], "[os|ls]": ["姐妹", "亲姐妹", "同胞姐妹"], "[os|ls],h": ["姐妹夫", "姊妹婿"], "[xb|xs]": ["兄弟姐妹", "同胞", "同胞兄弟姐妹", "手足"], "[ob|os]": ["哥哥姐姐"], "[lb|ls]": ["弟弟妹妹"], "[ob|ob,w]": ["哥哥嫂嫂", "兄嫂"], "[f,xb|m,xs],[s|d]": ["从兄弟姐妹", "从姐妹兄弟"], "[f,xs|m,xb],[s|d]": ["表兄弟姐妹", "表姐妹兄弟", "老表", "阿表"], "[f,xs|m,xb],s": ["姑舅兄弟", "舅姑兄弟"], "[f,xs|m,xb],s&o": ["姑舅哥", "姑舅哥哥"], "[f,xs|m,xb],s&l": ["姑舅弟", "姑舅弟弟"], "[f,xs|m,xb],d": ["姑舅姊妹", "舅姑姊妹"], "[f,xs|m,xb],d&o": ["姑舅姐", "姑舅姐姐"], "[f,xs|m,xb],d&l": ["姑舅妹", "姑舅妹妹"], "[f,xs|m,xb],s,s": ["姑舅儿子"], "[f,xs|m,xb],s,d": ["姑舅女儿"], "[xb|xs],[s|d]": ["侄甥"], "xb,[s|d]": ["侄子女", "侄子侄女"], "xs,[s|d]": ["甥子女", "外甥子女"], "[w|s|d]": ["妻儿", "妻小"], "[w|d]": ["妻女"], "[s|d]": ["子女", "儿女", "小孩", "孩子", "孩子们", "孩儿", "小孩儿", "宝宝", "宝贝", "娃", "娃子", "儿辈", "子辈", "细伢", "伢子", "子息", "子嗣", "崽", "幺儿"], "[s|d],[s|d]": ["孙辈", "孙息", "孙枝"], "s,[s|d]": ["孙子女"], "d,[s|d]": ["外孙子女"], "s#xb,s": ["子侄"], "s#s,w": ["子媳"], "[s|d]#[s|d],[s|d]": ["儿孙", "子孙", "孙息"], "[s,w|d,h],[f|m]": ["亲家", "儿女亲家"], "[s,w|d,h],f": ["亲家公", "亲家父", "亲家翁", "亲家世翁", "姻翁"], "[s,w|d,h],f,f": ["太姻翁"], "[s,w|d,h],f,m": ["太姻姆"], "[s,w|d,h],f,f,f": ["太姻翁"], "[s,w|d,h],f,f,m": ["太姻姆"], "[s,w|d,h],f,f,ob": ["姻伯翁"], "[s,w|d,h],f,f,ob,w": ["姻伯姆"], "[s,w|d,h],f,f,lb": ["姻叔翁"], "[s,w|d,h],f,f,lb,w": ["姻叔母"], "[s,w|d,h],f,f,xb,s&o": ["姻家兄"], "[s,w|d,h],f,f,xb,s&o,w": ["姻家兄妇"], "[s,w|d,h],f,f,xb,s&l": ["姻家弟"], "[s,w|d,h],f,f,xb,s&l,w": ["姻家弟妇"], "[s,w|d,h],f,f,xb,s,s": ["姻家侄"], "[s,w|d,h],f,f,xb,s,s,w": ["姻家侄妇"], "[s,w|d,h],f,ob": ["姻兄"], "[s,w|d,h],f,ob,w": ["姻兄妇"], "[s,w|d,h],f,lb": ["姻弟"], "[s,w|d,h],f,lb,w": ["姻弟妇"], "[s,w|d,h],f,xb,s": ["姻侄"], "[s,w|d,h],f,xb,s,w": ["姻侄妇"], "[s,w|d,h],m": ["亲家母", "亲家婆", "亲家姆", "亲姆", "姻姆"], "[s,w|d,h],m,ob": ["姻仁兄"], "[s,w|d,h],m,ob,w": ["姻仁兄妇"], "[s,w|d,h],m,lb": ["姻仁弟"], "[s,w|d,h],m,lb,w": ["姻仁弟妇"], "[s,w|d,h],[f|m],f": ["姻太翁"], "[s,w|d,h],[f|m],m": ["姻太姆"] }), a = {}, c = function(s3) {
      a[s3] = {};
      var f2 = function(f3) {
        -1 == f3.indexOf("]") ? a[s3][f3] = w[s3][f3] : F(f3).forEach(function(x3) {
          a[s3][x3] = w[s3][f3];
        });
      };
      for (var x2 in w[s3])
        f2(x2);
    };
    for (var i in w)
      c(i);
    for (var u in n2 = Object.assign({}, n2, function(s3, f2) {
      var x2 = {}, d2 = function() {
        var d3 = m2.match(/\{.+?\}/)[0], b2 = f2[m2], o3 = function() {
          var f3 = s3[d3][r2], o4 = m2.replace(d3, r2);
          if (!["h,h", "w,w", "w,h", "h,w"].some(function(s4) {
            return o4.includes(s4);
          })) {
            var e3 = [];
            f3.forEach(function(s4) {
              b2.forEach(function(f4) {
                f4.includes("?") ? e3.push(f4.replace("?", s4)) : e3.push(s4 + f4);
              });
            }), x2[o4] || (x2[o4] = n2[o4] || []), x2[o4] = e3.concat(x2[o4]);
          }
        };
        for (var r2 in s3[d3])
          o3();
      };
      for (var m2 in f2)
        d2();
      return x2;
    }(a, { "{G2}": ["祖父"], "{G2},w": ["祖母"], "{G2},s": ["父"], "{G2},s,w": ["母"], "{G2},s,s": ["兄弟"], "{G2},s,s&o": ["兄"], "{G2},s,s&l": ["弟"], "{G2},s,d": ["姊妹"], "{G2},s,d&o": ["姊"], "{G2},s,d&l": ["妹"], "{G2},s,s,s": ["男", "子"], "{G2},s,s,d": ["女"], "f,f,f,f,f,f,f,f,{G1M}": ["鼻祖父"], "f,f,f,f,f,f,f,f,{G1M},w": ["鼻祖母"], "f,f,f,f,f,f,f,f,{G1W}": ["鼻祖母"], "f,f,f,f,f,f,f,f,{G1W},h": ["鼻祖父"], "f,f,f,f,f,f,f,{G1M}": ["远祖父"], "f,f,f,f,f,f,f,{G1M},w": ["远祖母"], "f,f,f,f,f,f,f,{G1W}": ["远祖母"], "f,f,f,f,f,f,f,{G1W},h": ["远祖父"], "f,f,f,f,f,f,{G1M}": ["太祖父"], "f,f,f,f,f,f,{G1M},w": ["太祖母"], "f,f,f,f,f,f,{G1W}": ["姑太祖母"], "f,f,f,f,f,f,{G1W},h": ["姑太祖父"], "f,f,f,f,f,{G1M}": ["烈祖父"], "f,f,f,f,f,{G1M},w": ["烈祖母"], "f,f,f,f,f,{G1W}": ["烈祖母"], "f,f,f,f,f,{G1W},h": ["烈祖父"], "f,f,f,f,{G1M}": ["天祖父"], "f,f,f,f,{G1M},w": ["天祖母"], "f,f,f,f,{G1W}": ["天祖母"], "f,f,f,f,{G1W},h": ["天祖父"], "f,f,f,{G1M}": ["高祖父", "外曾外曾外毑父"], "f,f,f,{G1M},w": ["高祖母", "外曾外曾外毑母"], "f,f,f,{G1W}": ["高祖母", "外曾外曾外毑母"], "f,f,f,{G1W},h": ["高祖父", "外曾外曾外毑父"], "f,f,m,{G1M}": ["高外祖父", "外曾外曾毑父"], "f,f,m,{G1M},w": ["高外祖母", "外曾外曾毑母"], "f,f,m,{G1W}": ["高外祖母", "外曾外曾毑母"], "f,f,m,{G1W},h": ["高外祖父", "外曾外曾毑父"], "f,m,f,{G1M}": ["曾外曾祖父", "外高外毑父"], "f,m,f,{G1M},w": ["曾外曾祖母", "外高外毑母"], "f,m,f,{G1W}": ["曾外曾祖母", "外高外毑母"], "f,m,f,{G1W},h": ["曾外曾祖父", "外高外毑父"], "f,m,m,{G1M}": ["曾外曾外祖父", "外高毑父"], "f,m,m,{G1M},w": ["曾外曾外祖母", "外高毑母"], "f,m,m,{G1W}": ["曾外曾外祖母", "外高毑母"], "f,m,m,{G1W},h": ["曾外曾外祖父", "外高毑父"], "m,f,f,{G1M}": ["外高祖父", "曾外曾外毑父"], "m,f,f,{G1M},w": ["外高祖母", "曾外曾外毑母"], "m,f,f,{G1W}": ["外高祖母", "曾外曾外毑母"], "m,f,f,{G1W},h": ["外高祖父", "曾外曾外毑父"], "m,f,m,{G1M}": ["外高外祖父", "曾外曾祖毑父"], "m,f,m,{G1M},w": ["外高外祖母", "曾外曾祖毑母"], "m,f,m,{G1W}": ["外高外祖母", "曾外曾祖毑母"], "m,f,m,{G1W},h": ["外高外祖父", "曾外曾祖毑父"], "m,m,f,{G1M}": ["外曾外曾祖父", "高外毑父"], "m,m,f,{G1M},w": ["外曾外曾祖母", "高外毑母"], "m,m,f,{G1W}": ["外曾外曾祖母", "高外毑母"], "m,m,f,{G1W},h": ["外曾外曾祖父", "高外毑父"], "m,m,m,{G1M}": ["外曾外曾外祖父", "高毑父"], "m,m,m,{G1M},w": ["外曾外曾外祖母", "高毑母"], "m,m,m,{G1W}": ["外曾外曾外祖母", "高毑母"], "m,m,m,{G1W},h": ["外曾外曾外祖父", "高毑父"], "f,f,{G1M}": ["?曾祖父", "曾?祖父", "?太公", "太?公", "?公太", "太?爷", "?太爷", "?太爷爷", "太?爷爷"], "f,f,{G1M},w": ["?曾祖母", "曾?祖母", "?太婆", "太?婆", "?婆太", "太?奶", "?太奶", "?太奶奶", "太?奶奶"], "f,f,{G1W}": ["?曾祖母", "曾?祖母", "?太婆", "太?婆", "?婆太", "太?奶", "?太奶", "?太奶奶", "太?奶奶"], "f,f,{G1W},h": ["?曾祖父", "曾?祖父", "?太公", "太?公", "?公太", "太?爷", "?太爷", "?太爷爷", "太?爷爷"], "f,m,{G1M}": ["?曾外祖父", "曾外?祖父", "?太外公", "太外?公", "太外?爷", "?太外爷", "?太外爷爷", "太外?爷爷"], "f,m,{G1M},w": ["?曾外祖母", "曾外?祖母", "?太外婆", "太外?婆", "太外?奶", "?太外奶", "?太外奶奶", "太外?奶奶"], "f,m,{G1W}": ["?曾外祖母", "曾外?祖母", "?太外婆", "太外?婆", "太外?奶", "?太外奶", "?太外奶奶", "太外?奶奶"], "f,m,{G1W},h": ["?曾外祖父", "曾外?祖父", "?太外公", "太外?公", "太外?爷", "?太外爷", "?太外爷爷", "太外?爷爷"], "m,f,{G1M}": ["?外曾祖父", "外曾?祖父", "?外太公", "外太?公", "外太?爷", "?外太爷", "?外太爷爷", "外太?爷爷"], "m,f,{G1M},w": ["?外曾祖母", "外曾?祖母", "?外太婆", "外太?婆", "外太?奶", "?外太奶", "?外太奶奶", "外太?奶奶"], "m,f,{G1W}": ["?外曾祖母", "外曾?祖母", "?外太婆", "外太?婆", "外太?奶", "?外太奶", "?外太奶奶", "外太?奶奶"], "m,f,{G1W},h": ["?外曾祖父", "外曾?祖父", "?外太公", "外太?公", "外太?爷", "?外太爷", "?外太爷爷", "外太?爷爷"], "m,m,{G1M}": ["?外曾外祖父", "外曾外?祖父", "?外太外公", "外太外?公", "外太外?爷", "?外太外爷", "?外太外爷爷", "外太外?爷爷"], "m,m,{G1M},w": ["?外曾外祖母", "外曾外?祖母", "?外太外婆", "外太外?婆", "外太外?奶", "?外太外奶", "?外太外奶奶", "外太外?奶奶"], "m,m,{G1W}": ["?外曾外祖母", "外曾外?祖母", "?外太外婆", "外太外?婆", "外太外?奶", "?外太外奶", "?外太外奶奶", "外太外?奶奶"], "m,m,{G1W},h": ["?外曾外祖父", "外曾外?祖父", "?外太外公", "外太外?公", "外太外?爷", "?外太外爷", "?外太外爷爷", "外太?外爷爷"], "f,{G1M}": ["祖父", "公", "太?父", "奶爷", "爷爷", "爷"], "f,{G1M},w": ["祖母", "婆", "太?母", "奶奶", "奶"], "f,{G1W}": ["祖母", "婆", "太?母", "奶奶", "奶"], "f,{G1W},h": ["祖父", "公", "太?父", "奶爷", "爷爷", "爷"], "m,{G1M}": ["外祖父", "外公", "外爷", "外?公", "外?祖父", "外太?父", "太外?父", "姥爷", "姥公", "毑公", "毑爷", "毑父", "嘎公"], "m,{G1M},w": ["外祖母", "外婆", "外奶", "外?婆", "外?祖母", "外太?母", "太外?母", "姥姥", "姥娘", "姥婆", "毑婆", "毑毑", "毑母", "嘎嘎", "嫏嫏", "嫏娘", "姥"], "m,{G1W}": ["外祖母", "外婆", "外奶", "外?婆", "外?祖母", "外太?母", "太外?母", "姥姥", "姥娘", "姥婆", "毑婆", "毑毑", "毑母", "嘎嘎", "嫏嫏", "嫏娘", "姥"], "m,{G1W},h": ["外祖父", "外公", "外爷", "外?公", "外?祖父", "外太?父", "太外?父", "姥爷", "姥公", "毑公", "毑爷", "毑父", "嘎公"], "f,f,{G1},s&o": ["伯祖父", "伯爷爷"], "f,f,{G1},s&o,w": ["伯祖母", "伯奶奶"], "f,f,{G1},s&l": ["叔祖父", "叔爷爷"], "f,f,{G1},s&l,w": ["叔祖母", "叔奶奶"], "f,f,{G1},d": ["姑祖母", "姑奶奶"], "f,f,{G1},d,h": ["姑祖父", "姑爷爷"], "f,m,{G1},s": ["舅祖父", "舅爷爷"], "f,m,{G1},s,w": ["舅祖母", "舅奶奶"], "f,m,{G1},d": ["姨祖母", "姨奶奶"], "f,m,{G1},d,h": ["姨祖父", "姨爷爷"], "m,f,{G1},s&o": ["伯外祖父", "伯外公", "伯姥爷"], "m,f,{G1},s&o,w": ["伯外祖母", "伯外婆", "伯姥姥"], "m,f,{G1},s&l": ["叔外祖父", "叔外公", "叔姥爷"], "m,f,{G1},s&l,w": ["叔外祖母", "叔外婆", "叔姥姥"], "m,f,{G1},d": ["姑外祖母", "姑外婆", "姑姥姥"], "m,f,{G1},d,h": ["姑外祖父", "姑外公", "姑姥爷"], "m,m,{G1},s": ["舅外祖父", "舅外公", "舅姥爷"], "m,m,{G1},s,w": ["舅外祖母", "舅外婆", "舅姥姥"], "m,m,{G1},d": ["姨外祖母", "姨外公", "姨姥爷"], "m,m,{G1},d,h": ["姨外祖父", "姨外婆", "姨姥姥"], "{G1M}": ["父"], "{G1M},w": ["母"], "{G1W}": ["母"], "{G1W},h": ["父"], "f,{G1},s&o": ["伯父", "伯伯", "伯", "大爷"], "f,{G1},s&o,w": ["伯母", "大娘"], "f,{G1},s&l": ["叔父", "叔爸", "叔叔", "叔"], "f,{G1},s&l,w": ["叔母", "婶"], "f,{G1},d": ["姑母", "姑姑", "姑妈", "姑"], "f,{G1},d,h": ["姑父", "姑丈", "姑爸", "姑夫"], "m,{G1},s": ["舅父", "舅舅", "舅爸", "舅"], "m,{G1},s,w": ["舅母", "舅妈"], "m,{G1},d": ["姨母", "姨姨", "姨妈", "姨"], "m,{G1},d,h": ["姨父", "姨丈", "姨爸", "姨夫"], "{G1},s": ["兄弟"], "{G1},s,w": ["兄弟妇"], "{G1},s&o": ["哥", "哥哥", "阿哥", "兄"], "{G1},s&o,w": ["嫂", "嫂子", "兄妇"], "{G1},s&l": ["弟", "弟弟", "阿弟"], "{G1},s&l,w": ["弟媳", "弟妇"], "{G1},s,s": ["侄男", "侄子", "侄儿"], "{G1},s,s,w": ["侄妇"], "{G1},s,s,s": ["侄孙男"], "{G1},s,s,s,w": ["侄孙妇"], "{G1},s,s,s,s": ["侄曾孙男"], "{G1},s,s,s,s,w": ["侄曾孙妇"], "{G1},s,s,s,s,s": ["侄玄孙男"], "{G1},s,s,s,s,s,w": ["侄玄孙妇"], "{G1},s,s,s,s,d": ["侄玄孙女"], "{G1},s,s,s,s,d,h": ["侄玄孙婿"], "{G1},s,s,d": ["侄孙女"], "{G1},s,s,d,h": ["侄孙婿"], "{G1},s,s,s,d": ["侄曾孙女"], "{G1},s,s,s,d,h": ["侄曾孙婿"], "{G1},s,d": ["侄女", "侄女儿"], "{G1},s,d,h": ["侄婿"], "{G1},s,d,s": ["侄外孙男", "外孙男"], "{G1},s,d,s,w": ["侄外孙妇"], "{G1},s,d,d": ["侄外孙女", "外孙女"], "{G1},s,d,d,h": ["侄外孙婿"], "{G1},d": ["姐妹"], "{G1},d,h": ["姐妹壻"], "{G1},d&o": ["姐", "姐姐", "阿姐"], "{G1},d&o,h": ["姐夫"], "{G1},d&l": ["妹", "妹妹", "阿妹"], "{G1},d&l,h": ["妹夫"], "{G1},d,s": ["甥男"], "{G1},d,s,w": ["甥妇"], "{G1},d,s,s": ["甥孙男"], "{G1},d,s,s,w": ["甥孙妇"], "{G1},d,s,d": ["甥孙女"], "{G1},d,s,d,h": ["甥孙婿"], "{G1},d,d": ["甥女"], "{G1},d,d,h": ["甥婿"], "{G1},d,d,s": ["甥外孙男", "外孙男"], "{G1},d,d,s,w": ["甥外孙妇"], "{G1},d,d,d": ["甥外孙女", "外孙女"], "{G1},d,d,d,h": ["甥外孙婿"], "h,f,{G1M}": ["祖公父", "祖公", "祖翁", "奶公"], "h,f,{G1M},w": ["祖婆母", "祖婆", "祖姆", "奶婆"], "h,f,{G1W}": ["祖婆母", "祖婆", "祖姆", "奶婆"], "h,f,{G1W},h": ["祖公父", "祖公", "祖翁", "奶公"], "h,m,{G1M}": ["外祖公父", "外祖公", "外祖翁", "姥公"], "h,m,{G1M},w": ["外祖婆母", "外祖婆", "外祖姆", "姥婆"], "h,m,{G1W}": ["外祖婆母", "外祖婆", "外祖姆", "姥婆"], "h,m,{G1W},h": ["外祖公父", "外祖公", "外祖翁", "姥公"], "h,{G1M}": ["公父", "公公"], "h,{G1M},w": ["婆母", "婆婆"], "h,{G1W}": ["婆母", "婆婆"], "h,{G1W},h": ["公父", "公公"], "h,{G1},s&o": ["大伯子", "大伯兄"], "h,{G1},s&o,w": ["大婶子", "大伯嫂"], "h,{G1},s&l": ["小叔子", "小叔弟"], "h,{G1},s&l,w": ["小婶子", "小叔弟妇"], "h,{G1},s": ["伯叔"], "h,{G1},s,w": ["妯娌"], "h,{G1},d&o": ["大姑子", "大姑姐"], "h,{G1},d&o,h": ["大姑夫", "大姑姐夫"], "h,{G1},d&l": ["小姑子", "小姑妹"], "h,{G1},d&l,h": ["小姑夫", "小姑妹夫"], "h,{G1},d": ["姑子"], "h,{G1},d,h": ["姑夫"], "w,f,{G1M}": ["祖岳父", "太?岳", "祖丈人", "爷丈人", "奶爷丈人"], "w,f,{G1M},w": ["祖岳母", "太?岳母", "祖丈母", "祖丈母娘", "奶丈母娘", "奶丈母"], "w,f,{G1W}": ["祖岳母", "太?岳母", "祖丈母", "祖丈母娘", "奶丈母娘", "奶丈母"], "w,f,{G1W},h": ["祖岳父", "太?岳父", "祖丈人", "爷丈人", "奶爷丈人"], "w,m,{G1M}": ["外祖岳父", "外太?岳父", "太外?岳父", "外祖丈人", "姥爷丈人"], "w,m,{G1M},w": ["外祖岳母", "外太?岳母", "太外?岳母", "外祖丈母", "外祖丈母娘", "姥丈母娘", "姥丈母"], "w,m,{G1W}": ["外祖岳母", "外太?岳母", "太外?岳母", "外祖丈母", "外祖丈母娘", "姥丈母娘", "姥丈母"], "w,m,{G1W},h": ["外祖岳父", "外太?岳父", "太外?岳父", "外祖丈人", "外爷丈人", "姥爷丈人"], "w,{G1M}": ["岳父", "丈人", "丈人爹"], "w,{G1M},w": ["岳母", "丈母", "丈母娘"], "w,{G1W}": ["岳母", "丈母", "丈母娘"], "w,{G1W},h": ["岳父", "丈人", "丈人爹"], "w,{G1},s&o": ["大舅子", "大舅兄", "舅兄"], "w,{G1},s&o,w": ["大舅妇", "大舅姆", "大舅兄妇", "舅兄妇", "舅姐", "大舅姐", "大妗子", "大妗儿"], "w,{G1},s&l": ["小舅子", "小舅弟", "舅弟"], "w,{G1},s&l,w": ["小舅妇", "小舅姆", "小舅弟妇", "舅弟妇", "舅妹", "小舅妹", "小妗子", "小妗儿"], "w,{G1},s": ["舅子"], "w,{G1},s,w": ["舅嫂"], "w,{G1},d&o": ["大姨子", "大姨姐", "姨姐"], "w,{G1},d&o,h": ["大姨夫", "大姨姐夫", "襟兄", "姨兄", "大姨哥", "大尹子"], "w,{G1},d&l": ["小姨子", "小姨妹", "姨妹"], "w,{G1},d&l,h": ["小姨夫", "小姨妹夫", "襟弟", "姨弟", "小姨弟", "小尹子"], "w,{G1},d": ["姨子"], "w,{G1},d,h": ["连襟", "连桥"], "{G0},s": ["男", "男儿", "儿", "子", "儿子"], "{G0},s,w": ["媳妇", "媳", "妇"], "{G0},s,s": ["孙", "孙男", "孙子"], "{G0},s,s,w": ["孙妇"], "{G0},s,s,s": ["曾孙", "曾孙男"], "{G0},s,s,s,w": ["曾孙妇"], "{G0},s,s,s,s": ["玄孙", "玄孙男", "元孙", "元孙男"], "{G0},s,s,s,s,w": ["玄孙妇"], "{G0},s,s,s,d": ["玄孙女", "元孙女"], "{G0},s,s,s,d,h": ["玄孙婿"], "{G0},s,s,d": ["曾孙女"], "{G0},s,s,d,h": ["曾孙婿"], "{G0},s,s,d,s": ["玄外孙", "玄外孙男"], "{G0},s,s,d,s,w": ["玄外孙妇"], "{G0},s,s,d,d": ["玄外孙女"], "{G0},s,s,d,d,h": ["玄外孙婿"], "{G0},s,d": ["孙女"], "{G0},s,d,h": ["孙婿"], "{G0},s,d,s": ["曾外孙", "曾外孙男"], "{G0},s,d,s,w": ["曾外孙妇"], "{G0},s,d,s,s": ["曾外曾孙", "曾外曾孙男"], "{G0},s,d,s,s,w": ["曾外曾孙妇"], "{G0},s,d,s,d": ["曾外曾孙女"], "{G0},s,d,s,d,h": ["曾外曾孙婿"], "{G0},s,d,d": ["曾外孙女"], "{G0},s,d,d,h": ["曾外孙婿"], "{G0},s,d,d,s": ["曾外曾外孙", "曾外曾外孙男"], "{G0},s,d,d,s,w": ["曾外曾外孙妇"], "{G0},s,d,d,d": ["曾外曾外孙女"], "{G0},s,d,d,d,h": ["曾外曾外孙婿"], "{G0},d": ["女", "女儿"], "{G0},d,h": ["女婿", "婿"], "{G0},d,s": ["外孙", "外孙男"], "{G0},d,s,w": ["外孙妇"], "{G0},d,s,s": ["外曾孙", "外曾孙男"], "{G0},d,s,s,w": ["外曾孙妇"], "{G0},d,s,s,s": ["外玄孙", "外玄孙男"], "{G0},d,s,s,d": ["外玄孙女"], "{G0},d,s,d": ["外曾孙女"], "{G0},d,s,d,h": ["外曾孙婿"], "{G0},d,s,d,s": ["外玄外孙", "外玄外孙男"], "{G0},d,s,d,d": ["外玄外孙女"], "{G0},d,d": ["外孙女"], "{G0},d,d,h": ["外孙婿"], "{G0},d,d,s": ["外曾外孙", "外曾外孙男"], "{G0},d,d,s,w": ["外曾外孙妇"], "{G0},d,d,s,s": ["外曾外曾孙", "外曾外曾孙男"], "{G0},d,d,s,d": ["外曾外曾孙女"], "{G0},d,d,d": ["外曾外孙女"], "{G0},d,d,d,h": ["外曾外孙婿"], "{G0},d,d,d,s": ["外曾外曾外孙"], "{G0},d,d,d,d": ["外曾外曾外孙女"], "{M2W},xb": ["舅祖父"], "{M2W},xb,w": ["舅祖母"], "{M2W},xb,s&o": ["舅表伯父"], "{M2W},xb,s&o,w": ["舅表伯母"], "{M2W},xb,s&l": ["舅表叔父"], "{M2W},xb,s&l,w": ["舅表叔母"], "{M2W},xb,d": ["舅表姑母"], "{M2W},xb,d,h": ["舅表姑父"], "{M2W},xs": ["姨祖母"], "{M2W},xs,h": ["姨祖父"], "{M2W},xs,s&o": ["姨伯父"], "{M2W},xs,s&o,w": ["姨伯母"], "{M2W},xs,s&l": ["姨叔父"], "{M2W},xs,s&l,w": ["姨叔母"], "{M2W},xs,d": ["姨姑母"], "{M2W},xs,d,h": ["姨姑父"], "{M2M},xb": ["叔祖父"], "{M2M},xb,w": ["叔祖母"], "{M2M},xb,s&o": ["堂伯父"], "{M2M},xb,s&o,w": ["堂伯母"], "{M2M},xb,s&l": ["堂叔父"], "{M2M},xb,s&l,w": ["堂叔母"], "{M2M},xb,d": ["堂姑母"], "{M2M},xb,d,h": ["堂姑父"], "{M2M},xs": ["姑祖母"], "{M2M},xs,h": ["姑祖父"], "{M2M},xs,s&o": ["姑表伯父"], "{M2M},xs,s&o,w": ["姑表伯母"], "{M2M},xs,s&l": ["姑表叔父"], "{M2M},xs,s&l,w": ["姑表叔母"], "{M2M},xs,d": ["姑表姑母"], "{M2M},xs,d,h": ["姑表姑父"], "{M1W},f": ["外祖父"], "{M1W},f,xb,s": ["堂舅父"], "{M1W},f,xb,s,w": ["堂舅母"], "{M1W},f,xb,d": ["堂姨母"], "{M1W},f,xb,d,h": ["堂姨父"], "{M1W},f,ob": ["伯外祖父"], "{M1W},f,ob,w": ["伯外祖母"], "{M1W},f,lb": ["叔外祖父"], "{M1W},f,lb,w": ["叔外祖母"], "{M1W},f,xs": ["姑外祖母"], "{M1W},f,xs,h": ["姑外祖父"], "{M1W},f,xs,s": ["姑表舅父"], "{M1W},f,xs,s,w": ["姑表舅母"], "{M1W},f,xs,d": ["姑表姨母"], "{M1W},f,xs,d,h": ["姑表姨父"], "{M1W},m": ["外祖母"], "{M1W},m,xb": ["舅外祖父"], "{M1W},m,xb,w": ["舅外祖母"], "{M1W},m,xb,s": ["舅表舅父"], "{M1W},m,xb,s,w": ["舅表舅母"], "{M1W},m,xb,d": ["舅表姨母"], "{M1W},m,xb,d,h": ["舅表姨父"], "{M1W},m,xs": ["姨外祖母"], "{M1W},m,xs,h": ["姨外祖父"], "{M1W},m,xs,s": ["姨舅父"], "{M1W},m,xs,s,w": ["姨舅母"], "{M1W},m,xs,d": ["姨姨母"], "{M1W},m,xs,d,h": ["姨姨父"], "{M1W},xb": ["舅父"], "{M1W},xb,w": ["舅母"], "{M1W},xb,[s|d]": ["舅表兄弟姊妹"], "{M1W},xb,s": ["舅表兄弟"], "{M1W},xb,s,w": ["舅表兄弟妇"], "{M1W},xb,s&o": ["舅表兄"], "{M1W},xb,s&o,w": ["舅表兄妇"], "{M1W},xb,s&l": ["舅表弟"], "{M1W},xb,s&l,w": ["舅表弟妇"], "{M1W},xb,s,s": ["舅表侄男", "侄男"], "{M1W},xb,s,s,w": ["舅表侄妇", "侄妇"], "{M1W},xb,s,d": ["舅表侄女", "侄女"], "{M1W},xb,s,d,h": ["舅表侄婿", "侄婿"], "{M1W},xb,d": ["舅表姊妹"], "{M1W},xb,d,h": ["舅表姊妹壻"], "{M1W},xb,d&o": ["舅表姊"], "{M1W},xb,d&o,h": ["舅表姊壻"], "{M1W},xb,d&l": ["舅表妹"], "{M1W},xb,d&l,h": ["舅表妹壻"], "{M1W},xb,d,s": ["舅表甥男", "甥男"], "{M1W},xb,d,s,w": ["舅表甥妇", "甥妇"], "{M1W},xb,d,d": ["舅表甥女", "甥女"], "{M1W},xb,d,d,h": ["舅表甥婿", "甥婿"], "{M1W},xs": ["姨母", "姨妈"], "{M1W},xs,h": ["姨父", "姨丈", "姨夫"], "{M1W},xs,[s|d]": ["姨表兄弟姊妹"], "{M1W},xs,s": ["姨表兄弟"], "{M1W},xs,s,w": ["姨表兄弟妇"], "{M1W},xs,s&o": ["姨表兄"], "{M1W},xs,s&o,w": ["姨表兄妇"], "{M1W},xs,s&l": ["姨表弟"], "{M1W},xs,s&l,w": ["姨表弟妇"], "{M1W},xs,s,s": ["姨表侄男", "侄男"], "{M1W},xs,s,s,w": ["姨表侄妇", "侄妇"], "{M1W},xs,s,d": ["姨表侄女", "侄女"], "{M1W},xs,s,d,h": ["姨表侄婿", "侄婿"], "{M1W},xs,d": ["姨表姊妹"], "{M1W},xs,d,h": ["姨表姊妹壻"], "{M1W},xs,d&o": ["姨表姊"], "{M1W},xs,d&o,h": ["姨表姊壻"], "{M1W},xs,d&l": ["姨表妹"], "{M1W},xs,d&l,h": ["姨表妹壻"], "{M1W},xs,d,s": ["姨表甥男", "甥男"], "{M1W},xs,d,s,w": ["姨表甥妇", "甥妇"], "{M1W},xs,d,d": ["姨表甥女", "甥女"], "{M1W},xs,d,d,h": ["姨表甥婿", "甥婿"], "{M1M},f": ["祖父"], "{M1M},f,xb,s&o": ["堂伯父"], "{M1M},f,xb,s&o,w": ["堂伯母"], "{M1M},f,xb,s&l": ["堂叔父"], "{M1M},f,xb,s&l,w": ["堂叔母"], "{M1M},f,xb,d": ["堂姑母"], "{M1M},f,xb,d,h": ["堂姑父"], "{M1M},f,ob": ["伯祖父"], "{M1M},f,ob,w": ["伯祖母"], "{M1M},f,lb": ["叔祖父"], "{M1M},f,lb,w": ["叔祖母"], "{M1M},f,xs": ["姑祖母"], "{M1M},f,xs,h": ["姑祖父"], "{M1M},f,xs,s&o": ["姑表伯父"], "{M1M},f,xs,s&o,w": ["姑表伯母"], "{M1M},f,xs,s&l": ["姑表叔父"], "{M1M},f,xs,s&l,w": ["姑表叔母"], "{M1M},f,xs,d": ["姑表姑母"], "{M1M},f,xs,d,h": ["姑表姑父"], "{M1M},m": ["祖母"], "{M1M},m,xb": ["舅祖父"], "{M1M},m,xb,w": ["舅祖母"], "{M1M},m,xb,s&o": ["舅表伯父"], "{M1M},m,xb,s&o,w": ["舅表伯母"], "{M1M},m,xb,s&l": ["舅表叔父"], "{M1M},m,xb,s&l,w": ["舅表叔母"], "{M1M},m,xb,d": ["舅表姑母"], "{M1M},m,xb,d,h": ["舅表姑父"], "{M1M},m,xs": ["姨祖母"], "{M1M},m,xs,h": ["姨祖父"], "{M1M},m,xs,s&o": ["姨伯父"], "{M1M},m,xs,s&o,w": ["姨伯母"], "{M1M},m,xs,s&l": ["姨叔父"], "{M1M},m,xs,s&l,w": ["姨叔母"], "{M1M},m,xs,d": ["姨姑母"], "{M1M},m,xs,d,h": ["姨姑父"], "{M1M},xb": ["叔伯父"], "{M1M},xb,w": ["叔伯母"], "{M1M},ob": ["伯父"], "{M1M},ob,w": ["伯母"], "{M1M},lb": ["叔父"], "{M1M},lb,w": ["叔母"], "{M1M},xb,[s|d]": ["叔表兄弟姊妹"], "{M1M},xb,s": ["叔表兄弟"], "{M1M},xb,s,w": ["叔表兄弟妇"], "{M1M},xb,s&o": ["叔表兄"], "{M1M},xb,s&o,w": ["叔表兄妇"], "{M1M},xb,s&l": ["叔表弟"], "{M1M},xb,s&l,w": ["叔表弟妇"], "{M1M},xb,s,s": ["叔表侄男", "侄男"], "{M1M},xb,s,s,w": ["叔表侄妇", "侄妇"], "{M1M},xb,s,d": ["叔表侄女", "侄女"], "{M1M},xb,s,d,h": ["叔表侄婿", "侄婿"], "{M1M},xb,d": ["叔表姊妹"], "{M1M},xb,d,h": ["叔表姊妹壻"], "{M1M},xb,d&o": ["叔表姊"], "{M1M},xb,d&o,h": ["叔表姊壻"], "{M1M},xb,d&l": ["叔表妹"], "{M1M},xb,d&l,h": ["叔表妹壻"], "{M1M},xb,d,s": ["叔表甥男", "甥男"], "{M1M},xb,d,s,w": ["叔表甥妇", "甥妇"], "{M1M},xb,d,d": ["叔表甥女", "甥女"], "{M1M},xb,d,d,h": ["叔表甥婿", "甥婿"], "{M1M},xs": ["姑母", "姑妈"], "{M1M},xs,h": ["姑父", "姑丈", "姑夫"], "{M1M},xs,[s|d]": ["姑表兄弟姊妹"], "{M1M},xs,s": ["姑表兄弟"], "{M1M},xs,s,w": ["姑表兄弟妇"], "{M1M},xs,s&o": ["姑表兄"], "{M1M},xs,s&o,w": ["姑表兄妇"], "{M1M},xs,s&l": ["姑表弟"], "{M1M},xs,s&l,w": ["姑表弟妇"], "{M1M},xs,s,s": ["姑表侄男", "侄男"], "{M1M},xs,s,s,w": ["姑表侄妇", "侄妇"], "{M1M},xs,s,d": ["姑表侄女", "侄女"], "{M1M},xs,s,d,h": ["姑表侄婿", "侄婿"], "{M1M},xs,d": ["姑表姊妹"], "{M1M},xs,d,h": ["姑表姊妹壻"], "{M1M},xs,d&o": ["姑表姊"], "{M1M},xs,d&o,h": ["姑表姊壻"], "{M1M},xs,d&l": ["姑表妹"], "{M1M},xs,d&l,h": ["姑表妹壻"], "{M1M},xs,d,s": ["姑表甥男", "甥男"], "{M1M},xs,d,s,w": ["姑表甥妇", "甥妇"], "{M1M},xs,d,d": ["姑表甥女", "甥女"], "{M1M},xs,d,d,h": ["姑表甥婿", "甥婿"], "{M0},f": ["父"], "{M0},f,f": ["祖父"], "{M0},f,f,ob": ["伯祖父"], "{M0},f,f,ob,w": ["伯祖母"], "{M0},f,f,lb": ["叔祖父"], "{M0},f,f,lb,w": ["叔祖母"], "{M0},f,f,xs": ["姑祖母"], "{M0},f,f,xs,h": ["姑祖父"], "{M0},f,m": ["祖母"], "{M0},f,m,xb": ["舅祖父"], "{M0},f,m,xb,w": ["舅祖母"], "{M0},f,m,xs": ["姨祖母"], "{M0},f,m,xs,h": ["姨祖父"], "{M0},f,ob": ["伯父"], "{M0},f,ob,w": ["伯母"], "{M0},f,lb": ["叔父"], "{M0},f,lb,w": ["叔母"], "{M0},f,xb,[s|d]": ["叔表兄弟姊妹", "叔表姊妹兄弟"], "{M0},f,xb,s": ["叔表兄弟"], "{M0},f,xb,s,w": ["叔表兄弟妇"], "{M0},f,xb,s&o": ["叔表兄"], "{M0},f,xb,s&o,w": ["叔表兄妇"], "{M0},f,xb,s&l": ["叔表弟"], "{M0},f,xb,s&l,w": ["叔表弟妇"], "{M0},f,xb,d": ["叔表姊妹"], "{M0},f,xb,d,h": ["叔表姊妹壻"], "{M0},f,xb,d&o": ["叔表姊"], "{M0},f,xb,d&o,h": ["叔表姊壻"], "{M0},f,xb,d&l": ["叔表妹"], "{M0},f,xb,d&l,h": ["叔表妹壻"], "{M0},f,xs": ["姑母", "姑妈"], "{M0},f,xs,h": ["姑父", "姑丈", "姑夫"], "{M0},f,xs,[s|d]": ["姑表兄弟姊妹", "姑表姊妹兄弟"], "{M0},f,xs,s": ["姑表兄弟"], "{M0},f,xs,s,w": ["姑表兄弟妇"], "{M0},f,xs,s&o": ["姑表兄"], "{M0},f,xs,s&o,w": ["姑表兄妇"], "{M0},f,xs,s&l": ["姑表弟"], "{M0},f,xs,s&l,w": ["姑表弟妇"], "{M0},f,xs,d": ["姑表姊妹"], "{M0},f,xs,d,h": ["姑表姊妹壻"], "{M0},f,xs,d&o": ["姑表姊"], "{M0},f,xs,d&o,h": ["姑表姊壻"], "{M0},f,xs,d&l": ["姑表妹"], "{M0},f,xs,d&l,h": ["姑表妹壻"], "{M0},m": ["母"], "{M0},m,f": ["外祖父"], "{M0},m,f,ob": ["伯外祖父"], "{M0},m,f,ob,w": ["伯外祖母"], "{M0},m,f,lb": ["叔外祖父"], "{M0},m,f,lb,w": ["叔外祖母"], "{M0},m,f,xs": ["姑外祖母"], "{M0},m,f,xs,h": ["姑外祖父"], "{M0},m,m": ["外祖母"], "{M0},m,m,xb": ["舅外祖父"], "{M0},m,m,xb,w": ["舅外祖母"], "{M0},m,m,xs": ["姨外祖母"], "{M0},m,m,xs,h": ["姨外祖父"], "{M0},m,xb": ["舅父"], "{M0},m,xb,w": ["舅母"], "{M0},m,xb,[s|d]": ["舅表兄弟姊妹", "舅表姊妹兄弟"], "{M0},m,xb,s": ["舅表兄弟"], "{M0},m,xb,s,w": ["舅表兄弟妇"], "{M0},m,xb,s&o": ["舅表兄"], "{M0},m,xb,s&o,w": ["舅表兄妇"], "{M0},m,xb,s&l": ["舅表弟"], "{M0},m,xb,s&l,w": ["舅表弟妇"], "{M0},m,xb,d": ["舅表姊妹"], "{M0},m,xb,d,h": ["舅表姊妹壻"], "{M0},m,xb,d&o": ["舅表姊"], "{M0},m,xb,d&o,h": ["舅表姊壻"], "{M0},m,xb,d&l": ["舅表妹"], "{M0},m,xb,d&l,h": ["舅表妹壻"], "{M0},m,xs": ["姨母", "姨妈"], "{M0},m,xs,h": ["姨父", "姨丈", "姨夫"], "{M0},m,xs,[s|d]": ["姨兄弟姊妹", "姨姊妹兄弟"], "{M0},m,xs,s": ["姨兄弟"], "{M0},m,xs,s,w": ["姨兄弟妇"], "{M0},m,xs,s&o": ["姨兄"], "{M0},m,xs,s&o,w": ["姨兄妇"], "{M0},m,xs,s&l": ["姨弟"], "{M0},m,xs,s&l,w": ["姨弟妇"], "{M0},m,xs,d": ["姨姊妹"], "{M0},m,xs,d,h": ["姨姊妹壻"], "{M0},m,xs,d&o": ["姨姊"], "{M0},m,xs,d&o,h": ["姨姊壻"], "{M0},m,xs,d&l": ["姨妹"], "{M0},m,xs,d&l,h": ["姨妹壻"], "{M0},xb": ["兄弟"], "{M0},xb,w": ["兄弟妇"], "{M0},xb&o": ["兄"], "{M0},xb&o,w": ["兄妇", "兄嫂", "嫂子"], "{M0},xb&l": ["弟"], "{M0},xb&l,w": ["弟妇", "弟妹"], "{M0},xb,s": ["侄男", "侄子", "侄儿"], "{M0},xb,s,w": ["侄妇"], "{M0},xb,d": ["侄女"], "{M0},xb,d,h": ["侄婿"], "{M0},xs": ["姊妹"], "{M0},xs,h": ["姊妹壻"], "{M0},xs&o": ["姊"], "{M0},xs&o,h": ["姊壻", "姐夫"], "{M0},xs&l": ["妹"], "{M0},xs&l,h": ["妹壻", "妹夫"], "{M0},xs,s": ["甥男"], "{M0},xs,s,w": ["甥妇"], "{M0},xs,d": ["甥女"], "{M0},xs,d,h": ["甥婿"], "{M-1},f": ["兄弟"], "{M-1},f&o": ["兄"], "{M-1},f&l": ["弟"], "{M-1},f,f": ["父"], "{M-1},f,f,f": ["祖父"], "{M-1},f,f,m": ["祖母"], "{M-1},f,f,ob": ["伯父"], "{M-1},f,f,ob,w": ["伯母"], "{M-1},f,f,lb": ["叔父"], "{M-1},f,f,lb,w": ["叔母"], "{M-1},f,m": ["母"], "{M-1},f,m,f": ["外祖父"], "{M-1},f,m,m": ["外祖母"], "{M-1},f,xb": ["叔兄弟"], "{M-1},f,xb,w": ["叔兄弟妇"], "{M-1},f,ob": ["叔兄"], "{M-1},f,ob,w": ["叔兄妇"], "{M-1},f,lb": ["叔弟"], "{M-1},f,lb,w": ["叔弟妇"], "{M-1},f,xb,s": ["叔男"], "{M-1},f,xb,d": ["叔女"], "{M-1},f,xs": ["姑姊妹"], "{M-1},f,xs,h": ["姑姊妹壻"], "{M-1},f,os": ["姑姊"], "{M-1},f,os,h": ["姑姊壻"], "{M-1},f,ls": ["姑妹"], "{M-1},f,ls,h": ["姑妹壻"], "{M-1},f,xs,s": ["姑男"], "{M-1},f,xs,d": ["姑女"], "{M-1},m": ["姊妹"], "{M-1},m&o": ["姊"], "{M-1},m&l": ["妹"], "{M-1},m,f": ["父"], "{M-1},m,f,f": ["祖父"], "{M-1},m,f,m": ["祖母"], "{M-1},m,m": ["母"], "{M-1},m,m,f": ["外祖父"], "{M-1},m,m,m": ["外祖母"], "{M-1},m,xb": ["舅兄弟"], "{M-1},m,xb,w": ["舅兄弟妇"], "{M-1},m,ob": ["舅兄"], "{M-1},m,ob,w": ["舅兄妇"], "{M-1},m,lb": ["舅弟"], "{M-1},m,lb,w": ["舅弟妇"], "{M-1},m,xb,s": ["舅男"], "{M-1},m,xb,d": ["舅女"], "{M-1},m,xs": ["姨姊妹"], "{M-1},m,xs,h": ["姨姊妹壻"], "{M-1},m,os": ["姨姊"], "{M-1},m,os,h": ["姨姊壻"], "{M-1},m,ls": ["姨妹"], "{M-1},m,ls,h": ["姨妹壻"], "{M-1},m,xs,s": ["姨男"], "{M-1},m,xs,d": ["姨女"], "{M-1},xb": ["男"], "{M-1},xb,w": ["妇"], "{M-1},xb,s": ["孙男"], "{M-1},xb,s,w": ["孙妇"], "{M-1},xb,d": ["孙女"], "{M-1},xb,d,h": ["孙婿"], "{M-1},xs": ["女"], "{M-1},xs,h": ["婿"], "{M-1},xs,s": ["外孙男"], "{M-1},xs,s,w": ["外孙妇"], "{M-1},xs,d": ["外孙女"], "{M-1},xs,d,h": ["外孙婿"], "{M-2},f": ["男"], "{M-2},f,f&o": ["兄"], "{M-2},f,f&l": ["弟"], "{M-2},f,m&o": ["姊"], "{M-2},f,m&l": ["妹"], "{M-2},m": ["女"], "{M-2},m,f&o": ["兄"], "{M-2},m,f&l": ["弟"], "{M-2},m,m&o": ["姊"], "{M-2},m,m&l": ["妹"], "{M-2},xb": ["孙男"], "{M-2},xb,w": ["孙妇"], "{M-2},xs": ["孙女"], "{M-2},xs,h": ["孙婿"] })), M)
      n2[u] = [].concat(M[u], n2[u] || []);
    n2.o = ["passer-by.com", "作者"];
    var G = { w: ["妻", "内", "岳", "岳家", "丈人"], h: ["夫", "外", "公", "婆家", "婆婆"] }, p2 = new Set(Object.values(n2).flat());
    for (var $ in n2)
      if ($.match(/^[fm]/) || $.match(/^[olx][bs]$|^[olx][bs],[^mf]/)) {
        var W = function() {
          var s3 = v + "," + $;
          if ($.match(/[fm]/)) {
            var f2 = s3.replace(/,[ol]([sb])(,[wh])?$/, ",x$1$2").replace(/(,[sd])&[ol](,[wh])?$/, "$1$2");
            if (f2 != s3 && n2[f2])
              return 1;
          }
          n2[s3] || (n2[s3] = []);
          var x2 = G[v], d2 = n2[$];
          x2.forEach(function(f3) {
            d2.forEach(function(x3) {
              var d3 = f3 + x3;
              p2.has(d3) || n2[s3].push(d3);
            });
          });
        };
        for (var v in G)
          W();
      }
    var g = n2, y = {}, S = Object.assign({}, g);
    function j(s3, f2) {
      var x2 = { f: ["d", "s"], m: ["d", "s"], h: ["w", ""], w: ["", "h"], s: ["m", "f"], d: ["m", "f"], lb: ["os", "ob"], ob: ["ls", "lb"], xb: ["xs", "xb"], ls: ["os", "ob"], os: ["ls", "lb"], xs: ["xs", "xb"] }, d2 = "";
      if (s3.match(/&o$/) ? d2 = "&l" : s3.match(/&l$/) && (d2 = "&o"), s3) {
        s3 = s3.replace(/&[ol\d+]/g, ""), f2 < 0 && (s3.match(/^w/) ? f2 = 1 : s3.match(/^h/) && (f2 = 0));
        var m2 = [], b2 = function(f3) {
          var m3 = ("," + f3 + "," + s3).replace(/,[fhs]|,[olx]b/g, ",1").replace(/,[mwd]|,[olx]s/g, ",0");
          m3 = m3.substring(0, m3.length - 2);
          var b3 = s3.split(",").reverse(), o3 = m3.split(",").reverse(), r2 = b3.map(function(s4, f4) {
            return x2[s4][o3[f4]];
          }), e3 = r2.join(",");
          return e3 + (O(e3) ? "" : d2);
        };
        return f2 < 0 ? (m2.push(b2(1)), m2.push(b2(0))) : m2.push(b2(f2)), m2;
      }
      return [""];
    }
    function E2(s3) {
      var f2 = s3.filter(function(s4) {
        return s4 == s4.replace(/[ol](?=[s|b])/g, "x").replace(/&[ol]/, "");
      });
      return s3.filter(function(s4) {
        var x2 = s4.replace(/[ol](?=[s|b])/g, "x").replace(/&[ol]/, "");
        return f2.includes(s4) || s4 != x2 && !f2.includes(x2);
      }).filter(function(s4, f3, x2) {
        return x2.indexOf(s4) === f3;
      });
    }
    function O(s3) {
      var f2 = { f: 1, m: 1, s: -1, d: -1 }, x2 = 0;
      return s3.split(",").forEach(function(s4) {
        var d2 = s4.replace(/&[ol\d]+/, "");
        x2 += f2[d2] || 0;
      }), x2;
    }
    function A(s3) {
      var f2 = [], x2 = function(s4) {
        var f3 = [], x3 = s4.replace(/(,[sd])(,[wh])?$/, "$1&o$2"), d3 = s4.replace(/(,[sd])(,[wh])?$/, "$1&l$2");
        return S[x3] && S[d3] ? f3 = [x3, d3] : S[s4] && (f3 = [s4]), E2(f3).map(function(s5) {
          return S[s5][0];
        });
      };
      if (s3.match(/&([\d]+)(,[hw])?$/)) {
        var d2 = function(s4) {
          var f3 = "", x3 = { 1: "大", 99: "小" };
          if (x3[s4])
            f3 = x3[s4];
          else {
            var d3 = ~~(s4 / 10), m3 = s4 % 10;
            f3 = (d3 ? (l[d3] + "十").replace("一十", "十") : "") + l[m3];
          }
          return f3;
        }(s3.match(/&([\d]+)(,[hw])?$/)[1]);
        if (s3 = s3.replace(/&\d+/g, ""), S[s3]) {
          var m2 = "";
          O(s3) < 3 && !s3.match(/[hw],/) ? (S[s3].forEach(function(s4) {
            !m2 && s4.includes("几") && (m2 = s4.replace("几", d2));
          }), m2 || (m2 = S[s3][0].match(/^[大小]/) ? S[s3][0].replace(/^[大小]/, d2) : d2 + S[s3][0])) : m2 = S[s3][0], f2.push(m2);
        }
      } else
        s3 = s3.replace(/&\d+/g, "");
      if (f2.length || (f2 = x2(s3)), f2.length || (f2 = x2(s3 = s3.replace(/&[ol]/g, ""))), f2.length || (f2 = x2(s3 = s3.replace(/[ol](b|s)/g, "x$1"))), !f2.length) {
        var b2 = s3.replace(/x/g, "l"), o3 = s3.replace(/x/g, "o");
        f2 = f2.concat(x2(o3), x2(b2));
      }
      return f2;
    }
    var N = Object.assign({}, S, { xb: ["兄弟"], xs: ["姐妹"] });
    function I(s3, f2) {
      var x2 = s3.split(",").map(function(s4) {
        var f3 = s4.replace(/&[ol\d]+/, "");
        return N[f3][0];
      }).join("的");
      return f2 && f2 > -1 && N[f2 + "," + s3] && (0 == f2 ? x2 = "(女性)" + x2 : 1 == f2 && (x2 = "(男性)" + x2)), x2;
    }
    var T = Object.assign({}, S, { "f,xb": ["伯叔父", "几爸爸", "几爸", "几爹"], "f,xb,w": ["伯叔母", "几妈妈", "几妈", "几娘"], "h,xb": ["伯叔"], "h,xb,w": ["妯娌", "娣姒", "娣姒姊妹", "婶子"] }), C = {}, k = function(s3) {
      T[s3].forEach(function(f2) {
        void 0 === C[f2] && (C[f2] = []), C[f2].push(s3);
      });
    };
    for (var U in T)
      k(U);
    function q(s3, f2) {
      var x2 = "undefined" != typeof Symbol && s3[Symbol.iterator] || s3["@@iterator"];
      if (!x2) {
        if (Array.isArray(s3) || (x2 = function(s4, f3) {
          if (!s4)
            return;
          if ("string" == typeof s4)
            return z(s4, f3);
          var x3 = Object.prototype.toString.call(s4).slice(8, -1);
          "Object" === x3 && s4.constructor && (x3 = s4.constructor.name);
          if ("Map" === x3 || "Set" === x3)
            return Array.from(s4);
          if ("Arguments" === x3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(x3))
            return z(s4, f3);
        }(s3)) || f2 && s3 && "number" == typeof s3.length) {
          x2 && (s3 = x2);
          var d2 = 0, m2 = function() {
          };
          return { s: m2, n: function() {
            return d2 >= s3.length ? { done: true } : { done: false, value: s3[d2++] };
          }, e: function(s4) {
            throw s4;
          }, f: m2 };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var b2, o3 = true, r2 = false;
      return { s: function() {
        x2 = x2.call(s3);
      }, n: function() {
        var s4 = x2.next();
        return o3 = s4.done, s4;
      }, e: function(s4) {
        r2 = true, b2 = s4;
      }, f: function() {
        try {
          o3 || null == x2.return || x2.return();
        } finally {
          if (r2)
            throw b2;
        }
      } };
    }
    function z(s3, f2) {
      (null == f2 || f2 > s3.length) && (f2 = s3.length);
      for (var x2 = 0, d2 = new Array(f2); x2 < f2; x2++)
        d2[x2] = s3[x2];
      return d2;
    }
    function B(s3) {
      (s3 = s3.replace(/之/g, "的").replace(/吾之?(.+)/, "$1").replace(/我的?(.+)/, "$1")).match(/[^娘婆岳亲]家的?(孩子|儿子|女儿)/) && (s3 = s3.replace(/家的?/, "的"));
      for (var f2 = (s3 = (s3 = (s3 = s3.replace(/(舅|姑)+(爸|父|丈|妈|母)?家的?(哥|姐|弟|妹)+/, "$1表$3").replace(/(舅|姑)+(爸|父|丈|妈|母)?家的?/, "$1表")).replace(/(伯|叔)+(父|母)?家的?(哥|姐|弟|妹)+/, "堂$3").replace(/(伯|叔)+(父|母)?家的?/, "堂")).replace(/姨+(爸|父|丈|妈|母)?家的?(哥|姐|弟|妹)+/, "姨$2").replace(/姨+(爸|父|丈|妈|母)?家的?/, "姨")).split("的"), x2 = [], d2 = true, m2 = function() {
        var s4 = f2.shift(), m3 = [], b2 = [s4];
        !function s5(f3) {
          for (var x3 in r.forEach(function(x4) {
            x4.arr.forEach(function(d4) {
              var m5 = f3.replace(x4.exp, d4);
              m5 != f3 && (b2.push(m5), s5(m5));
            });
          }), e2) {
            var d3 = f3.replace(x3, e2[x3]), m4 = f3.replace(e2[x3], x3);
            d3 != f3 && b2.push(d3), m4 != f3 && b2.push(m4);
          }
        }(s4);
        var o3 = [[], [], []];
        b2.forEach(function(s5) {
          var f3 = (s5 = s5.replace(/^[尕幺细满碎晚末尾幼]/, "小")).match(/^[大|小]|^[一|二|三|四|五|六|七|八|九|十]+/);
          if (f3) {
            var x3 = s5.replace(f3[0], "几"), d3 = s5.replace(f3[0], ""), b3 = function(s6) {
              var f4 = 0, x4 = { "大": 1, "小": 99 };
              if (x4[s6])
                f4 = x4[s6];
              else {
                var d4 = h(s6.replace(/^十/, "一十").split("十").map(function(s7) {
                  return l.indexOf(s7);
                }).reverse(), 2), m4 = d4[0], b4 = d4[1];
                f4 = 10 * (void 0 === b4 ? 0 : b4) + m4;
              }
              return f4;
            }(f3[0]);
            [x3, d3, s5].forEach(function(s6, f4) {
              var x4 = C[s6];
              x4 && x4.length && x4.forEach(function(x5) {
                var d4 = x5.replace(/(,[hw])$/, "&" + b3 + "$1").replace(/([^hw]+)$/, "$1&" + b3);
                x5.match(/^[mf,]+$/) || s6.match(/^[从世]/) || o3[f4].push(d4);
              });
            });
          }
          m3 = m3.concat(C[s5] || []);
        }), o3.forEach(function(s5) {
          m3.length || (m3 = s5);
        }), m3.length || (d2 = false);
        var t3 = [];
        x2.length || (x2 = [""]), x2.forEach(function(s5) {
          m3.forEach(function(f3) {
            t3.push(s5 + (f3 ? "," + f3 : ""));
          });
        }), x2 = t3;
      }; f2.length; )
        m2();
      return d2 ? E2(x2) : [];
    }
    function D(s3) {
      var f2 = s3.from, x2 = s3.to, d2 = s3.sex;
      if (d2 < 0) {
        var m2 = -1, b2 = -1;
        if (f2.match(/^,[w1]/) ? b2 = 1 : f2.match(/^,[h0]/) && (b2 = 0), x2.match(/^,[w1]/) ? m2 = 1 : x2.match(/^,[h0]/) && (m2 = 0), -1 == b2 && m2 > -1)
          d2 = m2;
        else if (b2 > -1 && -1 == m2)
          d2 = b2;
        else {
          if (b2 != m2)
            return [];
          d2 = b2;
        }
      }
      var o3 = H(s3.from, d2), r2 = H(s3.to, d2);
      if (!o3.length || !r2.length)
        return [];
      var e3 = [];
      return o3.forEach(function(f3) {
        r2.forEach(function(x3) {
          var m3 = d2, b3 = "," + x3;
          if (b3.match(/,([fhs1](&[ol\d]+)?|[olx]b)(&[ol\d]+)?$/) && (m3 = 1), b3.match(/,([mwd0](&[ol\d]+)?|[olx]s)(&[ol\d]+)?$/) && (m3 = 0), f3 && x3) {
            var o4 = s3.optimal;
            if ((f3.match(/&\d+/) || x3.match(/&\d+/)) && (o4 = true), o4) {
              var r3 = function(s4) {
                for (var f4 = s4.from, x4 = s4.to, d3 = s4.sex, m4 = s4.from.split(","), b4 = s4.to.split(","), o5 = 0; o5 < m4.length && o5 < b4.length; o5++) {
                  if (m4[o5] != b4[o5]) {
                    if (O(m4[o5]) == O(b4[o5]) && m4[o5].match(/^[xol][bs]|^[sd]/) && b4[o5].match(/^[xol][bs]|^[sd]/)) {
                      if (m4[o5].replace(/&([ol\d]+)/, "").replace(/^[xol]([bs])/, "$1") != b4[o5].replace(/&([ol\d]+)/, "").replace(/^[xol]([bs])/, "$1"))
                        break;
                      var r4 = m4[o5].match(/&([ol\d]+)/), e4 = b4[o5].match(/&([ol\d]+)/);
                      r4 || (r4 = m4[o5].match(/([ol])[bs]/)), e4 || (e4 = b4[o5].match(/([ol])[bs]/));
                      var h2 = r4 ? r4[1] : "", l2 = e4 ? e4[1] : "";
                      if (h2 && l2)
                        isNaN(h2) || isNaN(l2) ? !isNaN(h2) && "o" == l2 || "l" == h2 && !isNaN(l2) ? m4[o5] = m4[o5].replace(/^[xol]b|^s/, "lb").replace(/^[xol]s|^d/, "ls") : (!isNaN(h2) && "l" == l2 || "o" == h2 && !isNaN(l2)) && (m4[o5] = m4[o5].replace(/^[xol]b|^s/, "ob").replace(/^[xol]s|^d/, "os")) : +h2 > +l2 ? m4[o5] = m4[o5].replace(/^[xol]b|^s/, "lb").replace(/^[xol]s|^d/, "ls") : +h2 < +l2 && (m4[o5] = m4[o5].replace(/^[xol]b|^s/, "ob").replace(/^[xol]s|^d/, "os")), f4 = m4.slice(o5).join(","), x4 = b4.slice(o5 + 1).join(","), d3 = b4[o5].match(/^([fhs1](&[ol\d]+)?|[olx]b)(&[ol\d]+)?/) ? 1 : 0;
                      else if (s4.optimal && (r4 = m4[o5].match(/([xol])[bs]/), e4 = b4[o5].match(/([xol])[bs]/), h2 = r4 ? r4[1] : "", l2 = e4 ? e4[1] : "", "x" == h2 || "x" == l2)) {
                        f4 = m4.slice(o5 + 1).join(","), x4 = b4.slice(o5 + 1).join(","), d3 = m4[o5].match(/^([fhs1](&[ol\d]+)?|[olx]b)(&[ol\d]+)?/) ? 1 : 0;
                        continue;
                      }
                    }
                    break;
                  }
                  f4 = m4.slice(o5 + 1).join(","), x4 = b4.slice(o5 + 1).join(","), d3 = m4[o5].match(/^([fhs1](&[ol\d]+)?|[olx]b)(&[ol\d]+)?/) ? 1 : 0;
                }
                return { from: f4, to: x4, sex: d3 };
              }({ from: f3, to: x3, sex: d2, optimal: s3.optimal });
              f3 = r3.from, x3 = r3.to, d2 = r3.sex;
            }
          }
          (x3 ? j(x3, d2) : [""]).forEach(function(s4) {
            var x4 = (s4 ? "," + s4 : "") + (f3 ? "," + f3 : "");
            e3.push({ selector: x4, sex: m3 });
          });
        });
      }), e3;
    }
    function F(s3) {
      var f2 = [], x2 = {};
      return function s4(d2) {
        var m2 = "";
        if (!x2[d2]) {
          x2[d2] = true;
          do {
            m2 = d2;
            var b2, r2 = q(o2);
            try {
              for (r2.s(); !(b2 = r2.n()).done; ) {
                var e3 = b2.value;
                if ((d2 = d2.replace(e3.exp, e3.str)).includes("#"))
                  return d2.split("#").forEach(s4), false;
              }
            } catch (s5) {
              r2.e(s5);
            } finally {
              r2.f();
            }
          } while (m2 != d2);
          if (d2.match(/,[mwd0](&[ol\d+])?,w|,[hfs1](&[ol\d]+)?,h/))
            return false;
          f2.push(d2);
        }
      }(s3), f2;
    }
    function H(s3, f2) {
      if (s3.match(/^,/) || (s3 = "," + s3), f2 < 0)
        s3.match(/^,[w1]/) ? f2 = 1 : s3.match(/^,[h0]/) && (f2 = 0);
      else {
        if (1 == f2 && s3.match(/^,[h0]/))
          return [];
        if (0 == f2 && s3.match(/^,[w1]/))
          return [];
      }
      if (f2 > -1 && !s3.includes(",1") && !s3.includes(",0") && (s3 = "," + f2 + s3), s3.match(/,[mwd0](&[ol\d]+)?,w|,[hfs1](&[ol\d]+)?,h/))
        return [];
      var x2 = F(s3).map(function(s4) {
        return s4.replace(/,[01]/, "").substr(1);
      });
      return E2(x2);
    }
    var J = function(s3) {
      "string" == typeof s3 && (s3 = function(s4) {
        var f3, x2 = m(d);
        try {
          for (x2.s(); !(f3 = x2.n()).done; ) {
            var b3 = f3.value, o4 = s4.match(b3.exp);
            if (o4)
              return b3.opt(o4);
          }
        } catch (s5) {
          x2.e(s5);
        } finally {
          x2.f();
        }
        return {};
      }(s3));
      var f2 = Object.assign({ text: "", target: "", sex: -1, type: "default", reverse: false, mode: "default", optimal: false }, s3);
      !function(s4) {
        if (S = Object.assign({}, g), s4 && y[s4])
          for (var f3 in y[s4])
            S[f3] = [].concat(y[s4][f3], g[f3] || []);
      }(f2.mode);
      var b2 = B(f2.text), o3 = B(f2.target);
      o3.length || (o3 = [""]);
      var r2 = [];
      return b2.forEach(function(s4) {
        o3.forEach(function(x2) {
          D({ from: s4, to: x2, sex: f2.sex, optimal: f2.optimal }).forEach(function(s5) {
            (s5 ? H(s5.selector, s5.sex) : []).forEach(function(x3) {
              var d2 = [x3], m2 = s5.sex;
              f2.reverse && (d2 = j(x3, m2), m2 = x3.match(/([fhs1](&[ol\d]+)?|[olx]b)$/) ? 1 : 0), "chain" == f2.type ? d2.forEach(function(f3) {
                var x4 = I(f3, s5.sex);
                x4 && r2.push(x4);
              }) : "pair" == f2.type ? (d2 = j(x3, s5.sex)).forEach(function(s6) {
                var f3 = function(s7, f4) {
                  var x4 = [], d3 = [], m3 = [];
                  s7 = s7.replace(/&\d+/, ""), f4 = f4.replace(/&\d+/, "");
                  var b3 = s7.replace(/([ol])([bs])/, "x$2"), o4 = f4.replace(/([ol])([bs])/, "x$2"), r3 = s7.replace(/&[ol]/, ""), e3 = f4.replace(/&[ol]/, "");
                  for (var h2 in t2) {
                    var l2 = h2.split("#");
                    if (l2.length > 1) {
                      var w2 = H(l2[0]), M2 = H(l2[1]), n3 = w2.map(function(s8) {
                        return s8.replace(/&[ol\d]+/, "").replace(/([ol])([bs])/, "x$2");
                      }), a2 = M2.map(function(s8) {
                        return s8.replace(/&[ol\d]+/, "").replace(/([ol])([bs])/, "x$2");
                      });
                      (w2.includes(s7) && M2.includes(f4) || w2.includes(f4) && M2.includes(s7)) && x4.push(t2[h2][0]), (n3.includes(b3) && a2.includes(o4) || n3.includes(o4) && a2.includes(b3)) && d3.push(t2[h2][0]), (n3.includes(r3) && a2.includes(e3) || n3.includes(e3) && a2.includes(r3)) && m3.push(t2[h2][0]);
                    }
                  }
                  return x4.length || (x4 = d3), x4.length || (x4 = m3), x4;
                }(x3, s6);
                r2 = r2.concat(f3);
              }) : d2.forEach(function(s6) {
                var f3 = A(s6);
                f3.length || (f3 = A(m2 + "," + s6)), r2 = r2.concat(f3);
              });
            });
          });
        });
      }), x(new Set(r2));
    };
    return J.data = S, J.dataCount = Object.keys(S).length, J.setMode = function(s3, f2) {
      y[s3] = Object.assign(y[s3] || {}, f2);
    }, J;
  });
})(relationship_min);
const relationship = relationship_minExports;
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onShareTimeline = /* @__PURE__ */ createHook(ON_SHARE_TIMELINE);
const onShareAppMessage = /* @__PURE__ */ createHook(ON_SHARE_APP_MESSAGE);
exports._export_sfc = _export_sfc;
exports.createSSRApp = createSSRApp;
exports.e = e;
exports.index = index;
exports.n = n;
exports.o = o;
exports.onShareAppMessage = onShareAppMessage;
exports.onShareTimeline = onShareTimeline;
exports.p = p;
exports.relationship = relationship;
exports.resolveComponent = resolveComponent;
exports.s = s;
exports.sr = sr;
exports.t = t;
