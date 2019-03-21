import hashlib
import datetime
import random
import string

def calculate_token(path):
    timestap = int(datetime.datetime.now().timestamp())
    rand = ''.join(random.sample(string.ascii_letters + string.digits, random.randint(1,10)))
    uid = '0'
    private_key = 'xwx19980703'
    message = '{}-{}-{}-{}-{}'.format(path, timestap, rand, uid, private_key)
    md5hash = hashlib.md5(message.encode()).hexdigest()
    base = 'http://cdn.meituanhao.cn'
    url = '{}?sign={}-{}-{}-{}'.format(path, timestap, rand, uid, md5hash)
    return '{}{}'.format(base, url)

if __name__ == '__main__':
    path = '/mirrors/texlive2018.iso'
    url = calculate_token(path)
    print(url)