import React, { useRef } from "react";
// Helper Funtions
import { createBudget, createExpense, deleteItem, fetchData } from "../helpers";
import { Link, useLoaderData } from "react-router-dom";

// components import
import Intro from "../components/intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// Library import
import { toast } from "react-toastify";
import BlurFade from "../components/magicui/BlurFade";

// Loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}
// action
export async function dashboardAciton({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
      return toast.success("Budget created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }
}
const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  const budgetsDragConstraintsRef = useRef();
  const budgetRef = useRef();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <BlurFade inview delay={0.2}>
            <h1>
              Welcome back, <span className="accent">{userName}</span>
            </h1>
          </BlurFade>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets" ref={budgetsDragConstraintsRef}>
                  {budgets.map((budget) => (
                    <BudgetItem
                      key={budget.id}
                      budget={budget}
                      budgetsDragConstraintsRef={budgetsDragConstraintsRef}
                      budgetRef={budgetRef}
                    />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        Veiw all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <BlurFade className="grid-sm" inview delay={0.3}>
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </BlurFade>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
