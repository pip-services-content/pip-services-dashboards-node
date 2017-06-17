let DashboardsProcess = require('../obj/src/container/DashboardsProcess').DashboardsProcess;

try {
    new DashboardsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
