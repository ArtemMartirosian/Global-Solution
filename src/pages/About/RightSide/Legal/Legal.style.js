import styled from "styled-components";

export const SSVacancy = styled.section`
  width: 100%;

  h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    line-height: 120%;
  }

  p {
    font-size: 16px;
    line-height: 160%;
    margin: 0;
  }

  .common-info__wrapper {
    display: flex;
    align-items: center;
    gap: 32px;
    margin: 16px 0;

    img {
      flex: 0 1 50%;
      height: 360px;
      width: 50%;
      object-fit: cover;
      border-radius: 8px;
    }

    .wrapper__info {
      flex: 0 1 50%;

      h2 {
        margin-bottom: 8px;
      }
    }

    &:nth-child(even) {
      flex-direction: row-reverse;
    }
  }

  .common-info__values {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 16px;
    margin: 16px 0;

    .values__wrapper {
      padding: 16px;
      border: 1px solid #e6e6e6;
      border-radius: 8px;

      svg {
        background-color: #0d3664;
        padding: 10px;
        border-radius: 50%;
        box-sizing: content-box;
        margin-bottom: 16px;
      }

      p {
        font-size: 14px;
        line-height: 120%;
        font-weight: 300;
        color: #7a7a7a;
        font-family: "Montserrat";
      }
    }
  }

  @media (max-width: 768px) {
    .common-info__wrapper {
      flex-direction: column;
    }
  }
`;
