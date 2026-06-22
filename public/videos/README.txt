Videos in public/videos/

Homepage hero (HeroSection):
  train_in_v6.webm  — preferred in Chrome/Firefox/Edge (first 8s clip)
  train_in_v6.mp4   — fallback for Safari and older browsers (trimmed 8s)
  train_in_v6-poster.webp — poster frame
  train_in_v6.source.mp4 — full source (not served; kept after trim)

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

The script reads source MP4 and writes .webm only. Source files are not modified except
train_in_v6.mp4 is replaced with an 8s trimmed H.264 fallback (backup → train_in_v6.source.mp4).
Crop (City animation watermark) is applied in the WebM output via cropBottomPx in the script.
Deploy both .webm and .mp4; the cropped MP4 on disk is the fallback for Safari.

HTML pattern used in components:
  <video>
    <source src="...webm" type="video/webm" />
    <source src="...mp4" type="video/mp4" />
  </video>
