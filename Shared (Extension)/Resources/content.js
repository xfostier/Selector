// Ressources : https://www.vshsolutions.com/blogs/how-to-write-your-first-ios-safari-extension/
// https://developer.mozilla.org/fr/
// https://github.com/mdn/webextensions-examples/tree/main/annotate-page
// https://stackoverflow.com/questions/43858666/browser-tabs-undefined-in-microsoft-edge-extension

let color = '#FA96A7'; // Keeping pink as default on first page load

// Colorize
const changeColor = () => {
    var selection;
    if (window.getSelection) {
        selection = window.getSelection();
        if (selection.collapsed) {
            console.log("Selection is empty");
            return;
        }
        if (selection.rangeCount <= 0) {
            console.log("No range in selection");
            return;
        }
        var range = selection.getRangeAt(0);
        let newNode = document.createElement("selector");
        range.surroundContents(newNode);
        newNode.style.backgroundColor = color;
        console.log("Content tinted");
        saveToStorage(selection);
        return selection;
    }
    console.log("Failed to get selection")
}

// Saving in browser storage
const saveToStorage = (selection) => {
    console.log("Start saving to storage");
    let url = window.location.href;
    var contentUnit = {};
    contentUnit.selection = selection;
    contentUnit.color = color;

    localStorage.setItem(url, contentUnit);
    
    console.log("Created bookmark!");
}

// Repopulate highlight when opening page
function updateContent() {
    console.log("Updating content");
  browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
        let url = window.location.href;
      return localStorage.getItem(url);
    })
    .then((storedInfo) => {
      console.log(storedInfo);
    });
}

/*
Update content when a new tab becomes active.
*/

/*
Update content when a new page is loaded into a tab.
*/
//browser.tabs.onUpdated.addListener(updateContent);

/*
When the sidebar loads, get the ID of its window,
and update its content.
*/
//browser.windows.getCurrent({populate: true}).then((windowInfo) => {
//  myWindowId = windowInfo.id;
//  updateContent();
//});

// Main receivers

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.color) {
        color = request.color;
        changeColor();
    }
    if(request.updateContent) {
        updateContent()
    }
});
