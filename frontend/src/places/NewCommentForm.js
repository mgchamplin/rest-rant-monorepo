import { useState } from "react"
import { useContext } from "react"

import { CurrentUser } from "../contexts/CurrentUser"


function NewCommentForm({ place, onSubmit }) {
    const { currentUser } = useContext(CurrentUser)

    const [comment, setComment] = useState({
        content: '',
        stars: 3,
        rant: false,
        authorId: ''
    })

    function handleSubmit(e) {
        console.log("CURRENT USER:")
        console.log(currentUser)
        console.log(currentUser.userId)
        console.log("SUBMITTING COMMENT")
        e.preventDefault()
        comment.authorId = currentUser.userId
        onSubmit(comment)
        setComment({
            content: '',
            stars: 3,
            rant: false,
            authorId: currentUser.userId
        })
    }

    if (!currentUser) {
        return <p>You must be logged in to leave a comment</p>
    }

    return (
        <form onSubmit={handleSubmit}> 
            <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="content">Content</label>
                    <textarea
                        required
                        value={comment.content}
                        onChange={e => setComment({ ...comment, content: e.target.value })}
                        className="form-control"
                        id="content"
                        name="content"
                    />
                </div>
            </div>
            <div className="row">
                
                <div className="form-group col-sm-4">
                    <label htmlFor="stars">Star Rating</label>
                    <input
                        value={comment.stars}
                        onChange={e => setComment({ ...comment, stars: e.target.value })}
                        type="range"
                        step="0.5"
                        min="1"
                        max="5"
                        id="stars"
                        name="stars"
                        className="form-control"
                    />
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="rand">Rant</label>
                    <input
                        checked={place.rant}
                        onClick={e => setComment({ ...comment, rant: e.target.checked })}
                        type="checkbox"
                        id="rant"
                        name="rant"
                        className="form-control"
                    />
                </div>
            </div>
            <input className="btn btn-primary" type="submit" value="Add Comment" />
        </form>
    )
}

export default NewCommentForm