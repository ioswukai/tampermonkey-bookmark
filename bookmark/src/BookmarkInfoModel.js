class BookmarkInfoModel {
    // 构造器
    constructor() {
        /** 标题 */
        this.title = '';
        /** 路径 */
        this.path = '';
        /** 书签列表 */
        this.listInFolder = [];
        /** 网址链接 */
        this.url = '';
        /** 图标 */
        this.icon = '';

        /** 由uuid组成 id */
        this.id = this.createUUID();
    }

    /** 由url确定 true：文件夹 false: 书签 */
    get isFolder() {
        return this.url.length == 0;
    }
    /** 由icon确定 true：使用icon的Name属性 false: 使用icon的class属性，适用于iconfont */
    get isIconUseNamePorp() {
        // 非iconfont即使用 name属性
        return this.icon.toLowerCase().indexOf('bookmark') == -1;
    }
    /** 生成UUID */
    createUUID() {
        // uuid
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    setupFolderIcon() {
        // 文件夹
        this.icon = 'bookmark bookmark-wenjianjia';
    }
    setupYueDurIcon() {
        // 阅读
        this.icon = 'bookmark bookmark-yuedu';
    }
    setupStarIcon() {
        // 五角星
        this.icon = 'star'
    }
    /** 遍历当前模型树 */
    mapModelInfoTree(func) {
        // 深度优先遍历树形结构 node当前节点  curTree当前树
        let node, curTree = this.cloneDeepObj(this);
        // 遍历子节点
        while ((node = curTree.listInFolder.shift())) {
            // 调用回调
            func()
            node.listInFolder && curTree.listInFolder.unshift(...node.listInFolder)
        }
    }
    // 深拷贝
    cloneDeepObj(obj) {
        let str, newobj = obj.constructor === Array ? [] : {};
        if(typeof obj !== 'object'){
            return;
        } else if(window.JSON){
            str = JSON.stringify(obj), //系列化对象
                newobj = JSON.parse(str); //还原
        } else {
            for(let i in obj){
                newobj[i] = typeof obj[i] === 'object' ?
                    this.cloneDeepObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    }
}

export default BookmarkInfoModel