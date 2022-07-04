1、懒加载（lazy loading）
通过import异步加载一个模块，到底什么时候加载这个模块，是不知道的。需要的时候再加载，提高加载速度
首页、详情页、列表做代码分割，路由切换的时候，通过异步组件的形式再把对应页面组件载入进来。
懒加载不是webpack的，是es提出来的。（import），webpack只是识别这种语法进行代码分割而已。

优点： 需要某些模块的时候，再去请求模块的源代码、不需要一次性把所有的代码都加载到页面中

2、打包分析 analyze
3、code coverage(代码覆盖率上)优化： command+shift+P => show coverage 进行代码分析使用率
4、预取/预加载模块(prefetch/preload module) 
   prefetch： 主要模块加载之后，在带宽使用低的情况下，偷偷加载次要模块，比如登录modal
        document.addEventListener("click", () => {
            import(/* webpackPrefetch: true */ "./click.js").then(({ default: func }) => {
                func();
            });
        });
   preload：和主要模块一同加载；   

