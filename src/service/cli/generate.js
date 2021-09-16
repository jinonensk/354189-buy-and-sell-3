"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {UserCommand, ExitCode} = require(`../../constants`);
const {getRandomInt, shuffle} = require(`../../utils`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const MAX_ONE_CHAR_NUMBER = 9;
const MAX_MOCKS_COUNT = 1000;
const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_USING_SENTENCES = 5;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const getPictureFileName = (number) =>
  number > MAX_ONE_CHAR_NUMBER ? number : `0${number}`;

const generateOffers = (count, titles, categories, sentences) =>
  Array(count)
    .fill({})
    .map(() => ({
      category: [categories[getRandomInt(0, categories.length - 1)]],
      description: shuffle(sentences).slice(1, MAX_USING_SENTENCES).join(` `),
      picture: getPictureFileName(
          getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)
      ),
      title: titles[getRandomInt(0, titles.length - 1)],
      type: OfferType[
        Object.keys(OfferType)[
          Math.floor(Math.random() * Object.keys(OfferType).length)
        ]
      ],
      sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    }));

module.exports = {
  name: UserCommand.GENERATE,
  async run(args) {
    const [count] = args;
    if (count > MAX_MOCKS_COUNT) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.ERROR);
    }
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(
        generateOffers(countOffer, titles, categories, sentences)
    );

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (e) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
