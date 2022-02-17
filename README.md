# OrderSystem

## Table of contents
* [1. Instruction](#1-instruction)
* [2. Infrastructure Design](#2-infrastructure-design)
* [3. Client Tier](#3-client-tier)
* [4. Business Logic Tier](#4-business-logic-tier)
* [5. Database Tier](#5-database-tier)

## 1. Instruction 
- An order systems for two types of users (customers and employees)
- Logic tier(Java Servlet to RPC)
   * Functionality for Customers
      * Check menu
      * Create order
      * Submit order
      * Check if order is ready to pick up
      * Cancel order
   * Functionality for Employees
      * Create / Modify Menu
      * See all open (not completed) orders sorted by time (FIFO)
      * Inform customer that order is ready

## 2. Infrastructure Design
- The architecture of this application is based on a typical MVC model
- 3-tier architecture
   * Client tier: HTML, CSS, JavaScript
   * Logic tier: NodeJS, ExperssJS
   * Data tier: MySQL
- Local and remote development environment

![tier Architecture](/img/tiers.png)
> 3-tier Architecture


## 3. Client Tier
- Client tier (View) were written in `Javascript`, `HTML`, and `CSS`. This level of the architecture is what the user will interact with to access the features of our application.

## 4. Business Logic Tier
- The Business Logic Tier (Controller) were written using NodeJs and ExpressJS, and this tier represents the Application Server that will act as a bridge of communication for the Client Tier and Database Tier. This tier will serve HTML pages to the user’s device and accept HTTP requests from the user and follow with the appropriate response.

## 5. Database Tier
The Database Tier (Model) will be hosting Mysql. This is where I will store all of the crucial data my application needs to function.
