import { useMemo } from "react";
import { GeneralTable } from "components/Tables";
import { compareAsc } from "date-fns";
import { useViewAllComplyByMetaQuery } from "services/complyService";
import { useSelector } from "react-redux";
import { columns } from "../tableColumn";
import { Puff } from "react-loading-icons";
import { Loading } from "../styled";

const AllServices = () => {
  const userMeta = useSelector((state) => state.UserDataReducer.userInfo.id);
  const { data, isLoading } = useViewAllComplyByMetaQuery({
    meta: userMeta,
  });

  const MemoisedGeneralTable = useMemo(() => GeneralTable, []);

  return (
    <>
      {isLoading && (
        <Loading>
          <Puff stroke="#00A2D4" />
        </Loading>
      )}
      {/* //<FeatureTable header={header} body={serviceBody}/> */}
      {data?.length > 0 && (
        <MemoisedGeneralTable
          data={[...data]
            ?.sort((a, b) => compareAsc(new Date(b?.createdAt), new Date(a?.createdAt)))
            .map((comply) => ({
              complyCode: comply.complyCode,
              serviceId: comply.serviceId,
              meta: comply.meta,
              date: comply.updatedAt,
            }))}
          columns={columns}
          normalLastRow
        />
      )}
    </>
  );
};

export default AllServices;
