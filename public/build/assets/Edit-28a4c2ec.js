import{a as e,F as t,j as a,n as i}from"./app-eae9fd7a.js";import{A as c}from"./AuthenticatedLayout-bcee1669.js";import r from"./DeleteUserForm-c7cc99ed.js";import d from"./UpdatePasswordForm-b03cc312.js";import o from"./UpdateProfileInformationForm-90ed7add.js";import{D as n}from"./DriverLayout-4dfd4fc0.js";import"./ResponsiveNavLink-3283ff5d.js";import"./transition-1d2338f1.js";import"./TextInput-be0e565c.js";import"./InputLabel-443a4008.js";import"./PrimaryButton-31734304.js";function P({auth:s,mustVerifyEmail:l,status:m}){return e(t,{children:s.user.role=="admin"?a(c,{auth:s,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Profile"}),children:[e(i,{title:"Profile"}),e("div",{className:"py-12",children:a("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6",children:[e("div",{className:"p-4 sm:p-8 bg-white shadow sm:rounded-lg",children:e(o,{mustVerifyEmail:l,status:m,className:"max-w-xl"})}),e("div",{className:"p-4 sm:p-8 bg-white shadow sm:rounded-lg",children:e(d,{className:"max-w-xl"})}),e("div",{className:"p-4 sm:p-8 bg-white shadow sm:rounded-lg",children:e(r,{className:"max-w-xl"})})]})})]}):a(n,{auth:s,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Profile"}),children:[e(i,{title:"Profile"}),e("div",{className:"py-12",children:a("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6",children:[e("div",{className:"p-4 sm:p-8 bg-white shadow sm:rounded-lg",children:e(o,{mustVerifyEmail:l,status:m,className:"max-w-xl"})}),e("div",{className:"p-4 sm:p-8 bg-white shadow sm:rounded-lg",children:e(d,{className:"max-w-xl"})}),e("div",{className:"p-4 sm:p-8 bg-white shadow sm:rounded-lg",children:e(r,{className:"max-w-xl"})})]})})]})})}export{P as default};