const jimp = require('jimp');
const uniqueRandomArray = require('unique-random-array');

const success = async (appname, filename, dp, myname, gender) => {
  const loadAll = async () => {
    const jimpImage = jimp.read(dp);
    const font = jimp.loadFont('utils/fonts/agreloy/60.fnt');
    const r = uniqueRandomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const resultImage = jimp.read(`images/resultImages/${appname}/${r()}.jpg`);
    const frame = jimp.read(`images/frames/Square-Frame-PNG-Photos.png`);
    const watermark = jimp.read(`images/watermark.png`);
    return Promise.all([jimpImage, font, resultImage, frame, watermark]);
  };

  const jimpFunctions = async () => {
    resultImage.blit(jimpImage, 350, 63);
    resultImage.blit(watermark, 650, 360);
    resultImage.blit(frame, 332, 51);
    resultImage.print(
      font,
      0,
      0,
      {
        text: myname,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_TOP
      },
      806,
      412
    );
    resultImage.quality(90);
    await resultImage.write(`results/${appname}/${filename}`);
    return filename;
  };

  try {
    const values = await loadAll();
    var jimpImage = values[0];
    var font = values[1];
    var resultImage = values[2];
    var frame = values[3];
    var watermark = values[4];
    await jimpImage.resize(120, 100);
    await frame.resize(156, 125);
    const FileName = await jimpFunctions();
    return FileName;
  } catch (error) {
    console.log(error);
  }
};

module.exports = success;
