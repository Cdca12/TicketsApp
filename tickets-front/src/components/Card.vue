<template>
  <div v-bind:class="['tarjeta', cardColor]">
      
    <div class="title">
        {{ titulo }}  
    </div>
    <div class="content">
        {{ mensaje }} <br>
        <div v-for="tag in tags" v-bind:key="tag" class="tags">
            {{ tag }}
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Card',
    components: {

    },
    props: {
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
    width: 280px;
    height: 170px;
    /* max-height:160px; */
    text-align: center;
    border: 3px solid rgb(117, 112, 112);
    border-radius: 5px;
    margin: 10px 10px;
    color: white;
}

.title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 45px;
    border-bottom: 3px solid rgb(0, 0, 0);
}

.content {
    margin-top: 10px;
    
    text-align: left;
    padding: 0px 10px;
}

.tags {
    background-color: rgb(104, 90, 90);
    color: white;
    font-weight: bold;
    font-size: 12px;
    width: max-content;
    display: inline-block;
    /* margin-top: 10px; */
    margin: 30px 5px 0px 0px;
    padding: 5px;
    position: relative;
    /* bottom: 0; */
}
</style>