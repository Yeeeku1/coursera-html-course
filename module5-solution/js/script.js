$(function () { // Same as document.addEventListener("DOMContentLoaded", ... )

  // --- 自动补全代码：随机选择分类核心逻辑 ---
  var chooseRandomCategory = function (categories) {
    var randomArrayIndex = Math.floor(Math.random() * categories.length);
    return categories[randomArrayIndex].short_name;
  };

  // 自动替换首页 HTML 片段中的占位符
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  var switchMenuToActiveClass = function () {
    var navHomeButton = $("#navHomeButton");
    if (!navHomeButton.hasClass("active")) {
      navHomeButton.addClass("active");
    }
    var navMenuButton = $("#navMenuButton");
    if (navMenuButton.hasClass("active")) {
      navMenuButton.removeClass("active");
    }
  };

  // 加载首页内容
  $dc.loadHomeHtml = function () {
    $.ajax({
      type: "GET",
      url: "snippets/home-snippet.html",
      dataType: "html",
      success: function (responseText) {
        // 核心步骤：请求所有分类数据，并随机挑选一个填充到 Specials 链接中
        $.ajax({
          type: "GET",
          url: categoriesUrl,
          dataType: "json",
          success: function (categories) {
            var randomCategoryShortName = chooseRandomCategory(categories);
            var homeHtmlToInsert = insertProperty(responseText, "randomCategoryShortName", "'" + randomCategoryShortName + "'");
            $("#main-content").html(homeHtmlToInsert);
          }
        });
      }
    });
  };

  // 页面加载完成后加载首页
  $dc.loadHomeHtml();
});
