const getImage = (file: File) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(img);
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = URL.createObjectURL(file);
  });
};
export default async function resizeImage(
  file: File,
  limitWidth: number,
  limitHeight: number
) {
  const image = await getImage(file);
  if (!image) return;
  const aspect = image.width / image.height;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  let canvasWidth: number;
  let canvasHeight: number;
  if (image.width > limitWidth || image.height > limitHeight) {
    // 規定サイズよりも画像が大きい場合
    if (aspect > 1) {
      // 横長画像の場合
      canvasWidth = limitWidth;
      canvasHeight = limitHeight * (image.height / image.width);
    } else {
      // 縦長画像の場合
      canvasWidth = limitWidth * (image.width / image.height);
      canvasHeight = limitHeight;
    }
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  } else {
    // 規定サイズ内の場合
    canvas.width = image.width;
    canvas.height = image.height;
    canvasWidth = image.width;
    canvasHeight = image.height;
  }
  ctx.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    0,
    0,
    canvasWidth,
    canvasHeight
  );
  return canvas.toDataURL("image/jpeg", 0.85);
}
