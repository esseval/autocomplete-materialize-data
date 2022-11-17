/**
 * @file autocomplete-materialize-data.js
 * @brief Plugin Vainilla Javascript con las funciones necesarias para implementar un AutoComplete de Materialize con Data Structure. 
 * @author Sebastián Seval <eseval@santafe.gov.ar>
 * @version 0.1
 * @license MIT license <http://www.opensource.org/licenses/MIT>
 *
 * autocomplete-materialize-data.js is a Vainilla Javascript plugin to extend Materialize Auto Complete element. 
 *
 */

/**
 * @name Javascript
 * @class
 * Vainilla Javascript. 
 */

/**
 * @typedef Options
 * @type {Object}
 * @property {String} element DOM Element ID which the plugin is applied
 * @property {String} class DOM Element Class which the plugin is applied
 * @property {Object} data Auto Complete Data 
 * @property {Function} onSelect Callback function to call after select and element
 */

 (function () {

  /**
   * autocomplete-materialize-data.js - A Vainilla Javascript plugin to extend Materialize Auto Complete element.
   *
   * @class
   * @name extendAutocomplete
   * @memberOf Javascript
   */
  this.extendAutocomplete = function () {

    try {
      /**
       * Option defaults 
       * @type {Options}
       * @memberof Javascript.extendAutocomplete
       */
      let defaults = {
        'element': '',
        'class': '.autocomplete',
        'data': {},
        'onSelect': function () { console.log(arguments[0]); },
      };

      /**
       * Plugin Configuration 
       * @type {Options}
       * @memberof Javascript.extendAutocomplete
       */
      this.settings = (arguments[0] && typeof arguments[0] === 'object') ? extend(defaults, arguments[0]) : defaults;

      /**
       * DOM Element ID which the plugin is applied.
       * @type {String} 
       * @memberof Javascript.extendAutocomplete
       */
      this.element = (this.settings['element'] && typeof this.settings['element'] === 'string') ? this.settings['element'] : document.querySelector(this.settings['class']).id;

      // Init 
      this.init();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Init
   * @function init
   * @public
   * @memberOf Javascript.extendAutocomplete
   */
  extendAutocomplete.prototype.init = function () {
    build.call(this);
  }


  /**
   * Manejamos los datos a partir de la opción seleccionada 
   * @function manage
   * @private
   * @param {Options} options Plugin Configuration 
   * @memberOf Javascript
   * @returns {Object}
   * @throws {ReferenceError} 
   */
  function manage(options) {
    try {
      const data = options.data;
      const dom = document.querySelector(`[id=${this.id}]`);
      let clave = dom.value;

      if (clave in data) {
        return data[clave];
      }

      throw new ReferenceError('Data not found!');
    } catch (error) {
      console.error(error);
      return {}
    }
  }

  /**
   * Manejamos un Evento de seleccionada
   * @function select
   * @private
   * @param {Object} options Elemento HTML
   * @param {Object} event Evento
   * @memberOf Javascript
   */
  function select(options, event) {
    try {
      if (event.isTrusted != undefined) {

        /**
         * Obtenemos los datos desde el elemento elegido a través de una
         * poco oscura y bien documentada función
         */
        data = manage.call(this, options);

        /**
         * Si tenemos unas función asociada a la selección pues entonces
         * la ejecutamos con elegancia 
         */
        if (options.onSelect) {
          options.onSelect(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Construimos el plugin 
   * @function build
   * @private
   * @memberOf Javascript
   */
  function build() {
    try {
      let options = this.settings;
      let dom = document.querySelector(`[id=${this.element}]`);
      dom.addEventListener("change", function (event) {
        select.call(this, options, event);
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Combinar el contenido de dos objetos juntos en el primer objecto
   * @function extend 
   * @private
   * @param {Object} defaults Configuración por Defecto 
   * @param {Object} properties Configuración por parámentro 
   * @returns {Object}
   */
  function extend(defaults, properties) {
    try {
      Object.keys(properties).forEach(property => {
        if (properties.hasOwnProperty(property)) {
          defaults[property] = properties[property];
        }
      });

      return defaults;
    } catch (error) {
      console.error(error);
    }
  }
}());