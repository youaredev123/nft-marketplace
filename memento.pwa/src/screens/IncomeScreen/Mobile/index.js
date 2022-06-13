import React, { useCallback, useContext } from "react";
import { ThemeContext } from "styled-components";
import Spinner from "components/Loader";
import IncomePostItem from "./IncomePostItem";
import { ReactComponent as PlusCircle } from "assets/icons/Add-photo.svg";
import {
  FollowersIncomeGroup,
  IncomeFollowersValue,
  IncomeLabel,
  IncomeRow,
  IncomeTotalLabel,
  IncomeTotalValue,
  PhoneContainer,
  Spacer
} from "./styles";

const IncomeScreenMobile = (
  {
    loading,
    incomeList,
    infiniteRef,
    totalEarned,
    totalEarnedFollowers,
    totalEarnedReferrals,
    totalFollowers,
    hasNextPage
  }
) => {
  const themeContext = useContext(ThemeContext);

  const displayPostItems = useCallback(() => {
    return incomeList.map((income) => (
      <IncomePostItem key={income.contentId} income={income}/>
    ));
  }, [incomeList]);

  const displayLoading = useCallback(() => {
    if (!loading || !hasNextPage) {
      return null;
    }

    return (
      <div className="d-flex mt-5 justify-content-center align-items-center">
        <Spinner/>
      </div>
    );
  }, [loading, hasNextPage]);

  return (
    <PhoneContainer>
      <div className="income pt-0 pb-3">
        <IncomeRow>
          <IncomeTotalLabel>Total Earned (USD)</IncomeTotalLabel>
          <div/>
          <IncomeTotalValue>${parseFloat(totalEarned).toFixed(2)}</IncomeTotalValue>
        </IncomeRow>
        <Spacer/>
        <IncomeRow>
          <IncomeLabel>Referrals</IncomeLabel>
          <div>
          </div>
          <IncomeFollowersValue>${parseFloat(totalEarnedReferrals).toFixed(2)}</IncomeFollowersValue>
        </IncomeRow>
        <Spacer/>
        <IncomeRow>
          <IncomeLabel>Followers</IncomeLabel>
          <FollowersIncomeGroup>
            <PlusCircle style={{ width: "19px" }} color={themeContext.navIconColorMuted}/>
            <span style={{ marginLeft: "10px" }}>{totalFollowers} followers</span>
          </FollowersIncomeGroup>
          <IncomeFollowersValue>${parseFloat(totalEarnedFollowers).toFixed(2)}</IncomeFollowersValue>
        </IncomeRow>
        <Spacer/>
        <div ref={infiniteRef} className="pl-3 pr-3">
          <IncomeRow>
            <IncomeLabel className="text-muted">Posts</IncomeLabel>
          </IncomeRow>
          {displayPostItems()}
          <div className="pb-5"/>
          {displayLoading()}
        </div>
      </div>
    </PhoneContainer>
  );
};

export default IncomeScreenMobile;
