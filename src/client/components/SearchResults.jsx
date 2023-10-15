// import react from "react"
// import ReviewCard from "./ReviewCard";
// import { useParams } from "react-router-dom";

// const SearchResults = () => {
//     //read the params from the url,called searchTerm from Search Bar component -(?searchTerm=" + searchTerm)
//     //check the URL here! 
//   let { searchTerm } = useParams();
//   const [review, setReview] = useState([]);
// //then we fetch all reviews
//   useEffect(() => {
//     async function fetchReview() {
//       try {
//         const response = await fetch("http://localhost:5001/api/reviews");
//         const result = await response.json();
//         // console.log("result", result) ;
//         setReview(result.data.review);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     // fetchReview()
//     console.log(myreview, "myreview");
// //filter all reviews if any of the object values includes the search terms
//     let filteredReviews = myreview.filter((r) =>
//       Object.values(r).includes(searchTerm)
//     );
//       //then we set the filtered reviews on state
//     setReview(filteredReviews);
//   }, []);

//   return (
//     <div>
//       <h1>Search Results</h1>
//         {/* we pass the filtered results to the result cards */}
//           {review.map(r => <ReviewCard review={r}></ReviewCard>) }
//     </div>
//   );
// }

// export default SearchResults