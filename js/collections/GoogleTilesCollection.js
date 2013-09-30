define([
	'backbone',
	'models/TileModel'
], function(Backbone, TileModel) {
	var GoogleTilesCollection = Backbone.Collection.extend({
		model: TileModel,
		sync: function(method, model, options) {
			options.dataType = "jsonp";
			return Backbone.sync(method, model, options);
		},
		parse: function(response) {
			var tiles = _.map(response.items, function(post) {
				if(post.object.objectType !== "note") {
					var tile = new TileModel({
						id: post.id,
						header: post.actor.displayName,
						url: post.url,
						date: new Date(post.published),
						body: post.object.content
					});

					if(post.object.hasOwnProperty("attachments")) {
						switch(post.object.objectType) {
							case "video":
								tile.set({
									img: post.object.attachments[0].image.url
								});
								break;
							case "photo":
								tile.set({
									img: post.object.attachments[0].image.url
								});
								break;
							case "album":
								tile.set({
									img: post.object.attachments[0].thumbnails[0].image.url
								});
								break;
						}
					}

					return tile;
				}
			});

			return tiles;
		}
	});

	return GoogleTilesCollection;
})