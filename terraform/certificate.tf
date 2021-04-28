data "aws_acm_certificate" "cloudfront_certificate" {
  domain   = var.cloudfront_domain_name
  statuses = ["ISSUED"]
}