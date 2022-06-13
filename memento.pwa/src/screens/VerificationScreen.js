import React from "react";
import { Link } from "react-router-dom";

export function VerificationScreen() {
  return (
    <div className="flex-stack">
      <div className="flex-fill-vertical">
        <div className="d-flex flex-row justify-content-center align-items-center p-4 pin-header">
          <input
            type="number"
            min={0}
            max={9}
            className="form-control m-2 text-white"
            style={{ width: "20%" }}
          />
          <input
            type="number"
            min={0}
            max={9}
            className="form-control m-2 text-white"
            style={{ width: "20%" }}
          />
          <input
            type="number"
            min={0}
            max={9}
            className="form-control m-2 text-white"
            style={{ width: "20%" }}
          />
          <input
            type="number"
            min={0}
            max={9}
            className="form-control m-2 text-white"
            style={{ width: "20%" }}
          />
        </div>
        <div className="p-4 mt-5">
          <Link to="/">
            <div className="btn btn-primary">Verify</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
