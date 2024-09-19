import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
const masterKey = "XXXXXX";

//Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//1. GET a random player

app.get("/random", (req, res) => {
  const playerIndex = Math.floor(Math.random() * players.length);
  res.json(players[playerIndex]);
});

//2. GET all players

app.get("/all", (req, res) => {
  res.json(players);
});

//3. GET a specific player by id

app.get("/players/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundPlayer = players.find((player) => player.id === id);
  res.json(foundPlayer);
});

//4. GET a players by filtering on the player position

app.get("/filter", (req, res) => {
  const team = req.query.team;
  const foundPlayersByTeam = players.filter(
    (player) => player.playerTeam === team
  );
  res.json(foundPlayersByTeam);
});

//5. POST a new player

app.post("/players", (req, res) => {
  const newPlayer = {
    id: players.length + 1,
    playerName: req.body.name,
    playerTeam: req.body.team,
    playerPosition: req.body.position,
  };

  players.push(newPlayer);
  console.log(players.slice(-1));
  res.status(201).json(newPlayer);
});

//6. PATCH a player

app.patch("/players/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingPlayer = players.find((player) => id === player.id);

  const replacementPlayer = {
    id: id,
    playerName: req.body.name || existingPlayer.playerName,
    playerTeam: req.body.team || existingPlayer.playerTeam,
    playerPosition: req.body.position || existingPlayer.playerPosition,
  };

  const searchIndex = players.findIndex((player) => id === player.id);
  players[searchIndex] = replacementPlayer;

  console.log(players[searchIndex]);
  res.json(replacementPlayer);
});

//7. DELETE a specific player

app.delete("/players/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = players.findIndex((player) => player.id === id);

  if (searchIndex > -1) {
    players.splice(searchIndex, 1);
    res.sendStatus(200);
  } else {
    res.status(404).json({
      error: `Player with id: ${id} not found. No players were deleted.`,
    });
  }
});

//8. DELETE all players

app.delete("/all", (req, res) => {
  const userKey = req.query.key;

  if (userKey === masterKey) {
    players = [];
    res.sendStatus(200);
  } else {
    res
      .status(404)
      .json({ error: `You are not authorised to perform this action.` });
  }
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});

// In-memory data store

var players = [
  {
    id: 1,
    playerName: "Kylian Mbappe",
    playerTeam: "Real Madrid",
    playerPosition: "forward",
  },
  {
    id: 2,
    playerName: "Cristiano Ronaldo",
    playerTeam: "Al Nassr",
    playerPosition: "forward",
  },
  {
    id: 3,
    playerName: "Lionel Messi",
    playerTeam: "Inter Miami",
    playerPosition: "forward",
  },
];
