"use strict";(self["webpackChunkalex_media_user"]=self["webpackChunkalex_media_user"]||[]).push([[853],{853:function(e,a,t){t.r(a),t.d(a,{default:function(){return v}});var r=t(252),s=t(963);const o={class:"container py-5"},l=(0,r._)("h1",{class:"text-center mb-5"},"Add Category",-1),n={class:"row"},c={class:"col-lg-6 offset-3 shadow p-5"},d={class:"mb-3 row"},i=(0,r._)("label",{class:"col-sm-3 col-form-label"},"Name",-1),u={class:"col-sm-9"},m={key:2,class:"text-danger"},y={class:"float-end"},g=(0,r._)("i",{class:"fa-solid fa-plus me-2"},null,-1);function h(e,a,t,h,p,f){return(0,r.wg)(),(0,r.iD)("div",null,[(0,r._)("div",o,[l,(0,r._)("div",n,[(0,r._)("div",c,[(0,r._)("div",d,[i,(0,r._)("div",u,[p.errorStatus?(0,r.wy)(((0,r.wg)(),(0,r.iD)("input",{key:0,"onUpdate:modelValue":a[0]||(a[0]=e=>p.categoryName=e),type:"text",class:"form-control is-invalid",placeholder:"Enter Category Name"},null,512)),[[s.nr,p.categoryName]]):(0,r.kq)("",!0),p.errorStatus?(0,r.kq)("",!0):(0,r.wy)(((0,r.wg)(),(0,r.iD)("input",{key:1,"onUpdate:modelValue":a[1]||(a[1]=e=>p.categoryName=e),type:"text",class:"form-control",placeholder:"Enter Category Name"},null,512)),[[s.nr,p.categoryName]]),p.errorStatus?((0,r.wg)(),(0,r.iD)("span",m,"Category name must be filled !!!!!")):(0,r.kq)("",!0)])]),(0,r._)("div",y,[(0,r._)("button",{onClick:a[2]||(a[2]=(...e)=>f.addCategory&&f.addCategory(...e)),class:"btn btn-secondary"},[g,(0,r.Uk)("Create")])])])])])])}var p=t(907),f=t(154),_={name:"AddCategoryPage",data(){return{errorStatus:!1,categoryName:""}},computed:{...(0,p.rn)(["header","user"])},methods:{addCategory(){if(""==this.categoryName||null==this.categoryName)this.errorStatus=!0;else{this.errorStatus=!1;let e={name:this.categoryName};f.Z.post("https://alexmedia.alexlucifer.com/api/user/category/add",e,{headers:this.header}).then((e=>{e.data.status&&this.$router.push({name:"categoryList"})}))}}}},k=t(744);const C=(0,k.Z)(_,[["render",h]]);var v=C}}]);
//# sourceMappingURL=853.222a50e0.js.map