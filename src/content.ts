console.log('Stylish Pins: Content script loaded!');

// saved for posterity, perhaps someday I'll come back to my fight with masonry and infinite scroll
const BASE_RULES = `
  [role="list"]:has([data-grid-item="true"]) { 
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  [data-grid-item="true"] {
    position: relative !important;
    transform: none !important;
    min-width: 6rem !important;
  }

  [data-grid-item="true"] img {
    position: relative !important;
  }

  [role="list"]:has([data-grid-item="true"]) [data-test-id="non-story-pin-image"] > div > div {
    padding-bottom: 0% !important;
  }
`;

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

const CARD_HOVER_RULES = `
  [data-grid-item="true"]:not(.not-sponsored):hover {
    background-position: top left 0%!important;
  }
`;

const CARD_HOVER_STYLES = `
   {
    background-position: top left;
  }
`;

const buildRule = (selectors: string[], rule: string, modifier = '') =>
  selectors.reduce(
    (acc, selector, idx) => `${selector}${modifier} ${idx ? ',' : ''} ${acc}`,
    rule
  );

const getCardStyles = (cardSelectors: string[]) =>
  buildRule(cardSelectors, CARD_STYLES);
const getCardHoverStyles = (cardSelectors: string[]) =>
  buildRule(cardSelectors, CARD_HOVER_STYLES, '::hover');
const getCardChildStyles = (cardSelectors: string[]) =>
  buildRule(cardSelectors, '{ display: none !important; }', '> *');

const cardSelectors = Array.from(
  document.querySelectorAll('div[data-test-id="pointer-events-wrapper"]')
).reduce((acc, gridItem) => {
  // Check if this grid item contains "sponsored" text
  if (!gridItem?.textContent || !/sponsored/i.test(gridItem.textContent))
    return acc;

  // Find the wrapper element that we want to hide
  const parentEl = gridItem.parentElement;

  if (!parentEl) return acc;

  const selector = Array.from(parentEl.classList)
    .map((c) => `.${CSS.escape(c)}`)
    .join('');

  acc.add(`[data-grid-item="true"]:has(${selector})`);

  return acc;
}, new Set<string>());

if (cardSelectors.size > 0) {
  const styleSheet = document.createElement('style');
  styleSheet.className = 'stylish-pins';

  const selectorArray = Array.from(cardSelectors);

  const rules = [
    getCardStyles(selectorArray),
    // getCardHoverStyles(selectorArray),
    CARD_HOVER_RULES,
    getCardChildStyles(selectorArray),
  ];

  styleSheet.textContent = rules.join('\n\n');

  document.head.appendChild(styleSheet);
}
