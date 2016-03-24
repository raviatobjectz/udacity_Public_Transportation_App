console.log("Brand new sw-init");

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function (registration) {
        var serviceWorker;
        if (registration.installing) {
            serviceWorker = registration.installing;
            console.log('installing');
        } else if (registration.waiting) {
            serviceWorker = registration.waiting;
            console.log('waiting');
        } else if (registration.active) {
            serviceWorker = registration.active;
            console.log('active');
        }
        if (serviceWorker) {
            console.log("Status = "+serviceWorker.state);
            serviceWorker.addEventListener('statechange', function (e) {
                console.log(" status changed : "+e.target.state);
            });
        }
    }).catch (function (error) {
        console.log('ServiceWorker registration failed: ', err);
    });
} else {
    console.log('Browser doesnt support service worker');
}
