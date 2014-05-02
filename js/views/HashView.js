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
		},
		events: {
			'click #new-post-alert-container': 'loadNewPosts'
		},
		render: function(hash) {
			var _this = this;
			this.hash = hash;
			if(this.tiles) delete this.tiles;
			this.tiles = new TilesCollection([], {tag: this.hash});
			this.tumblrTiles = new TumblrTilesCollection([], {tag: this.hash});
			this.googleTiles = new GoogleTilesCollection([], {tag: this.hash});
			if(this.interval) clearInterval(this.interval);
			this.postCount = this.tiles.size();
			this.newPostCount = 0;
			new LeftView();
			var loader = _.template(LoaderTemplate);
			this.$el.html(loader);
			document.title = this.pageTitle = "#" + this.hash + " on hashgator";

			this.getPosts(function() {
				_this.postCount = _this.tiles.size();
				_this.displayTiles();
			});
			this.interval = setInterval(function() { _this.poll() }, 30000);
		},
		getPosts: function(poll, callback) {
			var _this = this;
			if(typeof poll == "function") {
				callback = poll;
				poll = false;
			}

			jQuery.when(
				this.tumblrTiles.fetch({
					success: function(posts) {
						_this.tiles.insert(posts.models);
						if(poll) _this.tiles.without(posts.models);
					}
				}),
				this.googleTiles.fetch({
					success: function(posts) {
						_this.tiles.insert(posts.models);
						if(poll) _this.tiles.without(posts.models);
					}
				})
			).done(jQuery.proxy(callback, this));
		},
		displayTiles: function() {
			var _this = this;
			var data = {};
			data.title = this.hash;
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
			this.getPosts(true, function() {
				this.newPostCount = this.tiles.size() - this.postCount;
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
			this.postCount = this.tiles.size();
			this.tiles.sort();
			this.displayTiles();
		}
	});

	return HashView;
});