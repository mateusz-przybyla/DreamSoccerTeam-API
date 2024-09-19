import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

//Middleware

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page with players list

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    console.log(response);
    res.render("index.ejs", { players: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching players." });
  }
});

// Route to render the add page

app.get("/new", (req, res) => {
  res.render("modify.ejs", {
    heading: "New player profile",
    submit: "Create player",
  });
});

// Create a new player profile

app.post("/api/players", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/players`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating player profile." });
  }
});

// Route to render the edit page

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/players/${req.params.id}`);
    console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit player profile",
      submit: "Update player",
      player: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching player profile." });
  }
});

// Partially update a player profile

app.post("/api/players/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/players/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating player profile." });
  }
});

// Delete a player profile

app.get("/api/players/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/players/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting player profile." });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
