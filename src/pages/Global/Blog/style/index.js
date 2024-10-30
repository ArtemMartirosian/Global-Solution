import styled from "styled-components";
import {Row, Tabs} from "antd";
import Slider from "react-slick";


export const TagsLink = styled.button`
  border-radius: 50px;
  border: 1px solid rgba(17, 17, 17, 0.2);
  outline: none;
  padding: 6px 12px;
  margin-right: 16px;
  background-color: #fff;
  color: #111111;
  transition: .4s;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 10px;

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 992px) {
    padding: 4px 8px;
    font-size: 14px;
  }
  @media (max-width: 429px) {
    margin-bottom: 10px;
    margin-right: 12px;
  }

  &.active {
    background-color: #111111;
    color: #fff;
  }
`


export const ButtonLoadMore = styled.button`
  background: rgba(24, 64, 109, 0.1);
  border-radius: 8px;
  font-weight: 600;
  color: #18406D;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  outline: none;
  margin: 10px auto;
  display: block;
`


export const TabsButton = styled(Tabs)`


  &.ant-tabs-top > .ant-tabs-nav::before {
    opacity: 0;
  }

  .ant-tabs-tab:not(.ant-tabs-tab-active) > div {
    font-size: 16px;
    font-weight: 500;
    color: #444444;
    transition: none;

  }

  .ant-tabs-ink-bar {
    background-color: #18406D !important;
  }

  .ant-tabs-tab-active > div {
    color: #18406D !important;
    font-size: 16px;
    font-weight: 700;
  }
`

export const BlogItem = styled(Row)`
  padding: 32px 0 28px 0;
  @media (max-width: 768px) {
    padding: 24px 0 18px 0;
  }

  .main-blog {
    padding-right: 24px;
    @media (max-width: 992px) {
      padding: 0;
    }

    .blog-author {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      .blog-author-images {
        display: flex;
        margin-right: 8px;

        .author-img {
          width: 32px;
          height: 32px;

          &:first-child {
            z-index: 11;
          }

          &:not(:first-child) {
            margin-left: -7px;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            border: 2px solid #FFFFFF;
          }
        }
      }

      .author-name {
        display: flex;
        font-weight: 600;
        font-size: 14px;
        color: #141414;
        margin-bottom: 0;
      }
    }

    .blog-title {
      font-weight: 700;
      font-size: 32px;
      color: #141414;
      margin-bottom: 8px;
      text-decoration: none;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      @media (max-width: 768px) {
        font-size: 28px;
      }
    }

    .blog-desc {
      font-weight: 500;
      font-size: 16px;
      color: #141414;
      margin-bottom: 8px;
      opacity: 0.7;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      @media (max-width: 768px) {
        font-size: 14px;
      }
    }

    .blog-info {
      display: flex;
      align-items: center;
      display: -webkit-box;
      -webkit-align-items: center;

      .info-date {
        margin-bottom: 0;
        font-weight: 400;
        font-size: 14px;
        color: #141414;
        opacity: 0.7;
      }

      .info-cirсle {
        width: 4px;
        height: 4px;
        margin: 0 8px;

        svg {
          width: 100%;
          height: 100%;
          vertical-align: text-top;
        }
      }

      .info-time {
        margin-bottom: 0;
        font-weight: 400;
        font-size: 14px;
        color: #141414;
        opacity: 0.7;
      }

      .blog-tags {
        display: flex;

        .tags-blog {
          background: #FFFFFF;
          border: 1px solid rgba(17, 17, 17, 0.2);
          box-sizing: border-box;
          border-radius: 50px;
          font-weight: 400;
          font-size: 14px;
          color: #111111;
          padding: 6px 12px;
          cursor: pointer;
          margin-right: 8px;
          @media (max-width: 768px) {
            padding: 4px 8px;
            font-size: 12px;
          }
        }

        .tags-yet {
          background: #FFFFFF;
          border: 1px solid rgba(17, 17, 17, 0.2);
          box-sizing: border-box;
          border-radius: 50px;
          font-weight: 400;
          font-size: 14px;
          color: #111111;
          padding: 6px 12px;
          cursor: pointer;
          @media (max-width: 768px) {
            padding: 4px 8px;
            font-size: 12px;
          }
        }
      }
    }
  }

  .blog-images {
    height: 204px;
    @media (max-width: 992px) {
      margin-top: 15px;
    }
    @media (max-width: 768px) {
      height: 180px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
  }

  .blog-default-image {
    height: 204px;
    background: #18406D;
    opacity: 0.1;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 992px) {
      margin-top: 15px;
    }
    @media (max-width: 768px) {
      height: 180px;
    }

    img {
      width: 78px;
      height: 78px;
      object-fit: cover;
    }
  }
`

