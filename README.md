# Elite Dangerous Helper API

This is the backend API for this elite dangerous helper.
He get information from EDMC and give an API for software.

## Market Api

- GET `/market` => give all markets 
- GET `/market/:id` => give all informations from a market: 
  - commidities with all prices (buy, sell) and stock and demand
  - prohibited: list of commodities prohibited
  - station and system
