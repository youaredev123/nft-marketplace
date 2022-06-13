import styled from "styled-components/macro";

export const CreateContainer = styled.div`
  display: flex;
  height: 100%;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  align-items: center;
  justify-content: center;

  > a {
    -webkit-tap-highlight-color: transparent;
  }
  
  .photo-item {
    padding: 1rem;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
    
    .text {
      font-weight: var(--font-weight-bold);
      color: ${({theme}) => theme.text};
    }
  }
`;
