const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

export default async function getCroppedImg(imageSrc, crop) {
  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  const croppedImgBlob = await new Promise(resolve => {
    canvas.toBlob(blob => resolve(URL.createObjectURL(blob)), "image/jpeg");
  });

  return {
    ratio: crop.width / crop.height * scaleX / scaleY,
    croppedImgBlob,
  }
}
