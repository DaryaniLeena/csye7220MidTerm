# Uber For Buses Application

### Functionality:

-   A user can book a bus between Start destination and end destination for a given date.
-   A uer can retrieve all the bookings.

## Requirements

-   Terraform
-   AWS Account
-   AWS CLI

## Basic Installation

Make sure you have Terraform installed. Navigate to the folder `terraform`

-   cd csye7220MidTerm/terraform

Initialize the terraform directory using command:

-   terraform init

Create a terraform plan using command:

-   terraform plan

Spin up the AWS resources using command:

-   terraform apply --auto-approve

## Run the application

The application should be running and listening for HTTP requests on port 80 on AWS EC2 Instance.
http://18.215.49.36:80

The Backend service can be acessed on the port 5000
http://18.215.49.36:5000

## Authors

-   Leena Daryani daryani.l@northeastern.edu 001035781
-   Vidhi Nagda nagda.v@northeastern.edu 001306579
