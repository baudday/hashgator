define([
	'backbone',
	'models/TileModel'
], function(Backbone, TileModel) {
	var GoogleTilesCollection = Backbone.Collection.extend({
		model: TileModel,
		initialize: function(models, options) {
			this.url = "https://www.googleapis.com/plus/v1/activities?query="
				+ options.tag + "&key=AIzaSyBY3PbFeRff3wUwjbQlaqgcoO1Ib_CpO5k";
		},
		sync: function(method, model, options) {
			options.dataType = "jsonp";
			return Backbone.sync(method, model, options);
		},
		parse: function(response) {
			var tiles = _.map(response.items, function(post) {
				var tile = new TileModel({
					id: post.id,
					header: post.actor.displayName,
					url: post.url,
					date: new Date(post.published),
					body: post.object.content
				});

				if(post.object.hasOwnProperty("attachments")) {
					switch(post.object.attachments[0].objectType) {
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
								img: post.object.attachments[0].thumbnails
							});
							break;
						case "article":
							tile.set({
								title: post.object.attachments[0].displayName,
								body: post.object.attachments[0].content,
								url: post.object.attachments[0].url
							});
							break;
					}
				}

				return tile;
			});

			return tiles;
		}
	});

	return GoogleTilesCollection;
})