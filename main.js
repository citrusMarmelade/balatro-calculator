const menuBtns = [
  document.getElementById('JokersBtn'),
  document.getElementById('CardsBtn'),
  document.getElementById('HandsBtn'),
  document.getElementById('BreakdownBtn'),
  document.getElementById('ModifyJokerBtn'),
];

const tabs = [
  document.getElementById('Jokers'),
  document.getElementById('Cards'),
  document.getElementById('Hands'),
  document.getElementById('Breakdown'),
  document.getElementById('ModifyJoker'),
];

let searchVal = '';

for(let i = 0; i < menuBtns.length; i++) {
  menuBtns[i].addEventListener('click', changeTab(i));
  tabs[i].style.display = "none";
}

let revertToTab = 0;
let modifyingJoker = false;
let modifyingJokerValue = 0;

let modifyingJokerValDiv = document.getElementById('modifyJokerVal');
let modifyJokerDiv = document.getElementById('modifyJoker');

function changeTab(tab) {
  return () => {
    revertToTab = tab === 4 ? revertToTab : tab;
    for(let i = 0; i < menuBtns.length; i++) {
      menuBtns[i].classList.remove('active');
      tabs[i].style.display = "none";
    }
    menuBtns[tab].classList.add('active');
    tabs[tab].style.display = "block";

    modifyingJoker = false;
  }
}

changeTab(0)();

const hands = [
  {
    name: "Flush Five",
    planet: "Eris",
    mult: 14,
    chips: 150,
    s_mult: 14,
    s_chips: 150,
    l_mult: 3,
    l_chips: 35
  },
  {
    name: "Flush House",
    planet: "Ceres",
    mult: 12,
    chips: 120,
    s_mult: 12,
    s_chips: 120,
    l_mult: 3,
    l_chips: 40
  },
  {
    name: "Five of a Kind",
    planet: "Planet X",
    mult: 10,
    chips: 100,
    s_mult: 10,
    s_chips: 100,
    l_mult: 3,
    l_chips: 35
  },
  {
    name: "Straight Flush",
    planet: "Neptune",
    mult: 8,
    chips: 100,
    s_mult: 8,
    s_chips: 100,
    l_mult: 3,
    l_chips: 40
  },
  {
    name: "Four of a Kind",
    planet: "Mars",
    mult: 7,
    chips: 60,
    s_mult: 7,
    s_chips: 60,
    l_mult: 3,
    l_chips: 30
  },
  {
    name: "Full House",
    planet: "Earth",
    mult: 4,
    chips: 40,
    s_mult: 4,
    s_chips: 40,
    l_mult: 2,
    l_chips: 25
  },
  {
    name: "Flush",
    planet: "Jupiter",
    mult: 4,
    chips: 35,
    s_mult: 4,
    s_chips: 35,
    l_mult: 2,
    l_chips: 15
  },
  {
    name: "Straight",
    planet: "Saturn",
    mult: 4,
    chips: 30,
    s_mult: 4,
    s_chips: 30,
    l_mult: 2,
    l_chips: 30
  },
  {
    name: "Three of a Kind",
    planet: "Venus",
    mult: 3,
    chips: 30,
    s_mult: 3,
    s_chips: 30,
    l_mult: 2,
    l_chips: 20
  },
  {
    name: "Two Pair",
    planet: "Uranus",
    mult: 2,
    chips: 20,
    s_mult: 2,
    s_chips: 20,
    l_mult: 1,
    l_chips: 20
  },
  {
    name: "Pair",
    planet: "Mercury",
    mult: 2,
    chips: 10,
    s_mult: 2,
    s_chips: 10,
    l_mult: 1,
    l_chips: 15
  },
  {
    name: "High Card",
    planet: "Pluto",
    mult: 1,
    chips: 5,
    s_mult: 1,
    s_chips: 5,
    l_mult: 1,
    l_chips: 10
  }
];

const handColors = [
  '#efefef',
  '#95acff',
  '#65efaf',
  '#fae37e',
  '#ffc052',
  '#f87d75',
  '#caa0ef'
];

const handLevels = document.getElementById('Hands');
const consumables = document.getElementById('consumables');

