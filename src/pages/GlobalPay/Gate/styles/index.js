import styled from "styled-components";


export const MainDiv = styled.main`
  
  @media (min-width: 1920px){
    .container-fluid{
      max-width: 1720px;
    }
  }
  
   & > section{
     padding-top: 50px;
     padding-bottom: 50px;
   
     @media (max-width: 991px){
       flex-direction: column;
     }

     @media (max-width: 468px){
       padding-top: 20px;
       padding-bottom: 20px;
     }
   }
  & img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  p{
    color: #141414;
    font-size: 16px;
    opacity: .7;
    //@media (max-width: 468px){
    //  font-size: 20px;
    //}
  }
  h2{
    margin-bottom: 46px;
    font-weight: bold;
    text-align: left;

    @media (min-width: 1800px){
      font-size: 48px;

    }

    @media (max-width: 991px){
      text-align: center;
    }
    @media (max-width: 768px){
      font-size: .9rem!important;
    }
  }
  h1{
    margin-bottom: 46px;
    font-weight: bold;
    text-align: left;
    font-size: 32px;
    
    //@media (min-width: 1800px){
    //  font-size: 56px;
    //  
    //}
    
    @media (max-width: 768px){
      font-size: 28px!important;
    }
  }
  .pl-30{
    padding-left:30px;
    @media (max-width: 991px){
      padding-left:0px;
    }
  }
  
  .pr-30{
    padding-right:30px;
    @media (max-width: 991px){
      padding-right:0px;
    }
  }
  
  .mt-md-30{
    @media (max-width: 991px){
      margin-top: 30px;
    }
  }

  .mb-md-30{
    @media (max-width: 991px){
      margin-bottom: 30px;
    }
  }
  
  
  
  .block_row_images{
    margin-top: 230px;
    justify-content: center;
    @media (max-width: 991px){
      margin-top: 50px;
      flex-direction: column;
    }
        
    .text_info{
      position: relative;
      font-size: 16px;
      //@media (min-width: 1800px){
      //  font-size: 28px;
      //}
      &:after{
        content: '';
        width: 25px;
        height: 25px;
        position: absolute;
        right: -5px;
        bottom: 0;
        border-radius: 50%;
        background-image: url(/images/illustrations/question.svg);
        background-position: center;
        background-size: cover;
      }
    }
    
    & .block_content_text{
      padding: 0px 20px;
      position: relative;
      & > div{
        @media (max-width: 991px){
          text-align: center;
        }
      }
      & svg{
        width: 100%;
        height: 100%;
        @media (max-width: 991px){
          width: 200px;
          margin: 0 auto;
        }
      }
      @media (max-width: 991px){
        padding-bottom: 70px;
      }
      &:last-child::after{
        content: '';
        display: none;
      }
      
     
     
      &:after{
        content: '';
        width: 27px;
        height: 27px;
        position: absolute;
        background-image: url("/images/illustrations/Vector.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border-radius: 50%;
        right: -25px;
        top: 30%;
        z-index: 3;
        opacity: 0;
        @media (max-width: 991px){
          width: 35px;
          height: 35px;
        }
      }

      &:nth-child(2):after{
        opacity: 1;
      }
      
      @media (max-width: 991px){
        &:after{
          right: 45%;
          transform: translateX(-50%) rotate(90deg);
          top: 85%;
          opacity: 1;
        }
      }
      & >div:first-child{
        height: 185px;
      }
    }
    
    
  }
  
  .block_content_image{

    height: 300px;
    
    @media (max-width: 763px){
      height: 150px;
    }
   
    &.block_image_position{
      top: 50%;
      right: -3%;
      position: absolute;
      transform: translateY(-60%);
      @media (max-width: 991px){
        position: relative;
        top: 0;
        right: 0;
        transform: translateY(0);
      }
    }
  }
  
  .block_content_text{
    
    .text_info{
      position: relative;
      text-align: center;
      padding-right: 20px;
      justify-content: center;
      &:hover + .block_info_text{
        display: block;
      }
      &:hover{
        &:after{
          background-image: url('/images/illustrations/question2.svg');
        }
      }
      
    }
 

    ul{
      padding-left: 0;
      li{
        list-style: none;
        padding-bottom: 12px;
        padding-left: 40px;
        @media (min-width: 1800px){
          padding-left: 60px;
        }
        & p{
          color: #141414;
          font-size: 16px;
          opacity: .7;
          margin: 0;
          //@media (min-width: 1800px){
          //  font-size: 24px;
          //}
          
        }
        & span{
          font-weight: bold;
          font-size: 16px;
          text-decoration: underline;
          //@media (min-width: 1800px){
          //  font-size: 24px;
          //}
         
        }
        &:nth-child(6){
          & span{
            color: #E9532F;
          }
        }
        &:nth-child(7){
          & span{
            color: #8F73FF;
          }
        }
        &.check{
          position: relative;
          @media (min-width: 1800px){
            &:before{
              width: 40px;
              height: 40px;
              margin-right: 20px;
            }
          }
          &:before{
            content: '';
            width: 30px;
            height: 30px;
            margin-right: 10px;
            display: block;
            position: absolute;
            left: 0;
            vertical-align: middle;
            opacity: 1;
            background-image: url('/images/illustrations/check.svg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;

          }
        }
      }
    }
  }
  
  .block_items_top{
    top: 20%;
    right: 19%;
    width: 35%;
    justify-content: space-between;
    
    .text_info{
      opacity: .7;
           
      &:after{
        content: '';
        right: -25px;
      }
      &:hover{
        &:after{
          background-image: url('/images/illustrations/question2.svg');
        }
      }
    }
    
    .block_info_text{
      width: 80%;
    }
    
    @media (max-width: 1280px){
      right: 16%;
      width: 40%;
    }
    @media (max-width: 991px){
      display: none!important;
    }
    .block_item{
      &:first-child{
        .block_info_text{
          left: -40%;
          bottom: auto;
          & p{
            font-size: 13px!important;
          }
        }
      }
      &:last-child{
        .block_info_text{
          right: -10%;
          left: auto;
          bottom: auto;
          & p{
            font-size: 13px!important;
          }
        }
      }
      p{
        font-size: 16px;
        padding-right: 8px;
        margin-top: 0!important;
        text-align: center;
       //@media (min-width: 1800px){
       //  font-size: 20px;
       //}
      }
      

      .text_info{
        &:hover + .block_info_text{
          display: block;
        }
        &:hover .icon-info{
          background-image: url('/images/illustrations/question2.svg');
        }

      }
      .block_img{
        width: 45px;
        height: 45px;
        margin: 0 auto;
      }
      
      .block_img_line{
        width: 45px;
        height: 205px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
        &:after{
          content: '';
          width: 27px;
          height: 27px;
          position: absolute;
          background-image: url(/images/illustrations/Vector.png);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          border-radius: 50%;
          top: 90%;
          left: -15%;
          z-index: 3;
        }
      }
    }

    .icon-info{
      right: -30px;
    }
  }
  

  .block_info_text{
    padding: 10px;
    background: #000;
    position: absolute;
    color: #fff;
    bottom: auto;
    display: none;
    border-radius: 5px;
    transition: all .3s;
    left: 0;
    width: 100%;
    z-index: 5;
   
   
    & p{
      font-size: 12px!important;
      margin: 0!important;
      color: #fff!important;
     
    }
    &:after{
      content: '';
      width: 10px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #000;
      position: absolute;
      top: -10px;
      right: 20%;

    }
  }
  
  
  
  .button_test{
    background: #E9532F;
    color:#fff;
    font-weight: 600;
    font-size: 16px;
    display: block;
    margin: 100px auto 0px;
    border: none;
    border-radius: 5px;
    padding: 14px 14px;
    width: 300px;
    //@media (min-width: 1800px){
    //  font-size: 20px;
    //}
    @media (max-width: 991px){
      margin-top: 0;
      margin-bottom: 30px;
    }
  }
  
  .block_bank_bg{
    background-image: url('/images/illustrations/bg-frame.png');
    background-size: contain;
    background-position: center;
    filter: grayscale(1);
    padding: 117px 0px;
    h1{
      font-size: 62px;
      margin-bottom: 0;
    }
  }
  
  
  .question-answer{
    margin: 0 auto;
    background: transparent!important;
    border: none;
    .ant-collapse-item{
      border: none;
      
      .ant-collapse-header{
        position: relative;
        font-size: 24px;
        @media (max-width: 763px){
          font-size: 16px;
        }
      
        &[aria-expanded='true']{
          & > div{
            transform: rotate(0deg);
          }
        }
        & > div{
          transition: .3s;
          position: absolute;
          right: 0;
          background-image: url('/images/illustrations/chewron.svg');
          transform: rotate(180deg);
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          @media (max-width: 763px){
            width: 15px;
            height: 15px;
          }
          & span{
            opacity: 0;
          }
        }
      }
      
      .ant-collapse-content{
        border: none;
        & p{
          font-size: 24px;
          opacity: .7;
          @media (max-width: 763px){
            font-size: 16px;
          }
        
        }
      }
    }
  }
  
  .form-application{
    form {
      margin: 50px auto 40px;
      & > div{
        margin-bottom: 25px;
        & > p{
          margin-bottom: 0;
          label {
            font-size: 16px;
            
          }
        }
        input{
          border: 1px solid rgba(20,20,20,.25);
          border-radius: 6px;
          padding: 10px;
          width: 100%;
          font-size: 16px;
          //@media (min-width: 1800px){
          //  font-size: 24px;
          //}
        }
      }
      
      .button-submit{
        background: linear-gradient(0deg, #E9532F, #E9532F), #FFFFFF;
        padding: 0px 27px;
        height: 50px;
        width: 100%;
        color: #fff;
        font-weight: 600;
        border: 1px solid #E9532F;
        border-radius: 5px;
        font-size: 16px;
        margin: auto;
        display: block;
       
        //@media (min-width: 1800px){
        //  font-size: 20px;
        //}
        //@media (max-width: 468px){
        //  font-size: 18px;
        //}
      }
    }
  }
  
  .block-documents{
    padding: 0;
    background: #141414;
    
    & .item-block-content{
      
      &:first-child{
        padding-right: 5px!important;
        @media (max-width: 991px){
          padding-right:0px!important;
        }
        & > div{
          padding: 40px;
          background: #fff;
          .text-block{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 145px;
          }
          & svg{
            float: right;
            width: 21px;
          }
          h1{
            font-size: 36px;
            color: #141414;
            font-weight: 600;
            margin-bottom: 15px;
          }
          p{
            color: #141414;
            font-size: 16px;
          }
        }
      }
      &:last-child{
        padding-left: 5px;
        @media (max-width: 991px){
          padding-left:0px!important;
        }
        & > div{
          padding: 40px;
          background: #E9532F;
          .text-block{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 145px;
          }
          & svg{
            float: right;
            width: 21px;
            fill: #fff;
          }
          h1{
            font-size: 36px;
            color: #fff;
            font-weight: 600;
            margin-bottom: 15px;
          }
          p{
            color: #fff;
            font-size: 16px;
          }
        }
      }
    }
    .back-contains{
      width: 100%;
      height: 100%;
      @media (max-width: 991px){
        flex-direction: column;
        & > div{
          max-width: 100%;
        }
      }
      
    }
    
    .container{
      z-index: 3;
      position: relative;
      height: 100%;
      padding-top: 70px;
      padding-bottom: 70px;
      @media (max-width: 991px){
        & > div{
          padding: 15px 0px!important;
        }
      }
      & button{
        font-size: 16px;
        padding: 21px 38px;
        border-radius: 5px;
        font-weight: bold;
        //@media (min-width: 1800px){
        //  font-size: 20px;
        //}
        //@media (max-width: 468px){
        //  font-size: 18px;
        //}
      }
      & .text-block{
        margin-bottom: 30px;
        //& > h2{
        //  margin-bottom: 15px;
        //  color: #fff;
        //}
        //& > p{
        //  color: #fff;
        //}
      }
      & .item-block-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        button{
          width: 258px;
        }
        @media (max-width: 991px){
          h2{
            text-align: left;
          }
        }
        &:first-child{
          & button{
            background: #E9532F;
            border: none;
            color: #fff;
            font-size: 16px;

            //@media (min-width: 1800px){
            //  font-size: 20px;
            //}
            //@media (max-width: 468px){
            //  font-size: 18px;
            //}

          }

        }
        &:last-child{
          
          & button{
            background: #fff;
            border: 2px solid #141414;
            color: #141414;
            font-size: 16px;

            //@media (min-width: 1800px){
            //  font-size: 20px;
            //}
            //@media (max-width: 468px){
            //  font-size: 18px;
            //}
          }
          
        }
      }
    }
   
  }
`

