const jimp = require('jimp');
const uniqueRandomArray = require('unique-random-array');

const pubg1 = async (appname, filename, dp, myname, gender) => {
  const loadAll = async () => {
    const jimpImage = jimp.read(dp);
    const font = jimp.loadFont('utils/fonts/agreloy/30.fnt');
    const font1 = jimp.loadFont('utils/fonts/agreloy/90.fnt');
    let random = uniqueRandomArray(['97', '98', '99', '99', '99', '96']);
    let r = random();
    const resultImage = jimp.read(`images/resultImages/${appname}/${gender === 'male' ? 'bgm' : 'bgf'}.jpg`);
    const frame = jimp.read(`images/frames/Vintage-Frame-Transparent-Background.png`);
    const watermark = jimp.read(`images/watermark.png`);
    return Promise.all([jimpImage, font, resultImage, r, font1, frame, watermark]);
  };

  const jimpFunctions = async () => {
    resultImage.blit(jimpImage, 76, 157);
    resultImage.blit(frame, 70, 150);
    resultImage.blit(watermark, 650, 360);
    resultImage.print(
      font,
      220,
      40,
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
        text: `${percent}% Pro!`,
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
    var frame = values[5];
    var watermark = values[6];
    await jimpImage.resize(119, 124);
    await frame.resize(129, 135);
    const FileName = await jimpFunctions();
    return FileName;
  } catch (error) {
    console.log(error);
  }
};

module.exports = pubg1;
