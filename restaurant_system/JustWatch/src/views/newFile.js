import { RouterLink } from 'vue-router';
import navbar from '@/components/public/navbar.vue';
import axios from 'axios';

// import { handleError } from 'vue'
export default await (async () => {
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');

const __VLS_componentsOption = {
navbar
};

let __VLS_name!: 'Menu';
function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'navbar', typeof __VLS_localComponents, "Navbar", "navbar", "navbar"> &
__VLS_WithComponent<'VContainer', typeof __VLS_localComponents, "VContainer", "vContainer", "v-container"> &
__VLS_WithComponent<'VRow', typeof __VLS_localComponents, "VRow", "vRow", "v-row"> &
__VLS_WithComponent<'VBtn', typeof __VLS_localComponents, "VBtn", "vBtn", "v-btn"> &
__VLS_WithComponent<'RouterLink', typeof __VLS_localComponents, "RouterLink", "routerLink", "router-link">;
__VLS_components.Navbar; __VLS_components.navbar;
// @ts-ignore
[navbar,];
__VLS_components.VContainer; __VLS_components.VContainer; __VLS_components.vContainer; __VLS_components.vContainer; __VLS_components["v-container"]; __VLS_components["v-container"];
// @ts-ignore
[VContainer, VContainer,];
__VLS_components.VRow; __VLS_components.VRow; __VLS_components.vRow; __VLS_components.vRow; __VLS_components["v-row"]; __VLS_components["v-row"];
// @ts-ignore
[VRow, VRow,];
__VLS_components.VBtn; __VLS_components.VBtn; __VLS_components.VBtn; __VLS_components.VBtn; __VLS_components.vBtn; __VLS_components.vBtn; __VLS_components.vBtn; __VLS_components.vBtn; __VLS_components["v-btn"]; __VLS_components["v-btn"]; __VLS_components["v-btn"]; __VLS_components["v-btn"];
// @ts-ignore
[VBtn, VBtn, VBtn, VBtn,];
__VLS_intrinsicElements.div; __VLS_intrinsicElements.div;
__VLS_intrinsicElements.h1; __VLS_intrinsicElements.h1;
__VLS_intrinsicElements.p; __VLS_intrinsicElements.p;
__VLS_components.RouterLink; __VLS_components.RouterLink; __VLS_components.routerLink; __VLS_components.routerLink; __VLS_components["router-link"]; __VLS_components["router-link"];
// @ts-ignore
[RouterLink, RouterLink,];
{
const __VLS_0 = ({} as 'Navbar' extends keyof typeof __VLS_ctx ? { 'navbar': typeof __VLS_ctx.Navbar; } : 'navbar' extends keyof typeof __VLS_ctx ? { 'navbar': typeof __VLS_ctx.navbar; } : typeof __VLS_resolvedLocalAndGlobalComponents).navbar;
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{}, }));
({} as { navbar: typeof __VLS_0; }).navbar;
const __VLS_2 = __VLS_1({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
}
{
const __VLS_5 = ({} as 'VContainer' extends keyof typeof __VLS_ctx ? { 'VContainer': typeof __VLS_ctx.VContainer; } : 'vContainer' extends keyof typeof __VLS_ctx ? { 'VContainer': typeof __VLS_ctx.vContainer; } : 'v-container' extends keyof typeof __VLS_ctx ? { 'VContainer': (typeof __VLS_ctx)["v-container"]; } : typeof __VLS_resolvedLocalAndGlobalComponents).VContainer;
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({ ...{}, class: ("mt-8"), }));
({} as { VContainer: typeof __VLS_5; }).VContainer;
({} as { VContainer: typeof __VLS_5; }).VContainer;
const __VLS_7 = __VLS_6({ ...{}, class: ("mt-8"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, class: ("mt-8"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
{
const __VLS_10 = ({} as 'VRow' extends keyof typeof __VLS_ctx ? { 'VRow': typeof __VLS_ctx.VRow; } : 'vRow' extends keyof typeof __VLS_ctx ? { 'VRow': typeof __VLS_ctx.vRow; } : 'v-row' extends keyof typeof __VLS_ctx ? { 'VRow': (typeof __VLS_ctx)["v-row"]; } : typeof __VLS_resolvedLocalAndGlobalComponents).VRow;
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({ ...{}, class: ("d-flex justify-space-between"), }));
({} as { VRow: typeof __VLS_10; }).VRow;
({} as { VRow: typeof __VLS_10; }).VRow;
const __VLS_12 = __VLS_11({ ...{}, class: ("d-flex justify-space-between"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{}, class: ("d-flex justify-space-between"), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
if (__VLS_ctx.categorylist.length > 0) {
{
const __VLS_15 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn; } : 'vBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.vBtn; } : 'v-btn' extends keyof typeof __VLS_ctx ? { 'VBtn': (typeof __VLS_ctx)["v-btn"]; } : typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({ ...{}, color: ("green-darken-4"), }));
({} as { VBtn: typeof __VLS_15; }).VBtn;
({} as { VBtn: typeof __VLS_15; }).VBtn;
const __VLS_17 = __VLS_16({ ...{}, color: ("green-darken-4"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{}, color: ("green-darken-4"), });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
(__VLS_18.slots!).default;
}
// @ts-ignore
[categorylist,];
}
{
const __VLS_20 = __VLS_intrinsicElements["div"];
const __VLS_21 = __VLS_elementAsFunctionalComponent(__VLS_20);
const __VLS_22 = __VLS_21({ ...{}, class: ("text-center"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{}, class: ("text-center"), });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
{
const __VLS_25 = __VLS_intrinsicElements["h1"];
const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
const __VLS_27 = __VLS_26({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_26));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_25, typeof __VLS_27> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!;
let __VLS_29!: __VLS_NormalizeEmits<typeof __VLS_28.emit>;
(__VLS_ctx.nameDet);
(__VLS_28.slots!).default;
}
{
const __VLS_30 = __VLS_intrinsicElements["p"];
const __VLS_31 = __VLS_elementAsFunctionalComponent(__VLS_30);
const __VLS_32 = __VLS_31({ ...{}, class: ("text-muted"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_30, typeof __VLS_32> & Record<string, unknown>) => void)({ ...{}, class: ("text-muted"), });
const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32)!;
let __VLS_34!: __VLS_NormalizeEmits<typeof __VLS_33.emit>;
(__VLS_ctx.addressDet);
(__VLS_33.slots!).default;
}
(__VLS_23.slots!).default;
}
{
const __VLS_35 = ({} as 'RouterLink' extends keyof typeof __VLS_ctx ? { 'RouterLink': typeof __VLS_ctx.RouterLink; } : 'routerLink' extends keyof typeof __VLS_ctx ? { 'RouterLink': typeof __VLS_ctx.routerLink; } : 'router-link' extends keyof typeof __VLS_ctx ? { 'RouterLink': (typeof __VLS_ctx)["router-link"]; } : typeof __VLS_resolvedLocalAndGlobalComponents).RouterLink;
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({ ...{}, to: (({ name: 'ViewCategory', params: { locationId: __VLS_ctx.IDlocation } })), }));
({} as { RouterLink: typeof __VLS_35; }).RouterLink;
({} as { RouterLink: typeof __VLS_35; }).RouterLink;
const __VLS_37 = __VLS_36({ ...{}, to: (({ name: 'ViewCategory', params: { locationId: __VLS_ctx.IDlocation } })), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_35, typeof __VLS_37> & Record<string, unknown>) => void)({ ...{}, to: (({ name: 'ViewCategory', params: { locationId: __VLS_ctx.IDlocation } })), });
const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37)!;
let __VLS_39!: __VLS_NormalizeEmits<typeof __VLS_38.emit>;
{
const __VLS_40 = ({} as 'VBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.VBtn; } : 'vBtn' extends keyof typeof __VLS_ctx ? { 'VBtn': typeof __VLS_ctx.vBtn; } : 'v-btn' extends keyof typeof __VLS_ctx ? { 'VBtn': (typeof __VLS_ctx)["v-btn"]; } : typeof __VLS_resolvedLocalAndGlobalComponents).VBtn;
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({ ...{}, color: ("green-darken-4"), }));
({} as { VBtn: typeof __VLS_40; }).VBtn;
({} as { VBtn: typeof __VLS_40; }).VBtn;
const __VLS_42 = __VLS_41({ ...{}, color: ("green-darken-4"), }, ...__VLS_functionalComponentArgsRest(__VLS_41));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_40, typeof __VLS_42> & Record<string, unknown>) => void)({ ...{}, color: ("green-darken-4"), });
const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42)!;
let __VLS_44!: __VLS_NormalizeEmits<typeof __VLS_43.emit>;
(__VLS_43.slots!).default;
}
(__VLS_38.slots!).default;
}
(__VLS_13.slots!).default;
}
(__VLS_8.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!: {};
// @ts-ignore
[nameDet, addressDet, IDlocation, IDlocation, IDlocation,];
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
RouterLink: RouterLink as typeof RouterLink,
navbar: navbar as typeof navbar,
};
},

components: {
navbar
},
data() {
return {
userId: '',
username: '',
categorylist: [],
IDlocation: '',
listofuser: [],
nameDet: '',
addressDet: ''
};
},
async mounted() {
let user = JSON.parse(localStorage.getItem('user_Inf'));
if (!user) {
this.$router.push('/login');
} else {
if (Array.isArray(user) && user.length > 0) {
this.userId = user[0].id;
} else {
this.userId = user.id;
}
this.IDlocation = this.$route.params.locationID;
const dataCateg = await axios.get(
`http://localhost:3000/category?userId=${this.userId}&locationId=${this.IDlocation}`
);
this.categorylist = dataCateg.data;
}

// validate
const res = await axios.get(
`http://localhost:3000/location?userID=${this.userId}&id=${this.IDlocation}`
);
if (res.status == 200) {
this.listofuser = res.data;
this.nameDet = this.listofuser[0].name;
this.addressDet = this.listofuser[0].address;

if (this.listofuser.length !== 1) {
this.$router.push('/');
}
}
},
methods: {
// generateRoute(paygoValue) {
//   return {
//     name: 'addCate',
//     params: { paygo: paygoValue }
//   }
// }
}
});
return (await import('vue')).defineComponent({
setup() {
return {};
},

components: {
navbar
},
data() {
return {
userId: '',
username: '',
categorylist: [],
IDlocation: '',
listofuser: [],
nameDet: '',
addressDet: ''
};
},
async mounted() {
let user = JSON.parse(localStorage.getItem('user_Inf'));
if (!user) {
this.$router.push('/login');
} else {
if (Array.isArray(user) && user.length > 0) {
this.userId = user[0].id;
} else {
this.userId = user.id;
}
this.IDlocation = this.$route.params.locationID;
const dataCateg = await axios.get(
`http://localhost:3000/category?userId=${this.userId}&locationId=${this.IDlocation}`
);
this.categorylist = dataCateg.data;
}

// validate
const res = await axios.get(
`http://localhost:3000/location?userID=${this.userId}&id=${this.IDlocation}`
);
if (res.status == 200) {
this.listofuser = res.data;
this.nameDet = this.listofuser[0].name;
this.addressDet = this.listofuser[0].address;

if (this.listofuser.length !== 1) {
this.$router.push('/');
}
}
},
methods: {
// generateRoute(paygoValue) {
//   return {
//     name: 'addCate',
//     params: { paygo: paygoValue }
//   }
// }
}
});
})();
