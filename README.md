# M49 List of Countries in JSON

A browser app written in vanilla JavaScript that scrapes the United Nations Statistics Division's [Standard country or area codes for statistical use (M49)](https://unstats.un.org/unsd/methodology/m49/) page.

It outputs a JSON object, containing an array of all countries with ISO 3166-1 alpha-2, alpha-3 and M49 numeric country codes, as well the numeric codes for sub-regions, regions and intermediate regions - as specified by the UN.

## How to use

1. Visit the demo server of [CORS Αnywhere](https://github.com/Rob--W/cors-anywhere/) at: [cors-anywhere.herokuapp.com/corsdemo](https://cors-anywhere.herokuapp.com/corsdemo/) to request temporary access
2. Open [tmrk.github.io/m49-list](https://tmrk.github.io/m49-list/) and wait for the fetch to complete
3. Copy the contents of the text field

## Cached version

You can access the latest (cached) version of the list by calling [tmrk.github.io/m49-list/m49-list.json](https://tmrk.github.io/m49-list/m49-list.json)