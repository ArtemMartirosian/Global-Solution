import styled from 'styled-components'



const VisaStyles = styled.section`
  padding: 60px 30px;
  height: 600px;
  background: #F8FBFF;
  @media (max-width: 991px) {
    height: auto;
  }
  @media (max-width: 768px) {
    padding: 40px 30px;
    height: auto;
  }

  @media (max-width: 575px) {
    padding: 40px 4px;
  }

  box-sizing: border-box;

  h1 {
    color: #1D1D1D;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 50px;

    @media (max-width: 992px) {
      font-size: 28px;
    }
    @media (max-width: 768px) {
      font-size: 24px;
    }
    @media (max-width: 575px) {
      margin-bottom: 30px;
    }
  }

  .rates {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 40px 0 46px;
    flex-wrap: wrap;
    position: relative;

    @media (max-width: 767px) {
      flex-wrap: wrap;
    }
    @media (max-width: 575px) {
      margin-top: 0;
    }

  }


  .rates__block {

    flex: 0 0 38%;

    @media (max-width: 991px) {
    }
    @media (max-width: 767px) {
    }
    @media (max-width: 575px) {
    }
  }

  .rates__item {
    border-radius: 14px;
    flex: 0 0 364px;
    background: #FFF;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06), 0px 5px 8px 0px rgba(0, 0, 0, 0.15);
    padding: 22px 26px;
    font-family: 'Segoe UI', sans-serif;
    color: #141414;

    @media (max-width: 991px) {
      flex: 0 0 45%;
      margin-bottom: 40px;
    }

    @media (max-width: 767px) {
      flex: 0 0 100%;
      margin-bottom: 0;
      padding: 16px 20px ;
    }
    @media (max-width: 575px) {
    }
  }

  .rates__item--last {
    @media (max-width: 991px) {
      margin-bottom: 40px;
    }
    @media (max-width: 767px) {
      order: 2;
    }
  }

  .rates__info {
    display: flex;
    align-items: center;
    margin-left: 52px;
    flex: 0 0 40%;
    @media (max-width: 767px) {
      margin: 40px 0 60px;
      flex: 0 0 100%;
      justify-content: center;
    }
  }


  .rates__img {
    flex: 0 0 32%;
    text-align: center;
  }


  .rates__example {
    @media (max-width: 767px) {
      order: 1;
    }
  }


  .rates__info svg {
    margin-right: 16px;
    @media (max-width: 991px) {
      width: 50px;
      height: 50px;
    }
    @media (max-width: 575px) {
    }

  }


  .rates__title {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 13px;
    @media (max-width: 575px) {
    font-size: 16px;
    }
    
  }


  .rates__title img {
    margin-right: 10px;

  }


  .rates__text {
    font-size: 20px;
    opacity: .7;
    margin: 0;
    @media (max-width: 575px) {
      font-size: 16px;
    }
  }


  .rates__commision {
    margin-left: 16px;
    @media (max-width: 575px) {
      margin-left: 8px;
    }
  }


  .rates__card-type {
    font-size: 20px;
    margin: 0;
    color: #727271;
    text-transform: lowercase;
    @media (max-width: 1199px) {
      font-size: 16px;
    }
  }


  .rates__percent {
    font-size: 40px;
    font-weight: 700;
    color: #181818;

    margin: 0;
    @media (max-width: 1199px) {
      width: 100%;
      font-size: 30px;
    }
  }

  .rates__img {
    margin-top: 30px;
    @media (max-width: 767px) {
      order: 3;
      flex: 0 0 100%;
      text-align: center;
      margin-top: 0;
    }
  }


  .rates__img img {
    max-width: 100%;
    height: auto;
  }


  .rates__example {
    height: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    align-items: center;
    background-image: url("/images/globalPay/example-line.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;

    @media (max-width: 991px) {
      background-image: none;
      height: auto;
    }
    @media (max-width: 767px) {
      order: 2;
      flex: 0 0 100%;
      justify-content: flex-start;
      display: none;
    }
  }


  .rates__example-btn {
    border-radius: 6px;
    background: #E9532F;
    color: #ffffff;
    padding: 4px 12px 6px 12px;
    font-size: 18px;
    font-weight: 700;
  }
`




export {VisaStyles}