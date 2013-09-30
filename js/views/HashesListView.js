define([
	'backbone',
	'models/HashModel',
	'collections/HashesCollection'
], function(Backbone, HashModel, HashesCollection) {
	var HashesListView = Backbone.View.extend({
		el: '#hashes-list',
		hashes: new HashesCollection(),
		page: Backbone.history.location.hash.split("/")[2],
		initialize: function() {
			this.render();
		},
		render: function() {
			var _this = this;

			this.page = Backbone.history.location.hash.split("/")[2];
			this.$el.html("");
			this.hashes.each(function(hash) {
				if(_this.page) {
					hash.set({
					active: _this.page.toLowerCase() 
							== hash.get('title').toLowerCase()
					});
				}

				_this.$el.append(
					"<a href='#/hash/" + hash.get("title") 
					+ "' class='hash list-group-item " 
					+ (hash.get("active") ? "active" : "") + "' "
					+ "id='" + hash.get("title") + "'>#" 
					+ hash.get("title") 
					+ "<button type='button' class='close remove-hash'>&times;</button></a>"
				);
			});
		},
		events: {
			'click .hash': 'render',
			'click .remove-hash': 'removeHash'
		},
		removeHash: function(e) {
			e.preventDefault();
			e.returnValue = false;
			var id = $(e.target).parent().attr("id");
			
			this.hashes.removeHash({id: id});
		}
	});

	return HashesListView;
});