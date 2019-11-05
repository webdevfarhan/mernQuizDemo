const jimp = require('jimp');
const uniqueRandomArray = require('unique-random-array');
const nameMeanData = require('./data');

const nameMean = async (appname, filename, dp, myname, gender) => {
  const loadAll = async () => {
    const jimpImage = jimp.read(dp);
    const font = jimp.loadFont('utils/fonts/agreloy/90.fnt');
    const font1 = jimp.loadFont('utils/fonts/agreloy/30.fnt');
    const resultImage = jimp.read(`images/resultImages/${appname}/bg.jpg`);
    const frame = jimp.read(`images/frames/Leaf-Frame-Transparent-PNG.png`);
    const watermark = jimp.read(`images/watermark.png`);
    return Promise.all([jimpImage, font, resultImage, font1, frame, watermark]);
  };

  const jimpFunctions = async () => {
    let firstName;
    myname.indexOf(' ') !== -1 ? (firstName = myname.split(' ')[0]) : (firstName = myname);
    resultImage.print(
      font,
      0,
      0,
      {
        text: firstName.toUpperCase(),
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_TOP
      },
      670,
      340
    );
    const alphabets = firstName.split('');
    let i;
    alphabets.length >= 10 ? (i = -65) : (i = -50);
    alphabets.forEach(a => {
      let words = nameMeanData[a.toUpperCase()];
      let r = uniqueRandomArray(words);
      resultImage.print(
        font1,
        30,
        i,
        {
          text: a.toUpperCase(),
          alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        },
        670,
        340
      );

      resultImage.print(
        font1,
        50,
        i,
        {
          text: ` = ${r()}`,
          alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        },
        670,
        340
      );

      alphabets.length >= 10 ? (i += 20) : (i += 25);
    });
    resultImage.blit(jimpImage, 450, 100);
    resultImage.blit(frame, 447, 95);
    resultImage.blit(watermark, 520, 300);
    resultImage.quality(90);
    await resultImage.write(`results/${appname}/${filename}`);
    return filename;
  };

  try {
    const values = await loadAll();
    var jimpImage = values[0];
    var font = values[1];
    var resultImage = values[2];
    var font1 = values[3];
    var frame = values[4];
    var watermark = values[5];
    await jimpImage.resize(170, 150);
    await frame.resize(180, 160);
    const FileName = await jimpFunctions();
    return FileName;
  } catch (error) {
    console.log(error);
  }
};

module.exports = nameMean;
