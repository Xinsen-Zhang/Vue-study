# component-communication

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## depencity info
* static folder
```text
└── lib
    ├── bootstrap
    │   ├── css
    │   │   ├── bootstrap-grid.css
    │   │   ├── bootstrap-grid.css.map
    │   │   ├── bootstrap-grid.min.css
    │   │   ├── bootstrap-grid.min.css.map
    │   │   ├── bootstrap-reboot.css
    │   │   ├── bootstrap-reboot.css.map
    │   │   ├── bootstrap-reboot.min.css
    │   │   ├── bootstrap-reboot.min.css.map
    │   │   ├── bootstrap.css
    │   │   ├── bootstrap.css.map
    │   │   ├── bootstrap.min.css
    │   │   └── bootstrap.min.css.map
    │   └── js
    │       ├── bootstrap.bundle.js
    │       ├── bootstrap.bundle.js.map
    │       ├── bootstrap.bundle.min.js
    │       ├── bootstrap.bundle.min.js.map
    │       ├── bootstrap.js
    │       ├── bootstrap.js.map
    │       ├── bootstrap.min.js
    │       └── bootstrap.min.js.map
    ├── jquery
    │   ├── core.js
    │   ├── jquery.js
    │   ├── jquery.min.js
    │   ├── jquery.min.map
    │   ├── jquery.slim.js
    │   ├── jquery.slim.min.js
    │   └── jquery.slim.min.map
    ├── popper
    │   └── popper.min.js
    └── vue
        └── js
            └── vue.js

```

## configuration
* `.eslintrc.js`file
  * add `'indent': 'off'` to turn off the indentation correction
* `config/index.js`
  * set `autoOpenBrowser: true` to open broswer automatically

## split components
* index.html to an App.vue and three child components

## event intereaciton implement

* using direactives in `Vue` 

## communication beteen components via PUBSUB.js
### install
* cnpm i --save-dev pubsub
