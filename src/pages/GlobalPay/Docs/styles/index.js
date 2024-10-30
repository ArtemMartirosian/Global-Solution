import styled from "styled-components";

export const MainDiv = styled.main`
.aside-wrap {
  border-right: 1px solid #eee;
  padding-right: 30px;
  height: 100%;
  background-image: -webkit-gradient(
    linear,
    right top,
    left top,
    from(#a1a1a1),
    to(#fff)
  );
  background-image: linear-gradient(to left, #f5f5f5, #fff);
  padding-top: 30px;
  padding-bottom: 30px;
  color: #a1a1a1;
}

.menu-docs-aside {
  padding: 0;
  margin: 0;
}
.menu-docs-aside a {
  padding: 5px 0;
  display: block;
  text-decoration: none;
  color: #a1a1a1;
}

pre{
  padding: 1rem;
  margin:0;
  background: #f6f6f6;
  border: 1px solid #ddd;
  border-radius: 2px;
  line-height: 1.15;
}

table.table-bordered > thead > tr > th{
    border-bottom: 2px solid #dfe3e7;
}

.active-link > div{
  color: black;
}

.unactive-link > div:hover{
  color: #7a8289;
}

pre {
  white-space: pre-wrap;     
  white-space: -moz-pre-wrap;  
  white-space: -pre-wrap;      
  white-space: -o-pre-wrap;    
  word-wrap: break-word;       
}

.title-unactive-link > div{
  display: none;
}

.mobile-menu{
  display: none
}

@media (max-width: 767px) {

  .word-break{
    word-break: break-all;
  }

.desktop-menu{
  display: none;
}

.mobile-menu{
  display: block;
}

.ant-collapse-header > div{
  margin-top: -3px;
}

.aside-wrap {
  border-right: 0px;
  padding: 35px 0 0 0;

  background-image: -webkit-gradient(
    linear,
    right top,
    left top,
    from(#fff),
    to(#fff)
  )}
}`