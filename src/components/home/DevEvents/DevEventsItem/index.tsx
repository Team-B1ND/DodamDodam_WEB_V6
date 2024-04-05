import dateTransform from "@src/util/transform/dateTransform";
import * as S from "./style";
import NoImageImage from "@src/assets/images/common/noImage.svg";
import dataTransform from "@src/util/transform/dataTransform";
import { DevEvent } from "@src/types/devEvent/devEvent.type";

interface Props {
  data: DevEvent;
}

const DevEventsItem = ({ data }: Props) => {
  const DevEventData = dataTransform.devEventTypeTransform(data.eventType);

  const redirect = () => {
    window.open(data.link);
  };

  return (
    <S.DevEventsItemContainer onClick={redirect}>
      <S.DevEventsItemImgWrap>
        <S.DevEventsItemImg src={DevEventData.image || NoImageImage} />
        <S.DevEventsItemDate>
          {`${dateTransform.period(data.startDate)}`}
          {dateTransform.period(data.startDate) ===
          dateTransform.period(data.endDate)
            ? null
            : `~${dateTransform.period(data.endDate)}`}
        </S.DevEventsItemDate>
      </S.DevEventsItemImgWrap>
      <S.DevEventsItemContentWrap>
        <S.DevEventsItemTitle>{data.title}</S.DevEventsItemTitle>
        <S.DevEventsItemOrganization>
          {data.organization}
        </S.DevEventsItemOrganization>
        <S.DevEventsItemLabel borderColor={DevEventData.color}>
          {DevEventData.name}
        </S.DevEventsItemLabel>
      </S.DevEventsItemContentWrap>
    </S.DevEventsItemContainer>
  );
};

export default DevEventsItem;
