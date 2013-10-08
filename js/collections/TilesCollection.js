define([
	'backbone',
	'models/TileModel'
], function(Backbone, TileModel) {
	var TilesCollection = Backbone.Collection.extend({
		model: TileModel,
		counter: [],
		initialize: function(models, options) {
			this.tag = options.tag;
		},
		comparator: function(tile) {
			return -tile.get('date');
		},
		insert: function(models) {
			var _this = this;
			var tagsString = "";
			this.counter = [];
			_.each(models, function(model) {
				var tags = model.get('tags'),
					body = model.get('body'),
					tagsString = "";

				if(tags) {
					for(var i = 0; i < tags.length; i++) {
						var tag = tags[i],
							stripped = tag.replace(/\s/g, "").replace(/\W/g, "");
						if(stripped && stripped != " ") {
							if(i === tags.length - 1) {
								tagsString += '<a href="#/hash/' + stripped + '">#' + stripped + '</a>';
							} else {
								tagsString += '<a href="#/hash/' + stripped + '">#' + stripped + '</a>, ';
							}
						}
					}
				}
				if(tagsString != "") {
					model.set('tagsString', tagsString);
				}
				_this.getPopularTags(tags);
			});

			this.add(models);
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
		}
	});

	return TilesCollection;
})