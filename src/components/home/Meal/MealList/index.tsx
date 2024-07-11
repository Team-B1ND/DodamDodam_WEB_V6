import dayjs from "dayjs";
import { EMealType } from "@src/enum/meal/meal.enum";
import useMeal from "@src/hooks/meal/useMeal";
import { useRecoilValue } from "recoil";
import { mealDateAtom } from "@src/store/meal/mealStore";
import dateTransform from "@src/util/transform/dateTransform";
import MealItem from "../MealItem";
import MealBreakfastIcon from "@src/assets/icons/meal/morning.png";
import MealLunchIcon from "@src/assets/icons/meal/afternoon.png";
import MealDinnerIcon from "@src/assets/icons/meal/night.png";
import isBetween from "dayjs/plugin/isBetween";
import styled from "styled-components";
import { Flex } from "@src/style/flex";
dayjs.extend(isBetween);

const MealList = () => {
  const { meal } = useMeal();

  const mealDate = useRecoilValue(mealDateAtom);

  const { BREAKFAST, LUNCH, DINNER } = EMealType;
  const currentTime = dateTransform.fullDate().split(" ")[1];
  const currentDate = dayjs(dateTransform.fullDate(mealDate + currentTime));

  return (
    <MealListContainer>
      <MealItem
        mealData={meal?.breakfast!}
        mealType={BREAKFAST}
        mealIconSrc={MealBreakfastIcon}
        isMealTime={
          currentDate.isBetween(
            `${dateTransform.hyphen()} 05:00`,
            `${dateTransform.hyphen()} 07:50`,
            "minute"
          ) && meal?.breakfast! !== null
        }
      />
      <MealItem
        mealData={meal?.lunch!}
        mealType={LUNCH}
        mealIconSrc={MealLunchIcon}
        isMealTime={
          currentDate.isBetween(
            `${dateTransform.hyphen()} 07:50`,
            `${dateTransform.hyphen()} 13:20`,
            "minute"
          ) && meal?.lunch! !== null
        }
      />
      <MealItem
        mealData={meal?.dinner!}
        mealType={DINNER}
        mealIconSrc={MealDinnerIcon}
        isMealTime={
          currentDate.isBetween(
            `${dateTransform.hyphen()} 13:20`,
            `${dateTransform.hyphen()} 19:10`,
            "minute"
          ) && meal?.dinner! !== null
        }
      />
    </MealListContainer>
  );
};

export default MealList;

const MealListContainer = styled.div`
  width: 460px;
  height: 231px;
  ${Flex({ $flexDirection: "column", $justifyContent: "space-between" })}
`;
