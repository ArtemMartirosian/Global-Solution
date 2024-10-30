import styled from "styled-components";

export const SectionCertificates = styled.section`
  padding-top: 60px;
  padding-bottom: 60px;
  .item-doc{
    border:1px solid #ddd; margin-bottom:30px;
    .thumbnail{
      padding: 15px;
      cursor: zoom-in;
      height: 340px;
      background-color: #eff5fd;
      &:hover{
        background-color: #0d3664;
        & img{
          transform: scale(0.96);
          transition: 0.4s;
        }
      }

      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    
    .info-wrap{
      padding: 20px;
      height: 120px;
      p{ 
        color:#6c757d; 
        margin-bottom:0;
        font-size: 13px;}
    }
  }
`


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
      background: #e95230;
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
