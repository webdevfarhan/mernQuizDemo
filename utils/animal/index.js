const jimp = require('jimp');
const uniqueRandomArray = require('unique-random-array');
const angryData = require('./data');

const animal = async (appname, filename, dp, name) => {
  const loadAll = async () => {
    const jimpImage = jimp.read(dp);
    const font = jimp.loadFont(jimp.FONT_SANS_16_WHITE);
    const nameFont = jimp.loadFont(jimp.FONT_SANS_32_WHITE);
    const resultImage = jimp.read(`images/resultImages/${appname}/bg.jpg`);
    const frame = jimp.read(`images/frames/Square-Frame-PNG-Transparent-Picture.png`);
    const watermark = jimp.read(`images/watermark.png`);
    return Promise.all([jimpImage, font, nameFont, resultImage, frame, watermark]);
  };

  const jimpFunctions = async () => {
    resultImage.blit(jimpImage, 30, 180);
    resultImage.blit(watermark, 640, 375);
    resultImage.blit(frame, 18, 168);
    resultImage.print(font, 300, 80, r.title);
    resultImage.print(nameFont, 350, 10, name.charAt(0).toUpperCase() + name.slice(1));
    resultImage.print(
      font,
      190,
      150,
      {
        text: r.description,
        alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
        alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
      },
      600,
      200
    );
    resultImage.quality(90);
    await resultImage.write(`results/${appname}/${filename}`);
    return filename;
  };

  try {
    let random = uniqueRandomArray(angryData);
    var r = random();
    const values = await loadAll();
    var jimpImage = values[0];
    var font = values[1];
    var nameFont = values[2];
    var resultImage = values[3];
    var frame = values[4];
    var watermark = values[5];
    await jimpImage.resize(150, 151);
    await frame.resize(170, 175);
    const FileName = await jimpFunctions();
    return FileName;
  } catch (error) {
    console.log('error : ', error);
  }
};

module.exports = animal;
