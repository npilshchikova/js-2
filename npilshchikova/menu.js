/**
 * Menu interface
 */
module.exports = {

    items: [],
    _submitted: false,

    /**
     * Add new Humburger with stuffing and size specified to order
     * 
     * @param {String} size 
     * @param {String} stuffing 
     */
    addHamburger(size, stuffing) {

        if (this._submitted) {
            console.log('order was submitted and can not be updated any more');
            return this;
        }

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
                newHamburger = new Hamburger(size, stuffing=newStuffing, price=100, calories=40);
        }

        // add Hamburger to order
        this.items.push(newHamburger);
        console.log(newHamburger.type, newHamburger.size, 
            'with', newHamburger.stuffing.name, 'added to order');

        return this;
    },

    /**
     * Add defined amount of Salad to order
     * 
     * @param {String} name 
     * @param {Number} weight 
     */
    addSalad(name, weight) {

        if (this._submitted) {
            console.log('order was submitted and can not be updated any more');
            return this;
        }
        
        // if Salad already added, just increase it's amount
        var saladFound = false;
        for (var i = 0; i < this.items.length; i++) {
            var nextItem = this.items[i];
            if (nextItem.type === Meal.SALAD && nextItem.name === name) {
                nextItem.weight += weight;
                saladFound = true;
                console.log(String(weight), 'gramm of', name, Meal.SALAD, 'added to order');
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
            console.log(String(weight), 'gramm of', newSalad.name, Meal.SALAD, 'added to order');
        }

        return this;
    },

    /**
     * Add defined Drink to order
     * 
     * @param {String} name 
     */
    addDrink(name) {

        if (this._submitted) {
            console.log('order was submitted and can not be updated any more');
            return this;
        }

        var newDrink;

        // select drink
        switch (name) {
            case Drink.COLA:
                newDrink = new Drink(name, price=50, calories=40);
                break;
            default:
                newDrink = new Drink(name, price=80, calories=20);
        }

        // add Drink to order
        this.items.push(newDrink);
        console.log(newDrink.name, 'added to order');

        return this;
    },

    removeHamburger(size, stuffing) {

        if (this._submitted) {
            console.log('order was submitted and can not be updated any more');
            return this;
        }

        // try to find hamburger in order
        var index = -1;
        for (var i = 0; i < this.items.length; i++) {
            var nextItem = this.items[i];
            if (nextItem.type === Meal.HAMBURGER & nextItem.size === size & nextItem.stuffing.name === stuffing) {
                index = i;
                break
            }
        }

        // remove hamburger if found
        if (index >= 0) {
            var removedItem = this.items.splice(index, 1);
            console.log(Meal.HAMBURGER, removedItem[0].size, 'with', stuffing, 'was removed from order');
        } else {
            console.log(Meal.HAMBURGER, size, 'with', stuffing, 'to remove not found in order');
        }

        return this;
    },

    removeSalad(name, weight) {

        if (this._submitted) {
            console.log('order was submitted and can not be updated any more');
            return this;
        }

        // try to find salad in order
        var index = -1;
        for (var i = 0; i < this.items.length; i++) {
            var nextItem = this.items[i];
            if (nextItem.type === Meal.SALAD & nextItem.name === name) {
                index = i;
                break
            }
        }

        // remove defined amound of salad if found
        if (index >= 0) {
            if (weight == undefined | this.items[index].weight <= weight) {
                // remove salad object from order sinse zero weight remains
                var removedItem = this.items.splice(index, 1);
                console.log(removedItem[0].name, Meal.SALAD, 'was removed from order');
            } else {
                // decrease weight of salad in order
                this.items[index].weight -= weight;
                console.log(String(weight), 'gramm of', name, Meal.SALAD, 'was removed from order');
            }
        } else {
            console.log(name, Meal.SALAD, 'to remove not found in order');
        }

        return this;
    },

    /**
     * Remove target Drink from order if exists
     * 
     * @param {String} name 
     */
    removeDrink(name) {

        if (this._submitted) {
            console.log('order was submitted and can not be updated any more');
            return this;
        }

        // try to find drink in order
        var index = -1;
        for (var i = 0; i < this.items.length; i++) {
            var nextItem = this.items[i];
            if (nextItem.type === Meal.DRINK & nextItem.name === name) {
                index = i;
                break
            }
        }

        // remove drink if found
        if (index >= 0) {
            var removedItem = this.items.splice(index, 1);
            console.log(removedItem[0].name, 'was removed from order');
        } else {
            console.log(name, 'to remove not found in order');
        }

        return this;
    },
    
    /**
     * Submit current order
     * After that, it is impossible to add or remove items from order
     */
    submit() {
        // freeze each item content
        for (var i = 0; i < this.items.length; i++) {
            var nextItem = this.items[i];
            Object.freeze(nextItem);
        }

        // freeze items length
        Object.freeze(this.items);

        // mark order as submitted
        this._submitted = true;
        console.log('order submitted');
    },

    /**
     * Calculate price for order
     */
    calculatePrice() {
        var price = 0;
        for (var i = 0; i < this.items.length; i++) {
            price += this.items[i].calculatePrice();
        }
        return price;
    },

    /**
     * Calculate calories for order
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
 * 
 * @return {Number} Price in tugrics
 */
Meal.prototype.calculatePrice = function() {
    return this.price;
}

/**
 * Calculate Meal calories
 * 
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
 * 
 * @return {Number} Price in tugrics
 */
Hamburger.prototype.calculatePrice = function() {
    return this.price + this.stuffing.calculatePrice();
}

/**
 * Calculate calories for Hamburger including stuffing
 * 
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
Salad.RUSSIAN = 'russian';
Salad.CAESAR = 'caesar';

/**
 * Calculate price of Salad with portion weight taken into account
 * 
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