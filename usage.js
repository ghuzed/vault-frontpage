const maxStorage = 4000;

async function fetchProgressData() {
    try {
        const response = await fetch('usage.json');
        const data = await response.json();

        updateProgressBar(data.gigsUsed);
    } catch (error) {
        console.error('Error loading JSON data:', error);
        console.error("Using fake data for testing display locally")
        updateProgressBar(4100);
    }
}

function updateProgressBar(gigs) {
    const progressBar = document.getElementById('progress-bar');
    const currentUsageText = document.getElementById('current-usage');
    const maxUsageText = document.getElementById('max-usage');


    var percentage = gigs/maxStorage*100;

    if (percentage > 70) {
        currentUsageText.style.color = 'white';
        currentUsageText.style.fontWeight = 'bold';
        progressBar.style.backgroundColor = '#ff3c00';  // Turn red if more than 50%
    }
    
    progressBar.style.width = percentage + '%';

    if (percentage > 100) {
        currentUsageText.textContent = "FULL - GHUZE HELP";
    } else {
        currentUsageText.textContent = gigs + " GB";
    }
    
    maxUsageText.textContent = maxStorage + " GB";
}

window.onload = fetchProgressData;