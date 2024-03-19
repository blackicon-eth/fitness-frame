import satori from "satori";
import { readFileSync } from "fs";
import { join } from "path";
import * as style from "./style_components/styles";
import fs from "fs";
import path from "path";
import sharp from "sharp";

// Loading fonts
const gothamBoldItalic = join(process.cwd(), "public/fonts/GothamBoldItalic.ttf");
const gothamBoldItalicData = readFileSync(gothamBoldItalic);

export async function localImageToFrame(event, value) {
  // creating image for calculated bmi
  if (event == "bmi") {
    const imagePath = path.join(process.cwd(), "public/frames/bmi_result.jpg");
    const buffer = fs.readFileSync(imagePath);
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

    const svg = await satori(
      <body>
        <img src={arrayBuffer} style={style.image} />
        <span style={style.bmiText}>{value}</span>
      </body>,
      {
        width: 1910,
        height: 1000,
        fonts: [
          {
            data: gothamBoldItalicData,
            name: "GothamBoldItalic",
          },
        ],
      }
    );
    return await sharp(Buffer.from(svg)).toFormat("png").toBuffer();
  }

  // creating image for calculated bf
  else if (event == "bf") {
    // TODO
    const imagePath = path.join(process.cwd(), "public/frames/bf_result.jpg");
    const buffer = fs.readFileSync(imagePath);
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

    const svg = await satori(
      <body>
        <img src={arrayBuffer} style={style.image} />
        <span style={style.bfText}>{value}</span>
      </body>,
      {
        width: 1910,
        height: 1000,
        fonts: [
          {
            data: gothamBoldItalicData,
            name: "GothamBoldItalic",
          },
        ],
      }
    );
    return await sharp(Buffer.from(svg)).toFormat("png").toBuffer();
  }

  // creating image for calories count
  else if (event == "cc") {
    // TODO
    const imagePath = path.join(process.cwd(), "public/frames/bmi_result.jpg");
    const buffer = fs.readFileSync(imagePath);
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

    const svg = await satori(
      <body>
        <img src={arrayBuffer} style={style.genericImage} />
        <span style={style.totalValueStart}>{value}</span>
      </body>,
      {
        width: 1910,
        height: 1000,
        fonts: [
          {
            data: gothamBoldItalicData,
            name: "GothamBoldItalic",
          },
        ],
      }
    );
    return await sharp(Buffer.from(svg)).toFormat("png").toBuffer();
  }
}
