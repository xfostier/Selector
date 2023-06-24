// Ressources : https://www.vshsolutions.com/blogs/how-to-write-your-first-ios-safari-extension/
// https://developer.mozilla.org/fr/

let color = '#FA96A7'; // Keeping pink as default on first page load

const changeColor = () => {
    var selection
    if (window.getSelection) {
        selection = window.getSelection()
        if (selection.collapsed) {
            console.log("Selection is empty")
            return
        }
        if (selection.rangeCount <= 0) {
            console.log("No range in selection")
            return
        }
        var range = selection.getRangeAt(0);
        let newNode = document.createElement("selector");
        range.surroundContents(newNode);
        newNode.style.backgroundColor = color;
        console.log(offset);
        console.log(range);
        console.log(selection);
        console.log(selection.toString());
        return selection
    }
    console.log("Failed to get selection")
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.color) {
        color = request.color
        changeColor()
    }
});
