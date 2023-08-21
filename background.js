chrome.contextMenus.create({
  id: "keepItContextMenu",
  title: "Add to KeepIt",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "keepItContextMenu") {
    const selectedText = info.selectionText;
    if (selectedText) {
      chrome.storage.local.get({ notes: [] }, function (result) {
        const newNotes = [...result.notes, selectedText];
        chrome.storage.local.set({ notes: newNotes }, function () {});
      });
    }
  }
});

chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.create({ url: "popup.html" });
});
