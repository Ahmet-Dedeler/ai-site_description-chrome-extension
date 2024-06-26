document.getElementById('checkButton').addEventListener('click', async () => {    
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'none';
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    if (tab.url) {
        try {
            const response = await fetch('http://localhost:8000/check_url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({url: tab.url}),
            });
            const data = await response.json();
            resultDiv.textContent = `Website Description: ${data.result}`;
            resultDiv.classList.remove('alert-danger', 'alert-success'); // Remove specific styling for phishing check
            resultDiv.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('result').textContent = 'Error retrieving website description.';
        }
    } else {
        console.log('No URL found in current tab');
    }
});