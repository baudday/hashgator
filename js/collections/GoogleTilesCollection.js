define([
	'backbone',
	'models/TileModel'
], function(Backbone, TileModel) {
	var GoogleTilesCollection = Backbone.Collection.extend({
		model: TileModel
	});

	return GoogleTilesCollection;
})