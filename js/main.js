require.config({
	paths: {
		jquery: '../lib/jquery/jquery.min',
		underscore: '../lib/underscore/underscore-min',
		backbone: '../lib/backbone/backbone-min',
		text: '../lib/requirejs-text/text',
		bootstrap: '../lib/bootstrap/dist/js/bootstrap.min',
		masonry: '../lib/jquery-masonry/masonry',
		outlayer: '../lib/outlayer',
		'get-style-property': '../lib/get-style-property',
		'get-size': '../lib/get-size',
		eventie: '../lib/eventie',
		eventEmitter: '../lib/eventEmitter',
		'doc-ready': '../lib/doc-ready',
		'matches-selector': '../lib/matches-selector',
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