import styled from "styled-components";
import {Modal, Upload, Progress, Tooltip} from "antd";


export const ProgressBarImage = styled(Progress)`
  .ant-progress-inner{
    border-radius: 6px;

    .ant-progress-bg{
      border-radius: 6px;
    }
  }



`




export const SectionAdaptationProject = styled.section`
  padding: 60px 10px;
  overflow-y: clip;

  h2{
    font-size: 32px;
    font-weight: 700;
    color:#141414;
    @media(max-width: 991px){
      font-size: 28px;
    }
    @media(max-width: 768px){
      font-size: 26px;
      text-align: center;
    }
  }

  .sub-title {
    font-size: 18px;
    color: rgba(20, 20, 20, 0.7);
    font-weight: 400;
    margin-top:40px;
    padding-right:40px;
    margin-bottom: 45px;
    @media(max-width: 991px){
      font-size: 16px;
      margin-top: 30px;
      margin-bottom: 30px;
    }
    @media(max-width: 768px){
      font-size: 14px;
      margin-top: 20px;
      padding-right: 0;
      margin-bottom: 15px;
      text-align: center;
    }
  }

  .tools-actions {
    @media(max-width: 991px){
      justify-content: space-between;
    }
    .cancel {
      background: transparent !important;
      border: 0.5px solid #E8E8E8 !important;
      border-radius: 4px !important;
      padding: 2px !important;
      position: absolute;
      top: 24px;
      right: 24px;
      width: 20px;
      height: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      @media(max-width: 768px){
        width: 15px;
        height: 15px;
      }
    }

    .text-header {
      color: rgba(20, 20, 20, 0.7);
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 14px;
      @media(max-width: 991px){
        font-size: 16px;
        margin-bottom: 10px;
      }
      @media(max-width: 768px) {
        font-size: 14px;
      }
    }

    .block-actions-color {
      margin-bottom: 14px;

      & > div {

        .block-colors {
          display: flex;
          flex-wrap: wrap;

          .item-color {
            margin-bottom: 15px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 23px;
            outline: none;
            padding: 10px;
            @media(max-width: 991px){
              margin-bottom: 10px;
              width: 30px;
              height: 30px;
              margin-right: 15px;
            }
            @media(max-width: 768px) {
              width: 25px;
              height: 25px;
              margin-right: 10px;
            }
            .check-white {
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              background-position: center;
              background-size: contain;
              display: block;
              background-image: url("data:image/svg+xml,%3Csvg width='20' height='15' viewBox='0 0 20 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.33508 14.6634L19.1184 2.87841L16.7617 0.521745L7.33508 9.95008L2.62008 5.23508L0.263412 7.59175L7.33508 14.6634Z' fill='white'/%3E%3C/svg%3E%0A");
              @media(max-width: 991px){
                width: 15px;
                height: 15px;
              }

            }

            .check-black {
              width: 20px;
              height: 20px;
              display: block;
              background-repeat: no-repeat;
              background-position: center;
              background-size: contain;
              background-image: url("data:image/svg+xml,%3Csvg width='20' height='15' viewBox='0 0 20 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.33508 14.6634L19.1184 2.87841L16.7617 0.521745L7.33508 9.95008L2.62008 5.23508L0.263412 7.59175L7.33508 14.6634Z' fill='%23141414'/%3E%3C/svg%3E%0A");
              @media(max-width: 991px){
                width: 15px;
                height: 15px;
              }

            }

            &.active {
              border: 3px solid #fff;
              padding: 8px;
              outline: 1px solid #CFCFCF;
              @media(max-width: 991px){
                padding: 5px;
              }
              @media(max-width: 768px) {
                padding: 3px;
              }
            }

            &.color-white {
              background-color: #fff;
              outline: 1px solid #CFCFCF;
            }

            &.color-black {
              background-color: #000;
            }

            &.color-purple {
              background-color: #806EFF;
            }

            &.color-yellow {
              background-color: #FFD600;
            }

            &.color-blue {
              background-color: #3FBEFF;
            }

            &.color-red {
              background-color: #FF5B45;
            }

            &.color-green {
              background-color: #68C600;
            }
          }

          .plus {
            width: 40px;
            height: 40px;
            opacity: .3;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            background-image: url("data:image/svg+xml,%3Csvg width='34' height='34' viewBox='0 0 34 34' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.3333 15.3333V8.66666H18.6667V15.3333H25.3333V18.6667H18.6667V25.3333H15.3333V18.6667H8.66666V15.3333H15.3333ZM17 33.6667C7.795 33.6667 0.333328 26.205 0.333328 17C0.333328 7.795 7.795 0.333328 17 0.333328C26.205 0.333328 33.6667 7.795 33.6667 17C33.6667 26.205 26.205 33.6667 17 33.6667ZM17 30.3333C20.5362 30.3333 23.9276 28.9286 26.4281 26.4281C28.9286 23.9276 30.3333 20.5362 30.3333 17C30.3333 13.4638 28.9286 10.0724 26.4281 7.57191C23.9276 5.07142 20.5362 3.66666 17 3.66666C13.4638 3.66666 10.0724 5.07142 7.57191 7.57191C5.07142 10.0724 3.66666 13.4638 3.66666 17C3.66666 20.5362 5.07142 23.9276 7.57191 26.4281C10.0724 28.9286 13.4638 30.3333 17 30.3333Z' fill='%23141414'/%3E%3C/svg%3E%0A");
            @media(max-width: 991px){
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }


  }

  .show-screen-result {
    .mobile-wrap {
      @media(max-width: 768px) {
        display: flex;
        justify-content: center;
      }
    }
    .mobile-screen {
      width: 230px;
      height: 500px;
      border: 5px solid #D2C7FF;
      border-radius: 22px;
      margin-left: auto;
      margin-right: 0;
      filter: drop-shadow(7px 19px 39px rgba(143, 115, 255, 0.1));
      overflow: hidden;
      background-position: center;
      background-size: contain;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 0px;
      justify-content: center;
      @media(max-width: 991px) {
        width: 160px;
        height: 335px;
      }
      @media(max-width: 768px){
        margin-left: 0;
        width: 130px;
        height: 270px;
        padding: 12px 0;
      }
      @media(max-width: 576px) {
        width: 100px;
        height: 210px;
        padding: 10px 0;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .logo-img {
        width: 130px;
        height: 80px;
        @media(max-width: 991px){
          width: 95px;
          height: 60px;
        }

        &.default-img {
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url("data:image/svg+xml,%3Csvg width='130' height='80' viewBox='0 0 130 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='129' height='79' rx='9.5' stroke='%23C5C5C5' stroke-dasharray='10 8'/%3E%3C/svg%3E%0A");
        }

      }

      &.theme-light {
        background-image: url("/images/globalId/theme-white.png");
        justify-content: flex-end;
      }

      &.theme-dark {
        background-image: url("/images/globalId/theme-dark.png");
        justify-content: flex-end;
      }

      &.screen-top {
        transform: translateY(-119px);
        @media(max-width: 768px){
          transform: translateY(0);
        }
      }

      button {
        width: 180px;
        padding: 12px 0px;
        border: none;
        outline: none;
        border-radius: 50px;
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        @media(max-width: 991px) {
          width: 120px;
          padding: 5px 0;
          font-size: 10px;
        }
        @media(max-width: 768px){
          width: 85px;
          font-size: 8px;
        }
        @media(max-width: 576px) {
          width: 65px;
          padding: 3px 0;
        }
      }
    }
  }
`


export const UploadImage = styled(Upload)`
  .ant-upload-select {
    position: relative;
    width: 224px;
    height: 199px;
    border: none;
    padding: 0px 30px;
    background-image: url("data:image/svg+xml,%3Csvg width='224' height='199' viewBox='0 0 224 199' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='223' height='198' rx='15.5' fill='white' stroke='%23CFCFCF' stroke-dasharray='10 6'/%3E%3C/svg%3E%0A");
    border-radius: 16px;
    @media(max-width: 991px){
      width: 100%;
      padding: 0 24px;
      border: 1px dashed #CFCFCF;
      background-image: none;
      height: 145px;
    }
    @media(max-width: 768px) {
      padding: 0 15px;
      height: 100px;
    }
    .ant-upload {
      flex-direction: column;
      @media(max-width: 991px){
        justify-content: space-evenly;
      }

      button {
        background-color: rgba(128, 110, 255, 0.1);
        border-radius: 6px;
        padding: 10px 14px;
        border: none;
        outline: none;
        color:#8F73FF;
        font-size: 14px;
        font-weight: 500;
        @media(max-width: 991px){
          padding: 5px 10px;
          font-size: 12px;
        }
        @media(max-width: 768px) {
          padding: 3px 7px;
          font-size: 10px;
        }
      }
      
      p{
        font-size: 14px;
        color: #141414;
        margin-top: 10px;
        margin-bottom: 26px;
        opacity: .6;
        @media(max-width: 991px){
          font-size: 12px;
          margin-bottom: 15px;
        }
        @media(max-width: 768px) {
          font-size: 10px;
          margin-bottom: 7px;
        }
      }

      .pic-img {
        margin: 30px auto;
        @media(max-width: 991px){
          margin: 0 auto;
        }
        img {
          @media(max-width: 991px){
            width: 35px;
            height: 35px;
          }
          @media(max-width: 768px) {
            width: 25px;
            height: 25px;
          }
        }
      }
    }
    
    .file-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 140px;
    }
  }


`


