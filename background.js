chrome.runtime.onInstalled.addListener(() => {
    console.log("Background script installed");
    chrome.contextMenus.create({
        id: "startScreenshot",
        title: "Start Screenshot",
        contexts: ["all"]
    });

    chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId === "startScreenshot" && tab.id) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: startScreenshot
            });
        }
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received message:", request);
    if (request.action === "startScreenshot" && request.tabId) {
        console.log("Executing script in tab:", request.tabId);
        chrome.scripting.executeScript({
            target: { tabId: request.tabId },
            function: startScreenshot
        });
    } else {
        console.error("Tab ID is undefined or request action is incorrect");
    }
});

function startScreenshot() {
    console.log("startScreenshot function executed");
    document.body.style.userSelect = 'none';

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.3)';
    overlay.style.zIndex = '9999';
    document.body.appendChild(overlay);

    const selectionBox = document.createElement('div');
    selectionBox.style.border = '2px dashed #FFF';
    selectionBox.style.position = 'absolute';
    selectionBox.style.display = 'none';
    overlay.appendChild(selectionBox);

    let startX, startY, isSelecting = false;

    overlay.addEventListener('mousedown', (e) => {
        console.log("mousedown event");
        startX = e.clientX;
        startY = e.clientY;
        isSelecting = true;
        selectionBox.style.left = `${startX}px`;
        selectionBox.style.top = `${startY}px`;
        selectionBox.style.width = '0';
        selectionBox.style.height = '0';
        selectionBox.style.display = 'block';
    });

    overlay.addEventListener('mousemove', (e) => {
        if (!isSelecting) return;
        console.log("mousemove event");
        const currentX = e.clientX;
        const currentY = e.clientY;
        const width = currentX - startX;
        const height = currentY - startY;
        selectionBox.style.width = `${Math.abs(width)}px`;
        selectionBox.style.height = `${Math.abs(height)}px`;
        selectionBox.style.left = `${width < 0 ? currentX : startX}px`;
        selectionBox.style.top = `${height < 0 ? currentY : startY}px`;
    });

    overlay.addEventListener('mouseup', () => {
        console.log("mouseup event");
        isSelecting = false;
        document.body.removeChild(overlay);
    });
}