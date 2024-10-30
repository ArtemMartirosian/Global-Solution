import styled from "styled-components";




export const TopBanner = styled.section`
  background-image: linear-gradient(#003675, #031c3a);
  min-height: 800px;
  overflow: hidden;
  padding-top: 100px;
  padding-bottom: 38px;
  
  & .container{
    padding-top: 20px;
    padding-bottom: 100px;
  }
  
  @media (max-width: 769px){
    min-height: 600px;
  }
  
  .bg-video {
    height: 27%;
    width: 1750px;
    top: 50px;
    left: 40%;
    object-fit: cover;
    position: absolute;
    mix-blend-mode: screen;
    z-index: 9;
    opacity: 0.4;
    @media (max-width: 769px){
      height: 700px;
      width: 900px;
      top: 0;
      left: 0;
    }
  }

  .title-animation{
    
    h1, span{
      font-size: 4.2rem;
      font-weight: 600;
      line-height: 1.2;
      color: #fff;
      margin-bottom: 0;
      @media (max-width: 769px){
        font-size: 38px;
      }
      @media (max-width: 468px){
        font-size: 2.2rem;
      }
    }
    p{
      color: #fff;
      margin-top: 30px;
      font-size: 1rem;
    }
  }
`


export const SectionBanners = styled.section`
  margin-top: -5px;
  .container > .ant-row{
    @media (max-width: 769px){
      padding: 0px 10px;
    }
  }
  .banners-left{
    background-image: url("/images/banners/1.jpg");
    background-position: center;
    background-size: cover;
    position: relative;
    & > div{
      position: relative;
      z-index: 2;
      padding: 40px;
      @media (max-width: 468px){
        padding: 20px;
      }
      h2{
        color: #fff;
        font-weight: 600;
      }
      p{
        color: #fff;
      }
    }
    &:hover{
      &:after{
        content: "";
        opacity: 0.9;
      }
    }
    &::after{
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
    
    & a{
      font-weight: 600;
      padding: 0.6rem 0.9rem;
    }
  }
  
  .banners-right{
    @media (max-width: 991px){
      padding: 0!important;
      margin-top: 10px
    }
    & > div{
      & > div{
        & .wrap-banners{
          padding: 70px 40px;
          margin-bottom: 1rem;
          height: 100%;
          @media (max-width: 468px){
            padding: 20px;
          }
        }
        h4{
          color: #fff;
          font-weight: 600;
          margin-bottom: 20px;
        }
        p{
          color: #fff;
        }
        a{
          float: right;
          opacity: .7;
          transition: .3s;
          & svg{
            fill: #fff;
            width: 20px;
            height: 35px;
          }
          &:hover{
            opacity: 1;
          }
        }
      }
    }
    & >div>div:first-child{
      padding-bottom: 15px;
      .wrap-banners{
        background-color: #0d3664;

      }
    }
    & >div>div:last-child .wrap-banners{
      background-color: #e95230;
    }
  }
`

export const SectionNetworking = styled.section`
  background-color: #eff5fd;
  .wrap-clients{
    & > div{
      max-width: 900px;
      padding: 80px 30px;
      margin-right: 10px!important;
      
      & > div{
        & > div{
          height: 120px;
          background-color: #fff;
          & img{
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
        
      }
    }
  }
  
  .aside-navbar{
    position: relative;
    padding-right: 45px;
    padding-top: 80px;
    padding-bottom: 80px;
    min-height: 600px;
    background-image: url("/images/banners/3.jpg");
    background-size: cover;
    background-position: left;
    @media (max-width: 769px){
      padding-right: 15px;
      padding-left: 15px;
      min-height: auto;
      
    }
   
    &:hover{
      &::after{
        content: '';
        opacity: 0.9;
      }
    }
    &::after{
      content: '';
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.8;
      transition: 0.5s;
      background: #031c3a;
      background: linear-gradient(to bottom right, #0d3664, #031c3a);
    }

    & > div{
      position: relative;
      z-index: 2;
      h2{
        color: #fff;
        font-weight: bold;
        text-align: right;
        margin-bottom: 30px;
        @media (max-width: 769px){
          text-align: left;
        }
      }
      & p{
        text-align: right;
        color: #fff;
        cursor: pointer;
        opacity: .7;
        font-weight: 500;
        transition: .3s;
        @media (max-width: 769px){
          text-align: left;
        }
        &:hover{
          opacity: 1;
        }
        &.active{
          opacity: 1;
        }
      }
    }
  }
`


