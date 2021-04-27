resource "aws_s3_bucket" "backoffice-static" {
  bucket        = "${module.beacons_label.name}-${module.beacons_label.environment}"
  tags          = module.beacons_label.tags
  force_destroy = true
  acl           = "public-read"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

data "aws_iam_policy_document" "document" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.backoffice-static.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.oai.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "policy" {
  bucket = aws_s3_bucket.backoffice-static.id
  policy = data.aws_iam_policy_document.document.json
}