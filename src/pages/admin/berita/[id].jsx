import { FormBeritaEdit } from "../../../component/form/FormBeritaEdit";
import { withAuth } from "../../../lib/authorizationAdmin";
const BeritaID = () => {
  return (
    <>
      <FormBeritaEdit gap={8} />
    </>
  );
};
export default withAuth(BeritaID);
