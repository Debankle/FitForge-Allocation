interface Props {
  file: File;
}

function FileBox(props: Props) {
  const readFile = () => {};

  return (
    <div className="bg-red-400 p-2 m-4 w-full max-w-[200px]">
      <h1 className="content-center">{props.file.name}</h1>
    </div>
  );
}

export default FileBox;
