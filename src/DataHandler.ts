import Allocator from "./Allocator";

// interface IDataHandler {
//     preferences: number[][];
//     fit: number[][];
//     impact: number[][];
// }

class DataHandler {
  private preferences: number[][];
  private fit: number[][];
  private impact: number[][];
  private bvalues: number[][];

  private calculateBValues = (): void => {
    const bvalues: number[][] = [[]];
    for (let i = 0; i < this.preferences.length; i++) {
      // rows
      for (let j = 0; j < this.preferences[0].length; j++) {
        // columns
        bvalues[i][j] =
          this.impact[i][j] * (this.preferences[i][j] + this.fit[i][j]);
      }
    }
    this.bvalues = bvalues;
  };

  public getAllocation = (): any => {
    let P = [[]];
    let Q = [[]];
    let R: any = [];
    for (let i = 0; i < this.bvalues[0].length; i++) {
      R[i] = 1;
    }
    return Allocator(this.bvalues, P, Q, R);
  };

  constructor(preferences: number[][], fit: number[][], impact: number[][]) {
    this.preferences = preferences;
    this.fit = fit;
    this.impact = impact;
    this.calculateBValues();
  }
}

export default DataHandler;
