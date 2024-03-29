define([
	'backbone',
	'AppView',
	'views/HomeView',
	'views/HashView',
], function(Backbone, AppView, HomeView, HashView) {
	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'hash/:hash': 'hash'
		},
		hashView: new HashView()
	});

	var initialize = function() {
		var router = new Router();
		var appView = new AppView();

		router.on('route:home', function() {
			var homeView = new HomeView();
			appView.showView(homeView);
		});
		router.on('route:hash', function(hash) {
			this.hashView.render(hash);
		});

		Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});