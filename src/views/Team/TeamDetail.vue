<template>
  <div class="teamdetail-container">
    <detail-header title="阵容详情"></detail-header>
    <div class="bg">
      <img src="http://106.12.140.161:81/image/bg2.jpg" ref="topBg" />
    </div>
    <div class="author" v-if="teamInfo[0]">
      <img :src="teamInfo[0].authorImg" />
    </div>
    <div class="author-name" v-if="teamInfo[0]">
      <p>{{ teamInfo[0].author }}</p>
    </div>
    <div class="main">
      <div class="main-top" v-if="teamInfo[0]">
        <team-item :info="teamInfo[0]" :top="false" :foot="false"></team-item>
      </div>
      <div class="main-iconlist">
        <div class="icon-table">
          <div class="icon-item" v-for="(icon, index) in iconList" :key="index">{{ icon.num + '  ' + icon.name }}</div>
        </div>
        <div class="icon-detail" @click="myUtil.openAndClose(racedetail.content)">
          羁绊详情
          <i class="iconfont icon-xiangxia"></i>
        </div>
      </div>
      <!-- 可展开的羁绊详情 -->
      <race-detail
        v-if="raceIdList.length && jobIdList.length"
        ref="racedetail"
        :raceIdList="raceIdList"
        :jobIdList="jobIdList"
      ></race-detail>
      <!-- 稳健运营 -->
      <div class="main-steady" v-if="teamInfo[0]">
        <div class="hr-line" style="height: 0.125rem" />
        <div class="title">稳健运营</div>
        <div class="st-content">{{ teamInfo[0].steadyContent }}</div>
        <div class="hr-line" style="height: 0.1875rem" />
      </div>
      <!-- 海克斯科技 -->
      <div class="main-hex">
        <div class="title">海克斯科技</div>
        <!-- 优选 -->
        <div id="first-choose" class="choose">
          <div class="left">
            <div class="hex-item" v-for="hexinfo in hexInfoList.slice(0, 3)" :key="hexinfo.id">
              <img :src="hexinfo.imgUrl" />
              <p>{{ hexinfo.name }}</p>
            </div>
          </div>
          <div class="right">
            <div class="three"></div>
            <div class="choose-label">优选</div>
          </div>
        </div>
        <!-- 次选 -->
        <div id="second-choose" class="choose">
          <div class="left">
            <div class="hex-item" v-for="hexinfo in hexInfoList.slice(3)" :key="hexinfo.id">
              <img :src="hexinfo.imgUrl" />
              <p>{{ hexinfo.name }}</p>
            </div>
          </div>
          <div class="right">
            <div class="three-second"></div>
            <div class="choose-label-second">备选</div>
          </div>
        </div>
      </div>
      <!-- 抢装顺序 -->
      <div class="main-equip-order">
        <div class="title">抢装顺序</div>
        <div class="order">
          <div class="orderitem" v-for="(equip, index) in equipOrderList" :key="equip.equipId">
            <img :src="equip.imagePath" />
            <i v-if="index !== equipOrderList.length - 1" class="iconfont icon-youjiantou2"></i>
          </div>
        </div>
        <div class="hr-line" style="height: 0.1875rem" />
      </div>
      <!-- 棋盘 -->
      <div class="main-chessboard" v-if="teamInfo[0]">
        <chess-board :needInfo="formatNeedInfo"></chess-board>
        <div class="icon-detail" @click="myUtil.openAndClose(hiddenbox.content)">
          站位详情<i class="iconfont icon-xiangxia"></i>
        </div>
        <hidden-box ref="hiddenbox"></hidden-box>
      </div>
    </div>
  </div>
</template>

