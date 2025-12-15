// [BLOCK: CONSTANTS]
const BASE_FONT_SIZE_PX = 16;

// [BLOCK: ELEMENT REFERENCES]
const inputs = {
  px: document.getElementById('px'),
  pt: document.getElementById('pt'),
  em: document.getElementById('em'),
  rem: document.getElementById('rem'),
  percent: document.getElementById('percent'),
  vw: document.getElementById('vw')
};

const previewText = document.getElementById('previewText');

let isUpdating = false;

// [BLOCK: HELPERS]
function getPopupWidth() {
  return document.body.clientWidth;
}

function pxToUnits(px) {
  return {
    px,
    pt: px * 0.75,
    em: px / BASE_FONT_SIZE_PX,
    rem: px / BASE_FONT_SIZE_PX,
    percent: (px / BASE_FONT_SIZE_PX) * 100,
    vw: (px / getPopupWidth()) * 100
  };
}

// [BLOCK: CORE UPDATE]
function updateAll(sourceUnit, value) {
  if (isUpdating) return;
  isUpdating = true;

  let pxValue;

  switch (sourceUnit) {
    case 'px': pxValue = value; break;
    case 'pt': pxValue = value / 0.75; break;
    case 'em':
    case 'rem': pxValue = value * BASE_FONT_SIZE_PX; break;
    case 'percent': pxValue = (value / 100) * BASE_FONT_SIZE_PX; break;
    case 'vw': pxValue = (value / 100) * getPopupWidth(); break;
  }

  if (isNaN(pxValue) || pxValue < 0) {
    isUpdating = false;
    return;
  }

  const converted = pxToUnits(pxValue);

  Object.keys(inputs).forEach(unit => {
    if (unit !== sourceUnit) {
      inputs[unit].value =
        unit === 'percent'
          ? converted[unit].toFixed(0)
          : converted[unit].toFixed(2);
    }
  });

  previewText.style.fontSize = pxValue + 'px';
  isUpdating = false;
}

// [BLOCK: EVENTS]
Object.keys(inputs).forEach(unit => {
  inputs[unit].addEventListener('input', e => {
    updateAll(unit, parseFloat(e.target.value));
  });
});

// [BLOCK: INIT]
updateAll('px', 32);