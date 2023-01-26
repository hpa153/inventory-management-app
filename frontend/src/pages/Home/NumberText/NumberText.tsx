const NumberText = ({ num, text }: {num: string, text: string}) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  )
}

export default NumberText;
