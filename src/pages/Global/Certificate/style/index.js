import styled from "styled-components";


export const SectionBottom = styled.section`
  padding-top: 100px;
  padding-bottom: 100px;
  background-color: #072344;
  
  
  & > div > div > div{
    height: calc( 250px - 8px );
    @media (max-width: 991px){
      &:last-child{
        margin-top: 15px;
        height: auto;
      }
    }
    .wrap-block{
      height: 100%;
    }
  }
  
  
  & > div > div>div:first-child{
    
    .wrap-block{
      background-image: url('/images/banners/1.jpg');
      position: relative;
      &:hover{
        &::before{
          opacity: .9;
        }
      }
      &::before{
        position: absolute;
        content: "";
        display: block;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.8;
        transition: 0.5s;
        background: aqua;
        background: linear-gradient(to bottom right, #031c3a, aqua);
      }
    }
  }

  & > div > div>div:last-child{
    .wrap-block{
      background: #0d3664;
    }
  }
  
  .wrap-block{
    padding: 40px;
    & .text-block{
      position: relative;
      z-index: 3;
      h4{
        color: #fff;
        margin-bottom: 20px;
        font-weight: bold;
      }
      P{
        color: #fff;
      }
    }
    
    a{
      position: absolute;
      bottom: 20px;
      right: 30px;
      color: #fff;
      font-size: 30px;
      opacity: 0.6;
      width: 25px;
      transition: .3s;
      &:hover{
        opacity: 1;
      }
      & svg{
        fill: #fff;
      }
    }
  }
`
