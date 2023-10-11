/*import React, { useState, useEffect } from 'react';

const WriteReview = () => {
    return (
        <>
            <h1>Write Review</h1>
        </>
    );
}

export default WriteReview;*/

import React, { useState } from 'react'

const BASE_URL = "http://localhost:3000/api"

export default function CreateReview() {
    const [review, setReview] = useState({
        cartitle: "",
        comment: "",
    })

    const [token, setToken] = useState(sessionStorage.getItem("token"))

    const handleChange = (e) => {
        let name = e.target.name;

        switch (name) {
            case "cartitle":
                setReview((prev) => {
                    return { ...prev, title: e.target.value }
                })
                break;

            case "comment":
                setReview((prev) => {
                    return { ...prev, comment: e.target.value }
                })
                break;

            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("review: ", review)

        const makeReview = async () => {

            try {
                const response = await fetch(`${BASE_URL}/reviews`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        post: {
                            cartitle: review.cartitle,
                            comment: review.comment,
                        }
                    })
                });
                const result = await response.json();
                console.log(result);
                setReview({
                    cartitle: "",
                    comment: "",
                })
                return result
            } catch (err) {
                console.error(err);
            }
        }
        makeReview();

    }

    if (token) {
        return (
            <div>Write A Review
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} type="text" name="title" id="title" value={post.title} placeholder="Car Title" />
                    <textarea onChange={handleChange} name="description" id="description" value={post.description} placeholder="Comment" rows={4} cols={50}></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    } else
        return (
            <div>
                <h3>No Review</h3>
            </div>
        )


}
