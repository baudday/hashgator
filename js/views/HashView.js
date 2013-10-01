define([
	'backbone',
	'imagesLoaded',
	'masonry',
	'views/LeftView',
	'text!../../templates/hash/HashTemplate.html',
	'text!../../templates/loader.html',
	'models/TumblrTiles',
	'collections/TumblrTilesCollection',
	'collections/GoogleTilesCollection',
	'collections/TilesCollection'
], function(Backbone, imagesLoaded, Masonry, LeftView, HashTemplate, template,
			TumblrTiles, TumblrTilesCollection, GoogleTilesCollection, 
			TilesCollection) {
	var HashView = Backbone.View.extend({
		el: '.body',
		render: function() {
			var _this = this;
			var data = {};
			var tiles = new TilesCollection();
			var tumblrTiles = new TumblrTilesCollection();
			var googleTiles = new GoogleTilesCollection();
			new LeftView();

			var loader = _.template(template);
			this.$el.html(loader);

			data.title = this.options.hash;
			tumblrTiles.url = "http://api.tumblr.com/v2/tagged?tag=" 
				+ this.options.hash 
				+ "&limit=15&api_key=JlflsMVkGqc2MU1SJ7x6HajnrEfcRxJEIC1RN4qqIgZFhwoswL";
			googleTiles.url = "https://www.googleapis.com/plus/v1/activities?query=" 
				+ this.options.hash + "&key=AIzaSyBY3PbFeRff3wUwjbQlaqgcoO1Ib_CpO5k";

			$.when(
				tumblrTiles.fetch({
					success: function(posts) {
						tiles.add(posts.models);
					}
				}),
				googleTiles.fetch({
					success: function(posts) {
						tiles.add(posts.models);
					}
				})
			).done(function() {
				data.tiles = tiles.models;
				var hashTemplate = _.template(HashTemplate, data);
				_this.$el.html(hashTemplate);
				var feed = _this.el.querySelector('#feed');
				imagesLoaded(feed, function() {
					var msnry = new Masonry(feed, {
						itemSelector: ".tile",
						columnWidth: ".tile"
					});
				});
			});
		}
	});

	return HashView;
});