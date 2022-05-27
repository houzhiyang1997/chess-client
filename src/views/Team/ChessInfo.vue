<template>
  <div class="chessinfo-container" v-if="chess[0]">
    <detail-header :title="'英雄详情 - ' + chess[0].displayName"></detail-header>
    <div class="info-top">
      <img class="top-bg" :src="'http://game.gtimg.cn/images/lol/tft/cham-icons/624x318/' + chess[0].TFTID + '.jpg'" />
      <div class="top-main">
        <div class="top-headerimg">
          <img :src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/' + chess[0].TFTID + '.png'" />
          <div class="price">{{ chess[0].price }}</div>
        </div>
        <div class="right">
          <div class="title">{{ chess[0].title + '  ' + chess[0].displayName }}</div>
          <div class="top-race">
            <div class="raceinfo" v-for="(race, index) in computeRace" :key="index">
              <img :src="getRaceImg()[index]" />
              <div>{{ race }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="valueList">
      <table border="1" width="50%" align="center">
        <thead>
          <tr>
            <th></th>
            <th style="color: #7f4f3e">★</th>
            <th style="color: #a7a399">★★</th>
            <th style="color: #c6aa4f">★★★</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in computeValueList" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.lev1 }}</td>
            <td>{{ item.lev2 }}</td>
            <td>{{ item.lev3 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="skill">
      <div class="skill-title">技能</div>
      <div class="skill-top">
        <img class="skill-top-img" :src="chess[0].skillImage" />
        <div class="skill-top-info">
          <div class="name">{{ chess[0].skillName }}</div>
          <div class="type">{{ chess[0].skillType }}</div>
        </div>
        <div class="magic">
          <i class="iconfont icon-shuidi-copy"></i>
          {{ chess[0].startMagic + '/' + chess[0].magic }}
        </div>
      </div>
      <div class="skill-detail">{{ chess[0].skillDetail }}</div>
    </div>
    <div class="race" v-for="(race, index) in raceInfo" :key="index">
      <div class="title">羁绊—{{ race.name }}</div>
      <div class="introduce">
        {{ race.introduce }}
      </div>
      <div class="level" v-for="(lev, index) in computeLevel(race.level)" :key="index">
        <div class="num">{{ lev.num }}</div>
        <div class="detail">{{ lev.info }}</div>
      </div>
    </div>
    <div class="job" v-for="(job, index) in jobInfo" :key="index">
      <div class="title">职业—{{ job.name }}</div>
      <div class="introduce">
        {{ job.introduce }}
      </div>
      <div class="level" v-for="(lev, index) in computeLevel(job.level)" :key="index">
        <div class="num">{{ lev.num }}</div>
        <div class="detail">{{ lev.info }}</div>
      </div>
    </div>
    <div class="equip">
      <div class="eq-title">推荐装备</div>
      <div class="eq-imglist">
        <img :src="item.imagePath" v-for="(item, index) in equipInfo" :key="index" @click="handleClickEquip(index)" />
      </div>
      <div class="eq-info" v-if="equipShow">
        <div class="eq-info-title">装备效果:</div>
        <div class="eq-effect">{{ equipInfo[equipIndex].effect }}</div>
        <div class="eq-info-title">合成路径:</div>
        <div class="eq-info-imglist" v-if="equipInfo">
          <!-- 只请求到一条信息代表由同一件装备合成 -->
          <div v-if="formulaInfo.length === 1">
            <img :src="formulaInfo[0].imagePath" />
            <img :src="formulaInfo[0].imagePath" />
          </div>
          <img v-else :src="item.imagePath" v-for="(item, index) in formulaInfo" :key="index" />
        </div>
      </div>
    </div>
    <div class="similar">
      <div class="title">协同英雄</div>
      <div class="similar-imglist">
        <div class="img-item" v-for="(item, index) in similarInfo" :key="index" @click="handleClickImg(item.chessId)">
          <img :src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/' + item.TFTID + '.png'" />
          <div class="img-name">{{ item.displayName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import detailHeader from '@/components/DetailHeader.vue'
import api from '@/api/index'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'chessInfo',
  props: ['id'],
  components: {
    detailHeader
  },
  setup(props) {
    const router = useRouter()
    // 当前英雄信息
    const chess = ref([])
    // 羁绊信息 可能有多个所以是列表
    const raceInfo = ref([])
    // 职业信息
    const jobInfo = ref([])
    // 协同英雄信息
    const similarInfo = ref([])
    // 装备相关
    // TODO: 此处或许可以使用vuex来管理装备信息，然后使用子路由视图routerview来实现
    // 装备信息
    const equipInfo = ref([])
    // 装备散件信息
    const formulaInfo = ref([])
    // 散件是否展示
    const equipShow = ref(false)
    // 选中装备index
    const equipIndex = ref(0)
    onMounted(async () => {
      await getChess()
      getRace(chess.value[0].raceIds)
      getJob(chess.value[0].jobIds)
      getEquip(chess.value[0].recEquip)
      getSimilar(chess.value[0].jobs, chess.value[0].races)
    })
    // 获取当前棋子信息
    const getChess = async () => {
      const { data: res } = await api.getChessById(props.id)
      console.log(res)
      chess.value = res.chessinfo
    }
    // 获取羁绊信息
    const getRace = async ids => {
      const { data: res } = await api.getRaceById(ids)
      console.log(res)
      raceInfo.value = res.raceinfo
    }
    // 获取职业信息
    const getJob = async ids => {
      const { data: res } = await api.getJobById(ids)
      console.log(res)
      jobInfo.value = res.jobinfo
    }
    // 获取装备信息
    const getEquip = async ids => {
      const { data: res } = await api.getEquipById(ids)
      console.log(res)
      equipInfo.value = res.equipinfo
    }
    // 请求散件装备信息
    const getEquipFormula = async ids => {
      const { data: res } = await api.getEquipById(ids)
      console.log(res)
      formulaInfo.value = res.equipinfo
    }
    // 获取协同英雄信息
    const getSimilar = async (jobs, races) => {
      const { data: res } = await api.getSimilar(jobs, races)
      console.log(res)
      similarInfo.value = res.similarinfo
    }

    const handleClickImg = chessId => {
      // 跳转到棋子详情页
      // router.push('/')
      router.replace(`/chessinforefresh/${chessId}`)
    }

    // 将羁绊信息和职业信息展开 用于顶部label
    const computeRace = computed(() => {
      return [...chess.value[0].races.split(','), ...chess.value[0].jobs.split(',')]
    })

    // 构造与羁绊信息和职业信息对应的img列表
    const getRaceImg = () => {
      const raceimgs = raceInfo.value.map(item => item.imagePath)
      const jobimgs = jobInfo.value.map(item => item.imagePath)
      return [...raceimgs, ...jobimgs]
    }

    // 生成表格数据
    const computeValueList = computed(() => {
      let result = []
      // result.push({ name: '', lev1: '', lev2: '', lev3: '' })
      const temp = [
        { name: '生命', value: chess.value[0].life, flag: true },
        { name: '护甲', value: chess.value[0].armor, flag: false },
        { name: '魔抗', value: chess.value[0].spellBlock, flag: false },
        { name: '攻击力', value: chess.value[0].attack, flag: true },
        { name: '攻速', value: chess.value[0].attackSpeed, flag: false },
        { name: '暴击率', value: '25%', flag: false },
        { name: '攻击距离', value: chess.value[0].attackRange, flag: false },
        { name: '初始法力值', value: chess.value[0].startMagic, flag: false },
        { name: '法力值', value: chess.value[0].magic, flag: false }
      ]
      result = temp.map(item => {
        // 根据flag判断属性是否具有成长性
        if (item.flag) {
          return {
            name: item.name,
            lev1: item.value,
            lev2: (item.value * 1.8).toFixed(0),
            lev3: (item.value * 1.8 * 1.8).toFixed(0)
          }
        } else {
          return {
            name: item.name,
            lev1: item.value,
            lev2: item.value,
            lev3: item.value
          }
        }
      })
      return result
    })

    // 构造羁绊和职业的分级数据
    const computeLevel = level => {
      let result = [...level.split('&&')]
      result = result.map(item => {
        const num = item.substring(0, 1)
        const info = item.substring(2)
        return { num, info }
      })
      return result
    }

    const handleClickEquip = async index => {
      // 获取散件装备信息
      await getEquipFormula(equipInfo.value[index].formula)
      // 控制选中状态和选中index
      equipShow.value = true
      equipIndex.value = index
    }

    return {
      getChess,
      getRace,
      getJob,
      getEquip,
      getEquipFormula,
      getSimilar,
      handleClickImg,
      chess,
      raceInfo,
      jobInfo,
      equipInfo,
      similarInfo,
      formulaInfo,
      equipShow,
      equipIndex,
      computeRace,
      getRaceImg,
      computeValueList,
      computeLevel,
      handleClickEquip
    }
  }
}
</script>

<style lang="less" scoped>
.chessinfo-container {
  padding: 2.875rem 0;
  width: 100%;
  .info-top {
    position: relative;
    .top-bg {
      width: 100%;
      height: 12.5rem;
      object-fit: cover;
    }
    .top-main {
      display: flex;
      height: 4rem;
      position: absolute;
      bottom: 2rem;
      left: 1rem;
      .top-headerimg {
        position: relative;
        img {
          width: 4rem;
          height: 4rem;
          border-radius: 2rem;
          border: 2px solid rgb(216, 152, 13);
        }
        .price {
          background: rgb(216, 152, 13);
          color: white;
          font-size: 1rem;
          width: 1rem;
          border-radius: 0.5rem;
          text-align: center;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 1rem;
        .title {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
        }
        .top-race {
          display: flex;
          // justify-content: space-between;
          .raceinfo {
            font-size: 1rem;
            background: rgba(15, 15, 15, 0.8);
            color: white;
            padding: 0.1rem 0.1rem;
            margin-right: 0.3rem;
            display: flex;
            align-items: center;
            img {
              width: 1.25rem;
              height: 1.25rem;
              filter: invert(100%);
            }
          }
        }
      }
    }
  }
  .valueList {
    padding: 0.675rem 1.25rem;
    table {
      width: 100%;
      border: 2px solid rgba(234, 236, 238, 0.5);
      margin: 0 auto;
      border-collapse: collapse;
    }

    td {
      height: 2.5rem;
      // width: 70px;
      border: 2px solid rgba(234, 236, 238, 0.5);
      text-align: center;
      vertical-align: center;
    }

    tbody tr:nth-child(even) {
      background-color: rgba(234, 236, 238, 0.5);
    }
  }
  .skill {
    padding: 0.675rem 1.25rem;
    .skill-title {
      font-size: 1.25rem;
      font-weight: 600;
    }
    .skill-top {
      margin-top: 0.625rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .skill-top-img {
        width: 4rem;
      }
      .skill-top-info {
        margin-left: 0.625rem;
        flex: 1;
        font-weight: 500;
        .name {
          font-size: 1rem;
          padding-bottom: 0.75rem;
        }
        .type {
          font-size: 0.75rem;
        }
      }
      .magic {
        i {
          color: rgb(32, 115, 211);
        }
      }
    }
    .skill-detail {
      margin-top: 0.625rem;
      margin-bottom: 1rem;
      white-space: pre-wrap;
      text-align: justify; //两端对齐
    }
  }
  .race,
  .job {
    padding: 0.625rem 1.25rem;
    .title {
      font-size: 1.25rem;
      font-weight: 600;
    }
    .introduce {
      margin-top: 0.625rem;
      margin-bottom: 1rem;
      white-space: pre-wrap;
      text-align: justify; //两端对齐
    }
    .level {
      display: flex;
      .num {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.2rem;
        min-width: 1.8rem;
        height: 1.5rem;
        text-align: center;
        background: black;
        color: white;
        margin-right: 0.3125rem;
      }
      .detail {
        margin-bottom: 1rem;
        white-space: pre-wrap;
        text-align: justify; //两端对齐
      }
    }
  }
  .equip {
    padding: 0 1.25rem;
    .eq-title {
      font-size: 1.25rem;
      font-weight: 600;
    }
    .eq-imglist {
      display: flex;
      padding: 0.625rem 0;
      img {
        width: 3rem;
        margin-right: 0.625rem;
      }
    }
    .eq-info {
      .eq-info-title {
        font-weight: 600;
        padding: 0.3125rem 0;
      }
      .eq-info-imglist {
        img {
          width: 3rem;
          margin-right: 0.625rem;
        }
      }
    }
  }
  .similar {
    padding: 0.625rem 1.25rem;
    width: 100%;
    .title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .similar-imglist {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .img-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 0.675rem;
        margin-bottom: 0.625rem;
        img {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 1.75rem;
        }
        .img-name {
          padding-top: 0.3125rem;
          font-size: 0.875rem;
        }
      }
    }
  }
}
</style>
