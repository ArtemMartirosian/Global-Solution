import styled from "styled-components";

export const Menu = styled.nav`
  * {
    padding: 0;
    margin: 0;
    border: 0;
  }
  button {
    background: transparent;
    text-align: left;
  }

  ul li {
    list-style: none;
  }

  .menu {
    display: grid;
    gap: 16px;
    @media (max-width: 768px) {
      gap: 0;
    }
  }

  .label {
    color: var(--Grey-100, #7a7a7a);
    font-family: "Segoe UI";
  }

  .item {
    position: relative;
    cursor: pointer;
    padding: 12px 24px;
    transition: 0.3s;
    font-size: 18px;
    line-height: 22px;
    &.active {
      border-radius: 8px;
      background: rgba(34, 90, 137, 0.1);
      color: #0d3664;
    }
    &:hover {
      background: #e6e6e6;
      border-radius: 8px;
    }
  }

  .parent {
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 16px;
    @media (max-width: 768px) {
      padding-bottom: 0px;
      border-bottom: none;
    }
    &.active {
      transition: height 0.5s;
      .children-block {
        height: auto;
      }
    }

    & > .item {
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;

      &.active {
        border-radius: 8px;
        background: rgba(34, 90, 137, 0.1);
        .label {
          color: #0d3664;
        }
        & > *:nth-child(2) {
          transition: 0.3s;
          transform: rotate(180deg);
        }
      }
    }

    .children-block {
      padding-left: 24px;
      height: 0px;
      overflow: hidden;
    }

    .child {
      cursor: pointer;
      padding: 8px 24px 8px 16px;
      border-left: 1px solid #e6e6e6;
      font-size: 16px;
      position: relative;
      button {
        position: relative;
        z-index: 2;
      }
      &:hover {
        &::after {
          transition: 0.5s;
          opacity: 0.1;
        }
      }
      &::after {
        content: "";
        box-sizing: content-box;
        position: absolute;
        top: 0;
        left: -24px;
        border-radius: 8px;
        background: #7a7a7a;
        width: 100%;
        height: 100%;
        z-index: 1;
        padding-left: 24px;
        transition: 0.5s;
        opacity: 0;
      }
      &.active {
        color: #000;
      }
    }
  }
`;
