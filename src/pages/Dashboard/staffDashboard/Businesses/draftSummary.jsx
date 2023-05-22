import { useGetDraftLaunchQuery } from "services/staffService";
import { parseJSON, format, compareDesc } from "date-fns";
import { GeneralTable } from "components/Tables";
import { columns } from "./column";
import { Puff } from "react-loading-icons";
import { Loading } from "./styled";

const DraftSummary = () => {
  const { data, isLoading } = useGetDraftLaunchQuery();

  return (
    <>
      {!isLoading && data.length > 0 ? (
        <GeneralTable
          columns={columns}
          data={[...data]
            .sort((a, b) => compareDesc(parseJSON(a.updatedAt), parseJSON(b.updatedAt)))
            .slice(0, 10)
            .map((reg) => {
              return {
                name: reg.businessNames?.businessName1,
                country: reg?.registrationCountry,
                date: format(parseJSON(reg?.updatedAt), "dd/MM/yyyy"),
              };
            })}
          selectionRow={true}
        />
      ) : (
        <Loading>
          <Puff stroke="#00A2D4" />
        </Loading>
      )}
    </>
  );
};

export default DraftSummary;
