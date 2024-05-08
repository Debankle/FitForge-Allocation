import { ChangeEvent, useState } from "react";

function InputDataComponent() {
  const [files, setFile] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFile(selectedFiles);
      console.log(e.target.files);
    }
  };

  return (
    <>
      <input type="file" multiple onChange={handleFileChange}></input>

    <div>
        {files.map((file, index) => (
            <div key={index}>{`${file.name} - ${file.type}`}</div>
        ))}
    </div>
    </>
  );
}

export default InputDataComponent;
