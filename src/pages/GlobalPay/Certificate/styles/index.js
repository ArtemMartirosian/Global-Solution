import styled from "styled-components";


export const CertificateDiv = styled.div`
  padding-top: 60px;
  padding-bottom: 60px;
    .item-doc{
      border: 1px solid #ddd;
      margin-bottom: 30px;
      & .react-fancybox {
        height: 360px;
        background: #f2f2f2;
        padding: 10px;
        transition: .4s;
        &:hover {
          cursor: pointer;
          & {
            background-color: #0a3f7b;
          }
        }
        & > div{
          height: 100%;
          text-align: center;
          & img{
            height: 100%;
            width: 100%;
            object-fit: contain;
          }
        }
       
      }
      & .info-wrap {
        padding: 15px;
        height: 120px;
        & p {
          color: #6c757d;
          margin-bottom: 0;
          font-size: 16px;
        }
      }


    }
`
