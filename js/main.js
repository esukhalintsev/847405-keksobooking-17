'use strict';
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var map_pins = document.querySelector('.map__pins');

var PIN_WIDTH = 40;
var PIN_HEIGHT = 44;
var MIN_X = 320;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var PINS_COUNT = 8;

var pins = [];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];

//возвращает случайный элемент из массива
var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

//возвращает случайное число из интервала
var getRandomIntFromInterval = function (min, max) {
  var rand = Math.floor(Math.random() * (max - min + 1) + min);
  return rand;
};

//наполнение массива объектами пинами
for (var i = 1; i <= PINS_COUNT; i++) {
  var pin = {
    author: {
      avatar: 'img/avatars/user0' + i + '.png',
      alt: 'Метка объявления №' + i
    },
    offer: {
      type: getRandomElement(TYPES)
    },
    location: {
      x: getRandomIntFromInterval(MIN_X, MAX_X),
      y: getRandomIntFromInterval(MIN_Y, MAX_Y)
    },
  };
  pins.push(pin);
}

//поиск темплейта
var similarPin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

//создание пина
var renderPins = function (pin) {
  var pinElement = similarPin.cloneNode(true);
  pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.author.alt;
  return pinElement;
};

//добавление пинов на карту
var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPins(pins[i]));
}
map_pins.appendChild(fragment);
