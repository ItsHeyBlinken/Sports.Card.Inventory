

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', debounceSearch);
    }

    // ... other setup code or function calls ...
});

const searchInput = document.getElementById('search');
let debounceTimeout;

function debounceSearch() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        searchCards();
    }, 300); // Adjust the delay as needed
}

searchInput.addEventListener('input', debounceSearch);


function searchCards() {
    const searchQuery = searchInput.value.toLowerCase();

    // Show a loading indicator (e.g., add a class to an element)
    document.getElementById('loadingIndicator').classList.add('visible');

    fetch(`http://localhost:3306/getCards?search=${searchQuery}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cards => displayCards(cards))
        .catch(error => {
            console.error('Error:', error);
            // Display an error message or handle it appropriately
            // ...
        })
        .finally(() => {
            // Hide the loading indicator (e.g., remove the class)
            document.getElementById('loadingIndicator').classList.remove('visible');
        });
}