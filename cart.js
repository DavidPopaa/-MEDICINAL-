if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('remove-product')
    for(var i=0; i<removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('product-quantity-input')
    for(var i=0; i<quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartbuttons = document.getElementsByClassName('add-to-cart-button')
    for(var i=0; i<addToCartbuttons.length; i++) {
        var button = addToCartbuttons[i]
        button.addEventListener('click', addToCartClicked)
    }
    
    var age_contorol_input = document.getElementById('age-control-input')
    age_contorol_input.addEventListener('change', checkIfunder18)
    // age_contorol_input.add
    console.log(age_contorol_input)
}
function checkIfunder18(e) {
    var input = e.target
    if(isNaN(input.value) || input.value < 18) {
        alert('You are under 18!')
        input.value = ''
    }
}
function removeCartItem(e) {
    var buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(e) {
    var input = e.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
 
    var product = input.parentElement.parentElement

    var price = product.getElementsByClassName('product-price')[0]

    price = parseFloat(price.innerHTML.replace('$10', '10'))

    product.getElementsByClassName('product-line-price')[0].innerHTML = input.value * price

    updateCartTotal()
}
function addToCartClicked(e) {
    var button = e.target
    var shopItem = button.parentElement
    console.log(shopItem)
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerHTML
    var price = shopItem.getElementsByClassName('price')[0].innerHTML
    var imageSrc = shopItem.getElementsByClassName('menu-img')[0].src
    var description = shopItem.getElementsByClassName('ingredients')[0].innerHTML
    addItemToCart(title, price, imageSrc, description)
}

function addItemToCart(title, price, imageSrc, description) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('product')
    var cartItems = document.getElementsByClassName('shopping-cart')[0]
    var cartItemsNames = cartItems.getElementsByClassName('product-title')
    var cartRowContents = `
    <div class="product-image">
    <img src="${imageSrc}">
  </div>
  <div class="product-details">
    <div class="product-title">${title}</div>
    <p class="product-description">${description}}</p>
  </div>
  <div class="product-price">${price}</div>
  <div class="product-quantity">
    <input class="product-quantity-input" type="number" value="1" min="1">
  </div>
  <div class="product-removal">
    <button class="remove-product">
      Remove
    </button>
  </div>
  <div class="product-line-price">${price}</div>
    `;
    cartRow.innerHTML = cartRowContents
    cartItems.insertBefore(cartRow ,cartItems.children[1])
    cartRow.getElementsByClassName('remove-product')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('product-quantity-input')[0].addEventListener('change', quantityChanged)
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('shopping-cart')[0]
    var cartRows =  cartItemContainer.getElementsByClassName('product')
    var total = 0
    for(var i=0; i<cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('product-price')[0]       
        var quantityElement = cartRow.getElementsByClassName('product-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        console.log("FARA $: " + price  )
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    var tax = document.getElementsByClassName('tax')[0].innerHTML
    var shipping = document.getElementsByClassName('shipping')[0].innerHTML
    var grand_total = document.getElementsByClassName('grand')[0].innerHTML
    tax = Math.round(tax * 100) / 100
    shipping = Math.round(shipping * 100) / 100
    grand_total = Math.round(grand_total * 100) / 100
    if(total === 0){
        grand_total = 0
    }else{
        grand_total =  tax + shipping + total
    }
    
    document.getElementsByClassName('grand')[0].innerHTML = grand_total
    document.getElementsByClassName('totalll')[0].innerText = total
    var lista_produse = []
    
    for(var i=0; i<cartRows.length; i++) {
        var cartRow = cartRows[i]
        lista_produse.push(`Product: ${i+1} Title: ${cartRow.getElementsByClassName('product-title')[0].innerHTML}`+ ` ,Price/Product: ${cartRow.getElementsByClassName('Product Price')[0].innerText}` +` ,Quantity: ${cartRow.getElementsByClassName('product-quantity-input')[0].value}` + ` ,Total: ${cartRow.getElementsByClassName('product-line-price')[0].innerText}`)
    }
    lista_produse.push(`Grand Total: $${grand_total}`)
    var product_input_value = document.getElementsByClassName('product-inputtt')[0].value = lista_produse 
    console.log(product_input_value)
}