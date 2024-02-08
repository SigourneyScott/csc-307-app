import express from "express";
import cors from "cors";
import Users from "./user-services.js";
import userServices from "./user-services.js";
import User from "./user.js";

const app = express();
const port = 8000;
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};
const findUserById = (id) => users["users_list"].find((user) => user["id"] === id);
const removeUser = (user) => users["users_list"].splice(users["users_list"].indexOf(user), 1);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const {name, job} = req.query;
  Users.getUsers(name, job).then((result) => res.send({ users_list: result })).catch((error) => { console.log(error); });;
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  Users.findUserById(id)
    .then((result) => {
      if(result === undefined) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }})
    .catch((error) => { console.log(error); });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  Users.addUser(userToAdd).then(res.status(201).send(userToAdd)).catch((error) => { console.log(error); });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  Users.removeUser(id).then(res.status(204).send()).catch((error) => { console.log(error); });
  /*let user = findUserById(id);
  if (user === undefined) {
      res.status(404).send("Resource not found.");
  } else {  
      removeUser(user);
      res.status(204).send();
  }*/
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});