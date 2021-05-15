
export class Condition {
  public readonly operator: string;
  public readonly key: string;
  public readonly values: string[];

  constructor(test: string, key: string, values: string[]) {
    if (test === '') {
      throw new Error('test should not be empty');
    }
    if (key === '') {
      throw new Error('key should not be empty');
    }
    if (values.length === 0) {
      throw new Error('values should not be empty');
    }
    if (values.filter((value) => value === '').length > 0) {
      throw new Error('values should not have an empty string');
    }
    this.operator = test;
    this.key = key;
    this.values = values;
  }

  toJSON() {
    const result: { [operator: string]: { [key:string]: string[] }; } = {};
    result[this.operator] = {};
    result[this.operator][this.key] = this.values;
    return result;
  }
}
