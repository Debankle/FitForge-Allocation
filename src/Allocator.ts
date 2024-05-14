import solver from "javascript-lp-solver";

// interface Props {
//   bvalues: number[][];
//   P: number[][]; // [team, project] that must be allocated
//   Q: number[][]; // [team, project] that must not be allocated
//   R: number[]; // Number of teams available for project, set default to 1
// }

interface Constraints {
  [key: string]: { max: number };
}

interface Variables {
  [key: string]: { score: number } & { [key: string]: number };
}

interface AllocatorReturn {
  [key: string]: boolean | number | boolean | number[];
}

const Allocator = (
  bvalues: number[][],
  P: number[][],
  Q: number[][],
  R: number[]
): AllocatorReturn => {
  // Setup variables
  const m = bvalues.length;
  const n = bvalues[0].length;
  const constraints: Constraints = {};
  const variables: Variables = {};

  // Setup teams and projects - teams max 1, projects max R
  for (var i = 1; i < m + 1; i++) {
    constraints[`T${i}`] = { max: 1 };
  }
  for (var j = 1; j < n + 1; j++) {
    constraints[`P${j}`] = { max: R[j - 1] };
  }

  for (var i = 1; i < m + 1; i++) {
    for (var j = 1; j < n + 1; j++) {
      variables[`x_${i}_${j}`] = {
        score: bvalues[i - 1][j - 1],
      };
      for (var p = 1; p < m + 1; p++) {
        variables[`x_${i}_${j}`][`T${p}`] = 0;
      }
      for (var q = 1; q < n + 1; q++) {
        variables[`x_${i}_${j}`][`P${q}`] = 0;
      }
      variables[`x_${i}_${j}`][`T${i}`] = 1;
      variables[`x_${i}_${j}`][`P${j}`] = 1;
    }
  }

  for (var i = 1; i < P.length; i++) {
    variables[`x_${P[i][0]}_${P[i][1]}`]["score"] = 1000;
  }

  for (var j = 1; j < Q.length; j++) {
    variables[`x_${Q[j][0]}_${Q[j][1]}`]["score"] = -1000;
  }

  const model = {
    optimize: "score",
    opType: "max",
    constraints: constraints,
    variables: variables,
  };

  // Calculate solution
  return solver.Solve(model);
};

export default Allocator;
