import styled from 'styled-components'
import {Modal, Tooltip } from 'antd'
import button from "bootstrap/js/src/button";



export const ToolTipCustom = styled(Tooltip)`

  .ant-tooltip-inner{
    background-color: #EA5430;
    border-radius: 8px;
    padding: 12px;
  }

  .ant-tooltip-arrow{
    left: 2%;
  }
`

export const ModalError = styled(Modal)`
  .ant-modal-close{
    display: none;
  }

  .ant-modal-content{
    border-radius: 16px;
    padding: 34px 0px;


    .ant-modal-body{
      display: flex;
      flex-direction: column;
      img{
        margin: 0 auto;
      }

      div{
        margin-top:30px;
        h2{
          color: #141414;
          text-align: center;
          font-size: 24px;
          font-weight: 500;
        }

        p{
          color: #141414;
          text-align: center;
          font-size: 18px;
        }
      }

      button{
        background-color: #1D1D1D;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        padding: 15px;
        width: 260px;
        color:#fff;
        margin: 60px auto 0;
        &:hover{
          box-shadow: 0px 5px 8px rgb(0 0 0 / 20%), 0px 0px 8px rgb(0 0 0 / 6%);
        }
      }
    }



  }
`

export const ScrollTop = styled.button`
  position: fixed;
  z-index: 222;
  right: 8%;
  top: 80%;
  width: 60px;
  height: 60px;
  background: #141414;
  border-radius: 50px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  opacity: 0;
  transition: .3s all;
  &.visible-btn {
    opacity: 1;
  }
  
  &.color-button {
    background: #ffffff;
    svg {
      path {
        fill: #141414;
      }
    }
  }
`

export const ModalSuccess = styled(Modal)`
  .warning-text {
    border: 1px solid #FFA51F;
    border-radius: 10px;
    padding: 8px 16px 13px 14px;
    color: rgba(20, 20, 20, 0.7);
    font-weight: 400;
    font-size: 14px;
    display: flex;
    span {
      margin-right: 7px;
      display: block;
    }
  }

  .ant-modal-close {
    display: none;
  }

  .ant-modal-content {
    border-radius: 16px;
    padding: 34px 0px;


    .ant-modal-body {
      display: flex;
      flex-direction: column;

      img {
        margin: 0 auto;
      }

      div {
        margin-top: 30px;

        h2 {
          color: #141414;
          text-align: center;
          font-size: 24px;
          font-weight: 500;
        }

        p {
          color: #141414;
          text-align: center;
          font-size: 18px;
          opacity: 0.7;
        }
      }

      button {
        background-color: #1D1D1D;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        padding: 15px;
        width: 260px;
        color: #fff;
        margin: 60px auto 0;

        &:hover {
          box-shadow: 0px 5px 8px rgb(0 0 0 / 20%), 0px 0px 8px rgb(0 0 0 / 6%);
        }
      }
    }


  }



`

export const ModalForm = styled(Modal)`
  .modal-preloader {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9;
    background: #fff;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 0 0 16px 16px;
    .preloader-img {
      width: 120px;
      height: 120px;
      animation: spin 1s infinite linear;
      margin-bottom: 30px;
      @keyframes spin {
        from {
          transform: rotate(360deg)
        }
        to {
          transform: rotate(0deg);
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    p {
      font-weight: 400;
      font-size: 16px;
      color: #141414;
      opacity: 0.9;
    }
  }
  @media(max-width: 556px){
    .slick-slider{
      button{
        display: none!important;
      }
    }
  }

  .block-example {
    .img-example {
      //border-radius: 20px;
      //border:5px solid #FBDDD5;
      margin-bottom: 36px;
      justify-content: center;

      & img {
        border-radius: 20px;
        border: 5px solid #FBDDD5;
        margin-left: 60px;

        &:first-child {
          margin-left: 0;
        }
      }
    }



    & > p {
      font-size: 18px;
      text-align: center;
    }
  }

  .ant-modal-content {
    border-radius: 16px;

    .error-message-server {
      color: #FF1A1A;
    }


    .ant-modal-close {
      top: 5px;
      right: 15px;
    }

    .ant-modal-header {
      border-radius: 16px 16px 0 0;
      padding: 26px 0 22px 30px !important;

      p {
        font-weight: 400;
        font-size: 20px;

        span {
          &:first-child {
            color: #141414;
          }

          &:last-child {
            color: #C2C2C2;
          }
        }
      }

      .ant-modal-title {
        font-size: 20px;
        color: #141414;
      }
    }

    .ant-modal-body {
      padding: 24px 30px;
      position: relative;


      .icon-tooltip {
        position: absolute;
        right: 25px;
        top: 44px;
      }


      .ant-form-item-label {
        padding: 0;
      }

      .ant-input:focus {
        box-shadow: 0 0 0 3px #F4F9FF;
        border: 1px solid #A7CDFF;
      }

      .ant-form-item-has-error :not(.ant-input-disabled):not(.ant-input-borderless).ant-input {
        box-shadow: 0 0 0 3px #FFF0EF;
        border: 1px solid #FDA29B;
      }

      .ant-form-item-explain-connected {
        padding-top: 8px;
      }

      .ant-input-textarea {
        &::after {
          margin-top: 5px;
        }
      }


      .ant-checkbox-checked::after {
        border: none !important;
      }

      .ant-checkbox-inner {
        border: 2px solid #d9d9d9;
      }

      .ant-checkbox-checked .ant-checkbox-inner {
        background-color: #EA5430 !important;
        border: none;
        width: 20px;
        height: 20px;
        border-radius: 5px;

        &::after {
          border: none;
          transform: none;
          top: 18%;
          width: 11px;
          height: 13px;
          background-image: url("data:image/svg+xml,%3Csvg fill='%23fff' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' width='11px' height='13px' viewBox='0 0 122.877 101.052' enable-background='new 0 0 122.877 101.052' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M4.43,63.63c-2.869-2.755-4.352-6.42-4.427-10.11c-0.074-3.689,1.261-7.412,4.015-10.281 c2.752-2.867,6.417-4.351,10.106-4.425c3.691-0.076,7.412,1.255,10.283,4.012l24.787,23.851L98.543,3.989l1.768,1.349l-1.77-1.355 c0.141-0.183,0.301-0.339,0.479-0.466c2.936-2.543,6.621-3.691,10.223-3.495V0.018l0.176,0.016c3.623,0.24,7.162,1.85,9.775,4.766 c2.658,2.965,3.863,6.731,3.662,10.412h0.004l-0.016,0.176c-0.236,3.558-1.791,7.035-4.609,9.632l-59.224,72.09l0.004,0.004 c-0.111,0.141-0.236,0.262-0.372,0.368c-2.773,2.435-6.275,3.629-9.757,3.569c-3.511-0.061-7.015-1.396-9.741-4.016L4.43,63.63 L4.43,63.63z'/%3E%3C/g%3E%3C/svg%3E");
        }
      }

      .block-chek-list {
        .ant-checkbox-group {
          flex-direction: column;
          display: flex;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #EAECF0;
        }
      }

      .block-row-connects {
        margin-top: 15px;
        align-items: center;
        margin-bottom: 40px;

        & > p {
          font-size: 16px;
          margin-right: 14px;
          margin-bottom: 0;
        }

        & > div {
          @media (max-width: 460px) {
            margin-top: 15px;
          }
        }

        .item-list-connect {
          border: 1px solid #D4E7FF;
          background-color: #F8FBFF;
          border-radius: 30px;
          padding: 3px 20px;
          font-size: 16px;
          margin-right: 8px;

        }
      }
      .ant-form-item-required {
        color: rgba(20, 20, 20, 0.9);
      }

      label {
        font-size: 18px;
        margin-bottom: 8px;
        align-items: flex-start;
        color: rgba(20, 20, 20, 0.7);

        &::before {
          line-height: inherit;
        }

        &:hover .ant-checkbox-inner {
          border-color: #D0D5DD;
        }

        .ant-checkbox-inner {
          width: 20px;
          height: 20px;
          border-radius: 5px;

          &::after {
            top: 3% !important;
            left: 1% !important;
            width: 20px !important;
            height: 20px !important;
            background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.8319 5.63864C16.2913 6.09808 16.2913 6.84298 15.8319 7.30242L9.60497 13.5294C8.68609 14.4482 7.19629 14.4482 6.27741 13.5294L4.16812 11.4201C3.70868 10.9606 3.70868 10.2157 4.16812 9.75629C4.62756 9.29685 5.37246 9.29685 5.8319 9.75629L7.94119 11.8656L14.1681 5.63864C14.6276 5.1792 15.3725 5.1792 15.8319 5.63864Z' fill='white'/%3E%3C/svg%3E%0A") !important;
          }
        }
      }


      input, textarea {
        border: 1px solid #EAECF0;
        border-radius: 4.8px;
        padding: 8px 16px;
        font-weight: 400;
        font-size: 14px;
        color: #141414;

        &::placeholder {
          font-size: 14px;
          color: #6C757D;
        }
      }

      textarea {
        resize: none;
      }

      button {
        padding: 10px 15px;
        width: 260px;
        color: #fff;
        border-radius: 8px;
        background-color: #1D1D1D;
        border: none;
        font-weight: 600;
        font-size: 16px;
        outline: none;

        &:hover:not(:disabled) {
          background: #111111;
          box-shadow: 0px 5px 8px rgb(0 0 0 / 20%), 0px 0px 8px rgb(0 0 0 / 6%);
        }

        &:disabled {
          opacity: .3;
        }
      }
    }
  }
`


