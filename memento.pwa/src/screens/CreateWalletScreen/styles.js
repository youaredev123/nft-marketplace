import styled from "styled-components/macro";

export const LabelReminder = styled.div`
    color: #B7B7B7;
    font-size: 1.4rem;
    font-weight: 400;   
    line-height: 18px; 
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  
  hr {
    width: 100%;
    height: 15px;
    background-color: ${({theme}) => theme.notificationBorderBottom};
    border: none;
    padding: 1px;
    display: block;
    margin: 10px 0;
  }
  
  label.error {
    color: #10a5f5;
    margin: 15px 0 0 0!important;
    display: block;
  }
  
  /* The container */
  .container {
    display: block;
    position: relative;
    padding: 0 0 0 30px;
    cursor: pointer;
    color: inherit;
    font-weight: normal;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 3px;
    left: 0;
    height: 17px;
    width: 17px;
    border: 2px solid var(--blue);
    border-radius: 3px;    
  }
  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: white;
  }
  
  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: var(--blue);
  }
  
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }
  
  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 4px;
    top: -1px;
    width: 6px;
    height: 13px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
