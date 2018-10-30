
const buildRelaseDate = (year, released = null) => {
  if (released) {
    return new Date(released);
  }

  const date = new Date();
  date.setFullYear(year, 0, 0);

  return date;
};

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
  buildRelaseDate
};
