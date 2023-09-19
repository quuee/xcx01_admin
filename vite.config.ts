import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { resolve } from "path"


const pathSrc = resolve(__dirname, './src')
// https://vitejs.dev/config/
export default (({ command, mode, ssrBuild }) => {
  const VITE_BASE_URL: string = loadEnv(mode, process.cwd(), "VITE_").VITE_BASE_URL
  console.log("VITE_BASE_URL", VITE_BASE_URL)
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            // prefix: 'Icon',
            enabledCollections:['ep']
          }),
        ],
          // dts: resolve(pathSrc, 'auto-imports.d.ts'),
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            // 修改Icon组件前缀，不设置则默认为i,禁用则设置为false
            // prefix: 'icon',
            enabledCollections: ['ep'],
          }),
        ],
        // dts: resolve(pathSrc, 'components.d.ts'),
      }),
      Icons({
        autoInstall: true, // Icons图标自动下载
        compiler: "vue3",
      }),
    ],
    resolve: {
      alias: {
        "@": pathSrc
      },
      extensions: ['.js', '.json', '.ts']
    },
    server: {
      //代理服务器
      proxy: {
        '/api': {
          // target: 'http://192.168.2.11:8090',
          target: VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (url) => url.replace(/^\/api/, ''),
        },
      },
      //本地地址
      host: "0.0.0.0",
      port: 10111,
      open: false
    }
  })
})
