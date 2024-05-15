import { ChangeEvent, useState } from "react";
import readXlsxFile from "read-excel-file";
import Allocator from "../Allocator";
import FileDisplay from './FileDisplay';

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
      let fit: number[][] = [];
      let preference: number[][] = [];
      let impact: number[][] = [];
      console.log(file);
      readXlsxFile(file, { sheet: 1 })
        .then((data) => {
          for (let i = 1; i < data.length; i++) {
            fit[i - 1] = [];
            for (let j = 1; j < data[0].length; j++) {
              fit[i - 1][j - 1] = data[i][j];
            }
          }
        })
        .then(() => {
          readXlsxFile(file, { sheet: 2 })
            .then((data) => {
              for (let i = 1; i < data.length; i++) {
                preference[i - 1] = [];
                for (let j = 1; j < data[0].length; j++) {
                  preference[i - 1][j - 1] = data[i][j];
                }
              }
            })
            .then(() => {
              readXlsxFile(file, { sheet: 3 }).then((data) => {
                for (let i = 1; i < data.length; i++) {
                  impact[i - 1] = [];
                  for (let j = 1; j < data[0].length; j++) {
                    impact[i - 1][j - 1] = data[i][j];
                  }
                }
              });
            });
        })
        .then(() => {
          let P = [[]];
          let Q = [[]];
          let R: any = [];
          for (let i = 0; i < fit[0].length; i++) {
            R[i] = 1;
          }
          let bvalues: number[][] = [];
          for (let i = 0; i < preference.length; i++) {
            // rows
            bvalues[i] = [];
            for (let j = 0; j < preference[0].length; j++) {
              // columns
              bvalues[i][j] = impact[i][j] * (preference[i][j] + fit[i][j]);
            }
          }
          console.log(bvalues);
          console.log(Allocator(bvalues, P, Q, R));
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
        {/* {files.map((file, index) => (
          <div key={index}>{`${file.name} - ${file.type}`}</div>
        ))} */}
        <FileDisplay files={files}/>
      </div>
      
      <button className="button" onClick={allocate}>
        Allocate
      </button>
    </>
  );
}

export default InputDataComponent;
