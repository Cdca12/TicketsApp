<template>
  <div v-bind:class="['tarjeta', cardColor]">
      
    <div class="title">
        <span class="showSpaces" v-if="id">#{{ id }} </span>
        {{ titulo }}  
    </div>
    <div class="content">
        {{ mensaje }} <br>
    </div>
        <ul class="tags">
            <li v-for="tag in tags" v-bind:key="tag" class="tag">
                {{ tag }}
            </li>
        </ul>
  </div>
</template>

<script>
export default {
    name: 'Card',
    components: {

    },
    props: {
        id: [String, Number],
        titulo: [String, Number],
        mensaje: String,
        tags: Array,
        color: String
    },
    data() {
        return {
        }
    },
    computed: {
        cardColor() {
            return this.color;
        }

    },
    methods: {

    }
    // Life cycle methods

}
</script>

<style>

.tarjeta {
    display: inline-block;
    vertical-align: middle;
    width: 280px;
    height: 170px;
    text-align: center;
    border-radius: 5px;
    margin: 10px 10px;
    color: white;
    box-shadow: 0px 10px 20px -7px rgba(32, 56, 117, 0.35);
}

.title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    border-bottom: 3px solid rgba(0, 0, 0, 0.733);
    
}

.content {
    margin-top: 10px;
    text-align: left;
    padding: 0px 10px;
    height: 80px;
    overflow-y: auto;
    
}

.tags {
    overflow: hidden;
    padding: 0;
    margin-left: 10px;
}

.tags li {
    float: left;
    position: relative;
    margin-right: 18px;
}

.tag {
    font-size: 14px;
    background: #eee;
    border-radius: 5px 7px 7px 5px;
    color: rgb(107, 107, 107);
    display: inline-block;
    line-height: 26px;
    padding: 0 20px 0 23px;
    position: relative;
    text-decoration: none;
}

.tag::before {
    background: #fff;
    border-radius: 10px;
    box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
    content: '';
    height: 6px;
    left: 10px;
    position: absolute;
    width: 6px;
    top: 10px;
}

.tag::after {
  /* background: #fff; */
  border-bottom: 13px solid transparent;
  border-left: 13px solid #eee;
  border-top: 13px solid transparent;
  content: '';
  position: absolute;
  left: 95%;
  top: 0;
}

.showSpaces{
  white-space: pre;
}
</style>