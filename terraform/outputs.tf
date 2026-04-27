output "public_ip" {
  value = aws_instance.microstack.public_ip
}

output "ssh_command" {
  value = "ssh -i <path-to-your-key.pem> ec2-user@${aws_instance.microstack.public_ip}"
}
