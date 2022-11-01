import store from "./utils/vuex-store";
import { getItem } from './utils/storage'
import StoreKey from './utils/store-key'

class BookmarkInfoModel {
    // 构造器
    constructor() {
        /** 标题 */
        this.title = '';
        /** 图标 */
        this.icon = '';
        /** 由uuid组成 id */
        this.id = createUUID();
        /** 书签列表 */
        this.listInFolder = [];
        /** 网址链接 */
        this.url = '';

        /** 路径, 由一些列title组成，
         * 无需手动设置  当节点被add到父节点时自动添加
         */
        this.path = '';
        /** 从roottree访问当前节点的访问路径，由一些列id组成，
         * 无需手动设置  当节点被add到父节点时自动添加
         * */
        this.accessPath = '';
    }

    /** 由url确定 true：文件夹 false: 书签 */
    isFolder() {
        return this.url.length == 0;
    }
    /** 由icon确定 true：使用icon的Name属性 false: 使用icon的class属性，适用于iconfont */
    isIconUseNamePorp() {
        // 非iconfont即使用 name属性
        return this.icon.toLowerCase().indexOf('bookmark') == -1;
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
    /** 添加子节点 */
    addSubmodel(model) {
        // 数据非法
        if (!model) {
            // 子模型不存在
            console.log('待添加的书签模型不存在')
            return
        }
        if (!this.isFolder()) {
            // 当前模型非文件夹
            console.log('当前模型并非书签文件夹')
            return
        }

        // 在tree中找到当前节点，因为当前节点可能是tree上深拷贝的节点，所以不能直接操作当前节点进行添加
        const targetListInFolder = getTargetNodeWithAccessPath(BookmarkInfoModel.getRootTree() ,this.accessPath)
        // 添加子模型，设置子模型的path
        model.path = this.path + '/' + model.title
        model.accessPath = this.accessPath + '/' + model.id
        targetListInFolder.push(model)

        // 刷新一下tree的本地存储
       store.commit('setBookmarkListData', BookmarkInfoModel.getRootTree())
    }

    /*********** 静态方法 *********/
    /** 创造根节点 */
    static createRootTree() {
        const rootModel =  new BookmarkInfoModel()
        rootModel.title = '书签'
        rootModel.path = '/书签'
        rootModel.accessPath = '/'+ rootModel.id
        rootModel.setupStarIcon();
        return rootModel;
    }
    /** 返回根节点 */
    static  getRootTree() {
        return store.state.bookmarkListData
    }
    /** 遍历当前模型树 */
    static mapModelInfoTree(tree, func) {
        // 数据非法
        if (!tree) {
            console.log('mapModelInfoTree(tree, func) 中tree数据非法')
            return
        }

        // 深度优先遍历树形结构 node当前节点  curTree当前树
        let node, curTree = cloneDeepObj(tree);
        // 遍历子节点
        while ((node = curTree.listInFolder.shift())) {
            // 调用回调
            func(node)
            node.listInFolder && curTree.listInFolder.unshift(...node.listInFolder)
        }
    }
    /** 将某节点的树形结构映射成数组，数组按序排列所有节点 */
    static treeMapToArray(tree) {
        // 数据非法
        if (!tree) {
            console.log('treeMapToArray(tree) 中tree数据非法')
            return
        }

        const arr = [];
        // 添加根节点
        arr.unshift(tree)
        // 遍历树

        this.mapModelInfoTree(tree,(node) => {
            // 添加子节点
            arr.push(node)
        })
        // arr.forEach((node) => {
        //     console.log('path = ' + node.path)
        //     console.log(node)
        //     console.log('id = ' + node.id)
        // })
        return arr
    }
    /** 将根节点的树形结构映射成数组，数组按序排列所有节点 */
    static rootTreeMapToArray() {
        return this.treeMapToArray(this.getRootTree())
    }
    /** 以dic 创建BookmarkInfoModel实例 */
    static modelWithDic(dic) {
        // 数据非法
        if (!dic) {
            console.log('modelWithDic(dic) 中dic数据非法')
            return
        }

        console.log('原始字典数据是')
        console.log(dic)
        // 将树形结构映射成 array
        let targetTree, dics = this.treeMapToArray(dic);
        // 将字典转化成模型
        for (let i = dics.length -1; i >= 0; i--) {
            const item = dics[i];
            // 新建模型
            const model =  new BookmarkInfoModel()
            for (const key in item) {
                // 以字典赋值模型
                model[key] = item[key]
            }

            // 获取当前item的父节点，将字典item替换成model
            let accessKeys = model.accessPath.split('/');
            if (accessKeys.length > 2) {
                // 非根节点，即存在父节点
                // 获取父节点路径
                accessKeys.pop()
                const accessPath = accessKeys.join('/')
                // 根据父节点路径，得的父节点的listInFolder数组
                const targetListInFolder = getTargetNodeWithAccessPath(dic, accessPath)

                // 获取当前item在父节点中的索引
                for (let j = 0; j < targetListInFolder.length; j++ ) {
                    const n = targetListInFolder[j];
                    if (n.id == item.id) {
                        // 将字典item替换成model
                        targetListInFolder.splice(j,1, model)
                        console.log('将字典替换成模型后的数组为')
                        console.log(targetListInFolder)
                        break;
                    }
                }
            } else {
                // 根节点
                targetTree = model
            }
        }
        console.log('最终结果model是')
        console.log(targetTree)
        return targetTree
    }
}

/*********** 私有方法 *********/
/** 深拷贝 */
function cloneDeepObj(obj) {
    let str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
            newobj = JSON.parse(str); //还原
    } else {
        for(let i in obj){
            newobj[i] = typeof obj[i] === 'object' ?
                cloneDeepObj(obj[i]) : obj[i];
        }
    }
    return newobj;
}
/** 生成UUID */
function  createUUID() {
    // uuid
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
/** 根据accessPath 访问tree中该路径对应的节点 */
function getTargetNodeWithAccessPath(tree, accessPath) {
    // 数据非法
    if (!tree) {
        console.log('getTargetNodeWithAccessPath(tree, accessPath) 中tree数据非法')
        return
    }
    if (!accessPath) {
        console.log('getTargetNodeWithAccessPat(tree, accessPath) 中accessPath数据非法')
        return
    }

    // 在tree中找到当前节点，因为当前节点可能是tree上深拷贝的节点，所以不能直接操作当前节点进行添加
    // accessPath由'/'分割
    let accessKeys = accessPath.split('/');
    // 移除前两个元素 accessKeys[0]是''  accessKeys[1]是rootModel的id 这两无用
    accessKeys.splice(0, 2)

    // 找到目标数组
    let targetListInFolder = tree.listInFolder
    for (const key in accessKeys) {
        for (const node in targetListInFolder) {
            if (node.id == key) {
                console.log('找到了书签 = ', node.title)
                targetListInFolder = node.listInFolder
                break
            }
        }
    }
    return targetListInFolder
}

export default BookmarkInfoModel