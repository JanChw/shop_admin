<template>
  <div class="goods">
    <p>商品管理</p>
    <div class="search">
      <el-form :model="searchForm" ref="form" :inline=true>
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="searchForm.category">
            <el-option value="零食"></el-option>
            <el-option value="饮料"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="searchForm.brand">
            <el-option value="可口可乐"></el-option>
            <el-option value="康师傅"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="searchForm.tag">
            <el-option value="饮料"></el-option>
            <el-option value="大米"></el-option>
          </el-select>
        </el-form-item>
        <div></div>
        <el-form-item label="价格区间" class="region">
          <el-input v-model="searchForm.minPrice"/>
          -
          <el-input v-model="searchForm.maxPrice" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <el-button>清空搜索条件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operators">
      <el-button type="primary" @click="handleCreate">添加商品</el-button>
      <el-button type="danger" @click="handleBatchDels">批量删除</el-button>
      <el-button type="warning" @click="handleBatchOffSales">批量下架</el-button>
      <el-button type="warning" @click="handleBatchOnSales">批量上架</el-button>
    </div>
    <el-table
      :data="goods"
      stripe
      height="450"
      @selection-change="handleSelectChange">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column v-for="col in columns"
        fit="false"
        :key="col.prop"
        :label="col.label">
        <template slot-scope="{ $index, row }">
          <span v-if="col.type === 'date'">{{ row[col.prop] | formatDate }}</span>
          <span v-else-if="col.type === 'sale_status'">
            {{ row[col.prop] | formatStatus }}</span>
          <span v-else-if="col.type === 'order'">
            {{ $index + 1 }}
          </span>
          <span v-else>{{ row[col.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="210">
        <template slot-scope="{ $index, row}">
          <el-button
            size="mini"
            type="warning"
            @click="handleSwitch($index, row)">{{ row.is_on_sale === 1 ? '下架' : '上架' }}</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit($index, row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :hide-on-single-page="isHiden"
        :page-sizes="[10, 20, 30]"
        :page-size="pager.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="pager.total" background>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentBatchType: '',
      selectedItems: [],
      pager: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      searchForm: {
        name: '',
        category: '',
        brand: '',
        tag: '',
        tagPrice: '',
        maxPrice: ''
      },
      columns: [
        {
          label: '序号',
          prop: 'order_number',
          type: 'order'
        },
        {
          label: '名称',
          prop: 'name'
        },
        {
          label: '总数',
          prop: 'goods_number'
        },
        {
          label: '销量',
          prop: 'sell_volume'
        },
        {
          label: '状态',
          prop: 'is_on_sale',
          type: 'sale_status'
        },
        {
          label: '创建日期',
          prop: 'created_at',
          type: 'date'
        }
      ],
      goods: [],
      total: 0
    }
  },
  computed: {
    isHiden () {
      return this.pager.total <= this.pager.pageSize
    }
  },
  filters: {
    formatDate (timeStr) {
      const time = new Date(timeStr)
      const year = time.getFullYear()
      const month = time.getMonth()
      const date = time.getDate()
      const hour = time.getHours()
      const minute = time.getMinutes()
      const second = time.getSeconds()
      return `${year}-${month}-${date}/${hour}:${minute}:${second}`
    },
    formatMoney () {
    },
    formatStatus (statusValue) {
      return statusValue ? '已上架' : '已下架'
    }

  },
  methods: {
    async getGoods (params = {}) {
      const [data, total] = await this.$http.get('/api/goods', { params })
      console.log('--------------')
      console.log(data)
      this.goods = data
      this.pager.total = total
      console.log('===============')
    },
    async handleSwitch (index, row) {
      const status = row.is_on_sale === 1 ? 0 : 1
      await this.$http.put(`/api/goods/update/${row.id}`, { is_on_sale: status })
      await this.getGoods()
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    onSearch () {
      console.log('search')
    },
    async handleCurrentChange (currentPage) {
      console.log(currentPage)
      this.pager.currentPage = currentPage
      const params = { currentPage, pageSize: this.pager.pageSize }
      await this.getGoods(params)
    },
    async handleSizeChange (pageSize) {
      this.pager.pageSize = pageSize
      const params = { pageSize, currentPage: this.pager.currentPage }
      await this.getGoods(params)
    },
    handleSelectChange (vals) {
      this.selectedItems = vals.map(item => {
        return { id: item.id, is_on_sale: item.is_on_sale }
      })
      console.log(this.selectedItems)
    },
    handleCreate () {},
    handleBatchDels () {},
    async handleBatchOnSales () {
      const ids = this.selectedItems.filter(item => !item.is_on_sale)
        .map(item => item.id)
      console.log(ids, ids.length)
      await this.$http.put('/api/goods/updates', { ids, is_on_sale: 1 })
      await this.getGoods()
    },
    async handleBatchOffSales () {
      const ids = this.selectedItems.filter(item => item.is_on_sale)
        .map(item => item.id)
      console.log(ids, ids.length)
      await this.$http.put('/api/goods/updates', { ids, is_on_sale: 0 })
      await this.getGoods()
    }
  },
  async mounted () {
    await this.getGoods()
  }

}
</script>

<style  lang="scss" scoped>
  .goods {
    .operators {
      margin: 20px 0;
    }
    .search {
      background-color: $main-color3;
      .el-form {
        padding: 20px 0 0 30px;
        .region {
          .el-form-item__content {
            width: 180px!important;
              .el-input {
                width: 37%;
              }
            }
          }
        }
    }
    .pager {
      margin-top: 30px;
      text-align: right;
    }
  }
</style>
