export function safePrinterHelper(result) {
  if (!result[0]) return 'No';
  return `Yes, Safe state ${
    Object.values(result[1]).reduce((prevValue, currValue) => prevValue + `P${currValue},`, '<')
  }`.slice(0, -1) + '>'
}

export function requestPrinterHelper(result) {
  if (!result[0]) return 'No';
  return `Yes, the request can be granted with safe state, Safe state ${
    Object.values(result[1]).reduce(
      (prevValue, currValue) => (
        prevValue + `P${Array.isArray(currValue) ? currValue.join('') : currValue},`
      ), '<')
  }`.slice(0, -1) + '>'
}