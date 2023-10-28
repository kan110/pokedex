import { useEffect, useState } from "react";
import Type from "./Type";

export default function Overlay({toggleOverlay, pokemonData}) {
    const [speciesData, setSpeciesData] = useState();

    useEffect(() => {
        fetch(pokemonData?.species.url).then(res => res.json()).then((data) => {
            setSpeciesData(data);
        }).catch((err) => console.log(err));
    }, [pokemonData])

    const types = pokemonData?.types ?? [];
    const typeComponents = types.map(typeObj => <Type key={typeObj.slot} type={typeObj.type.name}/>);

    let classes = `focus-card type--${types[0]?.type.name}`;
    if (types.length >= 2) {
        classes += ` type2--${types[1].type.name}`;
    } 

    const height = pokemonData?.height / 10 ?? 'N/A';
    const weight = pokemonData?.weight / 10 ?? 'N/A';

    const englishEntry = speciesData?.flavor_text_entries.findLast(entry => entry.language.name === 'en');
    const flavorText = englishEntry?.flavor_text ?? 'No description available.';

    return (
        <div className="overlay" onClick={() => toggleOverlay()}>
            <div className={classes}>
                <div className="focus-card__column focus-card__column--left">
                    <div className="focus-card__text--large">
                        #{pokemonData?.id}
                    </div>

                    <img className="focus-card__img" src={pokemonData?.sprites.other[`official-artwork`].front_default} alt={`Official art of ${pokemonData?.name.toUpperCase()}`} />

                    <div className="focus-card__text--large">
                        {pokemonData?.species.name.toUpperCase()}
                    </div>

                    <div className="types-container--horizontal">
                        {typeComponents}
                    </div>

                    <div className="focus-card__dimensions">
                        <span className="focus-card__text--bold">Height</span> {height} m
                        <br/>
                        <span className="focus-card__text--bold">Weight</span> {weight} kg
                    </div>
                </div>

                <div className="focus-card__column focus-card__column--right">
                    <Stats pokemonData={pokemonData} />
                    <div className="focus-card__section-wrapper">
                        <div className="focus-card__section-label">Description</div>
                        <div className="focus-card__section focus-card__description">{flavorText}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Stats({pokemonData}) {
    const stats = pokemonData?.stats.map((statObj, index) => {
        let statName = statObj.stat.name;
        if (index === 3 | index === 4) {
            statName = statName.substr(0, 2) + statName.substr(7);
        }
        return (
            <div key={statObj.stat.name} className='stats-section__pair'>
                <div className="stats-section__name">
                    {statName.toUpperCase()}
                </div>
                <div>
                    {statObj.base_stat}
                </div>
            </div>
        )
    }) ?? [];

    return (
        <div className="focus-card__section-wrapper">
            <div className="focus-card__section-label">Base Stats</div>
            <div className="focus-card__section stats-section">
                {stats}
            </div>
        </div>
    );
    
}