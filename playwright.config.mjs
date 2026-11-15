import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'tests',webServer:{command:'npm run preview',url:'http://127.0.0.1:4173',reuseExistingServer:false},use:{baseURL:'http://127.0.0.1:4173'},projects:[{name:'mobile',use:{viewport:{width:375,height:812}}},{name:'desktop',use:{viewport:{width:1440,height:1000}}}]});
