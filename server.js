let express = require("express");
let path = require("path");
let app = express();

const PORT = 9000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

let characters = [
    {
        routeName: "captainamerica",
        name: "Captaini America",
        role: "Saving the world",
        age: 41,
        strengthPoints: 1000
    }, {
        routeName: "ironman",
        name: "Ironman",
        role: "Saving the world, too",
        age: 41,
        strengthPoints: 2000
    }];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});


app.get("/api/v1/characters", function (req, res) {
    return res.json(characters);

});

app.get("/api/v1/characters/:characterId", function (req, res) {
    let characterId = req.params.characterId;

    console.log(characterId);

    for (let i = 0; i < characters.length; i++) {
        if (characterId === characters[i].routeName) {
            return res.json(characters[i]);
        }
    }

    return res.json(false);
});

app.post("/api/v1/characters", function (req, res) {
    let newCharacter = req.body;

    console.log(newCharacter);

    characters.push(newCharacter);

    return res.json(newCharacter);
});

app.listen(PORT, function () {
    console.log("Avengers server listening on PORT " + PORT);
});