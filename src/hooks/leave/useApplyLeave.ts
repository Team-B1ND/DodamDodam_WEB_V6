import dayjs from "dayjs";
import showToast from "@src/lib/toast/toast";
import React, { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import {
  useDeleteApplyLeaveMutation,
  useGetMyLeavesQuery,
  usePostApplyLeaveMutation,
  usePutApplyLeaveMutation,
} from "@src/queries/leave/leave.query";
import { AppliedLeave, ApplyLeave } from "@src/types/leave/leave.type";
import dateTransform from "@src/util/transform/dateTransform";
import { captureException, withScope } from "@sentry/react";

const useApplyLeave = () => {
  const queryClient = useQueryClient();

  const appliedLeaves = useGetMyLeavesQuery({
    suspense: true,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60,
  }).data?.data;

  const postApplyLeaveMutation = usePostApplyLeaveMutation();
  const deleteApplyLeaveMutation = useDeleteApplyLeaveMutation();
  const putApplyLeaveMutation = usePutApplyLeaveMutation();

  const [isFold, setIsFold] = useState(true);
  const [notApprovedLeaves, setNotApprovedLeaves] = useState<AppliedLeave[]>(
    []
  );
  const [leaveData, setLeaveData] = useState<ApplyLeave>({
    startTimeDate: dateTransform.hyphen(),
    startTimeHour: "",
    startTimeMinute: "",
    endTimeDate: dateTransform.hyphen(),
    endTimeHour: "",
    endTimeMinute: "",
    idx: 0,
    reason: "",
  });

  useEffect(() => {
    if (appliedLeaves) {
      const validNotApprovedLeaves = appliedLeaves.filter(
        (leave) => leave.status === "PENDING"
      );
      setNotApprovedLeaves(validNotApprovedLeaves);
    }
  }, [appliedLeaves]);

  const transformNotApproveLeave = (
    notApproveLeave: AppliedLeave
  ): ApplyLeave => {
    const { startAt, endAt, id } = notApproveLeave;

    const validStartDate = dateTransform.fullDate(startAt).slice(0, 10);
    const validStartTime = dateTransform.fullDate(startAt).slice(10).split(":");

    const validEndDate = dateTransform.fullDate(endAt).slice(0, 10);
    const validEndTime = dateTransform.fullDate(endAt).slice(10).split(":");

    return {
      idx: id,
      startTimeDate: validStartDate,
      startTimeHour: validStartTime[0],
      startTimeMinute: validStartTime[1],
      endTimeDate: validEndDate,
      endTimeHour: validEndTime[0],
      endTimeMinute: validEndTime[1],
      ...notApproveLeave,
    };
  };

  useEffect(() => {
    if (isFold) {
      setLeaveData({
        startTimeDate: dateTransform.hyphen(),
        startTimeHour: "",
        startTimeMinute: "",
        endTimeDate: dateTransform.hyphen(),
        endTimeHour: "",
        endTimeMinute: "",
        reason: "",
        idx: 0,
      });
    } else {
      if (notApprovedLeaves.length !== 0) {
        loadNotApprovedLeave(notApprovedLeaves[0].id);
      }
    }
  }, [isFold, notApprovedLeaves]);

  const loadNotApprovedLeave = useCallback(
    (idx: number) => {
      const notApproveLeave: AppliedLeave = appliedLeaves?.find(
        (leave) => leave.id === idx
      )!;

      setLeaveData({
        ...transformNotApproveLeave(notApproveLeave),
        ...notApproveLeave,
      });
    },
    [appliedLeaves]
  );

  const deleteNotApprovedLeave = useCallback(
    async (idx: number) => {
      deleteApplyLeaveMutation.mutateAsync(
        { id: idx + "" },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("leave/getMyLeaves");
            setNotApprovedLeaves((prev) =>
              prev.filter((notApprovePass) => notApprovePass.id !== idx)
            );
            showToast("외박 삭제 성공", "SUCCESS");
          },
          onError: (err, query) => {
            showToast("외박 삭제 실패", "ERROR");
            withScope((scope) => {
              scope.setContext("query", { queryHash: query.id });
              captureException(`${query.id}id  ${err}이유로 외박 삭제 실패`);
            });
          },
        }
      );
    },
    [deleteApplyLeaveMutation, queryClient]
  );

  //datePicker 핸들링 함수
  const handleLeaveDataDate = useCallback((e: Date, scope: "start" | "end") => {
    if (scope === "start") {
      setLeaveData((prev) => ({
        ...prev,
        startTimeDate: dayjs(e).format("YYYY-MM-DD"),
      }));
    } else {
      setLeaveData((prev) => ({
        ...prev,
        endTimeDate: dayjs(e).format("YYYY-MM-DD"),
      }));
    }
  }, []);

  //외박 데이터 핸들링 함수
  const handleLeaveData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLeaveData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  //외박 데이터 사유 핸들링 함수
  const handleLeaveDataReason = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setLeaveData((prev) => ({ ...prev, reason: value }));
    },
    []
  );

  //외박신청 함수
  const submitLeaveData = useCallback(async () => {
    const {
      reason,
      startTimeDate,
      startTimeHour,
      startTimeMinute,
      endTimeDate,
      endTimeHour,
      endTimeMinute,
      idx,
    } = leaveData;

    const validApplyLeave = {
      reason,
      startAt: dayjs(`${startTimeDate}`).format("YYYY-MM-DD"),
      endAt: dayjs(`${endTimeDate}`).format("YYYY-MM-DD"),
    };

    const startTimeIsAfter = dayjs(validApplyLeave.startAt).isAfter(
      dayjs().subtract(1, "day").format("YYYY-MM-DD")
    );

    const endTimeIsAfter = dayjs(validApplyLeave.endAt).isAfter(
      dateTransform.hyphen()
    );

    if (validApplyLeave.reason.trim() === "") {
      showToast("외박 사유를 작성해주세요!", "INFO");
      return;
    }

    if (startTimeDate === endTimeDate) {
      showToast("출발일자와 도착일자가 같아요!", "INFO");
      return;
    }

    if (!startTimeIsAfter) {
      showToast("출발 일자가 잘못되었습니다!", "INFO");
      return;
    }

    if (!endTimeIsAfter) {
      showToast("도착 일자가 잘못되었습니다!", "INFO");
      return;
    }

    if (notApprovedLeaves?.length > 4) {
      showToast("외박신청은 최대 4개까지 가능해요!", "INFO");
      return;
    }
    
    if(/^[^a-zA-Z0-9가-힣]+$/.test(reason)){
      showToast("특수문자만으로 사유를 작성할 수 없습니다!", "INFO");
    return;
    }
    
    if (!reason || reason.replace(/\s+/g, "").length <= 5){
      showToast("사유의 길이를 5자 이상으로 적어주세요!", "INFO")
      return;
    }

    if (reason?.length > 50) {
      showToast("사유의 길이를 50자 이내로 적어주세요!", "INFO");
      return;
    }

    if (postApplyLeaveMutation.isLoading) {
      return;
    }

    if (isFold) {
      postApplyLeaveMutation.mutateAsync(validApplyLeave, {
        onSuccess: () => {
          queryClient.invalidateQueries("leave/getMyLeaves");
          showToast("외박 신청 성공", "SUCCESS");
          for (let key in leaveData) {
            setLeaveData((prev) => ({ ...prev, [key]: "" }));
          }
          setLeaveData((prev) => ({
            ...prev,
            startTimeDate: dateTransform.hyphen(),
            endTimeDate: dateTransform.hyphen(),
          }));
        },
        onError: (err, query) => {
          showToast("외박 신청 실패", "ERROR");
          withScope((scope) => {
            scope.setContext("query", { queryHash: query.reason });
            captureException(
              `${query.reason}한 이유로 신청된 외박이 ${err}이유로 외박 신청 실패`
            );
          });
        },
      });
    } else {
      const leaveIdx = notApprovedLeaves.find(
        (notApproveLeave) => notApproveLeave.id === idx
      )?.id;

      putApplyLeaveMutation.mutateAsync(
        {
          ...validApplyLeave,
          outId: leaveIdx!,
          endAt: "",
          startAt: "",
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("leave/getMyLeaves");
            showToast("외박 수정 성공", "SUCCESS");
          },
          onError: (err, query) => {
            showToast("외박 수정 실패", "ERROR");
            withScope((scope) => {
              scope.setContext("query", { queryHash: query.reason });
              captureException(
                `${query.reason}한 이유로 신청된 외박이 ${err}이유로 외박 수정 실패`
              );
            });
          },
        }
      );
    }
  }, [
    isFold,
    leaveData,
    notApprovedLeaves,
    postApplyLeaveMutation,
    putApplyLeaveMutation,
    queryClient,
  ]);

  return {
    isFold,
    setIsFold,
    notApprovedLeaves,
    loadNotApprovedLeave,
    deleteNotApprovedLeave,
    leaveData,
    handleLeaveData,
    handleLeaveDataReason,
    handleLeaveDataDate,
    submitLeaveData,
  };
};

export default useApplyLeave;
