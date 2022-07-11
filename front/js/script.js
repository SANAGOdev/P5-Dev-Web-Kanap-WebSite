//Function for displaying item's infos
function showItem(item) {

    if(item == null){  //Check if the item is defined
        showAlert["ApiEroor"](); //Show ApiErrorMessage from "alerts.js"
        return; //Stop function
    }

    const itemElement = elementFactory( //Use 'elementFactory' from 'utils.js' for create html tree
        'a', {'href': "./product.html?id=" + item._id}, 
            elementFactory('article', {}, 
                elementFactory('img', {'src':item.imageUrl, 'alt':item.altTxt}),
                elementFactory('h3', {'class':'productName'}, item.name),
                elementFactory('p', {'class':'productDescription'}, item.description),
            )
        );

    document.querySelector("#items").appendChild(itemElement); //Add 'itemElement' to '#items'

}

//Event Listener when document load
document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#items").innerHTML = ''; //Clear '#items'

    const catalog = fetchData(config.baseUrl); //Call the API for retreive catalog data

    catalog.then(items => { //Wait the response

        if(items == null)  {//Check if catalog is defined
            showAlert['ApiEroor'](); //Show ApiErrorMessage from 'alerts.js'
            return; //Stop Function
        }

        items.forEach(item => { //Loop all products
            showItem(item); //Call function 'showItem'
        });
        
    });

});