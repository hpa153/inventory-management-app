import './Card.scss';

const Card = ({children, cardClass}: {children: React.ReactNode, cardClass: string}) => {
  return (
    <div className={`card ${cardClass}`}>
      {children}
    </div>
  )
};

export default Card;
