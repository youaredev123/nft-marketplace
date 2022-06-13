import styled from "styled-components";

export const NotificationsWrapper = styled.div`
  padding-top: 1.9rem;

  .activity-item {
    > div {
      > div {
        &:first-child {
          width: auto;
        }

        > div {
          p {
            text-align: left;
          }
          label {
            text-align: left;
            width: 100%;
            margin: 0;
          }
        }
      }
    }
  }
`;
