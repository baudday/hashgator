define([
	'backbone',
	'models/TileModel'
], function(Backbone, TileModel) {
	var TwitterTilesCollection = Backbone.Collection.extend({
		model: TileModel
	});

	return TwitterTilesCollection;
})