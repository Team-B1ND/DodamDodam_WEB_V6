import { Flex } from "@src/style/flex";
import { ellipsisLine } from "@src/style/libStyle";
import styled from "styled-components";

export const MyInfoWakeupSongItemContainer = styled.div`
  width: 100%;
  min-height: 70px;

  padding: 0px 19px;
  cursor: pointer;

  ${Flex({
    $alignItems: "center",
    $justifyContent: "center",
    $columnGap: "10px",
  })}

  &:hover {
    opacity: 85%;
  }
`;

export const MyInfoWakeupSongItemImg = styled.img`
  min-width: 65px;
  height: 35px;
  object-fit: cover;
  border-radius: 3px;
`;

export const MyInfoWakeupSongItemInfoWrap = styled.div`
  width: 220px;
  ${Flex({ $flexDirection: "column", $rowGap: "7px" })}
`;

export const MyInfoWakeupSongItemTitle = styled.h1`
  width: 100%;
  line-height: 19px;
  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MyInfoWakeupSongItemSubInfoWrap = styled.div`
  ${Flex({ $alignItems: "center", $justifyContent: "space-between" })}
`;

export const MyInfoWakeupSongItemSubTitle = styled.span`
  line-height: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.contrast2};
  width: 48%;

  ${ellipsisLine(1)}
`;

export const MyInfoWakeupSongItemApproveLabel = styled.div<{
  status: string;
}>`
  min-width: 35px;
  height: 20px;
  border-radius: 10px;
  font-size: 12px;
  color: white;

  background-color: ${({ status }) => status};
  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;
