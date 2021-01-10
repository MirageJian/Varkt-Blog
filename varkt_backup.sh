#!/usr/bin/env bash
app="varkt"
workplace="/home/ubuntu"
file_name="backup_$app"
backup_url="$workplace/$file_name"
cd $workplace
# Check zip file
if [ "$file_name.7z" ]
then
    rm -rf $file_name.7z
fi
# Check directory
if [ ! -d "$file_name/" ]
then
    mkdir $file_name
else
    echo "The backup folder exists"
fi
# Database and program backup
mysqldump -u root -p $app>$backup_url/$app.sql
cp -rf $workplace/$app/tornado $backup_url/tornado
cp -rf $workplace/$app/html $backup_url/html
# Config files backup
cp -rf /etc/nginx/conf.d/ $backup_url/nginx.conf.d
# cp -rf /etc/pki/nginx/ $backup_url/pki.nginx
cp -rf /etc/supervisor/conf.d/ $backup_url/supervisor.conf.d
# Create a zip file delete temp folder
7za a $file_name.7z $file_name
rm -rf $file_name
