import useApplyPass from "../../../../hooks/apply/useApplyPass";
import { ApplyFormSubmitButton } from "../style";
import ApplyPassForm from "./applyPassForm/applyPassForm";
import ApplyPassNotApprove from "./applyPassNotApprove/applyPassNotApprove";
import { ApplyPassContainer } from "./style";

const ApplyPass = () => {
  const {
    fold,
    setFold,
    notApprovedPasses,
    loadNotApprovedPass,
    deleteNotApprovedPass,
    passData,
    handlePassData,
    handlePassDataReason,
    passDataDate,
    handlePassDataDate,
    submitPassData,
  } = useApplyPass();

  return (
    <ApplyPassContainer>
      <ApplyPassNotApprove
        fold={fold}
        setFold={setFold}
        notApprovedPasses={notApprovedPasses}
        loadNotApprovedPass={loadNotApprovedPass}
        deleteNotApprovedPass={deleteNotApprovedPass}
      />
      <ApplyPassForm
        passData={passData}
        handlePassData={handlePassData}
        isFold={fold}
        passDataDate={passDataDate}
        handlePassDataDate={handlePassDataDate}
        handlePassDataReason={handlePassDataReason}
      />
      {fold ? (
        <ApplyFormSubmitButton onClick={submitPassData}>
          신청
        </ApplyFormSubmitButton>
      ) : (
        <ApplyFormSubmitButton>수정</ApplyFormSubmitButton>
      )}
    </ApplyPassContainer>
  );
};

export default ApplyPass;