export const SectionSertificat = styled.section`
  padding: 60px 0px;
  @media(max-width: 768px){
    padding: 40px 15px;
  }
  @media(max-width: 500px){
    padding: 40px 0px;
  }
  h1{
    color: #1D1D1D;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    @media(max-width: 992px){
      font-size: 28px;
    }
    @media(max-width: 768px){
      font-size: 24px;
    }
  }
  .carousel-documents{
    .slick-track{
      padding: 30px 0px;
    }
    .item-document{
      padding: 0px 40px;
      & > div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 22px 22px;
        height: 380px;
        box-shadow: 0px 3px 8px 1px rgb(0 0 0 / 15%);
        border-radius: 8px;
        background-color: #ffffff;
        &:hover {
          box-shadow: 0px 3px 8px 1px rgba(46, 100, 255, 0.15);
        }
        @media (max-width: 768px) {
          height: auto;
        }
        .img-documents{
          height: 258px;
          cursor: pointer;
          @media (max-width: 768px) {
            height: auto;
          }
          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .text-documents{
          padding-top: 20px;
          h6{
            color: #1D1D1D;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
          }

          p{
            color: #1D1D1D;
            font-size: 14px;
            margin-bottom: 0;
          }
        }
      }
    }
  }

`


export const ButtonCarousel = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  outline: none;
  z-index: 99;

  &.arrow-prev{
    left: -10px;
  }

  &.arrow-next{
    right: -10px;
  }
`


export const SectionCarouselClients = styled.section`
  padding: 60px 30px;
  @media(max-width: 768px){
    padding: 30px 18px;
  }
  h1{
    color: #141414;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    @media(max-width: 992px){
      font-size: 28px;
    }
    @media(max-width: 768px){
      font-size: 24px;
    }
  }



  .carousel-clients{
    margin-top: 16px;

    .block_image{
      @media (max-width: 991px) {
        .client-img {
          width: 300px;
          height: 300px;
          @media (max-width: 768px) {
            width: 250px;
            height: 250px;
            @media(max-width: 500px){
              width: 100%;
              height: 100%;
            }
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
      & > div img{
        margin: 0 auto;
      }
      span{
        background: #fff;
        padding: 5px 20px;
        font-size: 18px;
        color: #141414;
        border-radius: 8px;
        box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15);
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        font-weight: 500;
        @media(max-width: 991px) {
          padding: 3px 15px;
          font-size: 16px;
        }
        @media(max-width: 500px){
          padding: 2px 10px;
          font-size: 14px;
        }
      }
    }

    .block_description{
      display: flex;
      padding-left: 60px;
      padding-right: 60px;
      flex-direction: column;
      justify-content: center;
      @media(max-width: 991px){
        padding: 0 45px;
        @media (max-width: 768px) {
          padding: 0 30px;
        }
        @media(max-width: 500px){
          padding-right: 0;
          padding-left: 15px;
        }
      }

      .text{
        background:#fff;
        padding: 15px 30px;
        border-radius: 0px 8px 8px 8px;
        font-size: 18px;
        box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15);
        margin-bottom: 34px;
        color:#141414;
        opacity: 0.7;
        @media(max-width: 991px){
          padding: 12px 18px;
          font-size: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          padding: 10px 15px;
          font-size: 14px;
          margin-bottom: 15px;
        }
        @media (max-width: 500px) {
          padding: 8px 13px;
          font-size: 11px;
          margin-bottom: 10px;
        }
      }
      & > p{
        font-size: 18px;
        margin-bottom: 0;
        font-weight: 500;
        color: #141414;
        @media(max-width: 991px){
          font-size: 16px;
        }
        @media (max-width: 768px) {
          font-size: 14px;
        }
        @media(max-width: 500px){
          font-size: 12px;
          margin-bottom: 10px;
        }
      }

      .payments{
        margin-top: 16px;
        @media(max-width: 991px){
          margin: 0;
        }
        @media(max-width: 500px){
          margin-top: 5px;
        }
        div{
          margin-right: 20px;
          @media(max-width: 991px){
            margin-right: 12px;
            width: 45px;
            height: 45px;
            img {
              width: 100%;
              height: 100%;
            }
            @media (max-width: 768px) {
              width: 40px;
              height: 40px;
            }
            @media(max-width: 500px){
              width: 35px;
              height: 35px;
            }
          }
          &:last-child{
            margin-right: 0;
          }
        }
      }
    }


  }
`


export const SectionCarouselDemo = styled.section`
  padding: 60px 30px;
  background: #F8FBFF;
  @media(max-width: 768px){
    padding: 40px 30px;
  }
  @media(max-width: 575px){
    padding: 40px 4px;
  }



  h1{
    color: #1D1D1D;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 50px;
    
    @media(max-width: 992px){
      font-size: 28px;
    }
    @media(max-width: 768px){
      font-size: 24px;
    }
  }

  .carousel-wrap{
    height: 320px;
    @media(max-width: 991px){
      height: auto;
    }
    & > div:first-child>div{
      opacity: 1!important;

      .slider-3d{
        box-shadow: 0px 5px 8px rgba(0,0,0,.15);
        border-radius: 8px;
        @media(max-width: 991px){
          box-shadow: none;
          border-radius: 0;
        }
        &.active{
          border: 5px solid #FBDDD5;
          @media(max-width: 991px){
            border-color: transparent;
          }
        }

      }
    }

    &>div:last-child{
      display: none;
      @media(max-width: 991px){
        display: block;
      }
    }


  }





  .demo-version {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    @media (max-width: 768px) {
      margin-top: 25px;
    }
    a {
      width: 270px;
      padding: 15px 0;
      background: #1D1D1D;
      border-radius: 5px;
      font-weight: 600;
      font-size: 17px;
      color: #FFFFFF;
      text-align: center;
      text-decoration: none;
      &:hover {
        background: #111111;
        box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2), 0px 0px 8px rgba(0, 0, 0, 0.06);
      }
      @media (max-width: 768px) {
        width: 230px;
        padding: 10px 0;
        font-size: 14px;
      }
    }
  }
