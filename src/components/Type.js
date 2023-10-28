export default function Type({type}) {
    const properType = type.charAt(0).toUpperCase() + type.slice(1);
    return (
        <img className="type__img" src={require(`../images/${properType}_icon_SwSh.png`)} alt={`${properType}`} />
    );
}