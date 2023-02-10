import { useEffect, useState } from "react";
import dateTransform from "../../util/transform/dateTransform";
import { useGetMyPointQuery } from "../../queries/point/point.query";
import { usePostModuleLogMutation } from "../../queries/log/log.query";

const usePoint = () => {
  const [isDormitoryView, setIsDormitoryView] = useState(true); // true은 기숙사, false은 학교

  const postModuleLogMutation = usePostModuleLogMutation();

  const { data: serverMyPointData } = useGetMyPointQuery(
    { year: dateTransform.hyphen().split("-")[0] },
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 60,
    }
  );

  const onChangeView = () => {
    setIsDormitoryView((prev) => {
      if (prev) {
        postModuleLogMutation.mutate({
          moduleName: "메인/상벌점",
          description: "기숙사 상벌점 조회",
        });
      } else {
        postModuleLogMutation.mutate({
          moduleName: "메인/상벌점",
          description: "학교 상벌점 조회",
        });
      }

      return !prev;
    });
  };

  const [schoolPoint, setSchoolPoint] = useState<{
    schoolBonusPoint: number;
    schoolMinusPoint: number;
  }>({
    schoolBonusPoint: 0,
    schoolMinusPoint: 0,
  });

  const [dormitoryPoint, setDormitoryPoint] = useState<{
    dormitoryBonusPoint: number;
    dormitoryMinusPoint: number;
  }>({
    dormitoryBonusPoint: 0,
    dormitoryMinusPoint: 0,
  });

  useEffect(() => {
    if (serverMyPointData) {
      const dormitoryBonusPoint = serverMyPointData.data.domBonus;
      const dormitoryMinusPoint = serverMyPointData.data.domMinus;
      const schoolBonusPoint = serverMyPointData.data.schBonus;
      const schoolMinusPoint = serverMyPointData.data.schMinus;

      setDormitoryPoint({
        dormitoryBonusPoint: dormitoryBonusPoint || 0,
        dormitoryMinusPoint: dormitoryMinusPoint || 0,
      });

      setSchoolPoint({
        schoolBonusPoint: schoolBonusPoint || 0,
        schoolMinusPoint: schoolMinusPoint || 0,
      });
    }
  }, [serverMyPointData]);

  return { isDormitoryView, onChangeView, schoolPoint, dormitoryPoint };
};

export default usePoint;