`


export const SectionBanner = styled.section`
  position: relative;
  @media(max-width: 576px) {
    background-color: #F8FBFF;
  }
  & .top-banner{
    height: 700px;
    background-color: #EA5430;
    padding-top: 70px;
    overflow: hidden;
    position: relative;
    @media(max-width: 992px){
      padding-top: 90px;
    }

    @media(max-width: 620px){
      height: 500px;
    }


    .banner-text{
      position: relative;
      z-index: 9;
      h1{
        font-size: 72px;
        font-weight: 700;
        color: #fff;
        text-align: center;
        margin-bottom: 10px;
        @media(max-width: 992px){
          font-size: 50px;
        }
        @media(max-width: 720px){
          font-size: 40px;
        }
        @media(max-width: 620px){
          font-size: 28px;
        }
      }

      p{
        font-weight: 400;
        font-size: 30px;
        text-align: center;
        color: rgba(255,255,255,.7);
        @media(max-width: 992px){
          font-size: 20px;
        }
        @media(max-width: 620px){
          font-size: 16px;
        }
      }

      button{
        background: #1D1D1D;
        outline: none;
        border:none;
        border-radius: 5px;
        color: #fff;
        width: 270px;
        font-size: 16px;
        font-weight: 600;
        padding: 15px 0;
        display: block;
        margin: 70px auto 0;
        transition: all .3s;
        @media(max-width: 620px){
          margin: 56px auto 0;
          font-size: 14px;
          padding: 10px 0;
          width: 173px;
        }

        &:hover{
          box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2), 0px 0px 8px rgba(0, 0, 0, 0.06);
        }
      }
    }

    .big-round{
      width: 1110px;
      height: 1110px;
      border-radius: 50%;
      background-color: transparent;
      border: 2px solid rgba(255, 255, 255, 0.15);
      //margin: 0 auto;
      top: 40px;
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      @media(max-width: 1120px){
        width: 900px;
        height: 900px;
      }
      @media(max-width: 920px){
        width: 700px;
        height: 700px;
      }
      @media(max-width: 720px){
        width: 600px;
        height: 600px;
      }

      @media(max-width: 620px){
        width: 500px;
        height: 500px;
      }
      @media(max-width: 520px){
        width: 400px;
        height: 400px;
      }

      .icon-round{
        position:absolute;
        @media(max-width: 620px){
          width: 35px;
          height: 35px;
        }
        @media(max-width: 520px){
          width: 25px;
          height: 25px;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
      .icon-round:first-child{
        position:absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -20px;
      }
      .icon-round:nth-child(2){
        position:absolute;
        left: 11%;
        top: 15%;
        @media(max-width: 620px){
          top: 53px;
        }
        @media(max-width: 520px){
          top: 45px;
        }
      }
      .icon-round:nth-child(3){
        position:absolute;
        right: 11%;
        top: 15%;
        @media(max-width: 620px){
          top: 53px;
        }
        @media(max-width: 520px){
          top: 45px;
        }
      }
      .icon-round:nth-child(4){
        position:absolute;
        left: -2%;
        top: 50%;
        @media(max-width: 620px){
          left: -13px;
          top: 221px;
        }
        @media(max-width: 520px){
          top: 205px;
        }
      }
      .icon-round:nth-child(5){
        position:absolute;
        right: -2%;
        top: 50%;
        @media(max-width: 620px){
          top: 250px;
        }
        @media(max-width: 520px){
          top: 197px;
        }
      }
      .icon-round:nth-child(6){
        position:absolute;
        left: 50%;
        transform: translateX(-50%) rotate(180deg);
        top: 98%;
        width: 40px;
        height: 40px;
        @media(max-width: 620px){
          top: 475px;
          width: 35px;
          height: 35px;
        }
        @media(max-width: 520px){
          width: 25px;
          height: 25px;
          top: 382px;
        }
      }
      .icon-round:nth-child(7){
        position:absolute;
        left: 16%;
        transform: translateX(-50%) rotate(-88deg);
        top: 85%;
        @media(max-width: 620px){
          top: 410px;
        }
        @media(max-width: 520px){
          top: 333px;
        }
      }
      .icon-round:nth-child(8){
        position:absolute;
        right: 13%;
        transform: translateX(-50%) rotate(89deg);
        top: 85%;
        @media(max-width: 620px){
          top: 430px;
        }
        @media(max-width: 520px){
          top: 342px;
          right: 37px;
        }
      }
      //transform: rotate(-180deg);
      animation: BigRoundAnim 80s infinite linear;
    }

    .small-round{
      width: 880px;
      height: 880px;
      border-radius: 50%;
      background-color: transparent;
      border: 2px solid rgba(255, 255, 255, 0.15);
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      top: 40%;
      animation: SmallRoundAnim 80s infinite linear;
      @media(max-width: 1120px){
        width: 670px;
        height: 670px;
      }
      @media(max-width: 920px){
        width: 470px;
        height: 470px;
      }
      @media(max-width: 720px){
        width: 400px;
        height: 400px;
      }

      @media(max-width: 620px){
        width: 300px;
        height: 300px;
      }

      .icon-round{
        position:absolute;
        @media(max-width: 620px){
          width: 35px;
          height: 35px;
        }
        @media(max-width: 520px){
          width: 25px;
          height: 25px;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
      .icon-round:first-child{
        position:absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -20px;
      }
      .icon-round:nth-child(2){
        position:absolute;
        left: 11%;
        top: 15%;
        @media(max-width:620px){
          top:23px;
        }
      }
      .icon-round:nth-child(3){
        position:absolute;
        right: 11%;
        top: 15%;

        @media(max-width:620px){
          top:23px;
        }
      }
      .icon-round:nth-child(4){
        position:absolute;
        transform: rotate(90deg);
        left: -2%;
        top: 50%;
        @media(max-width:620px){
          left:-16px;
          top: 132px;
        }
      }
      .icon-round:nth-child(5){
        position:absolute;
        right: -2%;
        top: 50%;
        @media(max-width:620px){
          right:-16px;
          top:112px;
        }
      }
      .icon-round:nth-child(6){
        position:absolute;
        left: 50%;
        transform: translateX(-50%) rotate(-92deg);
        top: 98%;
        width: 40px;
        height: 40px;
        @media(max-width:620px){
          width: 35px;
          height: 35px;
          left:137px;
          top:279px;
        }

        @media(max-width: 520px){
          width: 25px;
          height: 25px;
        }
      }
      .icon-round:nth-child(7){
        position:absolute;
        left: 16%;
        transform: translateX(-50%) rotate(-88deg);
        top: 85%;
        @media(max-width:620px){
          left:41px;
          top:230px;
        }
        @media(max-width:520px){
          top:246px;
        }
      }
      .icon-round:nth-child(8){
        position:absolute;
        right: 13%;
        transform: translateX(-50%) rotate(89deg);
        top: 85%;
        @media(max-width:620px){
          right:12px;
          top:230px;
        }
      }
    }

    @keyframes BigRoundAnim{
      from{
        transform: rotate(0deg);
      }
      to{
        transform: rotate(360deg);
      }
    }

    @keyframes SmallRoundAnim{
      from{
        transform: rotate(0deg);
      }
      to{
        transform: rotate(-360deg);
      }
    }
  }
  

  .video-block{
    background-color: #F8FBFF;
    height: 440px;
    @media(max-width: 576px) {
      height: 80px;
      margin: 0 25px;
    }
    button {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: transparent;
      outline: none;
      border: none;
      transition: opacity .3s linear;
      & img {
        @media(max-width: 991px) {
          width: 100px;
          height: 100px;
        }
        @media(max-width: 576px){
          width: 70px;
          height: 70px;
        }
      }
      &.hide{
        opacity: 0;
      }
    }
  }

  .video-wrap{
    position: absolute;
    overflow: hidden;
    width: 920px;
    height: 525px;
    padding: 0;
    border: 8px solid #FBDDD5;
    border-radius: 40px;
    background: white;
    transition: transform .6s;
    transform: scale(1);
    left: 0;
    right: 0;
    top: -205px;
    & video{
      object-fit: cover;
    }
    @media(max-width: 991px){
      width: 100%;
      height: 400px;
    }

    @media(max-width: 620px){
      width: 100%;
      height: 320px;
      border: 4px solid #FBDDD5;
      margin: 0px auto 0;
    }
    &.video-scale-start{
      transform: scale(1.2);
      @media(max-width: 620px){
        transform: scale(1.1);
      }
    }
    @media (max-width: 576px) {
      height: 220px;
    }
    &.video-scale-end{
      transform: scale(1)!important;
      margin-bottom: 0px;
    }
  }

`

export const SectionConnect = styled.section`
  padding: 60px 15px;
  background: #F8FBFF;

  @media(max-width: 991px){
    padding: 30px 15px;
  }

  .container>div{
    @media(max-width: 991px){
      flex-direction: column;
      height:1000px;
    }
  }

  .ant-checkbox-checked::after{
    border: none!important;
  }
  .ant-checkbox-checked .ant-checkbox-inner{
    background-color: #EA5430!important;
    &::after{
      top: 3%!important;
      left: 1%!important;
      width: 20px!important;
      height: 20px!important;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.8319 5.63864C16.2913 6.09808 16.2913 6.84298 15.8319 7.30242L9.60497 13.5294C8.68609 14.4482 7.19629 14.4482 6.27741 13.5294L4.16812 11.4201C3.70868 10.9606 3.70868 10.2157 4.16812 9.75629C4.62756 9.29685 5.37246 9.29685 5.8319 9.75629L7.94119 11.8656L14.1681 5.63864C14.6276 5.1792 15.3725 5.1792 15.8319 5.63864Z' fill='white'/%3E%3C/svg%3E%0A")!important;
    }
  }

  .img-round-center{
    z-index: -3;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;

    @media(max-width: 620px){
      width: 100%;
      & img{
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
    }
  }

  .button-connect{
    width: 270px;
    padding: 16px;
    font-size: 17px;
    font-weight: 600;
    color:#fff;
    background: #1D1D1D;
    border-radius: 5px;
    border:none;
    outline: none;
    display: block;
    margin: 40px auto 0;
    &:disabled{
      opacity: .3;
    }
    &:not(:disabled):hover {
      background: #111111;
      box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2), 0px 0px 8px rgba(0, 0, 0, 0.06);
    }
  }

  .item-block-connect{
    position: relative;
    &:first-child{
      .block-chek-list{
        background: #fff;
        &:after{
          content: '';
          position: absolute;
          right: -13px;
          top: 50%;
          transform: translateY(-50%) rotate(225deg);
          border-radius: 3px;
          width: 0;
          height: 0;
          border: 13px solid black;
          border-color: transparent transparent #FFFFFF #FFFFFF;
          box-shadow: -3px 3px 3px 0 rgba(163, 163, 163, 0.16);
          @media (max-width: 992px){
            top: 99%;
            left: 48%;
            transform: translateY(-50%) rotate(315deg);
          }
        }
      }

      .round-icon{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #E9532F;
        width: 179px;
        height: 179px;
        border-radius: 50%;
        z-index: 3;
        position: absolute;
        right: -200px;
        top: 50%;
        transform: translateY(-50%);
        @media(max-width: 991px){
          width: 150px;
          height: 150px;
          left: 52%;
          top:110%;
          transform: translateX(-50%);
        }

      }

      .img-shnur{
        width: 200px;
        right: -250px;
        height: 40px;
        top: 42.3%;
        position: absolute;
        background-size: 100%;
        transition: all .3s;
        background-image: url('/images/icons/global-pay/connect-shnur-left.svg');
        &.img-connect{
          right: -292px;
          @media(max-width:991px){
            top: 154%;
            left: 51.9%;
          }
          @media(max-width:768px){
            top: 154%;
            left: 51.7%;
          }

          @media(max-width: 576px) {
            top:410px;
          }

        }
        @media(max-width:991px){
          width: 150px;
          left: 51.9%;
          transform: translateX(-50%) rotate(90deg);
          top: 147%;
          height: 30px;
        }
        @media(max-width: 768px){
          left: 51.7%;
        }
      }
    }

    &:last-child{
      .block-chek-list{
        background: #fff;
        &:after{
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          left: -13px;
          border-radius: 3px;
          width: 0;
          height: 0;
          border: 13px solid black;
          border-color: transparent transparent #FFFFFF #FFFFFF;
          box-shadow: -3px 3px 3px 0 rgba(163, 163, 163, 0.16);
          @media (max-width: 992px){
            top: -4%;
            left: 49%;
            transform: rotate(135deg);
          }
        }
        @media(max-width: 991px){
          margin:0;
        }
      }
      .round-icon{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #0D3664;
        width: 179px;
        height: 179px;
        z-index: 3;
        border-radius: 50%;
        position: absolute;
        left: -200px;
        top: 50%;
        transform: translateY(-50%);
        @media(max-width: 991px){
          width: 150px;
          height: 150px;
          left: 52%;
          top:-68%;
          transform: translateX(-50%);
        }

        &>div{
          display: flex;
          align-items: center;
          & img{
            margin-right: 7px;
            width: 34px;
            height: 34px;
            object-fit: cover;
          }

          p{
            color: #fff;
            font-size: 18px;
            margin-bottom: 0;
            font-weight: 600;
            line-height: 22px;
          }
        }
      }

      .img-shnur{
        width: 200px;
        top: 44.3%;
        left: -250px;
        height: 40px;
        position: absolute;
        background-size: 100%;
        transition: all .3s;
        background-image: url('/images/icons/global-pay/connect-shnur-right.svg');
        &.img-connect{
          left: -290px;
          @media(max-width:991px){
            top: -65%;
            left: 52%;
          }
          @media(max-width: 576px) {
            top: -174px;
          }
        }
        @media(max-width:991px){
          top: -57%;
          left: 51.9%;
          transform: translateX(-50%) rotate(90deg);
          height: 20px;
          width: 150px;
        }
        @media(max-width:768px){
          top: -57%;
          left: 51.7%;
          transform: translateX(-50%) rotate(90deg);
          height: 20px;
          width: 150px;
        }
      }
    }
  }

  .block-chek-list{
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 3px 10px  rgba(0,0,0,.15);
    position: relative;
    margin-top: 70px;
    margin-bottom: 70px;
    @media(max-width: 991px){
      margin:0;
    }




    &>p{
      color: #141414;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      opacity: 0.7;
    }



    .ant-checkbox-group{
      display: flex;
      flex-direction: column;
      .ant-checkbox-wrapper{
        padding-bottom: 15px;
        .ant-checkbox-checked{
          .ant-checkbox-inner{
            border: 1px solid transparent;
            &::after {
              border: none;
              transform: none;
              top: 18%;
              width: 11px;
              height: 13px;
              background-image: url("data:image/svg+xml,%3Csvg fill='%23fff' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' width='11px' height='13px' viewBox='0 0 122.877 101.052' enable-background='new 0 0 122.877 101.052' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M4.43,63.63c-2.869-2.755-4.352-6.42-4.427-10.11c-0.074-3.689,1.261-7.412,4.015-10.281 c2.752-2.867,6.417-4.351,10.106-4.425c3.691-0.076,7.412,1.255,10.283,4.012l24.787,23.851L98.543,3.989l1.768,1.349l-1.77-1.355 c0.141-0.183,0.301-0.339,0.479-0.466c2.936-2.543,6.621-3.691,10.223-3.495V0.018l0.176,0.016c3.623,0.24,7.162,1.85,9.775,4.766 c2.658,2.965,3.863,6.731,3.662,10.412h0.004l-0.016,0.176c-0.236,3.558-1.791,7.035-4.609,9.632l-59.224,72.09l0.004,0.004 c-0.111,0.141-0.236,0.262-0.372,0.368c-2.773,2.435-6.275,3.629-9.757,3.569c-3.511-0.061-7.015-1.396-9.741-4.016L4.43,63.63 L4.43,63.63z'/%3E%3C/g%3E%3C/svg%3E");
            }
          }
        }

        span{
          font-size: 18px;
          font-weight: 400;
          color:#1414148f;

          &.ant-checkbox{
            margin-right: 8px;
          }



          .ant-checkbox-inner{
            border: 2px solid #D0D5DD;
            width: 22px;
            height: 22px;
            border-radius: 5px;
          }
        }
      }
    }
  }
`


export const Integration = styled.section `
  .integration {
    padding: 60px 15px;
    @media (max-width: 768px) {
      padding: 40px 15px;
    }

    & > h1 {
      font-weight: bold;
      font-size: 32px;
      color: #1D1D1D;
      text-align: center;
      @media (max-width: 992px) {
        font-size: 28px;
      }
      @media (max-width: 768px) {
        font-size: 24px;
      }
    }

    .integration__wrapper {
      margin-top: 50px;
      @media (max-width: 992px) {
        margin-top: 40px;
      }
      
      & .integration__wrapper_block:last-child {
        .wrapper_img {
          flex-direction: column;
          a {
            opacity: 0;
            position: absolute;
            border: 2px solid #1D1D1D;
            border-radius: 5px;
            font-weight: 600;
            font-size: 17px;
            color: #1D1D1D;
            width: 100%;
            text-align: center;
            text-decoration: none;
            padding: 13px 0;
            top: 42%;
            transition: .3s all;
            @media(max-width: 991px){
              font-size: 14px;
              padding: 9px 0;
              top: 57%;
            }
            &:hover {
              background: #111111;
              box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2), 0px 0px 8px rgba(0, 0, 0, 0.06);
              color: #ffffff;
            }
          }
          button {
            top: 9%;
          }
        }
      }
      
      .integration__wrapper_block {
        //transition: all 2s;
        @media (max-width: 768px) {
          margin-bottom: 30px;
          &:last-child {
            margin-bottom: 0;
          }
        }

        .wrapper_img {
          position: relative;
          margin: 40px auto 0px;
          display: flex;
          align-items: center;
          @media (max-width: 992px) {
            width: 120px;
            height: 120px;
          }
          


          img {
            opacity: 1;
            transition: 0.5s;
            object-fit: contain;
          }
          


          button {
            position: absolute;
            width: 100%;
            background: #E9532F;
            border-radius: 5px;
            font-weight: 600;
            padding: 15px 0;
            border: none;
            font-size: 17px;
            color: #ffffff;
            outline: none;
            opacity: 0;
            top: 31%;
            transition: 0.5s;
            @media(max-width: 991px) {
              padding: 11px 0;
              font-size: 14px;
            }
            
            &:hover {
              box-shadow: 0px 0px 8px rgba(233, 83, 47, 0.6);
            }
          }
        }
      }

      & > div {
        h4 {
          color: #141414;
          font-weight: bold;
          font-size: 20px;
          text-align: center;
          opacity: 0.7;
        }

        & > div {
          padding: 30px;
          box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.15);
          border-radius: 10px;
          &:hover {
            box-shadow: 0px 2px 9px rgba(233, 83, 47, 0.15);
          }
        }

        & > div {
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    & {
      .integration__wrapper_block:hover {
        .wrapper_img {
          img {
            opacity: 0;
          }

          button {
            opacity: 1;
          }
          a {
            opacity: 1!important;
          }
        }
      }
    }
  }
`

export const EdditionalServices = styled.section `
  padding: 60px 0 68px;
  background: #141414;
  @media(max-width: 991px){
    padding: 30px 0;
  }
  .mt-block:last-child a{
    background: #7B65FF;
    &:hover {
      background: #8A77FF;
    }
  }
  h1 {
    font-weight: 700;
    font-size: 32px;
    color: #ffffff;
    text-align: center;
    margin-bottom: 40px;
    @media(max-width: 992px){
      font-size: 28px;
      margin-bottom: 30px;
    }
    @media(max-width: 768px){
      font-size: 24px;
    }
  }
  @media (max-width: 768px) {
    .mt-block {
      margin-top: 20px;
    }
  }

  .bg_orange {
    background: #E9532F;
    &:hover {
      background: #FF5F38;
    }
  }

  .bg_blue {
    background: #0D3664;
    &:hover {
      background: #144985;
    }
  }

  .services {
    --bs-gutter-x: 2.5rem;
    --bs-gutter-y: 2.5rem;
    @media(max-width: 768px) {
      --bs-gutter-y: 0rem;
    }
    &__link {
      border-radius: 10px;
      display: block;
      padding: 30px;
      text-decoration: none;
      height: 100%;
      @media(max-width: 991px) {
        padding: 20px;
        height: 100%;
      }
      &_top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        @media (max-width: 991px) {
          margin-bottom: 20px;
          img {
            width: 35px;
            height: 35px;
          }
        }
        span {
          display: block;
          @media (max-width: 991px) {
            img {
              width: 25px;
              height: 25px;
            }
          }
        }
      }
      p {
        font-weight: 500;
        font-size: 20px;
        color:#ffffff;
        margin-bottom: 0;
        width: 270px;
        @media (max-width: 991px) {
          width: auto;
          font-size: 14px;
        }
        @media (max-width: 768px) {
          font-size: 16px;
        }
      }
    }
  }

  .services-button {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    @media (max-width: 991px) {
      margin-top: 40px;
    }
    button {
      border: 2px solid #FFFFFF;
      border-radius: 5px;
      color:#ffffff;
      font-weight: 600;
      font-size: 17px;
      padding: 15px 0;
      width: 270px;
      transition: all 0.5s;
      background: transparent;
      @media (max-width: 991px) {
        font-size: 13px;
        padding: 10px 0;
        width: 180px;
      }
      &:hover {
        background: #ffffff;
        color:#000000;
      }
    }
  }
`

export const SectionSumm = styled.section`
  padding: 60px 30px;
  margin-top: 100px;
  @media(max-width: 768px){
    padding: 40px 15px;
    margin-top: 30px;
  }
  @media(max-width: 500px){
    padding: 40px 0px;
  }
  .line-border {
    width: 2px;
    height: 100%;
    background: #1D1D1D;
    opacity: 0.1;
    border-radius: 5px;
    position: absolute;
    padding: 0;
    left: 50%;
  }
  .section-summ {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__info {
      display: flex;
      margin-bottom: 20px;

      p {
        font-weight: 700;
        font-size: 200px;
        color: #E95530;
        line-height: 200px;
        margin-bottom: 0;
        @media(max-width: 768px){
          font-size: 100px;
          line-height: 100px;
        }
        @media(max-width: 500px){
          font-size: 80px;
          line-height: 80px;
        }
      }

      .fw-900 {
        font-weight: 900;
      }

      span {
        font-weight: 700;
        font-size: 50px;
        color: #1D1D1D;
        line-height: 95px;
        @media(max-width: 768px){
          font-size: 25px;
          line-height: 47px;
        }
        @media(max-width: 768px){
          font-size: 22px;
          line-height: 38px;
        }
      }
    }

    &__text {
      margin-right: 75px;
      @media(max-width: 768px){
        margin-right: 30px;
      }

      &.text-size {
        margin-right: 30px;
        @media(max-width: 500px){
          margin-right: 10px;
        }
      }

      p {
        font-weight: 500;
        font-size: 20px;
        color: #000000;
        opacity: 0.7;
        text-align: center;
        @media(max-width: 768px){
          font-size: 16px;
        }
        @media(max-width: 500px){
          font-size: 14px;
        }
      }
    }
  }
`

export const Proccess = styled.section`
  padding: 60px 0 70px;
  background: #F8FBFF;
  
  @media(max-width: 768px){
    padding: 40px 0px;
  }
  h2 {
    font-weight: 700;
    font-size: 32px;
    text-align: center;
    color: #141414;
    margin-bottom: 50px;
    @media(max-width: 992px){
      font-size: 28px;
    }
    @media(max-width: 768px){
      font-size: 24px;
      margin-bottom: 25px;
    }
  }
  .proccess {
    justify-content: center;
    @media (max-width: 768px) {
      flex-wrap: nowrap;
    }
    &__block {
      a {
        background: #FFFFFF;
        box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15), 0px 0px 8px rgba(0, 0, 0, 0.06);
        border-radius: 10px;
        padding: 30px 45px 50px;
        display: flex;
        flex-direction: column;
        font-weight: 600;
        font-size: 20px;
        text-align: center;
        color: #141414;
        text-decoration: none;
        &:hover {
          box-shadow: 0px 0px 8px rgba(233, 83, 47, 0.1), 0px 5px 8px rgba(233, 83, 47, 0.15);
        }
        span {
          opacity: 0.7;
        }
        @media(max-width: 768px) {
          padding: 25px 30px 35px;
        }
        @media(max-width: 576px) {
          align-items: center;
          font-size: 18px;
          padding: 15px 20px 25px;
        }
      }
      &_img {
        width: 100%;
        height: 100%;
        margin-top: 42px;
        @media(max-width: 576px) {
          width: 50%;
          margin-top: 20px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`


export const SectionIntro = styled.section`
  position:relative;
  overflow: hidden;
  padding-top: 60px;
  padding-bottom: 60px;
  & .title-intro{ margin-top:100px}

  & .my-pad {
    margin: 0px;
    & p{
      font-size: 1rem;

      @media (min-width: 1800px){
        font-size: 24px;
      }

      @media (max-width: 468px){
        font-size: .9rem;
      }
    }
    @media screen and (max-width: 960px){
      & a{
        display: block;
        margin-bottom: 10px;
      }
    }
  }


  & .mt-5 {
    max-width: 40%;
    @media screen and (max-width: 960px){
      & {
        max-width: 100%;
        text-align: center;
        margin-top: 0 !important;
      }
    }
    & .display-4 {
      margin-top: 100px;
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.2;

      @media (min-width: 1800px){
        font-size: 48px;
      }

      @media (max-width: 991px){
        text-align: center;
      }
      @media (max-width: 960px){
        margin-top: 0;
        font-size: 25px!important;
      }


    }
  }

  & .mt-5 .mt-4 a.my-app {
    margin-right: 10px;
    height: 100%;
    display: inline-block;
    border-radius: 8px;
    background-color: rgba(233, 83, 47, 0);
    position: relative;
    transition: background-color 300ms ease;
  }

  & .box-quick {
    padding: 45px;
    display: block;
    & h3{
      font-size: 32px;
      @media (max-width: 768px){
        font-size: 28px;
      }
    }
  }

  & .my-pad .col-md-7 {
    margin-left: auto;
    position: relative;
    align-self: baseline;
    height: 450px;
    @media screen and (max-width: 960px){
      & {
        width: 100%;
        text-align: center;
      }
    }
  }

  & .img-intro{
    max-width: 90%;
    z-index: 2;
    position: absolute;
    bottom: -1em;
    right: 0;
    @media screen and (max-width: 960px){
      & {
        margin-top: 6em;
        position: relative;
        bottom: 0;
      }
    }
  }

  & .my-img-background {
    position: absolute;
    background-color: #E9532F;
    right: 0.5em;
    top: 4em;
    width: 36em;
    height: 16em;
    border-radius: 50% 50% 0 0/100% 100% 0 0;
    z-index: 1;
    @media screen and (max-width: 960px){
      & {
        position: absolute;
        background-color: #E9532F;
        right: 0;
        left: 8%;
        top: 2em;
        width: 84%;
        height: 11em;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
        z-index: 1;
      }
    }
  }


  & .item-feature {
    text-align: center;
    margin-bottom: 30px;

    .my-img-background {
      text-align: center;
      color: #fff;
      border-radius: 50px;
      width: 48px;
      height: 48px;
      line-height: 48px;
      margin-bottom: 15px;
      background-color: #FD7E14FF;
      font-size: 24px;
    }

    p {
      color: #6C757DFF;
      font-size: 1rem;
      @media (min-width: 1800px){
        font-size: 24px;
      }
      @media (max-width: 468px){
        font-size: .9rem;
      }
    }
  }

  .stat-home {
    display: flex;
  }

  .item-stat {
    border-left: 1px solid rgb(220, 220, 220);
    flex-grow: 1;
    padding-left: 20px;
    width: 120px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`

export const SectionWithUs = styled.section `
  padding: 60px 30px;
  background: #F8FBFF;
  @media (max-width: 576px) {
    padding: 30px 0;
  }
  .with-us {
    @media (max-width: 576px) {
      &>div:first-child {
        margin-bottom: 40px;
      }
    }
    .images-wrap{
      position: relative;
      padding-top: 50px;
      .img-01{
        width: 100%;
        height: 320px;
        border-radius: 20px;
        overflow: hidden;
        border:5px solid #FBDDD5;
        box-shadow: 0px 5px 8px rgba(222, 192, 184, 0.2);
        @media(max-width: 461px){
          height: 250px;
        }
        & img{
          width:100%;
          height:100%;
          object-fit: contain;
        }
      }

      .img-02{
        position: absolute;
        box-shadow: 0px 5px 8px rgba(222, 192, 184, 0.2);
        right:0;
        top:0px;
        width: 190px;
        height: 400px;
        border-radius: 20px;
        overflow: hidden;
        border:5px solid #FBDDD5;
        @media(max-width: 769px){
          height: 370px;
        }
        @media(max-width: 461px){
          height: 360px;
        }
        & img{
          width:100%;
          height:100%;
          object-fit: cover;
        }
      }
    }
    &_block {
      width: 390px;
      @media (max-width: 991px){
        width: auto;
      }
      h2 {
        font-weight: 700;
        font-size: 32px;
        color: #141414;
        margin-bottom: 40px;
        @media(max-width: 992px){
          font-size: 28px;
          margin-bottom: 25px;
        }
        @media(max-width: 768px){
          font-size: 24px;
        }
      }
      p{
        font-weight: 500;
        font-size: 16px;
        color: #141414;
        opacity: 0.7;
        margin-bottom: 34px;
        @media (max-width: 992px){
          font-size: 14px;
          margin-bottom: 28px;
        }
        @media (max-width: 768px) {
          margin-bottom: 18px;
        }
      }
    }
    &__site {
      font-weight: 400;
      font-size: 16px;
      color: #E9532F;
      margin-bottom: 22px;
      display: flex;
      @media (max-width: 768px) {
        font-size: 12px;
        margin-bottom: 15px;
      }
      img {
        margin-right: 8px;
        @media (max-width: 768px) {
          width: 18px;
          height: 18px;
          margin-right: 6px;
        }
      }
    }
    &__mag {
      display: flex;
      a {
        padding: 8px 12px;
        border: 1.5px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        display: flex;
        img {
          width: 100%;
          height: 100%;
        }
        @media (max-width: 991px){
          padding: 6px 10px;
          width: 140px;
        }
        @media (max-width: 768px) {
          width: 100px;
        }
        &:first-child {
          margin-right: 16px;
        }
      }
    }
    &_images {
      width: 545px;
      height: 400px;
      @media (max-width: 991px){
        width: 100%;
        height: 100%;
        @media (max-width: 576px) {
          height: 90%;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`

export const FeatureDiv = styled.div`

  & .box-quick {
    padding: 45px;
    display: block;
  }

  & .bg {
    background-color: #f4f4f6;
  }

  & .title{
    font-weight: bold;
  }

  .item-feature {
    text-align: center;
    margin-bottom: 30px;

    & h6{
      font-size: 22px;
      @media (max-width: 768px){
        font-size: 20px;
      }
    }

    & p{
      font-size: 1rem;

      @media (min-width: 1800px){
        font-size: 24px;
      }

      @media (max-width: 468px){
        font-size: .9rem;
      }
    }

    & .icon-wrap {
      text-align: center;
      color: #fff;
      display: block;
      border-radius: 50px;
      width: 48px;
      height: 48px;
      line-height: 48px;
      margin-bottom: 15px;
      background-color: #E9532F;
      font-size: 24px;
    }

    & .icon-wrap.my-icon {
      position: relative;
      display: flex;
      margin: 0 auto 15px;
      justify-content: center;
      align-items: center;
      & .money-dollar-circle-fill {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'%3E%3Cpath d='M20.0002 36.6666C10.7952 36.6666 3.3335 29.2049 3.3335 19.9999C3.3335 10.7949 10.7952 3.33325 20.0002 3.33325C29.2052 3.33325 36.6668 10.7949 36.6668 19.9999C36.6668 29.2049 29.2052 36.6666 20.0002 36.6666ZM14.1668 23.3333V26.6666H18.3335V29.9999H21.6668V26.6666H23.3335C24.4386 26.6666 25.4984 26.2276 26.2798 25.4462C27.0612 24.6648 27.5002 23.605 27.5002 22.4999C27.5002 21.3949 27.0612 20.335 26.2798 19.5536C25.4984 18.7722 24.4386 18.3333 23.3335 18.3333H16.6668C16.4458 18.3333 16.2339 18.2455 16.0776 18.0892C15.9213 17.9329 15.8335 17.7209 15.8335 17.4999C15.8335 17.2789 15.9213 17.0669 16.0776 16.9107C16.2339 16.7544 16.4458 16.6666 16.6668 16.6666H25.8335V13.3333H21.6668V9.99992H18.3335V13.3333H16.6668C15.5618 13.3333 14.502 13.7722 13.7206 14.5536C12.9391 15.335 12.5002 16.3949 12.5002 17.4999C12.5002 18.605 12.9391 19.6648 13.7206 20.4462C14.502 21.2276 15.5618 21.6666 16.6668 21.6666H23.3335C23.5545 21.6666 23.7665 21.7544 23.9228 21.9107C24.079 22.0669 24.1668 22.2789 24.1668 22.4999C24.1668 22.7209 24.079 22.9329 23.9228 23.0892C23.7665 23.2455 23.5545 23.3333 23.3335 23.3333H14.1668Z' fill='white'/%3E%3C/svg%3E") center/contain no-repeat;
      }

      & .bank-card-fill {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'%3E%3Cpath d='M3.3335 15H35.0002C35.4422 15 35.8661 15.1756 36.1787 15.4882C36.4912 15.8007 36.6668 16.2246 36.6668 16.6667V33.3333C36.6668 33.7754 36.4912 34.1993 36.1787 34.5118C35.8661 34.8244 35.4422 35 35.0002 35H5.00016C4.55814 35 4.13421 34.8244 3.82165 34.5118C3.50909 34.1993 3.3335 33.7754 3.3335 33.3333V15ZM5.00016 5H30.0002V11.6667H3.3335V6.66667C3.3335 6.22464 3.50909 5.80072 3.82165 5.48816C4.13421 5.17559 4.55814 5 5.00016 5ZM25.0002 23.3333V26.6667H30.0002V23.3333H25.0002Z' fill='white'/%3E%3C/svg%3E") center/contain no-repeat;
      }

      & .wallet-fill {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'%3E%3Cpath d='M36.6668 16.6667V33.3333C36.6668 33.7754 36.4912 34.1993 36.1787 34.5118C35.8661 34.8244 35.4422 35 35.0002 35H5.00016C4.55814 35 4.13421 34.8244 3.82165 34.5118C3.50909 34.1993 3.3335 33.7754 3.3335 33.3333V16.6667H36.6668ZM36.6668 13.3333H3.3335V6.66667C3.3335 6.22464 3.50909 5.80072 3.82165 5.48816C4.13421 5.17559 4.55814 5 5.00016 5H35.0002C35.4422 5 35.8661 5.17559 36.1787 5.48816C36.4912 5.80072 36.6668 6.22464 36.6668 6.66667V13.3333ZM25.0002 26.6667V30H31.6668V26.6667H25.0002Z' fill='white'/%3E%3C/svg%3E") center/contain no-repeat;
      }

      & .numbers-fill {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'%3E%3Cpath d='M15 29.9999H6.66667V16.6666H15V29.9999ZM25 29.9999H16.6667V9.99992H25V29.9999ZM35 29.9999H26.6667V3.33325H35V29.9999ZM36.6667 36.6666H5V33.3333H36.6667V36.6666Z' fill='white'/%3E%3C/svg%3E") center/contain no-repeat;
      }
    }
  }

  @media (max-width: 960px){
    & h3 {
      font-size: 1.5rem;
    }
  }
`


export const OffersBlogDiv = styled.div`
  margin-top: 42px;
  padding-bottom: 60px;

  .row{
    margin-left: 0!important;
    margin-right: 0!important;
  }

  & .block:first-child {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: #FFFFFF;
  }

  & .block  h3 {
    color: #ffffff;
    font-size: 1.75rem;

    @media (min-width: 1800px){
      font-size: 30px;
    }
    @media (max-width: 768px){
      font-size: .9rem;
    }
  }

  & .block  a {
    background-color: #FFFFFF;
    border: 1px solid #EAEAEA;
    border-radius: 5px;
    text-decoration: none;
    color: #18406D;
    padding: 12px 35px;
    font-weight: 600;
    margin-top: 15px;
    display: inline-block;
    font-size: 1rem;

    @media (min-width: 1800px){
      font-size: 20px;
    }
    @media (max-width: 768px){
      font-size: 18px;
    }
  }

  & .block {
    height: 190px;
    padding: 30px 45px 50px;
    & p{
      font-size: 1rem;

      @media (min-width: 1800px){
        font-size: 24px;
      }

      @media (max-width: 468px){
        font-size: .9rem;
      }
    }
    &.left p {
      margin-top: 15px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }


`

export const SectionContacts = styled.section`
  @media (min-width: 1920px){
    max-width: 1720px;
    margin: 0 auto;
  }
  padding: 80px 0px;
  position: relative;
  top: 0;
  @media( max-width: 991px){
    height: auto;
  }
  h1{
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 48px;
  }
  p{
    font-size: 16px;
    color: rgb(20, 20, 20);
    opacity: 0.7;
    margin-bottom: 10px;
    @media (min-width: 1800px)
    {
      font-size: 22px;
    }

  }

  .section-map{
    width: 100%;
    @media( max-width: 991px){
      margin-top: 20px;
    }
  }
`


export const Rates = styled.div`
  padding: 60px 30px;
  @media (max-width: 768px) {
    padding: 40px 30px;
  }
  @media (max-width: 575px) {
    padding: 40px 4px;
  }


  h1 {
    color: #1D1D1D;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 50px;


    @media (max-width: 992px) {
      font-size: 28px;
    }
    @media (max-width: 768px) {
      font-size: 24px;
    }
    @media (max-width: 575px) {
      margin-bottom: 30px;
    }
  }

  .rates__wrapper {
    display: flex;
    justify-content: space-between;
    @media (max-width: 991px) {
      flex-wrap: wrap;
    }
    @media (max-width: 767px) {
    }
  }

  .rates__text {
    font-family: 'Segoe UI', sans-serif;
    font-size: 18px;
    color: #141414;
    margin-bottom: 50px;
    width: 360px;
    opacity: .7;
    @media (max-width: 1199px) {
      width: 100%;
      font-size: 16px;
    }
    @media (max-width: 991px) {

    }
    @media (max-width: 575px) {
      margin-bottom: 30px;
    }
  }

  .rates__information, .rates__img {
    flex: 0 0 40%;

    @media (max-width: 991px) {
      flex: 0 0 100%;
    }
    @media (max-width: 767px) {
    }
  }

  .rates__types, .rates__type {
    display: flex;
    align-content: center;
  }

  .rates__types {
    justify-content: space-between;
  }

  .rates__type {
    flex: 0 0 48%;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

    img {
      flex: 0 0 25%;
    }

    @media (max-width: 575px) {
      align-items: center;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }

  .rates__information {
    margin: 55px 0 85px;
    @media (max-width: 991px) {
      margin: 30px 0;
    }
    @media (max-width: 575px) {
      margin: 0 0 60px;
    }
  }

  .rates__info {
    margin-left: 16px;
    @media (max-width: 575px) {
      margin-left: 8px;
    }
  }

  .rates__card-type {
    font-size: 20px;
    margin: 0;
    color: #727271;
    @media (max-width: 1199px) {
      font-size: 16px;
    }
  }

  .rates__percent {
    font-size: 40px;
    font-weight: 700;
    color: #181818;
    margin: 0;
    @media (max-width: 1199px) {
      width: 100%;
      font-size: 30px;
    }
  }

  .rates__img {
    padding: 15px;
    background-image: url("/images/globalPay/trackBg.png");
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;


    .rates__video {
      background: #ffffff;
      width: 100%;
      border-radius: 24px;
      border: 4px solid #E9532F;
      object-fit: cover;
      height: 100%;
      padding: 10px;
    }

    @media (max-width: 991px) {
      margin-top: 60px;
      background-size: contain;
    }
    @media (max-width: 767px) {
      svg {
        max-width: 100%;
        height: 285px;
      }
    }
    @media (max-width: 575px) {
      margin-top: 30px;
      svg {
        height: 285px;
      }
    }
  }



`
