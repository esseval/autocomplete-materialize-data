/**
 * @file app.js
 * @brief Funciones necesarias para implementar un AutoComplete de Materialize con Data Structure. 
 * @author Sebastián Seval <eseval@santafe.gov.ar>
 */ 

 /**
  * Autocomplete de Materialize  
  */
$(function () {
    $("#autocomplete-food")
    .autocomplete({
      data: {
        'Banana': null,
        'Manzana': null,
        'Pera': null,
        'Ciruela': null, 
        'Kiwi': null,
        'Naranja': null, 
        'Uva': null, 
      },
      limit: 20
    });    
});


/**
 * Core 
 */
document.addEventListener('DOMContentLoaded',function()
{
    /**
     * Inicializamos el Plugin 
     */
	const comida = new extendAutocomplete({
        'element': 'autocomplete-food', 
        'data': {
            'Banana': {
                'id': 1, 
                'name': 'banana', 
                'cal': 89, 
                'protein': 1.1, 
                'fat': 0.3, 
                'carb': 23,
                'fiber': 2.6
            }, 
            'Manzana': {
                'id': 2, 
                'name': 'manzana', 
                'cal': 52, 
                'protein': 0.3, 
                'fat': 0.35, 
                'carb': 12,
                'fiber': 2
            }, 
            'Pera': {
                'id': 3, 
                'name': 'pera', 
                'cal': 57, 
                'protein': 0.4, 
                'fat': 0.1, 
                'carb': 15,
                'fiber': 3.1
            }, 
            'Ciruela': {
                'id': 4, 
                'name': 'ciruela', 
                'cal': 46, 
                'protein': 0.7, 
                'fat': 0.3, 
                'carb': 11,
                'fiber': 1.4
            }, 
            'Kiwi': {
                'id': 5, 
                'name': 'kiwi', 
                'cal': 61, 
                'protein': 1.1,  
                'fat': 0.5, 
                'carb': 15,
                'fiber': 3
            }, 
            'Naranja': {
                'id': 6, 
                'name': 'naranja', 
                'cal': 47, 
                'protein': 0.9, 
                'fat': 0.1, 
                'carb': 12,
                'fiber': 2.4
            }, 
            'Uva': {
                'id': 7, 
                'name': 'uva', 
                'cal': 67, 
                'protein': 0.6, 
                'fat': 0.4, 
                'carb': 17,
                'fiber': 0.9
            }, 
        }, 
        'onSelect': function(data) {
            console.info('%cInformación Nutricional', 'font-weight: bold;'); 
            console.table(data); 
        }
    });	
});