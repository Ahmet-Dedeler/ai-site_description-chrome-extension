document.getElementById('save').addEventListener('click', () => {
  const customSetting = document.getElementById('customSetting').value;
  localStorage.setItem('customSetting', customSetting);
  console.log('Custom setting saved:', customSetting);
});

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('customSetting', (data) => {
    document.getElementById('customSetting').value = data.customSetting || '';
  });
});