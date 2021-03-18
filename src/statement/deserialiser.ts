import {PrincipalJSONDeserialiser} from '../principals/deserialiser';
import {Statement} from '../statement/statement';

export class StatementJSONDeserialiser {
  static fromJSON(obj: any) {
    return new Statement({
      sid: obj.Sid,
      effect: obj.Effect,
      principals: PrincipalJSONDeserialiser.fromJSON(obj.Principal),
      actions: parseArray(obj.Action),
      resources: parseArray(obj.Resource),
      conditions: obj.Condition,
    });

    function parseArray(obj: any): [] {
      if (obj === undefined) {
        return [];
      }
      if (Array.isArray(obj)) {
        if (isArrayOfStrings(obj as [])) {
          return obj as [];
        }
        throw new Error('Unsupported type: expecting an array of strings');
      }
      throw new Error('Unsupported type: expecting an array');
    }

    function isArrayOfStrings(obj: []) {
      return obj.every((element) => typeof element === 'string');
    }
  }
}
