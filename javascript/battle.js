const lista = document.getElementById('listPokemon');
var timeR;

function consultPokemon(id, num){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function(response){
        response.json()
        .then(function(pokemon){
            createPokemon(pokemon, num);
        })
    })
}

function consultPokemonRand(){
    let firstId = Math.round(Math.random() * 802)
    let secondId = Math.round(Math.random() * 802)

    if(firstId == 0){
        firstId = Math.round(Math.random() * 802)
    }else if(secondId == 0){
        secondId = Math.round(Math.random() * 802)
    }

    consultPokemon(firstId, 1)
    consultPokemon(secondId, 2)
  
    
}

function createPokemon(pokemon, num){
    //convertir datos a html
    let item = lista.querySelector(`#pokemon-${num}`)

    let imagen = item.getElementsByTagName("img")[0]
    imagen.setAttribute("src", pokemon.sprites.front_default)

    let nombre = item.getElementsByTagName("p")[0]
    nombre.textContent = pokemon.name

}

/*function selectWinner(){

    let number = 1;
    number = Math.round(Math.random() * 10);
    
    if(number <= 5){
        let item = lista.querySelector(`#pokemon-1`);
        let nombre = item.getElementsByTagName("p");
        var contenidoN = nombre[0].innerHTML.toUpperCase();

        fetch(`https://pokeapi.co/api/v2/pokemon/${contenidoN.toLowerCase()}`)
        .then(function(response){
            response.json()
            .then(function(pokemon){
                Swal.fire({
                    title: contenidoN,
                    text: "WINS THE BATTLE!",
                    imageUrl: pokemon.sprites.front_default,
                    //imageUrl: 'img/ic_launcher-web.png',
                    imageWidth: '150px'
                    });
            })
        })
    }else{
        let item = lista.querySelector(`#pokemon-2`);
        let nombre = item.getElementsByTagName("p");
        var contenidoN = nombre[0].innerHTML.toUpperCase();

        fetch(`https://pokeapi.co/api/v2/pokemon/${contenidoN.toLowerCase()}`)
        .then(function(response){
            response.json()
            .then(function(pokemon){
                Swal.fire({
                    title: contenidoN,
                    text: "WINS THE BATTLE!",
                    imageUrl: pokemon.sprites.front_default,
                    //imageUrl: 'img/ic_launcher-web.png',
                    imageWidth: '150px'
                    });
            })
        })
    }     
}*/

function selectWinner(){

    let item1 = lista.querySelector(`#pokemon-1`);
    let nombre1 = item1.getElementsByTagName("p");
    var contenidoN1 = nombre1[0].innerHTML.toLowerCase();

    let item2 = lista.querySelector(`#pokemon-2`);
    let nombre2 = item2.getElementsByTagName("p");
    var contenidoN2 = nombre2[0].innerHTML.toLowerCase();
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${contenidoN1}`)
        .then(function(response){
            response.json()
            .then(function(pokemon){
                
                let pok1Att = pokemon.stats[1].base_stat;
                let pok1Name = pokemon.name.toUpperCase();
                let pok1Img = pokemon.sprites.front_default;

                fetch(`https://pokeapi.co/api/v2/pokemon/${contenidoN2}`)
                    .then(function(responses){
                        responses.json()
                        .then(function(pokemon2){

                            let pok2Att = pokemon2.stats[1].base_stat;
                            let pok2Name = pokemon2.name.toUpperCase();;
                            let pok2Img = pokemon2.sprites.front_default;

                            if(pok1Att > pok2Att){
                                
                                Swal.fire({
                                    title: pok1Name,
                                    text: "WINS THE BATTLE WITH "+ pok1Att +" ATTACK STAT VS " +pok2Att+ " FROM " +pok2Name+"!",
                                    imageUrl: pok1Img,
                                    imageWidth: '150px'
                                    });

                            } else if(pok1Att < pok2Att){
                                
                                Swal.fire({
                                    title: pok2Name,
                                    text: "WINS THE BATTLE WITH "+ pok2Att +" ATTACK STAT VS " +pok1Att+ " FROM " +pok1Name+"!",
                                    imageUrl: pok2Img,
                                    imageWidth: '150px'
                                    });

                            } else if(pok1Att === pok2Att) {

                                Swal.fire({
                                    title: "IT'S A TIE!",
                                    text: "THE POKEMON HAVE " +pok1Att+ " IN ATTACK STAT",
                                    imageUrl: 'img/ic_launcher-web.png',
                                    imageWidth: '150px'
                                    });
                            }

                        })
                    })
            })
        })
}

function TimeRand(){
    timeR = setTimeout(consultPokemonRand, 1500);
}

consultPokemonRand();


