/* FRYCO menu catalogue
   Edit this file when menu names, descriptions or prices change.
   Prices are in Bangladeshi taka (BDT).
*/

const createMenuItem = (name, description, price) => ({
  name,
  description,
  price
});

window.FRYCO_MENU = [
  {
    name: "Crispy Chicken",
    groups: [
      {
        items: [
          createMenuItem("Chicken Fry", "", [
            ["2 pcs", 240],
            ["3 pcs", 350],
            ["5 pcs", 580],
            ["9 pcs", 1040]
          ]),
          createMenuItem("Chicken Wings", "", [
            ["4 pcs", 125],
            ["6 pcs", 180],
            ["8 pcs", 230]
          ]),
          createMenuItem("Chicken Strips", "", [
            ["3 pcs", 150],
            ["6 pcs", 280],
            ["12 pcs", 550]
          ]),
          createMenuItem("Buffalo Wings", "Chef's special, 4 pcs", 220),
          createMenuItem("Naga Wings", "Chef's special, 4 pcs", 220),
          createMenuItem("BBQ Wings", "Chef's special, 4 pcs", 220)
        ]
      }
    ]
  },
  {
    name: "Burgers",
    groups: [
      {
        items: [
          createMenuItem("Fryco Supreme", "", 350),
          createMenuItem("Chicken Crispy Burger", "", [
            ["Regular", 250],
            ["With cheese", 280]
          ]),
          createMenuItem("Mushroom Burger", "", [
            ["Regular", 250],
            ["With cheese", 280]
          ]),
          createMenuItem("Chicken BBQ Burger", "", [
            ["Regular", 220],
            ["With cheese", 250]
          ]),
          createMenuItem("Chicken Delight Burger", "", [
            ["Regular", 220],
            ["With cheese", 250]
          ]),
          createMenuItem("Chicken Strip Burger", "", [
            ["Regular", 190],
            ["With cheese", 220]
          ])
        ]
      }
    ]
  },
  {
    name: "Rice Bowls",
    combo: true,
    groups: [
      {
        items: [
          createMenuItem("Combo 1", "Rice, fries, wings (2 pcs), strips (1 pc), soft drink", 199),
          createMenuItem("Combo 2", "Rice, coleslaw, wings (2 pcs), strips (1 pc), chicken fry (1 pc), soft drink", 299),
          createMenuItem("Combo 3", "Rice, fries, wings (2 pcs), strips (1 pc), lemon raz or mint", 279),
          createMenuItem("Combo 4", "Rice, coleslaw, wings (2 pcs), strips (1 pc), chicken fry (1 pc), lemon raz or mint", 379),
          createMenuItem("Combo 5", "Rice, BBQ chicken cube (6 pcs), chicken fry (1 pc), coleslaw, soft drink", 299),
          createMenuItem("Combo 6", "Rice, chicken chilli onion, chicken fry (1 pc), soft drink", 299)
        ]
      }
    ]
  },
  {
    name: "Sides & Dips",
    groups: [
      {
        items: [
          createMenuItem("French Fries", "", [
            ["Regular", 110],
            ["Large", 130]
          ]),
          createMenuItem("Masala Fries", "", [
            ["Regular", 110],
            ["Large", 130]
          ]),
          createMenuItem("Potato Wedges", "", 130),
          createMenuItem("Coleslaw", "", 60),
          createMenuItem("Nuggets", "", 190),
          createMenuItem("Kids Meal", "Mini burger, nuggets and fries", 199),
          createMenuItem("Brownie", "", [
            ["Regular", 180],
            ["With ice cream", 250]
          ]),
          createMenuItem("Dips", "Honey mustard, naga, thousand island, spicy mustard or garlic mayo. Price each.", 25)
        ]
      }
    ]
  },
  {
    name: "Drinks",
    groups: [
      {
        title: "Hot Coffee",
        items: [
          createMenuItem("Espresso", "", 140),
          createMenuItem("Americano", "", 150),
          createMenuItem("Cappuccino", "", 190),
          createMenuItem("Café Latte", "", 190),
          createMenuItem("Caramel Latte", "", 240),
          createMenuItem("Hazelnut Latte", "", 240),
          createMenuItem("Café Mocha", "", 250),
          createMenuItem("Hot Chocolate", "", 240)
        ]
      },
      {
        title: "Frozen Coffee",
        items: [
          createMenuItem("Iced Americano", "", 170),
          createMenuItem("Iced Cappuccino", "", 210),
          createMenuItem("Iced Latte", "", 210),
          createMenuItem("Iced Hazelnut Latte", "", 260),
          createMenuItem("Iced Caramel Latte", "", 260),
          createMenuItem("Iced Café Mocha", "", 270),
          createMenuItem("Salted Caramel", "", 260)
        ]
      },
      {
        title: "Shakes",
        items: [
          createMenuItem("Vanilla", "", 220),
          createMenuItem("Chocolate", "", 220),
          createMenuItem("Strawberry", "", 240),
          createMenuItem("Oreo", "", 260),
          createMenuItem("Mango", "", 260),
          createMenuItem("Blueberry", "", 260),
          createMenuItem("Caramel Frappe", "", 260)
        ]
      },
      {
        title: "Smoothies",
        items: [
          createMenuItem("Mango", "", 270),
          createMenuItem("Kiwi", "", 270),
          createMenuItem("Strawberry", "", 270),
          createMenuItem("Blueberry", "", 270)
        ]
      },
      {
        title: "Chillers",
        items: [
          createMenuItem("Lemon Mint", "", 190),
          createMenuItem("Lemon Raz", "", 190),
          createMenuItem("Kiwi Fizz", "", 240),
          createMenuItem("Strawberry Sunset", "", 220),
          createMenuItem("Blue Sky", "", 220)
        ]
      },
      {
        title: "Add-on",
        items: [
          createMenuItem("Extra coffee shot", "", 90)
        ]
      }
    ]
  }
];
