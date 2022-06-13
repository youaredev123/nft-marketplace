import React, { useCallback } from 'react';
import { ReactComponent as Profile } from 'assets/icons/profile.svg';
import { Desktop, Info, InfoIcon, InfoName, InfoPrise, InfoRight, InfoTotal, InfoTotals, PostsList } from "./styles";
import IncomePostItem from "./IncomePostItem";
import Spinner from "components/Loader";

const IncomeScreenDesktop = (
  {
    loading,
    incomeList,
    infiniteRef,
    totalEarned,
    totalEarnedFollowers,
    totalEarnedReferrals,
    totalFollowers,
    viewPost,
    hasNextPage
  }
) => {
  const displayPostItems = useCallback(() => {
    return incomeList.map((income) => (
      <IncomePostItem key={income.contentId} income={income} viewPost={viewPost}/>
    ));
  }, [incomeList, viewPost]);

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
    <Desktop>
      <Info>
        <InfoTotals>
          <InfoTotal l>
            <InfoIcon l>$</InfoIcon>
            <InfoRight l>
              <InfoName>Total earned (USD)</InfoName>
              <InfoPrise>${totalEarned}</InfoPrise>
            </InfoRight>
          </InfoTotal>

          <InfoTotal c>
            <InfoIcon c>
              <Profile/>
            </InfoIcon>
            <InfoRight c>
              <InfoName>Referrals</InfoName>
              <InfoPrise>${totalEarnedReferrals}</InfoPrise>
            </InfoRight>
          </InfoTotal>

          <InfoTotal>
            <InfoIcon>
              <Profile/>
            </InfoIcon>
            <InfoRight>
              <InfoName>Followers</InfoName>
              <InfoPrise>${totalEarnedFollowers}</InfoPrise>
            </InfoRight>
          </InfoTotal>
        </InfoTotals>
      </Info>

      <div ref={infiniteRef}>
        <PostsList>
          {displayPostItems()}
          <div className="pb-5"/>
        </PostsList>
        {displayLoading()}
      </div>
    </Desktop>
  );
};

export default IncomeScreenDesktop;
