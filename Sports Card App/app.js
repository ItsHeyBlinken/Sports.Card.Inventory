
// app.js

if (typeof document !== 'undefined') {
    // Your browser-specific code here
    const cardListElement = document.getElementById('cardList');
  }

function addCard() {
    const brand = document.getElementById('brand').value;
    const year = document.getElementById('year').value;
    const card_number = document.getElementById('card_number').value;
    const player_name = document.getElementById('player_name').value;

    fetch('http://localhost:3306/addCard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ brand, year, card_number, player_name }),
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message); // Display success message
        clearFields(); // Clear input fields
        getCards(); // Refresh the card list
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding card. Please try again.'); // Display error message
    });
}

function clearFields() {
    // Set the input values to an empty string
    document.getElementById('brand').value = '';
    document.getElementById('year').value = '';
    document.getElementById('card_number').value = '';
    document.getElementById('player_name').value = '';
}

function getCards() {
    fetch('http://localhost:3306/getCards')
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(cards => {
        // Handle the fetched data
        console.log(cards);
      })
      .catch(error => {
        // Handle errors more explicitly
        console.error('Error during fetch operation:', error.message);
      });    
    }
function displayCards(cards) {
    cardListElement.innerHTML = '';

    cards.forEach(card => {
        const li = document.createElement('li');
        li.textContent = `Set: ${card.brand}, Year: ${card.year}, Card Number: ${card.card_number}, Player Name: ${card.player_name}`;
        cardListElement.appendChild(li);
    });
}


// Initial display
getCards();
