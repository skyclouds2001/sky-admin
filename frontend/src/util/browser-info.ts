/**
 * 生成浏览器信息方法
 * @returns 当前用户浏览器信息
 */
export const generateBrowserInformation = (): {
  /**
   * 浏览器地址栏可见性
   * @deprecated For privacy and interoperability reasons, the value of the visible property is now false if this Window is a popup, and true otherwise.
   */
  locationbar: boolean

  /**
   * 浏览器菜单栏可见性
   * @deprecated For privacy and interoperability reasons, the value of the visible property is now false if this Window is a popup, and true otherwise.
   */
  menubar: boolean

  /**
   * 浏览器用户界面可见性
   * @deprecated For privacy and interoperability reasons, the value of the visible property is now false if this Window is a popup, and true otherwise.
   */
  personalbar: boolean

  /**
   * 浏览器滚动条可见性
   * @deprecated For privacy and interoperability reasons, the value of the visible property is now false if this Window is a popup, and true otherwise.
   */
  scrollbars: boolean

  /**
   * 浏览器状态栏可见性
   * @deprecated For privacy and interoperability reasons, the value of the visible property is now false if this Window is a popup, and true otherwise.
   */
  statusbar: boolean

  /**
   * 浏览器工具栏可见性
   * @deprecated For privacy and interoperability reasons, the value of the visible property is now false if this Window is a popup, and true otherwise.
   */
  toolbar: boolean
} => {
  return {
    locationbar: window.locationbar.visible,
    menubar: window.menubar.visible,
    personalbar: window.personalbar.visible,
    scrollbars: window.scrollbars.visible,
    statusbar: window.statusbar.visible,
    toolbar: window.toolbar.visible,
  }
}
