"use strict";

const url = "https://unstats.un.org/unsd/methodology/m49/overview/";
const languages = ["EN", "FR", "ES", "RU", "ZH", "AR"]; // the first one will be the default "name"

const countries = [];
const regions = [];
const columns = [];
const parser = new DOMParser();

fetch(url)
  .then(response => response.text())
  .then(html => {

    // Parse the request response as DOM
    const page = parser.parseFromString(html, "text/html");

    const defaultTable = page.querySelector("#downloadTable" + languages[0]);
    for (let i = 0; i < defaultTable.querySelector("thead > tr").children.length; i++) {
      let description = defaultTable.querySelector("thead > tr").children[i].textContent;
      let name = description
        .replace("Least Developed Countries (LDC)", "ldc")
        .replace("Land Locked Developing Countries (LLDC)", "lldc")
        .replace("Small Island Developing States (SIDS)", "sids")
        .toLowerCase()
        .replace("code", "").replace("iso-", "")
        .replace("m49", "m49code")
        .replace("country or area", "name")
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()).trim();
      if (["ldc", "lldc", "sids"].includes(name)) name = name.toUpperCase(); // turn these back to allcaps
      columns.push({
        name: name,
        description: description
      });
    }
    console.log(columns);

    for (let i = 0; i < languages.length; i++) {
      const lang = languages[i];
      const table = page.querySelector("#downloadTable" + lang);

      for (let j = 0; j < table.querySelector("tbody").children.length; j++) {
        const country = table.querySelector("tbody").children[j];
        if (i === 0) { // first use the default language
          countries[j] = {};
          for (let k = 0; k < country.children.length; k++) {
            const columnName = columns[k].name;
            // skip these columns
            if (!["global", "globalName", "regionName", "intermediateRegionName", "subRegionName"].includes(columnName)) {
              let row = country.children[k].textContent.trim();
              if (row === "") row = false;
              else if (row.toLowerCase() === "x") row = true;
              else if (!isNaN(row)) row = Number(row);
              if (row) countries[j][columnName] = row; // skip columns that are false
            }
          }
        } else { // then fill in the other languages
          const m49code = Number(country.children[columns.indexOf(columns.find(column => column.name === "m49code"))].textContent);
          const countryName = country.children[columns.indexOf(columns.find(column => column.name === "name"))].textContent;
          countries.find(target => target.m49code === m49code)["name" + lang] = countryName;
        }
      }
    }
    const json = {
      lastUpdated: new Date().getTime(),
      countries: countries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    };
    document.querySelector("textarea").value = JSON.stringify(json, null, 2);
    console.log(json);
  });
