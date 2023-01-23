if(document.readyState == 'loading'){ // code here checks if our document is loaded before we try to access it.
    document.addEventListener('DOMContentLoaded', ready); // if loading then wait to load DOMContent, when loaded execute ready() .
} else{ 
    ready() 
} //if already loaded execute ready() .


function ready() {
    let removeCartItemButtons=document.getElementsByClassName('btn-danger');
    //console.log(removeCartItemButtons); //print the htmlCollection
    for(let i =0; i < removeCartItemButtons.length; i++){
        let button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    let quantityInput = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i];
        input.addEventListener('change',quantityChanged)
    }
    let addToCartButton = document.getElementsByClassName('shop-item-button');
    for (let i = 0; i < addToCartButton.length; i++) {
        let button = addToCartButton[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchasClicked);

    function purchasClicked() {
        alert(`Thank-you For Your Purchase`);
        let cartItems = document.getElementsByClassName('cart-items')[0];
        while(cartItems.hasChildNodes()){
            cartItems.removeChild(cartItems.firstChild);
        }
        updateCartTotal();
    }
}
function addToCartClicked (event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    //console.log(title, price, imageSrc);
    addItemToCart(title, price, imageSrc)
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert(`This Item Is Already Added To Cart`);
            return;
        }
        
    }
    let cartRowContent = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" role="button">Remove</button>
    </div>`;
    cartRow.innerHTML= cartRowContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0 ) {
        input.value = 1;
    }
    updateCartTotal();
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}


function updateCartTotal(){
    let cartItemContainer= document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total =0 ;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = parseFloat(priceElement.innerText.replace('$',''));
        let quantity = quantityElement.value;
        total += (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = `$ ${total}`;
}