const url = 'https://pokeapi.co/api/v2/pokemon/'
pokemonSelect()
choicePokemon()
//Função para incluir os pokemons no select
async function pokemonSelect() {
    for (let index = 1; index <= 151; index++) {

        var urlPokemon = url + index
        try {
            let response = await $.get(urlPokemon)
            let pokemonName = response.name.charAt(0).toUpperCase() + response.name.slice(1)

            $('#pokemon').append(`<option value="${response.id}">${pokemonName}</option>`)
        } catch (error) {
            console.error(`Erro ao buscar o Pokémon de ID ${index}:`, error)
        }
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
    let type = []

    $(types).each((index, value) => {

        type[index] = value.type.name.charAt(0).toUpperCase() + value.type.name.slice(1)
    })
    return type.join('/')
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