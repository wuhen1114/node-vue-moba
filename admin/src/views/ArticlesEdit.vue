<template>
    <div class="about">
        <h1>{{id ? '编辑' : '创建'}}文章</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="上级分类">
                <el-select v-model="model.categories" multiple>
                    <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="详情">
                <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submiit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
import {VueEditor} from 'vue2-editor'


export default {
    components: {
        VueEditor
    },
    props: {
        id: {}
    },
    data(){
        return {
            model: {},
            categories: []
        }
    },
    created(){
        this.id && this.fetch()
        this.fetchCategories();
    },
    methods: {
        async fetchCategories() {
            const res = await this.$http.get(`rest/categories`);
            console.log(res);
            this.categories = res.data;
            // this.model = Object.assign({}, this.model, res.data)
        },
        async save(){
            let res 
            if(this.id){
                res = await this.$http.put(`rest/articles/${this.id}`, this.model)
            } else {
                res = await this.$http.post('rest/articles', this.model)
            }
            console.log(res)
            this.$router.push('/articles/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/articles/${this.id}`)
            console.log(res)
            this.model = res.data
        },
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            // An example of using FormData
            // NOTE: Your key could be different such as:
            // formData.append('file', file)
        
            const formData = new FormData();
            formData.append("file", file);
            console.log(file)
            const result = await this.$http.post('upload', formData)
            let url = result.data.url; // Get url from response
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
            // axios({
            //     url: "https://fakeapi.yoursite.com/images",
            //     method: "POST",
            //     data: formData
            // })
            //     .then(result => {
            //         let url = result.data.url; // Get url from response
            //         Editor.insertEmbed(cursorLocation, "image", url);
            //         resetUploader();
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        },
    }
}
</script>