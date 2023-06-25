browser.tabs.onUpdated.addListener => {
    browser.tabs.sendMessage(updateContent)
});
