define([
	'backbone',
	'models/TileModel'
], function(Backbone, TileModel) {
	var TumblrTilesCollection = Backbone.Collection.extend({
		model: TileModel,
		sync: function(method, model, options) {
			options.dataType = "jsonp";
			return Backbone.sync(method, model, options);
		},
		parse: function(response) {
			var tiles = _.map(response.response, function(post) {
				var tile = new TileModel({
					id: post.id,
					title: post.blog_name,
					url: post.short_url
				});

				switch(post.type) {
					case "video":
						tile.set({img: post.thumbnail_url});
						break;
					case "photo":
						tile.set({img: post.photos[0].original_size.url});
						break;
				}

				return tile;
			});

			return tiles;
		}
	});

	return TumblrTilesCollection;
})