import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { createEvent } from '../../managers/EventManager.js'

export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        datetime: "",
        title: "",
        gameId: 0
    })

    // TODO: Get the game types, then set the state
    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])


    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Create New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title Of Event: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...currentEvent}
                                copy.title = evt.target.value
                                setCurrentEvent(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...currentEvent}
                                copy.description = evt.target.value
                                setCurrentEvent(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="datetime">Date and Time: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="eg. March 2nd at 7p"
                        onChange={
                            (evt) => {
                                const copy = {...currentEvent}
                                copy.datetime = evt.target.value
                                setCurrentEvent(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game-dropdown">Games</label>
                    <select onChange={(evt) => {
                        const copy= {...currentEvent}
                            copy.gameId = parseInt(evt.target.value) 
                            setCurrentEvent(copy)}}>
                    <option value={0} type="select" className="form-dropdown" required>Select Game</option>
                    {
                        games.map(
                            (game) => {
                                return <option key={`game--${game.id}`} value={game.id}>{game.name}</option>
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

                    const event = {
                        description: currentEvent.description,
                        title: currentEvent.title,
                        datetime: currentEvent.datetime,
                        game: parseInt(currentEvent.gameId)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}