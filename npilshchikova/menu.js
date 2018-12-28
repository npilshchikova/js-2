/**
 * Menu interface
 */
module.exports = {

    items = [],

    addHamburger(size, stuffing) {
        // new Hamburger to menu
    },

    addSalad(name, weight) {
        // new Salad to menu
    },

    addDrink(name) {
        // new drink to menu
    },

    removeHamburger(size, stuffing) {
        // remove current Hamburger if exists
    },

    removeSalad(name, weight) {
        // remove target amount of salad from items array if exists
    },

    removeDrink(name) {
        // remove target drink if exists
    },
    
    pay() {
        // items list should became immutable
    }

}


/**
 * General Meal object 
 * 
 * @constructor
 * @param {String} type
 * @param {Number} price
 * @param {Number} calories
 */
function Meal(type, price, calories) {
    this.type = type;
    this.price = price;
    this.calories = calories;
}

/**
 * Calculate Meal price
 * @return {Number} Price in tugrics
 */
Meal.prototype.calculatePrice = function() {
    return this.price;
}

/**
 * Calculate Meal calories
 * @return {Number} Calories
 */
Meal.prototype.calculateCalories = function() {
    return this.calories;
}

/**
 * Hamburger stuffing as Meal type
 * 
 * @constructor
 * @param {String} name      Stuffing name
 * @param {Number} price
 * @param {Number} calories
 */
function Stuffing(name, price, calories) {
    Meal.call(this, 'stuffing', price, calories);
    this.name = name;
}
Stuffing.prototype = Object.create(Meal);
Stuffing.prototype.constructor = Stuffing;
Stuffing.SALAD = 'salad';
Stuffing.CHEESE = 'cheese';
Stuffing.POTATO = 'potato';

/**
 * Hamburger with stuffing as Meal type
 * 
 * @constructor
 * @param {String} size        Hamburger size, small or large
 * @param {Stuffing} stuffing  Hamburger stuffing
 * @param {Number} price
 * @param {Number} calories
 */
function Hamburger(size, stuffing, price, calories) {
    Meal.call(this, 'hamburger', price, calories);
    this.size = size;
    this.stuffing = stuffing;
}
Hamburger.prototype = Object.create(Meal);
Hamburger.prototype.constructor = Hamburger;
Hamburger.SIZE_SMALL = 'small';
Hamburger.SIZE_LARGE = 'large';

/**
 * Calculate price of Hamburger including stuffing
 * @return {Number} Price in tugrics
 */
Hamburger.prototype.calculatePrice = function() {
    return this.price + this.stuffing.calculatePrice();
}

/**
 * Calculate calories for Hamburger including stuffing
 * @return {Number} Calories
 */
Hamburger.prototype.calculateCalories = function() {
    return this.calories + this.stuffing.calculateCalories();
}

/**
 * Salad as Meal type
 * 
 * @constructor
 * @param {String} name      Salad name
 * @param {Number} weight    Portion size in gramms
 * @param {Number} price     Price per 100 gramm
 * @param {Number} calories  Calories per 100 gramm
 */
function Salad(name, weight, price, calories) {
    Meal.call(this, 'salad', price, calories);
    this.name = name;
    this.weight = weight;
}
Salad.prototype = Object.create(Meal);
Salad.prototype.constructor = Salad;

/**
 * Calculate price of Salad with portion weight taken into account
 * @return {Number} Price in tugrics
 */
Salad.prototype.calculatePrice = function() {
    return this.price * this.weight / 100;
}
Salad.prototype.calculateCalories = function() {
    return this.calories * this.weight / 100;
}

/**
 * Drink as Meal type
 * 
 * @constructor
 * @param name
 * @param price
 * @param calories
 */
function Drink(name, price, calories) {
    Meal.call(this, 'drink', price, calories);
    this.name = name;
}
Drink.prototype = Object.create(Meal);
Drink.prototype.constructor = Drink;
Drink.COLA = 'cola';
Drink.COFFEE = 'coffee';
