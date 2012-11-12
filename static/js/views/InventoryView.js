var firebird = firebird || {};

firebird.InventoryView = Backbone.View.extend({

	tagName: "div",

	events: {
		"click #removeSearch": "removeSearch"
	},

	initialize: function() {
		this.page = 0;
		this.items = [];

		// cache templates
		this.inventoryTemplate = _.template($("#inventoryTemplate").html());
		this.itemListTemplate = _.template($("#itemListTemplate").html());
	},

	render: function() {
		var self = this;

		self.$el.html(self.inventoryTemplate({
			category: self.category,
			search: self.search,
			categories: firebird.categories
		}));

		self.page = 0;
		self.renderItemList();

		// workaround to make sure that the #removeSearch link found is the new one
		// todo: find a real solution
		setTimeout(function() { self.delegateEvents(); }, 10);
	},

	renderItemList: function() {
		var self = this;

		// filter the inventory based on the selected category and search criteria
		self.items = _.pluck(firebird.inventory.models, "attributes");

		if (self.category != 0)
			self.items = _.where(self.items, { category: parseInt(this.category) });

		if (self.search) {
			// split the query into words at the spaces
			var search = self.search.toLowerCase().split(" ");

			self.items = _.filter(self.items, function(item) {
				// return items where each word in the query is found in either
				// the name or the description
				return _.all(search, function(word) {
					return item.name.toLowerCase().search(word) > -1 ||
					       item.desc.toLowerCase().search(word) > -1;
				});
			});
		}

		// set up the page links
		var pages = Math.ceil(self.items.length / 12);
		self.$("#itemList").html(self.itemListTemplate({ pages: pages }));

		setTimeout(function() {
			self.$(".navPage").click(function() {
				self.page = parseInt($(this).html()) - 1;
				self.populateItemList();
			});

			self.populateItemList();
		}, 10);
	},

	populateItemList: function() {
		var self = this;

		// set the link for the current page to bold
		self.$(".navPage").removeClass("bold").filter(function() {
			return parseInt($(this).html()) == self.page + 1;
		}).addClass("bold");

		// get the items on the current page
		var items = _.first(_.rest(self.items, self.page * 12), 12);

		// display the items
		var $itemListItems = self.$("#itemListItems"), $row = $("<div class='span-18 last'></div>"), cols = 0;
		$itemListItems.empty();

		_.each(items, function(item) {
			var priceHTML = item.price.toFixed(2);

			if (item.price != item.salePrice)
				priceHTML = "<strike>" + priceHTML + "</strike><br><span class='sale'>$" + item.salePrice + "</span>";

			var $div = $("<div class='span-4'><div class='item-div'></div></div>");
			$div.children().append("<a class='dark'><b>" + item.name + "</b></a>")
			    .append("<img class='item-image' src='img/item" + item.id + ".png'>")
			    .append("<div style='text-align: center;'><b>$" + priceHTML + "</b></div>");
			$row.append($div);

			// add the row and start a new one
			if (++cols == 4) {
				$itemListItems.append($row);
				cols = 0;
				$row = $("<div class='span-18 last'></div>");
			}
		});

		if (cols != 0)
			$itemListItems.append($row);
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
