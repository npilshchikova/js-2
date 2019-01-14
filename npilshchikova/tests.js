function testMenu() {
    // tests module
    var assert = require('assert');

    // order object
    var order = require('./menu.js');

    // configure new order and check calculations
    order.addHamburger('small', 'salad').addHamburger('large', 'potato');

    console.log('\tYour order price:', order.calculatePrice());
    assert.equal(order.calculatePrice(), (50 + 20 + 100 + 15), 'error in price calculation');
    console.log('\tYour order caloricity:', order.calculateCalories());
    assert.equal(order.calculateCalories(), 20 + 5 + 40 + 10, 'error in calories calculation');

    order.addDrink('cola').addSalad('russian', 100);

    console.log('\tYour order price:', order.calculatePrice());
    assert.equal(order.calculatePrice(), (50 + 20 + 100 + 15 + 50 + 50), 'error in price calculation');
    console.log('\tYour order caloricity:', order.calculateCalories());
    assert.equal(order.calculateCalories(), (20 + 5 + 40 + 10 + 40 + 80), 'error in calories calculation');

    order.removeHamburger('small', 'salad').removeDrink('cola');

    console.log('\tYour order price:', order.calculatePrice());
    assert.equal(order.calculatePrice(), (100 + 15 + 50), 'error in price calculation');
    console.log('\tYour order caloricity:', order.calculateCalories());
    assert.equal(order.calculateCalories(), (40 + 10 + 80), 'error in calories calculation');

    order.removeSalad('russian', 50);

    console.log('\tYour order price:', order.calculatePrice());
    assert.equal(order.calculatePrice(), (100 + 15 + 25), 'error in price calculation');
    console.log('\tYour order caloricity:', order.calculateCalories());
    assert.equal(order.calculateCalories(), (40 + 10 + 40), 'error in calories calculation');

    order.removeSalad('russian');

    console.log('\tYour order price:', order.calculatePrice());
    assert.equal(order.calculatePrice(), 100 + 15, 'error in price calculation');
    console.log('\tYour order caloricity:', order.calculateCalories());
    assert.equal(order.calculateCalories(), 40 + 10, 'error in calories calculation');

    // submit order
    order.submit();

    // check that it is impossible to update order
    order.addSalad('russian', 500);

    console.log('\tYour order price:', order.calculatePrice());
    assert.equal(order.calculatePrice(), 100 + 15, 'error in price calculation');
    console.log('\tYour order caloricity:', order.calculateCalories());
    assert.equal(order.calculateCalories(), 40 + 10, 'error in calories calculation');

}

testMenu();

console.log('Ok');