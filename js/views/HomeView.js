define([
	'backbone',
	'text!../../templates/home/HomeTemplate.html',
	'views/LeftView'
], function(Backbone, HomeTemplate, LeftView) {
	var HomeView = Backbone.View.extend({
		el: '.body',
		render: function() {
			new LeftView();
			var homeTemplate = _.template(HomeTemplate);
			this.$el.html(homeTemplate);
		}
	});

	return HomeView;
});