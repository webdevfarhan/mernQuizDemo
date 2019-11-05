const jimp = require('jimp');
const uniqueRandomArray = require('unique-random-array');

const pubg2 = async (appname, filename, dp, myname, gender) => {
  const loadAll = async () => {
    const jimpImage = jimp.read(dp);
    const font = jimp.loadFont('utils/fonts/agreloy/30.fnt');
    const font1 = jimp.loadFont('utils/fonts/agreloy/90.fnt');
    let random = uniqueRandomArray(['100', '100', '100', '94', '95', '100', '97', '98', '99', '99', '99', '100']);
    let r = random();
    const resultImage = jimp.read(`images/resultImages/${appname}/bg.jpg`);
    const watermark = jimp.read(`images/watermark.png`);
    return Promise.all([jimpImage, font, resultImage, r, font1, watermark]);
  };

  const jimpFunctions = async () => {
    resultImage.blit(jimpImage, 166, 145);
    resultImage.blit(watermark, 570, 360);
    resultImage.print(
      font,
      162,
      75,
      {
        text: myname.charAt(0).toUpperCase() + myname.slice(1),
        alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
        alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
      },
      806,
      412
    );

    resultImage.print(
      font1,
      -65,
      -35,
      {
        text: `${percent}% Noob!`,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
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
    var percent = values[3];
    var font1 = values[4];
    var watermark = values[5];
    await jimpImage.resize(119, 124);
    const FileName = await jimpFunctions();
    return FileName;
  } catch (error) {
    console.log(error);
  }
};

module.exports = pubg2;
