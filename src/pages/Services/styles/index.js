import styled from "styled-components";


export const ServicesSection = styled.section`
  margin-top: 60px;
  margin-bottom: 90px;
  min-height: 100vh;
  .services {
    h2 {
      font-weight: 700;
      font-size: 32px;
      text-align: center;
      color: #141414;
      margin-bottom: 30px;
    }

    &__item {
      margin-bottom: 30px;
      &_img {
        width: 100%;
        height: 200px;
        margin-bottom: 16px;
        display: block;
        img {
          width: 100%;
          height: 100%;
          border-radius: 16px;
        }
      }
      &_info {
        a {
          font-weight: 600;
          font-size: 24px;
          color: #141414;
          margin-bottom: 10px;
          text-decoration: none;
          display: block;
        }
        &>p {
          font-weight: 400;
          font-size: 18px;
          color: #141414;
          opacity: 0.7;
          margin-bottom: 16px;
          //white-space: nowrap;
          //overflow: hidden;
          //text-overflow: ellipsis;
          //width: 176px;
        }
        &_date {
          display: flex;
          align-items: center;
          p {
            font-weight: 400;
            font-size: 16px;
            color: #141414;
            opacity: 0.7;
            margin-right: 8px;
            margin-bottom: 0;
          }
          span {
            font-weight: 400;
            font-size: 15px;
            border: 1px solid rgba(20, 20, 20, 0.2);
            border-radius: 50px;
            padding: 5px 12px 7px;
            color: #141414;
            margin-left: 8px;
          }
        }
      }
    }
  }
`

