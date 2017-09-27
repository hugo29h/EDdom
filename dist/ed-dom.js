(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.EDdom = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Determina si el valor pasado es una cadena
 *
 * @param {*} value
 *
 * @return {boolean}
 *
 * @api private
 */
function isString(value) {
  return typeof value === 'string';
}

/**
 * Determina si el valor pasado se comporta como arreglo
 *
 * @param {*} value
 *
 * @return {boolean}
 *
 * @api private
 */
function isArrayLike(value) {
  return isObject(value) && 'length' in value;
}

/**
 * Determina si el valor pasado es un objeto
 *
 * @param {*} value
 *
 * @return {boolean}
 *
 * @api private
 */
function isObject(value) {
  return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}

/**
 * Determina si el valor pasado es nulo o indefinido
 *
 * @param {*} value
 *
 * @return {boolean}
 *
 * @api private
 */
function isNullable(value) {
  return value == null;
}

/**
 * Determina si el valor pasado es un elemento HTML
 *
 * @param {*} value
 *
 * @return {boolean}
 */

/**
 * Obtiene el tipo de selector
 *
 * @type {RegExp}
 */
var SELECTOR_TYPE_REGEX = /^([#.]?)[\w-]+$/;

/**
 * Consulta y obtiene elemento(s) del DOM
 *
 * @param {string|HTMLElement|NodeList|HTMLCollection} selector
 * @param {HTMLElement} context
 *
 * @return {HTMLElement|NodeList|HTMLCollection|Array}
 *
 * @api private
 */
var query = (function (selector, context) {
  if (isString(selector)) {
    var method = _getOptimumMethod(selector);
    var isSelectorID = method === 'getElementById';

    if (isSelectorID || method === 'getElementsByClassName') {
      selector = selector.replace(/^[#.]/, '');
    }

    selector = (isSelectorID ? document : context)[method](selector);
  }

  return isNullable(selector) || isArrayLike(selector) ? selector : [selector];
});

/**
 * Obtiene el método más óptimo para seleccionar los elementos del DOM
 *
 * @param {string} selector
 *
 * @return {string}
 *
 * @api private
 */
function _getOptimumMethod(selector) {
  var match = SELECTOR_TYPE_REGEX.exec(selector);

  // Selector complejo
  if (!match) return 'querySelectorAll';

  // Selector simple
  switch (match[1]) {
    case '#':
      return 'getElementById';
    case '.':
      return 'getElementsByClassName';
    default:
      return 'getElementsByTagName';
  }
}

/**
 * Itera todos los elementos y los pasa al método "decorado"
 *
 * @param {Object} proto
 * @param {string} key
 * @param {Object} descriptor
 *
 * @return void
 *
 * @api private
 */
var iterable = (function (proto, key, descriptor) {
  var original = descriptor.value;

  descriptor.value = function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.each(function (element) {
      original.call.apply(original, [_this, element].concat(args));
    });

    return this;
  };
});

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @alias Array.prototype
 */
var proto = Array.prototype;

// Clase encargada de emular algunos métodos de Array.prototype

var Stack = function () {
  function Stack() {
    _classCallCheck$1(this, Stack);

    this.length = 0;
  }

  /**
   * Número de elementos en la colección
   *
   * @member {number}
   */


  /**
   * Añade elementos a la colección
   *
   * @param {*} elements
   *
   * @return {Stack}
   *
   * @api public
   */
  Stack.prototype.add = function add() {
    for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
      elements[_key] = arguments[_key];
    }

    proto.push.apply(this, elements);
    return this;
  };

  /**
   * Itera los elementos de la colección
   *
   * @param {Function} iterator
   *
   * @return {Stack}
   *
   * @api public
   */


  Stack.prototype.each = function each(iterator) {
    proto.forEach.call(this, iterator);
    return this;
  };

  /**
   * Verifica algún elemento en la colección si cumple
   * con la confición que retorna el `callback`
   *
   * @param {Function} callback
   *
   * @return {boolean}
   *
   * @api public
   */


  Stack.prototype.some = function some(callback) {
    return proto.some.call(this, callback);
  };

  return Stack;
}();

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var EDdom = (_class = function (_Stack) {
  _inherits(EDdom, _Stack);

  /**
   * Crea una nueva instancia de EDdom
   *
   * @constructor
   *
   * @param {*} selector
   * @param {*} context
   */


  /**
   * Selector de elementos
   *
   * @member {string}
   */
  function EDdom(selector, context) {
    _classCallCheck(this, EDdom);

    var _this = _possibleConstructorReturn(this, _Stack.call(this));

    _this.selector = '';
    _this.context = document.body;


    if (!isNullable(context)) {
      _this.context = context;
    }

    if (isString(selector)) {
      _this.selector = selector;
    }

    var elements = query(selector, _this.context);

    if (isArrayLike(elements)) _this.add.apply(_this, elements);
    return _this;
  }

  /**
   * Escucha un evento en todos los elementos de la colección
   *
   * @alias Element.prototype.addEventListener
   *
   * @param {string} event
   * @param {Function} listener
   *
   * @return {EDdom}
   *
   * @api public
   */


  /**
   * Contexto al consultar elementos
   *
   * @member {HTMLElement}
   */


  EDdom.prototype.on = function on(element, event, listener) {
    element.addEventListener(event, listener);
  };

  /**
   * Deja de escuchar un evento de todos los elementos de la colección
   *
   * @alias Element.prototype.removeEventListener
   *
   * @param {string} event
   * @param {Function} listener
   *
   * @return {EDdom}
   *
   * @api public
   */


  EDdom.prototype.off = function off(element, event, listener) {
    element.removeEventListener(event, listener);
  };

  /**
   * Añade una clase a todos los elementos en la colección
   *
   * @param {string} klass
   *
   * @return {EDdom}
   *
   * @api public
   */


  EDdom.prototype.addClass = function addClass(element, klass) {
    element.classList.add(klass);
  };

  /**
   * Añade/remueve una clase de todos los elementos en la colección
   *
   * @param {string} klass
   *
   * @return {EDdom}
   *
   * @api public
   */


  EDdom.prototype.toggleClass = function toggleClass(element, klass) {
    element.classList.toggle(klass);
  };

  /**
   * Remueve la clase dada en todos los elementos de la colección
   *
   * @param {string} klass
   *
   * @return {EDdom}
   *
   * @api public
   */


  EDdom.prototype.removeClass = function removeClass(element, klass) {
    element.classList.remove(klass);
  };

  /**
   * Envuelva a cada elemento de la colección con el elemento dado
   *
   * @param {HTMLElement} wrapper
   *
   * @return {EDdom}
   *
   * @api public
   */


  EDdom.prototype.wrap = function wrap(element, wrapper) {
    var wrapperClone = wrapper.cloneNode(false);
    element.parentElement.insertBefore(wrapperClone, element);
    wrapperClone.appendChild(element);
  };

  /**
   * Verifica si en la colección un elemento tiene la clase dad
   *
   * @param {string} klass
   *
   * @return {boolean}
   *
   * @api public
   */


  EDdom.prototype.hasClass = function hasClass(klass) {
    return this.some(function (element) {
      return element.classList.contains(klass);
    });
  };

  /**
   * Añade/remueve atributos de los elementos en la colección
   *
   * @param {string|Object} name
   * @param {string=} value
   *
   * @return {EDdom|string|null}
   *
   * @api public
   */


  EDdom.prototype.attr = function attr(name, value) {
    if (isObject(name)) {
      var attributes = name;

      for (var attribute in attributes) {
        if (attributes.hasOwnProperty(attribute)) {
          this.attr(attribute, attributes[attribute]);
        }
      }
    } else if (arguments.length === 1) {
      return this[0] && this[0].getAttribute(name);
    } else {
      var method = isNullable(value) ? 'removeAttribute' : 'setAttribute';

      this.each(function (element) {
        element[method](name, value);
      });
    }

    return this;
  };

  /**
   * Añade al final los elementos dados como hijos de cada elemento de la colección
   *
   * @param {*} children
   *
   * @return {EDdom}
   *
   * @api public
   */


  EDdom.prototype.append = function append(children) {
    var $children = new EDdom(children);

    this.each(function (element) {
      $children.each(function (child) {
        element.appendChild(child.cloneNode(true));
      });
    });

    return this;
  };

  /**
   * Añade al inicio los elementos dados como hijos de cada elemento de la colección
   *
   * @param {*} children
   *
   * @return {EDdom}
   *
   * @api public
   */


  EDdom.prototype.prepend = function prepend(children) {
    var $children = new EDdom(children);

    this.each(function (element) {
      var referenceChild = element.firstElementChild;

      $children.each(function (child) {
        element.insertBefore(child, referenceChild);
      });
    });

    return this;
  };

  return EDdom;
}(Stack), (_applyDecoratedDescriptor(_class.prototype, 'on', [iterable], Object.getOwnPropertyDescriptor(_class.prototype, 'on'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'off', [iterable], Object.getOwnPropertyDescriptor(_class.prototype, 'off'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addClass', [iterable], Object.getOwnPropertyDescriptor(_class.prototype, 'addClass'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'toggleClass', [iterable], Object.getOwnPropertyDescriptor(_class.prototype, 'toggleClass'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'removeClass', [iterable], Object.getOwnPropertyDescriptor(_class.prototype, 'removeClass'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'wrap', [iterable], Object.getOwnPropertyDescriptor(_class.prototype, 'wrap'), _class.prototype)), _class);

/**
 * Envoltura para evitar tener que instanciar la clase `EDdom`
 *
 * @param {*} args
 *
 * @return {EDdom}
 *
 * @api public
 */
function edDom() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(EDdom, [null].concat(args)))();
}

/**
 * Crea un elemento con los atributos y lo retorna como un EDdom object
 *
 * @param {string} tag
 * @param {Object} attrs
 * @param {Array} children
 *
 * @return {EDdom}
 *
 * @api public
 */
edDom.create = function (tag) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return edDom(document.createElement(tag)).attr(attrs).append(children);
};

// Definir un alias en caso de que no esté definido
if (window.$ == null) window.$ = edDom;

return edDom;

})));