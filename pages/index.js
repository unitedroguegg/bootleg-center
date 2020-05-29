import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>UR Bootleg Center</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#0070f3"/>
        <meta
          name="description"
          content="Website for United Rogue's Bootleg Streamers"
        />
        <link rel="apple-touch-icon" href="/logo192.png"/>
        <link rel="manifest" href="/manifest.json"/>
      </Head>

      <main>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <h1 className="title">
          UR Bootleg Center
        </h1>

        <p className="description">
          For all your United Rogue Bootleg stream needs
        </p>

        <div className="grid">
          <Link href="/overlay-maker/">
            <a className="card">
              <h3>Overlay Maker &rarr;</h3>
              <p>Create home team and away team overlays</p>
            </a>
          </Link>

          <div className="card disabled">
            <h3><span>Coming Soon</span></h3>
            <p><span>Nothing here just yet, but we'll add more stuff soon</span></p>
          </div>

          <div className="card disabled">
            <h3><span>Coming Soon</span></h3>
            <p><span>Nothing here just yet, but we'll add more stuff soon</span></p>
          </div>

          <div className="card disabled">
            <h3><span>Coming Soon</span></h3>
            <p><span>Nothing here just yet, but we'll add more stuff soon</span></p>
          </div>
        </div>
      </main>
    </div>
  )
}
