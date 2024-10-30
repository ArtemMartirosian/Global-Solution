import styled from "styled-components";

export const SCAwards = styled.section`
  width: 100%;

  .awards__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    .award {
      flex: 0 1 calc(33.3% - 10.5px);
      border: 1px solid #ddd;

      display: flex;
      flex-direction: column;

      .ant-image {
        flex: 1 1 auto;

        padding: 15px;
        width: 100%;

        background: #eff5fd;
        transition: 0.6s;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: 0.6s;
        }

        &:hover {
          background-color: #0d3664;

          & img {
            transform: scale(0.95);
          }
        }

        .ant-image-mask {
          cursor: zoom-in;
          opacity: 0 !important;
        }
      }

      .award__desc {
        flex: 0 1 30%;
        padding: 20px;
        text-align: left;

        h6 {
          font-weight: bold;
        }

        p {
          color: #6c757d;
          margin-bottom: 0;
          font-size: 13px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    .awards__wrapper {
      flex-direction: column;

      .award {
        flex: 0 0 auto;

        .ant-image {
          flex: 0 0 80%;
          height: 80%;
        }

        .award__desc {
          flex: 0 0 20%;
        }
      }
    }
  }
`;
