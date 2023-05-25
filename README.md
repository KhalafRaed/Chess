# Chess-as-a-Service Express App

This is a Chess-as-a-Service (CaaS) application built with Express.js and TypeScript. It provides a RESTful API for various chess-related operations.

## Prerequisites

Before running the application, ensure that you have the following dependencies installed:

- Node.js (v14 or above)
- npm (Node Package Manager)

## Getting Started

To run the Chess-as-a-Service app, follow these steps:

1. run `npm i`
2. run `npm run start`


### APIs cURLs

## Create New Chess Game

```curl --location --request POST 'localhost:3000/1.0/chess'```


## Get Chess Game Status
```curl --location 'localhost:3000/1.0/chess/646f87c6e285605c11d97711'```


## Get Possible Moves 
```curl --location 'localhost:3000/1.0/chess/possible-moves/646f87c6e285605c11d97711/A6'```


## Move with Pawn
```curl --location --request PUT 'localhost:3000/1.0/chess/move/646f87c6e285605c11d97711' \
--header 'Content-Type: application/json' \
--data '{
    "position": "A6",
    "nextPosition": "B7"
}'
```


## Get Game History

```
curl --location 'localhost:3000/1.0/chess/history/646f81daa77087c766c57c38'
```