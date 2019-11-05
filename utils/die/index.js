const jimp = require('jimp');
const uniqueRandomArray = require('unique-random-array');

const die = async (appname, filename, dp, myname, gender) => {
  const reasons = [
    'Playing PUBG too much',
    'Extensive use of facebook',
    'Jumping into a Volcano',
    'Dying at a Rock Concert',
    'Attacked by an Ant colony',
    'Eaten by Cannibals',
    'Dancing too much',
    'Listening to justin bieber songs',
    'Kidnapped by Aliens',
    'Roaming on another planet'
  ];
  const loadAll = async () => {
    const jimpImage = jimp.read(dp);
    const font = jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    const resultImage = jimp.read(`images/resultImages/${appname}/bg.jpg`);
    const frame = jimp.read(`images/frames/Dark-Frame-Transparent-Background.png`);
    const watermark = jimp.read(`images/watermark.png`);
    return Promise.all([jimpImage, font, resultImage, frame, watermark]);
  };

  const jimpFunctions = async () => {
    resultImage.blit(jimpImage, 520, 40);
    resultImage.blit(watermark, 570, 350);
    resultImage.blit(frame, 475, 7);
    resultImage.print(
      font,
      -55,
      45,
      {
        text: myname.charAt(0).toUpperCase() + myname.slice(1),
        alignmentX: jimp.HORIZONTAL_ALIGN_RIGHT,
        alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
      },
      713,
      400
    );
    resultImage.print(
      font,
      405,
      -90,
      {
        text: 'REASON :',
        alignmentX: jimp.HORIZONTAL_ALIGN_MIDDLE,
        alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
      },
      713,
      400
    );

    const r = uniqueRandomArray(reasons);
    resultImage.print(
      font,
      -20,
      -50,
      {
        text: r(),
        alignmentX: jimp.HORIZONTAL_ALIGN_RIGHT,
        alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
      },
      713,
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
    var frame = values[3];
    var watermark = values[4];
    await jimpImage.resize(150, 151);
    await frame.resize(250, 221);
    const FileName = await jimpFunctions();
    return FileName;
  } catch (error) {
    console.log(error);
  }
};

module.exports = die;
