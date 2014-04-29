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
], function(Backbone, imagesLoaded, Masonry, LeftView, HashTemplate, LoaderTemplate,
			TumblrTiles, TumblrTilesCollection, GoogleTilesCollection, 
			TilesCollection) {
	var HashView = Backbone.View.extend({
		el: '.body',
		initialize: function(options) {
			this.options = options;
		},
		render: function() {
			var _this = this;
			this.tiles = new TilesCollection([], {tag: this.options.hash});
			this.tumblrTiles = new TumblrTilesCollection([], {tag: this.options.hash});
			this.googleTiles = new GoogleTilesCollection([], {tag: this.options.hash});
			new LeftView();
			var loader = _.template(LoaderTemplate);
			this.$el.html(loader);

			jQuery.when(this.getPosts()).done(jQuery.proxy(this.displayTiles, this));
		},
		getPosts: function() {
			var _this = this;
			return jQuery.when(
				this.tumblrTiles.fetch({
					success: function(posts) {
						_this.tiles.insert(posts.models);
					}
				}),
				this.googleTiles.fetch({
					success: function(posts) {
						_this.tiles.insert(posts.models);
					}
				})
			).done();
		},
		displayTiles: function() {
			var data = {};
			data.title = this.options.hash;
			data.tiles = this.tiles.models;
			data.popularTags = this.tiles.popularTags;
			var hashTemplate = _.template(HashTemplate, data);
			this.$el.html(hashTemplate);
			var feed = this.el.querySelector('#feed');
			imagesLoaded(feed, function() {
				var msnry = new Masonry(feed, {
					itemSelector: ".tile",
					columnWidth: ".tile"
				});
			});
		}
	});

	return HashView;
});