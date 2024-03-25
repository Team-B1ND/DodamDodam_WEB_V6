import styled, { css } from "styled-components";

export const PointContainer = styled.div`
  width: 384px;
  height: 146px;
  color: ${({ theme }) => theme.contrast};
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
  display: flex;
  flex-direction: column;
`;

export const PointWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0px 20px;
`;

export const PointLeftWrap = styled.div`
  width: 287px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PointRightWrap = styled.div`
  width: 95px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 0px;
`;

export const PointCategoryWrap = styled.div`
  display: flex;
  column-gap: 4px;
  justify-content: end;
`;

export const PointCategoryItemWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
  font-size: 12px;
`;

export const PointCategoryItemCircle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 100%;
`;

export const PointChangeButton = styled.button<{ isDormitory: string }>`
  width: 60px;
  height: 25px;
  border-radius: 15px;
  font-size: 12px;
  border: 1px solid rgba(0, 103, 188, 0.85);
  cursor: pointer;
  margin-left: auto;

  ${({ isDormitory }) =>
    isDormitory === "DORMITORY"
      ? css`
          background-color: rgba(0, 103, 188, 0.85);
          color: white;
        `
      : css`
          background: transparent;
          color: rgba(0, 103, 188, 0.85);
        `}
`;
