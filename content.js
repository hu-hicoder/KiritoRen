// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === 'startScreenshotMode') {
//         const overlay = document.createElement('div');
//         overlay.style.position = 'fixed';
//         overlay.style.top = '0';
//         overlay.style.left = '0';
//         overlay.style.width = '100vw';
//         overlay.style.height = '100vh';
//         overlay.style.border = '2px dashed black';
//         overlay.id = 'screenshotOverlay';
//         document.body.appendChild(overlay);

//         overlay.addEventListener('mousedown', function (event) {
//             overlay.style.border = 'none';
//             const startX = event.clientX;
//             const startY = event.clientY;
//             const selectionBox = document.createElement('div');
//             selectionBox.style.position = 'absolute';
//             selectionBox.style.border = '2px dashed red';
//             document.body.appendChild(selectionBox);

//             const onMouseMove = function (e) {
//                 const currX = e.clientX;
//                 const currY = e.clientY;
//                 selectionBox.style.left = `${Math.min(startX, currX)} px`;
//                 selectionBox.style.top = `${Math.min(startY, currY)} px`;
//                 selectionBox.style.width = `${Math.abs(currX - startX)} px`;
//                 selectionBox.style.height = `${Math.abs(currY - startY)} px`;
//             };

//             const onMouseUp = function () {
//                 document.body.removeEventListener('mousemove', onMouseMove);
//                 document.body.removeEventListener('mouseup', onMouseUp);
//             };

//             document.body.addEventListener('mousemove', onMouseMove);
//             document.body.addEventListener('mouseup', onMouseUp);
//         });

//         sendResponse({ status: 'started screenshot mode' });
//     }
// });