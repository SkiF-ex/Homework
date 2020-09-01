class Order {

    pizzas = [];

    get totalPrice() {
        return this.pizzas.reduce((acc, i) => {
            if (i.pizzaPrice === 0) {
                console.error(`Pizza can't cost 0 USD`);
                return acc;
            }
            if (!i.pizzaPrice) {
                console.error(`Pizza must have a price`);
                return +acc;
            }
            return +(acc + i.pizzaPrice).toFixed(2);
        }, 0)
    }

    constructor(customerDetails, deliveryAddress) {
    }

    addPizza(pizza) {
        this.pizzas.push(pizza);
    }

    removePizza(index) {
        this.pizzas.splice(index, 1);
    }
}
