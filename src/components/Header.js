import pokedexLogo from "../images/Pokedex_logo.png";
import githubLogo from "../images/github-mark-white.png";

export default function Header () {
    return (
        <div className="header">
            <img className="header__logo" src={pokedexLogo} alt="Pokedex" />

            <div className='header__github-container'>
                <a href="https://github.com/" target="_blank" rel="noreferrer">
                    <img src={githubLogo} alt="Project on Github" />
                </a>
            </div>
        </div>
    );
}