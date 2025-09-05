// The script logic to inject, as a function
function reportCleanerScript() {
  // Remove modal/auth div
  var modal = document.querySelector('div.fixed.inset-y-0.right-0.left-0.z-101.mx-auto.flex.items-center.justify-center');
  if (modal) modal.remove();

  // Expand all info tabs by clicking (not just setting attribute)
  function expandAllDropdowns() {
    document.querySelectorAll('button[aria-expanded="false"]').forEach(btn => btn.click());
  }

  // Helper to remove a section by searching for a unique child
  function removeSectionByChild(selector, childSelector) {
    var candidates = document.querySelectorAll(selector);
    for (var i = 0; i < candidates.length; i++) {
      if (candidates[i].querySelector(childSelector)) {
        candidates[i].remove();
        return true;
      }
    }
    return false;
  }

  // Helper to remove the last matching section
  function removeLastSection(selector) {
    var candidates = document.querySelectorAll(selector);
    if (candidates.length) {
      candidates[candidates.length - 1].remove();
      return true;
    }
    return false;
  }

  // Retry logic for late-loaded content and dropdowns
  var tries = 0;
  var maxTries = 20;
  var interval = setInterval(function() {
    expandAllDropdowns();
    var rhsDone = removeSectionByChild('div[class*="overflow-hidden"][class*="rounded-"][class*="h-[430px]"]', '#onemind-widget');
    var lastDone = removeLastSection('div[class*="relative"][class*="mb-10"][class*="rounded-"][class*="bg-cover"][class*="mt-10"]');
    if ((rhsDone && lastDone) || ++tries > maxTries) clearInterval(interval);
  }, 500);
}

// Connect Activate button
document.getElementById('activate').onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: reportCleanerScript
    }, () => {
      document.getElementById('status').textContent = 'Script injected!';
    });
  });
};





// Connect Prepare for Print button

document.getElementById('prepareprint').onclick = function() {
  document.getElementById('status').textContent = 'Preparing page...';
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: function() {
        // Replace all visible OWNER with TABLETURNERR
        function walk(node) {
          if (node.nodeType === 3) { // Text node
            node.nodeValue = node.nodeValue.replace(/OWNER/g, 'TABLETURNERR');
          } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
            for (var i = 0; i < node.childNodes.length; i++) {
              walk(node.childNodes[i]);
            }
          }
        }
        walk(document.body);
        // Change the document title
        document.title = 'Tableturnerr Report';
  // Change the path in the address bar (not the domain)
  history.replaceState({}, '', '/Tableturnerr-Report');
  // Open print dialog
  window.print();
      },
      world: 'MAIN'
    }, () => {
      document.getElementById('status').textContent = 'Ready to print!';
    });
  });
};
