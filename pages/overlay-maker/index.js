import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const data = JSON.parse(
    fs.readFileSync(
      path.join(
        process.cwd(),
        "public",
        "assets",
        "overlay-maker",
        "data.json"
      ),
      "utf-8"
    )
  );
  return {
    props: {
      teams: data.teams,
    },
  };
}

export default function Home({ teams }) {
  return (
    <div className="container">
      <Head>
        <title>Overlay Maker - UR Bootleg Center</title>
      </Head>

      <main>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div className="header">
          <Link href="/">
            <a>&larr; Back Home</a>
          </Link>
        </div>
        <h1 className="title">Overlay Maker</h1>

        <p className="description">Create home team and away team overlays</p>

        <form
          target="_blank"
          action="/api/overlay-maker/v1/generate"
          method="GET"
        >
          <div className="form-group">
            <h3>Instructions</h3>
            <p>
              Use the form below to select the home and away team, then click
              generate. You can then either save the image generated and import
              it as an image, or import the URL after clicking generate as a
              browser source. Next, indicate game wins{" "}
              <a href="/assets/overlay-maker/bo5_lights.zip">
                using the images in this file
              </a>
              . Lastly, indicate the current game number{" "}
              <a href="/assets/overlay-maker/game_bars.zip">
                using the images in this file
              </a>
              .
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="home">
              <h3>Home</h3>
            </label>
            <select name="home" id="home" required>
              {teams.map((team) => (
                <option value={team.short}>
                  {team.short} - {team.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="away">
              <h3>Away</h3>
            </label>
            <select name="away" id="away" required>
              {teams.map((team) => (
                <option value={team.short}>
                  {team.short} - {team.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <button type="submit">Generate &rarr;</button>
          </div>
        </form>
      </main>
    </div>
  );
}
