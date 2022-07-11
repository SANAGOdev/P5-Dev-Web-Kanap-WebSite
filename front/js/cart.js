//Function callback of listener of input quantity
function editQuantity(e) {
    if(e.target.className != "itemQuantity") //Check if the event have been trigger by '.itemQuantity' button
        return //Stop Function

    let article = e.currentTarget; //Retreive the item article tag
    let id = article.dataset.id; //Retreive the item's id
    let color = article.dataset.color; //Retreive the item's color
    let newQuantity = e.target.value; //Retreive the item's quantity modified

    if(isNaN(parseInt(newQuantity, 10))) { //Check if selected quantity is an int
        showAlert["InputWarningQty1"](); //Show InputWarningQty1Message from 'alerts.js'
        return; //Stop Function
    }
    
    newQuantity = parseInt(newQuantity, 10); //Parse to int type     

    if(newQuantity > 100) {
        showAlert["InputWarningQty2"](); //Show InputWarningQty2Message from 'alerts.js'
        e.target.value = 100; //Set input tag to 100
        return; //Stop Function
    }

    if(newQuantity < 1) { //Check if selected quantity is upper 0 and under 100
        showAlert["InputWarningQty3"](); //Show InputWarningQty3Message from 'alerts.js'
        e.target.value = 1; //Set input tag to 1
        return; //Stop Function
    }  

    editQuantityFromLocalStorage(id, color, newQuantity); //Call 'editQuantityFromLocalStorage' function from 'utils.js'
    updatePrice(); //Call 'updatePrice' function
}

//Function callback of listener of delete button
function removeProduct(e) {
    if(e.target.className != "deleteItem") //Check if the event have been trigger by '.deleteItem' button
        return; //Stop Function

    let article = e.currentTarget; //Retreive the item article tag
    let id = article.dataset.id; //Retreive the item's id
    let color = article.dataset.color; //Retreive the item's color

    showAlert["DeleteItemConfirmation"]() //Show DeleteItemConfirmationMessage from 'alerts.js'
    .then((result) => { //Wait the response
        if(result.isConfirmed){ //If the response is true
            removeFromLocalStorage(id, color); //Call 'removeFromLocalStorage' function from 'utils.js'
            
            document.querySelector("#cart__items").removeChild(article); //Remove item's article tag from '#cart__items'
            updatePrice(); //Call 'updatePrice' function
            showAlert["DeleteItem"](); //Show DeleteItemnMessage from 'alerts.js'
        }
    });

}

//Function callback of listener of order button
function order(e) {
    let firstName = document.querySelector("#firstName").value; //Retreive '#firstName' value
    let lastName = document.querySelector("#lastName").value; //Retreive '#lastName' value
    let address = document.querySelector("#address").value; //Retreive '#address' value
    let city = document.querySelector("#city").value; //Retreive '#city' value
    let email = document.querySelector("#email").value; //Retreive '#email' value

    if(
        !baseRegex.test(firstName) || 
        !baseRegex.test(lastName) || 
        !baseRegex.test(city) || 
        !adressRegex.test(address) || 
        !emailRegex.test(email)
        ) //Check all the regex
        showAlert['InputErrorOrder'](); //Show InputErrorOrderMessage from 'alerts.js'
    else{
        let contact = { //Create the contact object for API
            'firstName': firstName,
            'lastName': lastName,
            'address': address,
            'city': city,
            'email': email,
        };
        
        let products = getCartProductsIds(); //Retreive cart serialized for API from 'getCartProductsIds' in 'utils.js'

        if(products == null){ //Check if products is defined (empty)
            showAlert["EmptyCart"](); //Show EmptyCartMessage from 'alerts.js'
            e.preventDefault(); //Cancel the event
            return; //Stop Function
        }

        let json = {contact,products}; //Create json to send to API

        const result = orderCommand(json) //Call 'orderCommand' function from 'utils.js'

        result.then(result => { //Wait the response
            if(result == null)  {//Check if result is defined
                showAlert['ApiEroor'](); //Show ApiErrorMessage from 'alerts.js'
                return; //Stop Function
            }

            localStorage.clear(); //Clear the localStorage 
            location.href = "./confirmation.html?id="+result.orderId; //Redirect to confirmation page with orderId
        });

        e.preventDefault(); //Don't send the form is useless
        
    }
}

