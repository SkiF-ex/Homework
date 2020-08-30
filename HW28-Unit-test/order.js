class Order {

    pizzas = [];

    get totalPrice() {
        return this.pizzas.reduce((acc, i) => {
            if (i.pizzaPrice === 0) {
                throw Error(`Pizza can't cost 0 USD`)
            }
            if (!i.pizzaPrice) {
                throw Error(`Pizza must have a price`)
            }
            return acc + i.pizzaPrice;
        }, 0)
    }

    constructor(customerDetails, deliveryAddress) {
    }

    addPizza(pizza) {
        this.pizzas.push(pizza);
    }

    removePizza(pizza) {
        const index = this.pizzas.indexOf(pizza);
        this.pizzas.splice(index, 1);
    }
}
