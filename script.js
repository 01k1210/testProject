'use strict';
//..слайдер
var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => { 

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      prevEl: ".swiper-buttons-next",
      nextEl: ".swiper-buttons-prev",
    },
   });

});

//..логика корзины 

const btnMinus = document.querySelector('.control__minus');
const btnPlus = document.querySelector('.control__plus'); 
const quantity = document.querySelector('.cart-about__count');
const amountTotal = document.querySelector('.amount-result');
const summTotal = document.querySelectorAll('.product_sell');
const countRes = document.querySelector('.count-result');

//  КНОПКА ПЛЮС
window.addEventListener('click', clickBtnPlus);
function clickBtnPlus(event){
    if(event.target.dataset.action === 'plus'){
        const wrapBtn = event.target.closest('.control');  
        const quantity = wrapBtn.querySelector('.control__quantity');
        quantity.innerHTML++;
        if(quantity.innerHTML > 1){
          const smallSell = event.target.closest('.wrapper-control');
          const text = smallSell.querySelector('.price');
          text.style.display = 'block';
        } 
        quantityCart();
        summ()
        const cartWrap = event.target.closest('.product');
        const cartSumm = cartWrap.querySelector('.product_sell')
        const sell = document.querySelector('.price').innerHTML; 
        const cartSell = parseInt(sell.replace(/\D/g, ''));
        cartSumm.innerHTML = cartSell * quantity.innerHTML + ' ' + '₽';
    }
}

//  КНОПКА  МИНУС
window.addEventListener('click', clickBtnMinus);
function clickBtnMinus(event){
    if(event.target.dataset.action === 'minus'){
      const wrapBtn = event.target.closest('.control');  
      const quantity = wrapBtn.querySelector('.control__quantity');
      if(quantity.innerHTML > 1){
        quantity.innerHTML--;
        if(quantity.innerHTML == 1){
          const smallSell = event.target.closest('.wrapper-control');
          const text = smallSell.querySelector('.price');
          text.style.display = 'none';
        } 
        quantityCart();
        summ()
        const cartWrap = event.target.closest('.product');
        const cartSumm = cartWrap.querySelector('.product_sell');
        const sell = document.querySelector('.price').innerHTML; 
        const cartSell = parseInt(sell.replace(/\D/g, ''));
        cartSumm.innerHTML = cartSell * quantity.innerHTML + ' ' + '₽';
    }

    }
}

// КНОПКА УДАЛЕНИЯ X

window.addEventListener('click', clickBtnDelete);
function clickBtnDelete(event){
    if(event.target.classList.contains('product_close')){
      const wrapCart = event.target.closest('.cart-list__item'); 
      wrapCart.remove();
      quantityCart()
      summ()
      smallCart()
    }
}

/// ОЧИСТИТЬ КОРЗИНУ

document.querySelector('.cart-about__clear').onclick = function(){
  document.querySelector('.cart-list').remove();
  quantityCart()
  document.querySelector('.cart__quantity').innerHTML = '0 товаров'

}

// ПОДСЧЁТ КОЛИЧЕСТВА

function quantityCart(){
  const summQuant = document.querySelectorAll('.control__quantity');
  const quantityCart = document.querySelector('.count-result');
  let summ = 0;
  for(let i = 0; i < summQuant.length; i++){
    summ += Number(summQuant[i].innerHTML)
  }
  if(1 < summ < 5){
    quantity.innerHTML = `${summ} товара`;
    quantityCart.innerHTML = `${summ} шт`;
  }
  if(summ == 1){
    quantity.innerHTML = `${summ} товар`;
    quantityCart.innerHTML = `${summ} шт`;
  }
  if(summ > 4){
    quantity.innerHTML = `${summ} товаров`;
    quantityCart.innerHTML = `${summ} шт`;
  }
}

//// ПОДСЧЁТ КОЛИЧЕСТВА В КОРЗИНЕ
function smallCart(){
  const cartSmall = document.querySelector('.cart__quantity');
  cartSmall.innerHTML = document.querySelector('.cart-list').children.length + ' ' + 'товара';
}


// ИТОГО
function summ() {
  const cartsItem = document.querySelectorAll('.product');
  let finishSum = 0;
  cartsItem.forEach(function(item){
  const count = +item.querySelector('.control__quantity').innerText;
  const prise = document.querySelector('.price').innerHTML; 
  const cartSell = +parseInt(prise.replace(/\D/g, ''));
  const total = count * cartSell;
  finishSum = total + finishSum;
})
document.querySelector('.summ-result').innerHTML = `${finishSum} ₽`;
document.querySelector('.amount-result').innerHTML = `${finishSum} ₽`;
document.querySelector('.cart__fullprice').innerHTML = `${finishSum} ₽`;
}

//ЧЕКБОКС
const check = document.querySelector('#cart-installation__input');
check.onclick = function(event){
  const isCheck = check.checked;
  if(isCheck){
    document.querySelector('.installation-result').innerHTML = 'Да';
  }else{
    document.querySelector('.installation-result').innerHTML = 'Нет';
  }

}

//ОТПРАВКА КОРЗИНЫ
document.querySelector('.order').onclick = function(){
 const sell = document.querySelector('.summ-result').innerHTML;
 const count = document.querySelector('.count-result').innerHTML;
 const choice = document.querySelectorAll('.product__name');
 const choices = [];
 choice.forEach(function(item){
  choices.push(item.innerHTML);
 })
  const newPost = {
    sell: sell,
    count: count,
    choices: choices,
  }
  fetch(' ', {
    method: 'POST', 
    body: JSON.stringify(newPost),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
}