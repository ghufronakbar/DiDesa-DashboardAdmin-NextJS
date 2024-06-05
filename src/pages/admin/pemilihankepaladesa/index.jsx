import { TablePemilihanKepalaDesa } from "../../../component/table/TablePemilihanKepalaDesa";
import { withAuth } from "../../../lib/authorizationAdmin";

const PemilihanKepalaDesa = () => {
  return (
    <>
      <TablePemilihanKepalaDesa gap={8} />
    </>
  );
};

export default withAuth(PemilihanKepalaDesa);
