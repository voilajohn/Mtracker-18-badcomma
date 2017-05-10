var MickmanAppLogin = MickmanAppLogin || {};
MickmanAppLogin.Settings = MickmanAppLogin.Settings || {};
MickmanAppLogin.Settings.signInUrl = "http://cpanel-2101-20.datarealm.com/~farasisc/test-mick/login.php";
MickmanAppLogin.Settings.tokenUrl = "http://cpanel-2101-20.datarealm.com/~farasisc/test-mick/token.php";
MickmanAppLogin.Settings.syncDataUrl = "http://cpanel-2101-20.datarealm.com/~farasisc/test-mick/sync.php";
//MickmanAppLogin.Settings.signInUrl = "http://mickman.com/login.php";
https://online.mickman.com/app/login.php

//MickmanAppLogin.Settings.signInUrl = "https://online.mickman.com/app/login.php";
//MickmanAppLogin.Settings.tokenUrl = "https://online.mickman.com/app/token.php";
//MickmanAppLogin.Settings.syncDataUrl = "https://online.mickman.com/app/sync.php";
MickmanAppLogin.Settings.sessionTimeoutInMSec = 31500000; //364 days 14 hours

//database storage
localforage.config({
    driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver() - indexDB
    name        : 'mickApp',
    version     : 1.0,
    size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'keyvalue_pairs', // Should be alphanumeric, with underscores.
    description : 'products'
});
