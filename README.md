## Table of contents
* [General info](#general-info)
* [Source Download](#source-download)
* [Instalation](#instalation)
* [Services Derails](#services-details)
* [Examples](#examples)
* [Requirements](#requirements)
* [Manual Docker Image Build](#manual-docker-image-build)

## General info

This project is a simple server that exposes two services with get GitHub users and repositorys information.
	

## Source Download

In order to download the source code please visit the following page
* https://github.com/alexgligor/epilot
or clone the repository using:
* git clone https://github.com/alexgligor/epilot.git
	

## Instalation

* Prerequsites
Docker installed localy

* Steps
To run this project, download the source and then perform the following steps:
$ cd ../epilot
$ npm install --ignore-scripts
$ npm run prepareDockerContainer
$ npm run startDocker (to stop Docker container execute "npm run stopDocker")

* Expected result
** Docker image 'epilothomework:latest' was created.
** Docker image 'epilothomework:latest' is running.
** Server services are available on localhost:1342/v1/active/{GitHub user} and localhost:1342/v1/downwards/{GhitHub repo name}


## Services Details

Server will run under Docker container and available using base URL localhost:1342.
Services:
 * get: localhost:1342/v1/active/{userName}
    - userName 
        - is a mandatory path paraneter
        - refers to user name of a GitHub user
    ** Returns :
        - Status: 200
            - JSON object with properety:
                - active (boolean)
                    - true (user pushed code in last 24 hours)
                    - false (user didn't pushed code in last 24 hours)
        - Status: 400
            - JSON object with properety:
                - message (string)
                    - UserName parameter is empty
        - Status: 404
            - JSON object with properety:
                - message (string)
                    - Failed to load events for user
            
 * get: localhost:1342/v1/downwards/{repoName}?userName={userName}
    - repo 
        - is a mandatory path paraneter
        - refers to repository name of a GitHub repository
    - user
            - is not mandatory query paraneter
            - refers to user name of a GitHub user
    
    ** Returns :
        - Status: 200
            - JSON object with properety:
                - result (boolean)
                    - true (repository has more addition then deletion in last week)
                    - false (repository has less addition then deletion in last week)
        - Status: 404
            - JSON object with properety:
                - message (string)
                    - No repository found at path

## Examples

Use PostMan in order to execute the examples, or execute the URL from your browser

Ex 1:Check if 'traccar' repository has more addition then deletions in last week
  Make a get request with localhost:1342/v1/downwards/traccar

Ex 2:Check if 'paulmillr' GitHub user has commited code in last 24 hours.
  Make a get request with localhost:1342/v1/active/paulmillr


## Requirements

Write a small Node.js application that interacts with github.com and exposes 2 RESTful endpoints:
-GET - /active/<user> - calling this endpoint will return a json body with a boolean field. If the specified user has pushed code in the last 24 hours, to any repository, it will be true. It will be false otherwise.
-GET /downwards/<repo> - calling this endpoint will return a json body with a boolean field. If the specified git repo had more deletions than additions in the last 7 days, return true. The field will be False otherwise.
Package the application as a Docker container.

No github specific client library or sdk is allowed. Other third party packages and frameworks are allowed.

## Manual Docker Image Build

* Prerequsites
Docker installed locally.
Source code downloaded locally form https://github.com/alexgligor/epilot

* Steps
$ cd ../epilot
$ Change your directory to /epilot
$ Execute "npm install --ignore-scripts"
$ Execute "npm run build"
$ Copy Dockerfile and package.json file in the /epilot folder
$ Execute "docker build -t epilothomework:latest ./build" to build the Docker container
$ Execute "docker run -it -d -p 1342:1342 epilothomework:latest" to run Docker container exposed on port 1342