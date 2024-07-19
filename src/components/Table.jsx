import React from "react";
// Component import
import ExpenseItem from "./ExpenseItem";

// MagicUI Components Imports
import BlurFade from "../components/magicui/BlurFade";

const Table = ({ expenses, showBudget = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <BlurFade TableRows={true} inview>
            {["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map(
              (i, index) => (
                <th key={index}>{i}</th>
              )
            )}
          </BlurFade>
        </thead>
        <tbody>
          {expenses.map((expense, i) => (
            <BlurFade
              key={expense.id}
              TableRows={true}
              delay={0.25 + i * 0.05}
              inview
            >
              <ExpenseItem expense={expense} showBudget={showBudget} />
            </BlurFade>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
