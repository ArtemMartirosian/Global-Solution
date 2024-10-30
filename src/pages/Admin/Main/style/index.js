import styled from "styled-components";
import { Alert  } from 'antd';

export const DivAlert = styled(Alert)`
  width: 50%;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -20%;
  transition: .3s;
  
  &.show{
    top: 10%;
  }
`
