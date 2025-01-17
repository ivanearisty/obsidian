const Card = ({bigText, infoText}) => {
    return (
        <div className="bg-base-100 text-primary shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-2">{bigText}</h2>
          <p className="text-md">{infoText}</p>
        </div>
    )
}

export default Card;