<template>
<article>
    <div class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @keydown.enter.native="getBlogList"></el-input>
        <el-button type="primary" icon="el-icon-search" :loading="loading" @click="getBlogList">搜索</el-button>
    </div>
    <el-table ref="multipleTable" :data="blogList" tooltip-effect="dark" stripe border>
        <el-table-column type="index" width="55" align="center" header-align="center" :index="increment"></el-table-column>

        <el-table-column show-overflow-tooltip v-if="!item.hidden && !item.filters" v-for="(item, index) in headerOptions" :key="index" :label="item.label" :prop="item.prop" :header-align="item.headerAlign" :align="item.align" :sortable="item.sort"  :min-width="item.minWidth || 150">
            <template slot-scope="scope">
                <div v-if="scope.column.property == 'isVisible'">{{scope.row[scope.column.property]?'是':'否'}}</div>
                <div v-else-if="scope.column.property == 'source'">{{scope.row[scope.column.property] === 1?'原创':scope.row[scope.column.property] === 2?'转载':'翻译'}}</div>
                <div v-else-if="scope.column.property == 'releaseTime'">{{scope.row[scope.column.property] | parseTime('{y}-{m}-{d}')}}</div>
                <div v-else>{{scope.row[scope.column.property] || '无'}}</div>
            </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip v-else-if="!item.hidden && item.filters" :key="index" :label="item.label" :prop="item.prop" :header-align="item.headerAlign" :align="item.align" :sortable="item.sort" :filters="item.filters" :filter-method="filterTag"  :min-width="item.minWidth || 200">
            <template slot-scope="scope">
                <el-tag
                    class="tag"
                    type="primary"
                    close-transition 
                    v-for="(tag, index) in scope.row.type" :key="index">{{tag}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center" width="250">
            <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageindex"
      :page-sizes="size_scoped"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="blogTotal">
    </el-pagination>
    <EditComponent v-if="editShow" :info="blogInfo" @close="close"></EditComponent>

</article>
</template>
<script>
    import { mapGetters } from 'vuex'
    import EditComponent from '../edit/index'
    import { blogFilters } from 'store/modules/classify'
    export default {
        components: {
            EditComponent
        },
        data() {
            return {
                keyword: '',
                editShow: false,
                blogInfo: {},
                loading: false,
                pageindex: 1,
                pagesize: 10,
                size_scoped: [10, 20, 30, 40],
                headerOptions: [
                    {
                        label: '_id',
                        prop: '_id',
                        hidden: true,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: '类型',
                        prop: 'type',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: '',
                        filters: blogFilters                   
                    },
                    {
                        label: '标题',
                        prop: 'title',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: '',
                        sort: true
                    },
                    {
                        label: '描述',
                        prop: 'desc',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: '来源',
                        prop: 'source',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: '级别',
                        prop: 'level',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: '发布时间',
                        prop: 'releaseTime',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: '',
                        sort: true
                    },
                    {
                        label: '是否可见',
                        prop: 'isVisible',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        minWidth: 120
                    }
                ],
                multipleSelection: []
            }
        },
        mounted () {
            this.getBlogList()
        },

        methods: {
            increment (index) {
                return index+1+((this.pageindex-1)*this.pagesize)
            },
            close () {
                this.editShow = false;
                this.getBlogList()
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pagesize = val;
                this.getBlogList()
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.pageindex = val;
                this.getBlogList()
            },
            async getBlogList () {
                this.loading = true;
                try {
                    await this.$store.dispatch('getBlogList', {
                        keyword: this.keyword,
                        pageindex: this.pageindex,
                        pagesize: this.pagesize
                    })
                    this.loading = false;
                }catch(e) {
                    this.loading = false;
                }
            },
            del (scope) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning',
                      center: true
                    }).then(async () => {
                        try {
                    await this.$store.dispatch('delBlog', scope.row._id)
                    this.blogList.splice(scope.$index, 1)
                }catch(e) {

                }
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });
                    });
                
            },
            edit (scope) {
                console.log(scope)
                this.editShow = true;
                scope.row.releaseTime = new Date(scope.row.releaseTime)
                this.blogInfo = scope.row
            },
            filterTag(value, row) {
                return row.type.some( v => v === value)
            }
        },
        computed: {
            ...mapGetters([
                'blogList',
                'blogTotal'
            ])
        }
    }
</script>

<style lang="less" scoped>
    article {
        padding: 20px;
        .search {
            padding-bottom: 20px;
            .el-input {
                width: 300px;
            }
        }
        .pagination {
            text-align: right;
            padding: 20px 0;
        }
        .tag {
            margin: 0 10px;
        }
    }
</style>
