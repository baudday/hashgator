define([
	'backbone',
	'models/TileModel'
], function(Backbone, TileModel) {
	var TilesCollection = Backbone.Collection.extend({
		model: TileModel,
		counter: [],
		tagsString: "",
		initialize: function(models, options) {
			this.tag = options.tag;
		},
		comparator: function(tile) {
			return -tile.get('date');
		},
		insert: function(models) {
			var _this = this;
			this.counter = [];
			_.each(models, function(model) {
				var tags = model.get('tags'),
					body = model.get('body');

				_this.getPostTags(tags, function() {
					if(this.tagsString != "") {
						model.set('tagsString', _this.tagsString);
					}
				});

				_this.getPopularTags(tags);
			});

			this.add(models);
		},
		getPostTags: function(tags, callback) {
			this.tagsString = "";
			if(tags) {
				for(var i = 0; i < tags.length; i++) {
					tags[i] = tags[i].replace(/\s/g, "").replace(/\W/g, "");
					if(tags[i] && tags[i] != " ") {
						this.tagsString += '<a href="#/hash/' 
							+ tags[i] + '">#' + tags[i] + '</a>, ';
					}
				}
				this.tagsString = this.tagsString.substring(0, this.tagsString.length-2);
			}

			callback();
		},
		getPopularTags: function(tags) {
			this.countTags(tags);
			this.popularTags = "";

			for(var i = 0; i < 10; i++) {
				var tag = this.counter[i];
				if(tag) {
					this.popularTags += '<a href="#/hash/' + tag.name + '">#'
						+ tag.name + '</a>, ';
				}
			}

			this.popularTags = this.popularTags.substring(0, this.popularTags.length-2);
		},
		countTags: function(tags) {
			for(var i = 0; i < tags.length; i++) {
				var tag = tags[i].toLowerCase();
				var found = false;

				if(tag !== this.tag.toLowerCase()) {
					_.each(this.counter, function(item) {
						if(item.name === tag) {
							found = true;
							item.count++;
						}
					});

					if(!found) {
						this.counter.push({
							name: tag,
							count: 1
						});
					}
				}
			}

			this.counter.sort(function(a, b) {
				return b.count-a.count;
			});
		}
	});

	return TilesCollection;
})