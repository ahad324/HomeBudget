import React from "react";
import { Form, useFetcher } from "react-router-dom";
// library imports
import { FaUserPlus } from "react-icons/fa";
// Assets imports
import illustration from "../assets/illustration.webp";
// MagicUI Import
import BlurFade from "./magicui/BlurFade";

const Intro = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  return (
    <div className="intro">
      <div>
        <BlurFade inview delay={0.2}>
          <h1>
            Take control of <span className="accent">Your Money</span>
          </h1>
        </BlurFade>
        <BlurFade inview delay={0.4}>
          <p>
            Personal budgeting is the secret to financial freedom. Start your
            journey today.
          </p>
        </BlurFade>
        <BlurFade inview delay={0.6}>
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
        </BlurFade>
      </div>
      <BlurFade inview delay={0.7}>
        <img
          src={illustration}
          alt="An illustration of a person holding Money."
          width={600}
          title="Person with money."
          loading="eager"
        />
      </BlurFade>
    </div>
  );
};

export default Intro;
