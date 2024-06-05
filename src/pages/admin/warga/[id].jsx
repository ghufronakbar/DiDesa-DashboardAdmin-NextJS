import { DetailWarga } from "../../../component/detail/DetailWarga";
import { withAuth } from "../../../lib/authorizationAdmin";

const WargaID = () => {
  return (
    <>
      <DetailWarga gap={8} />
    </>
  );
};

export default withAuth(WargaID);
