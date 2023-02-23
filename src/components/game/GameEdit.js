import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGame } from "../../managers/GameManager.js"
import { updateGame, getGameTypes } from '../../managers/GameManager.js'

export const GameEdit = () => {
    const navigate = useNavigate()
    const {gameId} = useParams()
    const [gameTypes, setGameTypes] = useState([])
    const [game, setUpdateGame] = useState({
        skill_level: "",
        number_of_players: 0,
        name: "",
        creator: "",
        game_type: 0
    })

    useEffect(() => {
        getGame(gameId)
        .then((data) => {
            const singleGame = data
            setUpdateGame(singleGame)
        })
        }, 
        [gameId]
    )

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name Of Game: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        value={game.name}
                        onChange={
                            (evt) => {
                                const copy = {...game}
                                copy.name = evt.target.value
                                setUpdateGame(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="creator">Number of Players: </label>
                    <input
                        required
                        type="number"
                        className="form-control"
                        value={game.number_of_players}
                        onChange={
                            (evt) => {
                                const copy = {...game}
                                copy.number_of_players = evt.target.value
                                setUpdateGame(copy)
                            }
                        }/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill-level">Skill Level: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        value={game.skill_level}
                        onChange={
                            (evt) => {
                                const copy = {...game}
                                copy.skill_level = evt.target.value
                                setUpdateGame(copy)
                            }
                        }/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="players">Creator: </label>
                    <input
                        required
                        type="text"
                        className="game-creator"
                        value={game.creator}
                        onChange={
                            (evt) => {
                                const copy = {...game}
                                copy.creator = evt.target.value
                                setUpdateGame(copy)
                            }
                        }/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game-type-dropdown">Game Type</label>
                    <select
                    value={game.game_type}
                    onChange={(evt) => {
                        const copy= {...game}
                            copy.game_type = parseInt(evt.target.value) 
                            setUpdateGame(copy)}}>
                    <option value={0} type="select" className="form-dropdown" required>Select Game Type</option>
                    {
                        gameTypes.map(
                            (type) => {
                                return <option key={`room--${type.id}`} value={type.id}>{type.game_type}</option>
                            }
                        )
                    }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game1 = {
                        creator: game.creator,
                        name: game.name,
                        number_of_players: parseInt(game.number_of_players),
                        skill_level: game.skill_level,
                        game_type: parseInt(game.game_type)
                    }

                    // Send POST request to your API
                    updateGame(game1, gameId)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Submit</button>


            </form>
    )
}     