//Function for display or update price
function updatePrice() {
    let products = getCartProducts(); //Retreive cart from 'getCartProducts' in 'utils.js'

    let totalPrice = 0; //Define totalPrice to 0
    let totalQuantity = 0; //Define totalQuantity to 0

    if(products == null){ //Check if products is defined (empty)
        document.querySelector("#totalPrice").textContent = totalPrice; //Set '#totalPrice' to 0
        document.querySelector("#totalQuantity").textContent = totalQuantity; //Set '#totalQuantity' to 0
        return; //Stop Function
    }

    products.forEach((product) => { //Loop all products

        const item = fetchData(config.productUrl.replace(":id:", product.id)) //Retreive product's infos from API
        
        item.then(item => { //Wait the response
            if(item == null)  {//Check if item is defined
                showAlert['ApiEroor'](); //Show ApiErrorMessage from 'alerts.js'
                return; //Stop Function
            }

            totalPrice += (item.price * product.quantity); //Add to totalPrice
            totalQuantity += product.quantity; //Add to totalQuantity

            document.querySelector("#totalPrice").textContent = totalPrice; //Set '#totalPrice' to totalPrice
            document.querySelector("#totalQuantity").textContent = totalQuantity; //Set '#totalQuantity' to totalQuantity

        });

    });

}

//Function for display an article
function displayArticle(item, product) {

    const itemElement = elementFactory( //Use 'elementFactory' from 'utils.js' for create html tree
        'article', {'class':'cart__item', 'data-id':product.id, 'data-color':product.color},
            elementFactory('div', {'class':'cart__item__img'},
                elementFactory('img', {'src':item.imageUrl, 'alt':item.altTxt})
            ),
            elementFactory('div', {'class':'cart__item__content'},
                elementFactory('div', {'class':'cart__item__content__description'},
                    elementFactory('h2', {}, item.name),
                    elementFactory('p', {}, product.color),
                    elementFactory('p', {}, item.price+',00€')
                ),
                elementFactory('div', {'class':'cart__item__content__settings'},
                    elementFactory('div', {'class':'cart__item__content__settings__quantity'},
                        elementFactory('p', {}, 'Qté : '),
                        elementFactory('input', {'type':'number', 'class':'itemQuantity', 'name':'itemQuantity', 'min':1, 'max':100, 'value':product.quantity})
                    ),
                    elementFactory('div', {'class':'cart__item__content__settings__delete'}, 
                        elementFactory('p', {'class':'deleteItem'}, 'Supprimer')
                    ),
                )
            )
        );
    
    
    //Event Listener for input quantity
    itemElement.addEventListener("input", editQuantity); //Call 'editQuantity' function

    //Event Listener for remove button
    itemElement.addEventListener("click", removeProduct); //Call 'removeProduct' function


    document.querySelector("#cart__items").appendChild(itemElement); //Add itemElement to '#cart__items'

}

//Function for display articles, price, and quantity in cart page
function showArticles() {

    let products = getCartProducts(); //Retreive cart from 'getCartProducts' in 'utils.js'

    if(products == null){ //If products is not defined (empty)
        showAlert['EmptyCart'](); //Show EmptyCartMessage from 'alerts.js'
        return; //Stop Function
    }

    document.querySelector("#cart__items").innerHTML = ''; //Clear '#cart__items'

    products.forEach((product) => { //Loop all products

        const item = fetchData(config.productUrl.replace(":id:", product.id)) //Retreive product's infos from API
        
        item.then(item => { //Wait the response
            if(item == null)  {//Check if item is defined
                showAlert['ApiEroor'](); //Show ApiErrorMessage from 'alerts.js'
                return; //Stop Function
            }

            displayArticle(item, product); //Call 'displayArticle' function
        });

    });

    updatePrice(); //Call 'updatePrice' function

}


//Event Listener when page load
document.addEventListener("DOMContentLoaded", () => {
    showArticles(); //Call 'showArticles' function
});

//Event Listener when click on the order button
document.querySelector("#order").addEventListener("click", order); //Call 'order' function


//Event Listener for all inputs regex check
document.querySelector("#firstName").addEventListener("input", (e) => {
    if(!baseRegex.test(e.target.value))
        document.querySelector("#firstNameErrorMsg").textContent = "Champ Non Valide.";
    else
        document.querySelector("#firstNameErrorMsg").textContent = "";
});
document.querySelector("#lastName").addEventListener("input", (e) => {
    if(!baseRegex.test(e.target.value))
        document.querySelector("#lastNameErrorMsg").textContent = "Champ Non Valide.";
    else
        document.querySelector("#lastNameErrorMsg").textContent = "";
});
document.querySelector("#address").addEventListener("input", (e) => {
    if(!adressRegex.test(e.target.value))
        document.querySelector("#addressErrorMsg").textContent = "Champ Non Valide.";
    else
        document.querySelector("#addressErrorMsg").textContent = "";
});
document.querySelector("#city").addEventListener("input", (e) => {
    if(!baseRegex.test(e.target.value))
        document.querySelector("#cityErrorMsg").textContent = "Champ Non Valide.";
    else
        document.querySelector("#cityErrorMsg").textContent = "";
});
document.querySelector("#email").addEventListener("input", (e) => {
    if(!emailRegex.test(e.target.value))
        document.querySelector("#emailErrorMsg").textContent = "Champ Non Valide.";
    else
        document.querySelector("#emailErrorMsg").textContent = "";
});