export const SectionCarousel3D = styled.section`
  padding-top: 60px;
  padding-bottom: 60px;
  @media (max-width: 768px) {
    padding: 40px 30px;
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
  }

  .carousel-wrap {
    height: 320px;
    @media (max-width: 991px) {
      height: auto;
    }

    & > div:first-child > div {
      opacity: 1 !important;

      .slider-3d {
        box-shadow: 0px 5px 8px rgba(0, 0, 0, .15);
        border-radius: 8px;
        @media (max-width: 991px) {
          box-shadow: none;
          border-radius: 0;
        }

        &.active {
          border: 5px solid #D2C7FF;
          @media (max-width: 991px) {
            border-color: transparent;
          }
        }

      }
    }

    & > div:last-child {
      display: none;
      @media (max-width: 991px) {
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
      background: #6CCB03;
      border-radius: 5px;
      font-weight: 600;
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
      text-decoration: none;

      &:hover {
        background: #5FB600;
        box-shadow: 0px 5px 8px rgba(101, 193, 0, 0.2), 0px 0px 8px rgba(101, 193, 0, 0.06);
      }

      @media (max-width: 768px) {
        width: 230px;
        padding: 10px 0;
        font-size: 14px;
      }
    }
  }
`

export const SectionGlobalId = styled.section `
  margin-top: 120px;
  margin-bottom: 110px;
  @media(max-width: 768px) {
    margin-top: 40px;
    margin-bottom: 55px;
  }
  .global-id {
    @media(max-width: 1200px) {
      flex-wrap: nowrap;
    }
    @media(max-width: 576px) {
      flex-wrap: wrap;
    }
    &__text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      h3 {
        font-weight: 700;
        font-size: 32px;
        color: #141414;
        margin-bottom: 40px;
        @media(max-width: 991px) {
          font-size: 28px;
          margin-bottom: 30px;
        }
        @media(max-width: 768px) {
          font-size: 24px;
          margin-bottom: 20px;
        }
        @media(max-width: 576px) {
          text-align: center;
        }
      }
      p {
        font-weight: 400;
        font-size: 18px;
        color: rgba(20, 20, 20, 0.7);
        width: 462px;
        @media(max-width: 991px) {
          width: auto;
          font-size: 16px;
        }
        @media(max-width: 768px) {
          font-size: 14px;
        }
        @media(max-width: 576px) {
          text-align: center;
        }
      }
    }
    &__img {
      display: flex;
      justify-content: center;
      position: relative;
      &_my {
        position: absolute;
        top: 56%;
        left: 22%;
        @media(max-width: 991px) {
          left: 9%;
        }
        @media(max-width: 576px) {
          left: 30%;
        }
        .my-id {
          display: flex;
          .circle {
            box-shadow: inset -1px 1px 2px rgba(255, 255, 255, 0.3), inset 1px -1px 2px rgba(213, 213, 213, 0.5);
            filter: drop-shadow(5px 5px 10px rgba(213, 213, 213, 0.2)) drop-shadow(-5px -5px 10px rgba(213, 213, 213, 0.2)) drop-shadow(-5px 5px 13px rgba(213, 213, 213, 0.3));
            background: #FFFFFF;
            border-radius: 500px;
            width: 120px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            @media (max-width: 991px) {
              width: 100px;
              height: 100px;
              img {
                width: 55px;
                height: 35px;
              }
            }
            @media(max-width: 768px) {
              width: 70px;
              height: 70px;
              img {
                width: 35px;
                height: 25px;
              }
            }
          }
          .switch {
            position: absolute;
            left: -72px;
            top: 20px;
            @media (max-width: 991px) {
              width: 100px;
              height: 70px;
              left: -60px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            @media(max-width: 768px) {
              width: 60px;
              height: 35px;
              left: -38px;
            }
          }
        }
      }
      &_photo {
        width: 230px;
        height: 500px;
        @media (max-width: 991px) {
          width: 205px;
          height: 435px;
        }
        @media(max-width: 768px) {
          width: 160px;
          height: 335px;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 22px;
          border: 5px solid #D2C7FF;
          @media(max-width: 768px) {
            border: 3px solid #D2C7FF;
          }
        }
      }
      &_one {
        position: absolute;
        top: 42%;
        right: 22%;
        @media(max-width: 991px) {
          right: 6%;
        }
        @media(max-width: 576px) {
          right: 30%;
        }
        .one-id {
          display: flex;
          .switch {
            position: absolute;
            right: -70px;
            top: 15px;
            @media(max-width: 991px) {
              width: 100px;
              height: 70px;
              right: -57px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            @media(max-width: 768px) {
              width: 60px;
              height: 35px;
              right: -37px;
            }
          }
          .circle {
            box-shadow: inset -1px 1px 2px rgba(255, 255, 255, 0.3), inset 1px -1px 2px rgba(213, 213, 213, 0.5);
            filter: drop-shadow(5px 5px 10px rgba(213, 213, 213, 0.2)) drop-shadow(-5px -5px 10px rgba(213, 213, 213, 0.2)) drop-shadow(-5px 5px 13px rgba(213, 213, 213, 0.3));
            background: #FFFFFF;
            border-radius: 500px;
            width: 120px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            @media (max-width: 991px) {
              width: 100px;
              height: 100px;
              img {
                width: 70px;
                height: 20px;
              }
            }
            @media(max-width: 768px) {
              width: 70px;
              height: 70px;
              img {
                width: 50px;
                height: 15px;
              }
            }
          }
        }
      }
    }
  }
`

