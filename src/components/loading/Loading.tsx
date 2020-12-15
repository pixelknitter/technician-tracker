import "./loading.css"

type Props = { type?: string; message?: string }

const DEFAULT_MESSAGE = "Scouting for rogue drones..."

const Loading: React.FC<Props> = ({
  type = "loading",
  message = DEFAULT_MESSAGE,
}) => {
  const title = type === "loading" ? "Loading" : "Oops!"

  return (
    <div className="Loading-container">
      <h1>{title}</h1>
      {type === "error" ? <pre>{message}</pre> : <p>{message}</p>}
    </div>
  )
}

export { Loading }
