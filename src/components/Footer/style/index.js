import styled from "styled-components";

export const FooterSection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 40px 0 35px 0;
  background: #031c3a;
  color: white;

  & > .container {
    padding: 0 80px;
    @media (max-width: 769px) {
      padding: 0px;
    }
  }

  &.dark-footer {
    background-color: rgb(48, 48, 48);
  }

  @media (max-width: 769px) {
    padding: 40px 15px;
  }

  .globe-bottom {
    position: absolute;
    width: 380px;
    bottom: -94%;
    left: -6%;
    opacity: 0.2;
    animation-name: rotate;
    animation-duration: 45s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    @media (max-width: 576px) {
      left: 40%;
      top: 5%;
    } 
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .footer .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding-top: 20px;
    flex-wrap: wrap;
  }

  footer {
    padding: 0 80px;
    @media (max-width: 769px) {
      padding: 0px;
    }
  }

  .footer.border-top {
    border-color: rgba(255, 255, 255, 0.2) !important;
  }

  .nav-footer {
    margin-bottom: 24px;
    a {
      padding: 7px;
      text-decoration: none;
      display: block;
      color: rgba(255, 255, 255, 0.473);

      &:hover {
        color: #fff;
      }
    }
  }

  .social-footer {
    position: relative;
    z-index: 3;
    a {
      margin: 0px 5px;
    }
  }

  .list-contact {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-bottom: 50px;

    .icon {
      position: absolute;
      left: 0;
      top: 4px;
    }

    li {
      position: relative;
      margin-bottom: 10px;
      & a {
        color: #fff;
        text-decoration: none;
        &:hover {
          color: #e95230;
        }
      }
    }

    .text {
      margin-bottom: 20px;
    }
  }
`;
