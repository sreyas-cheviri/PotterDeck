let characters = [];

const getHarryPotterData = async  () => {
    const loader = document.getElementById('loading');
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();
        return data;
    } catch (error) {
        const error1 = error;
        console.log("error", error);
        loader.innerHTML=error1;
    }
}


async function filterCards() {
    characters = await getHarryPotterData();
    
    const input = document.getElementById('search-bar').value.toLowerCase();
    const house = document.getElementById('house-filter').value;
    const container = document.getElementById('cards-container');
    const loader = document.getElementById('loading');
    container.innerHTML = ''; // Clear existing cards

   
    const filteredCharacters = characters.filter(character =>
        (house === 'all' || character.house === house) &&
        character.name.toLowerCase().includes(input)
    );

    filteredCharacters.forEach(character => {
        const card = createCard(character);
        container.appendChild(card);
        loader.innerHTML=`<i class="fa-solid fa-angle-down"></i>`;
    });
}


function createCard(character) {
    const card = document.createElement('div');
    card.classList.add('card');

    const imageUrl = character.image ? character.image : 'imgs/41d8375f3237702fed8b274ae68306ab.jpg';
    card.innerHTML = `
        <img src="${imageUrl}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p>Species: ${character.species || "Unknown"}</p>
        <p>Ancestry: ${character.ancestry || "Unknown"}</p>
        <p>House: ${character.house || "Unknown"}</p>
    `;

    return card;
}
