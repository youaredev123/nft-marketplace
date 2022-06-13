import React from "react";
import { CurrentCountryWrapper } from "screens/RelicsScreen/styles";

const CurrentCountryLabel = ({ countryName }) => {
    const name = countryName();
    return (
        <CurrentCountryWrapper className="icon current-country">
            <p>{name ? name : "No country selected"} </p>
        </CurrentCountryWrapper>
    );
};

export default CurrentCountryLabel;
