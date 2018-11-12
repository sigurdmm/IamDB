import './index.less';

const coverimages = [
  'https://media.giphy.com/media/XUTz8zpPF458I/giphy.gif',
  'https://media.giphy.com/media/hCm2X1kXxjyZq/giphy.gif',
  'https://media.giphy.com/media/xpBiaXFbVUtTa/giphy.gif',
  'https://media.giphy.com/media/PrGNf7O36heCs/giphy.gif',
  'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif',
  'https://media.giphy.com/media/3ohzdUi5U8LBb4GD4s/giphy.gif',
  'https://media.giphy.com/media/3oEjI1erPMTMBFmNHi/giphy.gif',
];

const selectRandomItem = list => list[Math.floor(Math.random() * list.length)];

/**
 * Renders a background color at random, from the list of coverimages.
 * */
const ApplicationAnimationCover = props => <div
  {...props}
  className={`applicationanimationcover ${props.className || ''}`}
  style={{ backgroundImage: `background-image: ${selectRandomItem(coverimages)}` }}/>;

export default ApplicationAnimationCover;
