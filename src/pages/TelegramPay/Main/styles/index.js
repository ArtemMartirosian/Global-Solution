import styled from "styled-components";
import { Modal, Tooltip } from "antd";
import { Section } from "../Main";

export const BaseSection = styled.section`
  padding-top: ${(props) => (props.pt !== undefined ? props.pt : 60)}px;
  padding-bottom: ${(props) => (props.pb !== undefined ? props.pb : 60)}px;
  background-color: ${(props) => props.bgcolor};
  overflow: hidden;
  color: #141414;

  .section-title {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 50px;
    margin-bottom: 40px;
    color: #141414;

    @media (min-width: 768px) {
      font-size: 28px;
    }

    @media (min-width: 992px) {
      font-size: 32px;
    }
  }
`;

export const AnimatedArrow = styled.div`
  pointer-events: none;
  .line1 {
    stroke-dasharray: 150;
    stroke-dashoffset: 150;
  }

  .line2 {
    stroke-dasharray: 150;
    stroke-dashoffset: 150;
  }
  span {
    opacity: 0;
  }

  &.active,
  .animate & {
    .line1 {
      animation: draw 0.5s ease-in forwards;
    }

    .line2 {
      animation: draw 0.5s ease-in forwards;
      animation-delay: 0.3s;
    }

    span {
      animation: fadeOut 0.5s linear forwards;
      animation-delay: 0.4s;
    }
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes fadeOut {
    to {
      opacity: 1;
    }
  }
`;

