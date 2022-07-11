//Function for retreive data from the API
async function fetchData(url) {
	const response = await fetch(url) //Call 'fetch' function
  .catch((err) => console.warn(err)); //Print the error if she exist

  if(response == undefined || response == null || !response.ok) //Check if fetch has succes
    return null; //Stop Function

	return response.json(); //Return the result

}

//Function for retreive the orderId
async function orderCommand(json) {

  const response = await fetch(
    config.orderUrl, {//Call 'fetch' function
    method: 'POST', //With POST Method
    headers: { //And 'application/json' Headers
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json) //And json object
  })
  .catch((err) => console.warn(err)); //Print the error if she exist
  
  if(response == undefined || response == null || !response.ok) //Check if fetch has succes
    return null; //Stop Function

  return response.json(); //Return the response

}

//Function for create elements inherit
function elementFactory(type, attributes, ...childs) {

		const element = document.createElement(type) //Create an element with specified type
  
	  for (key in attributes) //Loop all attributes
			element.setAttribute(key, attributes[key]) //Add attribute to element

		childs.forEach(child => { //Loop all childs
			if (typeof child === 'string') //If child type is a string
				element.appendChild(document.createTextNode(child)) //Set element textContent to the child
			else{
				element.appendChild(child) //Append the child to the element
			}	 
		});
	
		return element //Return the element

}

//Function for get cart products
function getCartProducts() {

  let cartLocal = localStorage.getItem("cart"); //Retreive cart from localStorage

	if(cartLocal == null) //Check if cartLocal is empty
    return null; //Stop Function

  let cartJson = JSON.parse(cartLocal); //Parse cartLocal to JSON

  if(cartJson.cart.length == 0) //Check if cartLocal is empty
    return null; //Stop Function

  return cartJson.cart; //Return cart

}


//Function for get cart products for orders
function getCartProductsIds() {

  let cartLocal = localStorage.getItem("cart"); //Retreive cart from localStorage

	if(cartLocal == null) //Check if cartLocal is empty
    return null; //Stop Function

  let cartJson = JSON.parse(cartLocal); //Parse cartLocal to JSON

  if(cartJson.cart.length == 0) //Check if cartLocal is empty
    return null; //Stop Function

  let products = []; //Create empty products array

  cartJson.cart.forEach((product) => products.push(product.id)); //Fill the products array with the cart

  return products; //Return products

}


//Function for add item to cart in 'localStorage'
function addToLocalStorage(id, color, quantity) {

	let cartLocal = localStorage.getItem("cart"); //Retreive cart from localStorage

	if(cartLocal == null) //Check if cartLocal is empty
		cartLocal = '{"cart" : []}'; //Create cart

	let cartJson = JSON.parse(cartLocal); //Parse cartLocal to JSON
	
	let _index = cartJson.cart.findIndex((x) => (x.id == id && x.color == color)); //Get index of product to add

	if(_index !=	-1) //Check if _index is defined
		cartJson.cart[_index].quantity += quantity; //Edit quantity in cart
	else
		cartJson.cart.push({"id": id, "color": color, "quantity": quantity}); //Add to Cart
	
	localStorage.setItem("cart", JSON.stringify(cartJson)); //Save jsonCart to cart in localStorage

}


//Function for edit item quantity from cart in 'localStorage'
function editQuantityFromLocalStorage(id, color, newQuantity) {

  let cartLocal = localStorage.getItem("cart"); //Retreive cart from localStorage

  if(cartLocal == null) //Check if cartLocal is empty
    return; //Stop Function

  let cartJson = JSON.parse(cartLocal); //Parse cartLocal to JSON

  let _index = cartJson.cart.findIndex((x) => (x.id == id && x.color == color)); //Get index of product to edit

  cartJson.cart[_index].quantity = newQuantity; //Edit quantity in cart

  localStorage.setItem("cart", JSON.stringify(cartJson)); //Save jsonCart to cart in localStorage

}


//Function for remove item from cart in 'localStorage'
function removeFromLocalStorage(id, color) {

	let cartLocal = localStorage.getItem("cart"); //Retreive cart from localStorage

	if(cartLocal == null) //Check if cartLocal is empty
		return; //Stop Function

  let cartJson = JSON.parse(cartLocal); //Parse cartLocal to JSON

  let _index = cartJson.cart.findIndex((x) => (x.id == id && x.color == color)); //Get index of product to remove

  cartJson.cart.splice(_index, 1); //Remove product from cart

  localStorage.setItem("cart", JSON.stringify(cartJson)); //Save jsonCart to cart in localStorage

}