import styled, {keyframes} from "styled-components";

const background = keyframes`
  from {
    box-shadow: 0px 0px -30px -30px rgb(212, 160, 8);
  }
  to {
    box-shadow: 0px 8px 25px 4px rgb(212, 160, 8);
  }
`
const move = keyframes`
  0% {
    transform: translateY(300%);
    opacity: 0;
  }
  35% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`
const logoIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
export const SectionLogin = styled.div`
  &&& {
    #normal_login {
      min-width: 300px;
      padding: 70px 15px 20px;
      border-radius: 20px;
      background: #ffffff;
      border: 1px solid rgb(212, 160, 8);
      animation: ${background} 1s ease .8s normal 1 forwards, ${move} 1s ease normal 1 forwards;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    overflow: hidden;
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000f1e;

    .btn-group {
      margin-bottom: 0px;
      width: 100%;
    }

    .btn-group .ant-form-item-control-input-content {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
    }

    .ant-input-affix-wrapper {
      padding: 10px 15px;
      border-radius: 10px;
      font-size: 16px;

      .ant-input {
        font-size: 16px;
      }
    }

    .login-form-button {
      border-radius: 10px;
      width: 100px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      outline: none;
      height: 40px;
      background-color: #000f1e;
      color: rgb(212, 160, 8);
      border-color: #000f1e;

      &:hover {
        background-color: rgb(212, 160, 8);
        color: #000f1e;
        border-color: rgb(212, 160, 8);
      }
    }

    .login-item {
      margin-bottom: 24px;
    }

    .error-message {
      color: #ff4d4f;
      position: absolute;
    }

    .error-input {
      border-color: #ff4d4f;
      
      svg path{
        fill: #ff4d4f;
      }
    }

    .logo-icon {
      position: absolute;
      top: -20px;
      transform: translateX(-50%);
      left: 50%;
      opacity: 0;
      filter: drop-shadow(0px 4px 6px rgb(212, 160, 8));
      animation: ${logoIn} 1s ease 1s normal 1 forwards;
    }
  }
`