export const BlogContent = styled.section `
  margin-top: 65px;
  margin-bottom: 65px;
  .content-text {
    .content{
      &>div {
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          height: 100% !important;
          @media (max-width: 768px){
            width: 100%!important;
          }
        }

        p {
          font-weight: 400;
          font-size: 16px;
          color: #141414;
          opacity: 0.7;
          width: 800px;
          margin: 35px 0 20px 0;
          @media(max-width: 991px) {
            width: auto;
          }
        }
        ul{
          font-weight: 400;
          font-size: 16px;
          color: #141414;
          opacity: 0.7;
          width: 800px;
          margin: 35px 0 20px 0;
          @media(max-width: 991px) {
            width: auto;
          }
        }
        li{
          margin-bottom: 15px;
        }
      }
      .tg-bot {
        .tg-img {
          & img:first-child{
            margin-right: 100px;
          }
        }
      }
      .content-img {
        width: 100%;
        padding: 60px 0 90px 0;
        display: flex;
        justify-content: center;
        background: rgba(233, 83, 47, 0.03);
        border-radius: 12px;
        position: relative;
        .images {
          border: 10px solid #FFFFFF;
          filter: drop-shadow(0px 0px 8px rgba(233, 83, 47, 0.06)) drop-shadow(50px 40px 40px rgba(233, 83, 47, 0.04));
          border-radius: 12px;
          width: 780px;
          height: 446px!important;
        }
        .services-logo {
          width: 107px!important;
          height: 33px!important;
          position: absolute;
          bottom: 50px;
          right: 40px;
        }
      }
    }
  }


  .blog-content-item {
    display: flex;
    justify-content: space-between;
    align-items: end;
    @media(max-width: 991px) {
      flex-direction: column;
      align-items: start;
    }
    .item-info {
      display: flex;
      .image-block {
        display: flex;
        .blog-content-author-img {
          width: 64px;
          height: 64px;
          margin-right: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:first-child {
            z-index: 11;
          }
          & svg {
            width: 80%;
            height: 80%;
          }
          &:not(:first-child) {
            margin-left: -35px;
            @media(max-width: 501px){
              margin-left: -28px;
            }
          }
          @media(max-width: 992px) {
            width: 55px;
            height: 55px;
          }
          @media(max-width: 768px) {
            width: 45px;
            height: 45px;
            margin-right: 12px;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }
      }
      .blog-content-author-info {
        .author-name {
          font-weight: 600;
          font-size: 16px;
          color: #141414;
          line-height: 32px;
          @media(max-width: 992px) {
            font-size: 14px;
            line-height: 28px;
          }
        }
        .author-action {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .action-date {
            font-weight: 500;
            font-size: 16px;
            line-height: 32px;
            color: #141414;
            opacity: 0.7;
            @media(max-width: 992px) {
              font-size: 14px;
              line-height: 28px;
            }
            @media(max-width: 768px) {
              font-size: 12px;
              line-height: 24px;
            }
          }
          .action-circle {
            margin: 0 8px;
          }
          .action-reading {
            font-weight: 500;
            font-size: 16px;
            line-height: 32px;
            color: #141414;
            opacity: 0.7;
            @media(max-width: 992px) {
              font-size: 14px;
              line-height: 28px;
            }
            @media(max-width: 768px) {
              font-size: 12px;
              line-height: 24px;
            }
          }
          .action-tags {
            display: flex;
            @media(max-width: 520px) {
              margin-top: 8px;
            }
            span {
              background: #FFFFFF;
              border: 1px solid rgba(17,17,17,0.2);
              box-sizing: border-box;
              border-radius: 50px;
              font-weight: 400;
              font-size: 14px;
              color: #111111;
              padding: 4px 12px;
              cursor: pointer;
              margin-right: 8px;
              @media(max-width: 992px) {
                font-size: 12px;
                padding: 2px 8px;
              }
              @media(max-width: 768px) {
                font-size: 10px;
              }
            }
          }
        }
      }
    }
    .blog-content-view {
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: #141414;
      opacity: 0.5;
      @media(max-width: 992px) {
        margin-top: 15px;
      }
      @media(max-width: 768px) {
        font-size: 14px;
        line-height: 22px;
      }
      svg {
        margin-right: 12px;
        @media(max-width: 992px) {
          width: 25px;
          height: 25px;
        }
        @media(max-width: 768px) {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .blog-content-main {
    margin-top: 25px;
    h2 {
      font-weight: 700;
      font-size: 62px;
      line-height: 88px;
      color: #141414;
      @media(max-width: 992px) {
        font-size: 40px;
        line-height: 50px;
      }
      @media(max-width: 768px) {
        font-size: 32px;
        line-height: 40px;
      }
      @media(max-width: 455px) {
        font-size: 24px;
        line-height: 30px;
      }
    }
    .breadcrumb {
      margin: 16px 0 40px 0;
      a {
        font-weight: 500;
        font-size: 13px;
        line-height: 24px;
        color: #141414;
        text-decoration: none;
        &:last-child {
          font-weight: 700;
        }
      }
      div {
        margin: 0 17px;
      }
    }
    .blog-content-main-image {
      margin-bottom: 40px;
      @media(max-width: 768px) {
        margin-bottom: 20px;
      }
      div {
        height: 600px;
        margin-bottom: 8px;
        @media(max-width: 992px) {
          height: 390px;
        }
        @media(max-width: 768px) {
          height: 280px;
        }
        @media(max-width: 455px) {
          height: 200px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
        }
      }
      p {
        font-weight: 500;
        font-size: 16px;
        color: #141414;
        opacity: 0.4;
        text-align: center;
        margin-bottom: 0;
        @media(max-width: 992px) {
          font-size: 14px;
        }
      }
    }
    .content-text {
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: #141414;
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
      @media(max-width: 992px) {
        font-size: 14px;
        line-height: 24px;
      }
    }
    .blog-content-footer {
      display: flex;
      justify-content: space-between;
      .content-like {
        button {
          background: transparent;
          border: none;
          outline: none;
          opacity: 0.5;
          &[disabled]{
            opacity: .3;
          }
          svg {
            width: 17px;
            height: 10px;
            @media(max-width: 992px) {
              width: 15px;
              height: 8px;
            }
          }
        }
        span {
          font-weight: 700;
          font-size: 16px;
          line-height: 28px;
          color: #141414;
          opacity: 0.2;
          margin: 0 20px;
          &.success {
            color: #16BB7E;
            opacity: 1;
          }
          &.danger {
            color: #A92000;
            opacity: 1;
          }
          @media(max-width: 992px) {
            font-size: 14px;
            line-height: 24px;
            margin: 0 12px;
          }
        }
      }

      .content-links {
        display: flex;
        .uscl-list{
          position: relative;

          .uscl-item{
            span:before{
              content: '';
            }
            span{
              width: 28px;
              height: 28px;
              background-position: center;
              background-size: 100%;
              background-repeat: no-repeat;
              border-radius: 0;
              background-color: transparent;
            }
            span[data-item='telegram']{
              background-image: url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.9993 24.668C16.8283 24.668 19.5414 23.5442 21.5418 21.5438C23.5422 19.5434 24.666 16.8303 24.666 14.0013C24.666 11.1723 23.5422 8.45922 21.5418 6.45883C19.5414 4.45844 16.8283 3.33464 13.9993 3.33464C11.1704 3.33464 8.45726 4.45844 6.45688 6.45883C4.45649 8.45922 3.33268 11.1723 3.33268 14.0013C3.33268 16.8303 4.45649 19.5434 6.45688 21.5438C8.45726 23.5442 11.1704 24.668 13.9993 24.668ZM13.9993 27.3346C6.63535 27.3346 0.666016 21.3653 0.666016 14.0013C0.666016 6.6373 6.63535 0.667969 13.9993 0.667969C21.3633 0.667969 27.3327 6.6373 27.3327 14.0013C27.3327 21.3653 21.3633 27.3346 13.9993 27.3346ZM9.85268 15.5613L6.52202 14.5226C5.80202 14.3026 5.79802 13.8066 6.68335 13.4506L19.6607 8.4373C20.414 8.13064 20.8407 8.51864 20.5967 9.49063L18.3874 19.9173C18.2327 20.66 17.786 20.8373 17.166 20.4946L13.7647 17.9773L12.1793 19.508C12.0167 19.6653 11.8847 19.8 11.634 19.8333C11.3847 19.868 11.1793 19.7933 11.0287 19.38L9.86868 15.552L9.85268 15.5626V15.5613Z' fill='%23141414'%3E%3C/path%3E%3C/svg%3E");
            }

            span[data-item='fb']{
              background-image: url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.3327 24.5853C18.0224 24.2431 20.4809 22.8895 22.2084 20.7997C23.936 18.7099 24.803 16.0407 24.6332 13.3346C24.4634 10.6285 23.2696 8.08862 21.2944 6.23114C19.3191 4.37367 16.7108 3.338 13.9993 3.33464C11.2846 3.33261 8.67128 4.36575 6.6918 6.22354C4.71232 8.08133 3.51567 10.624 3.34567 13.3334C3.17568 16.0427 4.04513 18.715 5.77687 20.8057C7.50862 22.8963 9.97233 24.248 12.666 24.5853V16.668H9.99935V14.0013H12.666V11.796C12.666 10.0133 12.8527 9.36664 13.1993 8.71464C13.5408 8.06955 14.0686 7.54222 14.714 7.2013C15.2233 6.92797 15.8567 6.76397 16.9633 6.6933C17.402 6.6653 17.97 6.69997 18.6674 6.79997V9.3333H17.9993C16.7767 9.3333 16.2713 9.39064 15.97 9.55197C15.7902 9.64444 15.6438 9.79083 15.5513 9.97064C15.3913 10.272 15.3327 10.5706 15.3327 11.7946V14.0013H18.666L17.9993 16.668H15.3327V24.5853ZM13.9993 27.3346C6.63535 27.3346 0.666016 21.3653 0.666016 14.0013C0.666016 6.6373 6.63535 0.667969 13.9993 0.667969C21.3633 0.667969 27.3327 6.6373 27.3327 14.0013C27.3327 21.3653 21.3633 27.3346 13.9993 27.3346Z' fill='%23141414'%3E%3C/path%3E%3C/svg%3E");
            }

            span[data-item='twi']{
              background-image: url("data:image/svg+xml,%3Csvg width='28' height='23' viewBox='0 0 28 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.3994 3.40276C18.386 3.40259 17.4131 3.80025 16.6899 4.51018C15.9668 5.22011 15.5512 6.18555 15.5327 7.19876L15.4954 9.29876C15.4932 9.41151 15.4672 9.52252 15.4191 9.62452C15.371 9.72652 15.3018 9.81719 15.2162 9.8906C15.1306 9.964 15.0304 10.0185 14.9223 10.0504C14.8142 10.0824 14.7005 10.0911 14.5887 10.0761L12.5074 9.79342C9.76871 9.42009 7.14471 8.15876 4.62738 6.06142C3.83004 10.4748 5.38737 13.5321 9.13804 15.8908L11.4674 17.3548C11.578 17.4243 11.67 17.5199 11.7352 17.6332C11.8003 17.7465 11.8368 17.8741 11.8412 18.0047C11.8457 18.1354 11.8181 18.2651 11.7608 18.3826C11.7036 18.5001 11.6184 18.6018 11.5127 18.6788L9.39004 20.2294C10.6527 20.3081 11.8514 20.2521 12.846 20.0548C19.1367 18.7988 23.3194 14.0654 23.3194 6.25742C23.3194 5.62009 21.97 3.40276 19.3994 3.40276ZM12.866 7.14942C12.8893 5.86416 13.2912 4.61432 14.0215 3.55639C14.7517 2.49845 15.7778 1.67945 16.9713 1.20191C18.1647 0.724376 19.4726 0.609529 20.731 0.871753C21.9895 1.13398 23.1426 1.76162 24.046 2.67609C24.994 2.66942 25.8007 2.90942 27.6047 1.81609C27.158 4.00276 26.938 4.95209 25.986 6.25742C25.986 16.4468 19.7234 21.4014 13.3687 22.6694C9.01137 23.5388 2.67537 22.1108 0.859375 20.2148C1.78471 20.1428 5.54471 19.7388 7.71804 18.1481C5.87937 16.9361 -1.43929 12.6294 3.37004 1.05076C5.62737 3.68676 7.91671 5.48142 10.2367 6.43342C11.7807 7.06676 12.1594 7.05342 12.8674 7.15076L12.866 7.14942Z' fill='%23141414'%3E%3C/path%3E%3C/svg%3E");
            }


          }
        }
        button,a {
          margin-left: 20px;
          opacity: 0.5;
          transition: 0.5s;
          svg {
            @media(max-width: 992px) {
              width: 24px;
              height: 24px;
            }
          }
          &:hover {
            & svg {
              path {
                fill: #3E97C8;
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
`