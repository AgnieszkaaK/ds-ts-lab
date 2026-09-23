import {Course, MenuItem, ComboDeal, OrderLine, KitchenTicket, AllergyCard} from "./menuTypes";

const soup: MenuItem= {
  id: 1,
  name: "Roast Tomato Soup",
  course: "starter",
  price: 5.5,
  nutrition: {
    calories: 180,
    allergens: ["celery"],
  },
};

const risotto: MenuItem= {
  id: 2,
  name: "Mushroom Risotto",
  course: "main",
  price: 14.0,
  nutrition: {
    calories: 620,
    allergens: ["milk"],
    },
    availableFrom: new Date("2019-11-20") 
};

const brownie: MenuItem = {
  id: 3,
  name: "Chocolate Brownie",
  course: "dessert",
  price: 6.0,
  nutrition: {
    calories: 450,
    allergens: ["milk", "eggs", "gluten"],
  },
    discountPercent: 5,
};

const menu = [soup, risotto, brownie];

const lunchCombo: ComboDeal= {
  id: 101,
  name: "Soup & Sweet",
  items: [soup, brownie],
  price: 10.0,
};

const currentOrder: OrderLine[] = [risotto, lunchCombo, soup];


function describe(item: MenuItem) {
  return `${item.name} (${item.course}) - EUR ${item.price.toFixed(2)}`;
}


function lineTotal(line:OrderLine) {
  if ("items" in line) {
    return line.price; // Combos are sold at their bundle price.
  }
  return line.price;
}

function orderTotal(lines: OrderLine[]) {
  return lines.reduce((total, line) => total + lineTotal(line), 0);
}

function filterMenu(items: MenuItem[], predicate: (item: MenuItem)=> boolean) {
  return items.filter(predicate);
}


function cheapest(items: MenuItem[], max?: number) {
  const sorted = items.sort((a, b) => a.price - b.price);
  if (max === undefined){
    return sorted;
  }
  return sorted.slice(0, max);
}

function firstMatch<T>(data: T[], criteria:(d:T) => boolean) : T | undefined {
  return data.find(criteria);
}

// TS: 'changes' holds *some* of a MenuItem's properties. Use the Partial<>
//     *utility type* rather than declaring a new interface by hand.
function updateItem(item: MenuItem, changes: Partial<MenuItem>) {
  return { ...item, ...changes };
}

// TS: The kitchen ticket needs the name and course of an item, and nothing
//     else - and it must not be modifiable once created. Declare its type by
//     composing two utility types: Readonly<Pick<...>>.
function kitchenTicket(item:MenuItem) {
  return {
    name: item.name,
    course: item.course,
  };
}


function allergyCard(item:MenuItem) : AllergyCard {
  return {
    id: item.id,
    name: item.name,
    course: item.course,
    price: item.price,
    warning: `Contains: ${item.nutrition.allergens.join(", ")}`,
  };
}

// ---------------------------------------------------------------
// 3. TESTS - these should still produce the same output afterwards.
// ---------------------------------------------------------------

console.log(describe(risotto));
console.log(orderTotal(currentOrder));
console.log(filterMenu(menu, (i) => i.nutrition.calories < 500));
console.log(cheapest(menu, 2));
console.log(cheapest(menu));
console.log(firstMatch(menu, (i) => i.course === "dessert"));
console.log(updateItem(soup, { price: 6.0, discountPercent: 10 }));
console.log(kitchenTicket(brownie));
console.log(allergyCard(brownie));

// Readonly<> object cannot be modified
// kitchenTicket(brownie).name = "Something else";

// TS: Three more lines below are bugs that only the compiler can see. Once
//     your types are in place, fix each one and note it in your commit message.
console.log(describe(lunchCombo));
console.log(updateItem(soup, { price: 7.00 }));
console.log(firstMatch(menu, (i) => i.nutrition.calories < 300));
