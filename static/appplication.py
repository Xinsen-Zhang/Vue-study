import flask
from flask import jsonify, request
import utils
application = flask.Flask(__name__)
SQL = utils.MySQL()

@application.route('/api/cat/ins')
def ins_cat():
    params = request.args
    # print(params)
    date = params.get('date', '')
    type_ = params.get('type', '')
    category = params.get('category', '')
    limit = params.get('limit', '')
    orderby = params.get('orderby', '')
    order = params.get('order', 'DESC')
    condition = ''
    conditions = []
    if date:
        date = utils.get_data_by_date(date)
        # condition = condition + date
        conditions.append(date)
    if type_:
        type_ = utils.get_data_by_type(type_)
        # condition = condition + " and " + type_
        conditions.append(type_)
    if category:
        category = utils.get_data_by_category(category)
        # condition = condition + " and " + category
        conditions.append(category)
    if conditions == []:
        condition = ""
    else:
        condition = 'AND'.join(conditions)
    if condition:
        condition = "WHERE " + condition
    else:
        condition = 'WHERE lastModified between "2019-03-12 00:00:00" and "2019-03-12 23:59:59"'
    if limit:
        limit = utils.limitation(int(limit))
    if orderby:
        orderby = utils.sort_data(orderby, order)
    condition = condition.replace('"', "'")
    print(condition)
    orderby = orderby.replace('"', "'")
    limit = limit.replace('"', "'")
    suffix = condition + " " + orderby + " " + limit
    query = 'select * from `COS` ' + suffix
    query = query.replace('\"', "'")
    fetch_data = SQL.fetch_data(query)
    if fetch_data:
        temp = {}
        if condition:
            temp['condition'] = condition
        if limit:
            temp['limit'] = limit
        if orderby:
            temp['orderby'] = orderby
        num = len(fetch_data)
        temp['data_num'] = num
        temp['data'] = fetch_data
        return jsonify(temp)
    else:
        return jsonify({'message':'missing params'})

if __name__ == '__main__':
    application.run(port= 80)