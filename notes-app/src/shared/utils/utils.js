
export function nextItemId(appStore) {
    const maxId = appStore.reduce((maxId, storeItem) => Math.max(storeItem.id, maxId), -1)
    return maxId + 1
}