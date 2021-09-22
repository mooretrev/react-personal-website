rm -rf ec2package
mkdir ec2package
cp docker-compose.yml ./ec2package
cp docker.env ./ec2package
cp -r reverse_proxy ./ec2package
zip -r ec2package.zip ec2package