import styled from "styled-components";


export const SectionTop = styled.section`
  padding: 80px 0;
  background-color: #0d3664;
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
