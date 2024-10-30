import styled from "styled-components";


export const SectionMap = styled.section`
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #eff5fd;
`

export const SectionTop = styled.section`
  padding: 80px 0;
  background-color: rgb(233,83,47);
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  
  h1{
    font-weight: 600;
  }
  
  video{
    height: 600px;
    width: 900px;
    bottom: -77%;
    left: 50%;
    -o-object-fit: cover;
    object-fit: cover;
    position: absolute;
    mix-blend-mode: screen;
    opacity: .3;
  }
`

export const SectionContacts = styled.section`
  padding-top: 60px;
  padding-bottom: 60px;
    .info-contacts{
      & > div{
        flex-wrap: nowrap;
        margin-bottom: 30px;
      }
      .icon-inf{
        width: 48px;
        height: 48px;
        border-radius: 0.25rem !important;
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
          margin-bottom: 5px;
          color: #031c3a;
          @media (max-width: 468px){
            font-size: .9rem;
          }
        }
        p{
          margin-bottom: 0;
          font-weight: 500;
          @media (max-width: 468px){
            font-size: .9rem;
          }
        }
      }
    }
  
  .feedback-form{
    form{
      display: flex;
      flex-wrap: wrap;
      & > div{
        padding: 0px 10px;
        & input, textarea{
          height: calc(1.5em + 1.2rem + 2px);
          padding: 0.6rem 0.9rem;
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

