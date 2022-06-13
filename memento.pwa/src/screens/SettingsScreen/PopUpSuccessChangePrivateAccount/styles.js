import styled from "styled-components";

export const PopUpWrapper = styled.div`
  z-index: 999999;
  position: absolute;
  top: 0;
  height: 100%;
  max-width: 480px;
  width: 100%;
`


export const PopUpOverLayer = styled.div`
  position: relative;
  background-color: rgb(0,0,0,0.3);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PopUpContainer = styled.div`
  transition: opacity .3s;
  text-align: center;
  width: 55%;
  background-color: #fff;
  min-height: 300px;
  border-radius: 20px;

  & div {
    margin-top: 10px;
    margin-left: 10%;
    width: 80%;
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  & img {
    margin-top: 30px;
    width: 40px;
    margin-bottom: 10px;
  }

  & button {
    margin-bottom: 20px;
    font-weight: 500;
    outline:none;
    cursor: pointer;
    margin-top: 15px;
    border: none;
    font-size: 14px;
    width: 80%;
    height: 70px;
    border-radius: 25px;
    color: white;
    background-image: linear-gradient(to right, #4cdeff, #39a5f5)
  }
`