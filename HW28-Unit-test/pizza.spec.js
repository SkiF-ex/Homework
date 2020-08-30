describe('pizza.js', () => {
  let pizza;
  let spyPizzaPrice;

  beforeEach(() => {
    pizza = new Pizza(); 
    spyPizzaPrice = spyOnProperty(pizza, 'pizzaPrice').and.callThrough();
  });

  afterEach(() => {
    size[this.size] = 0;
  });
  
  describe('pizzaPrice', () => {
    it('should throw error(Size can`t find)', () => {
      expect(spyPizzaPrice).toThrowError(`Size can't find`);
    });
  
    it('should calculate pizza price', () => {
      const spyToppingsPrice = spyOnProperty(pizza, 'toppingsPrice').and.returnValue(2);
      size[this.size] = 2;

      expect(pizza.pizzaPrice).toBe(4);
    });
  });

  describe('toppingsPrice', () => {
    let spyToppingsPrice;

    beforeEach(() => {
      spyToppingsPrice = spyOnProperty(pizza, 'toppingsPrice').and.callThrough();
    });

    afterEach(() => {
      pizza.toppings = [];
      this.toppings = [];
    });

    it('should calculate toppings price', () => {
      pizza.toppings = ['olives', 'mushrooms'];

      expect(pizza.toppingsPrice).toBe(0.55);
    });

    it('should throw error `Topping ${i} can`t find`', () => {
      this.toppings = ['fake'];

      expect(spyToppingsPrice).toThrowError(`Topping fake can't find`);
    });

  });
})