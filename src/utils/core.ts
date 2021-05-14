// Low-level utility functions that could be considered an extension of the JavaScript API.  No domain logic.
import * as _ from "lodash";

export const diffObjValues = (
  base: Record<any, any>,
  comparator: Record<any, any>
): Record<string, any> => {
  return Object.keys(comparator).reduce((diff: Record<any, any>, key) => {
    if (!isRecord(base) && !isRecord(comparator)) return comparator;
    if (_.isEqual(comparator[key], base[key])) return diff;
    if (!base.hasOwnProperty(key))
      throw ReferenceError(`Comparator key ${key} not found on base`);

    diff[key] = diffObjValues(base[key], comparator[key]);

    return diff;
  }, {});
};

const isRecord = (object: any) =>
  typeof object === "object" && !isArray(object);

const isArray = (object: any) => object.hasOwnProperty("length");
