// Cart.js
// Client-side representation of the shopping cart

var firebird = firebird || {};

firebird.Cart = Backbone.Collection.extend({

  model: firebird.CartItem,

  // return the number of items formatted for use in the "View Cart" link
  getFormattedCount: function() {
    switch (this.length) {
      case 0:
        return "empty";
      case 1:
        return "1 item";
      default:
        return this.length + " items";
    }
  }

});