export const Solutions = styled.section`
  padding-top: 70px;
  padding-bottom:70px;
  
  h2{
    font-weight: 700;
    font-size: 32px;
    text-align: center;
    color: #141414;
    margin-bottom: 40px;
    @media(max-width: 991px) {
      font-size: 28px;
      margin-bottom: 30px;
    }
    @media(max-width: 768px) {
      font-size: 22px;
      margin-bottom: 20px;
    }
  }
  
  .solutions_wrap{
    box-shadow: 0px 10px 30px -4px rgba(143, 115, 255, 0.08), 0px -2px 6px -2px rgba(143, 115, 255, 0.05);
    .br-none-bl{
      border-radius: 20px 20px 0 0!important;
    }
    .br-none-br{
      border-radius: 20px 20px 0 0!important;
    }
    .br-none-mr{
      border-radius: 20px 20px 0 0!important;
    }
    .solutions_item{
      opacity: .5;
      transition: opacity .3s;
      cursor: pointer;
      margin-bottom: -1px;
      
      &.default{
        opacity: 1;
      }
      
      &.active{
        opacity: 1;
        position: relative;
        background: #fff;
        z-index: 3;
        border-top-color:  #E9E3FF;
        border-left-color: #E9E3FF;
        border-right-color: #E9E3FF;
        @media(max-width: 991px) {
          padding-bottom: 0;
        }
        img {
          opacity: 0;
          transition: height .8s;
          @media(max-width: 991px) {
            display: none;
          }
        }
      }
      
      &:not(.active):not(.default){
        border-left-color:transparent;
        mix-blend-mode: luminosity;
        @media(max-width: 991px) {
          border-top-color:transparent;
        }
      }
      &:not(.active){
        &:first-child{
          border-left: 1px solid transparent!important;
        }
        
      }
      
      border:1px solid transparent;
      border-left-color: #E9E3FF;
      @media(max-width: 991px) {
        & {
          border-left-color: transparent;
          border-top-color: #E9E3FF;
        }
      }
      &:first-child{
        border-radius: 20px 0px 0px 20px;
       border-left: 1px solid #E9E3FF;
      }
      &:last-child{
        border-radius: 0px 20px 20px 0px;
      }
      text-align: center;
      & p:first-child{
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 10px;
        color: #141414;
        @media(max-width: 991px) {
          font-size: 17px;
          margin-bottom: 12px;
        }
      }
      & p{
        font-size: 16px;
        margin-bottom: 20px;
        color: rgba(20, 20, 20, 0.7);
        @media(max-width: 991px) {
          font-size: 14px;
          margin-bottom: 18px;
        }
      }
      padding: 25px 40px;
      @media(max-width: 768px) {
        padding: 26px;
      }
    }
    
    .hidden_block{
      top:99%;
      width: 100%;
      height: 0px;
      overflow: hidden;
      transition: height .3s;
      opacity: 0;
      &.mobi-block {
        display: none;
      }
      &.show{
        border: 1px solid #E9E3FF;
        opacity: 1;
        //display: inline-table;
        &.solution_item_1{
          border-radius: 0px 20px 20px 20px;
          padding: 80px 40px;
          @media(max-width: 991px) {
            padding: 0 26px;
            border-radius: 0px 0px 20px 20px;
          }
          &.desktop_block {
            display: inline-table;
            @media(max-width: 991px) {
              display: none;
            }
          }
          &.mobi-block {
            display: none;
            @media (max-width: 991px) {
              display: inline-table;
            }
          }  
          & .item__info {
            .info-block {
              margin-bottom: 34px;
              @media(max-width: 991px) {
                margin-bottom: 20px;
              }
              @media(max-width: 991px) {
                flex-direction: column;
                align-items: center;
              }
              .info-block_img {
                margin-right: 16px;
                @media(max-width: 991px) {
                  margin: 0 0 12px;
                }
              }
              .info-block_text {
                @media(max-width: 991px) {
                  text-align: center;
                }
                p {
                  font-weight: 700;
                  font-size: 20px;
                  color: #8F73FF;
                  margin-bottom: 4px;
                  @media(max-width: 991px) {
                    font-size: 18px;
                  }
                }
                span {
                  font-weight: 400;
                  font-size: 16px;
                  color: rgba(20, 20, 20, 0.7);
                  @media(max-width: 991px) {
                    font-size: 14px;
                  }
                }
              }
            }
            .info-desc {
              font-weight: 400;
              font-size: 18px;
              color: #141414;
              opacity: 0.7;
              margin-bottom: 0;
              @media(max-width: 991px) {
                font-size: 16px;
                text-align: center;
                margin-bottom: 30px;
              }
            }
          }
          & .item-img__sol {
            .ant-row {
              row-gap: 20px!important;
              @media(max-width: 991px) {
                & div {
                  width: 85px;
                  height: 85px;
                  & img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
          }
        }

        &.solution_item_2{
          border-radius: 20px;
          @media(max-width: 991px) {
            border-radius: 0 0 20px 20px;
          }
          &.desktop_block {
            display: inline-table;
            @media(max-width: 991px) {
              display: none;
            }
          }
          &.mobi-block {
            display: none;
            @media (max-width: 991px) {
              display: inline-table;
            }
          }  
          .table {
            &>:not(:first-child) {
              border: none;
            }
            .table-wrap {
              &__top {
                .top-block {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  padding: 45px 0 40px 0;
                  @media(max-width: 991px) {
                    padding: 20px 0 30px 0;
                  }
                  &__img {
                    margin-bottom: 20px;
                  }
                  &__text {
                    display: flex;
                    align-items: flex-start;
                    p {
                      font-weight: 700;
                      font-size: 20px;
                      color: #8F73FF;
                      margin-bottom: 8px;
                      margin-right: 2px;
                    }
                  }
                  span {
                    font-weight: 400;
                    font-size: 16px;
                    color: rgba(20, 20, 20, 0.7);
                    padding: 0;
                  }
                }
              }
              &__block {
                .block__desc {
                  padding: 22px 0 22px 40px;
                  display: flex;
                  align-items: center;
                  @media(max-width: 991px) {
                    padding: 22px 0 22px 26px;
                  }
                  p {
                    font-weight: 600;
                    font-size: 16px;
                    color: #141414;
                    margin-right: 4px;
                    margin-bottom: 0;
                    @media(max-width: 991px) {
                      font-size: 14px;
                    }
                  }
                  img {
                    width: 16px;
                    height: 16px;
                  }
                }
                .block__middle {
                  display: flex;
                  justify-content: center;
                  padding: 22px 0;
                  p {
                    font-weight: 400;
                    font-size: 16px;
                    color: rgba(20, 20, 20, 0.7);
                    margin-bottom: 0;
                  }
                }
                .block__last {
                  display: flex;
                  justify-content: center;
                  padding: 22px 0;
                  p {
                    font-weight: 400;
                    font-size: 16px;
                    color: rgba(20, 20, 20, 0.7);
                    margin-bottom: 0;
                  }
                }
              }
              span {
                font-weight: 700;
                font-size: 18px;
                color: #8F73FF;
                padding: 22px 0 22px 40px;
                display: block;
                @media(max-width: 991px) {
                  font-size: 16px;
                  padding: 22px 0 22px 26px;
                }
              }
            }
          }
        }

        &.solution_item_3{
          border-radius: 20px 0px 20px 20px;
          padding: 80px 40px;
          @media(max-width: 991px){
            border-radius: 0px 0px 20px 20px;
            padding: 0 26px;
          }
          @media(max-width: 768px) {
            padding: 0 26px 26px;
          }
          &.desktop_block {
            display: inline-table;
            @media(max-width: 991px) {
              display: none;
            }
          }
          &.mobi-block {
            display: none;
            @media(max-width: 991px) {
              display: inline-table;
            }
          }
          & .item__info {
            .info-block {
              margin-bottom: 34px;
              @media(max-width: 991px) {
                margin-bottom: 20px;
                flex-direction: column;
              }
              .info-block_img {
                margin-right: 16px;
                @media(max-width: 991px) {
                  width: 50px;
                  height: 50px;
                  margin: 0 0 12px;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
              .info-block_text {
                @media(max-width: 991px) {
                  text-align: center;
                }
                p {
                  font-weight: 700;
                  font-size: 20px;
                  color: #8F73FF;
                  margin-bottom: 4px;
                  @media(max-width: 991px) {
                    font-size: 18px;
                  }
                }
                span {
                  font-weight: 400;
                  font-size: 16px;
                  color: rgba(20, 20, 20, 0.7);
                  @media(max-width: 991px) {
                    font-size: 14px;
                  }
                }
              }
            }
            .info-desc {
              font-weight: 400;
              font-size: 18px;
              color: #141414;
              opacity: 0.7;
              margin-bottom: 0;
              @media(max-width: 991px) {
                font-size: 16px;
                text-align: center;
              }
              @media(max-width: 768px) {
                margin-bottom: 30px;
              }
            }
          }
          & .item-img__sol {
            .ant-row {
              row-gap: 20px!important;
              @media(max-width: 991px) {
                & div {
                  width: 85px;
                  height: 85px;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
              @media(max-width: 768px) {
                row-gap: 16px!important;
              }
              &>div:not(:nth-child(4),:nth-child(5)) {
                mix-blend-mode: luminosity;
                opacity: .6;
              }
            }
          }
        }
      }
    }
  }
  .solution__button {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 60px;
    @media(max-width: 991px) {
      margin-top:40px;
    }
    button {
      width: 270px;
      background: #6CCB03;
      border-radius: 5px;
      border: none;
      outline: none;
      font-weight: 600;
      font-size: 17px;
      padding: 15px 0;
      color: #ffffff;
      @media(max-width: 991px) {
        font-size: 14px;
        padding: 11px 0;
        width: 164px;
      }
    }
  }

`

export const ToolTipTable = styled(Tooltip)`

`

export const SectionOurPartners = styled.section `
  margin-top: 60px;
  margin-bottom: 90px;
    .our-partners {
      h2 {
        font-weight: 700;
        font-size: 32px;
        text-align: center;
        color: #141414;
        margin-bottom: 40px;
        @media(max-width: 991px) {
          font-size: 28px;
          margin-bottom: 30px;
        }
      }
      &__contain {
        @media (max-width: 768px) {
          &>div {
            margin-bottom: 20px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
        &_block {
          padding: 30px;
          border: 1px solid #E6E0FF;
          border-radius: 10px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          @media(max-width: 991px) {
            padding: 11px;
          }
          .block-between {
            .block__top {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
              .top-img {
                border: 1px solid #E6E0FF;
                border-radius: 10px;
                width: 70px;
                height: 70px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 12px;
                min-width: 70px;
                @media(max-width: 991px) {
                  width: 55px;
                  height: 55px;
                  min-width: 55px;
                  img {
                    width: 30px;
                    height: 30px;
                  }
                }
              }
              p {
                font-weight: 600;
                font-size: 20px;
                color: #5A5A5A;
                margin-bottom: 0;
                @media(max-width: 1200px) {
                  font-size: 16px;
                }
                @media(max-width: 991px) {
                  font-size: 13px;
                }
              }
            }
            .block__middle {
              margin-bottom: 20px;
              p {
                font-weight: 400;
                font-size: 16px;
                color: #5A5A5A;
                @media(max-width: 991px) {
                  font-size: 14px;
                }
              }
            }
          }
          
          .block__bottom {
            display: flex;
            align-items: center;
            span {
              font-weight: 600;
              font-size: 18px;
              color: #5A5A5A;
              margin-right: 14px;
            }
            .bottom-img {
              width: 50px;
              height: 50px;
              border: 1px solid #E6E0FF;
              border-radius: 200px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 8px;
              @media(max-width: 991px) {
                width: 40px;
                height: 40px;
                img {
                  width: 26px;
                  height: 24px;
                }
              }
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
`


