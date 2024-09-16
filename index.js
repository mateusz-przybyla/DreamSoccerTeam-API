import express from "express";

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});

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
