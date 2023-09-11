import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 6,
    min: 2,
  },
});

export const generateWords = (count) => {
  return lorem.generateWords(count);
};

export const generateSentence = (count) => {
  return lorem.generateSentences(count);
};
