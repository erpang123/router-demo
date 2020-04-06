<script>
import demoModel from './demo-model'
import listItem from '@/components/list-item.vue'
export default {
  components: {
    listItem,
    demoModel
  },
  data () {
    return {
      meanList: [
        {
          key: '1',
          name: '导航一',
          path: 'navigate1',
          icon: 'el-icon-location',
          component: {
            // templete: `
            //   <router-view></router-view>
            // `
            render (createElement) {
              return createElement('router-view', null, '')
            }
          },
          sonList: [
            {
              key: '1-1',
              name: '选项1',
              path: 'second1',
              component: {
                render (createElement) {
                  return createElement('div', null, '选项1')
                }
              }
            },
            {
              key: '1-2',
              name: '选项2',
              path: 'second2',
              component: {
                render (createElement) {
                  return createElement('router-view', null, '')
                }
              },
              sonList: [
                {
                  key: '1-2-1',
                  name: '选项2-1',
                  path: 'second1',
                  component: {
                    render (createElement) {
                      return createElement('div', null, '选项2-1')
                    }
                  }
                },
                {
                  key: '1-2-2',
                  name: '选项2-2',
                  path: 'second2',
                  component: {
                    render (createElement) {
                      return createElement('div', null, '选项2-2')
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          key: '2',
          name: '导航二',
          path: 'navigate2',
          component: {
            render (createElement) {
              return createElement('div', null, '导航二')
            }
          },
          icon: 'el-icon-menu'
        },
        {
          key: '3',
          name: '导航三',
          path: 'navigate3',
          component: {
            render (createElement) {
              return createElement('div', null, '导航三')
            }
          },
          icon: 'el-icon-document'
        },
        {
          key: '4',
          name: '导航四',
          path: 'navigate4',
          component: {
            render (createElement) {
              return createElement('div', null, '导航四')
            }
          },
          icon: 'el-icon-setting'
        }
      ]
    }
  },
  created () {
    this.createRoutes()
  },
  methods: {
    createRoutes () {
      const reduceFun = function (arr) {
        const routes = []
        for (let i = 0; i < arr.length; i++) {
          const el = arr[i]
          let routeObj = {}
          routeObj = {
            path: el.path,
            component: el.component
          }
          if (el.sonList) {
            const childRoute = reduceFun(el.sonList)
            routeObj.children = childRoute
          }
          routes.push(routeObj)
        }
        return routes
      }
      const routes = reduceFun(this.meanList)
      let oldR = this.$router.options.routes[1]
      oldR.children = routes
      this.$router.addRoutes([oldR])
    }
  },
  render (createElement) {
    let domArr = []
    let path = '/routeD'
    const reduceFun = function (arr, zIndex) {
      const lArr = []
      for (let i = 0; i < arr.length; i++) {
        const el = JSON.parse(JSON.stringify(arr[i]))
        let index
        let domList = null
        if (zIndex !== 1) {
          index = zIndex + '-' + i
        } else {
          // path = '/routeD'
          index = i.toString()
        }
        if (!el.path.includes('/')) {
          el.path = path + '/' + el.path
        }
        if (el.sonList) {
          path = el.path
          const domObj = reduceFun(el.sonList, index)
          let arrPath = el.path.split('/')
          path = arrPath.slice(0,-1).join('/')
          domList = domObj.lArr
        }
        console.log(el.path)
        const dom = createElement('list-item', {
          props: {
            item: el,
            i: el.key || i.toString()
          }
        }, domList)
        lArr.push(dom)
      }
      return {
        lArr
      }
    }
    const obj = reduceFun(this.meanList, 1)
    domArr = obj.lArr
    return createElement('el-menu', {
      class: 'el-menu-vertical-demo',
      props: {
        'default-active': '1'
      },
      on: {
        select (obj) {
          console.log(obj)
        }
      }
    }, domArr)
  }
}
</script>