export const FloatingCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: -1px -1px 4px rgba(0, 68, 255, 0.04),
    7px 19px 39px rgba(0, 68, 255, 0.1);
  position: absolute;
  display: flex;

  .floating-card__hint {
    position: absolute;
    span {
      position: absolute;
      font-weight: 350;
      font-size: 14px;
      line-height: 20px;
      color: #5a5a5a;
      white-space: nowrap;
    }
    svg {
    }
  }

  &.product-card {
    right: 50%;
    margin-right: 215px;
    bottom: 365px;
    padding: 14px;

    .floating-card__hint {
      bottom: 100%;
      margin-bottom: 19px;
      left: 135px;
      span {
        transform: rotate(39deg);
        left: 69px;
        top: -9px;
      }
    }
  }

  .product-card {
    &__image {
    }
    &__info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 5px 0 12px 22px;
    }
    &__title {
      font-size: 16px;
      line-height: 21px;
      font-weight: 600;
      color: #141414;
    }
    &__price {
      font-size: 24px;
      line-height: 32px;
      font-weight: 700;
      color: #77b730;
    }
    &__options {
      font-size: 20px;
      line-height: 26px;
      font-weight: 600;
      margin-top: auto;
      display: flex;
      align-items: center;
      color: #5a5a5a;
    }

    .floating-card__hint {
      left: 103px;
      bottom: 102px;
      span {
      }
    }
  }
  .color-list {
    display: flex;
    gap: 10px;
    margin-left: 14px;
    &__item {
      width: 30px;
      height: 30px;
      border: 1px solid #f5f5f5;
      border-radius: 50%;
    }
  }

  &.humo-uzcard {
    left: 50%;
    bottom: 427px;
    margin-left: 161px;
    padding: 16px;
    gap: 16px;

    .floating-card__hint {
      left: 103px;
      bottom: 100px;

      span {
        right: 44px;
        transform: rotate(-37deg);
        bottom: 53px;
      }
    }
  }

  &.promote {
    left: 50%;
    bottom: 254px;
    margin-left: 249px;
    padding: 18px 20px;
    gap: 26px;

    .floating-card__hint {
      left: 187px;
      bottom: 91px;
      span {
        transform: rotate(34deg);
        left: 33px;
        bottom: 69px;
      }
    }
  }
  .promote {
    &__stat {
      display: flex;
      align-items: center;
      gap: 6px;
      svg {
        color: #ff8163;
        height: 42px;
        width: 42px;
      }
      span {
        color: #5a5a5a;
        font-size: 20px;
        font-weight: 600;
      }
    }
  }

  &.statistics {
    padding: 20px 21px 20px 22px;
    right: 50%;
    margin-right: 257px;
    bottom: 80px;
    gap: 20px;

    .floating-card__hint {
      left: -7px;
      top: -53px;
      span {
        left: -45px;
        top: -31px;
        transform: rotate(-40deg);
      }
    }
  }
  .statistics {
    &__chart {
    }
    &__legend {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 6px;
      &-item {
        display: flex;
        text-align: left;
        align-items: center;
        gap: 8px;
      }
      &-color {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      &-label {
      }
    }
  }

  &.pay-button {
    left: 50%;
    margin-left: 232px;
    bottom: 86px;
    border-radius: 24px;
    background: #5d9eff;
    padding: 4px 4px 10px;
    box-shadow: none;

    .floating-card__hint {
      right: -63px;
      top: 45px;
      span {
        transform: rotate(-14deg);
        left: 0px;
        bottom: -31px;
      }
    }
  }
  .pay-button {
    &__card {
      background: #fff;
      border-radius: 20px;
      padding: 20px;
      width: 200px;
      font-weight: 600;
      font-size: 20px;
      line-height: 27px;
      text-align: center;
      color: #5a5a5a;
    }
  }
`;

// Section 1
export const Section1 = styled.section`
  // height: 850px;
  overflow: hidden;
  text-align: center;
  padding: 72px 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 20px;
    line-height: 30px;
    font-weight: 400;
    color: #5a5a5a;
    display: flex;
    flex-direction: column;
    gap: 14px;
    strong {
      font-size: 42px;
      line-height: 50px;
      font-weight: 700;
      color: #141414;
    }
    @media (min-width: 768px) {
      font-size: 30px;
      line-height: 40px;

      strong {
        font-size: 62px;
        line-height: 80px;
      }
    }
  }

  .block-intro {
    &__container {
      width: 100%;
      height: 0;
      padding-bottom: calc(640 / 1140 * 100%);
      max-height: 640px;

      @media (min-width: 1140px) {
        padding-bottom: 640px;
      }
    }
    &__image {
      position: relative;
      height: 640px;
      width: 1140px;
      transform-origin: left top;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
    &__bg {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
  }
`;

// Section 2
export const Section2 = styled(Section)`
  .audience {
    &__text {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      position: relative;

      justify-content: center;
      text-align: center;

      .audience__arrow {
        position: absolute;
        right: 0;
        top: 180px;
        transform: rotate(17deg);
      }
      h2 {
        font-size: 32px;
        line-height: 50px;
        font-weight: 700;
        width: 100%;
        color: #141414;
      }
      p {
        font-size: 18px;
        line-height: 28px;
        margin-bottom: 24px;
        color: #5a5a5a;
      }
      @media (min-width: 991px) {
        margin-top: 28px;
        text-align: left;
        justify-content: flex-start;
        h2 {
          margin-bottom: 38px;
        }
        p {
          margin-bottom: 90px;
          max-width: 254px;
        }
      }
    }
  }
`;

export const AudienceMedia = styled.div`
  // height: 450px;
  height: 350px;
  display: flex;
  // gap: 24px;
  gap: 10px;
  jsutify-content: space-between;
  // margin-left: -29px;
  .audience-media {
    &__item {
      // flex-basis: 180px;
      flex-basis: 120px;
      transition: 0.5s;
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      &.active {
        flex-basis: 350px;
        flex-grow: 1;
        box-shadow: -1px -1px 4px rgba(0, 68, 255, 0.04),
          7px 19px 39px rgba(0, 68, 255, 0.1);

        .audience-media__image--main {
          opacity: 0;
        }
        .audience-media__image--active {
          opacity: 1;
        }
      }
    }
    &__image {
      height: 100%;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      transition: opacity 0.5s;

      &--main {
        opacity: 1;
      }
      &--active {
        opacity: 0;
        border: 6px solid #eff5ff;
        border-radius: 20px;
        top: 34px;
        max-width: 250px;
        width: 90%;
        height: auto;
      }
    }
    &__label {
      font-weight: 700;
      font-size: 18px;
      line-height: 28px;
      text-transform: uppercase;
      color: #5a5a5a;
      transform: rotate(-90deg);
      position: absolute;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(3px);
      border-radius: 0 0 10px 10px;
      // padding: 15px 20px;
      padding: 5px 10px;
      left: 0;
      bottom: -13px;
      transform-origin: left top;
    }
  }
  @media (min-width: 576px) {
    height: 400px;
  }
  @media (min-width: 768px) {
    height: 450px;
    gap: 24px;
    .audience-media {
      &__item {
        flex-basis: 180px;
      }
      &__label {
        padding: 15px 20px;
      }
    }
  }
`;

// Section 3, 4, 5, 6
export const Section3 = styled(Section)`
  position: relative;

  .row {
    + .row {
      margin-top: 60px;
    }
  }

  .frame {
    position: relative;
    max-width: 350px;
    width: 75vw;
    height: 480px;
    background: #fedc94;
    box-shadow: -1px -1px 4px rgba(0, 68, 255, 0.04),
      7px 19px 39px rgba(0, 68, 255, 0.1);
    border-radius: 22px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;

    &-container {
      height: 600px;
      display: flex;
      justify-content: center;
      position: relative;

      .frame {
        position: absolute;
        opacity: 0;
        transition: opacity 1s, transform 0.5s;
        // top: 50%;
        // transform: translateY(-50%);
        &.active {
          opacity: 1;
          z-index: 10;
          &.animate {
            .frame__icon {
              transform: scale(1);
              // transition: 0.1s;
            }
          }
        }
      }
    }

    &__icon {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 70px;
      padding: 10px;
      border-radius: 16px;
      background: #fff;
      box-shadow: -1px -1px 4px rgba(0, 68, 255, 0.04),
        7px 19px 39px rgba(0, 68, 255, 0.1);
      color: #6ea8ff;
      transform: scale(0);
      transition: 0.5s;

      &--right-top {
        width: 85px;
        height: 85px;
        top: 21px;
        right: -44px;
        svg {
          width: 65px;
        }
      }
      &--left-top {
        width: 80px;
        height: 80px;
        top: 106px;
        left: -39px;
        svg {
          width: 60px;
        }
      }
      &--left-bottom {
        width: 80px;
        height: 80px;
        top: 255px;
        left: -39px;
        svg {
          width: 60px;
        }
      }
      &--right-bottom {
        top: 305px;
        right: -32px;
        svg {
          width: 50px;
        }
      }
      @media (min-width: 992px) {
        &--right-top {
          right: -64px;
        }
        &--left-top {
          left: -59px;
        }
        &--left-bottom {
          left: -59px;
        }
        &--right-bottom {
          right: -52px;
        }
      }
    }
    &__arrow {
      position: absolute;
      // display: none;

      span {
        font-weight: 300;
        font-size: 14px;
        line-height: 20px;
        color: #5a5a5a;
        position: absolute;
        white-space: nowrap;
      }
    }

    video {
      object-fit: cover;
      object-position: center top;
      border-width: 6px 6px 0px 6px;
      border-style: solid;
      border-color: #eff5ff;
      border-radius: 25px 25px 0px 0px;
      position: absolute;
      width: 80%;
      max-width: 250px;
      top: 44px;
      height: 436px;
    }

    &--1 {
      .frame__arrow {
        left: -28px;
        bottom: 39px;
        span {
          transform: rotate(-47deg);
          left: -63px;
          top: -23px;
        }
      }
    }
    &--2 {
      background: #c9d2ff;
      .frame__arrow {
        top: 69px;
        left: -40px;
        span {
          transform: rotate(39deg);
          left: -50px;
          top: 52px;
        }
      }
    }
    &--3 {
      .frame__arrow {
        top: 132px;
        left: -33px;
        span {
          transform: rotate(-57deg);
          left: -62px;
          top: -25px;
        }
      }
    }
    &--4 {
      background: #c9d2ff;
      .frame__arrow {
        top: 84px;
        left: -43px;
        span {
          transform: rotate(-46deg);
          left: -45px;
          top: -19px;
        }
      }
    }
  }
  .how-it-works {
    &__text {
      display: flex;
      flex-direction: column;
      text-align: center;
      padding-top: 20px;
      max-width: 460px;
      margin: 0 auto;
    }
    &__title {
      font-weight: 700;
      font-size: 32px;
      line-height: 50px;
      color: #141414;
      margin-top: 20px;
    }
    &__description {
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      color: #5a5a5a;
    }
  }

  .animate {
    .frame__icon {
      transform: scale(1);
    }
  }

  @media (min-width: 768px) {
    padding-top: 0;

    .section-title {
      display: none;
    }

    .row {
      + .row {
        padding-top: 60px;
        padding-bottom: 60px;
        margin-top: 0;
        .frame {
          display: none;
        }
      }

      &:nth-child(3) {
        margin-top: calc(-50vh - 180px);
        position: relative;
        z-index: 5;
        height: 480px;
        margin-bottom: 240px;
        .how-it-works__text {
          height: auto;
          position: sticky;
          top: calc((100vh - 480px) / 2 + 120px);
        }
      }

      &:nth-child(6) {
        margin-bottom: -120px;
      }
    }
    .frame {
      &-container {
        padding-top: 60px;
        padding-bottom: 60px;
      }

      &--1 {
        // top: 100vh;
        opacity: 0;
        &.active {
          opacity: 1;
        }
        &.slideUp {
          transform: translateY(0);
          z-index: 0;
        }
        &.slideDown {
          transform: translateY(500px);
          z-index: -10;
        }
      }
    }
    .how-it-works {
      &__title {
        margin: 0;
        padding-top: calc((100vh - 480px) / 2 + 70px);
        padding-bottom: 5px;
        position: sticky;
        top: 0;
        margin-bottom: calc(50vh + 120px);
        background: white;
        box-shadow: 0 5px 15px 10px #fff;
      }
      &__text {
        text-align: left;
        align-items: flex-start;
        height: 360px;
        padding-bottom: 0;
      }
      &__description {
        max-width: 380px;
      }

      &__shadow {
        position: sticky;
        bottom: 0;
        background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 1) 70%,
          rgba(255, 255, 255, 0) 100%
        );
        width: 100%;
        height: calc(50vh - 240px + 60px);
        // height: calc(100vh - 480px);
        transform: translateY(60px);
      }
    }
  }
  @media (min-width: 992px) {
    .how-it-works {
      &__text {
        // padding-bottom: 133px;
        max-width: 460px;
        margin: 0;
      }
      &__title {
        // margin-bottom: 36px;
        // max-width: 460px;
      }
    }
  }
  @media (min-width: 1200px) {
    .how-it-works {
      &__title,
      &__text {
        padding-left: 60px;
      }
    }
  }
