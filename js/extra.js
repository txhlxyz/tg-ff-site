// 图片预览功能
document.addEventListener('DOMContentLoaded', function() {
  // 创建图片预览遮罩
  const overlay = document.createElement('div');
  overlay.className = 'image-preview-overlay';
  document.body.appendChild(overlay);

  // 为所有内容图片添加点击事件
  const contentImages = document.querySelectorAll('.md-typeset img:not(.emojione):not(.twemoji):not(.only-light):not(.only-dark)');
  contentImages.forEach(img => {
    if (!img.closest('a')) { // 跳过已经在链接中的图片
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        const previewImg = document.createElement('img');
        previewImg.src = this.src;
        overlay.innerHTML = '';
        overlay.appendChild(previewImg);
        overlay.style.display = 'flex';
      });
    }
  });

  // 点击遮罩关闭预览
  overlay.addEventListener('click', function() {
    this.style.display = 'none';
  });
  
  // 确保Material Icons正常加载
  ensureMaterialIcons();
  
  // 初始化广告空间
  initAds();
}); 

// 确保Material Icons字体正确加载
function ensureMaterialIcons() {
  // 检查是否已经加载了Material Icons字体
  if (!document.getElementById('material-icons-css')) {
    // 加载Material Icons CSS
    const link = document.createElement('link');
    link.id = 'material-icons-css';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    document.head.appendChild(link);
  }
  
  // 修复图标对齐问题
  const icons = document.querySelectorAll('.material-icons');
  icons.forEach(icon => {
    icon.style.verticalAlign = 'middle';
    
    // 如果图标在标题中，应用特殊样式
    if (icon.parentElement.tagName.match(/^H\d$/)) {
      icon.style.marginRight = '0.5rem';
    }
  });
}

// Google 广告和分析代码初始化
function initAds() {
  // 加载Google AdSense脚本
  const adScript = document.createElement('script');
  adScript.async = true;
  adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3978085335977110";
  adScript.crossOrigin = "anonymous";
  document.head.appendChild(adScript);
  
  // 加载Google Analytics脚本
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-TVEFRP16DY";
  document.head.appendChild(gaScript);
  
  // 初始化Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TVEFRP16DY');
  
  // 填充广告空间
  populateAdSpaces();
}

// 填充广告空间
function populateAdSpaces() {
  const adSpaces = document.querySelectorAll('.adspace, .adspace-top, .adspace-middle, .adspace-middle-1, .adspace-middle-2, .adspace-middle-3, .adspace-bottom');
  
  adSpaces.forEach((adSpace, index) => {
    // 这里可以添加逻辑来填充不同的广告单元
    // 例如可以根据类名或索引选择不同的广告单元
    
    // 创建一个广告单元示例
    const adUnit = document.createElement('ins');
    adUnit.className = 'adsbygoogle';
    adUnit.style.display = 'block';
    adUnit.setAttribute('data-ad-client', 'ca-pub-3978085335977110');
    adUnit.setAttribute('data-ad-slot', `ad-slot-${index + 1}`); // 示例，实际使用时需替换为真实的广告位ID
    adUnit.setAttribute('data-ad-format', 'auto');
    adUnit.setAttribute('data-full-width-responsive', 'true');
    
    // 清空广告空间并添加广告单元
    adSpace.innerHTML = '';
    adSpace.appendChild(adUnit);
    
    // 尝试渲染广告
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  });
} 