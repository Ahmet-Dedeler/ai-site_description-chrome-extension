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