function incrementLevel(inc, handIndex) {
  const hand = hands[handIndex];
  const div = document.getElementById(hand.id);
  hand.level += inc;
  if(hand.level < 0) hand.level = 0;
  hand.mult = Math.max(1, hand.s_mult + (hand.level-1) * hand.l_mult);
  hand.chips = Math.max(0, hand.s_chips + (hand.level-1) * hand.l_chips);
  div.children[2].innerText = 'lvl.'+hand.level;
  div.children[2].style.backgroundColor = hand.level === 1 ? handColors[0] : handColors[((Math.ceil(Math.abs(hand.level)/6)*6+hand.level+4)%6)+1];
  div.children[4].children[0].innerText = numberWithCommas(hand.chips);
  div.children[4].children[1].innerText = numberWithCommas(hand.mult);

  redrawPlayfield();
}

function incrementPlanet(inc, handIndex) {
  const hand = hands[handIndex];
  const div = document.getElementById('planets-' + hand.id);
  hand.planets += inc;
  if(hand.planets < 0 || inc === 0) hand.planets = 0;
  div.children[3].innerText = hand.planets;

  redrawPlayfield();
}

function setPlanet(handIndex) {
  const hand = hands[handIndex];
  const div = document.getElementById('planets-' + hand.id);
  if(1 * div.children[3].innerText > 0) {
    hand.planets = Math.round(1 * div.children[3].innerText);
  }
  else {
    hand.planets = 0;
  }

  redrawPlayfield();
}

function setLevel(handIndex) {
  const hand = hands[handIndex];
  const div = document.getElementById(hand.id);

  if(1 * div.children[2].innerText > 0) {
    hand.level = Math.round(1 * div.children[2].innerText);
  }
  else {
    hand.level = 0;
  }

  hand.mult = Math.max(1, hand.s_mult + (hand.level-1) * hand.l_mult);
  hand.chips = Math.max(0, hand.s_chips + (hand.level-1) * hand.l_chips);
  div.children[2].style.backgroundColor = hand.level === 1 ? handColors[0] : handColors[((Math.ceil(Math.abs(hand.level)/6)*6+hand.level+4)%6)+1];
  div.children[4].children[0].innerText = numberWithCommas(hand.chips);
  div.children[4].children[1].innerText = numberWithCommas(hand.mult);

  redrawPlayfield();
}

function removeLvlText (handIndex) {
  const hand = hands[handIndex];
  const div = document.getElementById(hand.id);
  div.children[2].innerText = hand.level;

}

function addLvlText(handIndex) {
  const hand = hands[handIndex];
  const div = document.getElementById(hand.id);
  div.children[2].innerText = 'lvl.'+hand.level;
}

const jokerValueHTML = document.getElementById('jokerVal');
let jokerValue = 0;

function incrementJokerValue(inc) {
  jokerValue += inc;
  if(inc === 0) {
    jokerValue = 0;
  }
  jokerValueHTML.innerText = jokerValue;
  jredrawCards();
}

function setJokerValue() {
  if(!isNaN(jokerValueHTML.innerText)) {
    jokerValue = Math.round(jokerValueHTML.innerText * 1);
  }
  else {
    jokerValue = 0;
  }
  jredrawCards();
}

handLevels.innerHTML = '';

for(let i = 0; i < hands.length; i++) {
  hands[i].level = 1;
  hands[i].planets = 0;
  hands[i].id = hands[i].name.replace(/ /g,'');
  handLevels.innerHTML += `<div class="handLevel" id="${hands[i].id}">
    <span class="lvlBtn" onclick="incrementLevel(-1, ${i})">-</span>
    <span class="lvlBtn" onclick="incrementLevel( 1, ${i})">+</span>
    <span contenteditable="true" class="handLvl" onfocus="removeLvlText(${i})" onblur="addLvlText(${i})" oninput="setLevel(${i})">lvl.1</span>
    <span class="handName">${hands[i].name}</span>
    <span class="levelStat">
      <span class="levelStatB">${hands[i].chips}</span>X<span class="levelStatR">${hands[i].mult}</span>
    </span>
  </div>`;

  consumables.innerHTML += `<div class="handLevel" id="planets-${hands[i].id}" style="background-color: #89b; text-align: center;">
    <span class="lvlBtn" onclick="incrementPlanet(-1, ${i})">-</span>
    <span class="lvlBtn" onclick="incrementPlanet( 0, ${i})">0</span>
    <span class="lvlBtn" onclick="incrementPlanet( 1, ${i})">+</span>
    <span contenteditable="true" class="handLvl" oninput="setPlanet(${i})">0</span>
    <div style="display: flex;"><div style="color: #cef; width: 100%;">${hands[i].planet}</div><div style="width: 100%;">${hands[i].name}</div></dpv>
  </div>`;
}

