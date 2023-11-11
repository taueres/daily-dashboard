export const cacheData = provider => async key => {
    const storageKey = `today_cache_${key}`;
    const hit = window.localStorage.getItem(storageKey);
    if (hit !== null) {
        return JSON.parse(hit);
    }

    const newData = await provider();
    window.localStorage.setItem(storageKey, JSON.stringify(newData));

    return newData;
};