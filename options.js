document.getElementById('save').addEventListener('click', () => {
  const customSetting = document.getElementById('customSetting').value;
  localStorage.setItem('customSetting', customSetting);
  console.log('Custom setting saved:', customSetting);
});

document.getElementById('saveFontSize').addEventListener('click', () => {
  const fontSize = document.getElementById('fontSize').value;
  chrome.storage.sync.set({'fontSize': fontSize}, () => {
    console.log('Font size saved:', fontSize);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['customSetting', 'fontSize'], (data) => {
    document.getElementById('customSetting').value = data.customSetting || '';
    document.getElementById('fontSize').value = data.fontSize || 'medium';
  });
});

document.getElementById('saveTextColor').addEventListener('click', () => {
  const textColor = document.getElementById('textColor').value;
  chrome.storage.sync.set({'textColor': textColor}, () => {
    console.log('Text color saved:', textColor);
  });
});

document.getElementById('toggleReadingMode').addEventListener('click', () => {
  chrome.storage.sync.get('readingModeEnabled', (data) => {
    const isEnabled = !data.readingModeEnabled;
    chrome.storage.sync.set({'readingModeEnabled': isEnabled}, () => {
      console.log('Reading mode:', isEnabled ? 'Enabled' : 'Disabled');
    });
  });
});