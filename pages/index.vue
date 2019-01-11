<template>
    <div class="home-page">
        <cl-line title="CODING"></cl-line>
        <ul class="posts-list">
            <li v-for="post in codings" :key="post.blog_id">
           <!--  {{post.blog_id}} -->
                <nuxt-link class="title" :to="`/postById/${post.blog_id}/${post.slug}`">{{post.title}}</nuxt-link>
                <span class="createTime">{{post.create_time | timeFormat}}</span>
            </li>
        </ul>

        <cl-line title="SHARING"></cl-line>
        <ul class="posts-list">
            <li v-for="post in sharings" :key="post.blog_id">
                <nuxt-link class="title" :to="`/postById/${post.blog_id}/${post.slug}`">{{post.title}}</nuxt-link>
                <span class="createTime">{{post.create_time | timeFormat}}</span>
            </li>
        </ul>

        <cl-line title="NOTES"></cl-line>
        <ul class="posts-list">
            <li v-for="post in notes" :key="post.blog_id">
                <nuxt-link class="title" :to="`/postById/${post.blog_id}/${post.slug}`">{{post.title}}</nuxt-link>
                <span class="createTime">{{post.create_time | timeFormat}}</span>
            </li>
        </ul>

        <!-- 联系我 -->
        <cl-line title="LINKS"></cl-line>
        <ul class="links">
            <li>
                <span style="color: #333333;">Gitee：</span><a href="https://gitee.com/dh1992" target="_blank">Chris</a>
            </li>
            <li>
                <span style="color: #E80025;">Weibo：</span><a href="https://weibo.com/u/5216026690" target="_blank">@WhoseLobster_</a>
            </li>
            <!-- <li>
                <span style="color: #0C9DF2;">twitter：</span><a href="https://twitter.com/Lewiiiissss" target="_blank">@Lewiiiissss</a>
            </li> -->
            <li>
                <span style="color: #12b918;">Wechat Public：</span><a href="javascript:;">touch me ~ touch me ~<img :src="require('~/assets/images/wechat_public_qrcode.jpg')" alt="公众号二维码"></a>
            </li>
            <li>
                <span>Mail：</span><a href="dh1992@tju.edu.cn">dh1992@tju.edu.cn</a>
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import clLine from "~/components/line.vue";
import pinyin from "pinyin";
export default {
    //指定页面布局
    layout: "blog",
    async asyncData (ctx) {
        let codings = [];
        let sharings = [];
        let notes = [];
        try {
            console.log(Vue.http)
            const codingsData = await Vue.http.get("/post?classify=coding&limit=10");
            const sharingsData = await Vue.http.get("/post?classify=sharing&limit=10");
            const notesData = await Vue.http.get("/post?classify=note&limit=10");
//            console.log(codingsData)
            codings = JSON.parse(codingsData);
            sharings = JSON.parse(sharingsData);
            notes = JSON.parse(notesData);
            //console.log(codingsData)
            codings.forEach(item => {
                item.slug = pinyin(item.title, { style: pinyin.STYLE_NORMAL }).join("-");
            });
            sharings.forEach(item => {
                item.slug = pinyin(item.title, { style: pinyin.STYLE_NORMAL }).join("-");
            });
            notes.forEach(item => {
                item.slug = pinyin(item.title, { style: pinyin.STYLE_NORMAL }).join("-");
            });
             
            return {
                codings: codings,
                sharings: sharings,
                notes: notes
            };
        } catch (e) {
            console.log(e)
            ctx.error({ statusCode: 500, message: "加载首页出错啦" });
        }
    },
    data () {
        return {};
    },
    head () {
        return {
            meta: [
                {
                    name: "description",
                    content: "dh1992@gitee.com"
                }
            ]
        };
    },
    mounted () {
         console.log("--------------pages -> index -> mounted -------------")
        //console.log(this.$api.PUBLIC_COMMENTS)
    },
    filters: {
        timeFormat: function (time) {
            if (!time) return "";
            return `（${moment(time).format("MMMM YYYY")}）`;
        }
    },
    methods: {},
    components: {
        clLine
    }
};
</script>

<style lang="less" scoped>
    .home-page {
        padding: 0 10px;
        ul.posts-list {
            margin-bottom: 30px;
            padding: 0 10px;
            list-style: none;
            > li {
                margin-bottom: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .title {
                    color: #333;
                    cursor: pointer;
                    text-decoration: underline;
                }
                .createTime {
                    font-size: 12px;
                }
            }
        }

        ul.links {
            list-style: none;
            li {
                > span {
                    font-weight: bold;
                }
                > a {
                    color: #555;
                    text-decoration: underline;
                    position: relative;
                    img {
                        position: absolute;
                        opacity: 0;
                        transition: all .3s;
                        width: 150px;
                        top: 50%;
                        // right: 0;
                        left: 100%;
                        transform: translateY(-50%);
                    }
                }
                &:hover img {
                    opacity: 1;
                }
            }
        }
    }
    @media (max-width: 420px) {
        ul.links li img {
            left: auto!important;
            right: 0!important;
        }
    }
</style>
