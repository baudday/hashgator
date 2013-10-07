define([
	'backbone',
	'models/TileModel'
], function(Backbone, TileModel) {
	var GoogleTilesCollection = Backbone.Collection.extend({
		model: TileModel,
		initialize: function(models, options) {
			this.url = "https://www.googleapis.com/plus/v1/activities?query=%23"
				+ options.tag + "&key=AIzaSyBY3PbFeRff3wUwjbQlaqgcoO1Ib_CpO5k";
		},
		sync: function(method, model, options) {
			options.dataType = "jsonp";
			return Backbone.sync(method, model, options);
		},
		parse: function(response) {
			var _this = this;
			var tiles = _.map(response.items, function(post) {
				var tile = new TileModel({
					id: post.id,
					header: post.actor.displayName,
					url: post.url,
					date: new Date(post.published),
					body: post.object.content
				});

				tile.set({
					tags: _this.getTags(_this.stripHtml(tile.get('body')))
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
								url: post.object.attachments[0].url
							});
							break;
					}
				}

				return tile;
			});

			return tiles;
		},
		stripHtml: function(str) {
			var div = document.createElement("div");
			div.innerHTML = str;
			return div.textContent || div.innerText || "";
		},
		getTags: function(str) {
			var arr = str.match(/#\S*/g);
			for(var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].substring(1);
			}
			return arr;
		}
	});

	return GoogleTilesCollection;
})