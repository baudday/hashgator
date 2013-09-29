define([
	'backbone',
	'models/HashModel',
	'collections/HashesCollection',
	'views/HashesListView'
], function(Backbone, HashModel, HashesCollection, HashesListView) {
	var LeftView = Backbone.View.extend({
		el: '.left',
		hashesList: new HashesListView(),
		initialize: function() {
			this.hashesList.render();
		},
		events: {
			'submit #newhashform': 'processHash'
		},
		processHash: function(e) {
			e.preventDefault();
			e.returnValue = false;

			// Store the value and remove any white space or disallowed chars
			var hash = e.target[0].value.replace(/\s/g, "").replace(/\W/g, "");
			if(hash){
				var newHashModel = new HashModel({
					id: hash, 
					title: hash, 
					active: false
				});
				this.hashesList.hashes.addHash(newHashModel);

				e.target[0].value = "";
				$("#hashes").html("");

				Backbone.history.navigate("#/hash/" + hash, {trigger: true});

				this.hashesList.render();
			}

        	return false;
		}
	});

	return LeftView;
});