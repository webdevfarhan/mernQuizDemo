const jimp = require('jimp');
const uniqueRandomArray = require('unique-random-array');
const pastlifeData = require('./data');

const pastlife = async (appname, filename, dp, myname) => {
  const loadAll = async () => {
    const jimpImage = jimp.read(dp);
    const font = jimp.loadFont(jimp.FONT_SANS_64_WHITE);
    const font1 = jimp.loadFont(jimp.FONT_SANS_32_WHITE);
    const resultImage = jimp.read(`images/resultImages/${appname}/bg.jpg`);
    const frame = jimp.read(`images/frames/Vintage-Frame-PNG-Transparent-Image.png`);
    const watermark = jimp.read(`images/watermark.png`);
    return Promise.all([jimpImage, font, font1, resultImage, frame, watermark]);
  };

  const jimpFunctions = async () => {
    resultImage.blit(jimpImage, 60, 200);
    resultImage.blit(watermark, 590, 350);
    resultImage.blit(frame, 47, 182);
    resultImage.print(font, 30, 80, myname.charAt(0).toUpperCase() + myname.slice(1));
    resultImage.print(
      font1,
      290,
      150,
      {
        text: random(),
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
    var random = uniqueRandomArray(pastlifeData);
    const values = await loadAll();
    var jimpImage = values[0];
    var font = values[1];
    var font1 = values[2];
    var resultImage = values[3];
    var frame = values[4];
    var watermark = values[5];
    await jimpImage.resize(100, 101);
    await frame.resize(125, 137);
    const FileName = await jimpFunctions();
    return FileName;
  } catch (error) {
    console.log(error);
  }
};

module.exports = pastlife;
