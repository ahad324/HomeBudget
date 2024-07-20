const generateRandomColor = () => {
  const index = fetchData("budgets")?.length ?? Math.floor(Math.random() * 360);
  // Generate hue step for distinct colors
  const hueStep = 360 / 10;  // Adjust the number to control the number of distinct colors
  const hue = (index * hueStep) % 360;

  // Set saturation and lightness to constants or randomize them
  const saturation = 65;
  const lightness = 40;
  console.log()
  return `${hue}, ${saturation}%, ${lightness}%`;
}
// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
}
// get all items
export const getAllMatchingItems = ({ category, key, value }) => { const data = fetchData(category) ?? []; return data.filter((item) => item[key] === value) }

// Delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key)
  if (id) { const newData = existingData.filter((item) => item.id !== id); return localStorage.setItem(key, JSON.stringify(newData)) }
  return localStorage.removeItem(key)
}
//create Budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor()
  }

  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}
// create Expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId
  }

  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;
    // add the current amount to my total
    return acc += expense.amount
  }, 0)
  return budgetSpent;
}

// FORMATTING

// Formatting Date
export const formatDateToLocalString = (epoch) => new Date(epoch).toLocaleDateString()
// Formatting percentages
export const formatPercentage = (amt) => { return amt.toLocaleString(undefined, { style: "percent", minimumFractionDigits: 0 }) }

// Format currency
export const formatCurrency = (amt) => { return amt.toLocaleString(undefined, { style: "currency", currency: "USD" }) }