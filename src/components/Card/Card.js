import "./Card.css"

export const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="pokemon_img" />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardType">
        <h4>タイプ</h4>
        {pokemon.types.map((type, i) => (
          <div className="typeName" key={i}>{type.type.name}</div>
        ))}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">重さ: {pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">高さ: {pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">アビリティ: {pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  )
}