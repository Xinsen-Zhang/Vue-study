import _ from 'lodash';
import './index.css';
import './index.sass';
function appendDiv() {
    // let div = documment.createElement('div')
    var div = document.createElement('div');
    div.innerHTML = _.join(['你好', 'js 开发者'], ' ');
    div.className = 'box';
    div.classList.add('boxes');
    document.body.append(div);
}
appendDiv();