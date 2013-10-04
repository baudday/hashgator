define([
	'backbone',
	'models/TileModel'
], function(Backbone, TileModel) {
	var TilesCollection = Backbone.Collection.extend({
		model: TileModel,
		comparator: function(tile) {
			return -tile.get('date');
		},
		insert: function(models) {
			_.each(models, function(model) {
				var tags = model.get('tags'),
					body = model.get('body'),
					tagsString = "";

				if(tags) {
					for(var i = 0; i < tags.length; i++) {
						var tag = tags[i],
							stripped = tag.replace(/\s/g, "").replace(/\W/g, "");
						if(stripped && stripped != " ") {
							if(i === tags.length - 1) {
								tagsString += '<a href="#/hash/tag">#tag</a>';
							} else {
								tagsString += '<a href="#/hash/tag">#tag</a>,';
							}
						}
					}
				}
			});
		}
	});

	return TilesCollection;
})