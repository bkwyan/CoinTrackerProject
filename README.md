# CoinTracker Project
## The goal of this project was to implement the following functionalities:
* Add/Remove bitcoin addresses
* Show the up to date available balance for each bitcoin addresses
..* If the transaction has not been processed, then it will not reflect on the balance
* Retrieve the 10 most recent transactions for a given address

## To run the app, navigate to the directory and following the instructions below
1. cd cointrackerproject
2. npm install # Install the necessary node modules
3. npm start

## To start the server (port 8080)
1. cd server
2. npm install # Install the necessary node modules
3. npm start

## Architecture
I decided to create the front-end which renders all the UI components and within the front-end it also is responsible for calls to the Blockchair API. I also created a database which holds all the addressess, transactions, and balances. For the purpose of this project, for the sake of the given circumstances and it being a project I believe this architecture would suffice. If this were to be used in the real world, some security revisions will be needed.