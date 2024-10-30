import styled from 'styled-components'


export const CustomHeader = styled.div`
  &&& {
    position: fixed;
    z-index: 9;
    width: 100%;
    height: 64px;
    box-shadow: 0px 0px 7px -2px #000000;
    background-color: #f0f2f5;
    display: flex;
    top: 0;
    align-items: center;
    padding: 0 15px;
  }
`


export default function AdminHeader({ children }){
    return(
        <CustomHeader>
            {children}
        </CustomHeader>
    )
}