`;

// Section 7
export const Section7 = styled(Section)`
  h2 {
    margin-bottom: 48px;
  }
  .row {
    gap: 40px;
    // gap: 80px;
  }
  .data-card {
    min-height: 300px;
    &__description {
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      text-align: center;
      color: #5a5a5a;
    }
    &__action {
      border-radius: 10px;
    }
  }
  @media (min-width: 992px) {
    .row {
      gap: 80px;
    }
    .data-card {
      min-height: 370px;
    }
  }
`;

// Section 8
export const Section8 = styled(Section)`
  h2 {
    margin-bottom: 34px;
  }
  .row {
    gap: 40px;
  }
  .data-card {
    padding: 28px 50px;
    color: #5a5a5a;
    height: auto;
    &__title {
      font-weight: 600;
      font-size: 22px;
      line-height: 28px;
    }
    &__description {
      margin-top: -9px;
      a {
        font-weight: 600;
      }
    }
  }
  @media (min-width: 992px) {
    .row {
      gap: 80px;
    }
  }
`;

// Section 9
export const Section9 = styled(Section)`
  .carousel-wrap {
    height: 320px;
    @media (max-width: 991px) {
      height: auto;
    }
    & > div:first-child > div {
      opacity: 1 !important;

      .slider-3d {
        box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        @media (max-width: 991px) {
          box-shadow: none;
          border-radius: 0;
        }
        &.active {
          border: 5px solid rgba(110, 168, 255, 0.5);
          @media (max-width: 991px) {
            border-color: transparent;
          }
        }
      }
    }

    & > div:last-child {
      display: none;
      @media (max-width: 991px) {
        display: block;
      }
    }
  }

  .demo-version {
    display: flex;
    justify-content: center;
    margin-top: 43px;
    @media (max-width: 768px) {
      margin-top: 25px;
    }
    a {
      width: 270px;
      padding: 15px 0;
      background: #1d1d1d;
      border-radius: 5px;
      font-weight: 600;
      font-size: 17px;
      color: #ffffff;
      text-align: center;
      text-decoration: none;
      &:hover {
        background: #111111;
        box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2),
          0px 0px 8px rgba(0, 0, 0, 0.06);
      }
      @media (max-width: 768px) {
        width: 230px;
        padding: 10px 0;
        font-size: 14px;
      }
    }
  }
