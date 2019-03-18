import hashlib
import datetime
import random
import string
import config
import pymysql

def get_data_by_date(date= "2019-03-12"):
    """ 利用 date 生成条件
    param date(str) : 日期, 格式'2019-03-17'
    return (str) : sql 的条件
    """
    from_ = date + ' 00:00:00'
    to_ = date + " 23:59:59"
    return 'lastModified BETWEEN "{}" AND "{}"'.format(from_, to_)

def get_data_by_type(type_="video"):
    """ 利用 type 生成条件
    param tpye_(str) : 类型, 'video' 或者 'image'
    return (str) : sql 的条件
    """
    return 'type="{}"'.format(type_)

def get_data_by_category(category= "hottest"):
    """ 利用 category 生成条件
    param category(str) : 类别, 'hottest' 获得 'latest'
    return (str) : sql 的条件
    """
    return 'category="{}"'.format(category)

def sort_data(field= None, order="DESC"):
    """ 利用特定的字段和顺序对数据进行排序
    param field(str) : 字段, 可以是'lastModified', 'contentLength' 或者其他的
    param order(str) : 顺序, "DESC" 表示降序, "ASC" 表示升序
    return (str) : sql 的排序语句
    """
    if field == None:
        return ''
    return "ORDER BY {} {}".format(field, order)

def limitation(num=None):
    """利用分页限制取得的数据的数量
    param num(int): 表示限制的数量
    return (str) : sql 的分页语句
    """
    if num:
        return "LIMIT {}".format(num)
    else:
        return ""

def calculate_token(path):
    """ 传入 path, 鉴权计算出 CDN 对应的链接
    param path(str): bucket 中的路径(key)
    return (str): 鉴权计算出来的路径
    """
    timestap = int(datetime.datetime.now().timestamp())
    rand = ''.join(random.sample(string.ascii_letters + string.digits, random.randint(1,10)))
    uid = '0'
    private_key = 'xwx19980703'
    message = '{}-{}-{}-{}-{}'.format(path, timestap, rand, uid, private_key)
    md5hash = hashlib.md5(message.encode()).hexdigest()
    base = config.CDN_BASE
    url = '{}?sign={}-{}-{}-{}'.format(path, timestap, rand, uid, md5hash)
    return '{}{}'.format(base, url)

class MySQL(object):
    def __init__(self):
        self.connection = pymysql.Connection(host= config.host, user= config.user, password= config.password, port= config.port, database= config.dbname, charset="utf8")
        self.cursor = self.connection.cursor()
    
    def exec_query(self, query):
        """执行单个 query 语句
        param query(str): query 语句
        return (void): 不返回内容
        """
        try:
            self.connection.ping(True)
            self.cursor.execute(query)
            self.connection.commit()
        except Exception as e:
            print(e)
    
    def close_connection(self):
        """关闭数据库链接
        return (void): 不返回内容
        """
        self.cursor.close()
        self.connection.close()
        print('database connection is closed')

    def fetch_data(self, select_query, all=True):
        """ 传入 select 开头的 query 语句, 返回取得的数据
        param select_query(str): query 语句
        param all(boolean): True => fetch_all, False => fetch_one
        return (list): 返回数据的列表
        """
        self.connection.ping(True)
        self.cursor.execute(select_query)
        select_query_ = select_query
        keys = []
        if '*' in select_query:
            keys.append('topic')
            keys.append('category')
            keys.append('lastModified')
            keys.append('path')
            keys.append('size')
            keys.append('contentLength')
            keys.append('type')
        else:
            if 'WHERE' in select_query:
                select_query = select_query.split('WHERE')[0]
            if 'ORDER' in select_query:
                select_query = select_query.split('ORDER')[0]
            if 'LIMIT' in select_query:
                select_query = select_query.split('LIMIT')[0]
            select_query = select_query.lower()
            pass
            # TODO: fields 的判断和键入
        # 数组保存结果
        result_ = []
        if all:
            result = self.cursor.fetchall()
            num = len(result)
            for i in range(num):
                record = result[i]
                item = {}
                length = len(record)
                for j in range(length):
                    item[keys[j]] = record[j]
                result_.append(item)
        else:
            result = self.cursor.fetchone()
            num = len(result)
            item = {}
            for i in range(num):
                item[keys[i]] = result[i]
            result_.append(item)
        num = len(result_)
        for i in range(num):
            result_[i]['cdn_link'] = calculate_token(result_[i]['path'])
        return result_


if __name__ == "__main__":
    lastModified_condition = get_data_by_date('2019-03-17')
    type_condition = get_data_by_type('video')
    category_condition = get_data_by_category('hottest')
    order_by = sort_data('contentLength')
    limit = limitation()
    sql = "select * from `COS` where {} and {} and {} {} {}".format(
        lastModified_condition, type_condition, category_condition, order_by, limit
        )
    SQL = MySQL()
    fetch_data = SQL.fetch_data(select_query= sql, all= True)
    SQL.close_connection()
    for record in fetch_data:
        for k,v in record.items():
            print('{}: {}'.format(k, v))
            print('-' * 10)