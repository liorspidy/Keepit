document.addEventListener("DOMContentLoaded", function () {
  const notesList = document.getElementById("notesList");

  chrome.storage.local.get({ notes: [] }, function (result) {
    const notes = result.notes;

    if (notes.length === 0) {
      const emptyMessage = document.createElement("div");
      emptyMessage.classList.add("emptyMessage");
      emptyMessage.textContent = "- Your list is empty -";
      notesList.appendChild(emptyMessage);
    } else {
      for (const note of notes) {
        const noteItem = createNoteItem(note);
        notesList.appendChild(noteItem);
      }
    }
  });
});

function createNoteItem(note) {
  const noteItem = document.createElement("li");
  const noteItemText = document.createElement("span");
  noteItemText.textContent = note;
  noteItem.appendChild(noteItemText);

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "close-button";

  closeButton.addEventListener("click", function () {
    const noteItem = closeButton.closest("li");
    if (noteItem) {
      const noteContent = noteItemText.textContent;

      chrome.storage.local.get({ notes: [] }, function (result) {
        const updatedNotes = result.notes.filter((n) => n !== noteContent);
        chrome.storage.local.set({ notes: updatedNotes }, function () {});
      });

      noteItem.remove();
    }
  });

  noteItem.appendChild(closeButton);
  return noteItem;
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("close-button")) {
    const closeButton = event.target;
    closeButton.click();
  }
});
