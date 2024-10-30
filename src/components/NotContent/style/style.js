import styled from "styled-components";


export const NotContentSection = styled.div`
  height: 100vh;
  margin: 0 auto;
    .not-found {
      height: 100%;
      &__block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        @media(max-width: 576px) {
          flex-direction: column-reverse;
          justify-content: space-around;
        }
        &_info {
          p {
            text-align: center;
            font-weight: 700;
            font-size: 24px;
            color: #0D3664;
            margin-bottom: 4px;
            @media(max-width: 991px) {
              font-size: 20px;
            }
            @media(max-width: 768px) {
              font-size: 18px;
            }
          }
          h1 {
            text-align: center;
            font-weight: 700;
            font-size: 44px;
            letter-spacing: -0.02em;
            color: #141414;
            margin-bottom: 26px;
            @media(max-width: 991px) {
              font-size: 36px;
            }
            @media(max-width: 768px) {
              font-size: 32px;
            }
          }
          span {
            font-weight: 400;
            font-size: 20px;
            color: #141414;
            opacity: 0.7;
            text-align: center;
            margin-bottom: 52px;
            display: block;
            @media(max-width: 991px) {
              font-size: 16px;
            }
            @media(max-width: 768px) {
              font-size: 14px;
              margin-bottom: 26px;
            }
          }
          & .frs-chld{
            margin-bottom: 0;
          }
          a {
            font-weight: 600;
            font-size: 17px;
            color: #ffffff;
            text-decoration: none;
            background: #18406D;
            border-radius: 5px;
            width: 250px;
            padding: 13px 0;
            display: block;
            text-align: center;
            @media(max-width: 991px) {
              width: 200px;
              padding: 10px 0;
              font-size: 14px;
            }
            @media(max-width: 768px) {
              width: 155px;
              padding: 7px 0;
              font-size: 12px;
            }
          }
        }
        &_img {
          position: relative;
          display: flex;
          .img-404 {
            @media(max-width: 991px){
              width: 360px;
              height: 250px;
              & img{
                width: 100%;
                height: 100%;
              }
            }
            @media(max-width: 768px) {
              width: 270px;
              height: 180px;
            }
          }
          .bg-404 {
            position: absolute;
            z-index: -1;
            right: 10%;
            @media(max-width: 991px){
              width: 350px;
              height: 300px;
              right: 2%;
              & img{
                width: 100%;
                height: 100%;
              }
            }
            @media(max-width: 768px ){
              width: 270px;
              height: 226px;
            }
          }
        }
      }
    }
`