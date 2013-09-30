define([
	'backbone',
	'models/TileModel'
], function(Backbone, TileModel) {
	var TilesCollection = Backbone.Collection.extend({
		model: TileModel,
		comparator: function(tile) {
			return -tile.get('date');
		}
	});

	return TilesCollection;
})