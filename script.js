document.addEventListener("DOMContentLoaded", function () {
    /*
        RS PIXELS RESPONSIVE CAROUSEL

        This function controls:
        - Services carousel
        - Products carousel
        - Reviews carousel
        - Portfolio carousel

        The amount of movement automatically changes
        depending on the size of the screen and item.
    */

    const carouselButtons = document.querySelectorAll(
        ".slider-arrow"
    );
    
    carouselButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const targetId = button.getAttribute("data-target");

            const direction = button.getAttribute("data-direction");

            const track = document.getElementById(targetId);


            if (!track) {
                return;
            }


            /*
                Find the first visible item.

                This allows the carousel to work with:
                - Images
                - Review cards
                - Portfolio cards
            */

            const item = track.querySelector(
                ".slider-image, .review-card, .portfolio-card"
            );


            if (!item) {
                return;
            }


            /*
                Get the actual width of the item.

                This makes the arrow responsive because
                the movement changes automatically on
                desktop, tablet, and mobile.
            */

            const itemWidth = item.getBoundingClientRect().width;


            /*
                Get the gap between carousel items.
            */

            const trackStyle = window.getComputedStyle(track);

            const gap =
                parseFloat(trackStyle.columnGap) ||
                parseFloat(trackStyle.gap) ||
                20;


            /*
                Total movement.

                Item width + gap means the next item
                will move into position correctly.
            */

            const scrollAmount = itemWidth + gap;


            /*
                Determine direction.
            */

            let movement = scrollAmount;


            if (direction === "prev") {
                movement = -scrollAmount;
            }


            /*
                Smooth responsive scrolling.
            */

            track.scrollBy({
                left: movement,
                behavior: "smooth"
            });

        });

    });


    /*
        PORTFOLIO ARROWS

        The portfolio uses the same carousel system,
        so the arrows also work on desktop and mobile.
    */


    /*
        Prevent horizontal mouse-wheel scrolling
        from causing unwanted page movement when
        the user is directly interacting with a carousel.
    */

    const carouselTracks = document.querySelectorAll(
        ".slider-track, .portfolio-grid"
    );


    carouselTracks.forEach(function (track) {

        track.addEventListener(
            "wheel",
            function (event) {

                /*
                    Only use horizontal scrolling when
                    the track can actually scroll horizontally.
                */

                if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {

                    if (track.scrollWidth > track.clientWidth) {

                        track.scrollLeft += event.deltaY;

                        event.preventDefault();

                    }

                }

            },
            {
                passive: false
            }
        );

    });


    /*
        KEYBOARD SUPPORT

        When a carousel is focused, the user can
        use the left and right arrow keys.
    */

    carouselTracks.forEach(function (track) {

        track.setAttribute("tabindex", "0");


        track.addEventListener("keydown", function (event) {

            const item = track.querySelector(
                ".slider-image, .review-card, .portfolio-card"
            );


            if (!item) {
                return;
            }


            const itemWidth =
                item.getBoundingClientRect().width;


            const gap =
                parseFloat(
                    window.getComputedStyle(track).gap
                ) || 20;


            const movement = itemWidth + gap;


            if (event.key === "ArrowRight") {

                track.scrollBy({
                    left: movement,
                    behavior: "smooth"
                });

            }


            if (event.key === "ArrowLeft") {

                track.scrollBy({
                    left: -movement,
                    behavior: "smooth"
                });

            }

        });

    });


    /*
        NAVIGATION

        Smooth scrolling is applied to internal
        section links such as:

        #about
        #services
        #products
        #portfolio
        #faq
        #contact
        #process
    */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");


            /*
                Ignore links that only contain "#".
            */

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                /*
                    Update the URL hash without
                    causing another jump.
                */

                history.pushState(
                    null,
                    "",
                    targetId
                );

            }

        });

    });


    /*
        TOUCH / MOBILE SUPPORT

        The browser naturally supports touch
        swiping because the carousel tracks use
        horizontal overflow.

        This small enhancement makes the swipe
        movement feel smoother on mobile.
    */

    carouselTracks.forEach(function (track) {

        let startX = 0;
        let startScrollLeft = 0;


        track.addEventListener(
            "touchstart",
            function (event) {

                startX =
                    event.touches[0].pageX;

                startScrollLeft =
                    track.scrollLeft;

            },
            {
                passive: true
            }
        );


        track.addEventListener(
            "touchmove",
            function (event) {

                const currentX =
                    event.touches[0].pageX;

                const difference =
                    startX - currentX;


                track.scrollLeft =
                    startScrollLeft + difference;

            },
            {
                passive: true
            }
        );

    });


    /*
        UPDATE CAROUSEL AFTER RESIZE

        This makes sure the arrows continue
        calculating the correct item width after
        changing from desktop to mobile.
    */

    window.addEventListener(
        "resize",
        function () {

            carouselTracks.forEach(function (track) {

                /*
                    Force browser to recalculate
                    the current carousel dimensions.
                */

                track.style.scrollBehavior = "smooth";

            });

        }
    );

});

/*  
    Form scripts 
*/

let choiceOther = document.getElementById('choiceOther'), otherInput = document.getElementById('otherInput'), resetFormBtn = document.getElementById('clearForm'), form = document.getElementById("deliveryForm");

choiceOther.onchange = function(){makeChoieOtherInputAppear()};

resetFormBtn.onclick = function(){hideChoiceOtherInput()};

// line 395-403 makes the code non-functional and only interactive, no data actually gets sent. remove it if the project needs database shenanigans

form.addEventListener("submit", preventWebpageSubmitReset);

function preventWebpageSubmitReset(event) {
    event.preventDefault();

    event.target.reset();

    hideChoiceOtherInput();
}

function makeChoieOtherInputAppear() {
    if (choiceOther.checked) {
        otherInput.style.visibility= 'visible';
    } else {
        otherInput.style.visibility = 'hidden';
    }
}

function hideChoiceOtherInput() {
    otherInput.style.visibility = 'hidden';
}