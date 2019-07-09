// Storage adaptor for MTProto.

// Check if chrome storage is available or not, use localStorage
window.keyPrefix = '';
window.noPrefix = false;
window.cache = {};
window.useCs = !!(window.chrome && chrome.storage && chrome.storage.local);
window.useLs = !useCs && !!window.localStorage;

function storageSetPrefix(newPrefix) {
    window.keyPrefix = newPrefix;
}

function storageSetNoPrefix() {
    window.noPrefix = true;
}

function storageGetPrefix() {
    if (window.noPrefix) {
        window.noPrefix = false;
        return '';
    }
    return window.keyPrefix;
}

function storageGetValue(keys, callback) {
    let single = false;

    if (!Array.isArray(keys)) {
        keys = Array.prototype.slice.call(arguments);
        callback = keys.pop();
        single = keys.length === 1;
    }

    let result = [],
        value,
        allFound = true;

    let prefix = storageGetPrefix(),
        i, key;

    for (i = 0; i < keys.length; i++) {
        key = keys[i] = prefix + keys[i];
        if (key.substr(0, 3) !== 'xt_' && window.cache[key] !== undefined) {
            result.push(window.cache[key]);
        }
        else if (window.useLs) {
            try {
                value = localStorage.getItem(key);
            } catch (e) {
                window.useLs = false;
            }
            try {
                value = (value === undefined || value === null) ? false : JSON.parse(value);
            } catch (e) {
                value = false;
            }
            result.push(window.cache[key] = value);
        }
        else if (!useCs) {
            result.push(window.cache[key] = false);
        } else {
            allFound = false;
        }
    }

    if (allFound) {
        return callback(single ? result[0] : result);
    }

    chrome.storage.local.get(keys, function (resultObj) {
        let value;
        result = [];
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            value = resultObj[key];
            value = value === undefined || value === null ? false : JSON.parse(value);
            result.push(window.cache[key] = value);
        }

        callback(single ? result[0] : result);
    })
}

function storageSetValue(obj, callback) {
    let keyValues = {};
    let prefix = storageGetPrefix(),
        key, value;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            value = obj[key];
            key = prefix + key;
            window.cache[key] = value;
            value = JSON.stringify(value);
            if (window.useLs) {
                try {
                    localStorage.setItem(key, value);
                } catch (e) {
                    window.useLs = false;
                }
            } else {
                keyValues[key] = value;
            }
        }
    }

    if (window.useLs || !window.useCs) {
        if (callback) {
            callback();
        }
        return;
    }

    chrome.storage.local.set(keyValues, callback);
}

function storageRemoveValue(keys, callback) {
    if (!Array.isArray(keys)) {
        keys = Array.prototype.slice.call(arguments);

        if (typeof keys[keys.length - 1] === 'function') {
            callback = keys.pop();
        }
    }
    let prefix = storageGetPrefix(),
        i, key;

    for (i = 0; i < keys.length; i++) {
        key = keys[i] = prefix + keys[i];
        delete window.cache[key];

        if (window.useLs) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                window.useLs = false;
            }
        }
    }
    if (window.useCs) {
        chrome.storage.local.remove(keys, callback);
    }
    else if (callback) {
        callback();
    }
}

function storageClear(callback) {
    if (window.useLs) {
        try {
            localStorage.clear();
        } catch (e) {
            window.useLs = false;
        }
    }

    if (window.useCs) {
        chrome.storage.local.clear(function () {
            window.cache = {};
            callback();
        })
    } else {
        window.cache = {};
        callback();
    }
}

window.ConfigStorage = {
    prefix: storageSetPrefix,
    noPrefix: storageSetNoPrefix,
    get: storageGetValue,
    set: storageSetValue,
    remove: storageRemoveValue,
    clear: storageClear,
};