<script>
import teamItem from '@/components/Team/TeamItem.vue'
import chessBoard from '@/components/Team/Chessboard.vue'
import detailHeader from '@/components/DetailHeader.vue'
import raceDetail from '@/components/Team/RaceDetail.vue'
import hiddenBox from '@/components/Team/HiddenBox.vue'
import api from '@/api/index'
import myUtil from '@/util/utils'
import { hiddenFooter } from '@/hooks/useHidden'
import { ref, onMounted, watchEffect, nextTick, computed } from 'vue'
export default {
  name: 'teamDetail',
  props: ['teamId'],
  components: {
    detailHeader,
    hiddenBox,
    teamItem,
    chessBoard,
    raceDetail
  },
  setup(props) {
    // 隐藏底部
    hiddenFooter()
    // 隐藏盒子控制
    const hiddenbox = ref()
    const racedetail = ref()
    // #region 检测头部滚动实现高斯模糊
    const scrollTop = ref(0)
    const topBg = ref()
    // 获取屏幕滚动距离
    const handleScroll = () => {
      window.addEventListener('scroll', () => {
        scrollTop.value = window.scrollY
      })
    }
    // 监视scrolltop 计算百分比并设置filter
    watchEffect(() => {
      let blur = 0
      const top = scrollTop.value
      nextTick(() => {
        const percent = Math.abs(top / topBg.value.height)
        if (percent >= 1) {
          blur = 20
        } else {
          blur = percent * 20
        }
        topBg.value.style.filter = `blur(${blur}px)`
      })
    })

    // #endregion
    // 获取team信息
    const teamInfo = ref([])
    const getTeam = async teamId => {
      const { data: res } = await api.getTeamById(teamId)
      console.log(res)
      teamInfo.value = res.teaminfo
    }
    // 根据teaminfo中的英雄id列表，获取本阵容所有英雄的信息
    const chessInfoList = ref([])
    const getChessList = async ids => {
      const { data: res } = await api.getChessById(ids)
      console.log(res)
      chessInfoList.value = res.chessinfo
      // 获取到信息后 处理iconlist
      iconList.value = countRJ(chessInfoList.value)
      // 生成ids列表用于传入子组件
      raceIdList.value = getRaceAndJobIds(chessInfoList.value, 'race')
      jobIdList.value = getRaceAndJobIds(chessInfoList.value, 'job')
    }

    // 生成需要的格式化的数据传入chessboard组件
    const formatNeedInfo = computed(() => {
      return {
        chessList: teamInfo.value[0].chessList,
        imgList: teamInfo.value[0].imgList,
        chessPosition: teamInfo.value[0].chessPosition
      }
    })

    // 根据teaminfo中的hexid列表，获取hex信息
    const hexInfoList = ref([])
    const getHexList = async ids => {
      const { data: res } = await api.getHexById(ids)
      console.log(res)
      hexInfoList.value = res.hexinfo
    }
    // 羁绊和职业的计数数组
    const iconList = ref([])
    // 对羁绊和职业进行计数
    const countRJ = origin => {
      const readyRace = []
      const readyJob = []
      origin.forEach(item => {
        readyRace.push(...item.races.split(','))
      })
      origin.forEach(item => {
        readyJob.push(...item.jobs.split(','))
      })
      const result = [...countChess(readyRace), ...countChess(readyJob)]
      // 降序排序
      const sortList = result.sort((a, b) => {
        return b.num - a.num
      })
      return sortList
    }
    const countChess = ready => {
      // 其中,第一个参数callback函数： pre为上次return的值，next为数组的本次遍历的项
      // 第二个参数为初始值，也是第一个pre 这里相当于把它当做键 num当做值 类似字典
      const totalObj = ready.reduce((pre, next) => {
        if (pre[next]) {
          pre[next]++
        } else {
          pre[next] = 1
        }
        return pre
      }, {})
      // 对象重构为数组
      const result = []
      for (const i in totalObj) {
        result.push({ name: i, num: totalObj[i] })
      }
      return result
    }
    // 构造阵容的羁绊和职业的id列表，以便传入raceDetail子组件用于请求详情
    const raceIdList = ref([])
    const jobIdList = ref([])
    const getRaceAndJobIds = (origin, category) => {
      if (category === 'race') {
        let readyRace = []
        origin.forEach(item => {
          readyRace.push(...item.raceIds.split(','))
        })
        readyRace = readyRace.sort((a, b) => {
          return b - a
        })
        return [...new Set(readyRace)]
      } else {
        let readyJob = []

        origin.forEach(item => {
          readyJob.push(...item.jobIds.split(','))
        })

        readyJob = readyJob.sort((a, b) => {
          return b - a
        })
        return [...new Set(readyJob)]
      }
    }
    // 获取抢装备顺序
    const equipOrderList = ref([])
    const getEquipOrder = async ids => {
      const { data: res } = await api.getEquipById(ids)
      console.log(res)
      equipOrderList.value = res.equipinfo
    }
    onMounted(async () => {
      await getTeam(props.teamId)
      getChessList(teamInfo.value[0].chessList)
      getHexList(teamInfo.value[0].hexList)
      getEquipOrder(teamInfo.value[0].equipOrder)
      handleScroll()
    })

    return {
      hiddenbox,
      racedetail,
      myUtil,
      scrollTop,
      topBg,
      handleScroll,
      teamInfo,
      getTeam,
      getChessList,
      countChess,
      countRJ,
      getRaceAndJobIds,
      raceIdList,
      jobIdList,
      iconList,
      hexInfoList,
      getHexList,
      formatNeedInfo,
      equipOrderList
    }
  }
}
</script>

