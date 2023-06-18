chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("twitter.com/")) {
        chrome.tabs.sendMessage(tabId, {
            type: "Hi",
        });
    }
});