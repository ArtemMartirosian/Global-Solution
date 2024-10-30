import styled from "styled-components";
import {Modal, Col} from "antd";


export const SuccessAlert = styled(Col)`
  text-align: center;
  padding: 60px 0;
  margin: 0 auto;
  &>div{
    margin-top:60px;
    margin-bottom:60px;
    h1{
      font-size: 40px;
      font-weight: 700;
      @media (max-width: 991px){
        font-size: 36px;
      }
    }
    
    p{
      color: #728095;
      font-size:20px;
      width: 680px;
      margin: 14px auto;
      @media (max-width: 991px){
        width: 100%;
        font-size: 16px;
      }
    }
  }

  a{
    padding: 12px 20px;
    background-color: #18406D;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;
    text-decoration: none;
    @media (max-width: 991px){
      font-size: 14px;
    }
  }
`


export const ModalAlert = styled(Modal)`
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
  .ant-modal-content {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    padding: 40px 30px;
   

    .ant-modal-close {
      display: none;
    }

    .ant-modal-body {
      text-align: center;
      min-height: 250px;

      h3 {
        margin-top: 28px;
        font-size: 26px;
      }

      p {
        font-size: 18px;
        margin-top: 12px;
        color: rgba(20, 20, 20, 0.7);
      }
    }

    .ant-modal-footer {
      border-top: none;
      text-align: center;

      button {
        border-radius: 8px;
        padding: 12px 20px;
        height: auto;
        font-size: 12px;
        font-weight: 600;

        &:first-child {
          border: 1px solid #D0D5DD;
          color: #18406D;
          margin-right: 24px;
        }

        &:last-child {
          border: 1px solid #18406D;
          background-color: #18406D;
          color: #fff;
        }
      }
    }
  }

`

export const SectionMap = styled.section`
  padding-top: 60px;
  padding-bottom: 60px;
  
  
  
  h2{
    margin-bottom: 60px;
    font-size: 36px;
    font-weight: 600;
  }
  
  .address-container{
    position: relative;
    padding-left: 24px;
    transition: all .3s ease;
    &:before{
      content: '';
      width:4px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #D0D5DD;
      z-index: 3;
    }
    &:after{
      content: '';
      width:4px;
      height: 50%;
      position: absolute;
      left: 0;
      background-color: #0D3664;
      z-index: 9;
      
    }
    &.address-main:after{
      top: 0;
      transition: all .3s ease;
    }
    &.address-second:after{
      bottom: 0;
      transition: all .3s ease;
    }
    .address-item{
      margin-bottom: 20px;
      padding: 16px 0;
      cursor: pointer;
      
      p{
        font-size: 16px;
        margin-bottom: 0;
       a{
         color: #0D3664;
         text-decoration: none;
         font-weight: 500;
       }
        &.title{
          color: #475467;
          margin-top: 8px;
          margin-bottom: 8px;
        }
      }
    }
  }
`

export const SectionContacts = styled.section`
  padding-top: 60px;
  padding-bottom: 60px;
  .file_upload{
    &>p{
      font-size: 14px;
      color:#475467;
      font-weight: 400;
      margin-top:6px;
    }
  }
  .ant-upload-drag{
    border: none;
    border-radius: 16px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23CFCFCFFF' stroke-width='2' stroke-dasharray='10%2c 16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    background-color: #fff;
    p{
      font-size: 14px;
      color: #565D63;
      margin-top: 17px;
    }
    .btn-upload{
      background-color: #EEF6FE;
      color: #225A89;
      width: 145px;
      font-size: 14px;
      font-weight: 500;
      margin:25px auto 0;
      padding: 10px 15px;
      border-radius: 6px;
    }
  }
  
  .ant-upload-list-item-card-actions-btn{
    background-color: transparent!important;
    width: 24px!important;
    height: 24px!important;
    border-radius: 0!important;
    border:none!important;
    color: rgba(0, 0, 0, 0.85)!important;
    padding:0!important;
  }

    .info-contacts{
      & > div{
        flex-wrap: nowrap;
        margin-bottom: 30px;
      }
      .icon-inf{
        width: 48px;
        height: 48px;
        margin-bottom: 16px;
        border-radius: 50% !important;
        background-color: #eff5fd !important;
        text-align: center;
        i{
          line-height: 48px !important;
          font-size: 18px;
          color: #0d3664!important;
          @media (max-width: 468px){
            font-size: .9rem;
          }
        }
               
      }
      .text-inf{
        padding-left: 15px;
        h6{
          font-weight: 600;
          color: #031C3A;
          font-size: 16px;
          margin-bottom: 6px;
          @media (max-width: 468px){
            font-size: .9rem;
          }
        }
        p{
          margin-bottom: 0;
          font-weight: 500;
          font-size: 16px;
          color: rgba(33, 37, 41, 0.7);
          @media (max-width: 468px){
            font-size: .9rem;
          }
        }
      }
    }
  
  .feedback-form{
    padding: 60px 0;
    h2{
      font-size: 36px;
      margin-bottom: 60px;
    }
    form{
      .ant-select-selection-item{
        top:-3px!important;
      }
      .ant-select-arrow{
        width: 20px;
        height: 20px;
        top:45%;
      }
      label{
        color:#344054!important;
        font-weight: 500;
        font-size: 14px;
        span{
          font-weight: 400!important;
          color: #667085;
        }
      }
      & > div{
        padding: 0px 10px;
        
        & input, textarea, .ant-select-selector{
          height: calc(1.5em + 1.2rem + 2px);
          padding: 0.6rem 0.9rem;
          padding-right: 30px;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          color: #495057;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
        }
        
        label{
          font-weight: bold;
        }

        textarea{
          height: 100px;
          resize: none;
        }
        
        button{
          &:disabled{
            background-color: rgba(16, 24, 40, 0.05)!important;
            border-color: rgba(16, 24, 40, 0.05)!important;
            &:hover{
              background-color: rgba(16, 24, 40, 0.05)!important;
              color: #fff;
            }
          }
        
          color: #fff;
          background-color: #0d3664;
          border: 1px solid #071e37;
          font-weight: 600;
          text-align: center;
          padding: 0.6rem 0.9rem;
          height: 50px;
          font-size: 1rem;
          border-radius: 0.25rem;
          transition: .3s;
          &:hover{
            background-color:  #092442;
          }
        }
      }
    }
  }
`

