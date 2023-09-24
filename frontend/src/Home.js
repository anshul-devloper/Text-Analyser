import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import Header from "./Header";

const Home = (props) => {
  const [success, setSuccess] = useState(false);

  const upload = () => {
    if (props.file === undefined) {
      alert("Please select a file");
      return;
    }

    var allowedExtensions = /(\.txt)$/i;
    if (!allowedExtensions.exec(props.file.name)) {
      alert("Please upload file having extensions .txt only.");
      return;
    }

    const limit = 5000;
    const size = props.file.size / 1024;

    if (size > limit) {
      alert(`file to big ${(size / 1000).toFixed(2)} MB`);
      return;
    }

    const formData = new FormData();
    formData.append("file", props.file);

    axios
      .post("http://localhost:8080/upload", formData)
      .then((res) => {
        console.log(res.data);
        props.setData(res.data);
      })
      .catch((er) => console.log(er));
    setSuccess(true);
  };

  return (
    <>
      <Header />
      <div className="bigContainer">
        <div className="smallContainer">
          <input
            className="fileBtn"
            type="file"
            onChange={(e) => {
              props.setFile(e.target.files[0]);
              setSuccess(false);
            }}
          />
          <span className="smallContainerSpan">
            (Only files(.txt) of size upto 5 MB)
          </span>
        </div>
        <div>
          <button type="button" className="uploadBtn" onClick={upload}>
            Upload
          </button>
        </div>
      </div>

      {success ? (
        <div className="success">
          {" "}
          <h1>File uploaded Successfully...</h1>
          <Link className="analyzeBtn" to="/uploadData">
            Click to analyse uploaded file
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