export const SectionAnimationService = styled.section`
  .nav-buttons{
    position: absolute;
    z-index: 4;
    transition: transform .4s linear;
    
    &.nav-buttons-mobile{
      position: absolute;
      left: 0;
      right: 0;
      top: -85px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 565px;
      
      @media(max-width: 765px){
        height: 520px;
      }
      @media(max-width: 476px){
        height: 480px;
      }
      @media(max-width: 420px){
        height: 440px;
      }

      @media(max-width: 370px){
        height: 412px;
      }
      
      
      
      .nav-button{
        width: 80px;
        height: 80px;
        
      }
      
      .wrap-mobile {
        .nav-button {
          @media(max-width: 991px) {
            &:first-child {
              margin-left: 27px;
            }
            &:last-child {
              margin-right: 27px;
            }
          }
          @media(max-width: 768px) {
            &:first-child {
              margin-left: 14px;
            } 
            &:nth-child(2) {
              margin-left: -7px;
            }
            &:last-child {
              margin-right: 6px;
            }
          }
        }
      }
    }
    
    &.sticky-nav{
      top: 42px;
      padding-top: 50px;
      padding-bottom: 50px;
      &:before{
        content:'';
        width: 100%;
        height: 52px;
        background-color: #fff;
        position: absolute;
        top: -42px;
        z-index: 2;
      }
     
     

      &.opacity-1{
        transition: opacity .4s linear;
        transition-delay: .4s;
      }

      &.disable-sticky{
        top: 2520px!important;
        padding-bottom: 20px;
      }

      transform: translate(0px, 0px);
      background: linear-gradient( 180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 70%, rgba(255,255,255,0) 100% );
      .nav-button{
        width: 80px;
        height: 80px;
        margin-right: 12px;
        padding: 12px 9px;
        
        p {
          font-size: 14px;
        }
        
        .icon-button{
          filter: grayscale(100%);
          opacity: .6;
        }

        &.active {
          border: 1px solid #8F73FF;

          p {
            opacity: 1;
          }

          .icon-button {
            opacity: 1;
            filter: grayscale(0%);
          }
        }


          @media(max-width: 991px) {
          width: 80px;
          height: 80px;
        }
        @media(max-width: 768px) {
          width: 60px;
          height: 60px;
        }
        &:last-child{
          margin-right: 0!important;
        }
      }
    }

    
    &.state-up{
      width: 100%;
      justify-content: center;
      .nav-button{
        width: 130px;
        height: 130px;
        margin-right: 65px;
        @media(max-width: 991px) {
          width: 115px;
          height: 115px;
        }
        @media(max-width: 768px) {
          width: 85px;
          height: 85px;
          margin-right: 26px;
        }
        &:last-child{
          margin-right: 0!important;
        }
      }
    }

    &.state-down{
      transform: translate(0px, 108px);
      background: #fff;
      animation: hidden .5s ease;
      animation-fill-mode: forwards;
      
      @keyframes hidden{
        0%{
          opacity: 1;
        }
        50%{
          opacity: 0.5;
        }
        100%{
          opacity: 0;
        }
      }


      .nav-button{
        width: 100px;
        height: 100px;
        margin-right: 10px;
        
        .icon-button{
          filter: grayscale(100%);
          opacity: .6;

          &.active{
            border: 1px solid #8F73FF;

            p{
              opacity: 1;
            }

            .icon-button{
              opacity: 1;
              filter: grayscale(0%);
            }

          }
        }
        @media(max-width: 991px) {
          width: 80px;
          height: 80px;
        }
        @media(max-width: 768px) {
          width: 60px;
          height: 60px;
        }
        &:last-child{
          margin-right: 0!important;
        }
      }
    }
    .nav-button{
      border: 1px solid #E6E0FF;
      border-radius: 14px;
      padding: 16px 20px 16px 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      align-items: center;
      
      &:hover {
        box-shadow: 0px 5px 8px rgba(140, 113, 239, 0.1), 0px 0px 8px rgba(140, 113, 239, 0.06);
        border: 1px solid #E9E9E9;
      }

      @media(max-width: 991px) {
        padding: 12px 15px;
      }
      @media(max-width: 768px) {
        padding: 5px 10px;
      }
      p{
        font-weight: 400;
        color:#141414;
        opacity: 0.7;
        font-size: 18px;
        margin-bottom: 0;
        margin-top: 10px;
        white-space: nowrap;
        @media(max-width: 991px) {
          font-size: 16px;
        }
        @media(max-width: 768px) {
          font-size: 14px;
        }
      }

      .icon-button{
        display: block;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        width: 50px;
        height: 50px;
        cursor: pointer;
        @media(max-width: 991px) {
          width: 35px;
          height: 35px;
        }
        @media(max-width: 768px) {
          width: 30px;
          height: 30px;
        }
      }


      &.active{
        border: 1px solid #8F73FF;
        
        p{
          opacity: 1;
        }

        .icon-button{
          opacity: 1;
          filter: grayscale(0%);
        }

      }

      .icon-mrz{
        background-image: url("/images/globalId/svg/mrz.svg");
      }
      .icon-livenes{
        background-image: url("/images/globalId/svg/livenes.svg");
      }
      .icon-location{
        background-image: url("/images/globalId/svg/map.svg");
      }
      .icon-nfc{
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28.5052 20.3613C28.4388 20.3613 28.3713 20.3558 28.3038 20.3439C27.6659 20.2334 27.2388 19.6269 27.3493 18.9892C27.5768 17.6763 27.6993 16.3342 27.7132 15C27.6645 10.2912 26.2914 5.73096 23.7426 1.81067C23.3897 1.26822 23.5437 0.542204 24.0861 0.189497C24.6288 -0.163211 25.3546 -0.00940205 25.7075 0.533277C28.5017 4.83077 30.0057 9.82932 30.057 14.9883V15.0117C30.0423 16.4758 29.9084 17.9487 29.6585 19.3897C29.5596 19.9596 29.0646 20.3613 28.5052 20.3613ZM25.7075 29.4667C26.6139 28.0728 27.3942 26.5858 28.027 25.047C28.2733 24.4485 27.9874 23.7637 27.3889 23.5176C26.7904 23.2713 26.1056 23.557 25.8595 24.1555C25.2821 25.5599 24.5698 26.917 23.7426 28.1891C23.3897 28.7318 23.5437 29.4576 24.0861 29.8105C24.2834 29.9387 24.5048 30 24.7238 30C25.1072 30 25.483 29.8121 25.7075 29.4667ZM20.0139 26.4125C22.2757 23.0367 23.4997 19.0956 23.5535 15.0153C23.5538 15.005 23.5538 14.9947 23.5535 14.9844C23.4997 10.9042 22.2757 6.96303 20.0139 3.58748C19.6536 3.04984 18.9255 2.90587 18.3881 3.26613C17.8503 3.62639 17.7065 4.35423 18.0668 4.89188C20.0725 7.88543 21.1592 11.3802 21.2098 15C21.1592 18.6195 20.0725 22.1143 18.0668 25.1079C17.7065 25.6455 17.8505 26.3734 18.3881 26.7336C18.5884 26.868 18.815 26.9321 19.0393 26.9321C19.417 26.9321 19.7877 26.7499 20.0139 26.4125ZM14.8533 21.5218C15.4664 21.346 15.9656 20.8834 16.1886 20.2849C16.8342 18.5511 17.1439 16.7654 17.1089 14.9769C17.0528 12.123 16.1419 9.35119 14.4747 6.96143C14.1044 6.43088 13.3738 6.30065 12.843 6.67098C12.3122 7.04131 12.1822 7.7719 12.5525 8.30268C13.9535 10.3107 14.7187 12.6345 14.7656 15.0229C14.7922 16.3726 14.5818 17.7244 14.1403 19.0478L3.39086 10.7828C2.92279 10.4228 2.30802 10.3175 1.74634 10.5006C1.18581 10.6837 0.752534 11.1305 0.587281 11.6963C0.346039 12.5214 0.0585632 13.8357 0.0585632 15.4099C0.0585632 18.1837 1.64449 20.6623 1.71178 20.7665C2.06334 21.3087 2.78661 21.4627 3.32952 21.1128C3.87265 20.7626 4.02898 20.0377 3.67994 19.4939C3.66735 19.474 2.40232 17.4783 2.40232 15.4099C2.40232 14.5452 2.50737 13.7764 2.636 13.1589L13.0721 21.1828C13.4305 21.4581 13.856 21.6014 14.2921 21.6014C14.4788 21.6014 14.6674 21.5753 14.8533 21.5218Z' fill='%238F73FF'/%3E%3C/svg%3E%0A");
      }

      .icon-device{
        background-image: url("/images/globalId/svg/device.svg");
      }

      .icon-biometric{
        background-image: url("/images/globalId/svg/biometric.svg");
      }


      .icon-faceId{
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='31' viewBox='0 0 30 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg style='mix-blend-mode:luminosity' opacity='0.8'%3E%3Crect opacity='0.5' x='27.7779' y='15.2771' width='0.555555' height='2.22222' rx='0.277777' transform='rotate(-90 27.7779 15.2771)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.0962544 -0.995357 0.995358 -0.0962442 27.7445 14.0288)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.191122 -0.981566 0.98157 -0.191102 27.5937 12.8071)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.28707 -0.95791 0.957918 -0.287042 27.3183 11.5803)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.382677 -0.923882 0.923897 -0.382642 26.9164 10.3687)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.470043 -0.882643 0.882664 -0.470004 26.4097 9.23486)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.555267 -0.831672 0.8317 -0.555226 25.7845 8.13794)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.63442 -0.772988 0.773021 -0.63438 25.0561 7.11084)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.707126 -0.707088 0.707126 -0.707088 24.2321 6.16138)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.770707 -0.63719 0.63723 -0.770674 23.3252 5.30322)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555537' height='2.22206' rx='0.277768' transform='matrix(-0.82966 -0.558268 0.558309 -0.829633 22.3319 4.53101)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555542' height='2.22204' rx='0.277771' transform='matrix(-0.880921 -0.473264 0.473303 -0.8809 21.2694 3.86035)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555546' height='2.22202' rx='0.277773' transform='matrix(-0.92246 -0.386092 0.386127 -0.922446 20.1473 3.29907)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.55555' height='2.22201' rx='0.277775' transform='matrix(-0.956826 -0.290662 0.290691 -0.956817 18.9765 2.85034)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555552' height='2.222' rx='0.277776' transform='matrix(-0.980833 -0.19485 0.19487 -0.980829 17.767 2.52002)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555554' height='2.22199' rx='0.277777' transform='matrix(-0.99498 -0.100074 0.100084 -0.994979 16.5276 2.31104)' fill='%232B2A29'/%3E%3Crect opacity='0.5' x='15.228' y='2.22192' width='0.555555' height='2.22199' rx='0.277777' transform='rotate(179.779 15.228 2.22192)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555554' height='2.22199' rx='0.277777' transform='matrix(-0.99498 0.100074 -0.100084 -0.994979 13.9724 2.26099)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555552' height='2.222' rx='0.277776' transform='matrix(-0.980833 0.19485 -0.19487 -0.980829 12.7265 2.42236)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.55555' height='2.22201' rx='0.277775' transform='matrix(-0.956826 0.290662 -0.290691 -0.956817 11.5062 2.7041)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555546' height='2.22202' rx='0.277773' transform='matrix(-0.92246 0.386092 -0.386127 -0.922446 10.32 3.10425)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555542' height='2.22204' rx='0.277771' transform='matrix(-0.880921 0.473264 -0.473303 -0.8809 9.17912 3.62036)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555537' height='2.22206' rx='0.277768' transform='matrix(-0.82966 0.558268 -0.558309 -0.829633 8.09277 4.24634)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.770707 0.63719 -0.63723 -0.770674 7.07199 4.97632)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.704552 0.709652 -0.70969 -0.704514 6.12669 5.80322)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.63442 0.772988 -0.773021 -0.63438 5.27579 6.7085)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.555267 0.831672 -0.8317 -0.555226 4.50865 7.70117)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.470043 0.882643 -0.882664 -0.470004 3.84086 8.76733)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.382677 0.923882 -0.923897 -0.382642 3.28965 9.87476)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.28707 0.95791 -0.957918 -0.287042 2.83799 11.0632)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.191122 0.981566 -0.98157 -0.191102 2.51192 12.2722)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(-0.0962544 0.995357 -0.995358 -0.0962442 2.30997 13.4812)' fill='%232B2A29'/%3E%3Crect opacity='0.5' x='2.22208' y='14.8225' width='0.555555' height='2.22222' rx='0.277777' transform='rotate(89.5576 2.22208 14.8225)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.103912 0.994587 -0.994588 0.103901 2.26473 16.0667)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.198615 0.980078 -0.980082 0.198595 2.42152 17.2708)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.294305 0.955712 -0.95572 0.294277 2.70174 18.4861)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.38957 0.920997 -0.921012 0.389534 3.11726 19.7122)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.476555 0.879145 -0.879166 0.476515 3.61801 20.8171)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.561343 0.827583 -0.827611 0.561302 4.25441 21.9197)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.640031 0.768349 -0.768382 0.639991 4.99409 22.9497)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.712245 0.701931 -0.701969 0.712207 5.8306 23.9006)' fill='%232B2A29'/%3E%3Crect width='0.555532' height='3.2' rx='0.277766' transform='matrix(0.777621 0.628733 -0.628774 0.777588 6.75752 24.7654)' fill='url(%23paint0_linear_382_20631)'/%3E%3Crect width='0.555537' height='3.2' rx='0.277769' transform='matrix(0.833728 0.552175 -0.552216 0.833701 7.6955 25.4875)' fill='url(%23paint1_linear_382_20631)'/%3E%3Crect width='0.555542' height='3.2' rx='0.277771' transform='matrix(0.884396 0.466737 -0.466776 0.884376 8.78104 26.1667)' fill='url(%23paint2_linear_382_20631)'/%3E%3Crect width='0.555547' height='3.2' rx='0.277773' transform='matrix(0.926732 0.375722 -0.375756 0.926719 9.94499 26.7402)' fill='url(%23paint3_linear_382_20631)'/%3E%3Crect width='0.55555' height='3.2' rx='0.277775' transform='matrix(0.958997 0.283416 -0.283444 0.958989 11.0916 27.1707)' fill='url(%23paint4_linear_382_20631)'/%3E%3Crect width='0.555553' height='3.2' rx='0.277776' transform='matrix(0.982293 0.18735 -0.187369 0.98229 12.3036 27.4941)' fill='url(%23paint5_linear_382_20631)'/%3E%3Crect opacity='0.5' width='0.555554' height='2.22199' rx='0.277777' transform='matrix(0.995721 0.0924127 -0.0924225 0.99572 13.48 27.6907)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22199' rx='0.277777' transform='matrix(0.999933 -0.0115795 0.0115807 0.999933 14.8742 27.7781)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555554' height='2.22199' rx='0.277777' transform='matrix(0.994181 -0.107725 0.107736 0.99418 16.1065 27.7319)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555552' height='2.222' rx='0.277776' transform='matrix(0.979316 -0.202335 0.202355 0.979312 17.2835 27.5769)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.55555' height='2.22201' rx='0.277775' transform='matrix(0.954602 -0.297885 0.297914 0.954593 18.502 27.2949)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555546' height='2.22202' rx='0.277773' transform='matrix(0.919551 -0.39297 0.393006 0.919536 19.7492 26.8684)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555541' height='2.22204' rx='0.277771' transform='matrix(0.8774 -0.479759 0.479799 0.877379 20.8437 26.3694)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555536' height='2.22206' rx='0.277768' transform='matrix(0.825551 -0.564328 0.564369 0.825523 21.9528 25.7253)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.766048 -0.642783 0.642824 0.766014 22.9844 24.9797)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.699377 -0.714753 0.714791 0.699339 23.9341 24.1387)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.625937 -0.779873 0.779906 0.625897 24.7961 23.2085)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.549157 -0.835719 0.835746 0.549116 25.5217 22.2581)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.463501 -0.886097 0.886117 0.463462 26.1958 21.1699)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.372286 -0.928118 0.928132 0.372252 26.7608 20.012)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.279813 -0.960055 0.960063 0.279785 27.1902 18.853)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.183612 -0.982999 0.983002 0.183593 27.5089 17.6372)' fill='%232B2A29'/%3E%3Crect opacity='0.5' width='0.555555' height='2.22222' rx='0.277777' transform='matrix(0.0885883 -0.996068 0.996069 0.088579 27.7023 16.428)' fill='%232B2A29'/%3E%3Cg clip-path='url(%23clip0_382_20631)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.0053 16.1841C12.4401 16.1841 13.6105 14.1626 13.6105 11.684C13.6105 9.20558 12.4401 7.18408 11.0053 7.18408C9.57024 7.18408 8.39993 9.20558 8.39993 11.684C8.39993 14.1626 9.57024 16.1841 11.0053 16.1841Z' fill='%23404D61'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M20.5727 15.0336C21.0844 15.0336 21.499 15.7538 21.499 16.6423C21.499 17.5307 21.0844 18.251 20.5727 18.251C20.0612 18.251 19.6465 17.5307 19.6465 16.6423C19.6465 15.7538 20.0612 15.0336 20.5727 15.0336ZM9.73414 15.0336C10.2457 15.0336 10.6604 15.7538 10.6604 16.6423C10.6604 17.5307 10.2457 18.251 9.73414 18.251C9.22261 18.251 8.80793 17.5307 8.80793 16.6423C8.80793 15.7538 9.22261 15.0336 9.73414 15.0336Z' fill='%23E1E3E6'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M20.3605 15.4736C21.0779 15.4736 21.6631 13.8778 21.6631 11.921C21.6631 9.96425 21.0779 8.36837 20.3605 8.36837C19.643 8.36837 19.0578 9.96425 19.0578 11.921C19.0578 13.8778 19.643 15.4736 20.3605 15.4736Z' fill='%23404D61'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.82278 11.3288H20.4826V18.682C20.4826 21.6134 18.0841 24.012 15.1526 24.012C12.2212 24.012 9.82278 21.6134 9.82278 18.682V11.3288Z' fill='%23F8F8F8'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.0315 13.1052C18.4231 13.1052 21.1894 11.5093 21.1894 9.55259C21.1894 7.59588 18.4231 5.99996 15.0315 5.99996C11.6399 5.99996 8.87356 7.59588 8.87356 9.55259C8.87356 11.5093 11.6399 13.1052 15.0315 13.1052Z' fill='%23404D61'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_382_20631' x1='0.277766' y1='0' x2='0.277766' y2='3.2' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23BFFF78'/%3E%3Cstop offset='1' stop-color='%236ED200'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_382_20631' x1='0.277769' y1='0' x2='0.277769' y2='3.2' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23BFFF78'/%3E%3Cstop offset='1' stop-color='%236ED200'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear_382_20631' x1='0.277771' y1='0' x2='0.277771' y2='3.2' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23BFFF78'/%3E%3Cstop offset='1' stop-color='%236ED200'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint3_linear_382_20631' x1='0.277773' y1='0' x2='0.277773' y2='3.2' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23BFFF78'/%3E%3Cstop offset='1' stop-color='%236ED200'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint4_linear_382_20631' x1='0.277775' y1='0' x2='0.277775' y2='3.2' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23BFFF78'/%3E%3Cstop offset='1' stop-color='%236ED200'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint5_linear_382_20631' x1='0.277776' y1='0' x2='0.277776' y2='3.2' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23BFFF78'/%3E%3Cstop offset='1' stop-color='%236ED200'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_382_20631'%3E%3Crect width='14' height='18' fill='white' transform='translate(7.99992 6)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
      }



    }
  }
`