const modifiers = {
  foil: false,
  holographic: false,
  polychrome: false,
  stone: false,
  increment: false,
  mult: false,
  wild: false,
  chance: false,
  glass: false,
  steel: false,
  double: false,
  disabled: false
};

let modifierString = ', url(assets/Enhancers.png) -71px 0px';
let modifierPostString = '';

const jmodifiers = {
  foil: false,
  holographic: false,
  polychrome: false
};

function jtoggleCardModifier(name) {
  if(('foil holographic polychrome'.indexOf(name) >= 0) && !jmodifiers[name]) {
    jmodifiers.foil = false;
    jmodifiers.holographic = false;
    jmodifiers.polychrome = false;
  }
  jmodifiers[name] = !jmodifiers[name];

  jredrawCards();
}

function toggleCardModifier(name) {
  if(('stone increment mult wild chance glass steel'.indexOf(name) >= 0) && !modifiers[name]) {
    modifiers.stone = false;
    modifiers.increment = false;
    modifiers.mult = false;
    modifiers.wild = false;
    modifiers.chance = false;
    modifiers.glass = false;
    modifiers.steel = false;
  }

  if(('foil holographic polychrome disabled'.indexOf(name) >= 0) && !modifiers[name]) {
    modifiers.foil = false;
    modifiers.holographic = false;
    modifiers.polychrome = false;
    modifiers.disabled = false;
  }
  modifiers[name] = !modifiers[name];

  if(modifiers.stone) {
    modifierString = ', url(assets/Enhancers.png) 142px 0';
  }
  else if(modifiers.increment) {
    modifierString = ', url(assets/Enhancers.png) -71px -95px';
  }
  else if(modifiers.mult) {
    modifierString = ', url(assets/Enhancers.png) -142px -95px';
  }
  else if(modifiers.wild) {
    modifierString = ', url(assets/Enhancers.png) -213px -95px';
  }
  else if(modifiers.chance) {
    modifierString = ', url(assets/Enhancers.png) -284px -95px';
  }
  else if(modifiers.glass) {
    modifierString = ', url(assets/Enhancers.png) -355px -95px';
  }
  else if(modifiers.steel) {
    modifierString = ', url(assets/Enhancers.png) -426px -95px';
  }
  else {
      modifierString = ', url(assets/Enhancers.png) -71px 0px';
  }

  if(modifiers.double) {
    modifierPostString = 'url(assets/Enhancers.png) 142px 95px, ';
  }
  else {
    modifierPostString = 'url(assets/Jokers.png) 0px -855px, ';
  }

  if(modifiers.foil) {
    modifierPostString += 'url(assets/Editions.png) -71px 0, ';
  }
  else if(modifiers.holographic) {
    modifierPostString += 'url(assets/Editions.png) -142px 0, ';
  }
  else if(modifiers.polychrome) {
    modifierPostString += 'url(assets/Editions.png) -213px 0, ';
  }
  else if(modifiers.disabled) {
    modifierPostString += 'url(assets/Editions.png) 71px 0, ';
  }

  redrawCards();
}

const cardsDiv = document.getElementById('cards');
const jcardsDiv = document.getElementById('jokers');

function cardString(i, j) {
  if(modifiers.stone) {
    return `style="background: ` +
    `${modifierPostString}${modifierString.slice(2)}"`;
  }
  else {
    return `style="background: ` +
    `${modifierPostString}url(assets/8BitDeck.png) ` +
    `-${71*j}px -${95*i}px${modifierString}"`;
  }
}

