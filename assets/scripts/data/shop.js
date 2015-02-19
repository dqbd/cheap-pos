// var app = app || {};
var Backbone = require("backbone");

var ShopItem = Backbone.Model.extend({
	defaults: {
		"price": 0,
		"ammount": 1
	},
	getTotal: function() {
		return this.get("price") * this.get("ammount");
	}
});

var ShopCart = Backbone.Collection.extend({
	model: ShopItem 
}); 

var ShopCustomer = Backbone.Model.extend({
	defaults: {
		"itemList": [], 
		"screen": "0",
		"selectedItem": -1,
		"mode": "add"
	},
	addItem: function(shopItem) {
		return this.get("itemList").indexOf(this.get("itemList").add(shopItem));
	},
	getItem: function(position) {
		position = position || this.get("selectedItem");

		return this.get("itemList").at(position);
	},
	removeItem: function(position) {
		return this.get("itemList").remove(this.getItem(position));
	},
	getCount: function() {
		return this.get("itemList").length;
	},
	getTotal: function() {
		return this.get("itemList").reduce(function(memo, item) {
			return memo + item.get("ammount")*item.get("price");
		}, 0);
	},
	getItems: function() {
		return this.get("itemList");
	},
	clearItems: function() {
		this.set("itemList", []);
		this.initialize();
	},
	setScreen: function(screen, mode) {
		mode = mode || "add";
		this.set("screen", String(screen));
		this.set("mode", mode);
	},
	initialize: function() {
		this.set("itemList", new ShopCart(this.get("itemList")))
	}
});

var ShopCustomerCollection = Backbone.Collection.extend({
	model: ShopCustomer
});

var Shop = Backbone.Model.extend({
	defaults: {
		"customerList": [],
		"activeCustomer": 0
	},
	addCustomer: function(customer) {
		this.get("customerList").add(customer);
	},
	getCustomer: function(customer) {
		customer = customer || this.get("activeCustomer");

		return this.get("customerList").at(customer);
	},
	initialize: function() {
        this.set("customerList", new ShopCustomerCollection(this.get("customerList")))
    }
});

module.exports = {
	"Shop": Shop,
	"ShopCustomerCollection": ShopCustomerCollection,
	"ShopCustomer": ShopCustomer,
	"ShopCart": ShopCart,
	"ShopItem": ShopItem
}