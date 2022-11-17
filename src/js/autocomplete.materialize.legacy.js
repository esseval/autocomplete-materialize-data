/**
 * @file Funciones necesarias para implementar un AutoComplete de Materialize con Data Structure
 * @author Sebastián Seval <eseval@santafe.gov.ar>
 */

/**
 * @global
 * @type {Object}
 */
var dictionary = {};

/**
 * Actualizamos el diccionario de datos
 * @param {String} element HTML
 */
function updateDictionary(element) {
  try {
    let items = {};
    let id = element.id;

    /**
     * Buscamos dentro del HTML que contiene las sugerencias del Autocomplete
     * todos los elementos y los indexamos en un objeto local (@see items)
     */
    let ul = document.querySelector(`label[for="${id}"]`).nextElementSibling;
    let li = ul.querySelectorAll('li').forEach(function (elementito) {
      let imagen = elementito.querySelector('img').src;
      let texto = elementito.querySelector('span').innerText;
      items[texto] = imagen;
    })

    // jQuery Style
    // $(element)
    //   .nextAll(".dropdown-content")
    //   .first()
    //   .find("li")
    //   .each(function () {
    //     let imagen = $(this).find("img").attr("src");
    //     let texto = $(this).find("span").first().text();
    //     items[texto] = imagen;
    //   });

    // Actualizamos el diccionario (@see dictionary) de valores geniales
    dictionary[id] = items;
    //console.log(dictionary);    
  } catch (error) {
    console.error(error);
    return;
  }
}

/**
 * Obtenemos datos de una URL
 * @param {string} text Texto de donde vamos a obtener los datos
 * @returns {array} Arreglo de datos
 */
function getData(text) {
  try {
    let data = {};
    let url = new URL(text);

    // Iteramos sobre los parametros de búsqueda de la URL
    for (let [name, value] of url.searchParams) {
      data[name] = value;
    }

    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

/**
 * Manejamos el Elemento enviado y obtenemos sus datos
 * @see dictionary
 * @param {Object} element Elemento HTML
 * @returns {Array} Arreglo de datos
 */
function manageItem(element) {
  // Obtenemos el valor del campo ke vamos a utilizar como clave
  let clave = element.value;
  let id = element.id;

  // Recuperamos el valor del diccionario ({@see dictionary})
  let text = dictionary[id][clave];

  // Obtenemos los datos
  let item = getData(text);
  return item;
}

/**
 * Enviamos la opción seleccionada al campo
 * @param {Object} element Elemento HTML
 * @param {Object} event Evento
 */
function sendItem(element, event) {
  if (event.isTrusted != undefined) {
    /**
     * Obtenemos los datos desde el elemento elegido a través de una
     * poco oscura y bien documentada función
     */
    let data = manageItem(element);

    /**
     * Manejemos esos datos en otra función 
     */
    return manageData(data);
  }
}

/**
 * Manejamos los datos que obtuvimos el item.
 * @param {Object} data 
 */
function manageData(data) {

  /**
   * En este punto tenemos un arreglo con todos los datos pertinetes de
   * nuestro autocomplete. Ke hacer con ellos ya es decisión del noble
   * desarrollador ... yo por mi parte simplemente los voy a mostrar en
   * la consola. Sean felices.
   */
  console.log(data);
}

/**
 * Esta es una función de ejemplo ke tiene como propósito demostrar ke se los autocomplete pueden utilizar 
 * cualkier fuente de datos. En teoría esta función podría obtener los datos de una función asincrónica
 * con async ... await pero para ser sincero no lo he probado. 
 * @returns {Object}
 */
function getTools() {
  return {
    "Martillo": "http://localhost:8087/autocomplete-materialize-data/src/img/option.png?id=1&name=martillo&item=valor1",
    "Sierra": "http://localhost:8087/autocomplete-materialize-data/src/img/option.png?id=2&name=sierra&item=valor2",
    "Destornillador": "http://localhost:8087/autocomplete-materialize-data/src/img/option.png?id=3&name=destornillador&item=valor3"
  };
}


$(function () {

  /**
   * Inicializamos el Auto Complete
   * Nota: La URL http://placehold.it/250x250 apunta a un recurso inexistente pero
   * debería estar referenciando a un recursos ke se encuentre disponible dentro
   * del proyecto. Si no se desea mostrar una imagen puede referenciar a una imagen
   * PNG transparente y todo el mundo contento.
   * 
   * Este es un Auto Complete de Materialize común y corriente. La magia ocurre más
   * abajo en el código ... a tener paciencia. Por el momento es importante senialar 
   * como se concatenan los valores de interes de cada item a la URL de la imagen. 
   * 
   * IMPORTANTE: la URL de la imagen debe ser completa y estar bien formada o nos
   * encontraremos con un error. 
   */
  $("#autocomplete-city")
    .autocomplete({
      data: {
        "Santa Fe":
          "http://placehold.it/250x250?id=1&name=santafe&state=santafe&item=valor1",
        "Paraná":
          "http://placehold.it/250x250?id=2&name=parana&state=entrerios&item=valor2",
        "Córdoba":
          "http://placehold.it/250x250?id=3&name=google&state=cordoba&item=valor3",
        "Helvecia":
          "http://placehold.it/250x250?id=4&name=helvecia&state=santafe&item=valor4",
        "Federación":
          "http://placehold.it/250x250?id=5&state=entrerios&name=appleII&item=valor5"
      },
      limit: 20
    });

  $("#autocomplete-food")
    .autocomplete({
      data: {
        "Banana": "http://localhost:8087/autocomplete-materialize-data/src/img/option.png?id=1&name=banana&item=valor1",
        "Manzana": "http://localhost:8087/autocomplete-materialize-data/src/img/option.png?id=2&name=manzana&item=valor2",
        "Pera": "http://localhost:8087/autocomplete-materialize-data/src/img/option.png?id=3&name=pera&item=valor3"
      },
      limit: 20
    });

  /**
   * Auto Complete con Data Sources desde una función. 
   */
  $("#autocomplete-tool")
    .autocomplete({
      data: getTools(),
      limit: 20
    });


  /**
   * Magic Materilize 
   */
  var matches = document.querySelectorAll('input.autocomplete').forEach(function (elemento) {
    elemento.addEventListener("change", function (event) {
      sendItem(this, event);
    });

    elemento.addEventListener("keyup", function () {
      updateDictionary(this);
    });
  });
});
