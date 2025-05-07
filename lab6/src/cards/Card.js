import './Card.css';

export default function Card({ name, imgSrc, infos }) {
  return <div className="Card">
    <h2>{name}</h2>
    <img src={imgSrc} alt={name} />
    {infos.map((info, index) => (
      <p key={index}>{info}</p>
    ))}
  </div>
}