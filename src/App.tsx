import AllocationComponent from "./components/AllocationComponent";
import InputDataComponent from "./components/InputDataComponent";

function App() {
  return (
    <>
      <h1 className="text-blue-500 text-center">Allocation Tool</h1>
      <InputDataComponent />
      <AllocationComponent />
    </>
  );
}

export default App;
