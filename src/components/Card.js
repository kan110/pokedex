import { useState, useEffect } from "react";
import Type from "./Type"
import Overlay from "./Overlay";

export default function Card ({pokemonEntry}) {
    const [pokemonData, setPokemonData] = useState();
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonEntry.entry_number}`).then(res => res.json()).then((data) => {
            setPokemonData(data);
        }).catch((err) => console.log(err));
    }, []);

    const types = pokemonData?.types ?? [];
    const typeComponents = types.map(typeObj => <Type key={typeObj.slot} type={typeObj.type.name}/>);

    let classes = `pokemon-card type--${types[0]?.type.name}`;
    if (types.length >= 2) {
        classes += ` type2--${types[1].type.name}`;
    }

    function toggleOverlay() {
        setIsOverlayOpen(prev => !prev);
    }

    return (
        <>
            {isOverlayOpen && <Overlay toggleOverlay={toggleOverlay} pokemonData={pokemonData}/>}

            <div onClick={() => toggleOverlay()} className={classes}>
                <span className="pokemon-card__number">
                    #{pokemonEntry.entry_number}
                </span> 

                <div className="types-container--vertical">
                    {typeComponents}
                </div>

                <img className="pokemon-card__img" src={pokemonData?.sprites.other[`official-artwork`].front_default} alt={`Official art of ${pokemonEntry.pokemon_species.name.toUpperCase()}`} />

                <span className="pokemon-card__name">
                    {pokemonEntry.pokemon_species.name.toUpperCase()}
                </span>
            </div>
        </>
    );
}

