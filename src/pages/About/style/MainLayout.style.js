import styled from "styled-components";

export const MainLayout = styled.div`
  min-height: 100vh;
  margin: 32px 0;
  gap: 24px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 294px 1fr;
  }

  .left-side {
    position: sticky;
    top: 32px;
    margin-bottom: 24px;

    @media (min-width: 768px) {
      padding-right: 24px;
      border-right: 1px solid var(--Grey-40, #e6e6e6);
    }

    /* dropdown */
    & > *:last-child {
      @media (min-width: 768px) {
        display: none;
      }
    }
    /* menu */
    & > *:first-child {
      display: none;
      @media (min-width: 768px) {
        display: block;
      }
    }
  }

  .right-side {
    @media (min-width: 768px) {
      padding-right: 24px;
      border-right: 1px solid var(--Grey-40, #e6e6e6);
    }
  }

  h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
  }
`;
