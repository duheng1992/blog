<template>
    <div class="post-page">
        <h1 class="title">{{data.title}}</h1>
        <p class="createTime">{{data.create_time | timeFormat}}</p>
        <p class="count">
            <i class="iconfont icon-view"></i>
            <!-- 阅读 -->
            {{data.hits}}
            &nbsp;&nbsp;
            <i class="iconfont icon-like_fill"></i>
            <!-- 喜欢 -->
            {{likes || 0}}
            &nbsp;&nbsp;
            <i class="iconfont icon-interactive_fill"></i>
            <!-- 评论 -->
            {{data.comments || 0}}
        </p>

        <!-- v-highlight在哪client-site下定义了全局指令 -->
        <div  v-html="post" class="markdown-body" v-highlight></div>

        <!-- 评论系统 -->
        <no-ssr>
            <appreciation :postId="$route.params.blog_id" :like_ids="data.like_ids || ''"></appreciation>
        </no-ssr>

    </div>
</template>

<script>
 /*markdown文章内容转化为html*/

import Vue from "vue";
import moment from "moment";
import marked from "marked";

//评论插件
import appreciation from "~/components/appreciation.vue";
import commentBox from "~/components/comment-box.vue";
import commentList from "~/components/comment-list.vue";
import NoSSR from "vue-no-ssr";

export default {
    layout: "blog",
    async asyncData ({ params, error }) {
        //console.log(params)
        // 获取文章详情
        let data = {};
        try {
            data = await Vue.http.get(`post/${params.blog_id}`);
            //console.log(JSON.parse(data)[0])
            return {
                data: JSON.parse(data)[0]
            };
        } catch (e) {
            error({ statusCode: 404, message: "出错啦" });
        }
    },
    //fetch ({ store, params }) {},
    data () {
        return {
            comments: []
        };
    },
    filters: {
        timeFormat: function (time) {
            if (!time) return "";
            return moment(time).format("DD,MMMM,YYYY");
        }
    },
    computed: {
        // markdown文章内容转化为html
        post: function () {
            return marked(this.data.content);
        },
        likes: function () {
            const likes = this.data.like_ids || "";
            return likes.split(",").filter(item => {
                return item;
            }).length;
        }
    },
    //设置html的head
    head () {
        return {
            title: `${this.data.title} - dh1992@yys`,
            meta: [
                {
                    name: "description",
                    content: this.data.description || this.data.title
                }
            ]
        };
    },
    components: {
        appreciation,
        commentBox,
        commentList,
        NoSSR
    }
};
</script>

<style lang="less" scoped>
    .post-page {
        padding: 0 20px;
        > .title {
            margin-bottom: 10px;
        }
        > .createTime {
            margin-bottom: 10px;
            color: gray;
        }
        > .count {
            margin-bottom: 30px;
            color: gray;
        }

        .comment-box {
            margin-top: 40px;
            .total {
                position: relative;
                > span {
                    position: relative;
                    background-color: white;
                    padding-right: 8px;
                    z-index: 2;
                }
                &::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 50%;
                    width: 100%;
                    border-top: 1px solid #ccc;
                }
            }
        }
    }
</style>