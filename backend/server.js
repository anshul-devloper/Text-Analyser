const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const string = fs.readFileSync(`./uploads/${req.file.filename}`, "utf-8");
  var separateLines = string.split(/\r?\n|\r|\n/g);

  var freqMap = {};
  var freqcoOccurredMap = {};

  separateLines.forEach(function (words) {
    var word = words.replace(/[.]/g, "").split(/\s/);

    function valid(a) {
      return a != "";
    }

    let filteredword = word.filter(valid);

    for (var i = 0; i < filteredword.length - 1; i++) {
      var str = filteredword[i] + " " + filteredword[i + 1];
      if (!freqcoOccurredMap[str]) {
        freqcoOccurredMap[str] = 0;
      }
      freqcoOccurredMap[str] += 1;
    }

    filteredword.forEach(function (w) {
      if (!freqMap[w]) {
        freqMap[w] = 0;
      }
      freqMap[w] += 1;
    });
  });

  const sortable = Object.fromEntries(
    Object.entries(freqMap).sort(([, a], [, b]) => b - a)
  );

  const sortableco = Object.fromEntries(
    Object.entries(freqcoOccurredMap).sort(([, a], [, b]) => b - a)
  );

  const mostlyOccurredWords = [];
  const mostlyCoOccurredWords = [];

  var val = 0;
  for (let key in sortable) {
    mostlyOccurredWords.push(key);
    val++;
    if (val >= 5) break;
  }

  val = 0;
  for (let key in sortableco) {
    mostlyCoOccurredWords.push(key);
    val++;
    if (val >= 5) break;
  }

  const backendProcess = {
    mostlyOccurredWords,
    mostlyCoOccurredWords,
    freqMap,
  };
  console.log(backendProcess);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  res.status(200).json({
    success: true,
    backendProcess,
  });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
