(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{108:function(t,e,n){t.exports=n(142)},113:function(t,e,n){},117:function(t,e,n){},142:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),i=n(9),c=n.n(i);n(113),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o=n(14),l=n(64),u=n(32),s=n(7),d={},f=[],m=n(47),p=n(86),b={status:"idle",error:null,isInitialized:!1},g={isLoggedIn:!1},h=Object(m.c)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"Task/get_tasks":return Object(s.a)(Object(s.a)({},t),{},Object(u.a)({},e.listId,e.tasks));case"Todolist/get_todos":var n=Object(s.a)({},t);return e.todos.forEach((function(t){return n[t.id]=[]})),n;case"Task/remove_task":return Object(s.a)(Object(s.a)({},t),{},Object(u.a)({},e.listId,t[e.listId].filter((function(t){return t.id!==e.taskId}))));case"Task/add_task":return Object(s.a)(Object(s.a)({},t),{},Object(u.a)({},e.task.todoListId,[e.task].concat(Object(l.a)(t[e.task.todoListId]))));case"Task/update_task":return Object(s.a)(Object(s.a)({},t),{},Object(u.a)({},e.listId,t[e.listId].map((function(t){return t.id===e.taskId?Object(s.a)(Object(s.a)({},t),e.model):t}))));case"Task/change_entity_status":return Object(s.a)(Object(s.a)({},t),{},Object(u.a)({},e.listId,t[e.listId].map((function(t){return t.id===e.taskId?Object(s.a)(Object(s.a)({},t),{},{entityStatus:e.entityStatus}):t}))));case"Todolist/add_list":return Object(s.a)(Object(s.a)({},t),{},Object(u.a)({},e.todo.id,[]));case"Todolist/remove_list":var a=Object(s.a)({},t);return delete a[e.listId],a;default:return t}},todolist:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"Todolist/remove_list":return t.filter((function(t){return t.id!==e.listId}));case"Todolist/add_list":return[e.todo].concat(Object(l.a)(t));case"Todolist/change_title":return t.map((function(t){return t.id===e.id?Object(s.a)(Object(s.a)({},t),{},{title:e.title}):t}));case"Todolist/change_filter":return t.map((function(t){return t.id===e.id?Object(s.a)(Object(s.a)({},t),{},{filter:e.filter}):t}));case"Todolist/get_todos":return e.todos.map((function(t){return Object(s.a)(Object(s.a)({},t),{},{filter:"all"})}));case"Todolist/change_entity_status":return t.map((function(t){return t.id===e.id?Object(s.a)(Object(s.a)({},t),{},{entityStatus:e.entityStatus}):t}));default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"app/set_status":return Object(s.a)(Object(s.a)({},t),{},{status:e.status});case"app/set_error":return Object(s.a)(Object(s.a)({},t),{},{error:e.error});case"app/set_initialize":return Object(s.a)(Object(s.a)({},t),{},{isInitialized:e.value});default:return t}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"Login/IS_LOGGED_IN":return Object(s.a)(Object(s.a)({},t),{},{isLoggedIn:e.value});default:return t}}}),E=Object(m.d)(h,Object(m.a)(p.a)),j=(n(117),n(186)),O=n(187),v=n(188),k=n(177),y=n(144),I=n(182),T=n(189),_=n(190),w=n(95),C=n.n(w),L=n(195),S=n(192),x=function(t){return{type:"app/set_status",status:t}},N=function(t){return{type:"app/set_error",error:t}};function D(t){return r.a.createElement(S.a,Object.assign({elevation:6,variant:"filled"},t))}function A(){var t=Object(o.c)((function(t){return t.app.error})),e=Object(o.b)(),n=function(t,n){"clickaway"!==n&&e(N(null))};return r.a.createElement(L.a,{open:!!t,autoHideDuration:3e3,onClose:n},r.a.createElement(D,{onClose:n,severity:"error"},t))}var P,B,z=n(90),G=n.n(z);!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(P||(P={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(B||(B={}));var F={withCredentials:!0,headers:{"API-KEY":"b0638a31-7f21-4809-a537-b5553f97597b"}},H=G.a.create(Object(s.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},F)),M=function(t){return H.post("todo-lists",{title:t}).then((function(t){return t.data}))},U=function(){return H.get("todo-lists")},R=function(t,e){return H.put("todo-lists/".concat(t),{title:e})},Z=function(t){return H.delete("todo-lists/".concat(t))},q=function(t,e){return H.post("todo-lists/".concat(t,"/tasks"),{title:e})},J=function(t){return H.get("todo-lists/".concat(t,"/tasks"))},K=function(t,e,n){return H.put("todo-lists/".concat(t,"/tasks/").concat(e),n)},W=function(t,e){return H.delete("todo-lists/".concat(t,"/tasks/").concat(e))},$=function(t){return H.post("auth/login",t).then((function(t){return t.data}))},V=function(){return H.get("auth/me").then((function(t){return t.data}))},Y=function(){return H.delete("auth/login").then((function(t){return t.data}))},Q=function(t,e){t.messages.length?e(N(t.messages[0])):e(N("Some error occurred")),e(x("failed"))},X=function(t,e){e(N(t.message)),e(x("failed"))},tt=n(183),et=n(143),nt=n(36),at=n(191),rt=n(180),it=r.a.memo((function(t){var e=t.addItem,n=Object(a.useState)(""),i=Object(nt.a)(n,2),c=i[0],o=i[1],l=Object(a.useState)(null),u=Object(nt.a)(l,2),s=u[0],d=u[1],f=function(){""!==c.trim()?(e(c),o("")):d("Title is required")};return r.a.createElement("div",null,r.a.createElement(at.a,{variant:"outlined",value:c,onChange:function(t){return o(t.currentTarget.value)},onKeyPress:function(t){s&&d(null),"Enter"===t.key&&f()},error:!!s,label:"Title",helperText:s}),r.a.createElement(k.a,{color:"primary",onClick:f},r.a.createElement(rt.a,null)))})),ct=function(t){var e=t.title,n=t.onChange,i=Object(a.useState)(!1),c=Object(nt.a)(i,2),o=c[0],l=c[1],u=Object(a.useState)(""),s=Object(nt.a)(u,2),d=s[0],f=s[1];return o?r.a.createElement(at.a,{variant:"outlined",value:d,onBlur:function(){l(!1),n(d)},onChange:function(t){return f(t.currentTarget.value)},autoFocus:!0}):r.a.createElement("span",{onDoubleClick:function(){l(!0),f(e)}},e)},ot=n(181),lt=n(193),ut=function(t,e,n){return{type:"Task/update_task",listId:t,taskId:e,model:n}},st=r.a.memo((function(t){var e=t.singleTask,n=t.listId,a=Object(o.b)();return r.a.createElement("div",{className:e.status===P.Completed?"is-done":""},r.a.createElement(lt.a,{onChange:function(t){var r=t.currentTarget.checked?P.Completed:P.New;a(function(t,e,n){return function(a,r){a(x("loading")),a(function(t,e,n){return{type:"Task/change_entity_status",listId:t,taskId:e,entityStatus:n}}(t,e,"loading"));var i=r().tasks[t].find((function(t){return t.id===e}));i&&K(t,e,Object(s.a)({title:i.title,startDate:i.startDate,priority:i.priority,description:i.description,deadline:i.deadline,status:i.status},n)).then((function(r){0===r.data.resultCode?(a(ut(t,e,n)),a(x("succeeded"))):Q(r.data,a)})).catch((function(t){return X(t,a)}))}}(n,e.id,{status:r}))},color:"primary",checked:e.status===P.Completed}),r.a.createElement(ct,{title:e.title,onChange:function(t){return a(ut(n,e.id,{title:t}))}}),r.a.createElement(k.a,{onClick:function(){return a(function(t,e){return function(n){n(x("loading")),W(t,e).then((function(a){0===a.data.resultCode?(n(function(t,e){return{type:"Task/remove_task",listId:t,taskId:e}}(t,e)),n(x("succeeded"))):Q(a.data,n)})).catch((function(t){return X(t,n)}))}}(n,e.id))}},r.a.createElement(ot.a,null)))})),dt=r.a.memo((function(t){var e=t.list,n=Object(o.c)((function(t){return t.tasks})),i=Object(o.b)();Object(a.useEffect)((function(){var t;i((t=e.id,function(e){e(x("loading")),J(t).then((function(n){e(function(t,e){return{type:"Task/get_tasks",tasks:t,listId:e}}(n.data.items,t)),e(x("succeeded"))})).catch((function(t){return X(t,e)}))}))}),[i,e.id]);var c=n[e.id];"completed"===e.filter?c=n[e.id].filter((function(t){return t.status===P.Completed})):"active"===e.filter&&(c=n[e.id].filter((function(t){return t.status===P.New})));var l=function(t){if(t.currentTarget.dataset.filter){var n=t.currentTarget.dataset.filter;i(function(t,e){return{type:"Todolist/change_filter",id:t,filter:e}}(e.id,n))}};return r.a.createElement("div",null,r.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},r.a.createElement("h3",null,r.a.createElement(ct,{title:e.title,onChange:function(t){return i((n=e.id,a=t,function(t){t(x("loading")),R(n,a).then((function(){t(function(t,e){return{type:"Todolist/change_title",id:t,title:e}}(n,a)),t(x("succeeded"))})).catch((function(e){return X(e,t)}))}));var n,a}})),r.a.createElement(k.a,{onClick:function(){return i((t=e.id,function(e){e({type:"Todolist/change_entity_status",id:t,entityStatus:"loading"}),e(x("loading")),Z(t).then((function(n){0===n.data.resultCode?(e(function(t){return{type:"Todolist/remove_list",listId:t}}(t)),e(x("succeeded"))):Q(n.data,e)})).catch((function(t){return X(t,e)}))}));var t}},r.a.createElement(ot.a,null))),r.a.createElement(it,{addItem:function(t){return i(function(t,e){return function(n){n(x("loading")),q(t,e).then((function(t){0===t.data.resultCode?(n({type:"Task/add_task",task:t.data.data.item}),n(x("succeeded"))):Q(t.data,n)})).catch((function(t){return X(t,n)}))}}(e.id,t))}}),r.a.createElement("ul",null,c.map((function(t){return r.a.createElement(st,{key:t.id,listId:e.id,singleTask:t})}))),r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},r.a.createElement(I.a,{variant:"all"===e.filter?"outlined":"text",color:"default","data-filter":"all",onClick:l},"All"),r.a.createElement(I.a,{variant:"active"===e.filter?"outlined":"text",color:"primary","data-filter":"active",onClick:l},"Active"),r.a.createElement(I.a,{variant:"completed"===e.filter?"outlined":"text",color:"secondary","data-filter":"completed",onClick:l},"Completed")))})),ft=n(15),mt=function(){var t=Object(o.b)(),e=Object(o.c)((function(t){return t.todolist})),n=Object(o.c)((function(t){return t.auth.isLoggedIn}));Object(a.useEffect)((function(){n&&t((function(t){t(x("loading")),U().then((function(e){t({type:"Todolist/get_todos",todos:e.data}),t(x("succeeded"))})).catch((function(e){return X(e,t)}))}))}),[t,n]);var i=Object(a.useCallback)((function(e){t(function(t){return function(e){e(x("loading")),M(t).then((function(t){0===t.resultCode?(e({type:"Todolist/add_list",todo:t.data.item}),e(x("succeeded"))):Q(t,e)})).catch((function(t){return X(t,e)}))}}(e))}),[t]);return n?r.a.createElement(r.a.Fragment,null,r.a.createElement(tt.a,{container:!0,style:{padding:"20px 0"}},r.a.createElement(it,{addItem:i})),r.a.createElement(tt.a,{container:!0,spacing:3},e.map((function(t){return r.a.createElement(tt.a,{item:!0,key:t.id},r.a.createElement(et.a,{style:{padding:"20px"}},r.a.createElement(dt,{key:t.id,list:t})))})))):r.a.createElement(ft.a,{to:"/login"})},pt=n(57),bt=n(96),gt=n(184),ht=n(178),Et=n(179),jt=n(185),Ot=n(41),vt=function(t){return{type:"Login/IS_LOGGED_IN",value:t}},kt=function(t){var e=t.label,n=Object(bt.a)(t,["label"]),a=Object(Ot.d)(n),i=Object(nt.a)(a,1)[0];return r.a.createElement(gt.a,Object.assign({},i,{control:r.a.createElement(lt.a,null),label:e}))},yt=function(){var t=Object(o.b)();return Object(o.c)((function(t){return t.auth.isLoggedIn}))?r.a.createElement(ft.a,{to:"/react-todolist"}):r.a.createElement(tt.a,{container:!0,justify:"center"},r.a.createElement(tt.a,{item:!0,xs:4},r.a.createElement(Ot.c,{initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password.length<3&&(e.password="Too short password"),e},onSubmit:function(e,n){var a,r=n.setSubmitting,i=n.resetForm;r(!0),t((a=e,function(t){t(x("loading")),$(a).then((function(e){0===e.resultCode?(t(vt(!0)),t(x("succeeded"))):Q(e,t)})).catch((function(e){X(e,t)}))})),r(!1),i()}},(function(t){var e=t.handleBlur,n=t.errors,a=t.touched;return r.a.createElement(Ot.b,null,r.a.createElement(ht.a,null,r.a.createElement(Et.a,null,r.a.createElement("p",null,"To log in get registered\xa0",r.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank",rel:"noopener noreferrer"},"here")),r.a.createElement("p",null,"or use common test account credentials:"),r.a.createElement("p",null,"Email: free@samuraijs.com"),r.a.createElement("p",null,"Password: free")),r.a.createElement(jt.a,null,r.a.createElement(Ot.a,{error:a.email&&!!n.email,label:"Email",helperText:a.email&&n.email,name:"email",margin:"normal",onBlur:e,as:at.a}),r.a.createElement(Ot.a,{error:a.password&&!!n.password,type:"password",helperText:a.password&&n.password,label:"Password",margin:"normal",onBlur:e,name:"password",as:at.a}),r.a.createElement(Ot.a,{label:"Remember me",name:"rememberMe",as:kt}),r.a.createElement(I.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))}))))};var It=function(){var t=Object(o.c)((function(t){return t.app.status})),e=Object(o.c)((function(t){return t.app.isInitialized})),n=Object(o.c)((function(t){return t.auth.isLoggedIn})),i=Object(o.b)();Object(a.useEffect)((function(){i((function(t){V().then((function(e){0===e.resultCode?t(vt(!0)):Q(e,t),t({type:"app/set_initialize",value:!0})})).catch((function(e){return X(e,t)}))}))}),[i]);var c=Object(a.useCallback)((function(){i((function(t){t(x("loading")),Y().then((function(e){0===e.resultCode?(t(vt(!1)),t(x("succeeded"))):Q(e,t)})).catch((function(e){X(e,t)}))}))}),[i]);return e?r.a.createElement(pt.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(A,null),r.a.createElement(O.a,{position:"static"},r.a.createElement(v.a,null,r.a.createElement(k.a,{edge:"start",color:"inherit","aria-label":"menu"},r.a.createElement(C.a,null)),r.a.createElement(y.a,{variant:"h6"},"Simple Todolist"),n&&r.a.createElement(I.a,{color:"inherit",onClick:c},"Log out"))),r.a.createElement("div",{style:{minHeight:"4px"}},"loading"===t&&r.a.createElement(T.a,{color:"secondary"})),r.a.createElement(_.a,{fixed:!0},r.a.createElement(ft.d,null,r.a.createElement(ft.b,{path:"/react-todolist",component:mt}),r.a.createElement(ft.b,{path:"/login",component:yt}),r.a.createElement(ft.b,{render:function(){return r.a.createElement("h1",null,"404: PAGE NOT FOUND")}}))))):r.a.createElement(j.a,null)};c.a.render(r.a.createElement(o.a,{store:E},r.a.createElement(It,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[108,1,2]]]);
//# sourceMappingURL=main.b5250b8a.chunk.js.map