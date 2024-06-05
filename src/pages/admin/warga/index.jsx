import { TableWarga } from "../../../component/table/TableWarga";
import { withAuth } from "../../../lib/authorizationAdmin";

const Warga = () => {
  return (
    <>
      <TableWarga gap={8} />
    </>
  );
};

export default withAuth(Warga);
