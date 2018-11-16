import Cloud from 'react-d3-cloud';
import PropTypes from 'prop-types';

import './index.less';

const fontSizeMapper = word => Math.log2(word.value * 1000) * 3;
const rotate = word => word.value % 360;

/**
 * Accepts a list of words,
 * counts duplicated occurences and returns it in a readable
 * format for react-d3-cloud.
 * @param {array} words list of words
 * @return {array}
 * */
const mapWord = (words) => {
  const wordMap = {};

  words.forEach((word) => {
    if (!wordMap[word]) {
      wordMap[word] = { text: word, value: 0 };
    }

    wordMap[word].value += 1;
  });

  return Object.values(wordMap);
};

/**
 * Generates a wordcloud based on the list of words
 * provided.
 * Sample of words are: [
 *  'Gore Verbinski',
 *  'Gore Verbinski',
 *  'Gore Verbinski',
 *  'Rob Marshall',
 *  'Joachim Rønning',
 *  'Tim Burton'
 * ];
 * */
const WordCloud = ({ words = [] }) => {
  const mappedWords = mapWord(words);

  return <div className="wordcloud">
    <Cloud
      height={250}
      width={400}
      data={mappedWords}
      fontSizeMapper={fontSizeMapper}
      rotate={rotate}/>
  </div>;
};

WordCloud.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string),
};

export default WordCloud;
