const jimp = require('jimp');
const uniqueRandomArray = require('unique-random-array');
const friendsData = require('./data');

const friends = async (appname, filename, dp, myname, gender) => {
  const loadAll = async () => {
    const jimpImage = jimp.read(dp);
    let r;
    gender === 'female' ? (r = uniqueRandomArray(friendsData.charNamesFemales)) : (r = uniqueRandomArray(friendsData.charNamesMales));
    const font = jimp.loadFont('utils/fonts/agreloy/30.fnt');
    let random = {};
    random = r();
    const resultImage = jimp.read(`images/resultImages/${appname}/bg.jpg`);
    const charImage = jimp.read(`images/resultImages/${appname}/${random.pic}`);
    const watermark = jimp.read(`images/watermark.png`);
    return Promise.all([jimpImage, font, resultImage, random.name, charImage, watermark]);
  };

  const jimpFunctions = async () => {
    resultImage.blit(jimpImage, 45, 162);
    resultImage.blit(watermark, 600, 350);
    resultImage.blit(charImage, 586, 162);
    resultImage.print(
      font,
      35,
      110,
      {
        text: myname.charAt(0).toUpperCase() + myname.slice(1),
        alignmentX: jimp.HORIZONTAL_ALIGN_LEFT,
        alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
      },
      750,
      400
    );

    resultImage.print(
      font,
      0,
      -75,
      {
        text: charName,
        alignmentX: jimp.HORIZONTAL_ALIGN_RIGHT,
        alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
      },
      750,
      400
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
    var charName = values[3];
    var charImage = values[4];
    var watermark = values[5];
    await jimpImage.resize(138, 125);
    await charImage.resize(138, 125);
    const FileName = await jimpFunctions();
    return FileName;
  } catch (error) {
    console.log(error);
  }
};

module.exports = friends;
