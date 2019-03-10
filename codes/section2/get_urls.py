import requests
import re
base_url = 'http://39.107.99.64:9999/ins/cat/hottest/image/2019-03-06/'
req = requests.get(base_url)
html = req.text
images = re.findall(r'href="(.*?.png)"', html)
images = [base_url + image for image in images]
print(images)