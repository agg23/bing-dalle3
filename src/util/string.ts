const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
  timeStyle: "short",
  hour12: true,
});

export const formatDateToParts = (date: Date) => {
  const parts = dateFormatter.formatToParts(date);

  let inHour = false;
  let dateString = "";
  let hourString = "";
  for (const part of parts) {
    if (part.type === "literal" && part.value === ", ") {
      inHour = true;
    } else if (inHour) {
      hourString += part.value;
    } else {
      dateString += part.value;
    }
  }

  return {
    hourString,
    dateString,
  };
};

export const formatDatetimeNice = (date: Date): string => {
  const { hourString, dateString } = formatDateToParts(date);

  return `${hourString} on ${dateString}`;
};
