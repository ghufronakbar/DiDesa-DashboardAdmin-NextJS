const toISODateString = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString();
};

export default toISODateString