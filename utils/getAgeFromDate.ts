import { ISODateString } from "next-auth";

export function getAgeFromDate(date: ISODateString) {
  const now = Date.now();
  const birthDate = new Date(date);

  //calculate month difference from current date in time
  var month_diff = now - birthDate.getTime();

  //convert the calculated difference in date format
  var age_dt = new Date(month_diff);

  //extract year from date
  var year = age_dt.getUTCFullYear();

  //now calculate the age of the user
  var age = Math.abs(year - 1970);

  return age;
}
