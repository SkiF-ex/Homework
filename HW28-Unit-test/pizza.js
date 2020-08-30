const toppings = {
    bacon: 0.8,
    pepperoni: 0.75,
    sausage: 0.5,
    ham: 0.5,
    pineapple: 0.5,
    olives: 0.3,
    corn: 0.25,
    mushrooms: 0.25
};

const size = {
    small: 1,
    medium: 1.5,
    large: 2
};

class Pizza {

    get pizzaPrice() {
        if (!size[this.size]) {
            throw Error(`Size can't find`);
        }
        return size[this.size] * this.toppingsPrice;
    }

    get toppingsPrice() {
        return this.toppings.reduce((acc, i) => {
            if (!toppings) {
                throw Error(`Toppings can't find`);
            }

            if (!toppings[i]) {
                throw Error(`Topping ${i} can't find`);
            }

            return acc + toppings[i];
        }, 0)
    }

    constructor(toppings, size) {
        this.toppings = toppings;
        this.size = size;
    }
}
