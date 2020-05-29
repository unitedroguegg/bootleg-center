import Head from "next/head";

export default function Custom404() {
  return (
    <div className="container">
      <Head>
        <title>Page Not Found - UR Bootleg Center</title>
      </Head>

      <main>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <h1 className="title">
          404 &mdash; Page Not Found
        </h1>

        <p className="description">
          We were unable to find this page; check for typos
        </p>
      </main>
    </div>
  )
}
