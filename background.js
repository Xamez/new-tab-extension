chrome.tabs.onCreated.addListener(async (tab) => {
    const isNewTabPage = tab.pendingUrl.startsWith('edge://newtab');
    if (tab.url === '' && isNewTabPage) {
        const window = await chrome.windows.get(tab.windowId);
        if (window.state === 'fullscreen') {
            await chrome.windows.update(window.id, { state: 'maximized' });
            await chrome.tabs.create({ windowId: window.id, active: true });
            chrome.tabs.remove(tab.id);
        }
    }
});
