"use strict";(self["webpackChunkalex_media_user"]=self["webpackChunkalex_media_user"]||[]).push([[369],{369:function(t,s,e){e.r(s),e.d(s,{default:function(){return K}});var a=e(252),l=e(577);const i={class:"container py-5"},o={class:"text-center my-2"},d={key:0},n=(0,a._)("i",{class:"fa-solid fa-plus"},null,-1),r={class:"row"},c={key:0,class:"text-center my-3"},h=(0,a._)("div",{class:"spinner-border",role:"status"},[(0,a._)("span",{class:"visually-hidden"},"Loading...")],-1),u=[h],p={key:1},g={key:0,class:"text-center"},m=(0,a._)("h1",null,"There is no post in this playlist",-1),_=[m],y={class:"row"},f={class:"col-lg-3"},w=["src"],k={class:"col-lg-9"},v=["onClick"],x={class:"text-muted"},$={href:"#"},D={class:"text-muted"},b={key:0,href:"#"},C={class:""},z={class:"row"},P={class:"col-6"},S={class:"btn btn-light"},q={href:"#"},Y=(0,a._)("i",{class:"fa-solid fa-eye me-2"},null,-1),F={class:"col-4 offset-2"},U=["onClick"],I=(0,a._)("i",{class:"fa-solid fa-trash me-2"},null,-1);function T(t,s,e,h,m,T){return(0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("div",i,[(0,a._)("h1",o,(0,l.zw)(m.playlist.name),1),m.playlist.user_id==t.user.id?((0,a.wg)(),(0,a.iD)("div",d,[(0,a._)("a",{onClick:s[0]||(s[0]=t=>T.addPlaylistItemPage(m.playlist.id)),class:"btn btn-secondary float-lg-end"},[n,(0,a.Uk)("Add To Playlist")])])):(0,a.kq)("",!0),(0,a._)("div",r,[m.loadingStatus?((0,a.wg)(),(0,a.iD)("div",c,u)):(0,a.kq)("",!0),m.loadingStatus?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",p,[0==m.posts.length?((0,a.wg)(),(0,a.iD)("div",g,_)):(0,a.kq)("",!0),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(m.posts,((s,e)=>((0,a.wg)(),(0,a.iD)("div",{class:"col-lg-8 offset-lg-2 shadow my-2 p-5",key:e},[(0,a._)("div",y,[(0,a._)("div",f,[(0,a._)("img",{src:s.image,class:"w-100 card-img"},null,8,w)]),(0,a._)("div",k,[(0,a._)("h4",{class:"",onClick:e=>t.toPostDetail(s.id)},(0,l.zw)(s.Title),9,v),(0,a._)("h5",x,[(0,a.Uk)("by "),(0,a._)("a",$,(0,l.zw)(s.user_name),1)]),(0,a._)("p",D,(0,l.zw)(s.created_at),1),(0,a._)("p",null,[null!=s.playlist_id?((0,a.wg)(),(0,a.iD)("a",b,"("+(0,l.zw)(s.playlist_name)+")",1)):(0,a.kq)("",!0)]),(0,a._)("p",C,(0,l.zw)(s.content.substr(0,100)+"...."),1),(0,a._)("div",z,[(0,a._)("div",P,[(0,a._)("div",S,[(0,a._)("a",q,(0,l.zw)(s.category_name),1)]),(0,a._)("span",null,[Y,(0,a.Uk)((0,l.zw)(s.view_count),1)])]),(0,a._)("div",F,[s.user_id==t.user.id?((0,a.wg)(),(0,a.iD)("a",{key:0,onClick:t=>T.removePost(s.id),class:"btn btn-danger me-2",title:"Remove"},[I,(0,a.Uk)("Remove")],8,U)):(0,a.kq)("",!0)])])])])])))),128))]))])])])}var Z=e(154),M=e(907),R={name:"playlistItem",data(){return{playlist:{},posts:{},loadingStatus:!1,postCount:0}},computed:{...(0,M.rn)(["header","user"])},methods:{getData(){this.loadingStatus=!0,Z.Z.get(`https://alexmedia.alexlucifer.com/api/user/playlist/item/${this.$route.params.id}`,{headers:this.header}).then((t=>{this.posts=t.data.posts,this.playlist=t.data.playlist;for(let s=0;s<this.posts.length;s++){null!=this.posts[s].image?this.posts[s].image=`https://alexmedia.alexlucifer.com/storage/${this.posts[s].image}`:this.posts[s].image="https://alexmedia.alexlucifer.com/image/default.png";let t=new Date(this.posts[s].created_at);this.posts[s].created_at=`${t.getFullYear()}-${t.getMonth()+1}-${t.getFullYear()}`}this.loadingStatus=!1,this.postCount=t.data.posts.length}))},removePost(t){this.loadingStatus=!0,Z.Z.get(`https://alexmedia.alexlucifer.com/api/user/playlist/item/remove/${t}/${this.$route.params.id}`,{headers:this.header}).then((t=>{this.posts=t.data.posts;for(let s=0;s<this.posts.length;s++){null!=this.posts[s].image?this.posts[s].image=`https://alexmedia.alexlucifer.com/storage/${this.posts[s].image}`:this.posts[s].image="https://alexmedia.alexlucifer.com/image/default.png";let t=new Date(this.posts[s].created_at);this.posts[s].created_at=`${t.getFullYear()}-${t.getMonth()+1}-${t.getFullYear()}`}this.loadingStatus=!1,this.postCount=t.data.posts.length}))},addPlaylistItemPage(t){this.$router.push({path:`/add/item/playlist/${t}`})}},mounted(){this.getData()}},A=e(744);const H=(0,A.Z)(R,[["render",T]]);var K=H}}]);
//# sourceMappingURL=369.d473abb9.js.map