`;

// Section 10
export const Section10 = styled(Section)`
  padding: 100px 0;
  .section-summ {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &:first-child {
      + .section-summ {
        border-left: 2px solid rgba(29, 29, 29, 0.1);
      }
    }

    &__info {
      position: relative;
      display: flex;
      margin-bottom: 9px;

      p {
        font-weight: 700;
        font-size: 200px;
        color: #6ea8ff;
        line-height: 200px;
        margin-bottom: 0;
        @media (max-width: 768px) {
          font-size: 100px;
          line-height: 100px;
        }
        @media (max-width: 500px) {
          font-size: 80px;
          line-height: 80px;
        }
      }

      .fw-900 {
        font-weight: 900;
      }

      span {
        position: absolute;
        font-weight: 700;
        font-size: 50px;
        color: #1d1d1d;
        left: 100%;
        top: 10px;
        margin-left: 15px;
        @media (max-width: 768px) {
          font-size: 25px;
          line-height: 47px;
        }
        @media (max-width: 768px) {
          font-size: 22px;
          line-height: 38px;
        }
      }
    }

    &__text {
      text-align: center;

      p {
        font-weight: 400;
        font-size: 22px;
        line-height: 32px;
        color: #141414;
        opacity: 0.7;
        text-align: center;
        @media (max-width: 768px) {
          font-size: 16px;
        }
        @media (max-width: 500px) {
          font-size: 14px;
        }
      }
    }

    .arrow-hint {
      display: none;
      position: absolute;
      left: 163px;
      top: 22px;
      span {
        position: absolute;
        left: -123px;
        top: -28px;
        white-space: nowrap;
        font-weight: 350;
        font-size: 13px;
        line-height: 24px;
        color: #5a5a5a;
      }
    }
  }
  @media (min-width: 768px) {
    .section-summ {
      height: 400px;
      padding-top: 72px;
      &:first-child {
        padding-right: 100px;
        + .section-summ {
          padding-left: 40px;
        }
      }
      .arrow-hint {
        display: block;
      }
    }
  }
`;

// Section 11
export const Section11 = styled(Section)`
  .section-title {
    margin-bottom: 12px;
  }
  .safety-image {
    position: relative;
    text-align: center;

    img {
      max-width: 100%;
    }

    &__hint {
      padding: 7px 14px 11px;
      margin-bottom: 24px;
      white-space: nowrap;
      background: #ffffff;

      box-shadow: -1px -1px 4px rgba(0, 68, 255, 0.04),
        7px 19px 39px rgba(0, 68, 255, 0.1);
      border-radius: 10px;

      letter-spacing: 0.4px;

      &-text {
        color: #5a5a5a;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        line-height: 20px;
        font-weight: 350;
        span {
          opacity: 1;
          margin-bottom: 3px;
        }

        a {
          font-weight: 700;
          color: #6ea8ff;
          pointer-events: auto;
        }
      }

      svg {
        position: absolute;
        left: 38px;
        bottom: 85px;
      }
    }
  }
  .safety-cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
  .safety-card {
    max-width: 460px;
    display: flex;
    gap: 18px;
    align-items: center;
    padding: 12px 20px 12px 14px;
    background: #ffffff;
    box-shadow: 7px 19px 39px rgba(123, 158, 255, 0.1);
    border-radius: 16px;
    cursor: pointer;

    &:nth-child(2) {
      // align-self: flex-end;
    }

    &__image {
      width: 120px;
      height: 86px;
      background: #f4f9ff;
      border-radius: 10px;
      padding: 5px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
      }
    }
    &__info {
    }
    &__title {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 8px;
      color: #141414;
    }
    &__description {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(20, 20, 20, 0.7);
    }
  }

  @media (min-width: 992px) {
    .safety-image {
      &__hint {
        position: absolute;
        left: 375px;
        top: 181px;
      }
    }
    .safety-cards {
      gap: 32px;
    }
    .safety-card {
      &:nth-child(2) {
        align-self: flex-end;
      }
    }
  }
