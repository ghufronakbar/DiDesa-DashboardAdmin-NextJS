import { TableBerita } from "../../../component/table/TableBerita";
import { withAuth } from "../../../lib/authorizationAdmin";
const Berita = () => {
  return (
    <>
      <TableBerita gap={8} />
    </>
  );
};

export default withAuth(Berita);
