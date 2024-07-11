import styled from "styled-components";
import { skeletonAnimtaion } from "@b1nd/b1nd-styled-components-util";
import { Flex } from "@src/style/flex";

const MyInfoWakeupSongListFallback = () => {
  return (
    <Container>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Item key={idx} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 20px 0px;
  ${Flex({ $flexDirection: "column", $alignItems: "center", $rowGap: "34px" })}
`;

const Item = styled.div`
  width: calc(100% - 38px);
  min-height: 42px;
  ${skeletonAnimtaion}
`;

export default MyInfoWakeupSongListFallback;
