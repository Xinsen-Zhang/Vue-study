import _ from 'lodash';
import './index.css';
import './index.sass';

function appendDiv() {
    var div = document.createElement('div');
    div.innerHTML = _.join(['你好', 'js 开发者'], ' ');
    div.className = 'box';
    div.classList.add('boxes');
    div.classList.add('bg1');
    document.body.append(div);
    div = document.createElement('div');
    div.innerText = 'for background test';
    div.className = 'bg2';
    document.body.append(div);
    div = document.createElement('div');
    div.innerText = '检测是否是热更新';
    div.className = 'box';
    document.body.append(div);
}
appendDiv();