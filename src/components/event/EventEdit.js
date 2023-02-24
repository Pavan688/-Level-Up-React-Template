import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGames } from "../../managers/GameManager.js"
import { updateEvent, getEvent } from '../../managers/EventManager.js'

export const EventEdit = () => {
    const navigate = useNavigate()
    const {eventId} = useParams()
    const [games, setGames] = useState([])
    const [event, setUpdateEvent] = useState({
        description: "",
        datetime: "",
        title: "",
        game: 0
    })

    useEffect(() => {
        getEvent(eventId)
        .then((data) => {
            const singleEvent = data
            setUpdateEvent(singleEvent)
        })
        }, 
        [eventId]
    )

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title Of Event: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        value={event.title}
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.title = evt.target.value
                                setUpdateEvent(copy)
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
                        value={event.description}
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.description = evt.target.value
                                setUpdateEvent(copy)
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
                        value={event.datetime}
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.datetime = evt.target.value
                                setUpdateEvent(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game-dropdown">Games</label>
                    <select
                    value={event.game.id}
                    onChange={(evt) => {
                        const copy= {...event}
                            copy.game.id = parseInt(evt.target.value) 
                            setUpdateEvent(copy)}}>
                    <option value={0} type="select" className="form-dropdown" required>Select Game</option>
                    {
                        games.map(
                            (game1) => {
                                return <option key={`game--${game1.id}`} value={game1.id}>{game1.name}</option>
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

                    const event1 = {
                        description: event.description,
                        title: event.title,
                        datetime: event.datetime,
                        game: parseInt(event.game.id)
                    }

                    // Send POST request to your API
                    updateEvent(event1, eventId)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Submit</button>


            </form>
    )
}     