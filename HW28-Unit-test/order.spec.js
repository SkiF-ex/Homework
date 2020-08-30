describe('order.js', () => {
  let order;
  let spyTotalPrice;

  beforeEach(() => {
    order = new Order(); 
    spyTotalPrice = spyOnProperty(order, 'totalPrice').and.callThrough();
    order.addPizza(new Pizza (['olives'], 'large'));
  });

  afterEach(() => {
    order.removePizza('Pizza');
  })

  it('should initialize pizzas array', () => {
    expect(order.pizzas).toBeArray();
  });

  it('shoud contain objects in pizzas array', () => {
    expect(order.pizzas).toBeArrayOfObjects();
  })

  describe('addPizza', () => {
    it('should push pizza in array', () => {
      expect(order.pizzas).toBeArrayOfSize(1);
    });
  })

  describe('removePizza', () => {
    it('should remove passed pizza from pizzas', () => {
      order.pizzas = ['pizza'];
      order.removePizza('pizza');
      expect(order.pizzas).toBeArrayOfSize(0);
    });
  })

  describe('totalPrice', () => {
    afterEach(() => {
      order.removePizza('Pizza');
    });

    it('should calculate total price', () => {
      expect(order.totalPrice).toBe(0.6);
    });

    it(`should throw error 'Pizza can't cost 0 USD'`, () => {
      const test = {pizzaPrice: 0, toppings: 'olives', size: 'large'}
      order.addPizza(test);

      expect(() => order.totalPrice).toThrowError(`Pizza can't cost 0 USD`);
      order.removePizza(test);
    });

    it(`should throw error message 'Pizza must have a price'`, () => {
      this.pizzas = ['pizza'];

      expect(spyTotalPrice).toThrowError(`Pizza must have a price`);
    });
  });
});