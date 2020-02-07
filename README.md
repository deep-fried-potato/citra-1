# Citra - Civic Issue Tracking and Management System
![Image](https://github.com/Vineet-Sharma29/citra/blob/master/DOCS/0.png)
![Problem Statement](https://github.com/Vineet-Sharma29/citra/blob/master/DOCS/1.png)
![Elevator Pitch](https://github.com/Vineet-Sharma29/citra/blob/master/DOCS/2.png)
![Solution](https://github.com/Vineet-Sharma29/citra/blob/master/DOCS/3.png)
![Comparison Matrix](https://github.com/Vineet-Sharma29/citra/blob/master/DOCS/4.png)
![DBSchema](https://github.com/Vineet-Sharma29/citra/blob/master/DOCS/6.png)
![TechStack](https://github.com/Vineet-Sharma29/citra/blob/master/DOCS/7.png)

## Use Case Diagram
![Use Case Diagram](https://github.com/Vineet-Sharma29/citra/blob/master/DOCS/CITRA.png)

## How To Run This Project
> Setup
* Install `react-native` by following [this](https://facebook.github.io/react-native/docs/getting-started) link
* `cd APP/ && npm i && cd ..`
* `cd BACKEND/ && npm i && cd ..`
* Add API credential for `AWS-S3` and `Google Maps`
  * `cd APP/`
  * `touch .env`
  Add following creadentials:-
    * `AWS_S3_FOLDER`
    * `AWS_S3_BUCKET`
    * `AWS_REGION`
    * `AWS_ACCESS_KEY`
    * `AWS_SECRET_KEY`
    * `API_KEY` for Google Maps.
   
> Run

To run app:-
* `cd APP/`
* In one terminal run `react-native run-android`
* In another terminal run `react-native start`

To run server:-
* cd `BACKEND/`
* cd `npm start`

