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
          <div class="race">
            <div class="raceinfo" v-for="(race, index) in computeRace" :key="index">{{ race }}</div>
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
    <div class="race">
      <div class="title">羁绊—执法官</div>
      <div class="introduce">
        暗示法散发发顺丰暗示法散发发顺丰暗示法散发发顺丰暗示法散发发顺丰暗示法散发发顺丰暗示法散发发顺丰
      </div>
      <div class="level">
        <div class="num">3</div>
        <div class="detail">
          暗示法散发发顺丰暗示法散发发顺丰暗示法散发发顺丰暗示法散发发顺丰暗示法散发发顺丰暗示法散发发顺丰
        </div>
      </div>
    </div>
    <div class="job"></div>
    <div class="equip"></div>
  </div>
</template>

<script>
import detailHeader from '@/components/DetailHeader.vue'
import api from '@/api/index'
import { computed, onMounted, ref } from 'vue'
export default {
  name: 'chessInfo',
  props: ['id'],
  components: {
    detailHeader
  },
  setup(props) {
    const chess = ref([])
    onMounted(() => {
      getChess()
    })

    const getChess = async () => {
      const { data: res } = await api.getChessById(props.id)
      console.log(res)
      chess.value = res.chessinfo
    }

    const computeRace = computed(() => {
      // 将羁绊信息和职业信息展开
      return [...chess.value[0].races.split(','), ...chess.value[0].jobs.split(',')]
    })

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

    return {
      getChess,
      chess,
      computeRace,
      computeValueList
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
        padding-left: 1.25rem;
        .title {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
        }
        .race {
          display: flex;
          .raceinfo {
            font-size: 1rem;
            background: rgba(19, 18, 18, 0.8);
            color: white;
            padding: 0.1rem 0.3125rem;
            margin-right: 0.5rem;
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
  .race {
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
        padding: 0.125rem;
        width: 2rem;
        height: 1.2rem;
        text-align: center;
        background: black;
        color: white;
      }
      .detail {
        margin-left: 0.3125rem;
        margin-bottom: 1rem;
        white-space: pre-wrap;
        text-align: justify; //两端对齐
      }
    }
  }
}
</style>
