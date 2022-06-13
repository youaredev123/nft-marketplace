import styled from "styled-components";

export const Parent = styled.div`
    grid-template-columns: repeat(2, 1fr);
    display: grid;
    .tab {
        text-align: center;
        padding: 5px;
    }

    .selected {
        border-bottom: 1px grey solid;
    }
`;