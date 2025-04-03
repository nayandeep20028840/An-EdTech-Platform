export const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long", // numeric, 2-digit, long, short, narrow
    day: "numeric",
    year: "numeric",
  })
}
