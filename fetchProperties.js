const SHEET_ID = '1pJwLW3Paj14BeNlb9Z2XCyEzTQETATETxBGnpmdUcOs';
// The gviz endpoint returns the sheet data in a JSON format
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

export async function fetchPropertiesFromSheet() {
  try {
    const response = await fetch(SHEET_URL);
    const text = await response.text();

    // The response is a text string wrapping a JSON object, so we extract the actual JSON
    const jsonString = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const data = JSON.parse(jsonString);

    // Extract column names (headers) from the first row definition
    const headers = data.table.cols.map(col => col?.label);

    // Map the rows to standard JavaScript objects
    const properties = data.table.rows.map(row => {
      const property = {};
      row.c.forEach((cell, index) => {
        // Only assign values if a header exists for this column
        if (headers[index]) {
          property[headers[index]] = cell ? cell.v : null;
        }
      });
      return property;
    });

    return properties;
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return []; // Return an empty array as a fallback
  }
}