define([
	'backbone',
	'models/TileModel'
], function(Backbone, TileModel) {
	var TilesCollection = Backbone.Collection.extend({
		model: TileModel
	});

	return TilesCollection;
})