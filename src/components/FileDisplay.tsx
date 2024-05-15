import FileBox from "./FileBox";

interface Props {
    files: File[];
}

function FileDisplay(props: Props) {
    return (
      <div className="grid grid-cols-5 row-auto">
        {props.files.map((file, index) => (
          <FileBox file={file} key={index} />
        ))}
      </div>
    );
}

export default FileDisplay;