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
			var tumblrTiles = new TumblrTilesCollection([], {tag: this.options.hash});
			var googleTiles = new GoogleTilesCollection([], {tag: this.options.hash});
			new LeftView();
			var loader = _.template(template);
			this.$el.html(loader);
			data.title = this.options.hash;

			jQuery.when(
				tumblrTiles.fetch({
					success: function(posts) {
						tiles.insert(posts.models);
					}
				}),
				googleTiles.fetch({
					success: function(posts) {
						tiles.insert(posts.models);
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