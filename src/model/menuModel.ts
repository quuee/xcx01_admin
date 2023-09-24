export interface MenuModel {
    id: number,
    menuName: string,
    menuType: number,
    authUrl: string,
    pid: number,
    authority: string,
    sort: number,
    icon: string,
    subMenu?: MenuModel
}