export const TreeService = styled.div`
  padding-bottom: 60px;
  padding-top: 60px;
  h1{
    font-size: 32px;
    font-weight: 700;
    color:#141414;
    text-align: center;
    @media(max-width: 991px){
      font-size: 28px;
    }
    @media(max-width: 768px) {
      font-size: 26px;
    }
  }
  
  .tree-block{
    margin-top: 40px;
    @media(max-width: 991px) {
      margin-top: 120px;
      padding: 0 20px;
    }
    .logo-id{
      padding: 30px 50px 30px 50px;
      background-color: #806EFF;
      border-radius: 20px;
      margin: 0 auto;
      width: 240px;
      @media(max-width: 991px) {
        padding: 25px 35px 25px 35px;
        width: 185px;
      }
      @media(max-width: 768px) {
        padding: 20px 25px;
        width: 150px;
      }
      img{
        width: 100%;
        margin: 0 auto;
      }
    }
    
    .tree-block-elem{
      display: flex;
      justify-content: center;
      img {
        @media(max-width: 991px) {
          width: 85%;
        }
      }
    }
  }
`


export const ParallaxSection = styled.div`
  
  
  .block_hide_gradient{
    width: 37%;
    left: auto;
    position: fixed;
    height: calc(74vh - 240px + 60px);
    background: linear-gradient( 0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 70%, rgba(255,255,255,0) 100% );
    top:450px;
  }


  .parallax-container{
    position: relative;
    padding: 50px 0px;
   


    .phone-block{
      height: 500px;
      display: flex;
      right: 0;
      top: 90px;
      justify-content: center;
      transition: transform .6s ease;
      
      &.monitor-block {
        @media(max-width: 576px) {
          height: 300px;
        }
      }
      
      &.fade-up{
        transform: translateY(10px);
      }
      &.fade-down{
        transform: translateY(800px);
      }
      .phone-border{
        width: 230px;
        height: 500px;
        @media(max-width: 991px) {
          width: 200px;
          height: 420px;
        }
        
        & .desctop-monitor {
          top:40px;
        }
        
        &.monitor {
          @media(max-width: 576px) {
            width: 100% !important;
          }
        }
       
        video{
          position: absolute;
          width:100%;
          height:100%;
          opacity: 0;
          object-fit: cover;
          border: 5px solid #D2C7FF;
          border-radius: 23px;
          box-shadow:  7px 19px 39px rgba(143, 115, 255, 0.1);

          &.active{
            opacity: 1;
          }
        }
      }
    }

    #parallax-wrap{
      z-index: 3;
      
      @media(max-width: 991px){
        margin-top: 50px;
      }

      .description-verification{
        height: 500px;
        padding-top: 50px;
        
        @media(max-width: 991px) {
         height: auto;
          padding-top: 20px!important;
          
          .phone-block{
            margin-top: 40px;
          }
        }
        .text-block{
          h2{
            color:#141414;
            font-size: 32px;
            font-weight: 700;
            @media(max-width: 991px){
              font-size: 28px;
            }
            @media(max-width: 768px) {
              font-size: 26px;
            }
          }

          p{
            margin-top: 42px;
            margin-bottom: 0;
            font-size: 18px;
            font-weight: 400;
            color: rgba(20, 20, 20, 0.7);
            @media(max-width: 991px) {
              font-size: 16px;
              margin-top: 35px;
            }
            @media(max-width: 768px) {
              font-size: 14px;
              margin-top: 25px;
            }
          }
        }
      }

    }






  }
`

