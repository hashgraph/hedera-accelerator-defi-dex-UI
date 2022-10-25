import { mapObjIndexed } from "ramda";
import BigNumber from "bignumber.js";

/**
 * Converts the BigNumber type values in a key:value Object to a number type. Used to
 * transform large numbers into a format that will be displayed in the UI.
 * @param records - An object of key:value pairs where key is a string and value is a BigNumber
 * @returns A copy of records with values converted to a number.
 */
const mapBigNumberValuesToNumber = (
  records: Record<string, BigNumber | undefined>
): Record<string, number | undefined> => {
  return mapObjIndexed((record) => record?.toNumber(), records);
};

export { mapBigNumberValuesToNumber };
