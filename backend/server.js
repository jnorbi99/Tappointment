const express = require("express");

const app = express();
app.use(express.json());
const fs = require("fs");

//Get request endpoint
app.get("/api/result", (req, res) => {
  try {
    //Read from json
    const data = fs.readFileSync("./data.json", "utf8");
  
    //Parse jsonSting to json object
    const item = JSON.parse(data);
  
    res.json(item.value);
  } catch (error) {
    res.status(204).send("Something wrong");
  }
  
});

//Post reguest endpoint
app.post("/api/result", (req, res) => {
  const finished = (error) => {
    if (error) {
      console.error(error);
      return;
    }
  };

  //Write json
  fs.writeFile("./data.json", JSON.stringify(req.body, null, 1), finished);

  res.status(201).send("Updated Memory");
});

app.listen(5000);
