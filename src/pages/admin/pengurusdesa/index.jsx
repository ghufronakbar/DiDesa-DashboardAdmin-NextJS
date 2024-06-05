import { TablePengurusDesa } from "../../../component/table/TablePengurusDesa";
import { withAuth } from "../../../lib/authorizationAdmin";

const PengurusDesa = () => {
  return (
    <>
      <TablePengurusDesa gap={8} />
    </>
  );
};

export default withAuth(PengurusDesa);
