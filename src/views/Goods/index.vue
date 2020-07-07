<template>
  <div class="goods">
    <p>商品管理</p>
      <CommonForm
      :formFields="fields"
      :formData="searchForm"
      :inline="true"
      @search="handleSearch"
      ></CommonForm>

    <CommonTable
      :columns="columns"
      :tableData="goods"
      :pagerData="pager"
      :tableHeight="430"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      @switch="handleSwitch"
      @del="handleDelete"
      @dels="handleDels"
      @on-sales="handleOnSales"
      @off-sales="handleOffSales"
    ></CommonTable>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable'
import CommonForm from '@/components/CommonForm'
export default {
  data () {
    return {
      pager: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      fields: [
        {
          label: '名称',
          prop: 'name',
          type: 'input'
        },
        {
          label: '分类',
          prop: 'category',
          type: 'select',
          options: [
            {
              label: '零食',
              value: 1
            },
            {
              label: '饮料',
              value: 2
            }
          ]
        },
        {
          label: '品牌',
          prop: 'brand',
          type: 'select',
          options: [
            {
              label: '可口可乐',
              value: 1
            },
            {
              label: '乐事',
              value: 2
            }
          ]
        },
        {
          label: '标签',
          prop: 'tag',
          type: 'select',
          options: [
            {
              label: '薯片',
              value: 1
            },
            {
              label: '辣条',
              value: 2
            }
          ]
        },
        {
          label: '价格区间',
          props: ['minPrice', 'maxPrice'],
          type: 'region'
        },
        {
          type: 'btns',
          buttons: [
            {
              label: '确认'
            },
            {
              label: '取消'
            }
          ]
        }
      ],
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
          label: '简述',
          prop: 'goods_brief'
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
  components: {
    CommonTable,
    CommonForm
  },
  methods: {
    async getGoods (params = {}) {
      const [data, total] = await this.$http.get('/api/goods', { params })
      this.goods = data
      this.pager.total = total
    },
    async handleSwitch (row) {
      const status = row.is_on_sale === 1 ? 0 : 1
      await this.$http.put(`/api/goods/update/${row.id}`, { is_on_sale: status })
      await this.getGoods()
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (row) {
      console.log(row)
    },
    handleSearch (playload) {
      console.log('search')
      console.log(playload)
    },
    async handleCurrentChange (currentPage) {
      const params = { currentPage, pageSize: this.pager.pageSize }
      await this.getGoods(params)
    },
    async handleSizeChange (pageSize) {
      const params = { pageSize, currentPage: this.pager.currentPage }
      await this.getGoods(params)
    },
    handleCreate () {},
    async handleDels (selected) {
      const ids = selected.map(item => item.id)
      console.log(ids)
    },
    async handleOnSales (selected) {
      const ids = selected.filter(item => !item.is_on_sale)
        .map(item => item.id)
      console.log(ids, ids.length)
      await this.$http.put('/api/goods/updates', { ids, is_on_sale: 1 })
      await this.getGoods()
    },
    async handleOffSales (selected) {
      const ids = selected.filter(item => item.is_on_sale)
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
  }
</style>
