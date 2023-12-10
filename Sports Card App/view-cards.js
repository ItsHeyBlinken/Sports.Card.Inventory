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

    // Show a loading indicator
    // (You can implement this by adding/removing a CSS class or manipulating the DOM)
    // ...

    fetch(`http://localhost:3000/getCards?search=${searchQuery}`)
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
            // Hide the loading indicator
            // ...
        });
}
