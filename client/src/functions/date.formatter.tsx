/* FUNCTION THAT FORMATS A DATE STRING INTO MM-DD-YY */

const formatDate = (dateString: string): string => {

  // Options for formatting the date using the Intl.DateTimeFormat API
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  // Converts the input date string to a Date object and formats it using the specified options
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export default formatDate;
