interface IDataHandler {
    preferences: number[][];
    fit: number[][];
    impact: number[][];
}

class DataHandler {
    private preferences: number[][];
    private fit: number[][];
    private impact: number[][];
    private bvalues: number[][];

    private calculateBValues = (): void => {
        const bvalues: number[][] = [[]];
        for (let i = 0; i < this.preferences.length; i++) { // rows
            for (let j = 0; j < this.preferences[0].length; j++) { // columns
                bvalues[i][j] = this.impact[i][j]*(this.preferences[i][j] + this.fit[i][j]);
            }
        }
        this.bvalues = bvalues;
    }

    DataHandler(obj: IDataHandler) {
        this.preferences = obj.preferences;
        this.fit = obj.fit ;
        this.impact = this.impact;
        this.calculateBValues();
    }
}


export default DataHandler;