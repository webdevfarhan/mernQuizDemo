const jimp = require('jimp');
const uniqueRandomArray = require('unique-random-array');

const wiki = async (appname, filename, dp, myname, gender) => {
  const randomMales = uniqueRandomArray([1, 2, 3, 4]);
  const randomFemales = uniqueRandomArray([5, 6, 7, 8, 9]);

  const loadAll = async () => {
    const jimpImage = jimp.read(dp);
    const font = jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    const r = gender === 'male' ? randomMales() : randomFemales();
    const resultImage = jimp.read(`images/resultImages/${appname}/${r}.png`);
    const frame = jimp.read(`images/frames/Square-Frame-Transparent-PNG.png`);
    const watermark = jimp.read(`images/watermark.png`);
    return Promise.all([jimpImage, font, resultImage, frame, watermark]);
  };

  const jimpFunctions = async () => {
    resultImage.blit(jimpImage, 14, 50);
    resultImage.blit(watermark, 10, 360);
    resultImage.blit(frame, 4, 39);
    resultImage.print(font, 200, 60, myname.charAt(0).toUpperCase() + myname.slice(1));
    resultImage.quality(90);
    resultImage.write(`results/${appname}/${filename}`);
    return filename;
  };

  try {
    const values = await loadAll();
    var jimpImage = values[0];
    var font = values[1];
    var resultImage = values[2];
    var frame = values[3];
    var watermark = values[4];
    await jimpImage.resize(150, 151);
    await frame.resize(169, 173);
    const FileName = await jimpFunctions();
    return FileName;
  } catch (error) {
    console.log(error);
  }
};

module.exports = wiki;
