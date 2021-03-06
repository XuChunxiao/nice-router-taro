import React from 'react'
import NavigationService from '@/nice-router/navigation.service'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { AtButton } from 'taro-ui'

import './styles.scss'

// form中组件封装后，button 不会触发form的handle方法问题
// https://github.com/NervJS/taro-ui/issues/96

// {
//   type: 'button',
//   linkToUrl: '',
//   btnType: 'share',
//   uiType:'primary'
// }
function EleButton({
  linkToUrl,
  openType,
  onClick,
  extraData,
  title,
  btnType,
  size,
  uiType,
  customStyle,
  className,
  full,
  circle,
  onGetUserInfo,
  children,
}) {
  let wxOpenType = openType
  if (!openType && (btnType === 'share' || btnType === 'getPhoneNumber' || btnType === 'getUserInfo')) {
    wxOpenType = btnType
  }

  const formType = btnType === 'submit' || btnType === 'reset' ? btnType : null

  const handleScan = async () => {
    const res = await Taro.scanCode()
    const arg = encodeURIComponent(res.result)
    const actionPath = `${linkToUrl}${arg}/`
    console.log('I want to access ', actionPath)
    NavigationService.view(actionPath)
  }

  const handlePreview = async () => {
    console.log('preview document', linkToUrl)
    if (!linkToUrl) {
      return
    }
    try {
      await Taro.showLoading({ title: '正在打开文件...', mask: true })
      const res = await Taro.downloadFile({ url: linkToUrl })
      await Taro.openDocument({ filePath: res.tempFilePath })
    } catch (e) {
      await Taro.showToast({ title: '文件打开失败，稍后重试', icon: 'none' })
    } finally {
      Taro.hideLoading()
    }
  }

  const handleDownload = async () => {
    if (!linkToUrl) {
      return
    }
    try {
      await Taro.showLoading({ title: '正在下载文件...', mask: true })
      await Taro.downloadFile({ url: linkToUrl })
    } catch (e) {
      await Taro.showToast({ title: '下载文件失败，稍后重试', icon: 'none' })
    } finally {
      Taro.hideLoading()
    }
  }

  const handleCopy = () => {
    if (isNotEmpty(extraData)) {
      // noinspection JSIgnoredPromiseFromCall
      Taro.setClipboardData({
        data: JSON.stringify(extraData),
        success: () =>
          Taro.showToast({ title: '已经复制到内存, 请分享或在浏览器中打开', icon: 'none', duration: 5000 }),
      })
    }
  }

  const handleClick = async () => {
    if (onClick) {
      onClick()
      return
    }

    if (btnType === 'submit' || btnType === 'share' || btnType === 'getUserInfo') {
      return
    }

    if (btnType === 'open-document') {
      await handlePreview()
      return
    }
    if (btnType === 'download') {
      await handleDownload()
      return
    }
    if (btnType === 'copy') {
      handleCopy()
      return
    }
    if (btnType === 'scanner') {
      await handleScan()
      return
    }

    console.log('btnType is', btnType, 'just do view action')
    NavigationService.view(linkToUrl)
  }

  const rootClass = classNames('ele-button', className)

  return (
    <AtButton
      circle={circle}
      type={uiType}
      className={rootClass}
      openType={wxOpenType}
      formType={formType}
      size={size}
      full={full}
      customStyle={customStyle}
      onClick={handleClick}
      onGetUserInfo={onGetUserInfo}
    >
      {title}
      {children}
    </AtButton>
  )
}

EleButton.defaultProps = {
  title: '',
  btnType: '',
  size: null,
  uiType: 'primary',
  customStyle: {},
  full: false,
  className: null,
  circle: null,
  onGetUserInfo: null,
  extraData: {},
}

export default EleButton
