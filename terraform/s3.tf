resource "aws_s3_bucket" "backoffice_static" {
  bucket = "${module.beacons_label.name}-${module.beacons_label.environment}"
  tags   = module.beacons_label.tags
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.backoffice_static.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.oai.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "s3_policy" {
  bucket = aws_s3_bucket.backoffice_static.id
  policy = data.aws_iam_policy_document.s3_policy.json
}