`;

// Section 12
export const Section12 = styled(Section)`
  .section-title {
    margin-bottom: 27px;
  }
  .carousel-documents {
    .slick-list {
      margin: 0 62px;
    }
    .slick-slide {
      padding: 0px 22px;
    }
    .certificate {
      cursor: pointer;
      border: 5px solid #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 390px;
      box-shadow: 0px 3px 8px 1px rgb(0, 0, 0, 0.15);
      border-radius: 10px;
      background-color: #ffffff;
      overflow: hidden;
      margin-bottom: 5px;

      &__image {
        height: 273px;
        overflow: hidden;
        padding: 15px 13px 0;
        background-color: #f4f9ff;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 100%;
          height: auto;
          max-height: 100%;
          object-fit: cover;
          object-position: center top;
        }
      }
      &__info {
        padding: 25px 17px 0;
      }
      &__title {
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        margin-bottom: 6px;
        color: #1d1d1d;
      }
      &__description {
        font-weight: 400;
        font-size: 15px;
        line-height: 26px;
        color: #1d1d1d;
        opacity: 0.7;
      }

      &:hover {
        box-shadow: 0px 3px 8px 1px rgba(46, 100, 255, 0.15);
      }
      & > div {
        @media (max-width: 768px) {
          height: auto;
        }
        .img-documents {
          height: 258px;
          @media (max-width: 768px) {
            height: auto;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .text-documents {
          padding-top: 20px;
          h6 {
            color: #1d1d1d;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
          }

          p {
            color: #1d1d1d;
            font-size: 14px;
            margin-bottom: 0;
          }
        }
      }
    }
  }
`;

// Section 13
export const Section13 = styled(Section)`
  .section-title {
    margin-bottom: 32px;
  }
  .data-card {
    // height: 395px;
    // padding: 28px 28px 32px;
    padding: 20px 10px;
    gap: 24px;
    width: 100%;
    min-height: 0;
    cursor: pointer;
    &__title {
      margin-bottom: auto;
      font-weight: 600;
      font-size: 22px;
      line-height: 28px;
      color: #5a5a5a;
    }
    &__image {
      max-width: 100%;
    }
    &__description {
      color: #5a5a5a;
      svg {
        color: #558aff;
      }
    }
  }
`;

// Section 14
export const Section14 = styled(Section)`
  padding: 60px 0 68px;
  background: #141414;
  @media (max-width: 991px) {
    padding: 30px 0;
  }
  .section-title {
    color: #ffffff;
  }
  .mt-block:last-child a {
    background: #7b65ff;
    &:hover {
      background: #8a77ff;
    }
  }
  @media (max-width: 768px) {
    .mt-block {
      margin-top: 20px;
    }
  }

  .bg_orange {
    background: #e9532f;
    &:hover {
      background: #ff5f38;
    }
  }

  .bg_blue {
    background: #0d3664;
    &:hover {
      background: #144985;
    }
  }

  .services {
    --bs-gutter-x: 2.5rem;
    --bs-gutter-y: 2.5rem;
    @media (max-width: 768px) {
      --bs-gutter-y: 0rem;
    }
    &__link {
      border-radius: 10px;
      display: block;
      padding: 30px;
      text-decoration: none;
      height: 100%;
      @media (max-width: 991px) {
        padding: 20px;
        height: 100%;
      }
      &_top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        @media (max-width: 991px) {
          margin-bottom: 20px;
          img {
            width: 35px;
            height: 35px;
          }
        }
        span {
          display: block;
          @media (max-width: 991px) {
            img {
              width: 25px;
              height: 25px;
            }
          }
        }
      }
      p {
        font-size: 21px;
        line-height: 31px;
        font-weight: 400;
        color: #ffffff;
        margin-bottom: 0;
        width: 270px;
        @media (max-width: 991px) {
          width: auto;
          font-size: 14px;
        }
        @media (max-width: 768px) {
          font-size: 16px;
        }
      }
    }
  }

  .services-button {
    display: flex;
    justify-content: center;
    margin-top: 52px;
    @media (max-width: 991px) {
      margin-top: 40px;
    }
  }
`;

// Section 15
export const Section15 = styled(Section)`
  padding-bottom: 0;
  h2 {
    font-weight: 700;
    font-size: 32px;
    line-height: 50px;
    margin-bottom: 40px;
    color: #141414;
  }
  .carousel-users {
    display: flex;
    .slick-list {
      order: -1;
      height: 200px;
      margin-bottom: 20px;
    }
  }
  .user-info {
    padding-right: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &__heading {
      display: flex;
      flex-direction: column;
      height: 50px;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: center;
      margin-bottom: 26px;
    }
    &__photo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid #fff;
      margin-right: 8px;
    }
    &__name {
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #141414;
    }
    &__bot {
      a {
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        text-decoration-line: underline;
        color: #6ea8ff;
      }
    }
    &__description {
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      color: #5a5a5a;
    }
  }
  .users-selector {
    display: flex;
    align-items: flex-end;
    height: 350px;
    gap: 10px;
    &__item {
      width: 100%;
      height: 100%;
      max-width: 80px;
      max-height: 300px;
      background: #ddd;
      border-radius: 20px 20px 0px 0px;
      position: relative;
      transition: 0.5s;
      cursor: pointer;
      display: flex;
      justify-content: center;

      &.active {
        box-shadow: -1px -1px 4px rgba(0, 68, 255, 0.04),
          7px 19px 39px rgba(0, 68, 255, 0.1);
        max-height: 515px;
        max-width: 376px;

        .users-selector {
          &__avatar {
            display: none;
          }
          &__username {
            opacity: 0;
          }
          &__screenshot {
            display: block;
          }
        }
      }
    }
    &__avatar {
      width: 80px;
      height: 80px;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
      border: 4px solid #fff;
      border-radius: 50%;
    }
    &__username {
      font-weight: 600;
      font-size: 30px;
      line-height: 30px;
      text-decoration-line: underline;
      transform: rotate(-90deg);
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform-origin: center left;
      color: rgba(0, 0, 0, 0.3);
    }
    &__screenshot {
      display: none;
      width: 300px;
      max-width: 200px;
      height: 100%;
      border: 6px solid #eff5ff;
      border-bottom: 0;
      border-radius: 16px 16px 0 0;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        max-width: 248px;
        object-fit: cover;
        object-position: top center;
      }
    }
    @media (min-width: 992px) {
      height: 515px;
      gap: 30px;

      &__item {
        max-width: 150px;
        max-height: 410px;
        padding: 50px 50px 0;
      }
      &__screenshot {
        max-width: 260px;
      }
      &__username {
        bottom: 100px;
      }
    }
  }
