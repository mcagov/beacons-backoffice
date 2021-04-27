terraform {
  backend "s3" {
    bucket         = "mca-beacons-backoffice-terraform-state"
    key            = "global/s3/terraform.tfstate"
    region         = "eu-west-2"
    dynamodb_table = "beacons-backoffice-terraform-state-lock"
    encrypt        = true
  }
}