export const VideoItem = styled.div`
  padding: 32px 0 28px 0;

  a {
    text-decoration: none;
  }

  .video-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    text-decoration: none;

    h2 {
      font-weight: 700;
      font-size: 32px;
      color: #141414;
      @media (max-width: 768px) {
        font-size: 28px;
      }
      @media (max-width: 429px) {
        font-size: 24px;
      }
    }
  }

  .video-list {
    @media (max-width: 992px) {
      display: flex;
      justify-content: space-between;
    }

    .video-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }

      .video-set {
        width: 150px;
        height: 150px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        transition: 0.5s;

        &.default-photo {
          border-radius: 50%;
          overflow: hidden;
          background: grey;

          .video-img {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            & img {
              width: 50% !important;
              height: 50% !important;
              border-radius: 0;
              object-fit: contain;
            }
          }
        }

        @media (max-width: 768px) {
          width: 130px;
          height: 130px;
        }
        @media (max-width: 429px) {
          width: 100px;
          height: 100px;
        }

        &:hover .video-img {
          opacity: 0;
          transition: 0.5s;
        }

        &:hover .video-param {
          opacity: 1;
          background: #18406D;
        }

        .video-img {
          width: 100%;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }

        .video-param {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: 0.5s;

          p {
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
            margin-bottom: 8px;
          }

          button {
            color: #ffffff;
            text-decoration: none;
            font-weight: 700;
            font-size: 16px;
            background: transparent;
            border: none;
            outline: none;

            svg {
              margin-right: 10px;
            }
          }
        }
      }

      .video-desc {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: #141414 !important;
      }
    }
  }
`

export const PhotoItem = styled.div`
  margin-top: 30px;

  h2 {
    font-weight: 700;
    font-size: 32px;
    color: #141414;
    margin-bottom: 24px;
    @media (max-width: 768px) {
      font-size: 28px;
    }
    @media (max-width: 429px) {
      font-size: 24px;
    }
  }

  .photo-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &__opacity {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(162, 162, 162, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button {
      width: 110px;
      height: 110px;
      margin-bottom: 8px;
      display: flex;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
      overflow: hidden;
      outline: none;
      padding: 0;
      border: none;
      @media (max-width: 768px) {
        width: 90px;
        height: 90px;
      }
      @media (max-width: 429px) {
        width: 70px;
        height: 70px;
      }

      &:last-child {
        background-color: #777777;

      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`

export const NewItem = styled.div`
  margin-top: 50px;
  opacity: ${(props) => props.isShow ? 1 : 0};
  z-index: ${(props) => props.isShow ? 0 : -1};
  position: fixed;
  top: 20px;
  transition: all .2s linear;
  @media (max-width: 1200px) {
    position: initial !important;
  }

  h2 {
    font-weight: 700;
    font-size: 32px;
    color: #141414;
    margin-bottom: 24px;
  }

  a {
    display: block;
    width: 232px;
    height: 412px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
  }
`

export const InputSearch = styled.div`
  display: flex;
  padding: 17px 0;

  &.focus-input {
    input, button svg {
      opacity: 1;
    }
  }

  button {
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    transition: .4s;

    svg {
      width: 27px;
      height: 27px;
      opacity: .5;
      @media (max-width: 768px) {
        width: 23px;
        height: 23px;
      }
    }
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    padding: 0 20px;
    font-weight: 400;
    font-size: 18px;
    color: #141414;
    opacity: 0.5;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`

