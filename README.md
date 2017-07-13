# Mtracker
####### Version 1.325 ####### 
Customizable App to collect fundraising orders for an on the go sales tool.
Droid and iOS compatible.

/**************** vs 1.325  || 7-13-17 **************/
~ Fixed the swiper settings and updated the login/logout

/**************** vs 1.324  || 7-12-17 **************/
~ Continuing to modify the Swiper settings. 

/**************** vs 1.324  || 7-11-17 **************/
~ Made the number entry fields for quantity larger so the number don't get cut off. 
~ Modified the Swiper settings - experimental to try to stop the wierd sliding

/**************** vs 1.323  || 7-10-17 **************/
~ adding back button to payment method.
~ sync button renamed to 'send orders'
~ sync bubbles brightened to red with white check
~ explanation added for 'send orders' added to bottom
~ added section to the orders area for user to mark off delivered products - space added to the Orders DB to record the saved settings for this. 
~ started writing in space in the code for custom message and group name. 

/**************** vs 1.322  || 7-7-17 **************/
~ fixing swiper container so that when turned to list view it is not able to be swiped.

/**************** vs 1.321  || 7-6-17 **************/
~ contain the zoom picture 

/**************** vs 1.32  || 7-6-17 **************/
~ adding in configuration for the orientation to stay in portrait mode

/**************** vs 1.31  || 6-20-17 **************/
~ fixing Droid keyboard issues

/**************** vs 1.30  || 6-20-17 **************/
~ revising text
~ revising droid settings

/**************** vs 1.292  || 6-15-17 **************/
~ minor css adjustments
~ removed pixel density commant to normalize the Droid version

/**************** vs 1.291  || 6-13-17 **************/
~ further refinements in the styles for tablets and larger resolutions - Products, Add to Cart Popup, Cart, Checkout, Make Payment.

/**************** vs 1.29  || 6-13-17 **************/
~ moved the close orders page back to going to the products page
~ revising the styles so that the layout looks better on droid or larger resolution devices.

/**************** vs 1.288  || 6-12-17 **************/
~ experiment to fix the slider
~ starting on droid css - header area
~ experimental Android setting in index.js - this appears to have worked.
~ moved form navigation to below the form so that iPad keyboard bar doesn't cover it. 
~ experiment to fix the orders flip back - was loading the loadOrders function twice - switched to only do it once. 

/**************** vs 1.287  || 6-9-17 **************/
~ changes to catalog load method
~ updates to the swiper load sequence to improve performance.

/**************** vs 1.286  || 6-9-17 **************/
~ popup was causing issues - moved to ordersPage

/**************** vs 1.285  || 6-8-17 **************/
~ removed debug message on Orders
~ added dialog for clear cart.
~ switched Order Details to be in a popup instead of a page to get rid of the redirect issues that are going on. 

/**************** vs 1.281  || 6-7-17 **************/
~ Fixed Sync issue 

/**************** vs 1.28  || 6-7-17 **************/
~ Order button verbiage
~ Better log out - clear stuff.
~ Login - destroy cart if it exists. 
~ Add ons - fixed LED and EZ Wreath Hanger showing up on items that should not show them. 
~ Added debug message on Sync.
~ Description typos Victorian Wreath and Spray
~ Swiper - always start at 1 item on load.
~ Order button - multiple time press

/**************** vs 1.27  || 6-6-17 **************/
~ Further refinement for the Separate login - issues with iPad and slower connections should be fixed. 
~ Address's an issue with the orders area related to the new changes

/**************** vs 1.26  || 6-5-17 **************/
~ Separate group login - clear old product data from separate groups logging in. 
~ Update the listview - fixing some bugs

/**************** vs 1.25  || 6-2-17 **************/
~ Getting Trapped in the Orders area - if there weren't any records in the orders db the user could get trapped in the orders area 
~ Multiple versions of the LED and Others - if the product got listed as "- " for the options it was considering it a different product instead of adding on to the existing
~ Messages added to Cancel and Close and Shop options from the cart
~ Weird decimal layout in cart - multiple LED were rounding to one decimal place 7.5 instead of 7.50
~ Bug for cart totals over 1000 numbers were adding commas and javascript was reading it as a string instead of number breaking the subtotal
~ Refined Catalog button layout


/**************** vs 1.24  || 6-1-17 **************/
~ Clearing the Cart updates the contents in addition to removing the Database info
~ Logging out clears the carts contents
~ Decimal Issue on Orders Page
~ Display total at bottom for order total
~ Darker Quantity Display
~ Larger Plus / Minus Buttons
~ Listview cleaned up - made it more like the other view only Vertical
~ New images for the LED lights
~ Order Details page - smaller images 
~ Close order now goes to the orders screen hopefully stopping the double click issue to close the order details
~ Added Quantity for all Products

/**************** vs 1.23  || 5-23-31-17 **************/
~ Wreaths and Garland Options allow for several of each as well as multiple sizes to be ordered at one time. 
~ Revised all of the images with newer larger higher quality ones. 
~ Updated text on the Orders page

/**************** vs 1.22  || 5-18-17/5-19-17 **************/
~ Adding iOS 6.1 icons
~ Fixing add-ons layout in cart for the 2 decimal placeholder 
~ Fixing zoom on product details

/**************** vs 1.21  || 5-17-17 **************/
~ Fix products showing in filter when they are not available. 
~ Hide the filter button if no product in that section is available.

/**************** vs 1.20  || 5-15-17 **************/
~ Removed link from the main page it was opening over the app instead of opening a web browser.

/**************** vs 1.19  || 5-12-17-5-15-17 **************/
~ Adding in real links to the Mickman Database
~ Updating some minor css rules
~ Removing the database debug stuff

/**************** vs 1.18  || 5-11-17 **************/
~ Fixed bug that was stopping checkout when using the default settings
~ Cleared out address info when order is completed so that it doesn't show up on the next order
~ Default Address - added feedback and validation 
~ Refigured how the catalog loads which fixed the iPhone / iPod first loading issue
~ replaced the centerpiece on the front image.

/**************** vs 1.17  || 5-10-17 **************/
~ Added a DB Variable for the User order logging
~ Added subtotal and grand total to Printed page
~ Added Thank you page details for after checkout
~ Fixed some formatting issues on the checkout page on smaller screens
~ updated text on Add to Cart buttons so text was not truncated
~ validation added to the checkout form

/**************** vs 1.16  || 5-9-17 **************/
~ New Method for setting up the product pricing so that it does not produce duplicates and or errors
~ Updated Carousel for larger resolutions

/**************** vs 1.15  || 5-8-17 **************/
~ Added Droid icons
~ Added Droid Splash screens
~ Fixed Droid / Cordova whitelist issue - added whitelist plugin to allow Ajax call
~ Revised Startpage
 
/**************** vs 1.12-1.14  || 5-5-17 **************/
~ Connected Phone type dropdown to field
~ Revised the Add Subtract Cart field
~ New images for the Larger LED
~ New images for the Tree thumb
~ View Cart added to main product page
~ Fixed iPad icons paths
~ Fixed iPad splash image paths

/**************** vs 1.12-1.13  || 5-1-17 **************/
~ Added in Date 
~ Zoom improvements 
~ added descriptions 
~ Updated Addon logic 
~ Added thank you page 
~ Replaced some photos

