import { get } from "https";
import { createWriteStream } from "fs";

export const getFile = (name: string, callback: Function) => {
  const url = 'https://eddb.io/archive/v6/' + name;
  const fileName = "data/" + name;

  const file = createWriteStream(fileName);

  get(url, response => {
    var stream = response.pipe(file);

    stream.on("finish", function() {
      callback(fileName);
    });

    stream.on("error", (err) => {
      console.error(err);
    })
  });
}

export const CSVtoArray = (text: string): Array<string>|null => {
  var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
  var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;

  // Return NULL if input string is not well formed CSV string.
  if (!re_valid.test(text)) return null;

  var a = []; // Initialize array to receive values.
  text.replace(re_value, // "Walk" the string using replace with callback.
      function(m0, m1, m2, m3) {

          // Remove backslash from \' in single quoted values.
          if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));

          // Remove backslash from \" in double quoted values.
          else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
          else if (m3 !== undefined) a.push(m3);
          return ''; // Return empty string.
      });

  // Handle special case of empty last value.
  if (/,\s*$/.test(text)) a.push('');
  return a;
};