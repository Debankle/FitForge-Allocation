import { useState, useEffect } from "react";
import readXlsxFile, { readSheetNames } from "read-excel-file";

interface Props {
  file: File;
}

function FileBox(props: Props) {
  const [sheetNames, setSheetNames] = useState<string[]>([]);

  useEffect(() => {
    readSheetNames(props.file).then((names) => {
      setSheetNames(names);
    });
  }, [props.file]);

  return (
    <div className="bg-red-400 p-2 m-4 w-full max-w-[200px]">
      {sheetNames.length > 0 ? (
        <div>
          <h1 className="content-center">{props.file.name}</h1>
          {sheetNames.map((name, index) => (
            <div key={index}>{name}</div>
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default FileBox;
