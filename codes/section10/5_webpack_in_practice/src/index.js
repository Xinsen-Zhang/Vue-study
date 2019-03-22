import _ from 'lodash'
function appendDiv() {
    // let div = documment.createElement('div')
    var div = document.createElement('div');
    div.innerHTML = _.join(['你好', 'js 开发者'], ' ');
    document.body.append(div);
}
appendDiv();