let blockedWords = [];

// 1. Get words from storage
chrome.storage.local.get(['spoilers'], (res) => {
  blockedWords = res.spoilers || [];
  scanAndBlur();
});

// 2. The scanning function
function scanAndBlur() {
  if (blockedWords.length === 0) return;

  // We look for common text elements
  const elements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, b, strong');

  elements.forEach(el => {
    const text = el.innerText.toLowerCase();
    blockedWords.forEach(word => {
      if (text.includes(word) && !el.classList.contains('spoiler-blurred')) {
        el.classList.add('spoiler-blurred');
        
        // Click to reveal feature
        el.onclick = (e) => {
          e.preventDefault();
          el.classList.toggle('spoiler-unblurred');
        };
      }
    });
  });
}

// 3. The "Scroll Watcher" (MutationObserver)
// This catches new posts on YouTube/Twitter as you scroll
const observer = new MutationObserver(() => {
  scanAndBlur();
});

observer.observe(document.body, { childList: true, subtree: true });