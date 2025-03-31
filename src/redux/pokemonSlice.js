import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define una acción asíncrona para obtener los detalles de los Pokémon
export const fetchPokemon = createAsyncThunk("pokemon/fetchPokemon", async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();
    const details = await Promise.all(data.results.map(pokemon => fetch(pokemon.url).then(res => res.json())));
    return details;
});

// Definir el slice de Redux
const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        list: [],
        filteredList: [],
        loading: false,
        error: null,
        searchTerm: "",
        currentPage: 1,
    },
    reducers: {
        //setea el searchTerm, filtra la lista y resetea la paginacion
        setSearchTerm: (state, action) => {
        state.searchTerm = action.payload;
        state.filteredList = state.list.filter(p => p.name.toLowerCase().includes(action.payload.toLowerCase()));
        state.currentPage = 1; // Resetea a la primera página después de la búsqueda
        },
        setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
        }
    },
    //maneja las acciones asincronas de redux
    extraReducers: (builder) => {   
        builder
        .addCase(fetchPokemon.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchPokemon.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
            state.filteredList = action.payload;
        })
        .addCase(fetchPokemon.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
    });

export const { setSearchTerm, setCurrentPage } = pokemonSlice.actions;
export default pokemonSlice.reducer;
