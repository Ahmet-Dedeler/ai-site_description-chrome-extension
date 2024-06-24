document.getElementById('save').addEventListener('click', () => {
  const customSetting = document.getElementById('customSetting').value;
  chrome.storage.sync.set({customSetting}, () => {
    console.log('Setting saved');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('customSetting', (data) => {
    document.getElementById('customSetting').value = data.customSetting || '';
  });
});