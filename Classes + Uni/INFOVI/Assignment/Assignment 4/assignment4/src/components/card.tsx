const Card = ({bigText, infoText}) => {
    return (
        <div className="bg-base-100 text-primary shadow-lg rounded-lg p-6">
          <h2 className="text-4xl font-bold mb-2">{bigText}</h2>
          <p className="text-lg">{infoText}</p>
        </div>
    )
}

export default Card;