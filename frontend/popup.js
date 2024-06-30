document.getElementById('checkButton').addEventListener('click', async () => {    
    const resultDiv = document.getElementById('result');
    const apiUrl = document.getElementById('urlInput');
    resultDiv.style.display = 'none';
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    if (tab.url) {
        try {
            const response = await fetch(apiUrl.value, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({url: tab.url}),
            });
            const data = await response.json();
            resultDiv.textContent = `${data.result}`;
            resultDiv.classList.remove('alert-danger', 'alert-success'); // Remove specific styling for phishing check
            if (data.result === "Phishing") {
                resultDiv.classList.add('alert-danger');
            } else {
                resultDiv.classList.add('alert-success');
            }
            resultDiv.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            resultDiv.textContent = 'Error retrieving website description.';
            resultDiv.classList.add('alert-danger');
            resultDiv.style.display = 'block';
        }
    } else {
        console.log('No URL found in current tab');
    }
});