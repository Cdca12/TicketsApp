<template>
  <div v-bind:class="['tarjeta', cardColor]">
      
    <div class="title">
        <span class="showSpaces" v-if="id">#{{ id }} </span>
        {{ titulo }}  
    </div>
    <div class="content">
        {{ mensaje }} <br>
        <div class="tags">
            <div v-for="tag in tags" v-bind:key="tag" class="tag">
                {{ tag }}
            </div>
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
    height: 40px;
    border-bottom: 3px solid rgb(0, 0, 0);
}

.content {
    margin-top: 10px;
    
    text-align: left;
    padding: 0px 10px;
}

.tags {
    display: inline-block;
    position:relative;
}

.tag {
    background-color: rgb(104, 90, 90);
    font-weight: bold;
    font-size: 12px;
    /* width: max-content; */
    display: inline-block;
    margin: 30px 5px -20px 0px;
    
    padding: 5px;
    /* position: relative; */
    /* bottom: 0; */
}

.showSpaces{
  white-space: pre;
}
</style>