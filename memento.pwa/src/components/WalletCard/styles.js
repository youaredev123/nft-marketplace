import styled from "styled-components/macro";

export const CardContainer = styled.div`
    width: 90%;    
    margin:auto;
    margin-top:30px;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
`;

export const CardHeader = styled.div`
    padding: 1.5rem 1.25rem;
    margin-bottom: 0;
    background: linear-gradient(90deg, rgba(31,140,209,1) 11%, rgba(34,135,207,1) 34%, rgba(43,117,199,255) 87%);
    color: #91CBEB;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    font-family: Nunito Sans;
`;

export const CardBody = styled.div`
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
    background: transparent linear-gradient(90deg,#00dbff 0%,#2d7cd3 80%) 0 0 no-repeat padding-box; 
    min-height: 19rem;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    font-family: Nunito Sans;
    
    a {
      text-decoration: none;
    }
`;

export const CardTitle = styled.div`
    color : white;
    font-weight: bold;
    font-size: 3.2rem;
`;

export const CardText = styled.div`
    color : white;
    font-size: 2.0rem;
    padding-top: 10px;
`;

export const CardLink = styled.div`
    text-align: right;
    & a {
        color : white;    
    }
    bottom: 0.75rem;
    position: absolute;
    right: 1.5rem;
    margin-right: -5px;
    .eye-icon {
        vertical-align: middle
    }
`;