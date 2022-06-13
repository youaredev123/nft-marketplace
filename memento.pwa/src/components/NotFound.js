import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="p-5 text-center">
    <h3 className="mb-4">Sorry, this page isn't available</h3>
    <p>
      Feel free to contact us on Twitter so we can look into this
      problem.&nbsp;
      <Link to="/">Go back to Relica</Link>
    </p>
  </div>
);