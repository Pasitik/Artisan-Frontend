export function dateToString(timestamp) {
  // Create a new Date object
  const date = new Date(timestamp);

  // Get the various components of the date
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Create a date string in the desired format
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
