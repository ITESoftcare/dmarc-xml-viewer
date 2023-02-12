import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { store } from '../reducers/store';
import { formatedObj } from '../utils/misc';
import XMLParser from 'react-xml-parser';

const baseStyle = {
  //   flex: 1,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  // backgroundColor: '#fafafa',
  //   color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

export default function FilePicker() {
  const [myFiles, setMyFiles] = useState([]);
  const { state, dispatch } = useContext(store);
  const onDrop = useCallback(
    acceptedFiles => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles]
  );
  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        'text/xml': ['.xml'],
      },
    });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const processFiles = () => {
    dispatch({ type: 'SET_IS_FILES_PROCESSING', payload: true });
    for (let i = 0; i < acceptedFiles.length; i++) {
      const f = acceptedFiles[i];
      var r = new FileReader();
      r.onload = function (e) {
        var contents = e.target.result;
        var xml = new XMLParser().parseFromString(contents);
        //   console.log(xml);
        let finalData = formatedObj(xml.children);

        dispatch({
          type: 'STORE_FILES',
          payload: {
            id: finalData.report_metadata.report_id,
            range: {
              start: finalData.report_metadata.date_range.begin,
              end: finalData.report_metadata.date_range.end,
            },
            data: finalData,
          },
        });
      };
      r.readAsText(f);
    }
    removeAll();
    dispatch({ type: 'SET_IS_FILES_PROCESSING', payload: false });
  };

  const removeFile = file => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const removeAll = () => {
    setMyFiles([]);
  };
  //   const files = myFiles.map(file => (
  //     <li key={file.path}>
  //       {file.path} - {file.size} bytes <button onClick={removeFile(file)}>Remove File</button>
  //     </li>
  //   ));
  return (
    <section className="wordwrap">
      <Box>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <Typography>Drag 'n' drop some files here, or click to select files</Typography>
          <Button color="info">Select Files</Button>
          {myFiles.length > 0 && (
            <Typography color="gold">{acceptedFiles.length} Files Selected</Typography>
          )}
        </div>
      </Box>
      {myFiles.length > 0 && (
        <Button
          variant="contained"
          disabled={state.isFilesProcessing}
          onClick={processFiles}
          sx={{ mt: 2 }}
          fullWidth
        >
          Process
        </Button>
      )}
      {/* <aside>
        <Typography>Files</Typography>
        <ul style={{ paddingLeft: 0 }}>{files}</ul>
      </aside> */}
    </section>
  );
}
