import React, { useState, useEffect } from 'react';
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import ReviewCard from './ReviewCard';

const myreview = [
   {
      id: 1,
      rating: 3,
      description: "This car is fast and nice",
      vehicle_type: "sedan",
      image: image1
   },

   {
      id: 2,
      rating: 5,
      description: "Very sleek but very expensive",
      vehicle_type: "sports",
      image: image2
   },

   {
      id: 3,
      rating: 1,
      description: "Drives like a big yellow bus",
      vehicle_type: "van",
      image: image3
   },

   {
      id: 4,
      rating: 4,
      description: "Spacious with nice interior",
      vehicle_type: "sedan",
      image: image4
   }
]

const Review = () => {
   const [review, setReview] = useState([]);
   useEffect(() => { }, [])
 
   // api fetch posts
   useEffect(() => {
     async function fetchReview() {
       try {
         const response = await fetch('http://localhost:3000/api/reviews');
         const result = await response.json();
         // console.log("result", result) ;
         setReview(result.data.review);
       } catch (error) {
         console.error(error);
       }
     }
    // fetchReview()
    console.log(myreview, "myreview")
    setReview(myreview)
   }, []);
 
 
   console.log("Review: ", review)

   return ( 
      <div style={{marginTop: "3rem"}}>
      <h1>Review</h1>
      <div className="review-container">
        {review.length > 0 &&
          review.map((review) => {
            return (
              <React.Fragment key={review.id}>
                <ReviewCard
                  review={review}
                />
              </React.Fragment>

            )
          })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        }
      </div>
      </div>
   );
    
}
 
export default Review;