define([
	'backbone'
], function(Backbone) {
	var TileModel = Backbone.Model.extend({
		defaults: {
			id: '',
			title: '',
			body: '',
			img: false,
			url: ''
		}
	});

	return TileModel;
});