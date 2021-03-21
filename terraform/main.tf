provider "aws" {
  region     = var.aws_region
  access_key = "AKIA5HK6WFQW42BKEJKO"
  secret_key = "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"

}
data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_vpc" "vpc" {
  cidr_block = var.cidr_block

  tags = {
    Name = var.vpcname
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id
  tags = {
    Name = "${var.vpcname}igw"
  }
}


resource "aws_route_table" "rt" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }


  tags = {
    Name = "${var.vpcname}rt"
  }
}


resource "aws_subnet" "subnet1" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.subnet1
  map_public_ip_on_launch = true
  availability_zone       = data.aws_availability_zones.available.names[0]

  tags = {
    "Name" = "Subnet One"
  }
}


resource "aws_route_table_association" "association_one" {
  subnet_id      = aws_subnet.subnet1.id
  route_table_id = aws_route_table.rt.id
}


# Security Group
resource "aws_security_group" "application_Security_Group" {
  vpc_id      = aws_vpc.vpc.id
  name        = "application"
  description = "Application Security Group"

  # allow ingress of port 22
  ingress {
    cidr_blocks = var.ingressCIDRblock
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
  }
  ingress {
    cidr_blocks = var.ingressCIDRblock
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
  }
  ingress {
    cidr_blocks = var.ingressCIDRblock
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
  }
  ingress {
    cidr_blocks = var.ingressCIDRblock
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
  }

  # allow egress of all ports
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name        = "${var.vpcname}SG"
    Description = "My VPC Security Group"
  }
}

resource "aws_instance" "web" {
  ami                     = var.ami
  instance_type           = "t2.micro"
  disable_api_termination = false
  subnet_id               = aws_subnet.subnet1.id
  key_name                = var.keyName
  vpc_security_group_ids  = ["${aws_security_group.application_Security_Group.id}"]

  root_block_device {
    volume_size           = 20
    volume_type           = "gp2"
    delete_on_termination = true
  }
  tags = {
    Name = "ec2Instance"
  }
}

resource "null_resource" "remote_exec_from_github" {

  connection {
    #  need to put ip here in host
    host        = "18.215.49.36"
    type        = "ssh"
    user        = "ubuntu"
    private_key = file("Devops-KeyPair-2021.pem")
  }
  provisioner "file" {
    source      = "setup.sh"
    destination = "/home/ubuntu/setup.sh"
  }
  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/setup.sh",
      "/home/ubuntu/setup.sh args",
    ]
  }
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.web.id
  allocation_id = "eipalloc-0e5ae1c55022254b3"
}

# resource "aws_eip" "uber-app-elastic-ip" {
#   vpc = true
# }
