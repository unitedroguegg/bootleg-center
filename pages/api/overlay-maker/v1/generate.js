const sharp = require("sharp");
const request = require("request-promise").defaults({ encoding: null });

module.exports = async (req, res) => {
  const BASE_PATH = `http://${req.headers.host}/assets/overlay-maker`;
  const HOME_DIR = `${BASE_PATH}/home`;
  const AWAY_DIR = `${BASE_PATH}/away`;
  const ALT_DIR = `${BASE_PATH}/alt`;

  let data = JSON.parse(
    await request.get(`${BASE_PATH}/data.json`).catch((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          ok: false,
          message: "Something went wrong while trying to generate the image",
        });
      }
    })
  );
  let homeTeam = req.query.home.toUpperCase();
  let awayTeam = req.query.away.toUpperCase();
  let homeTeamIsValid = false;
  let awayTeamIsValid = false;
  let validationMessage = "";

  // Validate home and away teams exist
  if (homeTeam !== awayTeam) {
    for (let team of data.teams) {
      if (team.short === homeTeam) {
        homeTeamIsValid = true;
      }
      if (team.short === awayTeam) {
        awayTeamIsValid = true;
      }
    }
    if (!homeTeamIsValid && !awayTeamIsValid) {
      validationMessage =
        "Home and away teams was not found. Check their abbreviations.";
    } else if (!homeTeamIsValid) {
      validationMessage = "Home team was not found. Check its abbreviation.";
    } else if (!awayTeamIsValid) {
      validationMessage = "Away team was not found. Check its abbreviation.";
    }
  } else {
    validationMessage = "Home and away team cannot be the same";
  }

  if (!homeTeamIsValid || !awayTeamIsValid) {
    return res.status(400).json({
      ok: false,
      message: validationMessage,
    });
  }

  // Convert to alternative directory if needed
  let home = `${HOME_DIR}/${homeTeam}.png`;
  let away = `${AWAY_DIR}/${awayTeam}.png`;

  for (let alt of data.alts) {
    if (homeTeam === alt.home && awayTeam === alt.away) {
      if (alt.alt === "away") {
        away = `${ALT_DIR}/${awayTeam}.png`;
      } else if (alt.alt === "home") {
        home = `${ALT_DIR}/${homeTeam}.png`;
      }
    }
  }

  home = await request.get(home).catch((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        ok: false,
        message: "Something went wrong while trying to generate the image",
      });
    }
  });

  away = await request.get(away).catch((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        ok: false,
        message: "Something went wrong while trying to generate the image",
      });
    }
  });

  // Combine Images
  sharp(home)
    .composite([
      {
        input: away,
      },
    ])
    .toBuffer()
    .then((outputBuffer) => {
      res.setHeader("Content-type", "image/png");
      return res.status(201).send(outputBuffer);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        ok: false,
        message:
          "Something went wrong while trying to generate the image; contact @UR Mailbox#2829 on Discord",
      });
    });
};
