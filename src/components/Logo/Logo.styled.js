import styled from 'styled-components';

export const LogoContainer = styled.div`
  display: flex;

  @media screen and (min-width: 768px) {
    align-items: center;
    width: 162px;
  }

  @media screen and (min-width: 1280px) {
    align-items: flex-end;
    width: 167px;
  }
`;

export const LogoIcon = styled.img`
  width: 47px;
  height: 44px;

  @media screen and (min-width: 1280px) {
    width: 70px;
    height: 66px;
  }
`;

export const LogoText = styled.img`
  display: none;

  @media screen and (min-width: 768px) {
    display: inline-block;
    margin-left: 10px;
  }

  @media screen and (min-width: 1280px) {
    margin-left: -10px;
  }
`;