<style lang="less" scoped>
.teamdetail-container {
  position: relative;
  // #region 顶部三个绝对定位
  .hr-line {
    background: #ebedf0;
    margin: 0.625rem 0;
  }
  .bg {
    margin-top: 2.875rem;
    width: 100%;
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  .author {
    position: absolute;
    width: 50%;
    left: calc(50% - 2.5rem);
    top: -4rem;
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 2.5rem;
    }
  }
  .author-name {
    position: absolute;
    width: 18.75rem;
    left: calc(50% - 9.375rem);
    top: 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    p:after {
      content: ' —————';
    }
    p:before {
      content: '————— ';
    }
  }
  // #endregion 顶部三个绝对定位
  .main {
    border-top-left-radius: 1.25rem;
    border-top-right-radius: 1.25rem;
    width: 100%;
    height: 100%;
    margin-top: 12.5rem;
    background: white;
    .icon-detail {
      font-size: 0.75rem;
      color: grey;
      text-align: center;
      i {
        font-size: 0.75rem;
      }
    }
    .title {
      font-size: 1.25rem;
      font-weight: 600;
    }
    .main-top {
      padding: 3.5rem 1.25rem 0 1.25rem;
    }
    .main-iconlist {
      padding: 0 1.25rem;
      .icon-table {
        display: flex;
        flex-wrap: wrap;
        .icon-item {
          background: black;
          color: white;
          font-size: 0.75rem;
          padding: 0.125rem 0.3125rem;
          margin: 0 0.1875rem 0.3125rem 0.1875rem;
        }
      }
    }
    .main-steady {
      padding: 0 1.25rem;
      .st-content {
        margin-top: 0.3125rem;
        margin-bottom: 1rem;
        white-space: pre-wrap;
        text-align: justify; //两端对齐
      }
    }
    .main-hex {
      padding: 0 1.25rem;
      .choose {
        margin: 0.625rem 0;
        padding: 2rem 0;
        width: 100%;
        // height: 10rem;
        background: rgb(250, 247, 247);
        display: flex;
        align-items: center;
        .left {
          display: flex;
          justify-content: space-between;
          flex: 3;
          .hex-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 0.3125rem;
            p {
              margin-top: 0.3125rem;
              font-size: 0.8rem;
            }
            img {
              width: 3rem;
              height: 3rem;
              background: black;
              border: 2px solid goldenrod;
              object-fit: cover;
            }
          }
        }
        .right {
          flex: 1;
          display: flex;
          align-items: center;
          color: white;
          .three {
            width: 0;
            height: 0;
            border: 1.0938rem solid transparent;
            border-right-color: rgb(178, 105, 180);
          }
          .choose-label {
            flex: 1;
            height: 2.1875rem;
            line-height: 2.1875rem;
            text-align: center;
            background: rgb(178, 105, 180);
          }
          .three-second {
            width: 0;
            height: 0;
            border: 1.0938rem solid transparent;
            border-right-color: Silver;
          }
          .choose-label-second {
            flex: 1;
            height: 2.1875rem;
            line-height: 2.1875rem;
            text-align: center;
            background: Silver;
          }
        }
      }
    }
    .main-equip-order {
      padding: 0.625rem 1.25rem;
      .order {
        margin-top: 0.625rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .orderitem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            width: 3rem;
          }
          i {
            font-size: 1.2rem;
            padding-right: 0.3125rem;
          }
        }
      }
    }
    .main-chessboard {
      padding: 0 1.25rem;
    }
  }
}
</style>
