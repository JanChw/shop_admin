<template>
  <div class="table">
    <div class="operators">
      <el-button type="primary" @click="handleCreate">添加商品</el-button>
      <el-button type="danger" @click="handleBatchDels">批量删除</el-button>
      <el-button type="warning" @click="handleBatchOffSales">批量下架</el-button>
      <el-button type="warning" @click="handleBatchOnSales">批量上架</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      :height="tableHeight"
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
            {{ row[col.prop] | formatSaleStatus }}</span>
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
            @click="handleDelete($index, row)">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :hide-on-single-page="isHiden"
        :page-sizes="[10, 20, 30]"
        :page-size="pagerData.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="pagerData.total" background>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'columns',
    'tableData',
    'pagerData',
    'tableHeight',
    'model'
  ],
  data () {
    return {
      selected: []
    }
  },
  computed: {
    isHiden () {
      return this.pagerData.total <= this.pagerData.pageSize
    }
  },
  methods: {
    handleCurrentChange (currentPage) {
      this.$emit('current-change', currentPage)
    },
    handleSizeChange (pageSize) {
      this.$emit('size-change', pageSize)
    },
    handleSelectChange (selected) {
      this.selected = selected
      this.$emit('selection-change', selected)
    },
    handleCreate () {
      this.$emit('create', this.model)
    },
    async handleBatchDels () {
      if (!this.selected.length) {
        return this.$message({
          message: '请先选中要删除的选项！',
          type: 'error'
        })
      }
      try {
        await this.$confirm('此操作将永久删除选择的项, 是否继续?',
          { type: 'warning' })
      } catch (error) { return }

      this.$emit('dels', this.selected)
    },
    handleBatchOffSales () {
      if (!this.selected.length) {
        return this.$message({
          message: '请先选中要下架的选项！',
          type: 'error'
        })
      }
      this.$emit('off-sales', this.selected)
    },
    handleBatchOnSales () {
      if (!this.selected.length) {
        return this.$message({
          message: '请先选中要上架的选项！',
          type: 'error'
        })
      }
      this.$emit('on-sales', this.selected)
    },
    handleSwitch (index, row) {
      this.$emit('switch', row)
    },
    async handleDelete (index, row) {
      try {
        await this.$confirm('此操作将永久删除该项, 是否继续?',
          { type: 'warning' })
      } catch (error) { return }
      this.$emit('del', row.id)
    },
    handleEdit (index, row) {
      this.$emit('edit', row)
    }
  }

}
</script>

<style lang="scss">
  .table {
    .el-table th, .el-table td {
      text-align: center;
    }
    .operators {
      margin: 20px 0;
    }
     .pager {
      margin-top: 30px;
      text-align: right;
    }
  }

</style>
