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
}

export default BookmarkInfoModel