export const SectionBanner = styled.section`
    position: relative;
    & .top-banner{
      height: 700px;
      background-color: #8F73FF;
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
          transform: translateX(-50%) rotate(-90deg);
          top: -20px;
        }
        .icon-round:nth-child(2){
          position:absolute;
          left: 11%;
          top: 14%;
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
          top: 14%;
          transform: rotate(90deg);
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
          transform: rotate(270deg);
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
          transform: rotate(275deg);
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
          transform: translateX(-50%) rotate(-90deg);
          top: 98.4%;
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
          top: 84.7%;
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
          transform: translateX(-50%) rotate(180deg);
          top: 86%;
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
          top: 13%;
          @media(max-width:620px){
            top:23px;
          }
        }
        .icon-round:nth-child(3){
          position:absolute;
          right: 11%;
          top: 13%;
          transform: rotate(90deg);
         
          @media(max-width:620px){
            top:23px;
          }
        }
        .icon-round:nth-child(4){
          position:absolute;
          left: -2%;
          top: 50%;
          transform: rotate(-90deg);
          @media(max-width:620px){
            left:-16px;
            top: 132px;
          }
        }
        .icon-round:nth-child(5){
          position:absolute;
          right: -2%;
          top: 50%;
          transform: rotate(-90deg);
          @media(max-width:620px){
            right:-16px;
            top:112px;
          }
        }
        .icon-round:nth-child(6){
          position:absolute;
          left: 50%;
          transform: translateX(-50%) rotate(-90deg);
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
          left: 17%;
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
          transform: translateX(-50%) rotate(185deg);
          top: 86%;
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
  .video-block {
    @media(max-width: 576px) {
      position: relative;
      height: 80px;
      margin: 0 13px;
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
        @media(max-width: 576px) {
          width: 70px;
          height: 70px;
        }
      }
      &.hide{
        opacity: 0;
      }
    }
    
    
    .video-wrap{
      overflow: hidden;
      width: 920px;
      height: 525px;
      border: 8px solid #D2C7FF;
      border-radius: 40px;
      margin: -205px auto 0;
      background: white;
      position: relative;
      transition: transform .6s;
      transform: scale(1);
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
        margin: -220px auto 0;
      }
      @media (max-width: 576px){
        height: 220px;
        position: absolute;
        margin: 0 auto;
        left: 0;
        right: 0;
        top: -205px;
      }
      &.video-scale-start{
        transform: scale(1.2);
        margin-bottom: 60px;
        @media(max-width: 620px){
          transform: scale(1.1);
        }
      }

      &.video-scale-end{
        transform: scale(1)!important;
        margin-bottom: 0px;
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
  .block-example{
    .img-example{
      border-radius: 20px;
      border:5px solid #FBDDD5;
      height: 400px;
      overflow: hidden;
      margin-bottom: 36px;
      
      & img{
        width:100%;
        height:100%;
        object-fit: contain;
      }
    }
    &>p{
      font-size: 18px;
      text-align: center;
    }
  }
  
    .ant-modal-content{
      border-radius: 16px;

      

      .ant-modal-close{
        top: 5px;
        right: 15px;
      }
      .ant-modal-header{
        border-radius: 16px 16px 0 0;
        padding: 26px 0 22px 30px!important;
        p{
          font-size: 20px;
          span{
            &:first-child{
              color:#141414;
            }
            &:last-child{
              color:#C2C2C2;
            }
          }
        }
        .ant-modal-title{
          font-size: 20px;
          color :#141414;
        }
      }
      .ant-modal-body{
        padding: 24px 30px;

        .icon-tooltip{
          position: absolute;
          right: 15px;
          top: 41px;
        }
        
        .ant-form-item-label {
          padding: 0;
        }
        
        .ant-input-textarea {
          &::after {
            margin-top: 5px;
          }
        }

       

        .ant-checkbox-checked::after{
          border: 1px solid #EA5430!important;
        }
        .ant-checkbox-checked .ant-checkbox-inner{
          background-color: #EA5430!important;
          border: none;
          width: 20px;
          height: 20px;
          &::after{
            border: none;
            transform: none;
            top: 18%;
            width: 11px;
            height: 13px;
            background-image: url("data:image/svg+xml,%3Csvg fill='%23fff' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' width='11px' height='13px' viewBox='0 0 122.877 101.052' enable-background='new 0 0 122.877 101.052' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M4.43,63.63c-2.869-2.755-4.352-6.42-4.427-10.11c-0.074-3.689,1.261-7.412,4.015-10.281 c2.752-2.867,6.417-4.351,10.106-4.425c3.691-0.076,7.412,1.255,10.283,4.012l24.787,23.851L98.543,3.989l1.768,1.349l-1.77-1.355 c0.141-0.183,0.301-0.339,0.479-0.466c2.936-2.543,6.621-3.691,10.223-3.495V0.018l0.176,0.016c3.623,0.24,7.162,1.85,9.775,4.766 c2.658,2.965,3.863,6.731,3.662,10.412h0.004l-0.016,0.176c-0.236,3.558-1.791,7.035-4.609,9.632l-59.224,72.09l0.004,0.004 c-0.111,0.141-0.236,0.262-0.372,0.368c-2.773,2.435-6.275,3.629-9.757,3.569c-3.511-0.061-7.015-1.396-9.741-4.016L4.43,63.63 L4.43,63.63z'/%3E%3C/g%3E%3C/svg%3E");
          }
        }
        
        .block-chek-list{
          .ant-checkbox-group{
            flex-direction: column;
            display: flex;
            padding: 20px;
            border-radius: 10px;
            border:1px solid #EAECF0;
          }
        }
        
        .block-row-connects{
          margin-top: 15px;
          align-items: center;
          margin-bottom:40px;
          &>p{
            font-size: 15px;
            margin-right: 14px;
            margin-bottom: 0;
          }
          &>div{
            @media(max-width: 460px){
              margin-top:15px;
            }
          }
          .item-list-connect{
            border: 1px solid #D4E7FF;
            border-radius: 30px;
            padding: 3px 20px;
            font-size: 16px;
            margin-right:8px;
            
          }
        }
        
        label{
          font-size: 16px;
          margin-bottom: 8px;
          align-items: flex-start;
          color: #141414;
          &::before{
            line-height: inherit;
          }
          &:hover .ant-checkbox-inner {
            border-color: #D0D5DD;
          }
          .ant-checkbox-inner {
            width: 20px;
            height: 20px;
          }
        }
        
        input, textarea{
          border: 1px solid #EAECF0;
          border-radius: 4.8px;
          padding: 8px 16px;
          font-weight: 400;
          font-size: 14px;
          color: #141414;
          &::placeholder{
            font-size: 14px;
            color: #6C757D;
          }
        }
        
        input:focus , textarea:focus {
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 3px #F8F8FF;
          border: 1px solid #BCABFF;
        }
        
        textarea{
          resize: none;
        }
        
        button{
          padding: 14px 0;
          width: 270px;
          color: #fff;
          border-radius: 8px;
          background: #6CCB03;
          border:none;
          font-weight: 600;
          outline: none;
          &:hover:not(:disabled){
            background: #5FB600;
            box-shadow: 0px 5px 8px rgba(101, 193, 0, 0.2), 0px 0px 8px rgba(101, 193, 0, 0.06);
          }
          &:disabled{
            opacity: .3;
          }
        }
      }
    }
`

