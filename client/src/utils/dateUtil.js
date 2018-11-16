
/**
 * Accepts a Date and converts it to a human readable string
 * @param {Date} date
 * @return {string}
 * */
// eslint-disable-next-line import/prefer-default-export
export const dateToHuman = (date) => {
  const year = date.getFullYear();

  let month = date.getMonth() + 1;

  if (date.getMonth() < 10) {
    month = `0${month}`;
  }

  let day = date.getDate();

  if (date.getDate() < 10) {
    day = `0${day}`;
  }

  return `${day}/${month}/${year}`;
};
