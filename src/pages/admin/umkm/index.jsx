import { TableUMKM } from "../../../component/table/TableUMKM";
import { withAuth } from "../../../lib/authorizationAdmin";

const UMKM = () => {
  return (
    <>
      <TableUMKM gap={8} />
    </>
  );
};
export default withAuth(UMKM);