export const ButtonChat = styled.div`
  right: 100px; 
  bottom: 40px; 
  z-index:999; 
  cursor:pointer;
  @media(max-width: 768px){
    width: 60px;
    height: 60px;
    right: 50px;
    & svg{
      width:100%;
      height:100%;
    }
  }

  @media(max-width: 500px){
    right: 20px;
  }
`

export const SectionDemo = styled.section`
  padding-top: 60px;
  padding-bottom: 190px;
  @media(max-width: 576px) {
    padding-top: 30px;
    padding-bottom: 30px;
  }
    .demo {
      justify-content: space-between;
      &__info {
        @media(max-width: 576px) {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        h2 {
          font-weight: 700;
          font-size: 32px;
          color: #141414;
          margin-bottom: 40px;
          @media(max-width: 991px) {
            font-size: 28px;
            margin-bottom: 30px;
          }
          @media(max-width: 768px) {
            font-size: 26px;
            margin-bottom: 20px;
          }
          @media (max-width: 576px) {
            margin-bottom: 15px;
          }
        }
        p {
          font-weight: 400;
          font-size: 18px;
          color: rgba(20, 20, 20, 0.7);
          margin-bottom: 30px;
          @media(max-width: 991px) {
            font-size: 16px;
            margin-bottom: 25px;
          }
          @media (max-width: 768px) {
            font-size: 14px;
            margin-bottom: 18px;
          }
          @media (max-width: 576px) {
            text-align: center;
          }
        }
        &_menu {
          margin-bottom: 60px;
          display: flex;
          @media(max-width: 991px) {
            display: flex;
            justify-content: space-between;
            margin-bottom: 45px;
          }
          @media (max-width: 768px) {
            margin-bottom: 30px;
          }
          @media (max-width: 576px) {
            width: 100%;
            justify-content: space-evenly;
            margin-bottom: 20px;
          }
          button {
            border-radius: 12px;
            padding: 14px 16px 14px 18px;
            border: 1px solid #E9E9E9;
            mix-blend-mode: luminosity;
            background: transparent;
            font-weight: 500;
            font-size: 18px;
            opacity: 0.8;
            color: rgba(20, 20, 20, 0.7);
            display: flex;
            align-items: center;
            @media(max-width: 991px) {
              padding: 10px;
              font-size: 16px;
            }
            @media (max-width: 768px) {
              padding: 7px;
              font-size: 14px;
            }
            svg {
              margin-right: 8px;
              @media(max-width: 991px) {
                margin-right: 6px;
                width: 25px;
                height: 25px;
              }
              @media (max-width: 768px) {
                width: 20px;
                height: 20px;
              }
            }
            &:first-child {
              margin-right: 24px;
              @media(max-width: 991px) {
                margin-right: 0;
              }
            }
          }
          button.active {
            box-shadow: 0px 5px 8px rgba(140, 113, 239, 0.1), 0px 0px 8px rgba(140, 113, 239, 0.06);
            border-radius: 12px;
            padding: 14px 16px 14px 18px;
            border: 1px solid #8F73FF;
            background: transparent;
            font-weight: 500;
            font-size: 18px;
            mix-blend-mode: initial;
            color: rgba(20, 20, 20, 0.7);
            filter: none;
            @media(max-width: 991px) {
              padding: 10px;
              font-size: 16px;
            }
            @media (max-width: 768px) {
              padding: 7px;
              font-size: 14px;
            }
            svg {
              margin-right: 8px;
              @media(max-width: 991px) {
                width: 25px;
                height: 25px;
                margin-right: 6px;
              }
              @media (max-width: 768px) {
                width: 20px;
                height: 20px;
              }
            }
            &:first-child {
              margin-right: 24px;
              @media(max-width: 991px) {
                margin-right: 0;
              }
            }
          }
        }
        &_btn {
          width: 270px;
          display: flex;
          @media(max-width: 991px) {
            width: 220px;
          }
          @media (max-width: 768px) {
            width: 150px;
            margin: 0 auto;
          }
          button,a {
            background: #6CCB03;
            border-radius: 5px;
            font-weight: 600;
            font-size: 16px;
            color: white;
            padding: 15px 0;
            width: 100%;
            border: none;
            outline: none;
            text-decoration: none;
            text-align: center;
            @media(max-width: 991px) {
              font-size: 14px;
              padding: 13px 0;
            }
            @media (max-width: 768px) {
              font-size: 12px;
              padding: 9px 0;
            }
            &:hover {
              background: #5FB600;
              box-shadow: 0px 5px 8px rgba(101, 193, 0, 0.2), 0px 0px 8px rgba(101, 193, 0, 0.06);
            }
          }
        }
      }
      
      &__img {
        @media(max-width: 991px) {
          align-items: center;
        }
        @media(max-width: 576px) {
          justify-content: center!important;
        }
      }
      
      &__img1 {
        width: 487px;
        height: 310px;
        filter: drop-shadow(7px 19px 39px rgba(143, 115, 255, 0.1));
        padding: 0;
        margin: 0;
        @media (max-width: 991px) {
          width: 85%;
          height: 70%;
        }
        @media (max-width: 768px) {
          width: 90%;
        }
        @media(max-width: 576px) {
          width: 65%;
          height: 100%;
        }
        img {
          width: 100%;
          height: 100%;
          border: 5px solid #D2C7FF;
          border-radius: 10px;
        }
      }
      &__img2 {
        width: 230px;
        height: 500px;
        filter: drop-shadow(7px 19px 39px rgba(143, 115, 255, 0.1));
        padding: 0;
        margin: 0;
        position: absolute;
        top: -65px;
        @media(max-width: 991px) {
          position: initial;
          width: 40%;
          height: 100%;
        }
        @media (max-width: 768px) {
          width: 54%;
        }
        @media(max-width: 576px) {
          width: 30%;
        }
        img {
          width: 100%;
          height: 100%;
          border: 5px solid #D2C7FF;
          border-radius: 10px;
        }
      }
    }
`

