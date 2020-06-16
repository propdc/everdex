const pokedex = document.getElementById('pokedex');
const promises = [];

const fetchPokemon = () => {
    for (let i = 1; i <= 802; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_shiny'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
            weight: (result.weight*0.1).toFixed(1),
            height: (result.height*0.1).toFixed(1),
            exp: result.base_experience,
            ability: result.abilities.map(ability => ability.ability.name).join(', ')
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
          <div class="imgBx">
            <img class="card-image" src="${pokeman.image}"/>
          </div>

          <div class="content">
            <h2 class="card-title">#${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle"><b>Type:</b> ${pokeman.type}.<br>
              <b>Height:</b> ${pokeman.height} m.<br>
              <b>Weight:</b> ${pokeman.weight} kg.<br>
              <b>Base Experience:</b> ${pokeman.exp}.<br>
              <b>Abilities:</b> ${pokeman.ability}.
            </p>
          </div>
        </li>
    `
        )
        .join('');

    pokedex.innerHTML = pokemonHTMLString;

};

fetchPokemon();
