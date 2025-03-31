import React from "react";
import { Input, Pagination, Card, Row, Col } from "antd";
import { useEffect, useState } from "react";
import './styles.css'
import { fetchPokemon, setSearchTerm, setCurrentPage } from "./redux/pokemonSlice";
import Title from "antd/es/typography/Title";
import Meta from "antd/es/card/Meta";
import { useDispatch, useSelector } from "react-redux";


const ITEMS_PER_PAGE = 6; //para limitar las cards mostradas

function PokemonApp() {
  const dispatch = useDispatch(); //para llamar a las acciones
  const { list, filteredList, loading, searchTerm, currentPage } = useSelector(state => state.pokemon); //para obtener los estados

  //funcion para obtener los pokemon cuando se carga la app
  useEffect(() => {
    dispatch(fetchPokemon()); 
  }, [dispatch]);

  const paginatedPokemon = filteredList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

//codigo usando usestate y useeffect en vez de redux para controlar los estados
    /* const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); */

  /*   //funcion para obtener los pokemon de la api
    useEffect(() => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=151") //limita la cantidad de pokemon a 151
        .then((res) => res.json())
        .then((data) => {
          const fetches = data.results.map((pokemon) => 
            fetch(pokemon.url).then((res) => res.json())
          );
          //para obtener los detalles de cada pokemon
          Promise.all(fetches).then((details) => {
            setPokemonList(details); //guarda los detalles de los pokemon
            setFilteredPokemon(details);
          });
        });
    }, []);

    //funcion para filtrar los pokemon
    useEffect(() => {
      const filtered = pokemonList.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemon(filtered);
      setCurrentPage(1);
    }, [searchTerm, pokemonList]); */

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Title level={1} style={{ textAlign: "start", marginBottom: "20px" }}>
        Guillermo Alberto Barahona Palma
      </Title>

      <Input
        placeholder="Buscador de Pokémon..."
        className="mb-4"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        style={{
          marginBottom: "40px",
          height: "40px",
          width: "100%",
          maxWidth: "1200px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "12px",
        }}
      />
      
      <Row gutter={[16, 16]} justify="space-around">
        {paginatedPokemon.map((p) => (
          <Col key={p.id} xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card
              className="text-center"
              hoverable
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                padding: 0,
                width: "100%",
                minHeight: "250px",
              }}
              cover={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "160px",
                    width: "100%",
                    background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
                  }}
                >
                  <img
                    src={p.sprites.front_default}
                    alt={p.name}
                    width={150}
                    height={150}
                    style={{
                      display: "block"
                    }}
                  />
                </div>
              }
            >
              <Meta
                title={`#${p.id} ${p.name.toUpperCase()}`}
                style={{ textAlign: "center"}}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <Pagination
          current={currentPage}
          pageSize={ITEMS_PER_PAGE}
          total={filteredList.length}
          onChange={(page) => dispatch(setCurrentPage(page))}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}


export default PokemonApp;