autocomplete-materialize-data.min.js
====================================

A Vainilla Javascript plugin to extend Materialize Auto Complete element.

## Usage
Step 1: include Materialize and autocomplete-materialize-data.min.js in your page

    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
    <script src="jquery.js"/>
    <script src="autocomplete-materialize-data.min.js"></script>

Step 2: define the html

    <!-- Campo de Texto que contendrá el auto complete de Materialize  --> 
    <div>
        <input type="text" id="autocomplete-food" class="autocomplete">
        <label for="autocomplete-food">Autocomplete Foods</label>
    </div>

Step 3: define Materialize Autocomplete 

    // Plain Materialize Autocomplete 
    $(function () {

        $("#autocomplete-food")
        .autocomplete({
        data: {
            'Banana': null,
            'Manzana': null,
            'Pera': null
        },
        limit: 20
        });    
    });

Step 4: initialize the plugin

    // Basic (only data)
	const comida = new extendAutocomplete({
        'element': 'autocomplete-food', 
        'data': {
            'Banana': {
                'id': 1, 
                'name': 'banana', 
                'item': 'valor1'
            }, 
            'Manzana': {
                'id': 2, 
                'name': 'manzana', 
                'item': 'valor2'
            }, 
            'Pera': {
                'id': 3, 
                'name': 'pera', 
                'item': 'valor3'
            }, 
        }
    });	

    // Data Function Source and Callback Function 
	const comida = new extendAutocomplete({
        'element': 'autocomplete-food', 
        'data': getData(),      // Function which return a data object 
        'onSelect': function(data) {
            console.dir(data); 
        }
    });	

## License
You may use autocomplete-materialize-data.min.js under the terms of the MIT License. [More information](http://en.wikipedia.org/wiki/MIT_License).