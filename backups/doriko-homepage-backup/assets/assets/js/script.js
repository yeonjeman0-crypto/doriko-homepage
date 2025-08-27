$(document).ready(function () {
    /* MAIN SCROLL BUTTON - START */
    const mainScrollBtn = $("#description_block_main_scroll_btn");
    mainScrollBtn.on("click", function () {
        window.scrollTo(0, window.innerHeight);
    });
    /* MAIN SCROLL BUTTON - ENDED */

    /* SERVICES ANIMATION ANIME.JS - START */
    $(".services__block").each(function () {
        const circleService = $(this).find(".services__icon-block--circle");

        $(this).on("mouseenter", function () {
            anime.remove(circleService[0]);
            anime({
                targets: circleService[0],
                scale: 9,
                easing: "linear",
                duration: 256
            });
        });

        $(this).on("mouseleave", function () {
            anime.remove(circleService[0]);
            anime({
                targets: circleService[0],
                scale: 1,
                easing: 'spring(1, 50, 10, 0)'
            });
        });
    });
    /* SERVICES ANIMATION ANIME.JS - ENDED */

    /* FOOTER PARTNERS OWL CAROUSEL - START */
    $(document).ready(function () {
        if ($('#owl-carousel-partners').length) {
            $('#owl-carousel-partners').owlCarousel({
                items: 8,
                loop: true,
                center: false,
                nav: false,
                dots: false,
                autoplay: true,
                autoplayTimeout: 2048,
                smartSpeed: 512,
                autoplayHoverPause: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    600: {
                        items: 3,
                    },
                    768: {
                        items: 5,
                    },
                    1200: {
                        items: 8,
                    }
                }
            });
        }
    });
    /* FOOTER PARTNERS OWL CAROUSEL - ENDED */

    /* FAQ BLOCKS FUNCTION - START */
    const faq_container = $(".faq");
    const faq_blocks = faq_container ? $(".faq__block") : null;

    if (faq_container && faq_blocks) {
        faq_blocks.each(function (index, faq_block) {
            const faq_maximized_detail = $(faq_block).find(".faq__maximized-detail");
            const faq_minimized_detail = $(faq_block).find(".faq__minimazed-detail");

            $(faq_block).find(".faq__minimazed-detail-header--button").on("click", function () {
                faq_minimized_detail.css({
                    transform: "translate(0px, 50px)",
                    opacity: 0
                });
                faq_maximized_detail.css({
                    transform: "translate(0px, -50px)",
                    opacity: 1,
                    maxHeight: "384px"
                });

                faq_blocks.each(function (index, other_faq_block) {
                    if (other_faq_block !== faq_block) {
                        const other_faq_maximized_detail = $(other_faq_block).find(".faq__maximized-detail");
                        const other_faq_minimized_detail = $(other_faq_block).find(".faq__minimazed-detail");

                        other_faq_maximized_detail.css({
                            transform: "translate(0px, 0px)",
                            opacity: 0,
                            maxHeight: "0px"
                        });
                        other_faq_minimized_detail.css({
                            transform: "translate(0px, 0px)",
                            opacity: 1
                        });
                    }
                });
            });

            $(faq_block).find(".faq__maximized-detail-header--button").on("click", function () {
                faq_minimized_detail.css({
                    transform: "translate(0px, 0px)",
                    opacity: 1
                });
                faq_maximized_detail.css({
                    transform: "translate(0px, 0px)",
                    opacity: 0,
                    maxHeight: "0px"
                });
            });
        });
    }
    /* FAQ BLOCKS FUNCTION - ENDED */

    /* JVECTOR MAP PLUGIN ABOUT US - START */
    if ($("#world_map").length > 0) {
        const countrySelectedColors = {
            AZ: "rgb(255, 15, 0)",
            RU: "rgb(46, 134, 222)",
            AE: "rgb(16, 172, 132)",
            QA: "rgb(243, 104, 224)",
            TR: "rgb(255, 159, 67)",
            GB: "rgb(27, 20, 100)",
            defaultFill: "rgb(61, 61, 61)"
        };


        $("#world_map").vectorMap({
            map: "world_mill_en",
            zoomButtons: true,
            zoomOnScroll: true,
            panOnDrag: true,
            backgroundColor: "transparent",
            regionStyle: {
                initial: {
                    fill: "rgb(61, 61, 61)"
                },
                hover: {
                    "fill-opacity": 0.7,
                }
            },
            series: {
                regions: [
                    {
                        attribute: "fill",
                        values: countrySelectedColors
                    }
                ]
            }
        });
    }
    /* JVECTOR MAP PLUGIN ABOUT US - ENDED */

    /* FILTERING PROJECTS - START */
    const $filteringContainer = $("#projects_block");
    const $dataTarget = $filteringContainer.find("[data-target]");
    const $dataItem = $filteringContainer.find('[data-item]');
    const $seeAllButton = $("#see_all");

    if ($dataTarget.length > 0) {
        $dataTarget.on("click", function () {
            $dataItem.hide();
            $dataTarget.removeClass("filtering-active");
            const targetValue = $(this).data("target");
            const $matchingItems = $filteringContainer.find(`[data-item="${targetValue}"]`);
            $matchingItems.show();
            $(this).addClass("filtering-active");
        });
    }

    if ($seeAllButton.length > 0) {
        $seeAllButton.on("click", function () {
            $dataItem.show();
            $dataTarget.removeClass("filtering-active");
        });
    }
    /* FILTERING PROJECTS - ENDED */
});