function redrawCards() {
  let txt = '';
  for(let i = 0; i < 4; i++) {
    txt += '<div>';
    for(let j = 0; j < 13; j++) {
      txt += `<div class="tooltip"><div class="playingCard" ${cardString(i, j)} onclick="addCard(${i}, ${j})" onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div></div>`;
    }
    txt += '</div>';
  }
  cardsDiv.innerHTML = txt;
}

function jokerString(i, j, modifiers) {
  let jmodifierString = 'url(assets/Jokers.png) 0px -855px, ';
  let jmodifierPostString = '';

  if(modifiers.foil) {
    jmodifierPostString = 'url(assets/Editions.png) -71px 0, ';
  }
  else if(modifiers.holographic) {
    jmodifierPostString = 'url(assets/Editions.png) -142px 0, ';
  }
  else if(modifiers.polychrome) {
    jmodifierPostString = 'url(assets/Editions.png) -213px 0, ';
  }
  else {
    jmodifierPostString = '';
  }

  switch(`${i},${j}`) {
    case '8,3': jmodifierString = `url(assets/Jokers.png) -${71*3}px -${95*9}px, `; break;
    case '8,4': jmodifierString = `url(assets/Jokers.png) -${71*4}px -${95*9}px, `; break;
    case '8,5': jmodifierString = `url(assets/Jokers.png) -${71*5}px -${95*9}px, `; break;
    case '8,6': jmodifierString = `url(assets/Jokers.png) -${71*6}px -${95*9}px, `; break;
    case '8,7': jmodifierString = `url(assets/Jokers.png) -${71*7}px -${95*9}px, `; break;
    case '12,4': jmodifierString = `url(assets/Jokers.png) -${71*2}px -${95*9}px, `; break;
  }
  return `style="background: ${jmodifierPostString}${jmodifierString}url(assets/Jokers.png) -${71*j}px -${95*i}px"`;
}

function jredrawCards() {
  let txt = '<div>';
  let count = 0;
  for(let i = 0; i < 16; i++) {
    if(i === 9) {i++;}
    for(let j = 0; j < 10; j++) {
      const title = (jokerTexts.length > i && jokerTexts[i].length > j) ? jokerTexts[i][j][0] : 'WIP';
      const description = (jokerTexts.length > i && jokerTexts[i].length > j) ? eval('`' + jokerTexts[i][j][1] + '`') : 'WIP';
      if(title.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0 || description.replace(/\<[^\>]+\>/g,'').toLowerCase().indexOf(searchVal.toLowerCase()) >= 0) {
        txt += `<div class='tooltip'><div class="jokerCard" ${jokerString(i, j, jmodifiers)} onclick="addJoker(${i}, ${j})" onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div><span class='tooltiptext'>` +
        `<span class='title'>${title}</span>` +
        `<span class='desc'><span class='descContent'>${description}</span></span>` +
        `</span></div>`;
        count++;
        if(count >= 10) {
          count = 0;
          txt += '</div><div>';
        }
      }
    }
  }
  txt += '</div>';
  jcardsDiv.innerHTML = txt;
}

redrawCards();
jredrawCards();

const jokerAreaDiv = document.getElementById('jokerArea');
const bestPlayDiv = document.getElementById('bestPlay');
const cardsInHandDiv = document.getElementById('cardsInHand');

const jokerLimitDiv = document.getElementById('jokerLimit');
const handLimitDiv = document.getElementById('handLimit');

let playfieldJokers = {};
let playfieldCards = {};

function addJoker(i, j) {
  let id = 'j'+(Math.random()+'').slice(2);
  while(playfieldJokers.hasOwnProperty(id)) {
    id = 'j'+(Math.random()+'').slice(2);
  }

  playfieldJokers[id] = {
    id,
    type: [i, j],
    modifiers: {...jmodifiers},
    value: jokerValue,
    string: jokerString(i, j, jmodifiers),
    tooltip: (jokerTexts.length > i && jokerTexts[i].length > j) ? [jokerTexts[i][j][0], eval('`' + jokerTexts[i][j][1] + '`')] : ['WIP', 'WIP']
  };

  jokerLimitDiv.innerText = Object.keys(playfieldJokers).length;

  if(Object.keys(playfieldJokers).length >= 8 && optimizeJokers) {
    toggleJoker();
  }

  redrawPlayfield();
}

