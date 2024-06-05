import { FormCalonKetuaAdd } from "../../../../../component/form/FormCalonKetuaAdd";
import { withAuth } from "../../../../../lib/authorizationAdmin";

const AddCalonKetua = () => {
  return (
    <>
      <FormCalonKetuaAdd gap={8} />
    </>
  );
};

export default withAuth(AddCalonKetua);
