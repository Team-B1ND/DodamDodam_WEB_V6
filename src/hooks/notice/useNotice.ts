import { useCallback, useEffect, useRef, useState } from "react";
import { useGetNotice } from "../../querys/notice/notice.query";

const useNotice = () => {
  const { data, isLoading } = useGetNotice({
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

  const handleIdxFunc = useRef<typeof handleNoticeIndex>();

  const [noticeIndex, setNoticeIndex] = useState(0);

  const handleNoticeIndex = useCallback(
    (method: "left" | "right") => {
      const notice = data?.data!;

      if (notice.length === 0) {
        return;
      }

      if (method === "left") {
        if (noticeIndex <= 0) {
          setNoticeIndex(notice?.length - 1);
          return;
        }
        setNoticeIndex((prev) => prev - 1);
      } else if (method === "right") {
        if (noticeIndex >= notice?.length - 1) {
          setNoticeIndex(0);
          return;
        }
        setNoticeIndex((prev) => prev + 1);
      }
    },
    [data?.data, noticeIndex]
  );

  useEffect(() => {
    if (data && !isLoading) {
      setNoticeIndex(data.data.length === 0 ? -1 : 0);
    }
  }, [data]);

  useEffect(() => {
    handleIdxFunc.current = handleNoticeIndex;
  }, [handleNoticeIndex]);

  useEffect(() => {
    if (data !== undefined) {
      const noticeTimer = setInterval(
        () => handleIdxFunc.current!("right"),
        4000
      );
      return () => clearInterval(noticeTimer);
    }
  }, [handleNoticeIndex, data]);

  return {
    noticeData: data?.data,
    isLoading,
    noticeIndex,
    handleNoticeIndex,
  };
};

export default useNotice;
