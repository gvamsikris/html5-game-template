// Main app file.

// To load a submodule for the app, place it in an app/ directory that is a
// sibling to this file.

// For any third party dependencies, like jQuery,
// place them in the same directory as this file.
// This avoids having to do module path configuration.

/*global window */

define(function (require) {
    'use strict';

    var $ = require('jquery'),
        appCache = require('appCache'),
        network = require('network'),
        networkDom, appCacheStatusDom, appCacheEventDom;

    // Dependencies that do not have an export of their own, just attach
    // to other objects, like jQuery.
    require('bootstrap/modal');
    require('bootstrap/transition');

    // Handles update to the DOM that shows the network state.
    function updateNetworkDisplay(on) {
        networkDom.text(on? 'on' : 'off');
    }

    // Shows updates to appCache state.
    function updateAppCacheDisplay(eventName) {

        appCacheStatusDom.text(appCache.getStatusName());

        if (eventName) {
            appCacheEventDom.prepend('<li>' + eventName + '</li>');
        }
    }

    // Wait for the DOM to be ready before showing the network state.
    $(function () {
        // Display the current network state.
        networkDom = $('#networkStatus');
        updateNetworkDisplay(network());

        // Listen for changes in the network.
        // Use bind's partial argument passing.
        network.on('online', updateNetworkDisplay.bind(null, true));
        network.on('offline', updateNetworkDisplay.bind(null, false));

        // Display current appCache state.
        appCacheStatusDom = $('#appCacheStatus');
        appCacheEventDom = $('#appCacheEvent');

        // Listen for any of the appCache events.
        appCache.eventNames.forEach(function (name) {
            appCache.on(name, updateAppCacheDisplay.bind(null, name));
        });
    });
});
