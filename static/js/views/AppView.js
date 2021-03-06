// AppView.js
// Top-level view responsible for navigation and setting up child views

var firebird = firebird || {};

firebird.modalDialog = function(title, contents, buttons) {
  var dialog = $("<div title=\"" + title + "\">" + contents + "</div>").dialog({
    buttons: buttons,
    draggable: false,
    modal: true,
    resizable: false
  });

  return dialog;
}

firebird.modalDialog2 = function(title, contents, buttons) {
  var dialog = firebird.modalDialog(title, contents, buttons);
  dialog.find("form > input").keypress(function(e) {
    if (e.keyCode == 13)
      dialog.find("form").submit();
  });
  return dialog;
}

firebird.AppView = Backbone.View.extend({

  initialize: function() {
    var self = this;

    self.categoryListTemplate = _.template($("#categoryListTemplate").html());

    // cache HTML elements
    self.$cartItemCount = self.$("#cartItemCount");
    self.$categoryList = self.$("#categoryList");
    self.$contentDiv = self.$("#contentDiv");
    self.$loginLink = self.$("#loginLink");
    self.$searchText = self.$("#searchText");

    // create the child views
    self.views = {};
    self.views.cart = new firebird.CartView();
    self.views.checkout = new firebird.CheckoutView();
    self.views.inventory = new firebird.InventoryView();
    self.views.item = new firebird.ItemView();

    self.$("#homeLink").click(function(e) {
      firebird.router.navigate("/", { trigger: true });
      e.preventDefault();
    });

    // update the inventory view when the inventory changes
    firebird.inventory.on("all", function() {
      self.views.inventory.render();
    });

    // update the category list when the categories change
    firebird.categories.on("add create remove reset change", function() {
      // handler for category link
      function navigateCategory(e) {
        // navigate to the correct category
        var id = $(this).data("category-id");

        // navigate to either /search or /shop, depending on whether the user has
        // entered a query
        var url = self.query ? "search/" + self.query + "/" : "shop/";
        url += id + "/p1";
        firebird.router.navigate(url, { trigger: true });

        e.preventDefault();
      }

      // fill in the category list and add handlers to the links
      self.$categoryList.html(self.categoryListTemplate({
        categories: firebird.categories,
        admin: firebird.app.loggedIn
      })).find("a").each(function() {
        var $this = $(this);
        $this.html($this.html().trim());
      }).filter(".categoryLink").each(function() {
        var $this = $(this), id = $this.data("category-id");

        if ("category" in self.views.inventory && id == self.category)
          $this.addClass("bold");
      });
      setTimeout(function() {
        // category link changes category
        self.$categoryList.find("a.categoryLink").click(navigateCategory);

        // edit category link opens edit dialog
        self.$categoryList.find("a.editLink").click(function(e) {
          var dialog = firebird.modalDialog("Rename Category", "<form>New Name: <input type='text' id='name'></form>", {
            "Rename": function() {
              dialog.find("form").submit();
            },
            "Cancel": function() {
              dialog.dialog("close");
            }
          }).submit(function(e) {
            dialog.category.save({ name: dialog.find("#name").val() });
            dialog.dialog("close");
            e.preventDefault();
          });
          dialog.category = firebird.categories.get($(this).data("category-id"));
          dialog.find("#name").val(dialog.category.get("name"));

          e.preventDefault();
        });

        // remove link destroys the category
        self.$categoryList.find("a.removeLink").click(function(e) {
          if (self.views.inventory.category == $(this).data("category-id"))
            firebird.router.navigate("shop/0/p1", { trigger: true });

          firebird.categories.get($(this).data("category-id")).destroy();
          e.preventDefault();
        });

        // add link opens a dialog to add a new category
        self.$categoryList.find("a.addLink").click(function(e) {
          var dialog = firebird.modalDialog("Add Category", "<form>Name: <input id='name'></form>", {
            "Add": function() {
              dialog.find("form").submit();
            },
            "Cancel": function() {
              dialog.dialog("close");
            }
          });
          dialog.find("form").submit(function(e) {
            firebird.categories.create({ name: dialog.find("#name").val() });
            setTimeout(function() { firebird.categories.fetch(); }, 250);
            dialog.dialog("close");
            e.preventDefault();
          });
          e.preventDefault();
        });
      }, 50);
    });

    // set up the "View Cart" link handler
    self.$("#viewCartLink").click(function(e) {
      firebird.router.navigate("cart", { trigger: true });
      e.preventDefault();
    });

    // update the link when the cart changes
    firebird.cart.on("all", function() {
      self.$cartItemCount.html(firebird.cart.getFormattedCount());
    });
    firebird.cart.trigger("change");

    // add the search event handler
    self.$("#searchForm").submit(function(e) {
      e.preventDefault();

      var query = self.$searchText.val();
      self.$searchText.val("");

      // don't allow an empty query
      if (!query)
        return;

      // if we're not in the inventory view, go to "All Items"
      var category = Math.max(self.category, 0),
          url = "search/" + query + "/" + category + "/p1";
      firebird.router.navigate(url, { trigger: true });
    });

    // login link handler
    self.$loginLink.html(self.$loginLink.html().trim());
    self.$loginLink.click(function(e) {
      e.preventDefault();

      if (firebird.app.loggedIn) {
        // log out
        $.post("/logout", function() {
          firebird.app.loggedIn = false;
          self.$loginLink.html("Log In");
          Notifier.success("Logged out.");
          firebird.categories.trigger("reset");

          var url = location.pathname;
          firebird.router.navigate("/logout", { replace: true });
          firebird.router.navigate(url, { trigger: true, replace: true });
        });
      }
      else {
        // log in
        var dialog = firebird.modalDialog2("Log In",
          "<form><input type='text' id='name'><input type='password' id='pass'></form>",
          {
            "Log In": function() {
              dialog.find("form").submit();
            },
            "Cancel": function() {
              dialog.dialog("close");
            }
          });

        // send the login request when the form is submitted
        dialog.find("form").submit(function(e) {
          $.post("/login", {
            username: dialog.find("#name").val(),
            password: dialog.find("#pass").val()
          }, function() {
            firebird.app.loggedIn = true;
            self.$loginLink.html("Log Out");
            dialog.dialog("close");
            firebird.categories.trigger("reset");
            Notifier.success("Logged in.");

            var url = location.pathname;
            firebird.router.navigate("/login", { replace: true });
            firebird.router.navigate(url, { trigger: true, replace: true });
          }).error(function() {
            Notifier.error("Could not log in.");
          });

          e.preventDefault();
        });
      }
    });
  },

  // navigation actions
  navigateCart: function() {
    var self = this;

    self.category = -1;
    self.query = "";

    // update the UI
    self.$categoryList.children("a.categoryLink").removeClass("bold");
    document.title = "James' Magic Shop - Shopping Cart";
    self.transition(self.views.cart);
  },

  navigateCheckout: function() {
    var self = this;

    self.category = -1;
    self.query = "";

    // update the UI
    self.$categoryList.children("a.categoryLink").removeClass("bold");
    document.title = "James' Magic Shop - Checkout";
    self.transition(self.views.checkout);
  },

  navigateInventory: function(category, page, query) {
    var self = this;

    self.category = category;
    self.query = query;

    // update the UI
    self.$categoryList.children("a.categoryLink").removeClass("bold").each(function() {
      var $this = $(this), id = $this.data("category-id");

      if (id == category)
        $this.addClass("bold");
    });
    var categoryTitle = category ? " - " + firebird.categories.get(category).get("name") : "";
    document.title = "James' Magic Shop" + categoryTitle;

    self.views.inventory.setCategory(category).setPage(page).setQuery(query);
    self.transition(self.views.inventory);
  },

  navigateItem: function(id) {
    var self = this;

    self.category = -1;
    self.query = "";

    // update the UI
    self.$categoryList.children("a.categoryLink").removeClass("bold");
    document.title = "James' Magic Shop - " + firebird.inventory.get(id).get("name");

    self.views.item.setID(id);
    self.transition(self.views.item);
  },

  // fade out the content area, replace the content and fade back in
  transition: function(view) {
    var self = this;

    self.$contentDiv.fadeOut(150, function() {
      self.$contentDiv.html(view.render());
      self.$contentDiv.fadeIn(150);
    });
  }

});
