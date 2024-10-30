import styled from "styled-components";
import {Row, Spin} from 'antd'


export const RenderImagePrev = styled(Row)`
  & > div{
    cursor: pointer;
    padding: 10px;
    &:hover img{
      opacity: .8;
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &.active{
      border: 2px solid #3cf93c;
      img{
        opacity: .6;
      }
    }
  }
`


export const LoaderProgress = styled.div`
  top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99;
    background: rgba(255,255,255,.8);
    left: 0;
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  
`

export const SpinLoader = styled(Spin)`
  height: 100vh;
`