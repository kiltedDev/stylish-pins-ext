console.log('Stylish Pins: Content script loaded!');

const CARD_STYLES = `
  {
    background: url(https://i.pinimg.com/736x/92/7f/57/927f5780c3ac6c145acfb0dbf69ea92f.jpg) no-repeat;
    background-origin: border-box;
    background-position: top left 86%;
    background-size: cover;
    border-radius: 1rem;
    transition: background-position 0.3s ease-in-out;
    border: 3px solid #85BB65; 
  }
`;

const buildRule = (selectors: string[], rule: string, modifier = '') =>
  selectors.reduce(
    (acc, selector, idx) => `${selector}${modifier} ${idx ? ',' : ''} ${acc}`,
    rule
  );

const getCardStyles = (cardSelectors: string[]) =>
  buildRule(cardSelectors, CARD_STYLES);
const getCardChildStyles = (cardSelectors: string[]) =>
  buildRule(cardSelectors, '{ display: none !important; }', '> *');

const styleSheet = document.createElement('style');
styleSheet.className = 'stylish-pins';

const selectorArray = [
  '[data-grid-item="true"]:has([data-test-id="pinrep-footer"])',
];

const rules = [getCardStyles(selectorArray), getCardChildStyles(selectorArray)];

styleSheet.textContent = rules.join('\n\n');

document.head.appendChild(styleSheet);
