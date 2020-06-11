/*!
 * gulp-nunjucks-sass-template
 * A Gulp 4 template including SCSS, Nunjucks, JS and more
 *
 * Url: https://github.com/DefaultSimon
 * Author: Simon Goričar
 * Copyright 2019-2020. MIT licensed.
 */
// Аналог $(document).ready()
document.addEventListener('DOMContentLoaded', function() {
  const tagsListDefault = document.querySelectorAll('.header_tags .tag');
  let tagsWidthListDefault = [], currentTag, currentTagIndex;
  if (document.querySelector('.header_tags')) {
    Array.prototype.forEach.call(tagsListDefault, function(elem) {
      tagsWidthListDefault.push( elem.offsetWidth + 12 );
    });
    currentTag = document.querySelector('.header_tags .tag.current');
    currentTagIndex = function() {
      if (currentTag !== null) {
        return Array.prototype.slice.call(tagsListDefault).indexOf(currentTag);
      }
    };
  }

  function StartScripts() {
    console.log((window.innerWidth >= 1024), (window.innerWidth > window.innerHeight));

    if (document.querySelector('.compilation')) {
      let itemsOnPage = document.querySelectorAll('.compilation .item'), itemWidth, imageHeight, itemTags;
      if ((window.innerWidth < 1024) && (window.innerWidth < window.innerHeight)) { //portrait
        itemWidth = itemsOnPage[0].querySelector('.item_image').offsetWidth;
        imageHeight = itemWidth / 2 * 3;
        Array.prototype.forEach.call(itemsOnPage, function(elem){
          let image = elem.querySelector('.item_image');
          image.style.height = imageHeight + 'px';
        });
      } else {
        itemWidth = itemsOnPage[0].offsetWidth;
        if (itemsOnPage[0].classList.contains('wide')) {
          imageHeight = (itemWidth - 40) / 151 * 106;
        } else {
          imageHeight = (itemWidth - 40) / 53 * 76;
        }
        Array.prototype.forEach.call(itemsOnPage, function(elem){
          let image = elem.querySelector('.item_image');
          itemTags = elem.querySelector('.item_tags');
          image.style.height = imageHeight + 'px';
          itemTags.style.top = imageHeight + 'px';
        });
      }
    }

    if (document.querySelector('#copyLink')) {
      document.querySelector('#copyLink').addEventListener('click', () => {
        let dummy = document.createElement('input'),
            text = window.location.href;

        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
      });
    }

    function ToggleBlock(block, button) {
      let ToggleMenu = function() {
        block.classList.toggle('open');
      };
      if (button) {
        button.onclick = () => (new ToggleMenu());
      }
    }

    if (document.querySelector('.header_tags')) {
      let tagNav = document.querySelector('.header_tags'),
          tagMoreList = document.querySelector('.header_tags .tag_list'),
          tagMoreButton = document.querySelector('.header_tags .tag-wrapper'),
          i = 0,
          tagNavWidth = tagNav.offsetWidth,
          tagMoreButtonWidth = tagMoreButton.offsetWidth,
          tagsVisibleWidth = 0,
          tagsList = Array.prototype.slice.call(tagsListDefault),
          tagsWidthList = tagsWidthListDefault.slice();
      function FindTagsVisibleWidth(index) {
        tagsVisibleWidth = tagMoreButtonWidth - 24;
        if (document.querySelector('.header_tags .tag.current')) {
          do {
            tagsVisibleWidth = tagsVisibleWidth + tagsWidthList[index];
            index++;
          } while ((tagsVisibleWidth <= (tagNavWidth - tagMoreButtonWidth - 24 - 26)) && (index < tagsList.length));
        } else {
          do {
            tagsVisibleWidth = tagsVisibleWidth + tagsWidthList[index];
            index++;
          } while ((tagsVisibleWidth <= (tagNavWidth - tagMoreButtonWidth - 24)) && (index < tagsList.length));
        }
        return index;
      }
      i = FindTagsVisibleWidth(i);
      let allNavTags = document.querySelectorAll('.header_tags .tag');
      if (currentTag) {
        if (currentTagIndex() > i) {
          let currentTagWidth = tagsWidthList[currentTagIndex()];
          tagsList.splice(currentTagIndex(), 1);
          tagsWidthList.splice(currentTagIndex(), 1);
          let k = i - 1;
          tagsList.splice(k, 0, currentTag);
          tagsWidthList.splice(k, 0, currentTagWidth);
        }
        i = 0;
        i = FindTagsVisibleWidth(i);
      }
      Array.prototype.forEach.call(allNavTags, function (elem) {
        elem.remove();
      });
      for (let b = 0; b < i; b++) {
        tagMoreButton.before(tagsList[b]);
      }
      for (let l = i; l < tagsList.length; l++) {
        tagMoreList.append(tagsList[l]);
      }
      tagNav.style.flexWrap = 'nowrap';
    }

    if (
      document.querySelector('.header_tags') ||
      document.querySelector('.header_menu') ||
      document.querySelector('.header_notification') ||
      document.querySelector('.header_language') ||
      document.querySelector('.article .share')
    ) {
      let menuWrapper, menu, menuButton;
      if (document.querySelector('.header_menu')) {
        menuWrapper = document.querySelector('.header_menu');
        menu = menuWrapper.querySelector('.menu');
        menuButton = menuWrapper.querySelector('.btn-icon');
      }
      new ToggleBlock(menu, menuButton);

      let languageWrapper, language, languageButton;
      if (document.querySelector('.header_language')) {
        languageWrapper = document.querySelector('.header_language');
        language = languageWrapper.querySelector('.language');
        languageButton = languageWrapper.querySelector('.btn-icon');
      }
      new ToggleBlock(language, languageButton);

      let notificationWrapper, notification, notificationButton;
      if (document.querySelector('.header_notification')) {
        notificationWrapper = document.querySelector('.header_notification');
        notification = notificationWrapper.querySelector('.notification');
        notificationButton = notificationWrapper.querySelector('.btn-icon');
      }
      new ToggleBlock(notification, notificationButton);

      let navWrapper, navList, navButton;
      if (document.querySelector('.header_tags')) {
        navWrapper = document.querySelector('.header_tags .tag-wrapper');
        navList = navWrapper.querySelector('.tag_list');
        navButton = navWrapper.querySelector('.tag-button');
      }
      new ToggleBlock(navList, navButton);

      let shareWrapper, shareList, shareButton;
      if (document.querySelector('.article .share')) {
        shareWrapper = document.querySelector('.article .share');
        shareList = shareWrapper.querySelector('.share_list');
        shareButton = shareWrapper.querySelector('.share_button');
      }
      new ToggleBlock(shareList, shareButton);

      document.onclick = (e) => {
        let target = e.target;
        let itsMenu, itsMenuButton, menuIsActive;
        if (document.querySelector('.header_menu')) {
            itsMenu = target === menu || menu.contains(target);
            itsMenuButton = target === menuButton;
            menuIsActive = menu.classList.contains('open');
        }

        let itsLanguage, itsLanguageButton, languageIsActive;
        if (document.querySelector('.header_language')) {
          itsLanguage = target === language || language.contains(target);
          itsLanguageButton = target === languageButton;
          languageIsActive = language.classList.contains('open');
        }

        let itsNotification, itsNotificationButton, notificationIsActive;
        if (document.querySelector('.header_notification')) {
          itsNotification = target === notification || notification.contains(target);
          itsNotificationButton = target === notificationButton;
          notificationIsActive = notification.classList.contains('open');
        }

        let itsList, itsListButton, listIsActive;
        if (document.querySelector('.header_tags')) {
          itsList = target === navList || navList.contains(target);
          itsListButton = target === navButton;
          listIsActive = navList.classList.contains('open');
        }

        let itsShareList, itsShareListButton, shareListIsActive;
        if (document.querySelector('.article .share')) {
          itsShareList = target === shareList || shareList.contains(target);
          itsShareListButton = target === shareButton;
          shareListIsActive = shareList.classList.contains('open');
        }

        if (document.querySelector('.header_menu') && !itsMenu && !itsMenuButton && menuIsActive) {
          menu.classList.toggle('open');
        }
        if (document.querySelector('.header_language') && !itsLanguage && !itsLanguageButton && languageIsActive) {
          language.classList.toggle('open');
        }
        if (document.querySelector('.header_notification') && !itsNotification && !itsNotificationButton && notificationIsActive) {
          notification.classList.toggle('open');
        }
        if (document.querySelector('.header_tags') && !itsList && !itsListButton && listIsActive) {
          navList.classList.toggle('open');
        }
        console.log(document.querySelector('.article .share'), shareList, !itsShareList, !itsShareListButton, shareListIsActive);
        if (document.querySelector('.article .share') && !itsShareList && !itsShareListButton && shareListIsActive) {
          shareList.classList.toggle('open');
        }
      };
    }

    let article = document.querySelector('.article'),
        articleImage = document.querySelector('.article_image');
    if (article) {
      console.log(articleImage.offsetWidth, articleImage.offsetHeight);
      document.querySelector('.article_image-picture').style.height = 'auto';
      articleImage.style.width = 'auto';
      if ((window.innerWidth > window.innerHeight)) {
        let picture = document.querySelector('.article_image-picture'),
          caption = document.querySelector('.article_image-caption'),
          pictureHeight, pictureWidth;
        picture.style.height = 'auto';
        if (((article.offsetWidth / 2) < (article.querySelector('.wrapper').offsetWidth)) && (article.offsetWidth < 1100)) {
          console.log('tablet landscape');
          if ((picture.offsetHeight + caption.offsetHeight + 80) > window.innerHeight) {
            pictureWidth = (article.offsetWidth / 2) - 120;
            pictureHeight = pictureWidth / 102 * 153;
          } else {
            picture.style.height = (articleImage.offsetHeight - caption.offsetHeight) + 'px';
            pictureHeight = picture.offsetHeight;
            pictureWidth = pictureHeight / 153 * 102;
          }
            articleImage.style.width = pictureWidth + 'px';
          document.querySelector('.article').style.paddingLeft = pictureWidth + 40 + 'px';
        } else {
          if ((picture.offsetHeight + caption.offsetHeight + 80) > window.innerHeight) {
            picture.style.height = (articleImage.offsetHeight - caption.offsetHeight) + 'px';
          }
          pictureHeight = picture.offsetHeight;
          pictureWidth = pictureHeight / 153 * 102;
          articleImage.style.width = pictureWidth + 'px';
          document.querySelector('.article').style.paddingLeft = pictureWidth + 40 + 'px';
        }
        let currentPageYPosition = 0, bannersScroll = 0;
        document.onscroll = function () {
          if (document.querySelector('.article')) {
            let articleHeight = document.querySelector('section.article').offsetHeight,
              headerHeight = document.querySelector('.header').offsetHeight;

            let bannersContainer = document.querySelector('.banners_container'),
              bannersContainerHeight = bannersContainer.offsetHeight,
              bannersWrapperHeight = document.querySelector('.banners_wrapper').offsetHeight,
              contentHeight = document.querySelector('.content').offsetHeight,
              blocksDifference = (contentHeight) / (bannersContainerHeight - bannersWrapperHeight + 140),
              scrollDifference = pageYOffset - currentPageYPosition, bannersScrollNew;
            if ((bannersContainerHeight - bannersWrapperHeight) > 0) {
              bannersScrollNew = scrollDifference / blocksDifference;
              bannersScroll = bannersScroll + bannersScrollNew;
              if ((bannersContainerHeight - bannersWrapperHeight) > bannersScroll) {
                bannersContainer.style.transform = 'translateY(' + (bannersScroll  * -1) + 'px)';
              } else if ((bannersContainerHeight - bannersWrapperHeight) <= bannersScroll) {
                bannersContainer.style.transform = 'translateY(' + ((bannersContainerHeight - bannersWrapperHeight)  * -1) + 'px)';
              } else if (bannersScroll < 0) {
                bannersContainer.style.transform = 'translateY(' + 0 + 'px)';
              }
            }
            console.log(pageYOffset, articleHeight + headerHeight - 80 - articleImage.offsetHeight);
            console.log(articleHeight, headerHeight, articleImage.offsetHeight);
            if ((pageYOffset > 73) && (pageYOffset < (headerHeight + articleHeight - 80 - (articleImage.offsetHeight + 40)))) {
              articleImage.style.position = 'fixed';
              articleImage.style.top = '40px';
              articleImage.style.bottom = 'auto';
              articleImage.style.width = articleImage.offsetWidth + 'px';
            } else if ((pageYOffset > 73) && (pageYOffset >= (headerHeight + articleHeight - 80 - (articleImage.offsetHeight + 40)))) {
              articleImage.style.position = 'absolute';
              articleImage.style.top = 'auto';
              articleImage.style.bottom = '80px';
              articleImage.style.width = articleImage.offsetWidth + 'px';
            } else {
              articleImage.style.position = 'absolute';
              articleImage.style.top = '40px';
              articleImage.style.bottom = 'auto';
              articleImage.style.width = articleImage.offsetWidth + 'px';
            }

            currentPageYPosition = pageYOffset;
          }
        };
      } else {
        document.querySelector('.article').style.paddingLeft = '16px';
      }
    }
  }

  new StartScripts();

  window.onresize = StartScripts;
});


// // Если должен быть найден один элемент
// if((e = document.querySelector("#form")) !== null)
//   e.classList.add('last'); // Аналог выборки и присвоения класса
// // Если элементов будет много
// Array.prototype.forEach.call(document.querySelectorAll("#form"), function(e){
//   e.classList.add('last');
// });
