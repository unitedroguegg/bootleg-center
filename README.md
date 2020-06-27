# UR Bootleg Center
For all your United Rogue Bootleg stream needs, made using [Next.js](https://nextjs.org/) and [Vercel's Serverless Functions](https://vercel.com/docs/v2/serverless-functions/introduction), deployed to [Vercel](https://vercel.com/).

## List of Apps
### Overlay Maker
Create home team and away team overlays.

#### Notes
* Images are generated using [sharp's composite function](https://sharp.pixelplumbing.com/api-composite) (home on right, away on left).
* In the serverless function, we are remotely reading images [because of this issue](https://github.com/zeit/next.js/issues/8251). See the source file at `pages/api/overlay-maker/v1/generate.js` for more info.
* Team data, home, away and alternative images are stored at `public/assets/overlay-maker`.
