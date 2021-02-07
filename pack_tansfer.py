import os
import shutil
import tarfile
import subprocess


# subprocess.run('npm run build --prefix listening-test-react', shell=True)

try:
    print('Start cleaning build folder and archive file...')
    base_dir = 'varkt-dist'
    if os.path.exists(base_dir):
        shutil.rmtree(base_dir)
    # Archive file and delete
    base_dir_tgz = base_dir + '.tgz'
    if os.path.exists(base_dir_tgz):
        os.remove(base_dir_tgz)

    print('Move server files...')
    server_dir = os.path.join(base_dir, 'tornado')
    shutil.copytree('tornado', server_dir, ignore=shutil.ignore_patterns('*.pyc', '__pycache__', '.idea', 'static', 'venv', '.gitignore'))

    print('Move react files...')
    html_dir = os.path.join(base_dir, 'html')
    shutil.copytree("angular/dist", html_dir)

    print('Move other files...')
    shutil.copyfile("varkt_backup.sh", os.path.join(base_dir, "varkt_backup.sh"))

    # print('Create tar file...')
    # with tarfile.open(base_dir_tgz, "w:gz") as tar:
    #     tar.add(base_dir, arcname=os.path.basename(base_dir))

    print('Transfer the files to server...')
    subprocess.run(f'scp -i ForStudy.pem -r {base_dir}/* ubuntu@varkt.com:/home/ubuntu/varkt/', shell=True)

    print('Start ssh and run script...')
    # Install requirements
    subprocess.run('ssh -i ForStudy.pem -t ubuntu@varkt.com "sudo supervisorctl restart varkt & sudo pip3 install -r ./varkt/tornado/requirements.txt"', shell=True)
    input('You can close the window now')

except Exception as ex:
    print(ex)
    input('Error occurred')
