const input = document.getElementById('wordInput');
const btn = document.getElementById('addBtn');
const listDiv = document.getElementById('list');

// Load existing words on startup
chrome.storage.local.get(['spoilers'], (res) => {
  const list = res.spoilers || [];
  renderList(list);
});

btn.onclick = () => {
  const word = input.value.trim().toLowerCase();
  if (word) {
    chrome.storage.local.get(['spoilers'], (res) => {
      const newList = [...(res.spoilers || []), word];
      chrome.storage.local.set({ spoilers: newList }, () => {
        renderList(newList);
        input.value = '';
      });
    });
  }
};

function renderList(list) {
  listDiv.innerHTML = '';
  list.forEach((word, index) => {
    const item = document.createElement('div');
    item.className = 'word-item';
    item.innerHTML = `<span>${word}</span> <button data-idx="${index}">X</button>`;
    listDiv.appendChild(item);
  });
}