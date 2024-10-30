import styled from "styled-components";

export const SCManagement = styled.section`
  width: 100%;

  h3 {
    font-size: 16px;
    font-weight: 600;
  }

  .management__wrapper {
    display: grid;
    gap: 15px;
    margin-bottom: 16px;
    grid-template-columns: repeat(4, 1fr);

    .manager {
      border-radius: 12px;
      border: 1px solid #e6e6e6;
      overflow: hidden;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &__img {
        flex: 0 1 70%;
        background: linear-gradient(0deg, #f9f9f9 0%, #f9f9f9 100%), #fff;
        overflow: hidden;

        img {
          max-width: 100%;
          height: 150%;
          object-fit: cover;
          object-position: 50% 50%;
        }

        @media (max-width: 1200px) {
          flex: 0 0 60%;
        }
      }

      &__desc {
        flex: 0 1 30%;
        padding: 12px;

        h3 {
          margin-bottom: 8px;
        }

        p {
          margin: 0;
          font-size: 14px;
          font-weight: 300;
          color: #4d4d4d;
        }

        @media (max-width: 1200px) {
          flex: 0 0 40%;
        }
      }
    }
  }

  @media (max-width: 992px) {
    .management__wrapper {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 320px);

      .manager {
        &__img {
          img {
            height: 180%;
          }
        }
      }
    }
  }

  @media (max-width: 576px) {
    .management__wrapper {
      .manager {
        &__img {
          img {
            height: 150%;
          }
        }
      }
    }
  }
`;
