import { TableJenisUMKM } from "../../../../component/table/TableJenisUMKM";
import { withAuth } from "../../../../lib/authorizationAdmin";

const JenisUMKM = () => {
  return (
    <>
      <TableJenisUMKM gap={8} />
    </>
  );
};

export default withAuth(JenisUMKM);
