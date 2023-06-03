import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

const SimpleUpload = ({ register, name, unregister, setValue, watch }) => {
  const files = watch(name) || [];
  const onDrop = useCallback(
    (droppedFiles) => {
      console.log(droppedFiles);
      setValue(name, droppedFiles, { shouldValidate: true });
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "image/jpeg": [],
      "image/png": [],
    },
  });
  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  return (
    <div>
      <label htmlFor={name}>
        <div {...getRootProps()}>
          <button type="button">upload a file</button>
          <input
            {...getInputProps({
              multiple: false,
            })}
          />
        </div>
      </label>
      {!!files?.length && (
        <div>
          {files?.map((file) => {
            return (
              <div key={file.name}>
                <p>{file.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SimpleUpload;
