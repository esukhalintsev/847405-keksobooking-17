'use strict';

var APPARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var Mock = {
  countElements: 8,
  minY: 130,
  maxY: 630
};
var appartments = [];
var map = document.querySelector('.map');
var pinList = map.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var addMockElement = function (arr, count, type, x, y) {
  arr.push({
    'author': {
      'avatar': 'img/avatars/user0' + count + '.png'
    },
    'offer': {
      'type': type
    },
    'location': {
      'x': x,
      'y': y
    }
  });
};

var createMock = function () {
  for (var i = 1; i <= Mock.countElements; i++) {
    addMockElement(appartments, i, APPARTMENT_TYPES[getRandomInt(0, APPARTMENT_TYPES.length - 1)], getRandomInt(0, map.clientWidth), getRandomInt(Mock.minY, Mock.maxY));
  }
};

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.type;
  pinElement.style.left = pin.location.x - pinImg.width / 2 + 'px';
  pinElement.style.top = pin.location.y - pinImg.height + 'px';

  return pinElement;
};

var createFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < appartments.length; j++) {
    fragment.appendChild(renderPin(appartments[j]));
  }
  return fragment;
};

createMock();
map.classList.remove('map--faded');
pinList.appendChild(createFragment());
