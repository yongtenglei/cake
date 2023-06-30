import html2canvas from 'html2canvas'

export const downloadScreenshot = async (selector = 'main') => {
  const canvas = await html2canvas(document.querySelector(selector))
  
  var strData = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
  const saveLink = document.createElement('a')
  saveLink.download = 'cake division.png'
  saveLink.href = strData
  saveLink.click()
}