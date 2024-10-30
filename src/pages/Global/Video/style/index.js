import styled from "styled-components";
import {Row} from "antd";

export const VideoBlock = styled(Row) `
margin-top: 45px!important;
  margin-bottom: 25px!important;
  .videoList-item {
    .item-media {
      position: relative;
      height: 200px;
      margin-bottom: 15px;
      @media(max-width: 768px) {
        height: 150px;
      }
      .item-media-video {
        width: 100%;
        height: 100%;
        border-radius: 16px;
        overflow: hidden;
        &.default-video{
          background: grey;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 50%;
            height: 50%;
            object-fit: contain;
          }
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          
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
        @media(max-width: 992px) {
          margin-top: 15px;
        }
        @media(max-width: 768px) {
          height: 180px;
        }
        img {
          width: 78px;
          height: 78px;
          object-fit: cover;
        }
      }
      .item-media-time {
        position: absolute;
        right: 8px;
        bottom: 12px;
        font-weight: 500;
        font-size: 16px;
        color: #ffffff;
        background-color: #444444;
        padding: 0 4px;
        border-radius: 6px;
        @media(max-width: 429px) {
          font-size: 14px;
        }
      }
    }
    .item-media-info {
      &>a {
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        color: #141414;
        margin-bottom: 15px;
        text-decoration: none;
        display: block;
        @media(max-width: 768px) {
          font-size: 20px;
          line-height: 24px;
          margin-bottom: 10px;
        }
      }
      .info-author {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        @media(max-width: 768px) {
          margin-bottom: 5px;
        }
        .author-image {
          display: flex;
          margin-right: 15px;
          div {
            width: 32px;
            height: 32px;
            @media(max-width: 768px){
              width: 28px;
              height: 28px;
            }
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
            }
          }
        }
        .author-name {
          display: flex;
          div {
            font-weight: 600;
            font-size: 14px;
            color: #141414;
            @media(max-width: 768px) {
              font-size: 12px;
            }
          }
        }
      }
      .media-date {
        display: flex;
        align-items: center;
        .date-time {
          font-weight: 400;
          font-size: 14px;
          color: #141414;
          opacity: 0.7;
          @media(max-width: 768px) {
            font-size: 12px;
            line-height: 28px;
          }
        }
        .date-circle {
          margin: 0 8px;
        }
        .media-tags {
          display: flex;
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
            @media(max-width: 768px) {
              padding: 2px 8px;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
`

export const BreadCrumbs = styled.div `
  margin: 40px 0;
  display: flex;
  align-items: center;
  @media(max-width: 991px) {
    margin: 20px 0;
  }
  a,p {
    font-weight: 500;
    font-size: 13px;
    line-height: 24px;
    color: #141414;
    text-decoration: none;
    margin: 0;
    transition: 0.5s;
    &:hover {
      color: #3E97C8;
    }
    @media(max-width: 768px) {
      font-size: 9px;
      line-height: 18px;
    }
    &:last-child {
      font-weight: 700;
    }
  }
  
  svg {
    margin: 0 17px;
    @media(max-width: 768px) {
      margin: 0 12px;
    }
  }
`

export const VideoMain = styled.section `
  padding-bottom: 65px;
  .video-player {
    height: 550px;
    @media(max-width: 992px) {
      height: 430px;
    }
    @media(max-width: 768px) {
      height: 300px;
    }
    @media(max-width: 450px) {
      height: 240px;
    }
  }
h4 {
  font-weight: 700;
  font-size: 62px;
  line-height: 88px;
  color: #141414;
  @media(max-width: 991px) {
    font-size: 44px;
    line-height: 56px;
  }
  @media(max-width: 768px) {
    font-size: 32px;
    line-height: 40px;
    margin-top: 10px;
  }
  @media(max-width: 450px) {
    font-size: 24px;
    line-height: 32px;
  }
}
  .videoMain-item {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 24px;
    @media(max-width: 992px) {
      flex-direction: column;
      align-items: start;
    }
    .videoMain-item-block {
      display: flex;
      .block-author {
        width: 64px;
        height: 64px;
        margin-right: 15px;
        @media(max-width: 992px) {
          width: 58px;
          height: 58px;
          margin-right: 12px;
        }
        @media(max-width: 768px) {
          width: 45px;
          height: 45px;
          margin-right: 8px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .block-author-info {
        .info-name {
          font-weight: 600;
          font-size: 16px;
          line-height: 32px;
          color: #141414;
          @media(max-width: 992px) {
            font-size: 14px;
            line-height: 28px;
          }
          @media(max-width: 768px) {
            font-size: 12px;
            line-height: 24px;
          }
        }
        .info-list {
          display: flex;
          align-items: center;
          @media(max-width: 430px){
            flex-wrap: wrap;
          }
          .info-list-date {
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
          .info-list-circle {
            margin: 0 8px;
          }
          .info-list-tags {
            display: flex;
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
                padding: 2px 8px;
                font-size: 12px;
              }
              @media(max-width: 768px) {
                font-size: 10px;
              }
            }
          }
        }
      }
    }
    .video-item-view {
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: #141414;
      opacity: 0.5;
      @media(max-width: 992px) {
        margin-top: 10px;
        font-size: 14px;
        line-height: 24px;
      }
      @media(max-width: 768px) {
        font-size: 12px;
        line-height: 20px;
      }
      svg {
        width: 29px;
        height: 24px;
        margin-right: 14px;
        @media(max-width: 992px) {
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }
        @media(max-width: 768px) {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
  .videoMain-func {
    display: flex;
    justify-content: space-between;
    .func-like {
      button {
        border: none;
        background: transparent;
        outline: none;
        opacity: 0.5;
        padding: 0;
        &[disabled]{
          opacity: .3;
        }
        svg {
          width: 20px;
          height: 20px;
          @media(max-width: 768px) {
            width: 16px;
            height: 16px;
          }
        }
      }
      span {
        margin: 0 20px;
        font-weight: 700;
        font-size: 16px;
        line-height: 28px;
        color: #141414;
        opacity: 0.2;
        &.success {
          color: #16BB7E;
          opacity: 1;
        }
        &.danger {
          color: #A92000;
          opacity: 1;
        }
        @media(max-width: 992px) {
          margin: 0 15px;
        }
        @media(max-width: 768px) {
          margin: 0 12px;
          font-size: 14px;
          line-height: 24px;
        }
      }

    }
    .video-social {
      display: flex;
      a,button {
        display: block;
        margin-left: 20px;
        opacity: 0.5;
        transition: 0.5s;
        @media(max-width: 992px) {
          width: 24px;
          height: 24px;
        }
        @media(max-width: 768px) {
          width: 20px;
          height: 20px;
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
`



