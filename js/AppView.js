function AppView() {};

AppView.prototype.showView = function(view) {
	this.currentView = view;
	this.currentView.render();
}