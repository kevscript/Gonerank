import { ISODateString } from "next-auth";

export function getAgeFromDate(date: ISODateString) {
  const now = Date.now();
  const birthDate = new Date(date);

  if (birthDate instanceof Date === false || isNaN(birthDate.valueOf())) {
    throw new Error(`${date} is not a valid date string`);
  }
  //calculate month difference from current date in time
  let month_diff = now - birthDate.getTime();

  //convert the calculated difference in date format
  let age_dt = new Date(month_diff);

  //extract year from date
  let year = age_dt.getUTCFullYear();

  //now calculate the age of the user
  let age = Math.abs(year - 1970);

  return age;
}
