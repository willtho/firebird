var firebird = firebird || {};

firebird.InventoryView = Backbone.View.extend({

	tagName: "div",

	events: {
		"click #removeSearch": "removeSearch"
	},

	initialize: function() {
		this.inventoryTemplate = _.template($("#inventoryTemplate").html());
	},

	render: function() {
		var self = this;

		self.$el.html(self.inventoryTemplate({
			category: self.category,
			search: self.search,
			categories: firebird.categories
		}));

		// workaround to make sure that the #removeSearch link found is the new one
		// todo: find a real solution
		setTimeout(function() { self.delegateEvents(); }, 10);
	},

	removeSearch: function() {
		this.setSearch("");
	},

	setCategory: function(id) {
		this.category = id == "all" ? 0 : id;
		this.render();
	},

	setSearch: function(search) {
		this.search = search;
		this.render();
	}

});