export const SectionTeam = styled.section`
  padding-bottom: 60px;
  padding-top: 60px;
  
  .block-header{
    background-color: #072344;
    position: relative;
        
    .title-block{
      position: relative;
      z-index: 9;
      padding: 135px 40px 40px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media (max-width: 769px){
        padding: 20px 40px 20px 40px;
      }
      h2{
        color: #fff;
        font-weight: 600;
      }
      a {
        font-weight: 600;
        font-size: 16px;
        text-decoration: none;
        color: #ffffff;
        background: #0F4882;
        border-radius: 5px;
        padding: 16px 28px 14px 28px;
      }
    }
    
    #tsparticles{
      & canvas{
        position: absolute!important;
      }
    }
  }
  
  .block-team-list{
    padding-top: 20px;
    & > div{
      position: relative;
      &.more-employee{
        
        .wrap-card-team{
          background-color: #e95230;
          justify-content: center;
          align-items: center;
          position: relative;
          .text-card-team{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            padding: 0;
            & h6{
              font-size: 1.8rem;
            }
          }
        }
        
      }
      .wrap-card-team{
        background-position: top;
        background-size: cover;
        height: 160px;
        position: relative;
        .text-card-team{
          position: absolute;
          width: 100%;
          bottom: 0;
          padding: 30px 20px 7px 20px;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #0d3664 100%);
          & h6{
            font-size: 1rem;
            font-weight: 600;
            color: #fff;
            margin-bottom: 0;
          }
          & p{
            color: #fff;
            font-size: 14px;
            margin-bottom: 0;
          }
          
        }
      }
    }
    
  }
  
  
  
`

export const SectionBlog = styled.section `
  padding-top: 88px;
  padding-bottom: 88px;
  @media(max-width: 992px) {
    padding-top: 70px;
    padding-bottom: 70px;
}
  
  .blog-default-img{
    background-color: grey;
    background-size: 50%!important;
  }
  a{
    text-decoration: none;
  }
  .top-title_blog {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    @media(max-width: 992px) {
      margin-bottom: 25px;
    }
    h1 {
      font-weight: 700;
      font-size: 48px;
      color: #141414;
      @media(max-width: 992px) {
        font-size: 38px;
      }
      @media(max-width: 768px) {
        font-size: 30px;
      }
    }
    
    a {
      font-size: 24px;
      color: #141414;
      text-decoration: none;
      @media(max-width: 992px) {
        font-size: 20px;
      }
      @media(max-width: 768px) {
        font-size: 16px;
      }
      svg {
        width: 22px;
        height: 22px;
        margin-left: 22px;
        @media(max-width: 992px) {
          width: 18px;
          height: 18px;
          margin-left: 18px;
        }
        @media(max-width: 768px) {
          width: 15px;
          height: 15px;
          margin-left: 15px;
        }
      }
    }
  }
  .main-blog_wrap {
    .ant-row {
      @media(max-width: 579px) {
        justify-content: center;
      }
    }
    .blog-info {
      padding: 0 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      @media(max-width: 992px) {
        padding: 0;
      }
      .main-blog_time {
        font-weight: 500;
        font-size: 16px;
        color: #141414;
        opacity: 0.7;
        margin-bottom: 15px;
        @media(max-width: 992px) {
          font-size: 14px;
        }
        @media(max-width: 768px) {
          font-size: 12px;
        }
      }
      .main-blog_title {
        font-weight: 700;
        font-size: 32px;
        color: #141414;
        margin-bottom: 8px;
        text-decoration: none;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        @media(max-width: 992px) {
          font-size: 28px;
        }
        @media(max-width: 768px) {
          font-size: 24px;
        }
      }
      .main-blog_desc {
        font-weight: 500;
        font-size: 16px;
        opacity: 0.7;
        color: #141414;
        margin-bottom: 0;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        @media(max-width: 992px) {
          font-size: 14px;
        }
        @media(max-width: 768px) {
          font-size: 12px;
        }
      }
    }
    .wrap-menu {
      @media(max-width: 992px) {
        margin-bottom: 20px;
      }
      .blog-menu {
        display: flex;
        flex-direction: column;
        height: 400px;
        @media(max-width: 992px) {
          height: 320px;
        }
        @media(max-width: 768px) {
          height: 270px;
        }
        
        & > div:nth-child(even){
          flex-grow: 2;
          margin-top: 12px;
        }
        & > div:nth-child(odd){
          flex-grow: 1;
          margin-bottom: 12px;
         
        }
        &:first-child {
          padding-right: 12px;
        }
        &:last-child {
          padding-left: 12px;
        }
       
        .blog-menu-image {
          cursor: pointer;
          transition: .5s;
          position: relative;
          .blog-image-bg {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;

          }
          &.active {
            flex-grow: 3;
            .blog-image-bg {
              background-color: #3E97C8;
              opacity: 0.5;
            }
          }
          &>div {
            border-radius: 16px;
            transition: 0.5s;
            height: 100%;
            overflow: hidden;
            position: relative;
            background-attachment:fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            & img{
              width: 100%;
              height: 100%;
              object-fit: cover;
              position: absolute;
            }
            &:hover {
              background-color: #3E97C8;
              opacity: 0.5;
            }
          }
        }
      }
    }
  }
`