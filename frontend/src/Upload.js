import React from "react";
import Card from "./Card";
import "./Upload.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Upload = (props) => {
  props.setFile();
  var arr1 = [];
  var arr2 = [];

  for (let key in props.data.backendProcess.freqMap) {
    arr1.push(key);
    arr2.push(props.data.backendProcess.freqMap[key]);
  }

  var chartData = {
    labels: arr1,
    datasets: [{ label: "frequency of words", data: arr2 }],
  };

  return (
    <div>
      <div className="homeHeading">FILE ANALYSES</div>
      <h1 className="headings">Top 5 mostly occurring words</h1>
      <input type="text" placeholder="search here" className="search"></input>
      <div className="container">
        {props.data &&
          props.data.backendProcess.mostlyOccurredWords.map((val, id) => (
            <Card key={id} val={val} />
          ))}
      </div>
      <h1 className="headings">Top 5 mostly Co-occurring words</h1>
      <input type="text" placeholder="search here" className="search"></input>
      <div className="container">
        {props.data &&
          props.data.backendProcess.mostlyCoOccurredWords.map((val, id) => (
            <Card key={id} val={val} />
          ))}
      </div>
      <h1 className="headings">Frequency graph of words </h1>
      <Bar data={chartData} />
    </div>
  );
};

export default Upload;
