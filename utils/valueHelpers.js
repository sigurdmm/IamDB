
/**
 * Accepts a year and a nullable relased value,
 * and builds a date out of this. released has higher
 * precedence over year.
 * @param {number} year Generic release date
 * @param {number} released specific release date
 * @return {date}
 * */
const buildReleaseDate = (year, released = null) => {
  if (released) {
    return new Date(released);
  }

  const date = new Date();

  if (year) {
    date.setFullYear(year, 0, 0);
  }

  // Should the date give literal invalid date
  // Default to today's date
  if (date === 'Invalid Date') {
    return new Date();
  }

  return date;
};

/**
 * Accepts a list or a string
 * which can be destructured to a list
 * @param {string|array} field
 * @param {string} separator The potential separator
 * @return {array}
 * */
const extractListOrStringAsList = (field, separator = ' ') => {
  if (!field) {
    return [];
  }

  if (field.constructor === Array) {
    return field;
  }

  const separated = field.split(separator);

  if (separated.length < 1) {
    return [];
  }

  return separated;
};

module.exports = {
  extractListOrStringAsList,
  buildReleaseDate
};
