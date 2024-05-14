import { ChangeEvent, useState } from "react";
import readXlsxFile from "read-excel-file";
import Allocator from "../Allocator";

function InputDataComponent() {
  const [files, setFile] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFile(selectedFiles);
      console.log(e.target.files);
    }
  };

  const allocate = () => {
    console.log("poop");
    files.forEach((file) => {
      let bvalue: number[][] = [];
      readXlsxFile(file, { sheet: 1 })
        .then((data) => {
          for (let i = 1; i < data.length; i++) {
            bvalue[i - 1] = [];
            for (let j = 1; j < data[0].length; j++) {
              bvalue[i - 1][j - 1] = data[i][j];
            }
          }
        })
        .then(() => {
          //   const handler = new DataHandler(preference, fit, impact);
          //   console.log(handler.getAllocation());
          let P = [[]];
          let Q = [[]];
          let R: any = [];
          for (let i = 0; i < bvalue[0].length; i++) {
            R[i] = 1;
          }
          console.log(bvalue);
          console.log(Allocator(bvalue, P, Q, R));
        });
    });
  };

  return (
    <>
      <input
        type="file"
        id="input"
        multiple
        onChange={handleFileChange}
      ></input>

      <div>
        {files.map((file, index) => (
          <div key={index}>{`${file.name} - ${file.type}`}</div>
        ))}
      </div>
      <button className="button" onClick={allocate}>
        Allocate
      </button>
    </>
  );
}

export default InputDataComponent;
