import { DetailPemilihanKepalaDesaID } from "../../../component/detail/DetailPemilihanKepalaDesa";
import { withAuth } from "../../../lib/authorizationAdmin";

const PemilihanKepalaDesaID = () => {
  return (
    <>
      <DetailPemilihanKepalaDesaID gap={8} />
    </>
  );
};

export default withAuth(PemilihanKepalaDesaID);
