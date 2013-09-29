define([
	'backbone',
	'models/TileModel'
], function(Backbone, TileModel) {
	var TumblrTiles = Backbone.Model.extend({
		sync: function(method, model, options) {
			options.dataType = "jsonp";
			return Backbone.sync(method, model, options);
		},
		parse: function(response) {
			var tiles = _.map(response.response, function(post) {
				return new TileModel({
					id: post.id,
					title: post.blog_name,
					url: post.short_url
				})
			});
			return tiles;
		}
	});

	return TumblrTiles;
});