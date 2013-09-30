define([
	'backbone',
	'imagesLoaded',
	'masonry',
	'views/LeftView',
	'text!../../templates/hash/HashTemplate.html',
	'models/TumblrTiles',
	'collections/TumblrTilesCollection',
	'collections/TilesCollection'
], function(Backbone, imagesLoaded, Masonry, LeftView, HashTemplate, 
			TumblrTiles, TumblrTilesCollection, TilesCollection) {
	var HashView = Backbone.View.extend({
		el: '.body',
		render: function() {
			var _this = this;
			var data = {};
			var tiles = new TilesCollection();
			var tumblrTiles = new TumblrTilesCollection();
			new LeftView();

			data.title = this.options.hash;
			tumblrTiles.url = "http://api.tumblr.com/v2/tagged?tag=" 
				+ this.options.hash 
				+ "&limit=15&api_key=JlflsMVkGqc2MU1SJ7x6HajnrEfcRxJEIC1RN4qqIgZFhwoswL";
			tumblrTiles.fetch({
				success: function(posts) {
					tiles.add(posts.models);
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
				}
			});
		}
	});

	return HashView;
});