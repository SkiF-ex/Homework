describe('order.js', () => {
  let order;
  let spyTotalPrice;
  let errorSpy;

  beforeEach(() => {
    order = new Order(); 
    spyTotalPrice = spyOnProperty(order, 'totalPrice').and.callThrough();
    order.addPizza(new Pizza (['olives'], 'large'));
    errorSpy = spyOn(console, 'error'); 
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

    it(`should return error message 'Pizza must have a price'`, () => {
      const test = {toppings: ['ham'], size: 'small'};
      
      order.addPizza(test);
      order.totalPrice;

      expect(errorSpy).toHaveBeenCalledWith(`Pizza must have a price`);
    });

    it(`should throw error message 'Pizza can't cost 0 USD'`, () => {
      const test = { pizzaPrice: 0, toppings: ['ham'], size: 'small'};

      order.addPizza(test);
      order.totalPrice;

      expect(errorSpy).toHaveBeenCalledWith(`Pizza can't cost 0 USD`);
    });
  });
});