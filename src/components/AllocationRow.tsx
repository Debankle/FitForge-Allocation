import { MouseEventHandler } from "react";

interface Props {
  team: number;
  project: number;
  benefit: number;
  capability: number;
  preference: number;
  impact: number;
  c_value: number;
}

function AllocationRow(props: Props) {
  let red = Math.round(255 * (1 - props.benefit / 15));
  let green = Math.round((255 * props.benefit) / 15);
  const color = "rgb(" + red + "," + green + ",0)";

  const showOptions = (): MouseEventHandler => {
    return (event) => {};
    
  };

  return (
    <tr style={{ backgroundColor: color }}>
      <td className="border-r border-gray-100">Team {props.team}</td>
      <td className="border-r border-gray-100">Project {props.project}</td>
      <td className="border-r border-gray-100">{props.benefit}</td>
      <td className="border-r border-gray-100">{props.capability}</td>
      <td className="border-r border-gray-100">{props.preference}</td>
      <td>
        <button
          className="bg-blue-500 hover:bg-blue-700 rounded"
          onClick={showOptions()}
        >
          Options
        </button>
      </td>
    </tr>
  );
}

export default AllocationRow;