export const PopUpDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  top: 0;
  left: 0;
  z-index: 9999;
  display: none;
  overflow-y: scroll;
  &.show{
    display: block;
  }
  
  .close-form{
    position: absolute;
    right: 6%;
    top: 5%;
    z-index: 2;
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    outline: none;
  }
  
  .popUp-wrap{
    padding: 90px 15px;
    background: #fff;
    margin: 20px auto;
    
    h1{
      margin: 0 auto;
    }
    
    .checkbox-group{
      justify-content: center;
      padding: 30px 0px;
      @media (max-width: 763px){
        justify-content: flex-start;
        flex-direction: column;
      }
      label{
        color: #141414;
        font-weight: 500;
        font-size: 16px;
        opacity: 0.7;
        @media (max-width: 763px){
          padding: 10px 0px;
          margin: 0;
        }
      }
      .ant-checkbox-inner {
        border: 2px solid #d9d9d9;
        border-radius: 1px;
      }
      .ant-checkbox-checked .ant-checkbox-inner{
        background: #E9532F;
        border-color: #E9532F;
      }

      .ant-checkbox-checked::after{
        border-color: #E9532F;
      }
    }
    
    & > div{
      margin: 0 auto;
    }
    @media (max-width: 768px){
      margin: 0 auto;
    }
    
    form{
      width: 50%;
      margin: 0 auto;
      @media (max-width: 768px){
        width: 90%;
      }

      label {
        font-size: 16px;
        color: #4a4a4a;
        opacity: .7;
      }
      
      & input{
        border: 1px solid rgba(20,20,20,.25);
        border-radius: 6px;
        padding: 10px;
        width: 100%;
        font-size: 16px;
        //@media (min-width: 1800px){
        //  font-size: 24px;
        //}
      }
      
      button{
        width: 100%;
        height: 50px;
        font-weight: bold;
        font-size: 16px;
        background: #E9532F;
        border: 1px solid #E9532F;
        border-radius: 5px;
        color: #fff;
        //@media (min-width: 1800px){
        //  font-size: 24px;
        //}
      }
    }
    
  }
`


export const ButtonChat = styled.button`
  width: 88px;
  height: 88px;
  background: #000;
  border-radius: 50%;
  position: fixed;
  right: 5%;
  bottom: 5%;
  border: none;
  outline: none;
  z-index: 9;
  padding: 20px;
  & svg{
    width: 100%;
    height: 100%;
  }
  @media (max-width: 991px){
    width: 50px;
    height: 50px;
    padding: 10px;
  }
`