function removeJoker(id) {
  delete playfieldJokers[id];

  jokerLimitDiv.innerText = Object.keys(playfieldJokers).length;

  redrawPlayfield();

  changeTab(revertToTab)();
}

function addCard(i, j) {
  let id = ((j === 10 && !modifiers.stone) ? (!modifiers.steel ? '993' : '992') : '') + (''+j).padStart(2, 0)+(4-i)+Object.keys(modifiers).map(a=>modifiers[a]?'1':'0').join('');
  while(playfieldCards.hasOwnProperty(id)) {
    id += '#';
  }

  playfieldCards[id] = {
    id,
    type: [i, j],
    modifiers: {...modifiers},
    string: cardString(i, j)
  };

  handLimitDiv.innerText = Object.keys(playfieldCards).length;

  if(Object.keys(playfieldCards).length >= 9 && optimizeJokers) {
    toggleCard();
  }

  redrawPlayfield();
}

function removeCard(id) {
  delete playfieldCards[id];

  handLimitDiv.innerText = Object.keys(playfieldCards).length;

  redrawPlayfield();
}

function redrawPlayfield() {
  calculator();

  let txt = '';
  for(let id of bestJokers) {
    txt += `<div class='tooltip'><div id="${id}" class="jokerCard" ${playfieldJokers[id].string} onclick="modifyJoker('${id}')" onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div>` +
    `<div class="removeJoker" onclick="removeJoker('${id}')">X</div>` +
    `<span class='tooltiptext'>` +
    `<span class='title'>${playfieldJokers[id].tooltip[0]}</span>` +
    `<span class='desc'><span class='descContent'>${playfieldJokers[id].tooltip[1]}</span></span>` +
    `</span>` +
    `<div style="position: absolute; top: 100%; width: 100%;">` +
    `<div class="positionButtons">` +
    `<div class="lvlBtn" onclick="moveJokerLeft('${id}')">&lt;</div>` +
    `<div class="lvlBtn" onclick="moveJokerRight('${id}')">&gt;</div>` +
    `</div>` +
    `</div>` +
    `</div>`;
  }
  jokerAreaDiv.innerHTML = txt;

  txt = '';
  for(let id of bestHand) {
    txt += `<div class="tooltip"><div id="p${id}" class="playfieldCard" ${playfieldCards[id].string} onclick="removeCard('${id}')" onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div>` +
    `<div style="position: absolute; top: 100%; width: 100%;">` +
    `<div class="positionButtons">` +
    `<div class="lvlBtn" onclick="moveHandCardLeft('${id}')">&lt;</div>` +
    `<div class="lvlBtn" onclick="moveHandCardDown('${id}')">v</div>` +
    `<div class="lvlBtn" onclick="moveHandCardRight('${id}')">&gt;</div>` +
    `</div></div>` +
    `</div>`;
  }
  bestPlayDiv.innerHTML = txt;

  txt = '';
  for(let id of Object.keys(playfieldCards).sort().reverse()) {
    if(bestHand.indexOf(id) >= 0) continue;
    txt += `<div class="tooltip"><div id="${id}" class="playfieldCard" ${playfieldCards[id].string} onclick="removeCard('${id}')" onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div>` +
    `<div style="position: absolute; top: 100%; width: 100%;">` +
    `<div class="positionButtons">` +
    `<div class="lvlBtn" onclick="moveCardUp('${id}')">^</div>` +
    `</div></div>` +
    `</div>`;
  }
  cardsInHandDiv.innerHTML = txt;
}

function moveJokerLeft(id) {
  if(optimizeJokers) toggleJoker();
  const index = bestJokers.indexOf(id);
  if(index > 0) {
    bestJokers.splice(index, 1);
    bestJokers.splice(index - 1, 0, id);
  }
  let newPlayfield = {};
  for(joker of bestJokers) {
    newPlayfield[joker] = playfieldJokers[joker];
  }
  playfieldJokers = newPlayfield;
  redrawPlayfield();
}

function moveJokerRight(id) {
  if(optimizeJokers) toggleJoker();
  let index = bestJokers.indexOf(id);
  if(index < bestJokers.length) {
    bestJokers.splice(index, 1);
    bestJokers.splice(index + 1, 0, id);
  }
  let newPlayfield = {};
  for(joker of bestJokers) {
    newPlayfield[joker] = playfieldJokers[joker];
  }
  playfieldJokers = newPlayfield;
  redrawPlayfield();
}

