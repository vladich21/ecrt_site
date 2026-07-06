import { readFileSync } from "node:fs";

import sharp from "sharp";

const logoB64 = readFileSync("public/logo.png").toString("base64");
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081226"/>
      <stop offset="100%" stop-color="#142848"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="6" height="630" fill="#2f7cf6" opacity="0.85"/>
  <image href="data:image/png;base64,${logoB64}" x="96" y="155" width="320" height="320" preserveAspectRatio="xMidYMid meet"/>
  <text x="460" y="250" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="700">&#1040;&#1054; &#1048;&#1062; &#1046;&#1058;</text>
  <text x="460" y="310" fill="#d8e4f4" font-family="Arial, Helvetica, sans-serif" font-size="28">&#1048;&#1085;&#1078;&#1080;&#1085;&#1080;&#1088;&#1080;&#1085;&#1075;&#1086;&#1074;&#1099;&#1081; &#1094;&#1077;&#1085;&#1090;&#1088;</text>
  <text x="460" y="348" fill="#d8e4f4" font-family="Arial, Helvetica, sans-serif" font-size="28">&#1078;&#1077;&#1083;&#1077;&#1079;&#1085;&#1086;&#1076;&#1086;&#1088;&#1086;&#1078;&#1085;&#1086;&#1075;&#1086; &#1090;&#1088;&#1072;&#1085;&#1089;&#1087;&#1086;&#1088;&#1090;&#1072;</text>
  <rect x="460" y="390" width="420" height="2" fill="#ffffff" opacity="0.25"/>
  <text x="460" y="430" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="24" opacity="0.9">ecrt.ru</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og-default.png");
console.log("public/og-default.png updated");
