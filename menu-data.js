/* FRYCO menu catalogue
   Edit menu names, descriptions and prices here.
   Prices are in Bangladeshi taka (BDT).
*/
const T = (name, description, price) => ({ n: name, d: description, p: price });

// Menu catalogue. Update item names, descriptions and prices in this file.

const T=(n,d,p)=>({n,d,p});
window.FRYCO_MENU = [
 {name:"Crispy Chicken",groups:[{items:[
  T("Chicken Fry","",[["2 pcs",240],["3 pcs",350],["5 pcs",580],["9 pcs",1040]]),
  T("Chicken Wings","",[["4 pcs",125],["6 pcs",180],["8 pcs",230]]),
  T("Chicken Strips","",[["3 pcs",150],["6 pcs",280],["12 pcs",550]]),
  T("Buffalo Wings","Chef's special, 4 pcs",220),
  T("Naga Wings","Chef's special, 4 pcs",220),
  T("BBQ Wings","Chef's special, 4 pcs",220)
 ]}]},
 {name:"Burgers",groups:[{items:[
  T("Fryco Supreme","",350),
  T("Chicken Crispy Burger","",[["Regular",250],["With cheese",280]]),
  T("Mushroom Burger","",[["Regular",250],["With cheese",280]]),
  T("Chicken BBQ Burger","",[["Regular",220],["With cheese",250]]),
  T("Chicken Delight Burger","",[["Regular",220],["With cheese",250]]),
  T("Chicken Strip Burger","",[["Regular",190],["With cheese",220]])
 ]}]},
 {name:"Rice Bowls",combo:true,groups:[{items:[
  T("Combo 1","Rice, fries, wings (2 pcs), strips (1 pc), soft drink",199),
  T("Combo 2","Rice, coleslaw, wings (2 pcs), strips (1 pc), chicken fry (1 pc), soft drink",299),
  T("Combo 3","Rice, fries, wings (2 pcs), strips (1 pc), lemon raz or mint",279),
  T("Combo 4","Rice, coleslaw, wings (2 pcs), strips (1 pc), chicken fry (1 pc), lemon raz or mint",379),
  T("Combo 5","Rice, BBQ chicken cube (6 pcs), chicken fry (1 pc), coleslaw, soft drink",299),
  T("Combo 6","Rice, chicken chilli onion, chicken fry (1 pc), soft drink",299)
 ]}]},
 {name:"Sides & Dips",groups:[{items:[
  T("French Fries","",[["Regular",110],["Large",130]]),
  T("Masala Fries","",[["Regular",110],["Large",130]]),
  T("Potato Wedges","",130),
  T("Coleslaw","",60),
  T("Nuggets","",190),
  T("Kids Meal","Mini burger, nuggets and fries",199),
  T("Brownie","",[["Regular",180],["With ice cream",250]]),
  T("Dips","Honey mustard, naga, thousand island, spicy mustard or garlic mayo. Price each.",25)
 ]}]},
 {name:"Drinks",groups:[
  {title:"Hot Coffee",items:[T("Espresso","",140),T("Americano","",150),T("Cappuccino","",190),T("Café Latte","",190),T("Caramel Latte","",240),T("Hazelnut Latte","",240),T("Café Mocha","",250),T("Hot Chocolate","",240)]},
  {title:"Frozen Coffee",items:[T("Iced Americano","",170),T("Iced Cappuccino","",210),T("Iced Latte","",210),T("Iced Hazelnut Latte","",260),T("Iced Caramel Latte","",260),T("Iced Café Mocha","",270),T("Salted Caramel","",260)]},
  {title:"Shakes",items:[T("Vanilla","",220),T("Chocolate","",220),T("Strawberry","",240),T("Oreo","",260),T("Mango","",260),T("Blueberry","",260),T("Caramel Frappe","",260)]},
  {title:"Smoothies",items:[T("Mango","",270),T("Kiwi","",270),T("Strawberry","",270),T("Blueberry","",270)]},
  {title:"Chillers",items:[T("Lemon Mint","",190),T("Lemon Raz","",190),T("Kiwi Fizz","",240),T("Strawberry Sunset","",220),T("Blue Sky","",220)]},
  {title:"Add-on",items:[T("Extra coffee shot","",90)]}
 ]}
];
