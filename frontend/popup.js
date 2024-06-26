document.getElementById('checkButton').addEventListener('click', async () => {    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<div class="loading-indicator">Loading...</div>'; // Show loading indicator
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
            resultDiv.innerHTML = `<div class="description-text">Website Description: ${data.result}</div>`; // Use innerHTML for formatting
            resultDiv.classList.remove('alert-danger', 'alert-success'); // Remove specific styling for phishing check
        } catch (error) {
            console.error('Error:', error);
            resultDiv.innerHTML = '<div class="description-text">Error retrieving website description.</div>';
        }
    } else {
        console.log('No URL found in current tab');
    }
});