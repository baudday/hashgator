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
					header: post.blog_name,
					url: post.short_url,
					date: new Date(post.date),
					tags: post.tags
				});

				switch(post.type) {
					case "video":
						tile.set({
							body: post.caption + post.player[0].embed_code
						});
						break;
					case "photo":
						tile.set({img: post.photos[0].original_size.url});
						break;
					case "quote":
						tile.set({
							body: "<h4>" + post.text + "</h4>"
								+ "<h4>&mdash; " + post.source + "</h4>"
						});
						break;
					case "text":

						tile.set({
							title: post.title,
							body: "<div style='width: 100%; overflow: hidden;'>"
								+ post.body + "</div>"
						});
						break;
					case "link":
						tile.set({
							title: "<a target='_blank' href='" + post.url + "'>" 
								+ post.title + "</a>",
							body: post.description
						})
						break;
				}

				return tile;
			});

			return tiles;
		}
	});

	return TumblrTilesCollection;
})