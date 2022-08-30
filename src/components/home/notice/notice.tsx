import useNotice from "../../../hooks/notice/useNotice";
import * as S from "./style";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";

const Notice = () => {
  const { noticeData, isLoading, noticeIndex, handleNoticeIndex } = useNotice();

  return (
    <S.NoticeContainer>
      <S.NoticeLabel>공지사항</S.NoticeLabel>
      {!isLoading && noticeData && (
        <>
          <S.NoticeChangeButton onClick={() => handleNoticeIndex("left")}>
            <FiChevronLeft />
          </S.NoticeChangeButton>
          <S.NoticeIndex>
            {noticeIndex + 1}/{noticeData?.length}
          </S.NoticeIndex>
          <S.NoticeChangeButton onClick={() => handleNoticeIndex("right")}>
            <FiChevronRight />
          </S.NoticeChangeButton>
          <S.NoticeTitle>{noticeData![noticeIndex]?.title}</S.NoticeTitle>
        </>
      )}
    </S.NoticeContainer>
  );
};

export default Notice;
