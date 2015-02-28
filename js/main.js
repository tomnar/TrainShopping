var $views,
    $currentView,
    initialWidth,
    time          = 500,
    viewHistory   = [];

$( document ).ready(function() {

    $views       = $('.view'),
    initialWidth = $views.first().width();

    initViews();
});



function initViews() {
    $currentView = $views.first();
    $currentView.show();
    viewHistory.push(0);
    $('.button.back').click(function() {
        if (viewHistory.length > 1) {
            setView(viewHistory.pop(), false);
        }
    });
}

function setView(index, history) {
    history != null || (history = true);

    if ($currentView.index() !== index) {
        var $view = $($views[index]);

        // prepare next view
        $view.css({
            left: initialWidth + 'px',
            zIndex: 1,
            display: 'block'
        });

        // slide in next view
        $view.stop().animate({
            left: 0
        }, time, function() {
            $currentView.hide();
            $view.css({zIndex: 0});
            $currentView = $view;
        });

        // slide out current view
        $currentView.stop().animate({
            left: '-' + initialWidth + 'px'
        }, time);

        // push to history
        if (history) {
            viewHistory.push(index);
        }
    }
}