import React, {useState, useEffect} from "react";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import Filters from "./components/Filters";
import Loading from "./components/Loading"

function App() {
  const [pokedexData, setPokedexData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    sortField: 'id'
  });

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokedex/1`).then(res => res.json()).then((data) => {
      setPokedexData(data); 
      setIsLoading(false);
    }).catch((err) => console.log(err));
  }, []);

  const cards = pokedexData?.pokemon_entries ?? [];
  let searchedCards = cards.filter((entry) => entry.pokemon_species.name.includes(filters.search));

  const compareFn = (a, b) => {
    const aName = a.pokemon_species.name;
    const bName = b.pokemon_species.name;
    if (aName < bName) {
      return -1;
    } else if (aName > bName) {
      return 1;
    } else {
      return 0;
    }
  }

  if (filters.sortField !== 'id') {
    searchedCards.sort(compareFn);
  }

  const cardsPerPage = 24;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const cardsOnPage = searchedCards.slice(indexOfFirstCard, indexOfLastCard);

  if (isLoading) {
    return <Loading />
  }

  return (
      <div className="center-container">
        <Header/>
        <Filters filters={filters} setFilters={setFilters} />

        <div className="cards-container">
            {cardsOnPage.map(pokemonEntry => <Card pokemonEntry={pokemonEntry} key={pokemonEntry.entry_number}/>)}
        </div>

        <Pagination cardsPerPage={cardsPerPage} totalCards={searchedCards.length} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </div>
  );
}

export default App;
