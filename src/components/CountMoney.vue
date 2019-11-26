<template>
  <div>
    <div>
      <h1>
        宿舍水电煤气费计费系统
      </h1>
    </div>
    <div>
      <div v-if="!tableShow">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="sum" placeholder="请输入总金额"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-for="data in tableData" :key="data.id">
          <el-col :span="6">
            <el-input v-model="data.id" placeholder="请输入房号"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="data.name" placeholder="请输入姓名"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="data.lastRes" placeholder="请输入上次读数"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="data.nowRes" placeholder="请输入今次读数"></el-input>
          </el-col>
        </el-row>
      </div>
      <el-button type="primary" @click="generateList" class="generateList" v-if="!tableShow">生成结果列表</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-show="tableShow">
      <el-table-column
        prop="id"
        label="房号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lastRes"
        label="上次读数">
      </el-table-column>
      <el-table-column
        prop="nowRes"
        label="今次读数">
      </el-table-column>
      <el-table-column
        prop="difference"
        label="差值">
      </el-table-column>
      <el-table-column
        prop="differenceMoney"
        label="差值×0.65">
      </el-table-column>
    </el-table>
    <div class="res" v-show="tableShow">
        {{res}}
    </div>
    <el-button type="primary" @click="returnLastStep" class="returnLastStep" v-if="tableShow">返回上一步修改</el-button>
  </div>
</template>

<script>
export default {
  name: 'CountMoney',
  data() {
    return {
      index:0,
      tableShow:false,
      sum:810,
      res:'',
      tableData: [
      {
        id: '7021',
        name: '阮淦标',
        lastRes: '3734',
        nowRes:'3971',
        difference:'',
        differenceMoney:'',
      }, 
      {
        id: '7022',
        name: '吴升鹏',
        lastRes: '1613',
        nowRes:'1888',
        difference:'',
        differenceMoney:'',
      }, 
      {
        id: '7023',
        name: '罗毅豪',
        lastRes: '1542',
        nowRes:'1724',
        difference:'',
        differenceMoney:'',
      },  
      {
        id: '7024',
        name: '刘超',
        lastRes: '4785',
        nowRes:'5019',
        difference:'',
        differenceMoney:'',
      }, 
      ]
    }
  },
  methods:{
    generateList(){
      this.tableShow = true;
      let str = `公共区域水电费：${this.sum}-`;
      let difference = this.sum;
      for(var i = 0;i < this.tableData.length;i++){
        if(!!this.tableData[i].name){
          this.tableData[i].difference = Number(this.tableData[i].nowRes) - Number(this.tableData[i].lastRes);
          console.log(this.tableData[i].difference)
          this.tableData[i].differenceMoney = (this.tableData[i].difference * 0.65).toFixed(2);
          str += this.tableData[i].differenceMoney + '-';
          difference -= this.tableData[i].differenceMoney;
        }else{
          this.tableData.splice(i,1);
          i--;
        }
      }
      difference = difference.toFixed(2);
      str = str.substring(0,str.length - 1);
      str += `=${difference}（元）\n`;
      let perPeopleFree = (difference/this.tableData.length).toFixed(2);
      str += `每人公共区域费用：${difference}÷${this.tableData.length}=${perPeopleFree}（元）\n`;
      str +=`因此，\n`;
      for(var i = 0;i < this.tableData.length;i++){
        let finalFree = parseFloat(this.tableData[i].differenceMoney) + parseFloat(perPeopleFree);
        finalFree = finalFree.toFixed(2);
        if(!!this.tableData[i].name){
          str += `${this.tableData[i].name}应交费：${this.tableData[i].differenceMoney}+${perPeopleFree}= ${finalFree}（元）\n`;
        }
      }
      this.res = str.substring(0,str.length - 1);
    },
    returnLastStep(){
      this.tableShow = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

@marginLen:20px;
.el-row{
  margin-bottom: @marginLen;
}
.generateList{
  margin-bottom: @marginLen;
}
.res{
  margin-top: @marginLen;
  line-height: 2;
  /* 字符串换行 */
  white-space:pre-wrap;
}
h1{
  font-size:25px;
  color:green;
  /* 字与字之间设置间隔 */
  letter-spacing:5px;
  margin-bottom: @marginLen;
}
</style>
