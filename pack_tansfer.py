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

    # # Move tornado server files
    # server_dir = os.path.join(base_dir, 'server')
    # for v in ['/handlers', '/tools', '/server.py', '/mongodbconnection.py', '/url.py']:
    #     source = 'listening-test-server' + v
    #     if os.path.isfile(source):
    #         shutil.copyfile(source, server_dir + v)
    #     else:
    #         shutil.copytree(source, server_dir + v, ignore=shutil.ignore_patterns('*.pyc', '__pycache__'))

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
    # subprocess.run(f'scp -i ForStudy.pem -r {base_dir}/* ubuntu@varkt.com:/home/ubuntu/varkt/')

    print('Start ssh and run script...')
    # Install requirements
    # subprocess.run('ssh -i ForStudy.pem ubuntu@63.34.10.16 "pip install tornado pymongo"')
    # subprocess.run('ssh -i ForStudy.pem ubuntu@63.34.10.16 "sudo supervisorctl reload"')
    # subprocess.run('ssh -i ForStudy.pem -t ubuntu@varkt.com "sudo supervisorctl restart varkt"')
    input('You can close the window now')

except Exception as ex:
    print(ex)
    input('Error occurred')
