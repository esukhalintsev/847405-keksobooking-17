'use strict';

//константы
var PIN_WIDTH = 40;
var PIN_HEIGHT = 44;
var MIN_X = 320;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var PINS_COUNT = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 62;
var MAIN_PIN_POINT_HEIGHT = 22;

//378 по верхнему краю

//массивы
var pins = [];

//переменные
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mainPin = mapPins.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var inputs = document.querySelectorAll('input');
var selectors = document.querySelectorAll('select');
var addressField = adForm.querySelector('#address');

//блокировка инпутов
var disableInputs = function (form, disabledClass, arr, disabled, ) {
  if (form.classList.contains = disabledClass) {
    for (var i = 0; i < arr.length; i++) {
      var input = arr[i];
      input.disabled = true;
    }
  }
}

disableInputs(adForm, 'ad-form--disabled', inputs, true);
disableInputs(adForm, 'ad-form--disabled', selectors, true);

//активация карты
var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  addPins();
  getMainPinAddres();
};

//показ карты по клику
mainPin.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  activateMap();
});

//генерация адреса
var getMainPinAddres = function () {
  var x = mainPin.style.left;
  x = parseInt(x, 10);
  var y = mainPin.style.top;
  y = parseInt(y, 10);
  // x = начальная точка + половина размера пина, y = начальная точка + вся высота пина + высота острого конца
  addressField.value = (x + MAIN_PIN_WIDTH / 2) + ', ' + (y + MAIN_PIN_HEIGHT + MAIN_PIN_POINT_HEIGHT);
};

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
var addPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPins(pins[i]));
  }
  mapPins.appendChild(fragment);

};