export const DecreeSection = styled.section `
  padding-top: 60px;
  padding-bottom: 60px;
  @media(max-width: 768px) {
    padding-top: 30px;
    padding-bottom: 30px;
  }
    h1 {
      font-weight: 700;
      font-size: 32px;
      text-align: center;
      color: #141414;
      margin-bottom: 45px;
      @media(max-width: 991px) {
        font-size: 28px;
        margin-bottom: 35px;
      }
    }
  .decree {
    &__img {
      @media(max-width: 768px){
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }
      &>div {
        width: 530px;
        height: 360px;
        @media(max-width: 991px){
          width: 100%;
          height: 100%;
        }
        @media(max-width: 768px){
          width: 75%;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    &__request {
      .text {
        font-weight: 400;
        font-size: 18px;
        color: rgba(20, 20, 20, 0.7);
        @media(max-width: 991px){
          font-size: 16px;
        }
        @media(max-width: 768px){
          text-align: center;
        }
        @media(max-width: 576px) {
          font-size: 14px;
        }
        a {
          color: #8F73FF;
        }
        &:first-child {
          margin-bottom: 20px;
        }
      }
    }
  }
`

export const CalculationSection = styled.section `
  padding-top: 60px;
  padding-bottom: 60px;
  @media(max-width: 768px){
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .calculation {
    height: 400px;
    @media(max-width: 768px){
      height: auto;
    }
    &__price{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      @media(max-width: 768px){
        margin-bottom: 50px;
      }
      .price__zero {
        font-weight: 700;
        font-size: 200px;
        color: #8F73FF;
        display: flex;
        line-height: 155px;
        margin-bottom: 40px;
        @media(max-width: 991px) {
          font-size: 160px;
          line-height: 135px;
          margin-bottom: 30px;
        }
        @media(max-width: 768px){
          font-size: 130px;
          line-height: 110px;
          margin-bottom: 15px;
        }
        span {
          font-weight: 700;
          font-size: 50px;
          color: #141414;
          line-height: 40px;
          @media(max-width: 991px) {
            font-size: 40px;
          }
          @media(max-width: 768px){
            font-size: 24px;
          }
        }
      }
      .price__free {
        font-weight: 400;
        font-size: 22px;
        color: rgba(20, 20, 20, 0.7);
        text-align: center;
        margin-right: 90px;
        @media(max-width: 991px) {
          font-size: 18px;
          margin-right: 55px;
        }
        @media(max-width: 768px){
          font-size: 16px;
          margin-right: 35px;
        }
      }
    }
    &__line {
      position: absolute;
      height: 100%;
      width: 2px;
      background: #1D1D1D;
      opacity: 0.1;
      border-radius: 2px;
      padding: 0;
      margin: 0;
      right: 50%;
      @media(max-width: 768px){
        transform: rotate(90deg);
      }
      @media(max-width: 768px){
        bottom: 15px;
      }
    }
    &__desc {
      display: flex;
      justify-content: center;
      @media(max-width: 768px){
        margin-bottom: 10px;
      }
      &_info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .info__item {
          display: flex;
          &:first-child {
            margin-bottom: 85px;
            @media(max-width: 768px){
              margin-bottom: 35px;
            }
          }
          .item__img {
            width: 60px;
            height: 60px;
            margin-right: 40px;
            @media(max-width: 991px) {
              width: 45px;
              height: 45px;
              margin-right: 25px;
            }
            @media(max-width: 768px){
              width: 25px;
              height: 25px;
              margin-right: 15px;
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .item__desc {
            &>div {
              font-weight: 400;
              font-size: 22px;
              color: rgba(20, 20, 20, 0.7);
              @media(max-width: 991px) {
                font-size: 18px;
              }
              @media(max-width: 768px){
                font-size: 16px;
              }
            }
            p {
              font-weight: 700;
              font-size: 30px;
              color: #141414;
              margin-bottom: 0;
              @media(max-width: 991px) {
                font-size: 28px;
              }
              @media(max-width: 768px){
                font-size: 24px;
              }
              span {
                font-size: 22px;
                font-weight: 400;
                color: #5A5A5A;
                @media(max-width: 991px) {
                  font-size: 18px;
                }
                @media(max-width: 768px){
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
`

export const SectionBenefit = styled.section `
  padding-bottom: 60px;
  padding-top: 60px;
  @media(max-width: 991px){
    padding-top: 30px;
    padding-bottom: 30px;
  }
  h1 {
    font-weight: 700;
    font-size: 32px;
    text-align: center;
    color: #141414;
    margin-bottom: 40px;
    @media(max-width: 991px) {
      font-size: 28px;
      margin-bottom: 30px;
    }
    @media(max-width: 576px){
      font-size: 24px;
    }
  }
  .benefit {
    justify-content: center;
    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 60px;
      @media(max-width: 768px){
        margin-bottom: 35px;
      }
      &_img {
        width: 50px;
        height: 50px;
        margin-bottom: 16px;
        @media(max-width: 991px){
          width: 40px;
          height: 40px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      p {
        font-weight: 600;
        font-size: 20px;
        color: #141414;
        margin-bottom: 6px;
        @media(max-width: 991px){
          font-size: 18px;
        }
      }
      span {
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        color: #141414;
        opacity: .7;
        width: 265px;
        @media(max-width: 991px){
          font-size: 14px;
        }
      }
    }
  }
`

export const SectionWithUs = styled.section `
  padding: 30px 0;
  @media (max-width: 576px) {
    padding: 15px 0;
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
      width: 400px;
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
        font-weight: 400;
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
      color: #8F73FF;
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
    .images {
      display: flex;
      justify-content: flex-end;
      margin-top: 45px;
      &__phone {
        width: 403px;
        height: 500px;
        @media(max-width: 1200px){
          width: 380px;
          height: 470px;
        }
        @media(max-width: 991px){
          width: 100%;
          height: 365px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    .message {
      padding: 11px 16px 11px 14px;
      box-shadow: 0px 5px 8px rgba(140, 113, 239, 0.1), 0px 0px 8px rgba(140, 113, 239, 0.06);
      border-radius: 14px;
      background: #ffffff;
      outline: none;
      border: none;
      display: flex;
      align-items: center;
      position: absolute;
      top: 17%;
      left: 4%;
      @media(max-width: 1200px){
        padding: 8px 13px 8px 11px;
        top: 19%;
      }
      @media(max-width: 991px){
        padding: 5px 10px 5px 8px;
      }
      &__img {
        width: 70px;
        height: 62px;
        margin-right: 10px;
        @media(max-width: 1200px){
          width: 50px;
          height: 44px;
        }
        @media(max-width: 991px){
          width: 35px;
          height: 30px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &__text {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        p {
          font-weight: 600;
          font-size: 18px;
          color: #8A2943;
          margin-bottom: 2px;
          @media(max-width: 1200px){
            font-size: 16px;
          }
          @media(max-width: 991px){
            font-size: 14px;
          }
        }
        span {
          font-weight: 500;
          font-size: 14px;
          color: rgba(20, 20, 20, 0.9);
          opacity: 0.7;
          @media(max-width: 1200px){
            font-size: 12px;
          }
          @media(max-width: 991px){
            font-size: 10px;
          }
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
          filter: drop-shadow(0px 5px 8px rgba(140, 113, 239, 0.1)) drop-shadow(0px 0px 8px rgba(140, 113, 239, 0.06));
          box-shadow: none;
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

export const Proccess = styled.section`
  padding: 60px 0 70px;
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
        padding: 30px 63px 50px;
        display: flex;
        flex-direction: column;
        font-weight: 600;
        font-size: 20px;
        text-align: center;
        color: #141414;
        text-decoration: none;
        &:hover {
          box-shadow: 0px 5px 8px rgba(140, 113, 239, 0.1), 0px 0px 8px rgba(140, 113, 239, 0.06);
        }
        span {
          opacity: 0.7;
        }
        @media(max-width: 1200px) {
          padding: 30px 40px 40px;
          align-items: center;
        }
        @media (max-width: 991px){
          padding: 20px 25px 30px;
        }
        @media(max-width: 768px) {
          padding: 15px 20px 20px;
          font-size: 18px;
        }
        @media(max-width: 576px) {
          align-items: center;
          font-size: 18px;
          padding: 15px 20px 25px;
        }
      }
      &_img {
        width: 225px;
        height: 220px;
        margin-top: 42px;
        @media(max-width: 1200px) {
          width: 200px;
          height: 200px;
        }
        @media (max-width: 991px) {
          margin-top: 30px;
        }

        @media(max-width: 768px) {
          width: 200px;
          height: 200px;
        }
        @media(max-width: 576px) {
          width: 150px;
          height: 150px;
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

export const EdditionalServices = styled.section `
  padding: 60px 0 68px;
  background: #141414;
  @media(max-width: 991px){
    padding: 30px 0;
  }
  //.mt-block:last-child a{
  //  background: #7B65FF;
  //  &:hover {
  //    background: #8A77FF;
  //  }
  //}
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
      --bs-gutter-x:0rem;
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
      font-size: 16px;
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
