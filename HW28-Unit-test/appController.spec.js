describe('appController.js', () => {
    let appController;
    let pizzaToppingsElem;
    let orderElem;

    beforeEach(() => {
        appController = new AppController();
        window.appController = new AppController();

        pizzaToppingsElem = document.createElement('div');
        pizzaToppingsElem.classList.add('container');
        document.body.appendChild(pizzaToppingsElem);
        const form = `
        <form class="pizza-editor mb-20" style="display: none">
            <div class="size mb-15">
                <h5 class="is-size-5">Size:</h5>
                <label class="radio"><input type="radio" name="size" value="small">Small</label>
                <label class="radio"><input type="radio" name="size" value="medium">Medium</label>
                <label class="radio"><input type="radio" name="size" value="large">Large</label>
            </div>
            <div class="toppings">
                <h5 class="is-size-5">Toppings:</h5>
                <label class="checkbox"><input type="checkbox" value="bacon" name="toppings">Bacon</label>
                <label class="checkbox"><input type="checkbox" value="pepperoni" name="toppings">Pepperoni</label>
                <label class="checkbox"><input type="checkbox" value="sausage" name="toppings">Sausage</label>
                <label class="checkbox"><input type="checkbox" value="ham" name="toppings">Ham</label>
                <label class="checkbox"><input type="checkbox" value="pineapple" name="toppings">Pineapple</label>
                <label class="checkbox"><input type="checkbox" value="olives" name="toppings">Olives</label>
                <label class="checkbox"><input type="checkbox" value="corn" name="toppings">Corn</label>
                <label class="checkbox"><input type="checkbox" value="mushrooms" name="toppings">Mushrooms</label>
            </div>
        </form>`;
        const order = document.querySelector('.container');
        order.innerHTML += form;

        appController.order.addPizza(new Pizza(['ham'], 'small'));
        appController.order.addPizza(new Pizza(['olives'], 'medium'));
        orderElem = document.createElement('div');
        orderElem.classList.add('order');
        document.body.appendChild(orderElem);
    });

    afterEach(() => {
        pizzaToppingsElem.parentNode.removeChild(pizzaToppingsElem);
        orderElem.parentNode.removeChild(orderElem);
    });

    describe('renderPizzasInOrder()', () => {
        it('should have correct bindings for pizza', () => {
            appController.renderPizzasInOrder();

            const pizza = document.querySelectorAll('.order .pizza')[0];
            const size = pizza.querySelector('.size').textContent;
            const toppings = pizza.querySelector('.toppings').textContent;
            const price = pizza.querySelector('.price').textContent;

            expect(size).toBe('small');
            expect(toppings).toBe('ham');
            expect(price).toBe('0.5$');
        });

        it('should have correct bindings for pizza', () => {
            
            appController.order.removePizza(new Pizza);
            appController.order.removePizza(new Pizza);
            
            appController.order.addPizza(new Pizza('', ''));
            appController.renderPizzasInOrder();

            const pizza = document.querySelectorAll('.order .pizza')[0];
            const size = pizza.querySelector('.size').textContent;
            const toppings = pizza.querySelector('.toppings').textContent;
            const price = pizza.querySelector('.price').textContent;

            expect(size).toBe('');
            expect(toppings).toBe('');
            expect(price).toBe('$');
        });

        it('should have correct number of pizzas in order', () => {
            appController.renderPizzasInOrder();

            expect(orderElem.querySelectorAll('.pizza'). length)
                .toBe(appController.order.pizzas.length);
        });

        it('should invoke remove pizza from order', () => {
            const removePizzaSpy = spyOn(window.appController, 'removePizza');
            
            appController.renderPizzasInOrder();

            const removeButton = orderElem.querySelectorAll('.pizza')[0].querySelector('button');
            removeButton.click();

            expect(removePizzaSpy).toHaveBeenCalled();
        });

        it('should render header', () => {
            const headerElem = document.createElement('h3');
            headerElem.setAttribute('class', 'is-size-3 is-centered');
            headerElem.innerHTML = 'No pizzas in order';

            appController.order.pizzas.length = 0;
            appController.renderPizzasInOrder();

            expect(document.querySelector('.is-size-3')).toEqual(headerElem);
        });
    });

    describe('initOrder()', () => {
        const responsePizzasMock = [
            {
            "toppings": ["ham", "bacon"],
            "size": "large"
            },
            {
            "toppings": ["corn", "olives"],
            "size": "medium"
            }
        ];

        it('should set pizzas to order', async () => {
            const requestSpy = spyOnProperty(appController, 'pizzas')
                .and.returnValue(Promise.resolve(responsePizzasMock));
            const addPizzaSpy = spyOn(appController.order, 'addPizza');
            
            await appController.initOrder();

            expect(requestSpy).toHaveBeenCalled();
            expect(addPizzaSpy).toHaveBeenCalledTimes(responsePizzasMock.length);
        });
    });

    describe('init()',() => {
        it('should init renderOrder() and initOrder()', async () => {
            const addPizzaSpy = spyOn(appController, 'renderOrder');
            const initOrderSpy = spyOn(appController, 'initOrder')
                .and.returnValue(Promise.resolve());

            await appController.init();

            expect(addPizzaSpy).toHaveBeenCalled();
            expect(initOrderSpy).toHaveBeenCalled();
        });
    });

    describe('renderOrder()', () => {
        it('shoud init renderPizzasInOrder from renderOrder()', () => {
            const renderPizzasInOrderSpy = spyOn(appController, 'renderPizzasInOrder');

            appController.renderOrder();

            expect(renderPizzasInOrderSpy).toHaveBeenCalled();
        });

        it('shoud init renderAddPizzaButtonInOrder from renderOrder()', () => {
            const renderAddPizzaButtonInOrderSpy = spyOn(appController, 'renderAddPizzaButtonInOrder');

            appController.renderOrder();

            expect(renderAddPizzaButtonInOrderSpy).toHaveBeenCalled();
        });

        it('shoud init renderTotalPriceInOrder from renderOrder()', () => {
            const renderTotalPriceInOrderSpy = spyOn(appController, 'renderTotalPriceInOrder');

            appController.renderOrder();

            expect(renderTotalPriceInOrderSpy).toHaveBeenCalled();
        });
    });

    describe('renderAddPizzaButtonInOrder()', () => {
        it('shoud init renderAddPizzaButtonInOrder()', () => {
            const buttonElem = document.createElement('button')
            buttonElem.setAttribute('class', 'button is-primary full-width mb-20')
            buttonElem.setAttribute('onclick', 'appController.addPizzaForm()');
            buttonElem.innerHTML = 'Add pizza';

            appController.renderAddPizzaButtonInOrder();

            expect(document.querySelector('.button')).toEqual(buttonElem);

            document.querySelector('.button').parentNode.removeChild(document.querySelector('.button'));
        });
    });

    describe('renderTotalPriceInOrder()', () => {
        it('shoud init renderTotalPriceInOrder()', () => {
            const totalPriceTemplate = document.createElement('div')
            totalPriceTemplate.setAttribute('class', 'is-size-2')
            totalPriceTemplate.innerHTML = 'Total Price: 0$';

            appController.renderTotalPriceInOrder();

            expect(document.querySelector('.is-size-2')).toEqual(totalPriceTemplate);

            document.querySelector('.is-size-2').parentNode.removeChild(document.querySelector('.is-size-2'));
        });
    });

    describe('show form', () => {
        it('shoud show form', () => {
            appController.showForm();

            expect(document.querySelector('.pizza-editor').style.display).toBe('block');
        });
    });

    describe('hide form', () => {
        it('shoud hide form', () => {
            appController.hideForm();

            expect(document.querySelector('.pizza-editor').style.display).toBe('none');
        });
    });

    describe('handleForm', () => {
        let replaceFormSpy;
        let resetFormElementsSpy;
        let setFormElementsSpy;
        let setFormChangeHandlersSpy;
        let showFormSpy;

        beforeEach(() => {
            replaceFormSpy = spyOn(appController, 'replaceForm');
            resetFormElementsSpy = spyOn(appController, 'resetFormElements');
            setFormElementsSpy = spyOn(appController, 'setFormElements');
            setFormChangeHandlersSpy = spyOn(appController, 'setFormChangeHandlers');
            showFormSpy = spyOn(appController, 'showForm');

            appController.handleForm(0);
        })

        it('should init replaceFrom from handleForm', () => {
            expect(replaceFormSpy).toHaveBeenCalled();
        });

        it('should init resetFormElements from handleForm', () => {
            expect(resetFormElementsSpy).toHaveBeenCalled();
        });

        it('should init setFormElementsSpy from handleForm', () => {
            expect(setFormElementsSpy).toHaveBeenCalled();
        });

        it('should init setFormChangeHandlers from handleForm', () => {
            expect(setFormChangeHandlersSpy).toHaveBeenCalled();
        });

        it('should init showForm from handleForm', () => {
            expect(showFormSpy).toHaveBeenCalled();
        });
    });

    describe('getFormElements', () => {
        it('should init getFormElements and return obj', () => {
            appController.getFormElements();

            expect(appController.getFormElements()).toBeObject();
        });
    });

    describe('resetFormElements', () => {
        it('should init getFormElements from resetFormElements', () => {
            appController.resetFormElements();

            expect(appController.getFormElements()).toBeObject();
        });
    });

    describe('setFormElements', () => {
        it('should init setFormElements', () => { 
            const selectedPizza = appController.order.pizzas[0];
            appController.setFormElements(selectedPizza)

            expect(() => appController.setFormElements(selectedPizza)).toBeFunction();
        });
    });

    describe('removePizza', () =>  {
        let orderRemovePizzaSpy;
        let renderOrderSpy;
        let replaceFormSpy;
        let hideFormSpy;

        beforeEach(() => {
            orderRemovePizzaSpy = spyOn(appController.order, 'removePizza');
            renderOrderSpy = spyOn(appController, 'renderOrder');
            replaceFormSpy = spyOn(appController, 'replaceForm');
            hideFormSpy = spyOn(appController, 'hideForm');

            appController.removePizza(0);
        });

        it('should init renderOrder from removePizza', () => {
            expect(renderOrderSpy).toHaveBeenCalled();
        });

        it('should init removePizza from removePizza', () => {
            expect(orderRemovePizzaSpy).toHaveBeenCalled();
        });

        it('should init replaceForm from removePizza', () => {
            expect(replaceFormSpy).toHaveBeenCalled();
        });

        it('should init hideForm from removePizza', () => {
            expect(hideFormSpy).toHaveBeenCalled();
        });
    });

    describe('addPizzaForm', () =>  {
        let orderAddPizzaSpy;
        let showFormSpy;
        let handleFormSpy;
        let renderOrderSpy;

        beforeEach(() => {
            orderAddPizzaSpy = spyOn(appController.order, 'addPizza');
            showFormSpy = spyOn(appController, 'showForm');
            handleFormSpy = spyOn(appController, 'handleForm');
            renderOrderSpy = spyOn(appController, 'renderOrder');

            appController.addPizzaForm();
        });

        it('should init renderOrder from removePizza', () => {
            expect(orderAddPizzaSpy).toHaveBeenCalled();
        });

        it('should init removePizza from removePizza', () => {
            expect(showFormSpy).toHaveBeenCalled();
        });

        it('should init replaceForm from removePizza', () => {
            expect(handleFormSpy).toHaveBeenCalled();
        });

        it('should init hideForm from removePizza', () => {
            expect(renderOrderSpy).toHaveBeenCalled();
        });
    });

    describe('serializeForm', () => {
        it('serializeForm should return object', () => {
            const form = document.querySelector('.pizza-editor');

            appController.serializeForm(form)

            expect(appController.serializeForm(form)).toBeObject();
        });
    });

    describe('replaceForm', () => {
        it('should init replaceForm', () => {
            const formEditor = document.querySelector('.pizza-editor');
            appController.replaceForm()
            expect(formEditor).toEqual(document.querySelector('.pizza-editor'))
        });
    });

    describe('pizzas', () => {
        it('should create new fetch', () => {
            expect(appController.pizzas).toBeDefined();
        });
    });

    describe('setFormChangeHandlers', () => {
        it('should init renderOrder from setFormChangeHandlers', () => {
            const spyRenderOrder = spyOn(appController, 'renderOrder');
            const selectedPizza = appController.order.pizzas[0]
            const inputElem = document.querySelector('.pizza-editor').querySelector('input');

            appController.setFormChangeHandlers(selectedPizza);
            inputElem.click();

            expect(spyRenderOrder).toHaveBeenCalled();
        });
    });
});
