import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Home";
import Upload from "./Upload";
import NoPage from "./NoPage";

function App() {
  const [file, setFile] = useState();
  const [data, setData] = useState();

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home file={file} setFile={setFile} data={data} setData={setData} />
          }
        ></Route>
        <Route
          exact
          path="/uploadData"
          element={<Upload data={data} setFile={setFile} file={file} />}
        ></Route>
        <Route exact path="*" element={<NoPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
