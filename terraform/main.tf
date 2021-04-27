provider "aws" {
  region = "eu-west-2"
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "mca-beacons-backoffice-terraform-state"
  tags = module.beacons_label.tags

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = "mca-beacons-backoffice-terraform-locks"
  tags = module.beacons_label.tags
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}