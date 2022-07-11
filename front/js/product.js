//Function for displaying item's infos
function showItem(item) {

	if(item == null) { //Check if item is defined
		showAlert["ApiEroor"](); //Show ApiErrorMessage from "alerts.js"
        return; //Stop function
    }

	document.querySelector(".item__img").appendChild(elementFactory('img', {'src': item.imageUrl, 'alt': item.altTxt})) //Add Image

	document.querySelector("#title").textContent = item.name; //Add Name
    document.querySelector("#price").textContent = item.price; //Add Price
	document.querySelector("#description").textContent = item.description; //Add description

	item.colors.forEach(c => { //Loop colors
		document.querySelector("#colors").appendChild(elementFactory('option', {'value':c}, c)) //Add color
	});

}

function addItemToCart(item) {

	if(item == null) { //Check if item is defined
       showAlert["ApiEroor"](); //Show ApiErrorMessage from "alerts.js"
        return; //Stop function
    }
	
	let color = document.querySelector("#colors").value; //Retreive the selected color with querySelector
	let quantity = document.querySelector("#quantity").value; //Retreive the selected quantity with querySelector

	if (!item.colors.includes(color)) { //Check if selected color is value
		showAlert["InputWarningColor"](); //Show InputWarningColorMessage from "alerts.js"
		return; //Stop function
	}

	if(isNaN(parseInt(quantity, 10))) { //Check if selected quantity is an int
		showAlert["InputWarningQty1"](); //Show InputWarningQty1Message from "alerts.js"
		return; //Stop function
	}

	quantity = parseInt(quantity, 10); //Parse to int type

	if(quantity < 1 || quantity > 100) { //Check if selected quantity is upper 0 and under 100
		showAlert["InputWarningQty2"](); //Show InputWarningQty2Message from "alerts.js"
		return; //Stop function
	}
	
	addToLocalStorage(item._id, color, quantity); //Call Function addToLocalStorage from "utils.js"

	showAlert["AddToCart"](item.name, color, quantity); //Show AddToCartMessage from "alerts.js"
}

//Event Listener when document load
document.addEventListener("DOMContentLoaded", () => {

    let id = window.location.search.substring(1).replace("id=", ""); //Get the product's id from url

    const item = fetchData(config.productUrl.replace(":id:", id)) //Call the API for retreive item's data
	
	item.then(item => { //Wait the response
		if(item == null)  {//Check if item is defined
            showAlert['ApiEroor'](); //Show ApiErrorMessage from 'alerts.js'
            return; //Stop Function
        }
		
		showItem(item); //Call 'showItem'
	}); 

});

//Event Listener when '#addToCart' click
document.querySelector("#addToCart").addEventListener("click", () => {

	let id = window.location.search.substring(1).replace("id=", ""); //Get the product's id from url

    const item = fetchData(config.productUrl.replace(":id:", id)); //Call the API for retreive item's data
	
	item.then(item => { //Wait the response
		if(item == null)  {//Check if item is defined
            showAlert['ApiEroor'](); //Show ApiErrorMessage from 'alerts.js'
            return; //Stop Function
        }

		addItemToCart(item); //Call 'addItemToCart'
	}); 

});