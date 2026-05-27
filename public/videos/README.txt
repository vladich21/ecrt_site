Videos in public/videos/

Homepage hero (HeroSection):
  hero-magnific.webm  — preferred in Chrome/Firefox/Edge
  hero-magnific.mp4   — fallback for Safari and older browsers

City animation — block «Москва — СПб» (HomeFutureFlagshipSections):
  On disk use the exact filename:
    City%20Animation.mp4
    City%20Animation.webm

  Bottom 50px is cropped (watermark) — see cropBottomPx in scripts/convert-videos-to-webm.mjs

  The app requests:
    /videos/City%2520Animation.webm
    /videos/City%2520Animation.mp4

Regenerate WebM from MP4:
  npm run media:webm

The script reads source MP4 and writes .webm only. Source files are never modified.
Crop (City animation watermark) is applied in the WebM output via cropBottomPx in the script.
Deploy both .webm and .mp4; the cropped MP4 on disk is the fallback for Safari.

HTML pattern used in components:
  <video>
    <source src="...webm" type="video/webm" />
    <source src="...mp4" type="video/mp4" />
  </video>
