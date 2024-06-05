import { TableKomentar } from "../../../component/table/TableKomentar";
import { withAuth } from "../../../lib/authorizationAdmin";

const Komentar = ()=> {
  return (
    <>
      <TableKomentar gap={8} />
    </>
  );
}
export default withAuth(Komentar);