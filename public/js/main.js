"use strict";

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        // let idSetInterval = null;
        // function tabs(tabTrigger, tabTriggerWrap, tabContent) {
        //     var tabBox = document.querySelectorAll(tabContent);
        //     var tabTop = document.querySelector(tabTriggerWrap);
        //     var tabBtn = document.querySelectorAll(tabTrigger);
        //     if (tabTop) {
        //         tabTop.addEventListener('click', function (event) {
        //             event.preventDefault();

        //             tabChange();
        //             var tabClass = event.target.getAttribute("href");
        //             tabBtn.forEach(function (item) {
        //                 item.classList.remove('tab-active');
        //             });
        //             event.target.classList.add('tab-active');
        //             tabBox.forEach(function (elem) {
        //                 elem.classList.remove('hide');
        //                 if (!elem.classList.contains(tabClass)) {
        //                     elem.classList.add('hide');
        //                 }
        //             });
        //         });

        //         clearInterval(idSetInterval);
        //         tabChange();
        //     }
        // }

        // tabs('.tab', '.tab-link-wrapper', '.tabs-content');

        // function tabChange() {
        //     var tab = document.querySelectorAll('.tab');

        //     if (!!tab?.length) {
        //         var content = document.querySelectorAll('.tabs-content');
        //         var count = 1;
        //         function removeClass() {
        //             tab.forEach(function (item) {
        //                 item.classList.remove('tab-active');
        //             });
        //             content.forEach(function (item) {
        //                 item.classList.add('hide');
        //             });
        //         }
        //         idSetInterval = setInterval(function () {
        //             removeClass();
        //             tab[count].classList.add('tab-active');
        //             content[count].classList.remove('hide');
        //             count++;
        //             if (count >= tab.length) {
        //                 count = 0;
        //             }
        //         }, 6000);
        //     }
        // }
        // tabChange();
    });
}

