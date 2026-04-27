variable "aws_region" {
  type        = string
  description = "AWS Region"
  default     = "us-east-1"
}

variable "instance_type" {
  type        = string
  description = "EC2 instance type"
  default     = "t3.small"
}

variable "key_name" {
  type        = string
  description = "Existing EC2 key pair name for SSH"
}

variable "ssh_cidr" {
  type        = string
  description = "CIDR allowed to SSH (your public IP /32 recommended)"
  default     = "0.0.0.0/0"
}
