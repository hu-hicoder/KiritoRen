console.log("Popup script loaded");

document.getElementById('start-screenshot').addEventListener('click', () => {
    console.log("Start Screenshot button clicked");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0 && tabs[0].id !== undefined) {
            console.log("Sending message to background script");
            chrome.runtime.sendMessage({ action: "startScreenshot", tabId: tabs[0].id }).then(response => {
                console.log("Message sent successfully");
            }).catch(error => {
                console.error("Error sending message:", error);
            });
        } else {
            console.error("No active tab found");
        }
    });
});