const showAlert = { //Dict of alert's callbacks
    "ApiEroor": () => {Swal.fire({
    title: 'API Error!',
    text: 'Contactez Administrateur',
    icon: 'error',
    confirmButtonText: 'Ok'
    });},

    "InputWarningColor": () => {Swal.fire({
        title: 'Input Warning!',
        text: 'La couleur choisie n\'est pas valide.',
        icon: 'warning',
        confirmButtonText: 'Ok'
    });},

    "InputWarningQty2": () => {Swal.fire({
        title: 'Input Warning!',
        text: 'La quantité doit être entre 1 et 100.',
        footer: 'Si vous voulez des commandes en grandes quantités, s\'il vous plaît contactez-nous à support@name.com.',
        icon: 'warning',
        confirmButtonText: 'Ok'
    })},

    "InputWarningQty3": () => {Swal.fire({
        title: 'Input Warning!',
        text: 'La quantité doit être supérieur à 0.',
        footer: 'Si vous voulez supprimer ce produit, appuyez sur le bouton \'Supprimer\'.',
        icon: 'warning',
        confirmButtonText: 'Ok'
    })},

    "AddToCart": (name, color, quantity) => {Swal.fire({
        title: 'Sucees',
        text: `${name} couleur ${color} a été ajouté en ${quantity} exemplaires à votre panier.`,
        icon: 'success',
        confirmButtonText: 'Ok'
    });},

    "DeleteItemConfirmation": () => {return Swal.fire({
        title: 'Voulez-vous supprimer ce produit?',
        icon: 'question',
        showDenyButton : true,
        confirmButtonText: 'Oui',
        denyButtonText: `Non`,
    });},

    "DeleteItem": () => {Swal.fire({
        title: 'Success',
        text: 'Ce a été supprimer de votre panier.',
        icon: 'success',
        confirmButtonText: 'Ok'
    });},

    "EmptyCart": () => {Swal.fire({
        title: 'Votre panier est vide, vous pouvez y ajouter des produits depuis la page Accueil.',
        icon: 'warning',
        confirmButtonText: 'Ok'
    });},

    "InputErrorOrder": () => {Swal.fire({
        title: 'Un ou plusieurs des champs n\'est pas correctement rempli.',
        icon: 'error',
        confirmButtonText: 'Ok',
    });},

    "OrderCommandSucess": (orderId) => {return Swal.fire({
        title: 'Merci pour votre commande.',
        text: 'Votre numéro de commande est "' + orderId + '".',
        icon: 'success',
        confirmButtonText: 'Ok',
    });},

    "OrderCommandFail": (orderId) => {return Swal.fire({
        title: 'Un problème est survenu.',
        text: 'Veuillez ressayer ou contactez un administrateur.',
        icon: 'error',
        confirmButtonText: 'Ok',
    });}
}