export const BlogContent = styled.section`
  margin: 65px 0;

  .content {
    img {
      height: 100% !important;
      @media (max-width: 768px) {
        width: 100% !important;
      }
    }

  }


  .blog-content-item {
    display: flex;
    justify-content: space-between;
    align-items: end;
    @media (max-width: 991px) {
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

          &:first-child {
            z-index: 11;
          }

          &:not(:first-child) {
            margin-left: -35px;
            @media (max-width: 501px) {
              margin-left: -28px;
            }
          }

          @media (max-width: 992px) {
            width: 55px;
            height: 55px;
          }
          @media (max-width: 768px) {
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
          @media (max-width: 992px) {
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
            @media (max-width: 992px) {
              font-size: 14px;
              line-height: 28px;
            }
            @media (max-width: 768px) {
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
            @media (max-width: 992px) {
              font-size: 14px;
              line-height: 28px;
            }
            @media (max-width: 768px) {
              font-size: 12px;
              line-height: 24px;
            }
          }

          .action-tags {
            display: flex;
            @media (max-width: 520px) {
              margin-top: 8px;
            }

            span {
              background: #FFFFFF;
              border: 1px solid rgba(17, 17, 17, 0.2);
              box-sizing: border-box;
              border-radius: 50px;
              font-weight: 400;
              font-size: 14px;
              color: #111111;
              padding: 4px 12px;
              cursor: pointer;
              margin-right: 8px;
              @media (max-width: 992px) {
                font-size: 12px;
                padding: 2px 8px;
              }
              @media (max-width: 768px) {
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
      @media (max-width: 992px) {
        margin-top: 15px;
      }
      @media (max-width: 768px) {
        font-size: 14px;
        line-height: 22px;
      }

      svg {
        margin-right: 12px;
        @media (max-width: 992px) {
          width: 25px;
          height: 25px;
        }
        @media (max-width: 768px) {
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
      @media (max-width: 992px) {
        font-size: 40px;
        line-height: 50px;
      }
      @media (max-width: 768px) {
        font-size: 32px;
        line-height: 40px;
      }
      @media (max-width: 455px) {
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
      @media (max-width: 768px) {
        margin-bottom: 20px;
      }

      div {
        height: 600px;
        margin-bottom: 8px;
        @media (max-width: 992px) {
          height: 390px;
        }
        @media (max-width: 768px) {
          height: 280px;
        }
        @media (max-width: 455px) {
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
        @media (max-width: 992px) {
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
      @media (max-width: 992px) {
        font-size: 14px;
        line-height: 24px;
      }
    }

    img {
      max-width: 100%;
      height: auto;
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

          &[disabled] {
            opacity: .3;
          }

          svg {
            width: 17px;
            height: 10px;
            @media (max-width: 992px) {
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

          @media (max-width: 992px) {
            font-size: 14px;
            line-height: 24px;
            margin: 0 12px;
          }
        }
      }

      .content-links {
        display: flex;

        .uscl-list {
          position: relative;

          .uscl-item {
            span:before {
              content: '';
            }

            span {
              width: 28px;
              height: 28px;
              background-position: center;
              background-size: 100%;
              background-repeat: no-repeat;
              border-radius: 0;
              background-color: transparent;
            }

            span[data-item='telegram'] {
              background-image: url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.9993 24.668C16.8283 24.668 19.5414 23.5442 21.5418 21.5438C23.5422 19.5434 24.666 16.8303 24.666 14.0013C24.666 11.1723 23.5422 8.45922 21.5418 6.45883C19.5414 4.45844 16.8283 3.33464 13.9993 3.33464C11.1704 3.33464 8.45726 4.45844 6.45688 6.45883C4.45649 8.45922 3.33268 11.1723 3.33268 14.0013C3.33268 16.8303 4.45649 19.5434 6.45688 21.5438C8.45726 23.5442 11.1704 24.668 13.9993 24.668ZM13.9993 27.3346C6.63535 27.3346 0.666016 21.3653 0.666016 14.0013C0.666016 6.6373 6.63535 0.667969 13.9993 0.667969C21.3633 0.667969 27.3327 6.6373 27.3327 14.0013C27.3327 21.3653 21.3633 27.3346 13.9993 27.3346ZM9.85268 15.5613L6.52202 14.5226C5.80202 14.3026 5.79802 13.8066 6.68335 13.4506L19.6607 8.4373C20.414 8.13064 20.8407 8.51864 20.5967 9.49063L18.3874 19.9173C18.2327 20.66 17.786 20.8373 17.166 20.4946L13.7647 17.9773L12.1793 19.508C12.0167 19.6653 11.8847 19.8 11.634 19.8333C11.3847 19.868 11.1793 19.7933 11.0287 19.38L9.86868 15.552L9.85268 15.5626V15.5613Z' fill='%23141414'%3E%3C/path%3E%3C/svg%3E");
            }

            span[data-item='fb'] {
              background-image: url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.3327 24.5853C18.0224 24.2431 20.4809 22.8895 22.2084 20.7997C23.936 18.7099 24.803 16.0407 24.6332 13.3346C24.4634 10.6285 23.2696 8.08862 21.2944 6.23114C19.3191 4.37367 16.7108 3.338 13.9993 3.33464C11.2846 3.33261 8.67128 4.36575 6.6918 6.22354C4.71232 8.08133 3.51567 10.624 3.34567 13.3334C3.17568 16.0427 4.04513 18.715 5.77687 20.8057C7.50862 22.8963 9.97233 24.248 12.666 24.5853V16.668H9.99935V14.0013H12.666V11.796C12.666 10.0133 12.8527 9.36664 13.1993 8.71464C13.5408 8.06955 14.0686 7.54222 14.714 7.2013C15.2233 6.92797 15.8567 6.76397 16.9633 6.6933C17.402 6.6653 17.97 6.69997 18.6674 6.79997V9.3333H17.9993C16.7767 9.3333 16.2713 9.39064 15.97 9.55197C15.7902 9.64444 15.6438 9.79083 15.5513 9.97064C15.3913 10.272 15.3327 10.5706 15.3327 11.7946V14.0013H18.666L17.9993 16.668H15.3327V24.5853ZM13.9993 27.3346C6.63535 27.3346 0.666016 21.3653 0.666016 14.0013C0.666016 6.6373 6.63535 0.667969 13.9993 0.667969C21.3633 0.667969 27.3327 6.6373 27.3327 14.0013C27.3327 21.3653 21.3633 27.3346 13.9993 27.3346Z' fill='%23141414'%3E%3C/path%3E%3C/svg%3E");
            }

            span[data-item='twi'] {
              background-image: url("data:image/svg+xml,%3Csvg width='28' height='23' viewBox='0 0 28 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.3994 3.40276C18.386 3.40259 17.4131 3.80025 16.6899 4.51018C15.9668 5.22011 15.5512 6.18555 15.5327 7.19876L15.4954 9.29876C15.4932 9.41151 15.4672 9.52252 15.4191 9.62452C15.371 9.72652 15.3018 9.81719 15.2162 9.8906C15.1306 9.964 15.0304 10.0185 14.9223 10.0504C14.8142 10.0824 14.7005 10.0911 14.5887 10.0761L12.5074 9.79342C9.76871 9.42009 7.14471 8.15876 4.62738 6.06142C3.83004 10.4748 5.38737 13.5321 9.13804 15.8908L11.4674 17.3548C11.578 17.4243 11.67 17.5199 11.7352 17.6332C11.8003 17.7465 11.8368 17.8741 11.8412 18.0047C11.8457 18.1354 11.8181 18.2651 11.7608 18.3826C11.7036 18.5001 11.6184 18.6018 11.5127 18.6788L9.39004 20.2294C10.6527 20.3081 11.8514 20.2521 12.846 20.0548C19.1367 18.7988 23.3194 14.0654 23.3194 6.25742C23.3194 5.62009 21.97 3.40276 19.3994 3.40276ZM12.866 7.14942C12.8893 5.86416 13.2912 4.61432 14.0215 3.55639C14.7517 2.49845 15.7778 1.67945 16.9713 1.20191C18.1647 0.724376 19.4726 0.609529 20.731 0.871753C21.9895 1.13398 23.1426 1.76162 24.046 2.67609C24.994 2.66942 25.8007 2.90942 27.6047 1.81609C27.158 4.00276 26.938 4.95209 25.986 6.25742C25.986 16.4468 19.7234 21.4014 13.3687 22.6694C9.01137 23.5388 2.67537 22.1108 0.859375 20.2148C1.78471 20.1428 5.54471 19.7388 7.71804 18.1481C5.87937 16.9361 -1.43929 12.6294 3.37004 1.05076C5.62737 3.68676 7.91671 5.48142 10.2367 6.43342C11.7807 7.06676 12.1594 7.05342 12.8674 7.15076L12.866 7.14942Z' fill='%23141414'%3E%3C/path%3E%3C/svg%3E");
            }


          }
        }

        button, a {
          margin-left: 20px;
          opacity: 0.5;
          transition: 0.5s;

          svg {
            @media (max-width: 992px) {
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

export const BlogSimilar = styled.section`
  margin: 70px 0 90px 0;

  a {
    text-decoration: none !important;
  }

  @media (max-width: 768px) {
    margin: 40px 0 60px 0;
  }
  @media (max-width: 455px) {
    margin: 30px 0 50px 0;
  }

  h3 {
    font-weight: 600;
    font-size: 24px;
    color: #141414;
    opacity: 0.7;
    margin-bottom: 32px;
    @media (max-width: 992px) {
      font-size: 22px;
    }
    @media (max-width: 768px) {
      font-size: 18px;
    }
    @media (max-width: 455px) {
      font-size: 16px;
    }
  }

  .blog-similar-list {
    .similar-content {
      .similar-content-img {
        height: 200px;
        margin-bottom: 15px;
        border-radius: 16px;
        overflow: hidden;

        &.blog-default-image {
          background: grey;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 50%;
            height: 50%;
            object-fit: contain;
          }
        }

        @media (max-width: 992px) {
          height: 180px;
        }
        @media (max-width: 768px) {
          height: 150px;
        }
        @media (max-width: 455px) {
          height: 120px;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .similar-content-info {
        h4 {
          font-weight: 600;
          font-size: 24px;
          color: #141414;
          margin-bottom: 15px;
          height: 58px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          @media (max-width: 992px) {
            font-size: 20px;
            height: 48px;
          }
          @media (max-width: 768px) {
            font-size: 18px;
            height: 43px;
          }
          @media (max-width: 455px) {
            font-size: 15px;
            height: 36px;
          }
        }

        .content-author {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          @media (max-width: 992px) {
            margin-bottom: 12px;
          }
          @media (max-width: 455px) {
            margin-bottom: 8px;
          }

          .author-img {
            width: 32px;
            height: 32px;
            margin-right: 15px;
            @media (max-width: 992px) {
              width: 30px;
              height: 30px;
            }
            @media (max-width: 768px) {
              width: 28px;
              height: 28px;
            }
            @media (max-width: 455px) {
              width: 25px;
              height: 25px;
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 50%;
            }
          }

          p {
            font-weight: 600;
            font-size: 14px;
            color: #141414;
            margin-bottom: 0;
            @media (max-width: 992px) {
              font-size: 12px;
            }
            @media (max-width: 768px) {
              font-size: 10px;
            }
            @media (max-width: 455px) {
              font-size: 8px;
            }
          }
        }

        .content-most {
          display: flex;
          align-items: center;

          .content-most-date {
            font-weight: 400;
            font-size: 14px;
            color: #141414;
            opacity: 0.7;
            @media (max-width: 992px) {
              font-size: 12px;
            }
            @media (max-width: 768px) {
              font-size: 10px;
            }
            @media (max-width: 455px) {
              font-size: 8px;
            }
          }

          .content-most-tags {
            background: #FFFFFF;
            border: 1px solid rgba(17, 17, 17, 0.2);
            box-sizing: border-box;
            border-radius: 50px;
            font-weight: 400;
            font-size: 14px;
            color: #111111;
            padding: 3px 12px;
            cursor: pointer;
            margin-right: 8px;
            @media (max-width: 992px) {
              padding: 2px 8px;
              font-size: 12px;
            }
            @media (max-width: 768px) {
              font-size: 10px;
            }
            @media (max-width: 455px) {
              font-size: 8px;
            }
          }

          .content-most-circle {
            margin: 0 8px;
            @media (max-width: 768px) {
              margin: 0 5px;
            }
          }
        }
      }
    }
  }
`

export const SliderBlog = styled(Slider)`

  height: 600px;
  @media (max-width: 992px) {
    height: 470px;
  }
  @media (max-width: 768px) {
    height: 435px;
  }
  @media (max-width: 429px) {
    height: 400px;
  }

  .slider-wrap-image {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -2;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .slick-list {
    height: 100%;
    border-radius: 16px;

    .slick-track {
      height: 100%;

      .slick-slide {
        & > div {
          height: 100%;

          .slider-item {
            height: 100%;
            display: flex !important;
            flex-direction: column;
            justify-content: space-between;

            &:after {
              content: '';
              width: 100%;
              height: 100%;
              top: 0;
              lefT: 0;
              position: absolute;
              z-index: -1;
              background: rgb(72, 92, 165);
              background: linear-gradient(180deg, rgba(72, 92, 165, 1) 0%, rgba(72, 92, 165, 0.42370451598608194) 100%);
            }
          }
        }
      }
    }
  }

  .slick-arrow {
    display: none !important;
  }

  .slick-dots {
    bottom: auto;

    ul {
      li {
        width: auto;
        height: auto;

        button {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #141414;
          opacity: 0.15;
          transition: 0.5s;

          &:before {
            display: none;
          }
        }

        &.slick-active {
          button {
            width: 64px;
            opacity: 1;
            border-radius: 8px;
          }
        }
      }

    }
  }

  .slider-item {
    padding: 57px 322px 35px 78px;
    @media (max-width: 992px) {
      padding: 30px 40px;
    }
    @media (max-width: 429px) {
      padding: 20px 25px;
    }

    .slider-item-info {
      .info-title {
        font-weight: 700;
        font-size: 32px;
        line-height: 39px;
        color: #ffffff;
        margin-bottom: 15px;
        @media (max-width: 992px) {
          font-size: 28px;
          line-height: 34px;
        }
        @media (max-width: 768px) {
          font-size: 26px;
          line-height: 32px;
        }
      }

      .info-desc {
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
        color: #ffffff;
        opacity: 0.7;
        margin-bottom: 40px;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        @media (max-width: 992px) {
          font-size: 14px;
          line-height: 24px;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          font-size: 12px;
          line-height: 22px;
        }
      }

      a {
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        color: #141414;
        text-decoration: none;
        padding: 16px 54px 14px 54px;
        display: inline-block;
        background: #FFFFFF;
        border-radius: 5px;
        @media (max-width: 992px) {
          font-size: 14px;
          line-height: 18px;
          padding: 12px 40px;
        }
        @media (max-width: 768px) {
          padding: 10px 32px;
        }
      }
    }

    .slider-item-author {
      display: flex;

      .author-image {
        display: flex;
        margin-right: 15px;

        .author-img {
          width: 72px;
          height: 72px;
          @media (max-width: 992px) {
            width: 60px;
            height: 60px;
          }
          @media (max-width: 768px) {
            width: 45px;
            height: 45px;
          }

          &:first-child {
            z-index: 111;
          }

          &:not(:first-child) {
            margin-left: -20px;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }
      }

      .author-info {
        .block-name {
          display: flex;

          p {

            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: #ffffff;
            white-space: nowrap;
            margin-bottom: 10px;
            @media (max-width: 992px) {
              width: 450px;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            @media (max-width: 768px) {
              width: 300px;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            @media (max-width: 425px) {
              width: 200px;
              text-overflow: ellipsis;
              overflow: hidden;
            }

            @media (max-width: 992px) {
              font-size: 18px;
              line-height: 20px;
            }
            @media (max-width: 768px) {
              font-size: 16px;
              line-height: 18px;
              margin-bottom: 7px;
            }
          }
        }

        .info-created {
          color: #fff;
          opacity: .7;
          font-size: 16px;
          @media (max-width: 992px) {
            font-size: 14px;
          }
          @media (max-width: 768px) {
            font-size: 12px;
          }
        }
      }
    }
  }
`

export const PhotoBlock = styled(Row)`
  margin-top: 55px;

  .photoBlock-item {
    .item-photo {
      width: 100%;
      height: 200px;
      margin-bottom: 15px;
      cursor: pointer;
      @media (max-width: 768px) {
        height: 150px;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 16px;
        object-fit: cover;
      }
    }

    .blog-default-image {
      height: 204px;
      background: darkgrey;
      opacity: 0.1;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;

      @media (max-width: 992px) {
        margin-top: 15px;
      }
      @media (max-width: 768px) {
        height: 180px;
      }

      img {
        width: 78px;
        height: 78px;
        object-fit: cover;
        border-radius: 16px;
      }
    }

    .item-info {
      display: flex;
      align-items: center;

      .info-date {
        font-weight: 400;
        font-size: 14px;
        line-height: 32px;
        color: #141414;
        opacity: 0.7;
        @media (max-width: 768px) {
          font-size: 11px;
          line-height: 28px;
        }
      }

      .info-circle {
        margin: 0 8px;
      }

      .info-tags {
        span {
          background: #FFFFFF;
          border: 1px solid rgba(17, 17, 17, 0.2);
          box-sizing: border-box;
          border-radius: 50px;
          font-weight: 400;
          font-size: 14px;
          color: #111111;
          padding: 4px 12px;
          cursor: pointer;
          margin-right: 8px;
          @media (max-width: 768px) {
            padding: 2px 8px;
            font-size: 12px;
          }
        }
      }
    }
  }
`
