define([
	'backbone'
], function(Backbone) {
	var TumblrTileModel = Backbone.Model.extend({
		defaults: {
			id: '',
			title: '',
			body: '',
			img: false,
			url: ''
		}
	});

	return TumblrTileModel;
});