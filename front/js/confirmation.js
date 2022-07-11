//Event Listener when page load
document.addEventListener("DOMContentLoaded", () => {
    let orderId = window.location.search.substring(1).replace("id=", ""); //Get the product's id from url

    if(orderId == "") {
        document.querySelector("#orderId").textContent = "Eror"; //Set '#orderId' to orderId

        showAlert["OrderCommandFail"](orderId); //Show OrderCommandSucessMessage from 'utils.js'

        return;
    }

    document.querySelector("#orderId").textContent = orderId; //Set '#orderId' to orderId

    showAlert["OrderCommandSucess"](orderId); //Show OrderCommandSucessMessage from 'utils.js'
});