import React, { useRef } from "react";
import { useLoaderData } from "react-router-dom";
// Helper imports
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";
// Components imports
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import BlurFade from "../components/magicui/BlurFade";

// Library Imports
import { toast } from "react-toastify";
// Loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];
  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });
  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exists. ");
  }
  return { budget, expenses };
}
// action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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
const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  const budgetsDragConstraintsRef = useRef();
  const budgetRef = useRef();
  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <BlurFade className="h2">
        <span className="accent">{budget.name} </span>Overview
      </BlurFade>
      <div className="flex-lg">
        <div ref={budgetsDragConstraintsRef} className="card">
          <BudgetItem
            budget={budget}
            showDelete={true}
            budgetsDragConstraintsRef={budgetsDragConstraintsRef}
            budgetRef={budgetRef}
          />
        </div>
        <AddExpenseForm budgets={[budget]} />
        {expenses && expenses.length > 0 && (
          <div className="grid-md">
            <BlurFade className="h2" delay={0.6}>
              <span className="accent">{budget.name}</span> Expenses
            </BlurFade>
            <Table expenses={expenses} showBudget={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetPage;
