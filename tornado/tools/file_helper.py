import hashlib
import os

static_root_url = '/static'


def write_upload_img(file, folder):
    path = os.path.join(os.getcwd(), "static", folder)
    if not os.path.exists(path):
        os.makedirs(path)
    extension_file = os.path.splitext(file["filename"])[1]
    file_name = hashlib.md5(file["body"]).hexdigest() + extension_file
    path = os.path.join(path, file_name)
    with open(path, 'wb') as up:
        up.write(file["body"])
    return f"{static_root_url}/{folder}/{file_name}"


def write_upload_files(file_metas, folder):
    path = os.path.join(os.getcwd(), "static", folder)
    # 多重创建不存在目录
    if not os.path.exists(path):
        os.makedirs(path)
    files_paths = []
    for meta in file_metas:
        files_paths.append(f'{static_root_url}/{folder}/{meta["filename"]}')
        with open(os.path.join(path, meta["filename"]), 'wb') as up:
            up.write(meta['body'])
    return files_paths


def list_files(folder):
    path = os.path.join(os.getcwd(), "static", folder)
    result = []
    if os.path.exists(path):
        dirs = os.listdir(path)
        for f in dirs:
            stat = os.stat(path + "/" + f)
            result.append({
                'filename': f,
                'size': stat.st_size,
                'change_time': stat.st_ctime,
                'url': os.path.join(static_root_url, folder, f)
            })
    return result


def delete_file(folder, filename):
    path = os.path.join(os.getcwd(), "static", folder, filename)
    if os.path.exists(path):
        os.remove(path)
        return True
    return False
