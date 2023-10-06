import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "./Components/List";
import "./App.css";


function App() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="main">
      <h1>React Search</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      <List input={inputText} />
    </div>
  );
}

import { useState } from "react";

function App() {
    const[comment, setComment] = useState("");
    const[comments, setComments] =useState([]);
    
    const onChangeHandler = () => {
        setComment(e.target.value);

    }
    return(
        <div className="main-container">
            <div className="comment-container">{comment}</div>
            <div className="comment-flexbox">
                <h3 className="comment-text">Comment</h3>
                <textarea value={comment} 
                onChange={onChangeHandler}className="input-box"/>
                <button className="comment-button">Submit</button>
            </div>
        </div>
    );
}
export default App;