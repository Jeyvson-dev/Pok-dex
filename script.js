const url = 'https://pokeapi.co/api/v2/pokemon/'
pokemonSelect()
choicePokemon()
//Função para incluir os pokemons no select
function pokemonSelect() {

    for (let index = 1; index <= 151; index++) {

        var urlPokemon = url + index

        $.get(urlPokemon, (data) => {


            let pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1)

             $('#pokemon').append(`<option value="${data.id}">${pokemonName}</option>`)

        })  
    }
}
//Função para escolher o pokemon no select
function choicePokemon() {

    $('#pokemon').on('change', (e) => {

        if ($(e.target).val() == 'null') {

            $('#pokemonphoto').html('<img src="Imagens/pokemon-png-logo.webp">')
            $('#pokemonName').html('')
            $('#typeLetter').html('')
            $('#types').html('')
        } else {

            let pokemon = url + $(e.target).val()

            let pokemonPhotoid = treatPokemonId($(e.target).val())

            $('#pokemonphoto').html(`<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonPhotoid}.png"alt="Pokédex">`)

            $.get(pokemon, (data) => {

                $('#pokemonName').html(data.name.charAt(0).toUpperCase() + data.name.slice(1))
                $('#typeLetter').html('Type:')
                $('#types').html(getPokemonType(data.types))

            })
        }

    })
}
//Função para alterar o tipo do pokemon
function getPokemonType(types) {

    let type

    if (types.length < 2) {

        type = types[0].type.name.charAt(0).toUpperCase() + types[0].type.name.slice(1)

    } else {

        type = types[0].type.name.charAt(0).toUpperCase() + types[0].type.name.slice(1) + '/' + types[1].type.name.charAt(0).toUpperCase() + types[1].type.name.slice(1)


    }
    return type
}
//Função para alterar o ID do pokemon para pegar a foto dele
function treatPokemonId(id) {

    if (id < 10) {

        id = '00' + id

    } else if (id < 100) {

        id = '0' + id

    } else {

        id = id

    }

    return id


}



