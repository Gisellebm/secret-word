import './GameOver.css'
const GameOver = ({retry}) => {
    return (
        <div className="game">
            <h1>Game Over</h1>
            <button onClick={retry}>Resetar jogo</button>


        </div>
    )
}

export default GameOver