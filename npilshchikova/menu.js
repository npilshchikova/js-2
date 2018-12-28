/**
 * Menu interface
 */
module.exports = {

    items: [],

    /**
     * Add new Humburger with stuffing and size specified to menu
     * 
     * @param {String} size 
     * @param {String} stuffing 
     */
    addHamburger(size, stuffing) {
        var newStuffing;
        var newHamburger;

        // select stuffing
        switch (stuffing) {
            case Stuffing.CHEESE:
                newStuffing = new Stuffing(stuffing, price=10, calories=20);
                break;
            case Stuffing.POTATO:
                newStuffing = new Stuffing(stuffing, price=15, calories=10);
                break;
            default:
                newStuffing = new Stuffing(stuffing, price=20, calories=5);
        };

        // select size
        switch (size) {
            case Hamburger.SMALL:
                newHamburger = new Hamburger(size, stuffing=newStuffing, price=50, calories=20);
                break;
            default:
                newHamburger = new Hamburger(size, stuffing=Stuffing, price=100, calories=40);
        }

        // add Hamburger to menu
        this.items.push(newHamburger);

        return this;
    },

    /**
     * Add defined amount of Salad to menu
     * 
     * @param {String} name 
     * @param {Number} weight 
     */
    addSalad(name, weight) {
        
        // if Salad already added, just increase it's amount
        var saladFound = false;
        for (var i = 0; i < this.items.length; i++) {
            var nextItem = this.items[i];
            if (nextItem.type === Meal.SALAD && nextItem.name === name) {
                nextItem.weight += weight;
                saladFound = true;
            }
        }

        // otherwise, add new Salad
        if (!saladFound) {
            var newSalad;

            switch (name) {
                case Salad.RUSSIAN:
                    newSalad = new Salad(name, weight, price=50, calories=80);
                    break;
                default:
                    newSalad = new Salad(name, weight, price=100, calories=20);
            }
            this.items.push(newSalad);
        }

        return this;
    },

    /**
     * Add defined Drink to menu
     * 
     * @param {String} name 
     */
    addDrink(name) {
        var newDrink;

        // select drink
        switch (name) {
            case Drink.COLA:
                newDrink = new Drink(name, price=50, calories=40);
                break;
            default:
                newDrink = new Drink(name, price=80, calories=20);
        }

        // add Hamburger to menu
        this.items.push(newDrink);

        return this;
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
    
    /**
     * Submut current order
     * After that, it is impossible to add or remove items from order
     */
    submit() {
        Object.defineProperty(this, 'items', {writable: false});
    },

    /**
     * Calculate price for items selected
     */
    calculatePrice() {
        var price = 0;
        for (var i = 0; i < this.items.length; i++) {
            price += this.items[i].calculatePrice();
        }
        return price;
    },

    /**
     * Calculate calories for items selected
     */
    calculateCalories() {
        var calories = 0;
        for (var i = 0; i < this.items.length; i++) {
            calories += this.items[i].calculateCalories();
        }
        return calories;
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
Meal.SALAD = 'salad';
Meal.HAMBURGER = 'hamburger';
Meal.STUFFING = 'stuffing';
Meal.DRINK = 'drink';

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
    Meal.call(this, Meal.STUFFING, price, calories);
    this.name = name;
}
Stuffing.prototype = Object.create(Meal.prototype);
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
    Meal.call(this, Meal.HAMBURGER, price, calories);
    this.size = size;
    this.stuffing = stuffing;
}
Hamburger.prototype = Object.create(Meal.prototype);
Hamburger.prototype.constructor = Hamburger;
Hamburger.SMALL = 'small';
Hamburger.LARGE = 'large';

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
    Meal.call(this, Meal.SALAD, price, calories);
    this.name = name;
    this.weight = weight;
}
Salad.prototype = Object.create(Meal.prototype);
Salad.prototype.constructor = Salad;
Salad.RUSSIAN = 'russian salad';
Salad.CAESAR = 'caesar';

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
    Meal.call(this, Meal.DRINK, price, calories);
    this.name = name;
}
Drink.prototype = Object.create(Meal.prototype);
Drink.prototype.constructor = Drink;
Drink.COLA = 'cola';
Drink.COFFEE = 'coffee';