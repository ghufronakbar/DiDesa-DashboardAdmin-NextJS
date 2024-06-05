import { TableUMKM } from "../../../component/table/TableUMKM";
import { withAuth } from "../../../lib/authorizationAdmin";

function UMKM() {
  return (
    <>
      <TableUMKM gap={8} />
    </>
  );
}
export default withAuth(UMKM);