`;

export const ToolTipCustom = styled(Tooltip)``;

export const ModalError = styled(Modal)`
  .ant-modal-close {
    display: none;
  }

  .ant-modal-content {
    border-radius: 16px;
    padding: 34px 0px;

    .ant-modal-body {
      display: flex;
      flex-direction: column;
      img {
        margin: 0 auto;
      }

      div {
        margin-top: 30px;
        h2 {
          color: #141414;
          text-align: center;
          font-size: 24px;
          font-weight: 500;
        }

        p {
          color: #141414;
          text-align: center;
          font-size: 18px;
        }
      }

      button {
        background-color: #1d1d1d;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        padding: 15px;
        width: 260px;
        color: #fff;
        margin: 60px auto 0;
        &:hover {
          box-shadow: 0px 5px 8px rgb(0 0 0 / 20%), 0px 0px 8px rgb(0 0 0 / 6%);
        }
      }
    }
  }
`;

export const ModalSuccess = styled(Modal)`
  .warning-text {
    border: 1px solid #FFA51F;
    border-radius: 10px;
    padding: 8px 16px 13px 14px;
    color: rgba(20, 20, 20, 0.7);
    font-weight: 400;
    font-size: 14px;
    display: flex;
    span {
      margin-right: 7px;
      display: block;
    }
  }
  
  .ant-modal-close {
    display: none;
  }

  .ant-modal-content {
    border-radius: 16px;
    padding: 34px 0px;

    .ant-modal-body {
      display: flex;
      flex-direction: column;
      img {
        margin: 0 auto;
      }

      div {
        margin-top: 30px;
        h2 {
          color: #141414;
          text-align: center;
          font-size: 24px;
          font-weight: 500;
        }

        p {
          color: #141414;
          text-align: center;
          font-size: 18px;
          opacity: 0.7;
        }
      }

      button {
        background-color: #1d1d1d;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        padding: 15px;
        width: 260px;
        color: #fff;
        margin: 60px auto 0;
        &:hover {
          box-shadow: 0px 5px 8px rgb(0 0 0 / 20%), 0px 0px 8px rgb(0 0 0 / 6%);
        }
      }
    }
  }
