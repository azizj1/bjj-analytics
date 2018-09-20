data "aws_route53_zone" "main" {
	name = "${var.domain_name}."
}

resource "aws_route53_record" "github_ips" {
    name = "${var.domain_name}."
    type = "A"
    zone_id = "${data.aws_route53_zone.main.zone_id}"
    ttl = 300
    records = ["192.30.252.153", "192.30.252.154"]
}

resource "aws_route53_record" "dev_cname" {
    name = "dev.${var.domain_name}."
    type = "CNAME"
    zone_id = "${data.aws_route53_zone.main.zone_id}"
    ttl = 300
    records = ["azizj.github.io."]
}

resource "aws_route53_record" "prod_cname" {
    name = "www.${var.domain_name}."
    type = "CNAME"
    zone_id = "${data.aws_route53_zone.main.zone_id}"
    ttl = 300
    records = ["azizj.github.io."]
}
