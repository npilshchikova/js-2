function testMenu() {
    // tests module
    var assert = require('assert');

    // order object
    var order = require('./menu.js');

    order.addHamburger('small', 'salad');
    order.addHamburger('large', 'potato').addDrink('cola');

    console.log('Your order price:', order.calculatePrice());
    console.log('Your order caloricity:', order.calculateCalories());

    order.removeHamburger('small', 'salad');
    order.removeDrink('cola');

    console.log('Your order price:', order.calculatePrice());
    console.log('Your order caloricity:', order.calculateCalories());

    order.submit();

    order.addSalad('russian', 500);
    console.log('Your order price:', order.calculatePrice());
    console.log('Your order caloricity:', order.calculateCalories());

}

testMenu();

console.log('Ok');