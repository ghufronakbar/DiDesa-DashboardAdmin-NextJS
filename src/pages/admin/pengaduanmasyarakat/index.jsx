import { TablePengaduanMasyarakat } from "../../../component/table/TablePengaduanMasyarakat";
import { withAuth } from "../../../lib/authorizationAdmin";

const PengaduanMasyarakat = () => {
  return (
    <>
      <TablePengaduanMasyarakat gap={8} />
    </>
  );
};

export default withAuth(PengaduanMasyarakat);
