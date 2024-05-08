import { MouseEventHandler, useState } from "react";
import AllocationRow from "./AllocationRow";

function AllocationTable() {
  const [ascending, setAscending] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
  ]);
  const [sample, setSample] = useState<number[][]>([
    [1, 1, 15, 8, 7, 1, 1000],
    [2, 6, 8, 3, 5, 1, 8],
    [3, 12, 0, 1, 2, 0, 0],
    [4, 9, 10, 8, 2, 1, 10],
    [5, 17, 0, 2, 7, 0, 0],
    [6, 8, 7, 1, 6, 1, 7],
  ]);

  const sort = (n: number): MouseEventHandler => {
    return (_) => {
      const sortedList = ascending[n]
        ? [...sample].sort((a, b) => a[n] - b[n])
        : [...sample].sort((a, b) => b[n] - a[n]);
      const temp = ascending;
      temp[n] = !ascending[n];
      setAscending(temp);
      setSample(sortedList);
    };
  };

  return (
    <div className="mx-auto bg-blue-500 p-4 text-center">
      <table className="w-full p-4 border border-collapse border-gray-100">
        <thead>
          <tr>
            <th className="border-r border-gray-100" onClick={sort(0)}>
              Team
            </th>
            <th className="border-r border-gray-100" onClick={sort(1)}>
              Project
            </th>
            <th className="border-r border-gray-100" onClick={sort(2)}>
              Benefit
            </th>
            <th className="border-r border-gray-100" onClick={sort(3)}>
              Compatability
            </th>
            <th className="border-r border-gray-100" onClick={sort(4)}>
              Preference
            </th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {sample.map((alloc, index) => (
            <AllocationRow
              key={index}
              team={alloc[0]}
              project={alloc[1]}
              benefit={alloc[2]}
              capability={alloc[3]}
              preference={alloc[4]}
              impact={alloc[5]}
              c_value={alloc[6]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllocationTable;
