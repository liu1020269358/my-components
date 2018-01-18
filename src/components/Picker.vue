<template>
  <div class="wrap">
    <div class="header">

    </div>
    <div class="body">
      <div class="picker-cloumn" @touchstart="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd">
        <div class="picker-cloumn-item" v-for="item in cloumnArr" :key="item">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Picker',
  data () {
    return {
      cloumnArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrap {
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 12px;
    .body{
      width: 100%;
      height: 150px;
      display: flex;
      justify-content: center;
      .picker-cloumn{
        max-width: 30%;
        overflow: hidden;
        .picker-cloumn-item{
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
      }
    }
  }
</style>
