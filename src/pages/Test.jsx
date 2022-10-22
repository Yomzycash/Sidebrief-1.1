import React, { useCallback, useMemo, useState } from "react";
import Pagination from "components/Pagination";
import { BusinessesChartCard } from "components/cards";
import { BusinessHomeTable } from "components/Staff/Tables";
import { Header as BusinessDetailHeader } from "containers/BusinessDetail";
import { useDropzone } from "react-dropzone";
import {
  Audio,
  BallTriangle,
  Bars,
  Circles,
  Grid,
  Hearts,
  Oval,
  Puff,
  Rings,
  SpinningCircles,
  TailSpin,
  ThreeDots,
} from "react-loading-icons";

const Test = () => {
  // const [deleted, setDeleted] = useState(false);

  // const baseStyle = {
  //   flex: 1,
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   padding: "20px",
  //   borderWidth: 2,
  //   borderRadius: 2,
  //   borderColor: "#eeeeee",
  //   borderStyle: "dashed",
  //   backgroundColor: "#fafafa",
  //   color: "#bdbdbd",
  //   outline: "none",
  //   transition: "border .24s ease-in-out",
  // };

  // const focusedStyle = {
  //   borderColor: "#2196f3",
  // };

  // const acceptStyle = {
  //   borderColor: "#00e676",
  // };

  // const rejectStyle = {
  //   borderColor: "#ff1744",
  // };

  // const style = useMemo(
  //   () => ({
  //     ...baseStyle,
  //     ...(isFocused ? focusedStyle : {}),
  //     ...(isDragAccept ? acceptStyle : {}),
  //     ...(isDragReject ? rejectStyle : {}),
  //   }),
  //   [isFocused, isDragAccept, isDragReject]
  // );

  // const onDrop = useCallback((acceptedFiles) => {
  //   console.log(acceptedFiles);
  // }, []);

  // const {
  //   acceptedFiles,
  //   fileRejections,
  //   getRootProps,
  //   getInputProps,
  //   inputRef,
  //   isFocused,
  //   isDragAccept,
  //   isDragReject,
  // } = useDropzone({ onDrop });

  // console.log(acceptedFiles);
  // // {console.log(inputRef.current.value)}

  // const handleDelete = () => {
  //   acceptedFiles.splice(0, 1);
  //   setDeleted(true);
  // };
  const analytics = {
    title: "User analytics",
    status1: {
      text: "Total Users",
      total: 825,
      color: "rgba(255, 255, 255, 0.4)",
    },
    status2: {
      text: "Registrations",
      total: 450,
      color: "#ffffff",
    },
  };

  const tableMockData = [
    {
      name: "Slideshow Africa",
      country: "Nigeria",
      date: "12/12/2022",
    },
    {
      name: "Ayomide Africa",
      country: "Nigeria",
      date: "12/12/2022",
    },
    {
      name: "Image Deity Industries",
      country: "Kenya",
      date: "12/12/2022",
    },
  ];

  return (
    <>
      {/* <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <button onClick={handleDelete}>Clear</button> */}
      {/* <Audio stroke="#98ff98" fill="white" width={60} />
      <BallTriangle stroke="#98ff98" fill="white" width={60} />
      <Bars stroke="#98ff98" fill="white" width={60} />
      <Circles stroke="#98ff98" fill="white" width={60} />
      <Grid stroke="#98ff98" fill="white" width={60} />
      <Hearts stroke="#98ff98" fill="white" width={60} /> */}
      <Oval stroke="#0976b5" fill="white" width={24} height={24} />
      <BusinessDetailHeader
        deleteAction={() => console.log("Delete action")}
        searchAndSort={true}
      />
      <BusinessesChartCard staff analytics={analytics} />
      <BusinessHomeTable data={tableMockData} />
      {/* <Puff stroke="#98ff98" fill="white" width={60} />
      <Rings stroke="#98ff98" fill="white" width={60} />
      <SpinningCircles stroke="#98ff98" fill="white" width={60} />
      <TailSpin stroke="#98ff98" fill="white" width={60} />
      <ThreeDots stroke="#98ff98" fill="white" width={60} /> */}
    </>
  );
};

export default Test;
