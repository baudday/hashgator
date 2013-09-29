define([
	'backbone',
	'models/HashModel'
], function(Backbone, HashModel) {
	var HashesCollection = Backbone.Collection.extend({
		model: HashModel,
		comparator: "id",
		initialize: function() {
			if(typeof(Storage) !== "undefined") {
				// Web storage support
				if(localStorage.hashes != "") {
					this.set(JSON.parse(localStorage.getItem("hashes")));
				}
			}
		},
		addHash: function(model) {
			this.set(model, {remove: false});
			this.saveToStorage();
		},
		removeHash: function(model) {
			this.remove(model);
			this.saveToStorage();
		},
		saveToStorage: function() {
			localStorage.hashes = JSON.stringify(this.models);
		}
	});

	return HashesCollection;
})