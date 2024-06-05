import { withAuth } from "../../../lib/authorizationAdmin";
import { FormWargaAdd } from "../../../component/form/FormWargaAdd";

const AddWarga = () => {
  return (
    <>
      <FormWargaAdd gap={8} />
    </>
  );
};
export default withAuth(AddWarga);
