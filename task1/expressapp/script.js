import express from "express";
import {fetchMetaData} from './get.js'
import fs from "fs";
import cors from 'cors'

const app = express();
const port = 4000;
const jsonParser = express.json();

app.use(cors());

await fetchMetaData();

const filePath = "data.json";

app.get("/api/anekdotes", function(_, res){    
  const content = fs.readFileSync(filePath,"utf8");
  const jokes = JSON.parse(content);

  res.send(jokes.map (({title},index)=>({title,id:index})));
});

app.get("/api/anekdotes/:id", function(req, res){     
  const id = req.params.id; 
  const content = fs.readFileSync(filePath, "utf8");
  let jokes, joke;

  try {
    jokes = JSON.parse(content);
  } catch (error) {
    jokes = [];
  }

  joke=jokes[id]

  if(joke) {
    res.send(joke);
  }
  else{
    res.status(404).send();
  } 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
