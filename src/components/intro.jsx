import React from "react";
import { Form, useFetcher } from "react-router-dom";
// library imports
import { FaUserPlus } from "react-icons/fa";
// Assets imports
import illustration from "../assets/illustration.jpg";
const Intro = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  return (
    <div className="intro">
      <div>
        <h1>
          Take control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button
            className="btn btn--dark"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <span>Create Account</span>
                <FaUserPlus width={20} />
              </>
            )}
          </button>
        </Form>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
};

export default Intro;
