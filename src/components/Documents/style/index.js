import styled from "styled-components";

export const SectionCertificates = styled.section`
  padding-top: 60px;
  padding-bottom: 60px;
  min-height: 100vh;
  .item-doc{
    
    text-align: center;
    border:1px solid #ddd; margin-bottom:30px;
    
    
    .ant-image{
      padding: 15px;
      width: 100%;
      height: 350px;
      
      background: #eff5fd;
      transition: 0.6s;
      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: 0.6s;
      }

      &:hover{
        background-color: #0d3664;
        & img{
          transform: scale(0.95);
        }
      }
      
      
      .ant-image-mask{
        cursor: zoom-in;
        opacity: 0!important;
      }
    }
    

    
    .info-wrap{
      padding: 20px;
      height: 120px;
      text-align: left;
      h6{
        font-weight: bold;
      }
      p{ 
        color:#6c757d; 
        margin-bottom:0;
        font-size: 13px;}
    }
  }
`
