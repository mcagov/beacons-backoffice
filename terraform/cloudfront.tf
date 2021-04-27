resource "aws_cloudfront_distribution" "s3_distribution" {
  tags = module.beacons_label.tags
  origin {
    domain_name            = aws_s3_bucket.backoffice-static.bucket_regional_domain_name
    origin_id              = aws_s3_bucket.backoffice-static.bucket
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.backoffice-static.bucket

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600 // 1 hour
    max_ttl                = 86400 // 1 day
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["GB"]
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "Necessary to restrict S3 bucket access to only the Cloudfront distribution."
}