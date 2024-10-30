import styled from "styled-components";

export const DropDownMenu = styled.div`
  position: sticky;
  top: 32px;
  button.toggle {
    background: transparent;
    display: flex;
    justify-content: space-between;
    border: none;
    align-items: center;
    border-radius: 8px;
    background: rgba(34, 90, 137, 0.1);
    min-height: 48px;
    width: 100%;
    padding: 0 24px;
    .value {
      color: #0d3664;
      font-size: 18px;
    }
    & > *:nth-child(2) {
      transition: 0.3s;
    }
    &.open {
      & > *:nth-child(2) {
        transform: rotate(180deg);
      }
    }
  }

  .popup {
    border-radius: 8px;
    background: #fff;
    box-shadow: 0px 4px 16px 0px rgba(13, 54, 100, 0.16);
    width: 100%;
    height: 465px;
    position: absolute;
    top: -600px;
    opacity: 0;
    z-index: 10;
    transition: opacity 0.1s ease-out, top 0.1s linear 0.3s;
    overflow: auto;
    &.open {
      padding: 8px;
      top: 60px;
      opacity: 1;
      transition: top 0.3s ease-out, opacity 0.1s linear 0.25s;
    }
  }
`;
