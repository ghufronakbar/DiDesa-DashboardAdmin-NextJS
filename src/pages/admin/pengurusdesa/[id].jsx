import { DetailPengurusDesa } from "../../../component/detail/DetailPengurusDesa";
import { withAuth } from "../../../lib/authorizationAdmin";

const PengurusDesaId = () => {
  return (
    <>
      <DetailPengurusDesa gap={8} />
    </>
  );
};

export default withAuth(PengurusDesaId);
