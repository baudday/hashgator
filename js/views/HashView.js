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
			document.title = this.pageTitle = "#" + this.options.hash + " on hashgator";
		},
		events: {
			'click #new-post-alert-container': 'loadNewPosts'
		},
		render: function() {
			var _this = this;
			this.tiles = new TilesCollection([], {tag: this.options.hash});
			this.tumblrTiles = new TumblrTilesCollection([], {tag: this.options.hash});
			this.googleTiles = new GoogleTilesCollection([], {tag: this.options.hash});
			this.newPostCount = 0;
			new LeftView();
			var loader = _.template(LoaderTemplate);
			this.$el.html(loader);

			this.getPosts(this.tiles, this.displayTiles);
			setInterval(function() { _this.poll() }, 30000);
		},
		getPosts: function(tiles, poll, callback) {
			var _this = this;
			if(typeof poll == "function") {
				callback = poll;
				poll = false;
			}

			jQuery.when(
				this.tumblrTiles.fetch({
					success: function(posts) {
						var newPosts = _.difference(posts.models, tiles.models);
						if(poll) _this.newPostCount += newPosts.length;
						tiles.insert(newPosts);
					}
				}),
				this.googleTiles.fetch({
					success: function(posts) {
						var newPosts = _.difference(posts.models, tiles.models);
						if(poll) _this.newPostCount += newPosts.length;
						tiles.insert(newPosts);
					}
				})
			).done(jQuery.proxy(callback, this));
		},
		displayTiles: function() {
			var _this = this;
			var data = {};
			data.title = this.options.hash;
			data.tiles = this.tiles.models;
			data.popularTags = this.tiles.popularTags;
			var hashTemplate = _.template(HashTemplate, data);
			this.$el.html(hashTemplate);
			this.alertContainer = this.el.querySelector("#new-post-alert-container");
			this.alert = this.el.querySelector("#new-post-alert");
			var feed = this.el.querySelector('#feed');
			imagesLoaded(feed, function() {
				_this.msnry = new Masonry(feed, {
					itemSelector: ".tile",
					columnWidth: ".tile",
					stamp: ".stamp"
				});
			});
		},
		poll: function() {
			this.getPosts(this.tiles, true, function() {
				if(this.newPostCount > 0) {
					document.title = "(" + this.newPostCount + ") " + this.pageTitle;
					$(this.alert).html(this.newPostCount + " new posts! Click to load.");
					$(this.alertContainer).show();
					this.msnry.layout();
				}
			});
		},
		loadNewPosts: function() {
			document.title = this.pageTitle;
			$(this.alertContainer).hide();
			$(this.alert).html("");
			this.newPostCount = 0;
			this.displayTiles();
		}
	});

	return HashView;
});