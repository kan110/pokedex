export default function Loading () {
    return <div className="loading">
        <div className='loading__center'>
            <img className='loading__image' src={require(`../images/Pokeball_icon.png`)} alt="" />
            <div className='loading__text'>Loading...</div>
        </div>
    </div>
}