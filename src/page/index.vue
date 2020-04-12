<template>
  <div class="route-page">
    <div class="leat-main">
      <left-mean ref="leftMean" />
    </div>
    <div class="right-main">
      <router-view />
    </div>
    <el-button class="add-btn-pos" type="primary" @click="addNewRoute">
      添加路由
    </el-button>
    <el-dialog
      title="新增路由"
      :visible.sync="addRouteVisible"
      width="450px"
    >
      <el-form ref="routeForm" :model="routeInfo" label-width="100px">
        <el-form-item label="上级菜单">
          <el-cascader v-model="routeInfo.preMeanName" :options="options" :show-all-levels="false" :props="{ checkStrictly: true }" />
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="routeInfo.meanName" />
        </el-form-item>
        <el-form-item label="路由名称">
          <el-input v-model="routeInfo.routeName" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRouteVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="saveNewRoute">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import leftMean from '@/components/left-mean.vue'
export default {
  components: {
    leftMean
  },
  data () {
    return {
      addRouteVisible: false,
      options: [],
      routeInfo: {
        preMeanName: '',
        meanName: '',
        routeName: ''
      }
    }
  },
  methods: {
    addNewRoute () {
      if (this.$refs.routeForm) {
        this.$refs.routeForm.resetFields()
        for (const k in this.routeInfo) {
          this.routeInfo[k] = ''
        }
      }
      const meanList = this.$store.getters.meanList
      const reduceFun = function (arr) {
        const routes = []
        for (let i = 0; i < arr.length; i++) {
          const el = arr[i]
          let routeObj = {}
          routeObj = {
            value: el.path,
            label: el.name
          }
          if (el.sonList) {
            const childRoute = reduceFun(el.sonList)
            routeObj.children = childRoute
          }
          routes.push(routeObj)
        }
        return routes
      }
      const routes = reduceFun(meanList)
      this.options = routes
      this.addRouteVisible = true
    },
    saveNewRoute () {
      const { preMeanName, meanName, routeName } = this.routeInfo
      this.addRouteVisible = false
      const arr = []
      if (Array.isArray(preMeanName)) {
        let options = this.options
        for (const k of preMeanName) {
          for (let i = 0; i < options.length; i++) {
            if (k === options[i].value) {
              options = options[i].children
              arr.push(i)
              break
            }
          }
        }
      }
      let obj = this.$store.getters.meanList
      for (const el of arr) {
        if (obj.sonList) {
          obj = obj.sonList[el]
        } else {
          obj = obj[el]
        }
      }
      const key = obj.key
      if (obj.sonList) {
        const length = obj.sonList.length + 1
        obj.sonList.push({
          key: key + '-' + length,
          name: meanName,
          path: routeName,
          component: {
            render (createElement) {
              return createElement('div', null, meanName)
            }
          }
        })
      } else {
        const oArr = [
          {
            key: key + '-1',
            name: meanName,
            path: routeName,
            component: {
              render (createElement) {
                return createElement('div', null, meanName)
              }
            }
          }
        ]
        obj.component = {
          render (createElement) {
            return createElement('router-view', null, '')
          }
        }
        this.$set(obj, 'sonList', oArr)
      }
      this.$refs.leftMean.createRoutes()
    }
  }
}
</script>

<style>
a{
  text-decoration: none;
  color: initial;
  display: inline-block;
  width: 100%;
}
.route-page{
  display: flex;
}
.leat-main{
  width: 240px;
  flex-shrink: 0;
  min-height: 100vh;
  border-right: solid 1px #e6e6e6;
}
.leat-main .el-menu{
  border-right: 0;
}
.right-main{
  flex-grow: 1;
  min-height: 100vh;
  padding: 10px;
}
.add-btn-pos{
  position: fixed;
  right: 40px;
  bottom: 40px;
}
</style>
