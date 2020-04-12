export default {
  meanList: [
    {
      key: '1',
      name: '导航一',
      path: 'navigate1',
      icon: 'el-icon-location',
      component: {
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