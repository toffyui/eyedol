import { Canvas, createCanvas, registerFont, loadImage } from "canvas";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { EnTexts } from "../../locales/en";
import { JaTexts } from "../../locales/ja";

interface SeparatedText {
  line: string;
  remaining: string;
}

const createTextLine = (canvas: Canvas, text: string): SeparatedText => {
  const context = canvas.getContext("2d");
  const MAX_WIDTH = 450 as const;
  for (let i = 0; i < text.length; i += 1) {
    const line = text.substring(0, i + 1);

    if (context.measureText(line).width > MAX_WIDTH) {
      return {
        line,
        remaining: text.substring(i + 1),
      };
    }
  }

  return {
    line: text,
    remaining: "",
  };
};

const createTextLines = (canvas: Canvas, text: string): string[] => {
  const lines: string[] = [];
  let currentText = text;

  while (currentText !== "") {
    const separatedText = createTextLine(canvas, currentText);
    lines.push(separatedText.line);
    currentText = separatedText.remaining;
  }
  return lines;
};

const createOgp = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { la, model, uuid } = req.query;
  const t = la === "ja" ? JaTexts : EnTexts;
  const WIDTH = 1200 as const;
  const HEIGHT = 630 as const;
  const DX = 0 as const;
  const DY = 0 as const;
  const canvas = createCanvas(WIDTH, HEIGHT);
  const drawText = "ここににゅうりょくしたい文字を入れます";

  const ctx = canvas.getContext("2d");
  registerFont(path.resolve("./fonts/NotoSansJP-Regular.otf"), {
    family: "Noto",
  });

  ctx.fillStyle = "#fff";
  ctx.fillRect(DX, DY, WIDTH, HEIGHT);

  const image = `${process.env.NEXT_PUBLIC_OGP_ENDPOINT}/${uuid}.png`;
  const backgroundImage = await loadImage(image);
  ctx.drawImage(backgroundImage, 0, 0, HEIGHT, HEIGHT);

  ctx.fillStyle = "#000";
  ctx.font = "100px ipagp";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const lines = createTextLines(canvas, drawText ?? "undefined");
  lines.forEach((line, index) => {
    const y = 314 + 95 * (index - (lines.length - 1) / 2);
    ctx.fillText(line, (WIDTH * 3) / 4, y);
  });

  ctx.font = "35px ipagp";
  ctx.fillText("#オンライン塗り絵", 1050, 550);

  const buffer = canvas.toBuffer();

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buffer.length,
  });
  res.end(buffer, "binary");
};

export default createOgp;