`;

export const ModalForm = styled(Modal)`
  .modal-preloader {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9;
    background: #fff;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 0 0 16px 16px;
    .preloader-img {
      width: 120px;
      height: 120px;
      animation: spin 1s infinite linear;
      margin-bottom: 30px;
      @keyframes spin {
        from {
          transform: rotate(360deg)
        }
        to {
          transform: rotate(0deg);
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    p {
      font-weight: 400;
      font-size: 16px;
      color: #141414;
      opacity: 0.9;
    }
  }
  
  @media (max-width: 556px) {
    .slick-slider {
      button {
        display: none !important;
      }
    }
  }

  .block-example {
    .img-example {
      //border-radius: 20px;
      //border:5px solid #FBDDD5;
      margin-bottom: 36px;
      justify-content: center;

      & img {
        border-radius: 20px;
        border: 5px solid #fbddd5;
        margin-left: 60px;

        &:first-child {
          margin-left: 0;
        }
      }
    }

    & > p {
      font-size: 18px;
      text-align: center;
    }
  }

  .ant-modal-content {
    border-radius: 16px;

    .error-message-server {
      color: #ff1a1a;
    }

    .ant-modal-close {
      top: 9px;
      right: 18px;
    }

    .ant-modal-header {
      border-radius: 16px 16px 0 0;
      padding: 30px 0 19px 30px !important;

      p {
        font-weight: 400;
        font-size: 20px;

        span {
          &:first-child {
            color: #141414;
          }

          &:last-child {
            color: #c2c2c2;
          }
        }
      }

      .ant-modal-title {
        font-size: 20px;
        color: #141414;
      }
    }

    .ant-modal-body {
      padding: 26px 30px 28px;

      .icon-tooltip {
        position: absolute;
        right: 25px;
        top: 38px;
      }

      .ant-form-item-label {
        padding: 0;
      }

      .ant-input:focus {
        box-shadow: 0 0 0 3px #f4f9ff;
        border: 1px solid #a7cdff;
      }

      .ant-form-item-has-error
        :not(.ant-input-disabled):not(.ant-input-borderless).ant-input {
        box-shadow: 0 0 0 3px #fff0ef;
        border: 1px solid #fda29b;
      }

      .ant-form-item-explain-connected {
        padding-top: 8px;
      }

      .ant-input-textarea {
        &::after {
          margin-top: 5px;
        }
      }

      .ant-checkbox-checked::after {
        border: none !important;
      }

      .ant-checkbox-inner {
        border: 2px solid #d9d9d9;
      }

      .ant-checkbox-checked .ant-checkbox-inner {
        background-color: #ea5430 !important;
        border: none;
        width: 20px;
        height: 20px;
        border-radius: 5px;

        &::after {
          border: none;
          transform: none;
          top: 18%;
          width: 11px;
          height: 13px;
          background-image: url("data:image/svg+xml,%3Csvg fill='%23fff' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' width='11px' height='13px' viewBox='0 0 122.877 101.052' enable-background='new 0 0 122.877 101.052' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M4.43,63.63c-2.869-2.755-4.352-6.42-4.427-10.11c-0.074-3.689,1.261-7.412,4.015-10.281 c2.752-2.867,6.417-4.351,10.106-4.425c3.691-0.076,7.412,1.255,10.283,4.012l24.787,23.851L98.543,3.989l1.768,1.349l-1.77-1.355 c0.141-0.183,0.301-0.339,0.479-0.466c2.936-2.543,6.621-3.691,10.223-3.495V0.018l0.176,0.016c3.623,0.24,7.162,1.85,9.775,4.766 c2.658,2.965,3.863,6.731,3.662,10.412h0.004l-0.016,0.176c-0.236,3.558-1.791,7.035-4.609,9.632l-59.224,72.09l0.004,0.004 c-0.111,0.141-0.236,0.262-0.372,0.368c-2.773,2.435-6.275,3.629-9.757,3.569c-3.511-0.061-7.015-1.396-9.741-4.016L4.43,63.63 L4.43,63.63z'/%3E%3C/g%3E%3C/svg%3E");
        }
      }

      .block-chek-list {
        .ant-checkbox-group {
          flex-direction: column;
          display: flex;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #eaecf0;
        }
      }

      .block-row-connects {
        margin-top: 15px;
        align-items: center;
        margin-bottom: 40px;

        & > p {
          font-size: 16px;
          margin-right: 14px;
          margin-bottom: 0;
        }

        & > div {
          @media (max-width: 460px) {
            margin-top: 15px;
          }
        }

        .item-list-connect {
          border: 1px solid #d4e7ff;
          background-color: #f8fbff;
          border-radius: 30px;
          padding: 3px 20px;
          font-size: 16px;
          margin-right: 8px;
        }
      }
      .ant-form-item-required {
        color: rgba(20, 20, 20, 0.9);
      }

      label {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 6px;
        align-items: flex-start;
        color: rgba(20, 20, 20, 0.9);

        &::before {
          line-height: inherit;
        }

        &:hover .ant-checkbox-inner {
          border-color: #d0d5dd;
        }

        .ant-checkbox-inner {
          width: 20px;
          height: 20px;
          border-radius: 5px;

          &::after {
            top: 3% !important;
            left: 1% !important;
            width: 20px !important;
            height: 20px !important;
            background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.8319 5.63864C16.2913 6.09808 16.2913 6.84298 15.8319 7.30242L9.60497 13.5294C8.68609 14.4482 7.19629 14.4482 6.27741 13.5294L4.16812 11.4201C3.70868 10.9606 3.70868 10.2157 4.16812 9.75629C4.62756 9.29685 5.37246 9.29685 5.8319 9.75629L7.94119 11.8656L14.1681 5.63864C14.6276 5.1792 15.3725 5.1792 15.8319 5.63864Z' fill='white'/%3E%3C/svg%3E%0A") !important;
          }
        }
      }

      input,
      textarea {
        border: 1px solid #eaecf0;
        border-radius: 4.8px;
        padding: 8px 16px;
        font-weight: 400;
        font-size: 14px;
        color: #141414;

        &::placeholder {
          font-size: 14px;
          color: #6c757d;
        }
      }

      textarea {
        height: 70px;
        resize: none;
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 260px;
        height: 50px;
        color: #fff;
        border-radius: 8px;
        background-color: #1d1d1d;
        border: none;
        font-weight: 600;
        font-size: 17px;
        line-height: 23px;
        outline: none;

        &:hover:not(:disabled) {
          background: #111111;
          box-shadow: 0px 5px 8px rgb(0 0 0 / 20%), 0px 0px 8px rgb(0 0 0 / 6%);
        }

        &:disabled {
          opacity: 0.3;
        }
      }
    }
  }

  .have-bot-radio {
    .ant-radio-group {
      display: flex;
      gap: 16px;

      label {
        margin-bottom: 0;
      }
    }
    .ant-radio-wrapper {
      .ant-radio {
        display: none;
      }

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 7px 8px;
      margin: 0;

      width: 142px;
      height: 40px;

      border: 1px solid #eaecf0;
      border-radius: 40px;

      .ant-radio + * {
        font-weight: 350;
        font-size: 14px;
        line-height: 24px;
        display: flex;
        align-items: center;
        color: #141414;
      }

      &-checked {
        background: linear-gradient(0deg, #fafcff, #fafcff), #ffffff;
        border: 1px solid #c7d8ff;
      }
    }
  }
`;

export const ButtonCarousel = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  outline: none;
  z-index: 99;

  &.arrow-prev {
    left: -10px;
  }

  &.arrow-next {
    right: -10px;
  }
`;

export const SectionCarouselClients = styled.section`
  padding: 60px 30px;
  background: #f8fbff;
  @media (max-width: 768px) {
    padding: 30px 18px;
  }
  h1 {
    color: #141414;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    @media (max-width: 992px) {
      font-size: 28px;
    }
    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  .carousel-clients {
    margin-top: 16px;

    .block_image {
      @media (max-width: 991px) {
        .client-img {
          width: 300px;
          height: 300px;
          @media (max-width: 768px) {
            width: 250px;
            height: 250px;
            @media (max-width: 500px) {
              width: 100%;
              height: 100%;
            }
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
      & > div img {
        margin: 0 auto;
      }
      span {
        background: #fff;
        padding: 5px 20px;
        font-size: 18px;
        color: #141414;
        border-radius: 8px;
        box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15);
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        font-weight: 500;
        @media (max-width: 991px) {
          padding: 3px 15px;
          font-size: 16px;
        }
        @media (max-width: 500px) {
          padding: 2px 10px;
          font-size: 14px;
        }
      }
    }

    .block_description {
      display: flex;
      padding-left: 60px;
      padding-right: 60px;
      flex-direction: column;
      justify-content: center;
      @media (max-width: 991px) {
        padding: 0 45px;
        @media (max-width: 768px) {
          padding: 0 30px;
        }
        @media (max-width: 500px) {
          padding-right: 0;
          padding-left: 15px;
        }
      }

      .text {
        background: #fff;
        padding: 15px 30px;
        border-radius: 0px 8px 8px 8px;
        font-size: 18px;
        box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15);
        margin-bottom: 34px;
        color: #141414;
        opacity: 0.7;
        @media (max-width: 991px) {
          padding: 12px 18px;
          font-size: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          padding: 10px 15px;
          font-size: 14px;
          margin-bottom: 15px;
        }
        @media (max-width: 500px) {
          padding: 8px 13px;
          font-size: 11px;
          margin-bottom: 10px;
        }
      }
      & > p {
        font-size: 18px;
        margin-bottom: 0;
        font-weight: 500;
        color: #141414;
        @media (max-width: 991px) {
          font-size: 16px;
        }
        @media (max-width: 768px) {
          font-size: 14px;
        }
        @media (max-width: 500px) {
          font-size: 12px;
          margin-bottom: 10px;
        }
      }

      .payments {
        margin-top: 16px;
        @media (max-width: 991px) {
          margin: 0;
        }
        @media (max-width: 500px) {
          margin-top: 5px;
        }
        div {
          margin-right: 20px;
          @media (max-width: 991px) {
            margin-right: 12px;
            width: 45px;
            height: 45px;
            img {
              width: 100%;
              height: 100%;
            }
            @media (max-width: 768px) {
              width: 40px;
              height: 40px;
            }
            @media (max-width: 500px) {
              width: 35px;
              height: 35px;
            }
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
`;

export const PrimaryButton = styled.a.attrs((props) => ({
  href: props.href || "#",
  target: props.target || "_self",
  size: props.size || "large",
  disabled: props.disabled || false,
}))`
  display: flex;
  height: 50px;
  width: ${(props) => (props.size === "small" ? "230px" : "270px")};
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 17px;
  line-height: 23px;
  font-weight: 600;
  color: #fff;
  border-radius: 5px;
  background: ${(props) => (props.disabled ? "#111111" : "#1D1D1D")};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  transition: 0.3s;

  &:hover {
    color: #fff;
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2), 0px 0px 8px rgba(0, 0, 0, 0.06);
    background: #111111;
  }

  &:active {
    background: #111111;
    box-shadow: none;
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background: #e9532f;

  &:hover {
    background: #e9532f;
    box-shadow: 0px 5px 8px rgba(233, 83, 47, 0.2),
      0px 0px 8px rgba(233, 83, 47, 0.06);
  }

  &:active {
    background: #d64a28;
  }
`;

export const OutlinedButton = styled(PrimaryButton)`
  border: 2px solid #ffffff;
  background: transparent;

  &:hover {
    background: #ffffff;
    box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.06),
      0px 5px 8px rgba(255, 255, 255, 0.05);
    color: #1d1d1d;
  }

  &:active {
    background: #f4f4f4;
    box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.06),
      0px 5px 8px rgba(255, 255, 255, 0.05);
  }
`;

export const DataCard = styled.div.attrs((props) => ({
  className: "data-card " + (props.className || ""),
}))`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 30px 45px;
  gap: 30px;
  max-width: 354px;
  min-height: 370px;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15), 0px 0px 8px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  text-align: center;
  position: relative;
  cursor: ${(props) => (props.onCLick ? "pointer" : "default")};

  .data-card {
    &__title {
    }
    &__description {
      a {
        color: #558aff;
      }
    }
    &__action {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      width: 100%;
      height: 100%;
      background: #fff;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: 0.2s;
    }
  }
  &:hover {
    box-shadow: ${(props) =>
    props.hoverColor === "blue"
        ? "0px 0px 8px rgba(122, 175, 255, 0.1), 0px 5px 8px rgba(122, 175, 255, 0.15)"
        : "0px 0px 8px rgba(233, 83, 47, 0.1), 0px 5px 8px rgba(233, 83, 47, 0.15)"};
    .data-card__action {
      opacity: 1;
    }
  }

  .have-bot & {
    padding: 30px;
    .data-card {
      &__title {
        font-weight: 600;
        font-size: 30px;
        line-height: 40px;
        color: rgba(20, 20, 20, 0.9);
      }
      &__media {
        filter: drop-shadow(-1px -1px 4px rgba(0, 68, 255, 0.05))
          drop-shadow(7px 19px 39px rgba(0, 68, 255, 0.13));
        border-radius: 10px;
        margin-bottom: 30px;
      }
      &__description {
        padding: 0 15px;
      }
    }
  }
  .clients & {
  }

  .arrow-hint {
    position: absolute;
    span {
      position: absolute;
      // white-space: nowrap;
      font-weight: 300;
      font-size: 14px;
      line-height: 20px;
      color: #5a5a5a;
    }

    &.position-right {
      right: -92px;
      top: 128px;
      span {
        transform: rotate(41deg);
        right: -58px;
        top: -20px;
      }
    }
    &.position-left {
      left: -89px;
      bottom: 50px;
      span {
        transform: rotate(-35deg);
        left: -65px;
        // top: -22px;
        bottom: 60px;
        width: 100px;
        text-align: center;
      }
    }
  }
`;
