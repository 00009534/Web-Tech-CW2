// Function to create unique ids
export function uniqueID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
