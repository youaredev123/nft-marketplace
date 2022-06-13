import React from "react";
import IconCheck from 'assets/icons/check.png';
import { MessageWrapper, ImageMessage, TextMessage } from "./styles";
export default (props) => (
  // <MessageWrapper theme={props.themeContext}>
  //   <ImageMessage>
  //   <img style={{width: '100%'}} src={IconCheck}/>
  //   </ImageMessage>
  //   <TextMessage>
  //   {props.amount} transaction successful
  //   </TextMessage>
  // </MessageWrapper>
  <svg width="260" height="50" viewBox="0 0 3794 872">
    <defs>
      <clipPath id="clip-path">
        <rect id="Rectangle_9950" width="261" height="338" fill="none"/>
      </clipPath>
    </defs>
    <g id="Component_258_1">
      <g id="Component_262_1">
        <g id="Rectangle_10000" stroke="#707070" strokeWidth="20" opacity="0.504">
          <rect width="3794" height="872" rx="436" stroke="none"/>
          <rect x="10" y="10" width="3774" height="852" rx="436" fill="none"/>
        </g>
      </g>
    </g>
    <g id="Component_261_1" transform="translate(217 136)">
      <circle id="Ellipse_235" cx="300" cy="300" r="300" fill="#0DAF00"/>
    </g>
    <g id="iconfinder_add_678986" transform="translate(387 267)">
      <g id="Group_266" >
        <g id="Group_265" clipPath="url(#clip-path)">
          <path id="Path_330" d="M264.04,176.926c.18,52.052-21.132,100.249-55.865,126.342s-77.578,26.093-112.311,0S39.819,228.977,40,176.926c-.18-52.052,21.132-100.249,55.865-126.342s77.578-26.093,112.311,0S264.22,124.874,264.04,176.926Z" transform="translate(-229.415 301.775)" fill="#3c9"/>
        </g>
      </g>
      <g id="Group_268" transform="translate(7.08 32.404)">
        <g id="Group_269" >
          <path id="Path_332" d="M141.017,306.164l80,129.351,115-185.942,45-72.76" transform="translate(-141.017 -176.814)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="62.4"/>
        </g>
      </g>
    </g>
    <text x="50%" y="50%" transform="translate(217 136)" id="_1_transaction_successful" dataname={props.amount + " transaction successful"} transform="translate(913 291)" fill="#fff" fontSize="230" fontFamily="NunitoSans-SemiBold, Nunito Sans, sans-serif" fontWeight="600"><tspan x="44.675" y="233">{props.amount} transaction successful</tspan></text>
  </svg>
);
