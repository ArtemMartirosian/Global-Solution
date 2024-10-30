import styled from 'styled-components'


export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`

export const Item = styled.div`
  flex: 0 0 auto;
  width: 47%;

  .track__img {
    max-width: 100%;
    height: auto;
  }

  &:last-child {
    background-image: url(${(props) => props.isBlue ? "/images/telegram-pay/trackBgBlue.png" : "/images/globalPay/trackBg.png"});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 408px 320px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 991px) {
    width: 100%;
    &:last-child {
      margin-top: 35px;
    }
  }
  @media (max-width: 575px) {
    &:last-child {
      margin: ${(props) => props.isWeb ? '0' : '15px 0 25px'};
      height: 340px;
      background-size: contain;
      background-position: center center;
    }
  }

`

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #FFFFFF;
  border: 1px solid #EAEAEA;
  border-radius: 50px;
  position: relative;
  width: 400px;
  margin: 0 auto 50px;

  .track__btn {
    border: none;
    flex: 0 0 100%;
    background: none;
    height: 50px;
    z-index: 2;
    color: #141414;
    opacity: 0.3;
    font-weight: 300;
    font-size: 19px;

    outline: none;
    transition: all .2s linear;
    text-align: center;
    font-family: 'Segoe UI', sans-serif;
  }

  .track__btn--active {
    opacity: 1;
    color: #FFFFFF;
    font-weight: 600;
  }

  .track__slide {
    display: block;
    width: 400px;
    position: absolute;
    height: 50px;
    top: 0;
    bottom: 0;
    left: 0;
    background: #EB582F;
    border-radius: 50px;
    transition: all .3s linear;
    @media (max-width: 575px) {
      width: 100%;
    }
  }
  
  

  .track__slide--active {
    left: 50%;
  }

  @media (max-width: 575px) {
    width: 100%;
    margin-bottom: 30px;
  }
`


export const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

export const Category = styled.button`
  flex: 0 0 auto;
  width: 47%;
  margin-bottom: 26px;
  border: none;
  outline: none;
  background: none;
  text-align: center;
  background: #FFFFFF;
  box-shadow: ${(props) => props.isActive ? '0px 0px 8px rgba(46, 100, 255, 0.06), 0px 5px 8px rgba(46, 100, 255, 0.1' : '0px 5px 8px rgba(0, 0, 0, 0.08), 0px 0px 8px rgba(0, 0, 0, 0.04'});
  border-radius: 14px;
  padding: 19px 0;
  font-weight: ${(props) => props.isActive ? '600' : '400'};
  font-size: 18px;
  font-family: 'Segoe UI', sans-serif;
  opacity: ${(props) => props.isActive ? '1' : '0.7'};
  transition: all .1s linear;
  color: ${(props) => props.isActive ? '#81A6F6' : '#141414'};
  //@media(max-width: 575px) {
  //  width: 100%;
  //  margin-bottom: 20px;
  //}
`


export const ActionsWrapper = styled.div`
  display: ${(props) => props.isMobile ? "none" : "flex"};
  justify-content: space-around;
  align-items: center;
  margin-top: 55px;
  flex: 0 0 100%;
  @media (max-width: 991px) {
    display: ${(props) => props.isMobile ? "flex" : "none"};
  }
  @media (max-width: 575px) {
    flex-wrap: wrap;
    margin-top: 15px;
  }
`

export const Action = styled.a`
  font-weight: 600;
  font-size: 17px;
  border-radius: 5px;
  flex: 0 0 auto;
  width: 44%;
  text-decoration: none;
  text-align: center;
  border: 2px solid transparent;
  padding: 13px 0;
  transition: all .2s linear;
  border-color: ${(props) => props.isBlack ? "transparent" : "#EB582F"};
  background: ${(props) => props.isBlack ? '#1D1D1D' : 'transparent'};
  color: ${(props) => props.isBlack ? '#FFFFFF' : '#EB582F'};

  &:hover {
    color: ${(props) => props.isBlack ? '#FFFFFF' : '#FFFFFF'};
    background: ${(props) => props.isBlack ? '#111111' : '#E9532F'};
  }
  &:active{
    color: ${(props) => props.isBlack ? '#FFFFFF' : '#FFFFFF'};
    background: ${(props) => props.isBlack ? '#111111' : '#D64A28'};
  }

  @media (max-width: 575px) {
    display: inline-block;
    width: 270px;
    margin-bottom: 20px;
  }
`

export const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;

  .slick-slide {
    text-align: center;
  }


`

export const ImgWrapper = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;

  @media (max-width: 575px) {
    margin-bottom: ${(props) => props.isWeb ? '0' : '0'};
  }

  img {
    width: ${(props) => props.isWeb ? '440px' : '190px'} !important;
    height: ${(props) => props.isWeb ? "280px" : "400px"} !important;
    max-width: 100%;
    border-radius: 13px;
    margin: 0 auto;
    border: 5px solid ${(props) => props.isBlue ? 'rgba(110, 168, 255, 0.5)' : '#FBDDD5'};
    filter: drop-shadow(0px 5px 8px rgba(222, 192, 184, 0.2)) drop-shadow(0px 0px 8px rgba(222, 192, 184, 0.06));

    @media (max-width: 575px) {
      width: ${(props) => props.isWeb ? '345px' : '161px'} !important;
      height: ${(props) => props.isWeb ? "211px" : "340px"} !important;
    }
  }

  .hide {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }

  .show {
    
  }

`