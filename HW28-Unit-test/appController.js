class AppController {
    order = new Order();

    async init() {
        await this.initOrder();
        this.renderOrder();
    }

    get pizzas() {
        return fetch('http://localhost:3000/pizzas').then((res) => {
            return res.json();
        }).then((json) => {
            return json;
        });
    }

    async initOrder() {
        const pizzas = await this.pizzas;

        pizzas.forEach((i) => {
            this.order.addPizza(new Pizza(i.toppings, i.size));
        });
    }

    renderOrder() {
        this.renderPizzasInOrder();
        this.renderAddPizzaButtonInOrder();
        this.renderTotalPriceInOrder();
    }

    renderPizzasInOrder() {
        const orderPizzas = this.order.pizzas;

        if (this.order.pizzas.length) {
            let itemsForRender = orderPizzas.map((pizza, index) => {
                const size = pizza.size || '';
                const toppings = pizza.toppings ? pizza.toppings.join(', ') : '';
                const price = (pizza.toppings && pizza.size) ? pizza.pizzaPrice : '';
                return `
                    <div class="pizza" onclick="appController.handleForm(${index})">
                        <b>Size: </b>
                        <div class="size mb-5">${ size }</div>
                        <b>Toppings:</b>
                        <div class="toppings mb-5">${ toppings }</div>
                        <b>Price:</b>
                        <div class="price mb-5">${ price }$</div>
                        <button class="button is-primary" onclick="event.stopPropagation(); appController.removePizza(${index})">Remove Pizza</button>
                    </div>
                `;
            });
            document.querySelector('.order').innerHTML = itemsForRender.join('');
            return;
        }
        document.querySelector('.order').innerHTML = '<h3 class="is-size-3 is-centered">No pizzas in order</h3>'
    }

    renderAddPizzaButtonInOrder() {
        const addButtonTemplate = `<button class="button is-primary full-width mb-20" onclick="appController.addPizzaForm()">Add pizza</button>`;
        document.querySelector('.order').insertAdjacentHTML('beforeend', addButtonTemplate);
    }

    renderTotalPriceInOrder() {
        const totalPriceTemplate = `<div class="is-size-2">Total Price: ${appController.order.totalPrice}$</div>`;
        document.querySelector('.order').insertAdjacentHTML('beforeend', totalPriceTemplate);
    }

    handleForm(i) {
        const selectedPizza = this.order.pizzas[i];

        this.replaceForm();
        this.resetFormElements();
        this.setFormElements(selectedPizza);
        this.setFormChangeHandlers(selectedPizza);
        this.showForm();
    }

    resetFormElements() {
        const formElements = this.getFormElements();
        
        [...formElements.sizeRadio, ...formElements.toppingsCheckboxes].forEach(i => {
            i.checked = false;
        });
    }

    setFormElements(selectedPizza) {
        const formElements = this.getFormElements();

        formElements.sizeRadio.forEach(i => {
            if (i.getAttribute('value') === selectedPizza.size) {
                i.checked = true;
            }
        });

        formElements.toppingsCheckboxes.forEach(i => {
            if (selectedPizza.toppings && selectedPizza.toppings.includes(i.getAttribute('value'))) {
                i.checked = true;
            }
        });
    }

    getFormElements() {
        const form = document.querySelector('.pizza-editor');
        const sizeRadio = form.querySelectorAll('input[type=radio]');
        const toppingsCheckboxes = form.querySelectorAll('input[type=checkbox]');

        return {
            sizeRadio,
            toppingsCheckboxes
        }
    }

    setFormChangeHandlers(selectedPizza) {
        const form = document.querySelector('.pizza-editor');

        form.querySelectorAll('input').forEach(i => {
            i.addEventListener('change', (e) => {
                const formData = this.serializeForm(form);
                selectedPizza.size = formData.size;
                selectedPizza.toppings = formData.toppings;
                this.renderOrder();
            });
        })
    }

    serializeForm(form) {
        const formData = new FormData(form);
        return {
            size: formData.get('size'),
            toppings: formData.getAll('toppings')
        };
    }

    addPizzaForm() {
        const pizza = new Pizza();
        this.order.addPizza(pizza);
        this.showForm();
        this.handleForm(this.order.pizzas.indexOf(pizza));
        this.renderOrder();
    }

    replaceForm() {
        const formForReplace = document.querySelector('.pizza-editor');
        const elClone = formForReplace.cloneNode(true);
        formForReplace.parentNode.replaceChild(elClone, formForReplace);
    }

    removePizza(i) {
        this.order.removePizza(i);
        this.renderOrder();
        this.replaceForm();
        this.hideForm();
    }

    hideForm() {
        document.querySelector('.pizza-editor').style.display = 'none';
    }

    showForm() {
        document.querySelector('.pizza-editor').style.display = 'block';
    }
}
