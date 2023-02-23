import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        name: "",
        creator: "",
        gameTypeId: 0
    })
    
    // TODO: Get the game types, then set the state
    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])


    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name Of Game: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...currentGame}
                                copy.name = evt.target.value
                                setCurrentGame(copy)
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
                        onChange={
                            (evt) => {
                                const copy = {...currentGame}
                                copy.numberOfPlayers = evt.target.value
                                setCurrentGame(copy)
                            }
                        }/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill-level">Skill Level: </label>
                    <input
                        required
                        type="number"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...currentGame}
                                copy.skillLevel = evt.target.value
                                setCurrentGame(copy)
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
                        onChange={
                            (evt) => {
                                const copy = {...currentGame}
                                copy.creator = evt.target.value
                                setCurrentGame(copy)
                            }
                        }/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game-type-dropdown">Game Type</label>
                    <select onChange={(evt) => {
                        const copy= {...currentGame}
                            copy.gameTypeId = parseInt(evt.target.value) 
                            setCurrentGame(copy)}}>
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

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        creator: currentGame.creator,
                        name: currentGame.name,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}