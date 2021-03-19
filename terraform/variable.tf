variable "aws_region" {
  description = "Region for the VPC"
  type        = string
  default     = "us-east-1"
}

variable "vpcname" {
  type        = string
  description = "Name of the VPC"
  default     = "uber_app_vpc"
}

variable "cidr_block" {
  type    = string
  default = "10.0.0.0/16"
}

variable "enable_dns_hostnames" {
  type    = bool
  default = true
}

variable "enable_dns_support" {
  type    = bool
  default = true
}

variable "subnet1" {
  description = "Subnet ID 1."
  type        = string
  default     = "10.0.1.0/24"
}

variable "ami" {
  description = "Custom AMI"
  type        = string
  default     = "ami-042e8287309f5df03"
}

variable "ingressCIDRblock" {
  type    = list(any)
  default = ["0.0.0.0/0"]
}

variable "keyName" {
  type    = string
  default = "Devops-KeyPair-2021"
}

