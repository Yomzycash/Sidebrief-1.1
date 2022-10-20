import React, { useState } from "react";
import { Container, Body, Main } from "./styled";
import TabNavBar from "components/TabNavBar/TabNavBar";
import CommingSoon from "components/ComingSoon";
import CountryCard from "components/cards/CountryCard";
import Stepbar from "components/Indicators/Stepbar";
import Files from "react-butterfiles";
import FileUpload from "components/FileUpload";

const Taxes = () => {
  const [test, setTest] = useState();

  console.log("Testing", test);
  return (
    <Container>
      <TabNavBar />
      <Body>
        <CommingSoon />

        <Stepbar />

        <CountryCard />
        <FileUpload />
        {/* <Files
          multiple={true}
          maxSize="2mb"
          multipleMaxSize="10mb"
          multipleMaxCount={3}
          onSuccess={(files) => setTest({ files })}
          accept={["application/pdf", "image/jpg", "image/jpeg"]}
        >
          {({ browseFiles, getDropZoneProps, getLabelProps }) => (
            <>
              <label {...getLabelProps()}>Your files</label>
              <div
                {...getDropZoneProps({
                  style: {
                    width: 600,
                    minHeight: 200,
                    border: "2px lightgray dashed",
                  },
                })}
              />

              <div>
                Dragging not convenient? Click{" "}
                <button onClick={browseFiles}>here</button> to select files.
              </div>
            </>
          )}
        </Files> */}
      </Body>
    </Container>
  );
};

export default Taxes;
