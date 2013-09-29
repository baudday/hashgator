define([
	'backbone'
], function(Backbone) {
	var HashesModel = Backbone.Model.extend({
		defaults: {
			id: '',
			title: '',
			active: false
		}
	});

	return HashesModel;
});