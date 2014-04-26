require.config({
	paths: {
		jquery: '../lib/jquery/dist/jquery.min',
		underscore: '../lib/underscore/underscore',
		backbone: '../lib/backbone/backbone',
		text: '../lib/requirejs-text/text',
		bootstrap: '../lib/bootstrap/dist/js/bootstrap.min',
		outlayer: '../lib/outlayer',
		'get-style-property': '../lib/get-style-property',
		'get-size': '../lib/get-size',
		eventie: '../lib/eventie',
		eventEmitter: '../lib/eventEmitter',
		'doc-ready': '../lib/doc-ready',
		'matches-selector': '../lib/matches-selector',
		imagesLoaded: '../lib/imagesloaded/imagesloaded',
		masonry: '../lib/jquery-masonry/masonry',
		AppView: 'AppView'
	},
	shim: {
		'backbone': {
			deps: ['underscore'],
			exports: 'Backbone'
		},
		'AppView': {
			exports: 'AppView'
		}
	}
});

require([
	'app'
], 
function(App) {
	App.initialize();
});