function moveHandCardLeft(id) {
  if(optimizeCards) toggleCard();
  let index = bestHand.indexOf(id);
  if(index > 0) {
    bestHand.splice(index, 1);
    bestHand.splice(index - 1, 0, id);
  }
  redrawPlayfield();
}
function moveHandCardRight(id) {
  if(optimizeCards) toggleCard();
  let index = bestHand.indexOf(id);
  if(index < bestHand.length) {
    bestHand.splice(index, 1);
    bestHand.splice(index + 1, 0, id);
  }
  redrawPlayfield();
}

function moveHandCardDown(id) {
  if(optimizeCards) toggleCard();
  bestHand.splice(bestHand.indexOf(id), 1);
  redrawPlayfield();
}

function moveCardUp(id) {
  if(optimizeCards) toggleCard();
  if(bestHand.length < 5) {
    bestHand.push(id);
  }
  redrawPlayfield();
}

const searchDiv = document.getElementById('SearchVal');

function searchJoker() {
  searchVal = searchDiv.value;
  jredrawCards();
}

let modifyTab = changeTab(4);

function modifyJoker(id) {
  modifyTab();
  modifyingJoker = id;
  modifyingJokerValDiv.innerText = playfieldJokers[modifyingJoker].value;

  updateModifyingJoker();
}

function updateModifyingJoker() {
  if(!playfieldJokers.hasOwnProperty(modifyingJoker)) return;

  modifyJokerDiv.innerHTML = `<div><div class='tooltip'><div data-scale='2' class="jokerCard" ${playfieldJokers[modifyingJoker].string} onmousemove = 'hoverCard(event)' onmouseout = 'noHoverCard(event)'></div>` +
  `<span class='tooltiptext'>` +
  `<span class='title'>${playfieldJokers[modifyingJoker].tooltip[0]}</span>` +
  `<span class='desc'><span class='descContent'>${playfieldJokers[modifyingJoker].tooltip[1]}</span></span>` +
  `</span>` +
  `</div></div>`;

}

function mjtoggleCardModifier(name) {
  if(!modifyingJoker) return;
  let joker = playfieldJokers[modifyingJoker];
  if(('foil holographic polychrome'.indexOf(name) >= 0) && !joker.modifiers[name]) {
    joker.modifiers.foil = false;
    joker.modifiers.holographic = false;
    joker.modifiers.polychrome = false;
  }
  joker.modifiers[name] = !joker.modifiers[name];
  joker.string = jokerString(joker.type[0], joker.type[1], joker.modifiers);

  redrawPlayfield();
  updateModifyingJoker();
}

function incrementModifyJokerValue(inc) {
  if(!modifyingJoker) return;
  let joker = playfieldJokers[modifyingJoker];
  joker.value += inc;
  if(inc === 0) {
    joker.value = 0;
  }
  modifyingJokerValDiv.innerText = joker.value;

  let tmp = jokerValue;
  jokerValue = joker.value;
  joker.tooltip[1] = (jokerTexts.length > joker.type[0] && jokerTexts[joker.type[0]].length > joker.type[1]) ? eval('`' + jokerTexts[joker.type[0]][joker.type[1]][1] + '`') : 'WIP'
  jokerValue = tmp;

  redrawPlayfield();
  updateModifyingJoker();
}

function setModifyJokerValue() {
  let joker = playfieldJokers[modifyingJoker];

  if(!isNaN(modifyingJokerValDiv.innerText)) {
    joker.value = Math.round(modifyingJokerValDiv.innerText * 1);
  }
  else {
    joker.value = 0;
  }

  let tmp = jokerValue;
  jokerValue = joker.value;
  joker.tooltip[1] = (jokerTexts.length > joker.type[0] && jokerTexts[joker.type[0]].length > joker.type[1]) ? eval('`' + jokerTexts[joker.type[0]][joker.type[1]][1] + '`') : 'WIP'
  jokerValue = tmp;

  redrawPlayfield();
  updateModifyingJoker();
}
